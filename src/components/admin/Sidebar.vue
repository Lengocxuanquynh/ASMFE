<template>
  <aside class="sidebar">
    <div class="brand">
      <div class="d-flex align-items-center justify-content-center mb-3">
        <div class="logo-icon-sidebar me-2">
          <i class="bi bi-cup-hot"></i>
        </div>
        <h3 class="mb-0">Cà Phê <span class="text-gold">Admin</span></h3>
      </div>
    </div>

    <nav>
      <ul class="nav">
        <li>
          <RouterLink to="/admin/dashboard" class="nav-link">
            <i class="bi bi-speedometer2 me-2"></i> Bảng điều khiển
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/categoryList" class="nav-link">
            <i class="bi bi-tags me-2"></i> Danh sách sản phẩm
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/productCategoryList" class="nav-link">
            <i class="bi bi-grid me-2"></i> Danh mục sản phẩm
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/blogList" class="nav-link">
            <i class="bi bi-file-earmark-text me-2"></i> Danh sách bài viết
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/commentList" class="nav-link">
            <i class="bi bi-chat-dots me-2"></i> Danh sách bình luận
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/admin/userList" class="nav-link">
            <i class="bi bi-people me-2"></i> Danh sách người dùng
          </RouterLink>
        </li>
        <li class="mt-4">
          <a href="#" class="nav-link text-danger logout-link" @click.prevent="logout">
            <i class="bi bi-box-arrow-right me-2"></i> Đăng xuất
          </a>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  router.push("/");
}
</script>

<style scoped>
.sidebar {
  padding: 24px 16px;
  box-sizing: border-box;
  min-height: 100vh;
  background: #3e2723; /* Dark coffee background */
  border-right: 1px solid rgba(203, 160, 82, 0.2);
  position: sticky;
  top: 0;
}
.brand {
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 24px;
}
.brand h3 {
  margin: 0;
  font-size: 20px;
  color: #f8fafc;
  letter-spacing: 1px;
  font-weight: 800;
}
.text-gold {
  color: #cba052;
}
.logo-icon-sidebar {
  width: 32px;
  height: 32px;
  background-color: #cba052;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
}
.nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 14px;
  color: #d7ccc8;
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.2s ease;
  font-weight: 500;
}
.nav-link:hover {
  background: rgba(203, 160, 82, 0.15);
  color: #cba052;
  transform: translateX(4px);
}
.router-link-exact-active {
  background: #cba052;
  color: #ffffff !important;
  font-weight: 700;
  box-shadow: 0 4px 10px rgba(203, 160, 82, 0.3);
}
.logout-link {
  color: #ff8a65 !important;
}
.logout-link:hover {
  background: rgba(255, 138, 101, 0.15);
  color: #ff5722 !important;
}

@media (max-width: 768px) {
  .sidebar {
    height: auto;
    position: relative;
    min-height: auto;
  }
}
</style>
