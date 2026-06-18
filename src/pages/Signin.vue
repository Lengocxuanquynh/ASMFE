<script setup>
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const apiError = ref('');
const apiSuccess = ref('');

const { errors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema: yup.object({
    firstName: yup.string().required('Vui lòng nhập họ.'),
    lastName: yup.string().required('Vui lòng nhập tên.'),
    email: yup.string().email('Email không hợp lệ.').required('Vui lòng nhập email.'),
    password: yup.string().min(6, 'Mật khẩu phải từ 6 ký tự.').required('Vui lòng nhập mật khẩu.'),
    terms: yup.boolean().oneOf([true], 'Bạn phải đồng ý với điều khoản.'),
  }),
});

const [firstName, firstNameProps] = defineField('firstName');
const [lastName, lastNameProps] = defineField('lastName');
const [email, emailProps] = defineField('email');
const [password, passwordProps] = defineField('password');
const [terms, termsProps] = defineField('terms');

const onSubmit = handleSubmit(async (values) => {
  apiError.value = '';
  apiSuccess.value = '';
  try {
    // Check if email already exists
    const { data: existingUsers } = await axios.get(`http://localhost:3000/users?email=${values.email}`);
    if (existingUsers.length > 0) {
      apiError.value = 'Email này đã được sử dụng. Vui lòng đăng nhập.';
      return;
    }
    
    // Create new user
    const newUser = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      role: 'user', // default role
      name: `${values.firstName} ${values.lastName}`
    };
    
    await axios.post('http://localhost:3000/users', newUser);
    apiSuccess.value = 'Đăng ký thành công! Đang chuyển hướng...';
    
    setTimeout(() => {
      router.push('/login');
    }, 1500);
    
  } catch (error) {
    apiError.value = 'Có lỗi xảy ra khi kết nối máy chủ.';
  }
});
</script>

<template>
  <div class="auth-wrapper d-flex justify-content-center align-items-center">
    <div class="auth-card row g-0">
      <div class="col-md-5 d-none d-md-block image-container">
        <img
          class="img-side"
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop"
          alt="Coffee Shop"
        />
        <div class="img-overlay">
          <div class="overlay-text">
            <h2>Gia Nhập Cùng Chúng Tôi</h2>
            <p>Đăng ký để nhận ưu đãi và tích điểm thành viên</p>
          </div>
        </div>
      </div>
      <div class="col-md-7 p-4 p-md-5 d-flex align-items-center">
        <div class="w-100 form-container">
          <div class="text-center mb-4">
            <div class="brand-icon mb-2">
              <i class="bi bi-cup-hot-fill"></i>
            </div>
            <h3 class="auth-title">Tạo Tài Khoản</h3>
            <p class="auth-subtitle">Đăng ký thành viên mới cực kỳ nhanh chóng</p>
          </div>

          <form @submit.prevent="onSubmit">
            <div class="row g-3 mb-3">
              <div class="col-sm-6 input-group-custom">
                <label class="form-label-custom">Họ</label>
                <div class="input-with-icon">
                  <i class="bi bi-person icon"></i>
                  <input v-model="firstName" v-bind="firstNameProps" class="form-control-custom" :class="{'is-invalid': errors.firstName}" placeholder="Nhập họ..." />
                </div>
                <div class="text-danger small mt-1" v-if="errors.firstName">{{ errors.firstName }}</div>
              </div>

              <div class="col-sm-6 input-group-custom">
                <label class="form-label-custom">Tên</label>
                <div class="input-with-icon">
                  <i class="bi bi-person icon"></i>
                  <input v-model="lastName" v-bind="lastNameProps" class="form-control-custom" :class="{'is-invalid': errors.lastName}" placeholder="Nhập tên..." />
                </div>
                <div class="text-danger small mt-1" v-if="errors.lastName">{{ errors.lastName }}</div>
              </div>
            </div>

            <div class="mb-3 input-group-custom">
              <label class="form-label-custom">Email</label>
              <div class="input-with-icon">
                <i class="bi bi-envelope icon"></i>
                <input v-model="email" v-bind="emailProps" type="email" class="form-control-custom" :class="{'is-invalid': errors.email}" placeholder="Nhập email..." />
              </div>
              <div class="text-danger small mt-1" v-if="errors.email">{{ errors.email }}</div>
            </div>

            <div class="mb-3 input-group-custom">
              <label class="form-label-custom">Mật khẩu</label>
              <div class="input-with-icon">
                <i class="bi bi-lock icon"></i>
                <input v-model="password" v-bind="passwordProps" type="password" class="form-control-custom" :class="{'is-invalid': errors.password}" placeholder="Nhập mật khẩu..." />
              </div>
              <div class="text-danger small mt-1" v-if="errors.password">{{ errors.password }}</div>
            </div>

            <div class="form-check custom-checkbox mb-2">
              <input v-model="terms" v-bind="termsProps" class="form-check-input" :class="{'is-invalid': errors.terms}" type="checkbox" id="termsCheck" />
              <label class="form-check-label" for="termsCheck">
                Tôi đồng ý với các <a href="#" class="forgot-link">điều khoản dịch vụ</a>
              </label>
            </div>
            <div class="text-danger small mb-4" v-if="errors.terms">{{ errors.terms }}</div>

            <div v-if="apiError" class="alert alert-danger p-2 text-center" role="alert">
              {{ apiError }}
            </div>
            <div v-if="apiSuccess" class="alert alert-success p-2 text-center" role="alert">
              {{ apiSuccess }}
            </div>

            <button type="submit" class="btn-auth w-100" :disabled="isSubmitting">
              <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              {{ isSubmitting ? 'Đang xử lý...' : 'Tạo Tài Khoản' }}
            </button>
          </form>

          <p class="text-center mt-4 register-prompt">
            Bạn đã có tài khoản?
            <RouterLink to="/login" class="register-link">Đăng nhập ngay</RouterLink>
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
  padding: 0 1rem;
}

.brand-icon {
  font-size: 2.2rem;
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
  height: 48px;
  padding: 0.5rem 1.25rem 0.5rem 3rem;
  border-radius: 12px;
  border: 1px solid #d7ccc8;
  background-color: #faf8f5;
  color: #3e2723;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.form-control-custom:focus {
  outline: none;
  border-color: #8b5a2b;
  background-color: #ffffff;
  box-shadow: 0 0 0 4px rgba(139, 90, 43, 0.1);
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

.custom-checkbox .form-check-input {
  cursor: pointer;
}

.custom-checkbox .form-check-input:checked {
  background-color: #8b5a2b;
  border-color: #8b5a2b;
}

.custom-checkbox .form-check-label {
  color: #5d4037;
  font-size: 0.9rem;
  cursor: pointer;
}

.btn-auth {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #8b5a2b 0%, #6d4c41 100%);
  color: white;
  border: none;
  height: 50px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.05rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(139, 90, 43, 0.25);
}

.btn-auth:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(139, 90, 43, 0.35);
  color: white;
}

.register-prompt {
  color: #795548;
  font-size: 0.95rem;
}

.register-link {
  color: #8b5a2b;
  font-weight: 600;
  text-decoration: none;
  margin-left: 0.25rem;
  transition: color 0.2s ease;
}

.register-link:hover {
  color: #5d4037;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .form-container {
    padding: 1rem 0;
  }
}
</style>
