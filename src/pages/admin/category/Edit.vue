<script setup>
import { onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import CategoryService from "../../../services/categoryService";
import ImageUpload from "../../../components/Image.vue";

const router = useRouter();
const route = useRoute();
const categoryService = new CategoryService();

const categoryID = computed(() => route.params.id);

const handleImageUpload = (data) => {
  image.value = data.secure_url;
};

const { errors, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      name: yup
        .string()
        .required("Vui lòng nhập tên nước uống")
        .min(3, "Ít nhất 3 ký tự"),

      description: yup
        .string()
        .required("Vui lòng nhập mô tả")
        .min(6, "Ít nhất 6 ký tự"),

      image: yup
        .string()
        .required("Vui lòng chọn ảnh"),

      status: yup
        .string()
        .required("Vui lòng chọn trạng thái"),
      type: yup
        .string()
        .required("Vui lòng chọn thể loại"),
    })
  ),
});

const { value: name } = useField("name");
const { value: description } = useField("description");
const { value: image } = useField("image");
const { value: status } = useField("status");
const { value: type } = useField("type");
const { value: createdAt } = useField("createdAt");

const getDetail = async () => {
  try {
    const res = await categoryService.getById(
      categoryID.value
    );

    name.value = res.data.name || "";
    description.value = res.data.description || "";
    image.value = res.data.image || "";
    status.value = res.data.status || "";
    type.value = res.data.type || "";
    createdAt.value = res.data.createdAt || "";
  } catch (err) {
    console.error(
      "GET CATEGORY ERROR:",
      err.response?.data || err.message
    );

    alert("Không thể tải thông tin món.");
  }
};

const update = handleSubmit(async (values) => {
  try {
    const data = {
      name: values.name,
      description: values.description,
      image: values.image,
      status: values.status,
      type: values.type,
      createdAt: createdAt.value,
      updatedAt: new Date().toLocaleString("vi-VN"),
    };

    const res = await categoryService.update(
      categoryID.value,
      data
    );

    if (res.status === 200) {
      alert("Cập nhật món thành công.");
      router.push("/admin/categoryList");
    }
  } catch (err) {
    console.error(
      "UPDATE CATEGORY ERROR:",
      err.response?.data || err.message
    );

    alert("Cập nhật món thất bại.");
  }
});

onMounted(() => {
  getDetail();
});
</script>

