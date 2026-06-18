<template>
  <div class="add-page">
    <div class="m-4">
      <div class="card shadow-sm border-0">
        <div class="card-body p-4">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="m-0">Thêm người dùng</h2>

            <RouterLink to="/admin/userList" class="btn btn-outline-secondary">
              Quay lại
            </RouterLink>
          </div>

          <form @submit.prevent="handleSubmit">
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
                  type="password"
                  class="form-control"
                  placeholder="Nhập mật khẩu"
                  v-model="formData.password"
                  required
                />
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label fw-semibold"> Vai trò </label>
                <select class="form-select" v-model="formData.role" required>
                  <option value="" disabled>-- Chọn vai trò --</option>
                  <option value="user">Khách hàng</option>
                  <option value="admin">Quản trị viên</option>
                </select>
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2 mt-3">
              <RouterLink to="/admin/userList" class="btn btn-secondary">Hủy</RouterLink>
              <button type="submit" class="btn btn-success" :disabled="loading">
                 {{ loading ? 'Đang thêm...' : 'Thêm người dùng' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UserService from '../../../services/userService';

const router = useRouter();
const userService = new UserService();
const loading = ref(false);

const formData = ref({
    name: '',
    email: '',
    password: '',
    role: 'user'
});

const handleSubmit = async () => {
    loading.value = true;
    try {
        const payload = {
            id: Date.now().toString(),
            name: formData.value.name,
            email: formData.value.email,
            password: formData.value.password,
            role: formData.value.role
        };
        
        await userService.create(payload);
        alert('Thêm người dùng thành công!');
        router.push('/admin/userList');
    } catch (error) {
        console.error(error);
        alert('Lỗi thêm người dùng');
    } finally {
        loading.value = false;
    }
};
</script>