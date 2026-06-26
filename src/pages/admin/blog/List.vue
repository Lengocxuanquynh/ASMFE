<template>
  <div class="admin-dashboard p-4">
    <div class="dashboard-card">
      <div class="card-header-custom">
        <div class="header-left">
          <div class="icon-box">
            <i class="bi bi-journal-text"></i>
          </div>
          <div>
            <h2 class="page-title">Danh Sách Bài Viết</h2>
            <p class="page-subtitle">Quản lý và cập nhật các bài viết blog</p>
          </div>
        </div>

        <RouterLink to="/admin/blogAdd" class="btn-primary-custom">
          <i class="bi bi-plus-lg me-2"></i> Thêm Bài Viết
        </RouterLink>
      </div>

      <div class="table-wrapper">
        <table class="modern-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Bài Viết</th>
              <th>Tác Giả</th>
              <th>Ngày Đăng</th>
              <th class="text-center">Thao Tác</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="loading">
              <td colspan="5" class="text-center empty-state py-5">
                <i class="bi bi-arrow-clockwise fs-1 text-muted mb-3 d-block spin"></i>
                <p>Đang tải dữ liệu...</p>
              </td>
            </tr>
            <tr v-else-if="blogs.length === 0">
              <td colspan="5" class="text-center empty-state py-5">
                <i class="bi bi-inbox fs-1 text-muted mb-3 d-block"></i>
                <p>Chưa có bài viết nào.</p>
              </td>
            </tr>
            <tr v-else v-for="(blog, index) in blogs" :key="blog.id">
              <td class="fw-medium text-muted">{{ index + 1 }}</td>
              
              <td>
                <div class="product-info">
                  <div class="product-img-wrapper">
                    <img :src="blog.image || 'https://placehold.co/100'" class="product-img" alt="Blog Image" />
                  </div>
                  <div class="product-details">
                    <div class="product-name" style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">{{ blog.title }}</div>
                  </div>
                </div>
              </td>
              
              <td><span class="text-muted fw-medium">{{ getUserName(blog.author_id) }}</span></td>
              <td class="text-muted">{{ blog.created_at }}</td>
              
              <td>
                <div class="action-buttons">
                  <RouterLink
                    :to="'/admin/blogEdit?id=' + blog.id"
                    class="btn-icon edit-btn"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </RouterLink>

                  <button
                    class="btn-icon delete-btn"
                    @click="handleDelete(blog.id)"
                  >
                    <i class="bi bi-trash3"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BlogService from '../../../services/blogService';
import UserService from '../../../services/userService';

const blogService = new BlogService();
const userService = new UserService();

const blogs = ref([]);
const users = ref([]);
const loading = ref(false);

const getCategoryName = (id) => {
    if (String(id) === '1') return 'Cà phê';
    if (String(id) === '2') return 'Kiến thức';
    if (String(id) === '3') return 'Ẩm thực';
    return 'Khác';
};

const getUserName = (id) => {
    const user = users.value.find(u => String(u.id) === String(id));
    return user ? (user.name || user.firstName) : 'Ẩn danh';
};

const fetchBlogs = async () => {
    loading.value = true;
    try {
        const [blogRes, userRes] = await Promise.all([
            blogService.list(),
            userService.list()
        ]);
        blogs.value = blogRes.data || [];
        users.value = userRes.data || [];
    } catch (error) {
        console.error(error);
        alert('Lỗi tải danh sách bài viết');
    } finally {
        loading.value = false;
    }
};

const handleDelete = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xoá bài viết này không?")) {
        try {
            await blogService.delete(id);
            alert('Xoá thành công!');
            fetchBlogs();
        } catch (error) {
            console.error(error);
            alert('Lỗi xoá bài viết');
        }
    }
};

onMounted(() => {
    fetchBlogs();
});
</script>

<style scoped>
/* Dashboard Container */
.admin-dashboard {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #faf8f5;
  min-height: 100vh;
}

.dashboard-card {
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(139, 90, 43, 0.05);
  overflow: hidden;
  border: 1px solid rgba(139, 90, 43, 0.08);
}

/* Header */
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

/* Buttons */
.btn-primary-custom {
  background: linear-gradient(135deg, #8b5a2b 0%, #6d4c41 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(139, 90, 43, 0.2);
}

.btn-primary-custom:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(139, 90, 43, 0.3);
  color: white;
}

/* Table Design */
.table-wrapper {
  overflow-x: auto;
  padding: 0 1rem 1rem 1rem;
}

.modern-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

.modern-table th {
  background: #faf8f5;
  color: #5d4037;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 1.25rem 1.5rem;
  border-bottom: 2px solid #e8d5c4;
}

.modern-table td {
  padding: 1.25rem 1.5rem;
  vertical-align: middle;
  border-bottom: 1px solid #f5ebd9;
  transition: background-color 0.2s ease;
}

.modern-table tbody tr:hover td {
  background-color: #faf8f5;
}

/* Product Info */
.product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-img-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-name {
  font-weight: 600;
  color: #3e2723;
  font-size: 1rem;
  margin-bottom: 0.2rem;
}

.product-desc {
  color: #795548;
  font-size: 0.85rem;
}

/* Badges & Pills */
.category-pill {
  background: #f5ebd9;
  color: #5d4037;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  display: inline-block;
  white-space: nowrap;
}

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-badge.success {
  background: #e8f5e9;
  color: #2e7d32;
}

.status-badge.admin {
  background: #ffebee;
  color: #c62828;
}

.status-badge .dot {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
}

/* Actions */
.action-buttons {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.btn-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: #f5ebd9;
  color: #795548;
  transition: all 0.2s ease;
  text-decoration: none;
}

.edit-btn:hover {
  background: #e8d5c4;
  color: #8b5a2b;
}

.delete-btn:hover {
  background: #ffcdd2;
  color: #c62828;
}

.empty-state p {
  color: #a1887f;
  font-size: 1.1rem;
}
.spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
