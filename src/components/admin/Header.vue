<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container-fluid">
      <button
        class="navbar-toggler border-0 shadow-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list fs-2 text-dark-coffee"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 fw-medium gap-2">
          <li class="nav-item">
            <RouterLink class="nav-link custom-nav-link" aria-current="page" to="/">
              Trang chủ
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link custom-nav-link" to="/product">Sản phẩm</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link custom-nav-link" to="/blog">Bài viết</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link custom-nav-link" to="/contact">Liên hệ</RouterLink>
          </li>
        </ul>
        <form class="d-flex me-3" role="search">
          <input
            class="form-control me-2 form-control-coffee"
            type="search"
            placeholder="Tìm kiếm..."
            aria-label="Search"
          />
          <button class="btn btn-outline-coffee" type="submit">Tìm</button>
        </form>
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle d-flex align-items-center custom-nav-link"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              <img
                src="https://i.pinimg.com/736x/5b/11/1a/5b111acb80f942a5092c9f66e860ffdf.jpg"
                alt="Admin Avatar"
                class="rounded-circle me-2 border border-2 border-warning"
                width="36"
                height="36"
              />
              <span class="fw-bold">Admin Cà Phê</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-end custom-dropdown">
              <li>
                <h6 class="dropdown-header text-gold">Tài khoản Quản trị</h6>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <i class="bi bi-person me-2"></i> Hồ sơ
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  <i class="bi bi-gear me-2"></i> Cài đặt
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/">
                  <i class="bi bi-house me-2"></i> Xem trang khách
                </RouterLink>
              </li>
              <li>
                <a class="dropdown-item text-danger" href="#" @click.prevent="logout">
                  <i class="bi bi-box-arrow-right me-2"></i> Đăng xuất
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
.custom-navbar {
  background-color: #f5eedc; /* Cream background matching client header */
  padding: 0.8rem 1.5rem;
  box-shadow: 0 2px 15px rgba(109, 76, 65, 0.08);
}

.text-dark-coffee {
  color: #3e2723;
}

.text-gold {
  color: #cba052;
}

.custom-nav-link {
  color: #5d4037 !important;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  padding: 0.5rem 1rem !important;
  border-radius: 12px;
}

.custom-nav-link:hover {
  background-color: rgba(109, 76, 65, 0.1);
  color: #3e2723 !important;
}

.form-control-coffee {
  border-radius: 20px;
  border: 1px solid #d7ccc8;
  background-color: #fffaf0;
  padding-left: 1.2rem;
  transition: all 0.3s ease;
}

.form-control-coffee:focus {
  border-color: #cba052;
  box-shadow: 0 0 0 0.25rem rgba(203, 160, 82, 0.25);
}

.btn-outline-coffee {
  color: #6d4c41;
  border-color: #6d4c41;
  border-radius: 20px;
  padding: 0.375rem 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-outline-coffee:hover {
  background-color: #6d4c41;
  color: white;
  transform: translateY(-1px);
}

.custom-dropdown {
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 0.5rem;
}

.custom-dropdown .dropdown-item {
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 0.95rem;
  color: #5d4037;
  transition: all 0.2s ease;
}

.custom-dropdown .dropdown-item:hover {
  background-color: #f5eedc;
  color: #3e2723;
}

.custom-dropdown .dropdown-item.text-danger:hover {
  background-color: #ffebee;
  color: #d32f2f !important;
}
</style>
