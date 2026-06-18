<script setup>
import { ref, onMounted } from 'vue';
import Banner from "./Banner.vue";
import CategoryService from "../../services/categoryService";

const categoryService = new CategoryService();
const featuredProducts = ref([]);
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

const fetchFeaturedProducts = async () => {
    try {
        const res = await categoryService.list();
        // Admin manages products in categories endpoint. Status is "Hiển thị" / "Ẩn"
        const allProducts = res.data || [];
        featuredProducts.value = allProducts.filter(p => p.status === 'Hiển thị').slice(0, 8);
    } catch (error) {
        console.error("Lỗi khi tải sản phẩm nổi bật:", error);
    }
};

onMounted(() => {
    fetchFeaturedProducts();
});
</script>

<template>
  <div>
    <Banner> 
        
    </Banner>
  </div>
  <div class="d-flex align-items-center justify-content-between mt-5 mb-4">
    <h3 class="section-title">SẢN PHẨM NỔI BẬT</h3>
    <RouterLink to="/product" class="btn-coffee-outline">XEM TẤT CẢ</RouterLink>
  </div>

  <div class="row">
    <div class="col-xl-3 col-md-4 mt-3" v-for="product in featuredProducts" :key="product.id">
      <div class="modern-card">
        <div class="box-product">
          <img
            :src="product.image || 'https://via.placeholder.com/400x300'"
            class="card-img-top img-fit-contain"
            :alt="product.name"
          />
        </div>

        <div class="card-body-custom">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text two-line-ellipsis">
            {{ product.description }}
          </p>
          <div class="d-flex justify-content-between align-items-center mt-auto">
            <span class="fw-bold text-coffee" style="font-size: 1.1rem">{{ product.price ? product.price.toLocaleString('vi-VN') + ' đ' : 'Liên hệ' }}</span>
            <button @click="openDetails(product)" class="btn-coffee-outline bg-transparent">Chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-5 mb-5">
    <div class="col-xl-6 col-sm-12 box-slider">
      <img
        class="img-fit-contain rounded shadow-sm"
        src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80"
        alt="Coffee background 1"
      />
    </div>
    <div class="col-xl-6 col-sm-12 box-slider">
      <img
        class="img-fit-contain rounded shadow-sm"
        src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80"
        alt="Coffee background 2"
      />
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

<style scoped>
.section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  color: #3e2723;
  letter-spacing: -0.5px;
}

.modern-card {
  background: #ffffff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(139, 90, 43, 0.05);
  transition: all 0.4s ease;
  height: 100%;
  border: 1px solid rgba(139, 90, 43, 0.08);
  display: flex;
  flex-direction: column;
}

.modern-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(139, 90, 43, 0.12);
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
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.card-text {
  color: #795548;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.btn-coffee-outline {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border: 2px solid #8b5a2b;
  color: #8b5a2b;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  text-align: center;
}

.btn-coffee-outline:hover {
  background-color: #8b5a2b;
  color: #ffffff;
}

.box-product {
  height: 250px;
  overflow: hidden;
}

.img-fit-contain {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.modern-card:hover .img-fit-contain {
  transform: scale(1.05);
}

.box-slider {
  height: 350px;
  overflow: hidden;
  border-radius: 20px;
  margin-top: 1rem;
}

.two-line-ellipsis {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.text-coffee {
  color: #6d4c41;
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
