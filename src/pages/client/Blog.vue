<script setup>
import { ref, onMounted } from 'vue';
import BlogService from '../../services/blogService';
import UserService from '../../services/userService';

const blogService = new BlogService();
const userService = new UserService();

const posts = ref([]);
const users = ref([]);

const fetchBlogs = async () => {
    try {
        const [blogsRes, usersRes] = await Promise.all([
            blogService.list(),
            userService.list()
        ]);
        
        users.value = usersRes.data || [];
        const rawBlogs = blogsRes.data || [];
        
        posts.value = rawBlogs.map(blog => {
            const author = users.value.find(u => u.id === blog.author_id);
            return {
                ...blog,
                tacGia: author ? author.name : 'Unknown'
            };
        });
    } catch (error) {
        console.error("Lỗi khi tải bài viết:", error);
    }
};

onMounted(() => {
    fetchBlogs();
});
</script>

<template>
    <div class="blog-page">
        <div class="blog-hero">
            <h1 class="hero-title">Chuyện Cà Phê & Bánh</h1>
            <p class="hero-subtitle">Khám phá những câu chuyện thú vị, bí quyết pha chế và công thức bánh ngọt tuyệt hảo.</p>
        </div>

        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-bold text-coffee mb-0">Tất cả bài viết</h3>
            <RouterLink to="/my-blog" class="btn btn-coffee shadow-sm">
                <i class="bi bi-pencil-square me-2"></i> Viết bài chia sẻ
            </RouterLink>
        </div>

        <div class="row g-4">
            <div class="col-xl-3 col-lg-4 col-md-6" v-for="item in posts" :key="item.id">
                <div class="modern-card">
                    <div class="card-img-wrapper">
                        <img :src="item.image" class="card-img" :alt="item.title">
                    </div>
                    <div class="card-content">
                        <div class="card-meta">
                            <span class="meta-author">{{ item.tacGia }}</span>
                        </div>
                        <h3 class="card-title">{{ item.title }}</h3>
                        <p class="card-desc two-line-ellipsis">{{ item.content }}</p>
                        <div class="card-action">
                            <RouterLink :to="`/blog/${item.id}`" class="read-more-btn">Đọc tiếp <span class="arrow">→</span></RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

.blog-page {
    padding: 2rem 1rem;
    max-width: 1400px;
    margin: 0 auto;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    background-color: #faf8f5;
}

.blog-hero {
    text-align: center;
    margin-bottom: 3.5rem;
    padding: 3.5rem 1.5rem;
    background: linear-gradient(135deg, #f5ebd9 0%, #e8d5c4 100%);
    border-radius: 28px;
    box-shadow: 0 4px 20px rgba(139, 90, 43, 0.05);
}

.hero-title {
    font-size: 3rem;
    font-weight: 800;
    color: #3e2723;
    margin-bottom: 1rem;
    letter-spacing: -0.5px;
}

.hero-subtitle {
    font-size: 1.15rem;
    color: #795548;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
}

.modern-card {
    background: #ffffff;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(139, 90, 43, 0.05);
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    height: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(139, 90, 43, 0.08);
}

.modern-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(139, 90, 43, 0.12);
}

.card-img-wrapper {
    position: relative;
    padding-top: 60%; /* Aspect Ratio */
    overflow: hidden;
}

.card-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s ease;
}

.modern-card:hover .card-img {
    transform: scale(1.08);
}


.card-content {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.9rem;
    color: #8c8c9e;
    margin-bottom: 1.25rem;
}

.meta-author {
    font-weight: 600;
    color: #5d4037;
    background: #f5ebd9;
    padding: 0.3rem 0.8rem;
    border-radius: 6px;
}

.card-title {
    font-size: 1.35rem;
    font-weight: 700;
    color: #3e2723;
    margin-bottom: 1rem;
    line-height: 1.4;
    transition: color 0.3s ease;
}

.modern-card:hover .card-title {
    color: #8b5a2b;
}

.card-desc {
    color: #64647a;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.75rem;
    flex-grow: 1;
}

.two-line-ellipsis {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.card-action {
    margin-top: auto;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(139, 90, 43, 0.08);
}

.read-more-btn {
    display: inline-flex;
    align-items: center;
    font-weight: 600;
    color: #8b5a2b;
    text-decoration: none;
    font-size: 1rem;
    transition: color 0.3s ease;
}

.read-more-btn .arrow {
    margin-left: 0.5rem;
    transition: transform 0.3s ease;
}

.read-more-btn:hover {
    color: #5d4037;
}

.read-more-btn:hover .arrow {
    transform: translateX(6px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
    .blog-hero {
        padding: 2.5rem 1rem;
        margin-bottom: 2rem;
    }
    .hero-title {
        font-size: 2.25rem;
    }
    .card-content {
        padding: 1.5rem;
    }
}

.text-coffee {
    color: #3e2723;
}

.btn-coffee {
    background-color: #8b5a2b;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    padding: 0.6rem 1.25rem;
    transition: all 0.2s;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
}

.btn-coffee:hover {
    background-color: #6d4c41;
    color: white;
    transform: translateY(-2px);
}
</style>