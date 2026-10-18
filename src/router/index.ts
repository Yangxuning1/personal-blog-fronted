import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: () => import('@/views/HomeView.vue')},
        {path: '/me', component: () => import('@/views/MeView.vue')},
        {path: '/archives', component: () => import('@/views/ArchivesView.vue')},
        {path: '/article/:id', component: () => import('@/views/ArticleView.vue')},
        {path: '/category', component: () => import('@/views/CategoryView.vue')},
        {path: '/profile', component: () => import('@/views/ProfileView.vue')},
        {path: '/search', component: () => import('@/views/SearchView.vue')},
    ]
});

export default router;