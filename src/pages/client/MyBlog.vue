<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import BlogService from '../../services/blogService';
import ImageUpload from '../../components/Image.vue';

const router = useRouter();
const blogService = new BlogService();

const currentUser = ref(null);
const myBlogs = ref([]);
const isLoading = ref(true);

const showModal = ref(false);
const isEdit = ref(false);

const initialFormState = {
  id: null,
  title: '',
  image: '',
  content: '',
  category_id: '1',
  views: 0,
  likes: [],
  comments: []
};

const formData = ref({ ...initialFormState });

const fetchMyBlogs = async () => {
  isLoading.value = true;
  try {
    const res = await blogService.list();
    const allBlogs = res.data || [];
    // Lọc bài viết của user hiện tại
    myBlogs.value = allBlogs.filter(blog => String(blog.author_id) === String(currentUser.value.id));
  } catch (error) {
    console.error('Lỗi khi tải bài viết:', error);
    alert('Không thể tải danh sách bài viết.');
  } finally {
    isLoading.value = false;
  }
};

const handleImageUpload = (data) => {
  formData.value.image = data.secure_url;
};

const getCategoryName = (id) => {
  if (id === '1') return 'Cà phê';
  if (id === '2') return 'Kiến thức';
  return 'Ẩm thực';
};

const getCategoryBadgeClass = (id) => {
  if (id === '1') return 'bg-success';
  if (id === '2') return 'bg-info text-dark';
  return 'bg-warning text-dark';
};

const openAddModal = () => {
  isEdit.value = false;
  formData.value = { ...initialFormState };
  showModal.value = true;
};

const openEditModal = (blog) => {
  isEdit.value = true;
  formData.value = { ...blog };
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  formData.value = { ...initialFormState };
};

const saveBlog = async () => {
  if (!formData.value.title.trim() || !formData.value.content.trim() || !formData.value.image) {
    alert('Vui lòng nhập đầy đủ Tiêu đề, Hình ảnh và Nội dung.');
    return;
  }

  try {
    const payload = {
      ...formData.value,
      author_id: String(currentUser.value.id)
    };

    if (!payload.created_at) {
        payload.created_at = new Date().toLocaleDateString('vi-VN');
    }
    payload.updated_at = new Date().toLocaleDateString('vi-VN');

    if (isEdit.value) {
      await blogService.update(payload.id, payload);
      alert('Cập nhật bài viết thành công!');
    } else {
      payload.id = Date.now().toString(); // Generate unique ID for JSON server
      await blogService.create(payload);
      alert('Thêm bài viết mới thành công!');
    }
    
    closeModal();
    fetchMyBlogs();
  } catch (error) {
    console.error('Lỗi khi lưu bài viết:', error);
    alert('Có lỗi xảy ra khi lưu bài viết.');
  }
};

const deleteBlog = async (id) => {
  if (!confirm('Bạn có chắc chắn muốn xóa bài viết này không? Hành động này không thể hoàn tác.')) {
    return;
  }

  try {
    await blogService.delete(id);
    alert('Đã xóa bài viết thành công.');
    fetchMyBlogs();
  } catch (error) {
    console.error('Lỗi khi xóa bài viết:', error);
    alert('Có lỗi xảy ra khi xóa bài viết.');
  }
};