<template>
  <div class="admin-dashboard p-4">
    <div class="form-card">
      <div class="card-header-custom">
        <div class="header-left">
          <div class="icon-box">
            <i class="bi bi-pencil-square"></i>
          </div>
          <div>
            <h2 class="page-title">Chỉnh Sửa Món</h2>
            <p class="page-subtitle">Cập nhật thông tin chi tiết cho món trong sản phẩm</p>
          </div>
        </div>

        <RouterLink to="/admin/categoryList" class="btn-secondary-custom">
          <i class="bi bi-arrow-left me-2"></i> Quay Lại
        </RouterLink>
      </div>

      <div class="card-body-custom">
        <form @submit.prevent="update" class="modern-form">
          <div class="row g-4">
            <div class="col-md-4">
              <div class="form-group">
                <label class="form-label-custom">Hình Ảnh Sản Phẩm <span class="required">*</span></label>
                <div class="upload-wrapper">
                  <!-- Show current image preview if available -->
                  <div class="current-image mb-3" v-if="image">
                    <img :src="image" alt="Current Image" class="img-preview" />
                  </div>
                  <ImageUpload @submitData="handleImageUpload" />
                  <div class="error-msg" v-if="errors.image"><i class="bi bi-exclamation-circle me-1"></i>{{ errors.image }}</div>
                </div>
              </div>
            </div>

            <div class="col-md-8">
              <div class="form-group mb-4">
                <label class="form-label-custom" for="category-name">Tên Món <span class="required">*</span></label>
                <div class="input-wrapper">
                  <i class="bi bi-cup-straw input-icon"></i>
                  <input id="category-name" type="text" class="form-control-custom" placeholder="Nhập tên món" v-model="name" />
                </div>
                <div class="error-msg" v-if="errors.name"><i class="bi bi-exclamation-circle me-1"></i>{{ errors.name }}</div>
              </div>

              <div class="row g-4 mb-4">
                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label-custom">Thể Loại <span class="required">*</span></label>
                    <div class="select-wrapper">
                      <select class="form-select-custom" v-model="type">
                        <option value="" disabled>Chọn thể loại</option>
                        <option value="Đồ uống">Đồ uống</option>
                        <option value="Bánh">Bánh</option>
                      </select>
                      <i class="bi bi-chevron-down select-icon"></i>
                    </div>
                    <div class="error-msg" v-if="errors.type"><i class="bi bi-exclamation-circle me-1"></i>{{ errors.type }}</div>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <label class="form-label-custom">Trạng Thái <span class="required">*</span></label>
                    <div class="select-wrapper">
                      <select class="form-select-custom" v-model="status">
                        <option value="" disabled>Chọn trạng thái</option>
                        <option value="Hiển thị">Hiển thị</option>
                        <option value="Ẩn">Ẩn</option>
                      </select>
                      <i class="bi bi-chevron-down select-icon"></i>
                    </div>
                    <div class="error-msg" v-if="errors.status"><i class="bi bi-exclamation-circle me-1"></i>{{ errors.status }}</div>
                  </div>
                </div>
              </div>

              <div class="form-group mb-4">
                <label class="form-label-custom" for="category-description">Mô Tả Sản Phẩm <span class="required">*</span></label>
                <textarea id="category-description" class="form-control-custom textarea-custom" rows="4" placeholder="Nhập mô tả chi tiết về món..." v-model="description"></textarea>
                <div class="error-msg" v-if="errors.description"><i class="bi bi-exclamation-circle me-1"></i>{{ errors.description }}</div>
              </div>

              <div class="form-actions">
                <button type="button" class="btn-cancel" @click="router.push('/admin/categoryList')">
                  Hủy Bỏ
                </button>
                <button type="submit" class="btn-submit">
                  <i class="bi bi-check2-circle me-2"></i> Cập Nhật
                </button>
              </div>
            </div>
          </div>
        </form>
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

.form-card {
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

.btn-secondary-custom {
  background: #ffffff;
  color: #5d4037;
  border: 1px solid #d7ccc8;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-secondary-custom:hover {
  background: #faf8f5;
  color: #3e2723;
  border-color: #a1887f;
}

.card-body-custom {
  padding: 2.5rem;
}

.form-label-custom {
  font-weight: 600;
  color: #4e342e;
  margin-bottom: 0.5rem;
  display: block;
  font-size: 0.95rem;
}

.required {
  color: #d32f2f;
}

.input-wrapper, .select-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a1887f;
  font-size: 1.1rem;
}

.select-icon {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #a1887f;
  pointer-events: none;
}

.form-control-custom, .form-select-custom {
  width: 100%;
  padding: 0.85rem 1.25rem;
  font-size: 1rem;
  color: #3e2723;
  background-color: #faf8f5;
  border: 1px solid #d7ccc8;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.form-control-custom:focus, .form-select-custom:focus {
  outline: none;
  background-color: #ffffff;
  border-color: #8b5a2b;
  box-shadow: 0 0 0 4px rgba(139, 90, 43, 0.1);
}

.input-wrapper .form-control-custom {
  padding-left: 3rem;
}

.form-select-custom {
  appearance: none;
  padding-right: 3rem;
}

.textarea-custom {
  resize: vertical;
  min-height: 120px;
}

.upload-wrapper {
  background: #faf8f5;
  border: 1px dashed #d7ccc8;
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.upload-wrapper:hover {
  border-color: #a1887f;
  background: #f5ebd9;
}

.img-preview {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(139, 90, 43, 0.1);
}

.error-msg {
  color: #d32f2f;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  font-weight: 500;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f5ebd9;
}

.btn-cancel {
  background: #f5ebd9;
  color: #5d4037;
  border: none;
  padding: 0.85rem 1.75rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel:hover {
  background: #e8d5c4;
  color: #3e2723;
}

.btn-submit {
  background: linear-gradient(135deg, #8b5a2b 0%, #6d4c41 100%);
  color: white;
  border: none;
  padding: 0.85rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(139, 90, 43, 0.2);
  display: inline-flex;
  align-items: center;
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(139, 90, 43, 0.3);
}
</style>
