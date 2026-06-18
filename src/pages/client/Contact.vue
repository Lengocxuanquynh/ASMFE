<template>
  <div class="contact-page">
    <div class="banner-section text-center py-5 mb-5">
      <h1 class="display-4 fw-bold text-white mb-3">Liên Hệ Với Chúng Tôi</h1>
      <p class="lead text-white-50">Hãy để lại lời nhắn, chúng tôi sẽ phản hồi sớm nhất có thể.</p>
    </div>

    <div class="container mb-5">
      <div class="row g-5">
        <!-- Contact Info -->
        <div class="col-lg-5">
          <div class="contact-info-card p-4 h-100">
            <h3 class="mb-4" style="color: #3e2723; font-weight: 700;">Thông tin liên hệ</h3>
            
            <div class="d-flex align-items-center mb-4">
              <div class="icon-box me-3">
                <i class="bi bi-geo-alt-fill"></i>
              </div>
              <div>
                <h6 class="mb-1 fw-bold text-coffee">Địa chỉ</h6>
                <p class="mb-0 text-muted">123 Đường Cà Phê, Quận 1, TP. HCM</p>
              </div>
            </div>

            <div class="d-flex align-items-center mb-4">
              <div class="icon-box me-3">
                <i class="bi bi-telephone-fill"></i>
              </div>
              <div>
                <h6 class="mb-1 fw-bold text-coffee">Điện thoại</h6>
                <p class="mb-0 text-muted">+84 123 456 789</p>
              </div>
            </div>

            <div class="d-flex align-items-center mb-4">
              <div class="icon-box me-3">
                <i class="bi bi-envelope-fill"></i>
              </div>
              <div>
                <h6 class="mb-1 fw-bold text-coffee">Email</h6>
                <p class="mb-0 text-muted">hello@coffeebakery.com</p>
              </div>
            </div>
            
            <div class="mt-5">
              <h6 class="fw-bold text-coffee mb-3">Theo dõi chúng tôi</h6>
              <div class="d-flex gap-3">
                <a href="#" class="social-icon"><i class="bi bi-facebook"></i></a>
                <a href="#" class="social-icon"><i class="bi bi-instagram"></i></a>
                <a href="#" class="social-icon"><i class="bi bi-twitter"></i></a>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="col-lg-7">
          <div class="form-card p-5">
            <h3 class="mb-4" style="color: #3e2723; font-weight: 700;">Gửi tin nhắn</h3>
            <form>
              <div class="row g-3">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label text-coffee fw-semibold">Họ và tên</label>
                    <input type="text" class="form-control custom-input" placeholder="Nhập họ tên của bạn">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label class="form-label text-coffee fw-semibold">Email</label>
                    <input type="email" class="form-control custom-input" placeholder="Nhập email của bạn">
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-3">
                    <label class="form-label text-coffee fw-semibold">Chủ đề</label>
                    <input type="text" class="form-control custom-input" placeholder="Chủ đề tin nhắn">
                  </div>
                </div>
                <div class="col-12">
                  <div class="mb-4">
                    <label class="form-label text-coffee fw-semibold">Nội dung</label>
                    <textarea class="form-control custom-input" rows="5" placeholder="Bạn muốn nhắn nhủ điều gì?"></textarea>
                  </div>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn-coffee-solid w-100">Gửi Tin Nhắn <i class="bi bi-send ms-2"></i></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner-section {
  background: linear-gradient(rgba(62, 39, 35, 0.7), rgba(62, 39, 35, 0.7)), url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80') center/cover;
  border-radius: 0 0 30px 30px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.text-coffee {
  color: #8b5a2b;
}

.contact-info-card {
  background: #fdfbf7;
  border-radius: 20px;
  border: 1px solid rgba(139, 90, 43, 0.1);
}

.icon-box {
  width: 50px;
  height: 50px;
  background: #f5ebd9;
  color: #8b5a2b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  background: #fff;
  color: #8b5a2b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  border: 1px solid #d7ccc8;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: #8b5a2b;
  color: #fff;
  transform: translateY(-3px);
}

.form-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(139, 90, 43, 0.08);
  border: 1px solid rgba(139, 90, 43, 0.05);
}

.custom-input {
  border: 1px solid #d7ccc8;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  background-color: #faf8f5;
  transition: all 0.3s ease;
}

.custom-input:focus {
  border-color: #8b5a2b;
  box-shadow: 0 0 0 3px rgba(139, 90, 43, 0.1);
  outline: none;
  background-color: #ffffff;
}

.btn-coffee-solid {
  background: linear-gradient(135deg, #8b5a2b 0%, #6d4c41 100%);
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.btn-coffee-solid:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(139, 90, 43, 0.25);
}
</style>