onMounted(() => {
  const userData = localStorage.getItem('user');
  if (userData) {
    currentUser.value = JSON.parse(userData);
    fetchMyBlogs();
  } else {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="my-blog-page py-5">
    <div class="container">
      
      <!-- Cảnh báo nếu chưa đăng nhập -->
      <div v-if="!currentUser && !isLoading" class="alert alert-warning text-center rounded-4 shadow-sm p-5">
        <i class="bi bi-exclamation-triangle-fill fs-1 text-warning mb-3 d-block"></i>
        <h4 class="fw-bold">Bạn chưa đăng nhập</h4>
        <p class="text-muted">Vui lòng đăng nhập để có thể viết và quản lý bài viết của riêng bạn.</p>
        <RouterLink to="/login" class="btn btn-coffee mt-3">Đăng nhập ngay</RouterLink>
      </div>

      <div v-else-if="currentUser">
        <div class="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 class="fw-bold title-coffee mb-1">Bài viết của tôi</h2>
            <p class="text-muted mb-0">Quản lý những câu chuyện bạn đã chia sẻ</p>
          </div>
          <button class="btn btn-coffee d-flex align-items-center gap-2 shadow-sm" @click="openAddModal">
            <i class="bi bi-pencil-square"></i> Viết bài mới
          </button>
        </div>

        <!-- Trạng thái Loading -->
        <div v-if="isLoading" class="text-center py-5">
          <div class="spinner-border text-coffee" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2 text-muted">Đang tải bài viết của bạn...</p>
        </div>

        <!-- Danh sách bài viết -->
        <div class="row g-4" v-else>
          <div class="col-12" v-if="myBlogs.length === 0">
            <div class="text-center py-5 bg-white rounded-4 shadow-sm border border-light">
              <i class="bi bi-journal-text fs-1 text-muted mb-3 d-block opacity-50"></i>
              <h5 class="fw-bold text-muted">Bạn chưa có bài viết nào</h5>
              <p class="text-muted mb-4">Hãy chia sẻ câu chuyện đầu tiên của bạn với cộng đồng nhé!</p>
              <button class="btn btn-outline-coffee" @click="openAddModal">Viết bài ngay</button>
            </div>
          </div>

          <div class="col-md-6 col-lg-4" v-for="blog in myBlogs" :key="blog.id">
            <div class="card border-0 shadow-sm h-100 blog-card">
              <div class="card-img-wrapper">
                <img
                  :src="blog.image || 'https://via.placeholder.com/400x300'"
                  class="card-img-top"
                  :alt="blog.title"
                />
                <span :class="['badge card-badge', getCategoryBadgeClass(blog.category_id)]">
                  {{ getCategoryName(blog.category_id) }}
                </span>
              </div>

              <div class="card-body d-flex flex-column">
                <h5 class="fw-bold card-title mb-2">
                  {{ blog.title }}
                </h5>
                <p class="text-muted card-text two-line-ellipsis flex-grow-1">
                  {{ blog.content }}
                </p>

                <div class="d-flex justify-content-between align-items-center mt-3 pt-3 border-top">
                  <div class="text-muted small">
                    <i class="bi bi-calendar3 me-1"></i> {{ blog.created_at }}
                  </div>
                  <div class="d-flex gap-2">
                    <button class="btn btn-action btn-outline-secondary btn-sm" @click="openEditModal(blog)" title="Chỉnh sửa">
                      <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-action btn-outline-danger btn-sm" @click="deleteBlog(blog.id)" title="Xóa">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Form (Add/Edit) -->
    <div class="modal-backdrop" v-if="showModal" @click.self="closeModal">
      <div class="custom-modal">
        <div class="modal-header">
          <h4 class="fw-bold mb-0 text-coffee">{{ isEdit ? 'Chỉnh sửa bài viết' : 'Viết bài mới' }}</h4>
          <button class="btn-close-modal" @click="closeModal"><i class="bi bi-x-lg"></i></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label class="form-label fw-bold">Tiêu đề bài viết <span class="text-danger">*</span></label>
            <input type="text" class="form-control custom-input" v-model="formData.title" placeholder="Nhập tiêu đề thật ấn tượng...">
          </div>
          
          <div class="mb-3">
            <label class="form-label fw-bold">Thể loại <span class="text-danger">*</span></label>
            <select class="form-select custom-input" v-model="formData.category_id">
              <option value="1">Cà phê</option>
              <option value="2">Kiến thức</option>
              <option value="3">Ẩm thực</option>
            </select>
          </div>

          <div class="mb-3">
            <label class="form-label fw-bold">Ảnh bìa bài viết <span class="text-danger">*</span></label>
            <div class="image-upload-container border rounded-4 p-3 bg-light text-center">
              <div v-if="formData.image" class="mb-3 position-relative d-inline-block">
                <img :src="formData.image" class="img-preview rounded-3 shadow-sm" alt="Preview" />
                <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 rounded-circle" @click="formData.image = ''" title="Xóa ảnh">
                  <i class="bi bi-x"></i>
                </button>
              </div>
              <ImageUpload v-else @submitData="handleImageUpload" />
            </div>
          </div>

          <div class="mb-4">
            <label class="form-label fw-bold">Nội dung <span class="text-danger">*</span></label>
            <textarea class="form-control custom-input" rows="8" v-model="formData.content" placeholder="Kể câu chuyện của bạn ở đây..."></textarea>
          </div>
        </div>
        <div class="modal-footer justify-content-end gap-2">
          <button class="btn btn-outline-secondary px-4 py-2" @click="closeModal">Hủy bỏ</button>
          <button class="btn btn-coffee px-4 py-2" @click="saveBlog">
            <i class="bi bi-check2-circle me-1"></i> Lưu bài viết
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-blog-page {
  font-family: 'Inter', sans-serif;
  background-color: #faf8f5;
  min-height: 100vh;
}

.title-coffee {
  color: #3e2723;
  letter-spacing: -0.5px;
}

.text-coffee {
  color: #8b5a2b !important;
}

.btn-coffee {
  background-color: #8b5a2b;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  padding: 0.6rem 1.25rem;
  transition: all 0.2s;
}

.btn-coffee:hover {
  background-color: #6d4c41;
  color: white;
  transform: translateY(-2px);
}

.btn-outline-coffee {
  color: #8b5a2b;
  border-color: #8b5a2b;
  border-radius: 8px;
  font-weight: 500;
  background: transparent;
  transition: all 0.2s;
}

.btn-outline-coffee:hover {
  background-color: #8b5a2b;
  color: white;
}

/* Blog Card */
.blog-card {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid rgba(139, 90, 43, 0.08);
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(139, 90, 43, 0.1) !important;
}

.card-img-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .card-img-top {
  transform: scale(1.05);
}

.card-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.card-title {
  color: #3e2723;
  line-height: 1.4;
}

.two-line-ellipsis {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.btn-action {
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Custom Modal */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
  padding: 1rem;
}

.custom-modal {
  background: white;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-close-modal {
  background: #f5f5f5;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  transition: all 0.2s;
}

.btn-close-modal:hover {
  background: #e0e0e0;
  color: #d32f2f;
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
}

.custom-input {
  border: 1px solid #d7ccc8;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  transition: all 0.3s;
}

.custom-input:focus {
  border-color: #8b5a2b;
  box-shadow: 0 0 0 0.25rem rgba(139, 90, 43, 0.15);
  outline: none;
}

.image-upload-container {
  border: 2px dashed #d7ccc8 !important;
}

.img-preview {
  max-width: 100%;
  max-height: 200px;
  object-fit: cover;
}
</style>