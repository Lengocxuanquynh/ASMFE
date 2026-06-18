<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import BlogService from '../../services/blogService';
import UserService from '../../services/userService';

const route = useRoute();
const blogService = new BlogService();
const userService = new UserService();

const blog = ref(null);
const users = ref([]);
const currentUser = ref(null);

const commentText = ref('');
const editingCommentId = ref(null);
const editingCommentText = ref('');

const fetchData = async () => {
    try {
        const [blogRes, usersRes] = await Promise.all([
            blogService.getById(route.params.id),
            userService.list()
        ]);
        blog.value = blogRes.data;
        users.value = usersRes.data || [];
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu bài viết:", error);
    }
};

const authorName = computed(() => {
    if (!blog.value || !users.value.length) return 'Unknown';
    const author = users.value.find(u => u.id === blog.value.author_id);
    return author ? author.name : 'Unknown';
});

const getCategoryName = (id) => {
    if (id === '1') return 'Cà phê';
    if (id === '2') return 'Kiến thức';
    return 'Ẩm thực';
};

const getUserInfo = (userId) => {
    const user = users.value.find(u => String(u.id) === String(userId));
    if (user) {
        return {
            name: user.name || user.firstName,
            avatar: user.avatar || 'https://i.pravatar.cc/150'
        };
    }
    return { name: 'Người dùng ẩn danh', avatar: 'https://i.pravatar.cc/150' };
};

const addComment = async () => {
    if (!commentText.value.trim() || !currentUser.value) return;

    if (!blog.value.comments) {
        blog.value.comments = [];
    }

    const newComment = {
        id: Date.now().toString(),
        user_id: String(currentUser.value.id),
        content: commentText.value.trim(),
        created_at: new Date().toLocaleDateString('vi-VN'),
        replies: []
    };

    blog.value.comments.push(newComment);
    
    try {
        await blogService.update(blog.value.id, blog.value);
        commentText.value = '';
    } catch (error) {
        console.error("Lỗi khi thêm bình luận:", error);
        alert("Có lỗi xảy ra khi gửi bình luận.");
    }
};

const startEdit = (comment) => {
    editingCommentId.value = comment.id;
    editingCommentText.value = comment.content;
};

const cancelEdit = () => {
    editingCommentId.value = null;
    editingCommentText.value = '';
};

const saveEdit = async (comment) => {
    if (!editingCommentText.value.trim()) return;

    const index = blog.value.comments.findIndex(c => c.id === comment.id);
    if (index !== -1) {
        blog.value.comments[index].content = editingCommentText.value.trim();
        
        try {
            await blogService.update(blog.value.id, blog.value);
            editingCommentId.value = null;
            editingCommentText.value = '';
        } catch (error) {
            console.error("Lỗi khi sửa bình luận:", error);
            alert("Có lỗi xảy ra khi cập nhật bình luận.");
        }
    }
};

const deleteComment = async (commentId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa bình luận này?")) return;

    blog.value.comments = blog.value.comments.filter(c => c.id !== commentId);
    
    try {
        await blogService.update(blog.value.id, blog.value);
    } catch (error) {
        console.error("Lỗi khi xóa bình luận:", error);
        alert("Có lỗi xảy ra khi xóa bình luận.");
    }
};

onMounted(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
        currentUser.value = JSON.parse(userData);
    }
    fetchData();
});
</script>

