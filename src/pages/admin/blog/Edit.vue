<template>
  <div class="admin-dashboard p-4">
    <div class="form-card">
      <div class="card-header-custom">
        <div class="header-left">
          <div class="icon-box">
            <i class="bi bi-pencil-square"></i>
          </div>
          <div>
            <h2 class="page-title">Chỉnh sửa bài viết</h2>
            <p class="page-subtitle">Cập nhật thông tin bài viết hiện tại</p>
          </div>
        </div>

        <RouterLink to="/admin/blogList" class="btn-secondary-custom">
          <i class="bi bi-arrow-left me-2"></i> Quay lại
        </RouterLink>
      </div>

      <div class="card-body-custom">
        <div v-if="initialLoading" class="text-center py-5">
           <i class="bi bi-arrow-clockwise fs-1 text-muted mb-3 d-block spin"></i>
           <p class="text-muted">Đang tải dữ liệu...</p>
        </div>
        <form v-else @submit.prevent="handleSubmit">
          <div class="mb-4">
            <label class="form-label-custom"> Tên bài viết <span class="required">*</span></label>
            <div class="input-wrapper">
              <i class="bi bi-fonts input-icon"></i>
              <input
                type="text"
                class="form-control-custom"
                placeholder="Nhập tên bài viết"
                v-model="formData.title"
                required
              />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-4">
              <label class="form-label-custom"> Thể loại <span class="required">*</span></label>
              <div class="select-wrapper">
                <select class="form-select-custom" v-model="formData.category_id" required>
                  <option value="" disabled>Chọn thể loại</option>
                  <option value="1">Cà phê</option>
                  <option value="2">Kiến thức</option>
                  <option value="3">Ẩm thực</option>
                </select>
                <i class="bi bi-chevron-down select-icon"></i>
              </div>
            </div>

            <div class="col-md-6 mb-4">
              <label class="form-label-custom"> Hình ảnh </label>
              <div class="upload-wrapper">
                <div v-if="formData.image" class="position-relative d-inline-block">
                  <img :src="formData.image" class="img-preview" alt="Preview" />
                  <button type="button" class="btn btn-sm btn-danger position-absolute top-0 end-0 m-1 rounded-circle" @click="formData.image = ''" title="Xóa ảnh">
                    <i class="bi bi-x"></i>
                  </button>
                </div>
                <ImageUpload v-else @submitData="handleImageUpload" />
              </div>
            </div>
          </div>

          <div class="mb-4">
            <label class="form-label-custom"> Nội dung bài viết <span class="required">*</span></label>
            <textarea
              class="form-control-custom textarea-custom"
              placeholder="Nhập nội dung bài viết"
              v-model="formData.content"
              required
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-submit" :disabled="loading">
               <i class="bi bi-check2-circle me-2"></i> {{ loading ? 'Đang cập nhật...' : 'Cập nhật' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import BlogService from '../../../services/blogService';
import ImageUpload from '../../../components/Image.vue';

const router = useRouter();
const route = useRoute();
const blogService = new BlogService();

const loading = ref(false);
const initialLoading = ref(true);
const blogId = route.query.id;

const formData = ref({
    title: '',
    category_id: '',
    image: '',
    content: ''
});

const handleImageUpload = (data) => {
    formData.value.image = data.secure_url;
};

let originalData = null;

const fetchBlog = async () => {
    if (!blogId) {
        alert("Không tìm thấy ID bài viết");
        router.push('/admin/blogList');
        return;
    }
    
    try {
        const res = await blogService.getById(blogId);
        originalData = res.data;
        formData.value = {
            title: originalData.title,
            category_id: String(originalData.category_id),
            image: originalData.image,
            content: originalData.content
        };
    } catch (error) {
        console.error(error);
        alert('Lỗi tải bài viết');
        router.push('/admin/blogList');
    } finally {
        initialLoading.value = false;
    }
};

const handleSubmit = async () => {
    loading.value = true;
    try {
        const payload = {
            ...originalData,
            title: formData.value.title,
            image: formData.value.image,
            content: formData.value.content,
            category_id: formData.value.category_id,
            updated_at: new Date().toLocaleDateString('vi-VN')
        };
        
        await blogService.update(blogId, payload);
        alert('Cập nhật bài viết thành công!');
        router.push('/admin/blogList');
    } catch (error) {
        console.error(error);
        alert('Lỗi cập nhật bài viết');
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchBlog();
});
</script>
<style scoped>
.admin-dashboard {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #faf8f5;
  min-height: 100vh;
}

.form-card {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(139, 90, 43, 0.05);
  overflow: hidden;
  border: 1px solid rgba(139, 90, 43, 0.08);
}

.card-header-custom {
  padding: 2rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f5ebd9;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.icon-box {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #f5ebd9 0%, #e8d5c4 100%);
  color: #8b5a2b;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(139, 90, 43, 0.15);
}

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3e2723;
  margin-bottom: 0.25rem;
  letter-spacing: -0.5px;
}

.page-subtitle {
  color: #795548;
  font-size: 0.95rem;
  margin: 0;
}

.btn-secondary-custom {
  background: #ffffff;
  color: #5d4037;
  border: 1px solid #d7ccc8;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-secondary-custom:hover {
  background: #faf8f5;
  color: #3e2723;
  border-color: #a1887f;
}

.card-body-custom {
  padding: 2.5rem;
}

.form-label-custom {
  font-weight: 600;
  color: #4e342e;
  margin-bottom: 0.5rem;
  display: block;
  font-size: 0.95rem;
}

.required {
  color: #d32f2f;
}

.input-wrapper, .select-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a1887f;
  font-size: 1.1rem;
}

.select-icon {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a1887f;
  pointer-events: none;
}

.form-control-custom, .form-select-custom {
  width: 100%;
  padding: 0.85rem 1.25rem;
  font-size: 1rem;
  color: #3e2723;
  background-color: #faf8f5;
  border: 1px solid #d7ccc8;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.form-control-custom:focus, .form-select-custom:focus {
  outline: none;
  background-color: #ffffff;
  border-color: #8b5a2b;
  box-shadow: 0 0 0 4px rgba(139, 90, 43, 0.1);
}

.input-wrapper .form-control-custom {
  padding-left: 3rem;
}

.form-select-custom {
  appearance: none;
  padding-right: 3rem;
}

.textarea-custom {
  resize: vertical;
  min-height: 120px;
}

.upload-wrapper {
  background: #faf8f5;
  border: 1px dashed #d7ccc8;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.upload-wrapper:hover {
  border-color: #a1887f;
  background: #f5ebd9;
}

.img-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(139, 90, 43, 0.1);
}

.error-msg {
  color: #d32f2f;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  font-weight: 500;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f5ebd9;
}

.btn-cancel {
  background: #f5ebd9;
  color: #5d4037;
  border: none;
  padding: 0.85rem 1.75rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  background: #e8d5c4;
  color: #3e2723;
}

.btn-submit {
  background: linear-gradient(135deg, #8b5a2b 0%, #6d4c41 100%);
  color: white;
  border: none;
  padding: 0.85rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(139, 90, 43, 0.2);
  display: inline-flex;
  align-items: center;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(139, 90, 43, 0.3);
}
</style>