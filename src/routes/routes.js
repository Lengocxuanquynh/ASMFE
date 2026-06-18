import { createWebHistory, createRouter } from "vue-router";

import DefaultLayout from "../pages/client/DefaultLayout.vue";

import Home from "../pages/client/Home.vue";
import About from "../pages/client/About.vue";
import Product from "../pages/client/Product.vue";
import Contact from "../pages/client/Contact.vue";
import Blog from "../pages/client/Blog.vue";
import BlogDetail from "../pages/client/BlogDetail.vue";
import Profile from "../pages/client/Profile.vue";
import MyBlog from "../pages/client/MyBlog.vue";

import Login from "../auth/Login.vue";
import Signin from "../pages/Signin.vue";

import AdminLayout from "../pages/admin/AdminLayout.vue";
import Dashboard from "../pages/admin/Dashboard.vue";

import CategoryList from "../pages/admin/category/List.vue";
import CategoryAdd from "../pages/admin/category/Add.vue";
import CategoryEdit from "../pages/admin/category/Edit.vue";

import BlogList from "../pages/admin/blog/List.vue";
import Add from "../pages/admin/blog/Add.vue";
import Edit from "../pages/admin/blog/Edit.vue";

import CommentList from "../pages/admin/comment/List.vue";
import CommentAdd from "../pages/admin/comment/Add.vue";
import CommentEdit from "../pages/admin/comment/Edit.vue";

import UserList from "../pages/admin/user/List.vue";
import UserAdd from "../pages/admin/user/Add.vue";
import UserEdit from "../pages/admin/user/Edit.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,

    children: [
      {
        path: "",
        component: Home,
      },

      {
        path: "about",
        component: About,
      },

      {
        path: "product",
        component: Product,
      },

      {
        path: "contact",
        component: Contact,
      },

      {
        path: "blog",
        component: Blog,
      },
      {
        path: "blog/:id",
        component: BlogDetail,
      },

      {
        path: "profile",
        component: Profile,
      },

      {
        path: "my-blog",
        component: MyBlog,
      },
    ],
  },

  {
    path: "/login",
    component: Login,
  },

  {
    path: "/signin",
    component: Signin,
  },

  {
    path: "/admin",
    component: AdminLayout,

    children: [
      {
        path: "",
        redirect: "/admin/dashboard",
      },

      {
        path: "dashboard",
        component: Dashboard,
      },

      {
        path: "categoryList",
        component: CategoryList,
      },

      {
        path: "categoryAdd",
        component: CategoryAdd,
      },

      {
        path: "categoryEdit/:id",
        component: CategoryEdit,
      },

      {
        path: "blogList",
        component: BlogList,
      },

      {
        path: "blogAdd",
        component: Add,
      },

      {
        path: "blogEdit",
        component: Edit,
      },

      {
        path: "commentList",
        component: CommentList,
      },

      {
        path: "commentAdd",
        component: CommentAdd,
      },

      {
        path: "commentEdit",
        component: CommentEdit,
      },

      {
        path: "userList",
        component: UserList,
      },

      {
        path: "userAdd",
        component: UserAdd,
      },

      {
        path: "userEdit",
        component: UserEdit,
      },
    ],
  },

  {
    path: "/categorylist",
    redirect: "/admin/categoryList",
  },

  {
    path: "/categoryadd",
    redirect: "/admin/categoryAdd",
  },

  {
    path: "/categoryedit",
    redirect: "/admin/categoryList",
  },

  {
    path: "/bloglist",
    redirect: "/admin/blogList",
  },

  {
    path: "/commentlist",
    redirect: "/admin/commentList",
  },

  {
    path: "/userlist",
    redirect: "/admin/userList",
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
