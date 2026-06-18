<template>
  <div class="d-flex align-items-center justify-content-between mt-3 mb-4">


  <h2 class="page-title m-0">Sản Phẩm</h2>

  <div class="d-flex align-items-center gap-2">
    <small class="text-muted">{{ filteredProducts.length }} sản phẩm</small>

    <select class="form-select custom-select" style="width: 200px;">
      <option selected>Sắp xếp theo</option>
      <option value="1">Mới nhất</option>
      <option value="2">Giá tăng dần</option>
      <option value="3">Giá giảm dần</option>
    </select>
  </div>

</div>
  
  <div class="container-fluid px-0">
    <div class="row mt-3">
      <div class="col-xl-3 col-lg-4">
        <div class="filter-card mb-4">
          <div class="filter-header">
            <i class="bi bi-search-heart-fill me-2"></i>
            Tìm kiếm
          </div>
          <div class="filter-body">
            <form class="d-flex" role="search">
              <input
                class="form-control custom-input me-2"
                type="search"
                placeholder="Nhập tên món..."
                aria-label="Search"
              />
              <button class="btn-coffee-outline" type="submit">
                Tìm
              </button>
            </form>
          </div>
        </div>

        <div class="filter-card mb-4">
          <div class="filter-header">
            <i class="bi bi-view-list me-2"></i>
            Danh mục
          </div>

          <div class="filter-body">
            <div class="custom-radio mb-3">
              <input
                type="radio"
                name="categoryRadio"
                value=""
                id="cat-all"
                v-model="selectedCategoryId"
              />
              <label for="cat-all">
                Tất cả
              </label>
            </div>
            <div class="custom-radio mb-3" v-for="cat in activeCategories" :key="cat.id">
              <input
                type="radio"
                name="categoryRadio"
                :value="cat.id"
                :id="'cat-' + cat.id"
                v-model="selectedCategoryId"
              />
              <label :for="'cat-' + cat.id">
                {{ cat.name }}
              </label>
            </div>
          </div>
        </div>
        <div class="d-grid gap-2 mx-auto mt-3">
          <button class="btn-coffee-solid" type="button">Áp dụng bộ lọc</button>
        </div>
      </div>

      <div class="col-xl-9 col-lg-8 mt-4 mt-lg-0">
        <div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4">

          <div v-if="loading" class="col-12 text-center py-5">
            <div class="spinner-border text-coffee" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2 text-muted">Đang pha chế dữ liệu...</p>
          </div>
          <div v-else-if="errorMessage" class="col-12 text-center py-5 text-danger">{{ errorMessage }}</div>
          <template v-else>
            <div
              v-for="p in filteredProducts"
              :key="p.id"
              class="col"
            >
              <div class="modern-card h-100">
                <div class="card-img-wrapper">
                  <img
                    :src="p.image || placeholderImage"
                    class="card-img-top"
                    alt="..."
                  />
                  <div class="card-badge">{{ p.type || "Đồ uống" }}</div>
                </div>

                <div class="card-body-custom">
                  <h5 class="card-title">{{ p.name }}</h5>
                  <p class="card-text two-line-ellipsis">{{ p.description }}</p>

                  <div class="rating-stars mb-3">
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-fill"></i>
                    <i class="bi bi-star-half"></i>
                    <small class="text-muted ms-1">(4.5)</small>
                  </div>

                  <div class="d-flex align-items-center justify-content-between mt-auto">
                    <span class="product-price">{{ p.price ? p.price.toLocaleString('vi-VN') + ' đ' : "Liên hệ" }}</span>
                    <div class="d-flex gap-2">
                      <button @click="openDetails(p)" class="btn-coffee-outline bg-transparent px-3 py-1" style="border-radius: 50px; font-size: 0.85rem;">Chi tiết</button>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="filteredProducts.length === 0" class="col-12 text-center py-5">
              <i class="bi bi-cup text-muted fs-1 d-block mb-3"></i>
              <p class="text-muted fs-5">Không tìm thấy món phù hợp.</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
   <div v-if="showModal" class="custom-modal-overlay" @click.self="closeModal">
    <div class="custom-modal">
      <button class="modal-close" @click="closeModal">&times;</button>
      <div v-if="selectedProduct" class="modal-content-wrapper">
        <div class="modal-img-wrapper">
          <img :src="selectedProduct.image || 'https://via.placeholder.com/400x300'" :alt="selectedProduct.name">
        </div>
        <div class="modal-info">
          <h4 class="modal-title">{{ selectedProduct.name }}</h4>
          <span class="modal-price">{{ selectedProduct.price ? selectedProduct.price.toLocaleString('vi-VN') + ' đ' : 'Liên hệ' }}</span>
          <div class="modal-desc">
            <strong>Mô tả:</strong>
            <p>{{ selectedProduct.description || 'Không có mô tả chi tiết cho sản phẩm này.' }}</p>
          </div>
          <button class="btn-coffee-outline mt-3 w-100 bg-transparent" @click="closeModal">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import CategoryService from "../../services/categoryService";
import ProductService from "../../services/productService";

const categoryService = new CategoryService();
const productService = new ProductService();

const categories = ref([]);
const products = ref([]);
const selectedCategoryId = ref("");
const loading = ref(false);
const errorMessage = ref("");
const placeholderImage = "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80";

const selectedProduct = ref(null);
const showModal = ref(false);

const openDetails = (product) => {
    selectedProduct.value = product;
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
    selectedProduct.value = null;
};