<template>
  <div class="blog-detail-page py-5">
    <div class="container" v-if="blog">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          
          <img
            :src="blog.image"
            :alt="blog.title"
            class="img-fluid rounded-4 shadow-sm mb-4 w-100"
            style="max-height: 400px; object-fit: cover;"
          />

          <span class="badge category-badge mb-3">
            {{ getCategoryName(blog.category_id) }}
          </span>

          <h1 class="fw-bold mb-3 title-coffee">
            {{ blog.title }}
          </h1>

          <div class="text-muted mb-4 d-flex align-items-center">
            <span>Đăng bởi <strong>{{ authorName }}</strong></span>
            <span class="mx-2">•</span>
            <span>{{ blog.created_at || 'Mới đây' }}</span>
            <span class="mx-2">•</span>
            <span>👁️ {{ blog.views || 0 }} lượt xem</span>
          </div>

          <p class="fs-5 text-secondary content-text">
            {{ blog.content }}
          </p>

          <RouterLink
            to="/blog"
            class="btn btn-outline-coffee mt-4 mb-5"
          >
            <i class="bi bi-arrow-left me-2"></i> Quay lại bài viết
          </RouterLink>

          <hr class="mb-5 custom-hr" />

          <!-- Comment Section -->
          <div class="comments-section">
            <h3 class="mb-4">Bình luận ({{ blog.comments?.length || 0 }})</h3>

            <!-- Comment Input -->
            <div class="comment-input-box mb-5" v-if="currentUser">
              <div class="d-flex gap-3">
                <img :src="currentUser.avatar || 'https://i.pravatar.cc/150'" alt="Avatar" class="rounded-circle avatar-sm" />
                <div class="flex-grow-1">
                  <textarea 
                    class="form-control custom-textarea" 
                    rows="3" 
                    placeholder="Chia sẻ cảm nghĩ của bạn về bài viết..."
                    v-model="commentText"
                  ></textarea>
                  <div class="text-end mt-2">
                    <button class="btn btn-coffee" @click="addComment" :disabled="!commentText.trim()">
                      Gửi bình luận
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="alert alert-coffee text-center mb-5" v-else>
              Vui lòng <RouterLink to="/login" class="fw-bold text-coffee-dark">đăng nhập</RouterLink> để tham gia bình luận.
            </div>

            <!-- Comments List -->
            <div class="comment-list">
              <div v-for="comment in (blog.comments || [])" :key="comment.id" class="comment-item mb-4">
                <div class="d-flex gap-3">
                  <img :src="getUserInfo(comment.user_id).avatar" alt="Avatar" class="rounded-circle avatar-sm" />
                  <div class="comment-content-wrapper flex-grow-1">
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <h6 class="mb-1 fw-bold">{{ getUserInfo(comment.user_id).name }}</h6>
                        <small class="text-muted">{{ comment.created_at }}</small>
                      </div>
                      
                      <!-- Edit/Delete actions -->
                      <div class="comment-actions" v-if="currentUser && String(currentUser.id) === comment.user_id && editingCommentId !== comment.id">
                        <button class="btn btn-sm btn-link text-secondary" @click="startEdit(comment)" title="Sửa">
                          <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-link text-danger" @click="deleteComment(comment.id)" title="Xóa">
                          <i class="bi bi-trash"></i>
                        </button>
                      </div>
                    </div>

                    <!-- Display Content or Edit Mode -->
                    <div v-if="editingCommentId === comment.id" class="mt-2">
                      <textarea 
                        class="form-control custom-textarea mb-2" 
                        rows="2" 
                        v-model="editingCommentText"
                      ></textarea>
                      <div class="text-end gap-2 d-flex justify-content-end">
                        <button class="btn btn-sm btn-outline-secondary" @click="cancelEdit">Hủy</button>
                        <button class="btn btn-sm btn-coffee" @click="saveEdit(comment)" :disabled="!editingCommentText.trim()">Lưu</button>
                      </div>
                    </div>
                    <div v-else class="mt-2 text-dark">
                      {{ comment.content }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    
    <div class="container text-center py-5" v-else>
        <div class="spinner-border text-coffee" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2 text-muted">Đang tải bài viết...</p>
    </div>
  </div>
</template>

<style scoped>
.blog-detail-page {
  font-family: 'Inter', sans-serif;
  background-color: #faf8f5;
  min-height: 100vh;
}

.category-badge {
  background-color: #8b5a2b;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
}

.title-coffee {
  color: #3e2723;
  letter-spacing: -0.5px;
}

.content-text {
  line-height: 1.8;
  white-space: pre-wrap;
}

.custom-hr {
  border-color: #d7ccc8;
  opacity: 0.5;
}

.btn-outline-coffee {
  color: #8b5a2b;
  border-color: #8b5a2b;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-outline-coffee:hover {
  background-color: #8b5a2b;
  color: white;
}

.btn-coffee {
  background-color: #8b5a2b;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-coffee:hover:not(:disabled) {
  background-color: #6d4c41;
}

.alert-coffee {
  background-color: #f5ebd9;
  border-color: #e8d5c4;
  color: #5d4037;
  border-radius: 12px;
}

.text-coffee-dark {
  color: #3e2723;
  text-decoration: underline;
}

.avatar-sm {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border: 2px solid #e8d5c4;
}

.custom-textarea {
  border: 1px solid #d7ccc8;
  border-radius: 12px;
  background-color: #ffffff;
  resize: none;
}

.custom-textarea:focus {
  border-color: #8b5a2b;
  box-shadow: 0 0 0 0.25rem rgba(139, 90, 43, 0.1);
}

.comment-content-wrapper {
  background-color: #ffffff;
  padding: 1.25rem;
  border-radius: 16px;
  border: 1px solid rgba(139, 90, 43, 0.08);
  box-shadow: 0 4px 15px rgba(139, 90, 43, 0.02);
}

.comment-actions button {
  padding: 0 0.5rem;
  opacity: 0.7;
}

.comment-actions button:hover {
  opacity: 1;
}
</style>