<script setup>
import { ref, onMounted } from "vue";
import ProductCategoryService from "../../../services/productCategoryService";

const productCategoryService = new ProductCategoryService();
const categoryList = ref([]);

const fetchCategories = async () => {
  try {
    const res = await productCategoryService.list();
    categoryList.value = res.data || [];
  } catch (err) {
    console.error("FETCH PRODUCT CATEGORIES ERROR:", err.response?.data || err.message);
    alert("Không thể tải danh sách danh mục. Vui lòng thử lại.");
  }
};

const deleteCategory = async (id) => {
  if (!confirm("Bạn có chắc chắn xoá danh mục này?")) return;
  try {
    await productCategoryService.delete(id);
    await fetchCategories();
    alert("Xoá danh mục thành công.");
  } catch (err) {
    console.error("DELETE PRODUCT CATEGORY ERROR:", err.response?.data || err.message);
    alert("Xoá danh mục thất bại. Vui lòng thử lại.");
  }
};

const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  let cleaned = dateStr.replace(/\b\d{1,2}:\d{2}(:\d{2})?\b/, '').replace(/,/, '').trim();
  return cleaned || dateStr;
};

onMounted(() => {
  fetchCategories();
});
</script>

<template>
  <div class="admin-dashboard p-4">
    <div class="dashboard-card">
      <div class="card-header-custom">
        <div class="header-left">
          <div class="icon-box">
            <i class="bi bi-grid-fill"></i>
          </div>
          <div>
            <h2 class="page-title">Danh Mục Sản Phẩm</h2>
            <p class="page-subtitle">Quản lý và cập nhật các danh mục sản phẩm</p>
          </div>
        </div>

        <RouterLink to="/admin/productCategoryAdd" class="btn-primary-custom">
          <i class="bi bi-plus-lg me-2"></i> Thêm Danh Mục
        </RouterLink>
      </div>

      <div class="table-wrapper">
        <table class="modern-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên Danh Mục</th>
              <th>Trạng Thái</th>
              <th>Ngày Tạo</th>
              <th class="text-center">Thao Tác</th>
            </tr>
          </thead>

          <tbody>
            <tr v-if="categoryList.length === 0">
              <td colspan="5" class="text-center empty-state py-5">
                <i class="bi bi-inbox fs-1 text-muted mb-3 d-block"></i>
                <p>Chưa có danh mục nào.</p>
              </td>
            </tr>

            <tr v-for="(item, idx) in categoryList" :key="item.id">
              <td class="fw-medium text-muted">{{ idx + 1 }}</td>

              <td>
                <div class="category-info">
                  <div class="category-icon-wrap">
                    <i class="bi bi-grid"></i>
                  </div>
                  <div class="category-name">{{ item.name }}</div>
                </div>
              </td>

              <td>
                <span :class="['status-badge', item.status === 'Hiển thị' ? 'success' : 'hidden']">
                  <span class="dot"></span>
                  {{ item.status || "Hiển thị" }}
                </span>
              </td>

              <td class="text-muted">{{ formatDate(item.createdAt) }}</td>

              <td>
                <div class="action-buttons">
                  <RouterLink
                    :to="`/admin/productCategoryEdit/${item.id}`"
                    class="btn-icon edit-btn"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </RouterLink>

                  <button
                    class="btn-icon delete-btn"
                    @click="deleteCategory(item.id)"
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

<style scoped>
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

.category-info {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.category-icon-wrap {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(135deg, #f5ebd9 0%, #e8d5c4 100%);
  color: #8b5a2b;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.category-name {
  font-weight: 600;
  color: #3e2723;
  font-size: 1rem;
}

.desc-cell {
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.9rem;
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

.status-badge.hidden {
  background: #fce4ec;
  color: #c62828;
}

.status-badge .dot {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
}

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
  cursor: pointer;
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
</style>
