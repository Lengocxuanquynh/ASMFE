<template>
  <div class="banner-wrapper mt-4">
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner custom-carousel-inner">
        <div class="carousel-item active">
          <div class="image-overlay"></div>
          <img src="/src/assets/img/A_small_cup_of_coffee.JPG" class="d-block w-100 box-banner" alt="Hương Vị Nguyên Bản">
          <div class="carousel-caption d-none d-md-block caption-custom">
            <h2 class="banner-title">Hương Vị Nguyên Bản</h2>
            <p class="banner-subtitle">Khởi đầu ngày mới với tách cà phê đậm đà</p>
          </div>
        </div>
        <div class="carousel-item">
          <div class="image-overlay"></div>
          <img src="/src/assets/img/ca-phe-nau-soi-1.jpg" class="d-block w-100 box-banner" alt="Cà Phê Rang Xay">
          <div class="carousel-caption d-none d-md-block caption-custom">
            <h2 class="banner-title">Cà Phê Rang Xay</h2>
            <p class="banner-subtitle">Tuyển chọn từ những hạt cà phê ngon nhất</p>
          </div>
        </div>
        <div class="carousel-item">
          <div class="image-overlay"></div>
          <img src="/src/assets/img/hat-ca-phe-va-nhung-dieu-thu-vi-4-1280x800.jpg" class="d-block w-100 box-banner" alt="Không Gian Thư Giãn">
          <div class="carousel-caption d-none d-md-block caption-custom">
            <h2 class="banner-title">Không Gian Thư Giãn</h2>
            <p class="banner-subtitle">Góc nhỏ bình yên giữa lòng thành phố</p>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.banner-wrapper {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(109, 76, 65, 0.15);
  margin-bottom: 2rem;
}

.custom-carousel-inner {
  border-radius: 24px;
}

.box-banner {
  height: 500px;
  object-fit: cover;
  object-position: center;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(62, 39, 35, 0.8) 0%, rgba(62, 39, 35, 0.2) 50%, rgba(0, 0, 0, 0.1) 100%);
  z-index: 1;
}

.caption-custom {
  z-index: 2;
  bottom: 40px;
}

.banner-title {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: 3rem;
  color: #fff;
  text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
  margin-bottom: 10px;
}

.banner-subtitle {
  font-size: 1.2rem;
  color: #f5eedc;
  font-weight: 500;
  text-shadow: 1px 1px 5px rgba(0,0,0,0.5);
}

.carousel-control-prev,
.carousel-control-next {
  z-index: 3;
}
</style>