const activeCategories = computed(() => {
  return (categories.value || []).filter((c) => c.status === "Hiển thị" || c.status === true);
});

const filteredProducts = computed(() => {
  const base = products.value || [];
  if (!selectedCategoryId.value) return base;
  return base.filter((p) => String(p.categoryId ?? p.category_id ?? "") === String(selectedCategoryId.value));
});

const activeCategoryIds = computed(() => new Set(activeCategories.value.map((c) => String(c.id))));

const fetchAll = async () => {
  loading.value = true;
  errorMessage.value = "";

  try {
    // Trong trang Admin, "Nước uống" đang được thêm và lưu qua categoryService (vào endpoint /categories)
    const res = await categoryService.list();

    const rawData = res.data || [];
    
    // Lấy danh sách nước uống từ /categories làm products
    products.value = rawData.filter((p) => {
      return p.status === "Hiển thị" || p.status === "Đang hiển thị" || p.status === true;
    });

    // Để trống categories vì hiện tại dữ liệu categories đang chứa thông tin nước uống
    categories.value = [];
  } catch (err) {
    console.error("FETCH ERROR:", err.response?.data || err.message);
    errorMessage.value = "Không thể tải danh sách nước uống/sản phẩm.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchAll();
});
</script>

<style scoped>
.page-title {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  color: #3e2723;
  letter-spacing: -0.5px;
}

.text-coffee {
  color: #8b5a2b !important;
}

/* Form controls */
.custom-select, .custom-input {
  border: 1px solid #d7ccc8;
  border-radius: 10px;
  padding: 0.6rem 1rem;
  color: #3e2723;
  transition: all 0.3s ease;
  background-color: #faf8f5;
}

.custom-select:focus, .custom-input:focus {
  border-color: #8b5a2b;
  box-shadow: 0 0 0 3px rgba(139, 90, 43, 0.1);
  outline: none;
  background-color: #ffffff;
}

/* Filter Cards */
.filter-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(139, 90, 43, 0.05);
  border: 1px solid rgba(139, 90, 43, 0.08);
}

.filter-header {
  background: linear-gradient(135deg, #f5ebd9 0%, #e8d5c4 100%);
  color: #5d4037;
  padding: 1rem 1.25rem;
  font-weight: 700;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(139, 90, 43, 0.05);
}

.filter-body {
  padding: 1.25rem;
}

/* Custom Radio */
.custom-radio {
  display: flex;
  align-items: center;
}

.custom-radio input[type="radio"] {
  appearance: none;
  background-color: #fff;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 1.15em;
  height: 1.15em;
  border: 2px solid #d7ccc8;
  border-radius: 50%;
  display: grid;
  place-content: center;
  margin-right: 0.75rem;
  transition: all 0.2s ease;
  cursor: pointer;
}

.custom-radio input[type="radio"]::before {
  content: "";
  width: 0.65em;
  height: 0.65em;
  border-radius: 50%;
  transform: scale(0);
  transition: 120ms transform ease-in-out;
  box-shadow: inset 1em 1em #8b5a2b;
}

.custom-radio input[type="radio"]:checked {
  border-color: #8b5a2b;
}

.custom-radio input[type="radio"]:checked::before {
  transform: scale(1);
}

.custom-radio label {
  color: #5d4037;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.95rem;
}

/* Buttons */
.btn-coffee-solid {
  background: linear-gradient(135deg, #8b5a2b 0%, #6d4c41 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(139, 90, 43, 0.2);
}

.btn-coffee-solid:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(139, 90, 43, 0.3);
  color: white;
}

.btn-coffee-outline {
  background: transparent;
  color: #8b5a2b;
  border: 2px solid #8b5a2b;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-coffee-outline:hover {
  background: #8b5a2b;
  color: white;
}

/* Product Card */
.modern-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(139, 90, 43, 0.05);
  transition: all 0.4s ease;
  border: 1px solid rgba(139, 90, 43, 0.08);
  display: flex;
  flex-direction: column;
}

.modern-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(139, 90, 43, 0.12);
}

.card-img-wrapper {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.modern-card:hover .card-img-top {
  transform: scale(1.08);
}

.card-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  color: #8b5a2b;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card-body-custom {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-title {
  color: #3e2723;
  font-weight: 700;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.card-text {
  color: #795548;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.two-line-ellipsis {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.rating-stars {
  color: #f59e0b;
  font-size: 0.9rem;
}

.product-price {
  font-size: 1.4rem;
  font-weight: 800;
  color: #8b5a2b;
}

.btn-cart {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f5ebd9;
  color: #8b5a2b;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.btn-cart:hover {
  background: #8b5a2b;
  color: white;
  transform: rotate(10deg) scale(1.1);
}

/* Modal Styles */
.custom-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.custom-modal {
  background: white;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.modal-close:hover {
  background: #f5ebd9;
  color: #8b5a2b;
  transform: scale(1.1);
}

.modal-content-wrapper {
  display: flex;
  flex-direction: column;
}

.modal-img-wrapper {
  height: 250px;
  width: 100%;
}

.modal-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-info {
  padding: 1.5rem 2rem;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #3e2723;
  margin-bottom: 0.5rem;
}

.modal-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #8b5a2b;
  display: block;
  margin-bottom: 1rem;
}

.modal-desc {
  color: #5d4037;
  font-size: 1rem;
  line-height: 1.6;
}

.modal-desc strong {
  color: #3e2723;
  display: block;
  margin-bottom: 0.25rem;
}
</style>
