<template>
    <RouterLink :to="`/article/${article.id}`" class="article-card">
        <div class="card-cover">
            <img class="card-img" :src="article.cover" :alt="article.title">
            <span class="card-category">{{ article.category }}</span>
        </div>

        <div class="card-body">
            <h3 class="card-title">{{ article.title }}</h3>
            <p class="card-summary">{{ article.summary }}</p>

            <div class="card-meta">
                <span class="meta-item">
                    <i class="iconfont icon-clock"></i>{{ article.publishedAt }}
                </span>
                <span class="meta-item">
                    <i class="iconfont icon-view"></i>{{ article.views }}
                </span>
                <span class="meta-item">
                    <i class="iconfont icon-comment"></i>{{ article.comments }}
                </span>
                <span class="meta-item">
                    <i class="iconfont icon-like"></i>{{ article.likes }}
                </span>
                <span class="card-author">
                    <img class="author-avatar" :src="article.avatar || defaultAvatar" :alt="article.author"/>
                    <span class="author-name">{{ article.author }}</span>
                </span>
                <span class="card-arrow">→</span>
            </div>
        </div>
    </RouterLink>
</template>

<script setup>
import defaultAvatar from '@/assets/images/avatar.jpg'
defineProps({
    article: {
        type: Object,
        required: true,
    },
})
</script>

<style scoped>
.article-card{
    display: flex;
    flex-direction: column;
    height: 302px;
    background-color: #ffffff;
    border: 1px solid #eceef2;
    border-radius: 14px;
    overflow: hidden;
    transition: box-shadow .2s, border-color .2s;
}

.article-card:hover{
    border-color: #a9c8ea;
    box-shadow: 0 10px 24px rgba(16, 24, 40, .08);
}

/* ===== 封面 ===== */
.card-cover{
    position: relative;
    flex: 0 0 44%;
    min-height: 0;
    overflow: hidden;
}

.card-img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-category{
    position: absolute;
    top: 14px;
    left: 14px;
    height: 30px;
    padding: 0 12px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, .72);
    backdrop-filter: blur(10px);
    color:  #1c2128;
    font-size: 15px;
    font-weight: 500;
    line-height: 30px;
}

/* ===== 正文 ===== */
.card-body{
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 6px;
    min-height: 0;
    padding: 12px 16px;
}

.card-title{
    display: -webkit-box;
    margin: 0;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.4;
    color: #1c2128;
    line-clamp: 1;
}

.card-summary{
    display: -webkit-box;
    margin: 0;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    font-size: 12.5px;
    line-height: 1.55;
    color: #8b95a3;
    line-clamp: 3;
}

/* ===== 底部信息 ===== */
.card-meta{
    display: flex;
    align-items: center;
    gap: 14px;
    margin-top: auto;
    font-size: 12px;
    color: #9aa3ad;
}

.meta-item{
    display: inline-flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
}

.meta-item i{
    font-size: 13px;
}

.card-author{
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-left: auto;
}
.author-avatar{
    width: 20px;
    height: 20px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
}
.author-name{
    max-width: 76px;
    overflow: hidden;
    font-size: 12px;
    color:  #2f3742;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.card-arrow{
    margin-left: 8px; 
    font-size: 15px;
    color: #b6bdc6;
    transition: transform .2s, color .2s;
}

.article-card:hover .card-arrow{
    color: #2b78cc;
    transform: translateX(4px);
}
</style>