<template>
    <div class="category-page">
        <!-- 分类栏 -->
        <div class="filter-bar">
            <button class="filter-item" :class="{ 'is-active': current === '全部' }" @click="current = '全部'">全部</button>
            <button v-for="c in categories" :key="c" class="filter-item" :class="{ 'is-active': current === c }" @click="current = c">{{ c }}</button>
        </div>

        <!-- 文章列表 -->
        <div class="card-grid">
            <ArticleCard v-for="a in filtered" :key="a.id" :article="a" />
        </div>
    </div>
</template>

<script setup>
    import ArticleCard from '@/components/blog/ArticleCard.vue' 
    import { ref, computed } from 'vue'
    import { articles } from '@/data/articles'

    const categories = [...new Set(articles.map(a => a.category))]
    const current = ref('全部')
    const filtered = computed(() => {  
        return current.value === '全部'
            ? articles
            : articles.filter(a => a.category === current.value)
    })

</script>

<style scoped>
/* 分类栏 */
    .category-page{
        max-width: 1480px;
        margin: 0 auto;
        padding: 24px 28px;
    }
    /* 筛选面板 */
    .filter-bar{
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        padding: 18px 20px;
        margin-bottom: 24px;
        background-color: #ffffff;
        border-radius: 16px;
        border: 1px solid #f0f2f6;
        box-shadow: 0 2px 8px rgba(16, 24, 40, .05);
    }
    /* 筛选按钮 */
    .filter-item{
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        height: 40px;
        padding: 0 18px;
        border: 1px solid #eef0f4;
        border-radius: 999px;
        background-color: #f5f6f8;
        color: #2f3742;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition:
            background-color .22s cubic-bezier(.22, .61, .36, 1),
            color .22s cubic-bezier(.22, .61, .36, 1),
            border-color .22s,
            box-shadow .22s;
    }
    /* 分割线 */
    .filter-item:not(:last-child)::after{
        content: '';
        position: absolute;
        right: -6px;              
        top: 50%;
        width: 1px;
        height: 20px;
        background-color: #d5dae2;
        transform: translateY(-50%);
    }
    .filter-item:hover{
        background-color: #eef4fb;
        border-color: #dce8f8;
        color: #2b78cc;
    }
    .filter-item.is-active{
        background-image: linear-gradient(180deg, #4a90da 0%, #2a72c2 100%);
        border-color: transparent;
        color: #ffffff;
        box-shadow: 0 4px 12px rgba(43, 120, 204, .28);
    }
</style>