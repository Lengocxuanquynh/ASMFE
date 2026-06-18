<script setup>
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const route = useRoute();
const apiError = ref('');

const { errors, defineField, handleSubmit, isSubmitting } = useForm({
    validationSchema: yup.object({
        email: yup
            .string()
            .email('Email phải có định dạng hợp lệ.')
            .required('Vui lòng nhập Email.'),
        password: yup
            .string()
            .min(6, 'Mật khẩu phải có ít nhất 6 ký tự.')
            .required('Vui lòng nhập Mật khẩu.'),
    }),
});

const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');

const submitLogin = handleSubmit(async (values) => {
    apiError.value = '';

    try {
        const response = await axios.get(`http://localhost:3000/users?email=${values.email}`);

        const users = response.data;
        console.log(users);
        
        if (users.length === 0) {
            apiError.value = 'Email hoặc mật khẩu không chính xác.';
            return;
        }

        const user = users[0];
        if (user.password !== values.password) {
            apiError.value = 'Email hoặc mật khẩu không chính xác.';
            return;
        }

        const mockToken = user.token || 'dummy_token';
        const role = user.role || 'user';
        
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', role);
        localStorage.setItem('token', mockToken);

        if (role === 'admin') {
            router.push('/admin');
        } else {
            router.push({ path: '/' });
        }

    } catch (error) {
        console.error("Lỗi kết nối API:", error);
        apiError.value = 'Không thể kết nối đến máy chủ đăng nhập.';
    }
});
</script>
<template>
    <div class="auth-wrapper d-flex justify-content-center align-items-center">
        <div class="auth-card row g-0">
            <div class="col-md-5 d-none d-md-block image-container">
                <img class="img-side" src="https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop" alt="Coffee and Bakery" />
                <div class="img-overlay">
                    <div class="overlay-text">
                        <h2>Hương Vị Đích Thực</h2>
                        <p>Thưởng thức cà phê đậm đà và bánh ngọt hấp dẫn</p>
                    </div>
                </div>
            </div>
            <div class="col-md-7 p-4 p-md-5 d-flex align-items-center">
                <div class="w-100 form-container">
                    <div class="text-center mb-5">
                        <div class="brand-icon mb-3">
                            <i class="bi bi-cup-hot-fill"></i>
                        </div>
                        <h3 class="auth-title">Đăng Nhập Quán</h3>
                        <p class="auth-subtitle">Chào mừng bạn trở lại với hệ thống</p>
                    </div>

                    <form @submit.prevent="submitLogin">
                        <div class="mb-4 input-group-custom">
                            <label for="email" class="form-label-custom">Email đăng nhập</label>
                            <div class="input-with-icon">
                                <i class="bi bi-envelope icon"></i>
                                <input v-model="email" v-bind="emailProps" type="email" id="email" class="form-control-custom"
                                    :class="{ 'is-invalid': errors.email }" placeholder="admin@example.com">
                            </div>
                            <div class="error-text" v-if="errors.email">
                                <i class="bi bi-exclamation-circle me-1"></i>{{ errors.email }}
                            </div>
                        </div>

                        <div class="mb-4 input-group-custom">
                            <label for="password" class="form-label-custom d-flex justify-content-between">
                                Mật khẩu
                                <a href="#" class="forgot-link">Quên mật khẩu?</a>
                            </label>
                            <div class="input-with-icon">
                                <i class="bi bi-lock icon"></i>
                                <input v-model="password" v-bind="passwordProps" type="password" id="password" class="form-control-custom"
                                    :class="{ 'is-invalid': errors.password }" placeholder="******">
                            </div>
                            <div class="error-text" v-if="errors.password">
                                <i class="bi bi-exclamation-circle me-1"></i>{{ errors.password }}
                            </div>
                        </div>

                        <div v-if="apiError" class="alert alert-danger p-2 text-center custom-alert" role="alert">
                            {{ apiError }}
                        </div>

                        <button type="submit" class="btn-auth w-100" :disabled="isSubmitting">
                            <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"
                                aria-hidden="true"></span>
                            {{ isSubmitting ? 'Đang xử lý...' : 'Đăng Nhập' }}
                        </button>
                    </form>

                    <p class="text-center mt-4 register-prompt">
                        <router-link to="/" class="back-link"><i class="bi bi-arrow-left me-1"></i> Về trang chủ</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.auth-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5ebd9 0%, #e8d5c4 100%);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  padding: 2rem 1rem;
}

.auth-card {
  width: 100%;
  max-width: 900px;
  background: #ffffff;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(139, 90, 43, 0.15);
}

.image-container {
  position: relative;
  overflow: hidden;
}

.img-side {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(62, 39, 35, 0.2), rgba(62, 39, 35, 0.85));
  display: flex;
  align-items: flex-end;
  padding: 3rem 2rem;
}

.overlay-text h2 {
  color: #fff9f0;
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 0.5rem;
  font-family: 'Georgia', serif;
}

.overlay-text p {
  color: rgba(255, 249, 240, 0.9);
  font-size: 1.1rem;
  margin: 0;
}

.form-container {
  padding: 1rem 2rem;
}

.brand-icon {
  font-size: 2.5rem;
  color: #8b5a2b;
}

.auth-title {
  font-weight: 800;
  color: #3e2723;
  font-size: 2rem;
  letter-spacing: -0.5px;
}

.auth-subtitle {
  color: #795548;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.form-label-custom {
  font-size: 0.95rem;
  font-weight: 600;
  color: #4e342e;
  margin-bottom: 0.5rem;
  display: block;
}

.input-with-icon {
  position: relative;
}

.input-with-icon .icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a1887f;
  font-size: 1.1rem;
}

.form-control-custom {
  width: 100%;
  height: 52px;
  padding: 0.5rem 1.25rem 0.5rem 3rem;
  border-radius: 12px;
  border: 1px solid #d7ccc8;
  background-color: #faf8f5;
  color: #3e2723;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control-custom:focus {
  outline: none;
  border-color: #8b5a2b;
  background-color: #ffffff;
  box-shadow: 0 0 0 4px rgba(139, 90, 43, 0.1);
}

.form-control-custom.is-invalid {
  border-color: #d32f2f;
}

.forgot-link {
  color: #8b5a2b;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.85rem;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #5d4037;
  text-decoration: underline;
}

.error-text {
  color: #d32f2f;
  font-size: 0.85rem;
  margin-top: 0.4rem;
  font-weight: 500;
}

.custom-alert {
  background-color: #fbe9e7;
  border-color: #ffccbc;
  color: #d32f2f;
  border-radius: 10px;
  font-size: 0.95rem;
}

.btn-auth {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #8b5a2b 0%, #6d4c41 100%);
  color: white;
  border: none;
  height: 52px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.05rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 90, 43, 0.25);
  margin-top: 1.5rem;
}

.btn-auth:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 90, 43, 0.35);
  color: white;
}

.btn-auth:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.back-link {
  color: #8d6e63;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #5d4037;
}

@media (max-width: 768px) {
  .form-container {
    padding: 1rem 0;
  }
}
</style>