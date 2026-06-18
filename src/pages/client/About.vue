<template>
  <div class="about-page">
    <div class="hero-section text-center d-flex align-items-center justify-content-center">
      <div class="hero-content">
        <h1 class="display-3 fw-bold text-white mb-3">Câu Chuyện Của Chúng Tôi</h1>
        <p class="lead text-white-50">Niềm đam mê với từng hạt cà phê và chiếc bánh ngọt.</p>
      </div>
    </div>


    <div class="container my-5 py-4">
      <div class="row align-items-center mb-5">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <img src="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&q=80" alt="Coffee Shop" class="img-fluid rounded-4 shadow-lg">
        </div>
        <div class="col-lg-6 px-lg-5">
          <h2 class="section-title mb-4">Khởi nguồn đam mê</h2>
          <p class="text-muted fs-5 lh-base mb-4">
            Bắt đầu từ một quán nhỏ ở góc phố vào năm 2026, Coffee & Bakery ra đời với một mong muốn đơn giản: mang đến những ly cà phê chất lượng nhất cùng những chiếc bánh ngọt thơm lừng, mới ra lò mỗi ngày.
          </p>
          <p class="text-muted fs-5 lh-base">
            Chúng tôi tin rằng, một tách cà phê ngon không chỉ là thức uống, mà là một trải nghiệm đánh thức các giác quan, kết nối con người và truyền cảm hứng cho những ý tưởng tuyệt vời.
          </p>
        </div>
      </div>

      <div class="row align-items-center flex-lg-row-reverse mt-5 pt-5">
        <div class="col-lg-6 mb-4 mb-lg-0">
          <img src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80" alt="Bakery" class="img-fluid rounded-4 shadow-lg">
        </div>
        <div class="col-lg-6 px-lg-5">
          <h2 class="section-title mb-4">Nghệ thuật làm bánh</h2>
          <p class="text-muted fs-5 lh-base mb-4">
            Mỗi chiếc bánh tại cửa hàng đều được tạo ra từ đôi bàn tay khéo léo của các nghệ nhân làm bánh. Từ việc lựa chọn bơ Pháp hảo hạng, bột mì nguyên cám cho đến lớp kem tươi mềm mịn.
          </p>
          <ul class="list-unstyled mt-4 fs-5 text-muted">
            <li class="mb-3"><i class="bi bi-check-circle-fill text-coffee me-2"></i> Nguyên liệu 100% tự nhiên</li>
            <li class="mb-3"><i class="bi bi-check-circle-fill text-coffee me-2"></i> Nướng mới mỗi ngày</li>
            <li class="mb-3"><i class="bi bi-check-circle-fill text-coffee me-2"></i> Công thức độc quyền</li>
          </ul>
        </div>
      </div>
    </div>

    
    <div class="stats-section py-5 mt-5 ">
      <div class="container">
        <div class="row text-center text-white">
          <div class="col-md-4 mb-4 mb-md-0">
            <h1 class="display-4 fw-bold mb-2">5+</h1>
            <p class="fs-5 opacity-75">Năm Kinh Nghiệm</p>
          </div>
          <div class="col-md-4 mb-4 mb-md-0">
            <h1 class="display-4 fw-bold mb-2">20+</h1>
            <p class="fs-5 opacity-75">Loại Cà Phê</p>
          </div>
          <div class="col-md-4">
            <h1 class="display-4 fw-bold mb-2">10k+</h1>
            <p class="fs-5 opacity-75">Khách Hàng Hài Lòng</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-section {
  height: 50vh;
  min-height: 400px;
  background: linear-gradient(rgba(62, 39, 35, 0.6), rgba(62, 39, 35, 0.8)), url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80') center/cover fixed;
  border-radius: 0 0 40px 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.hero-content {
  max-width: 800px;
  padding: 0 20px;
}

.section-title {
  color: #3e2723;
  font-weight: 800;
  font-family: 'Inter', sans-serif;
  letter-spacing: -1px;
}

.text-coffee {
  color: #8b5a2b;
}

.stats-section {
  background: linear-gradient(135deg, #8b5a2b 0%, #5d4037 100%);
  border-radius: 24px;
}

img {
  transition: transform 0.3s ease;
}

img:hover {
  transform: translateY(-5px);
}
</style>