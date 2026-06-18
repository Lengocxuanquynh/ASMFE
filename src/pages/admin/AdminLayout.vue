<script setup>
import Header from "../../components/admin/Header.vue";
import Sidebar from "../../components/admin/Sidebar.vue";
import Footer from "../../components/admin/Footer.vue";

defineOptions({
  name: "AdminLayout",
});
</script>

<template>
  <div class="admin-layout">

    <Header />

    <div class="admin-content">

      <div class="sidebar">
        <Sidebar />
      </div>

      <div class="content">
        <RouterView />
      </div>

    </div>

    <Footer />

  </div>
</template>

<style>
.admin-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.admin-content {
  flex: 1;
  display: flex;
}

.sidebar {
  width: 250px;
  background: #3e2723;
  /* background matching Sidebar component */
}

.content {
  flex: 1;
  padding: 24px;
  background: #fdfaf6; /* soft cream for main content area */
}
</style>