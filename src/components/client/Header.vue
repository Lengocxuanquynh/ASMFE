<template>
  <nav class="navbar navbar-expand-lg custom-navbar sticky-top">
    <div class="container">
      <!-- Logo -->
      <RouterLink class="navbar-brand d-flex align-items-center" to="/">
        <div class="logo-icon me-2">
          <i class="bi bi-cup-hot"></i>
        </div>
        <div class="logo-text d-flex flex-column justify-content-center">
          <div class="brand-name">
            <span class="text-dark-coffee">Cà Phê</span>
          </div>
          <div class="brand-subtitle">PREMIUM COFFEE & BAKERY</div>
        </div>
      </RouterLink>

      <!-- Mobile Toggle -->
      <button
        class="navbar-toggler border-0 shadow-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <i class="bi bi-list fs-2 text-dark-coffee"></i>
      </button>

      <!-- Menu Items -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-3 fw-medium">
          <li class="nav-item">
            <RouterLink class="nav-link custom-nav-link" to="/"
              >Trang chủ</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link custom-nav-link" to="/product"
              >Sản phẩm</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link custom-nav-link" to="/blog"
              >Bài viết</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link custom-nav-link" to="/about"
              >Giới thiệu</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link custom-nav-link" to="/contact"
              >Liên hệ</RouterLink
            >
          </li>
        </ul>

        <div class="d-flex align-items-center ms-lg-3 mt-3 mt-lg-0">
          <div class="d-flex align-items-center me-2 position-relative">
            <input 
              type="text" 
              class="form-control form-control-sm search-input" 
              placeholder="Tìm kiếm..." 
              v-model="headerSearchQuery"
              @keyup.enter="executeSearch"
              style="width: 150px; border-radius: 20px; border: 1px solid #cba052; padding: 0.25rem 0.75rem; background-color: #faf8f5;"
            />
            <button class="btn btn-link nav-icon text-dark-coffee p-0 ms-2" @click="executeSearch">
              <i class="bi bi-search"></i>
            </button>
          </div>

          <template v-if="!user">
            <RouterLink to="/login" class="btn btn-login ms-2">
              Đăng nhập
            </RouterLink>
            <RouterLink to="/signin" class="btn btn-register ms-2">
              Đăng ký
            </RouterLink>
          </template>

          <template v-else>
            <div class="nav-item dropdown ms-2">
              <a
                class="nav-link dropdown-toggle d-flex align-items-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                style="border: none; background: transparent"
              >
                <img
                  :src="user.avatar || 'https://i.pravatar.cc/150'"
                  alt="Avatar"
                  class="rounded-circle me-2"
                  width="32"
                  height="32"
                  style="object-fit: cover; border: 2px solid #cba052"
                />
                <span class="fw-bold text-dark-coffee">{{
                  user.name || user.firstName
                }}</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end custom-dropdown">
                <li v-if="role === 'admin'">
                  <RouterLink
                    class="dropdown-item text-gold fw-bold"
                    to="/admin"
                  >
                    <i class="bi bi-speedometer2 me-2"></i> Quản trị (Admin)
                  </RouterLink>
                </li>
                <li>
                  <RouterLink class="dropdown-item fw-medium" to="/my-blog">
                    <i class="bi bi-journal-text me-2"></i> Bài viết của tôi
                  </RouterLink>
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <a
                    class="dropdown-item text-danger"
                    href="#"
                    @click.prevent="logout"
                  >
                    <i class="bi bi-box-arrow-right me-2"></i> Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref(null);
const role = ref(null);
const headerSearchQuery = ref("");

const executeSearch = () => {
  if (headerSearchQuery.value.trim()) {
    router.push({ path: "/product", query: { search: headerSearchQuery.value.trim() } });
    headerSearchQuery.value = "";
  }
};

onMounted(() => {
  const userData = localStorage.getItem("user");
  if (userData) {
    user.value = JSON.parse(userData);
    role.value = localStorage.getItem("role");
  }
});

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  user.value = null;
  role.value = null;
  router.push("/");
}
</script>

<style scoped>
.custom-navbar {
  background-color: #f5eedc; /* Match the cream background */
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.logo-icon {
  width: 40px;
  height: 40px;
  background-color: #6d4c41;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 2px;
}

.text-dark-coffee {
  color: #3e2723;
}

.text-gold {
  color: #cba052;
}

.brand-subtitle {
  font-size: 0.6rem;
  font-weight: 600;
  color: #8d6e63;
  letter-spacing: 1px;
}

.custom-nav-link {
  color: #5d4037 !important;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  padding: 0.4rem 0.8rem !important;
  margin: 0 0.2rem;
  border-radius: 12px;
}

.custom-nav-link:hover,
.custom-nav-link.router-link-exact-active {
  background-color: rgba(109, 76, 65, 0.1);
  color: #5d4037 !important;
}

.nav-icon {
  font-size: 1.25rem;
  transition: transform 0.2s ease;
}

.nav-icon:hover {
  transform: scale(1.1);
  color: #cba052 !important;
}

.btn-login {
  background-color: #6d4c41;
  color: white;
  border-radius: 20px;
  padding: 0.4rem 1.25rem;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border: none;
}

.btn-login:hover {
  background-color: #5d4037;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(109, 76, 65, 0.3);
}

.btn-register {
  background-color: transparent;
  color: #6d4c41;
  border-radius: 20px;
  padding: 0.4rem 1.25rem;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border: 1px solid #6d4c41;
}

.btn-register:hover {
  background-color: rgba(109, 76, 65, 0.1);
  color: #5d4037;
  transform: translateY(-2px);
}

.custom-dropdown {
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  padding: 0.5rem;
  margin-top: 10px;
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
