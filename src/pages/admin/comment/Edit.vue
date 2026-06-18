<template>
  <div class="admin-dashboard p-4">
    <div class="form-card">
      <div class="card-header-custom">
        <div class="header-left">
          <div class="icon-box">
            <i class="bi bi-pencil-square"></i>
          </div>
          <div>
            <h2 class="page-title">Sửa bình luận</h2>
            <p class="page-subtitle">Cập nhật nội dung bình luận của khách hàng</p>
          </div>
        </div>

        <RouterLink to="/admin/commentList" class="btn-secondary-custom">
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
            <label class="form-label-custom"> Bài viết: <span style="color: #8b5a2b; font-weight: bold;">{{ blogTitle }}</span></label>
          </div>

          <div class="mb-4">
            <label class="form-label-custom"> Nội dung bình luận <span class="required">*</span></label>
            <textarea
              class="form-control-custom textarea-custom"
              placeholder="Nhập nội dung bình luận"
              v-model="formData.content"
              required
            ></textarea>
          </div>

          <div class="form-actions">
            <RouterLink to="/admin/commentList" class="btn-cancel">Hủy</RouterLink>
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

const router = useRouter();
const route = useRoute();
const blogService = new BlogService();

const loading = ref(false);
const initialLoading = ref(true);

const blogId = route.query.blogId;
const commentId = route.query.commentId;

const blogTitle = ref('');
let originalBlog = null;

const formData = ref({
    content: ''
});

const fetchData = async () => {
    if (!blogId || !commentId) {
        alert("Thiếu tham số!");
        router.push('/admin/commentList');
        return;
    }
    
    try {
        const res = await blogService.getById(blogId);
        originalBlog = res.data;
        blogTitle.value = originalBlog.title;
        
        const comment = (originalBlog.comments || []).find(c => String(c.id) === String(commentId));
        if (comment) {
            formData.value.content = comment.content;
        } else {
            alert("Không tìm thấy bình luận");
            router.push('/admin/commentList');
        }
    } catch (error) {
        console.error(error);
        alert('Lỗi tải dữ liệu');
        router.push('/admin/commentList');
    } finally {
        initialLoading.value = false;
    }
};

const handleSubmit = async () => {
    loading.value = true;
    try {
        const idx = originalBlog.comments.findIndex(c => String(c.id) === String(commentId));
        if (idx !== -1) {
            originalBlog.comments[idx].content = formData.value.content;
            await blogService.update(blogId, originalBlog);
            alert('Cập nhật bình luận thành công!');
            router.push('/admin/commentList');
        }
    } catch (error) {
        console.error(error);
        alert('Lỗi cập nhật bình luận');
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchData();
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