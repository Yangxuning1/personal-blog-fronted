<template>
    <div class="article-page">
        <article v-if="article" class="article">
            <button class="back-btn" @click="goBack">
                <span class="back-arrow">←</span> 返回
            </button>

            <section class="article-hero">
                <img class="hero-cover" :src="article.cover" :alt="article.title">
                <div class="hero-mask"></div>

                <div class="hero-inner">
                    <div class="hero-text">
                        <h1 class="article-title">{{ article.title }}</h1>

                        <div class="article-meta">
                            <span class="meta-item">
                                <img class="meta-avatar" :src="article.avatar || defaultAvatar" :alt="article.author">
                                {{ article.author }}
                            </span>
                            
                            <span class="meta-item"><i class="iconfont icon-clock"></i>{{ article.publishedAt }}</span>                           
                            <span class="meta-item"><i class="iconfont icon-view"></i>{{ article.views }} 阅读</span>                           
                            <span class="meta-item"><i class="iconfont icon-like"></i>{{ article.likes }} 点赞</span>
                            <span class="meta-item"><i class="iconfont icon-comment"></i>{{ article.comments }} 评论</span>
                        </div>
                    </div>
                </div>
            </section>
            <div v-if="article.tags?.length" class="article-tags">
                <span v-for="t in article.tags" :key="t" class="article-tag">{{ t }}</span>
            </div>
            <p class="article-summary">{{ article.summary }}</p>
            <hr class="article-divider">
            <div class="article-body" v-html="safeHtml"></div>

            <!-- 点赞和评论 -->
            <div class="article-actions">
                <button class="action-btn" :class="{ 'is-liked': liked }" @click="toggleLike">
                    <i class="iconfont icon-like"></i>
                    <span>点赞 {{ likeCount }}</span>
                </button>

                <button class="action-btn" @click="scrollToComments">
                    <i class="iconfont icon-comment"></i>
                    <span>评论 {{ article.comments }}</span>
                </button>
            </div>
        </article>

        <div v-else class="article-empty">
            <i class="iconfont icon-search"></i>
            <p>文章不存在</p>
            <RouterLink to="/" class="empty-link">返回首页</RouterLink>
        </div>

        
    </div>
</template>

<script setup>
    import { computed } from 'vue'
    import { useRoute } from 'vue-router'
    import { useRouter } from 'vue-router'
    import DOMPurify from 'dompurify'
    import { ref } from 'vue'
    import { articleContents } from '@/data/articleContents'
    import { articles } from '@/data/articles'
    import defaultAvatar from '@/assets/images/avatar.jpg'

    const route = useRoute()
    const router = useRouter()
    const article = computed(() => articles.find(a => a.id === Number(route.params.id)))
    // 给 articleContents 里的内容做安全处理，防止 XSS 攻击
    const safeHtml = computed(() => 
        DOMPurify.sanitize(articleContents[Number(route.params.id)] || '', {
            FORBID_TAGS: ['style', 'iframe', 'script'],
            FORBID_ATTR: ['style', 'onclick', 'onerror'],
        })
    )
    // 返回功能
    function goBack() {
        if (window.history.length > 1) {
            router.back()
        } else {
            router.push('/')
        }
    }
    // 点赞功能
    const liked = ref(false)
    const likeCount = computed(() =>
        (article.value?.likes ?? 0) + (liked.value ? 1 : 0)
    )
    function toggleLike() {
        liked.value = !liked.value
    }
    function scrollToComments() {
        document.querySelector('#comments')?.scrollIntoView({ behavior: 'smooth' })
    }
</script>

