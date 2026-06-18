<template>
  <div class="edit-page">
    <div class="m-4">
      <div class="card shadow-sm border-0">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="m-0">Chỉnh sửa người dùng</h2>

            <RouterLink to="/admin/userList" class="btn btn-outline-secondary">
              Quay lại
            </RouterLink>
          </div>

          <div v-if="initialLoading" class="text-center py-4">Đang tải dữ liệu...</div>
          <form v-else @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label fw-semibold"> Tên người dùng </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nhập tên người dùng"
                  v-model="formData.name"
                  required
                />
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label fw-semibold"> Email </label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Nhập email"
                  v-model="formData.email"
                  required
                />
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label fw-semibold"> Mật khẩu </label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Đổi mật khẩu mới (hoặc để trống)"
                  v-model="formData.password"
                />
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label fw-semibold"> Vai trò </label>
                <select class="form-select" v-model="formData.role" required>
                  <option value="user">Khách hàng</option>
                  <option value="admin">Quản trị viên</option>
                </select>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-3">
              <RouterLink to="/admin/userList" class="btn btn-secondary">Hủy</RouterLink>
              <button type="submit" class="btn btn-success" :disabled="loading">
                 {{ loading ? 'Đang cập nhật...' : 'Cập nhật' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import UserService from '../../../services/userService';

const router = useRouter();
const route = useRoute();
const userService = new UserService();

const loading = ref(false);
const initialLoading = ref(true);
const userId = route.query.id;

const formData = ref({
    name: '',
    email: '',
    password: '',
    role: 'user'
});

let originalData = null;

const fetchUser = async () => {
    if (!userId) {
        alert("Không tìm thấy ID");
        router.push('/admin/userList');
        return;
    }
    
    try {
        const res = await userService.getById(userId);
        originalData = res.data;
        formData.value = {
            name: originalData.name || originalData.firstName || '',
            email: originalData.email || '',
            password: originalData.password || '',
            role: originalData.role || 'user'
        };
    } catch (error) {
        console.error(error);
        alert('Lỗi tải người dùng');
        router.push('/admin/userList');
    } finally {
        initialLoading.value = false;
    }
};

const handleSubmit = async () => {
    loading.value = true;
    try {
        const payload = {
            ...originalData,
            name: formData.value.name,
            email: formData.value.email,
            password: formData.value.password,
            role: formData.value.role
        };
        
        await userService.update(userId, payload);
        alert('Cập nhật thành công!');
        router.push('/admin/userList');
    } catch (error) {
        console.error(error);
        alert('Lỗi cập nhật người dùng');
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchUser();
});
</script>