<template>
  <footer class="footer-coffee mt-auto">
    <div class="container py-5">
      <div class="row gy-4">
        <div class="col-lg-4 col-md-6">
          <div class="d-flex align-items-center mb-3">
            <div class="logo-icon-footer me-2">
              <i class="bi bi-cup-hot"></i>
            </div>
            <div class="brand-name-footer">
              <span class="text-white">Cà Phê</span>
            </div>
          </div>
          <p class="text-light-coffee mb-4">
            Mang đến những ly cà phê nguyên bản và không gian thư giãn tuyệt vời nhất cho bạn. Khởi đầu ngày mới tràn đầy năng lượng.
          </p>
        </div>
        
        <div class="col-lg-2 col-md-6">
          <h5 class="footer-title">Khám Phá</h5>
          <ul class="list-unstyled footer-links">
            <li><RouterLink to="/">Trang chủ</RouterLink></li>
            <li><RouterLink to="/product">Sản phẩm</RouterLink></li>
            <li><RouterLink to="/blog">Bài viết</RouterLink></li>
            <li><RouterLink to="/about">Giới thiệu</RouterLink></li>
          </ul>
        </div>
        
        <div class="col-lg-3 col-md-6">
          <h5 class="footer-title">Thông Tin</h5>
          <ul class="list-unstyled footer-links">
            <li><RouterLink to="/contact">Liên hệ</RouterLink></li>
            <li><RouterLink to="#">Chính sách bảo mật</RouterLink></li>
            <li><RouterLink to="#">Điều khoản sử dụng</RouterLink></li>
            <li><RouterLink to="#">Câu hỏi thường gặp</RouterLink></li>
          </ul>
        </div>
        
        <div class="col-lg-3 col-md-6">
          <h5 class="footer-title">Liên Hệ</h5>
          <ul class="list-unstyled footer-contact">
            <li><i class="bi bi-geo-alt me-2 text-gold"></i> 123 Đường Cà Phê, Quận 1, TP.HCM</li>
            <li><i class="bi bi-telephone me-2 text-gold"></i> 0123 456 789</li>
            <li><i class="bi bi-envelope me-2 text-gold"></i> hello@caphep.com</li>
          </ul>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom py-3 text-center">
      <div class="container">
        <p class="mb-0 text-light-coffee-muted">Copyright © 2025 Cà Phê - All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-coffee {
  background-color: #3e2723; /* Dark coffee background */
  color: #fff;
}

.logo-icon-footer {
  width: 40px;
  height: 40px;
  background-color: #cba052;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.brand-name-footer {
  font-size: 1.5rem;
  font-weight: 800;
  line-height: 1;
}

.text-gold {
  color: #cba052;
}

.text-light-coffee {
  color: #d7ccc8;
  font-size: 0.95rem;
  line-height: 1.6;
}

.footer-title {
  color: #fff;
  font-weight: 700;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.footer-title::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 40px;
  height: 2px;
  background-color: #cba052;
}

.footer-links li {
  margin-bottom: 0.8rem;
}

.footer-links a {
  color: #d7ccc8;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.footer-links a:hover {
  color: #cba052;
  padding-left: 5px;
}

.footer-contact li {
  color: #d7ccc8;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  display: flex;
  align-items: flex-start;
}

.social-icons a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-icons a:hover {
  background-color: #cba052;
  transform: translateY(-3px);
}

.footer-bottom {
  background-color: #2b1b18; /* Darker shade for the bottom bar */
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.text-light-coffee-muted {
  color: #a1887f;
  font-size: 0.9rem;
}
</style>