<style scoped>
    .article-page{
        padding: 48px 28px 0;
    }
    .article{
        max-width: 1200px;
        margin: 0 auto;
    }
    /* 返回按钮 */
   .back-btn{
        position: sticky;
        top: 12px;
        z-index: 10;

        display: inline-flex;
        align-items: center;
        gap: 4px;
        height: 34px;
        padding: 0 14px 0 10px;
        margin-bottom: 16px;
        border: 1px solid #eceef2;
        border-radius: 999px;
        background-color: #ffffff;
        color: #5b6472;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(16, 24, 40, .06);
        transition: background-color .2s, color .2s, box-shadow .2s;
    }

    .back-btn:hover{
        background-color: #f7f9fc;
        color: #1c2128;
        box-shadow: 0 4px 12px rgba(16, 24, 40, .1);
    }

    .back-arrow{
        font-size: 15px;
    }
    /* 文章封面 */
    .article-cover{
        display: block;
        width: 100%;
        height: 320px;
        margin-bottom: 28px;
        border-radius: 16px;
        object-fit: cover;
    }

    .article-hero{
        position: relative;
        height: 250px;
        margin-bottom: 32px;
        border-radius: 16px;
        overflow: hidden;
    }

    .hero-cover{
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* 底部压深，保证文字可读 */
    .hero-mask{
        position: absolute;
        inset: 0;
        background: linear-gradient(
            180deg,
            rgba(10, 18, 28, .35) 0%,
            rgba(10, 18, 28, .2) 45%,
            rgba(10, 18, 28, .78) 100%
        );
    }

    .hero-inner{
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 24px 32px 30px;
        z-index: 2;
    }
    /* 标题 */
    .article-title{
        margin: 0 0 40px;
        font-size: clamp(26px, 2.8vw, 38px);
        font-weight: 700;
        line-height: 1.3;
        color: #ffffff;
        text-shadow: 0 2px 14px rgba(0, 0, 0, .35);
    }
    /* 文章话题标签 */
    .article-tags{
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 18px;
    }

    .article-tag{
        height: 28px;
        padding: 0 12px;
        border-radius: 8px;
        background-color: #f1f5fb;
        color: #4a7fb5;
        font-size: 12.5px;
        line-height: 28px;
    }
    /* 文章摘要信息 */
    .article-summary{
        margin: 0 0 22px;
        font-size: 15px;
        line-height: 1.8;
        color: #6b7480;
    }
    /* 文章信息 */
    .article-meta{
        display: flex;
        flex-wrap: wrap; 
        gap: 14px;
        padding-bottom: 0;
        margin-bottom: 0;
        border-bottom: 0;
        color: rgba(255, 255, 255, .95);
    }

    .meta-item{
        display: inline-flex;
        align-items: center;
        gap: 6px; 
        line-height: 1;
        white-space: nowrap;
        flex-shrink: 0;
    }

    .article-hero .meta-item i{
        color: rgba(255, 255, 255, .85);
    }

    .meta-avatar{
        display: block;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
    }

    .article-divider{
        margin: 0 0 32px;
        border: 0;
        border-top: 1px solid #eceef2;
    }
    /* 空状态 */
    .article-empty{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 120px 0;
        color: #9aa3ad;
        font-size: 26px;
    }

    .article-empty i{
        font-size: 40px;
        opacity: .5;
    }
    .empty-link{
        color: #2b78cc;
        font-size: 26px;
    }

    /* 点赞和评论 */
    .article-actions{
        position: sticky;
        bottom: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        gap: 10px;
        height: 80px;              
        margin-top: 40px;
        background-color: #ffffff;
        border-top: 1px solid #eceef2;
    }

    .action-btn{
        display: inline-flex;
        align-items: center;
        gap: 8px;
        height: 42px;
        padding: 0 20px;
        border: 1px solid #e4e8ef;
        border-radius: 999px;
        background-color: #ffffff;
        color: #5b6472;
        font-size: 14px;
        cursor: pointer;
        transition: background-color .2s, border-color .2s, color .2s;
    }

    .action-btn:hover{
        border-color: #d3dce8;
        background-color: #f7f9fc;
        color: #1c2128;
    }

    .action-btn i{
        font-size: 15px;
    }

    /* 已点赞 */
    .action-btn.is-liked{
        border-color: #2b78cc;
        background-color: #2b78cc;
        color: #ffffff;
    }

    .action-btn.is-liked i{
        color: #ffffff;
    }
</style>
<!-- 全局正文排版 -->
<style>
    /* 正文基础 */
    .article-body{
        font-size: 16px;
        line-height: 1.9;
        color:  #111111;
        word-break: break-word;
    }

    .article-body p{
        margin: 18px 0;
    }

    /* 标题 */
    .article-body h2{
        position: relative;
        margin: 44px 0 18px;
        padding-left: 16px;
        font-size: 24px;
        font-weight: 600;
        line-height: 1.4;
        color: #1c2128;
    }

    .article-body h2::before{
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        width: 4px;
        height: 22px;
        border-radius: 2px;
        background-color: #2b78cc;
        transform: translateY(-50%);
    }

    .article-body h3{
        margin: 32px 0 14px;
        font-size: 19px;
        font-weight: 600;
        color: #1c2128;
    }

    /* 列表 */
    .article-body ul,
    .article-body ol{
        margin: 16px 0;
        padding-left: 1.5em;
    }

    .article-body li{
        margin: 8px 0;
        line-height: 1.9;
    }

    .article-body ul li{
        list-style: disc;
    }

    .article-body ol li{
        list-style: decimal;
    }

    /* 引用 */
    .article-body blockquote{
        margin: 24px 0;
        padding: 14px 20px;
        border-left: 3px solid #cfe0f2;
        border-radius: 0 8px 8px 0;
        background-color: #f7fafd;
        color: #4a5260;
    }

    .article-body blockquote p{
        margin: 0;
    }

    /* 代码 */
    .article-body code{
        padding: 2px 6px;
        border-radius: 4px;
        background-color: #f1f4f8;
        color: #2b78cc;
        font-family: 'SFMono-Regular', Consolas, Menlo, monospace;
        font-size: 14px;
    }

    .article-body pre{
        margin: 24px 0;
        padding: 18px 20px;
        overflow-x: auto;
        border-radius: 12px;
        background-color: #1e232b;
        font-size: 13.5px;
        line-height: 1.7;
    }

    .article-body pre code{
        padding: 0;
        background: none;
        color: #e6e9ee;
        font-size: inherit;
    }

    /* 图片 */
    .article-body img{
        display: block;
        max-width: 100%;
        height: auto;
        margin: 28px auto;
        border-radius: 12px;
    }

    /* 链接 */
    .article-body a{
        color: #2b78cc;
        text-decoration: none;
        border-bottom: 1px solid #cfe0f2;
        transition: border-color .2s;
    }

    .article-body a:hover{
        border-bottom-color: #2b78cc;
    }

    /* 分隔线 */
    .article-body hr{
        margin: 40px 0;
        border: 0;
        border-top: 1px solid #eceef2;
    }

    /* 表格 */
    .article-body table{
        width: 100%;
        margin: 24px 0;
        border-collapse: collapse;
        font-size: 14px;
    }

    .article-body th,
    .article-body td{
        padding: 10px 14px;
        border: 1px solid #eceef2;
        text-align: left;
    }

    .article-body th{
        background-color: #f7f9fc;
        font-weight: 600;
    }
</style>