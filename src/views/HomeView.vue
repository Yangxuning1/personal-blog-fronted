<template>
    <div class="home">
        <!-- 左：主内容 -->
        <section class="hero">
            <img src="@/assets/images/hero.png">
            <div class="hero-content">
                <p class="hero-hello">Hi,欢迎来到 MORROW</p>
                <h1 class="hero-title">记录成长 · 分享思考</h1>
                <p class="hero-sub">一个面向写作者与读者的内容平台</p>
                <RouterLink to="/category" class="hero-btn">
                    <span>阅读文章</span>
                    <span class="hero-arrow">→</span>
                </RouterLink>
            </div>
        </section>
        <div class="home-main">
            <div class="section-head">
                <h2 class="section-title">最新文章</h2>
                <RouterLink to="/category" class="section-more">查看全部 →</RouterLink>
            </div>

            <div class="card-grid">
                <div v-for="i in 7" :key="i" class="article-card">
                    <img src="@/assets/images/card.jpg" class="card-img">
                    <div class="card-title">Vue3 组件传值方式总结</div>
                    <div class="card-text">组件之间传值有多种方式，本文梳理常用写法。</div>
                </div>
            </div>
        </div>

        <!-- 右：侧栏 -->
        <aside class="home-rail">
            <div class="rail-card">
                <h3 class="rail-title"><i class="iconfont icon-tag"></i>热门标签</h3>
                <div class="tag-list">
                    <a v-for="tag in tags" :key="tag" href="#" class="tag-item">{{ tag }}</a>
                </div>
            </div>
            <div class="rail-card">
                <h3 class="rail-title"><i class="iconfont icon-cate"></i>文章分类</h3>
                <ul class="cate-list">
                    <li v-for="c in categories" :key="c.name">
                        <a href="#" class="cate-item">
                            <span class="cate-name">{{ c.name }}</span>
                            <span class="cate-count">{{ c.count }}</span>
                        </a>
                    </li>
                </ul>       
            </div>
        </aside>
    </div>
</template>

<script setup>
    // 热门标签
    const tags = [
        'Vue3', 'JavaScript', '嵌入式',
        '算法', '读书笔记', '生活随笔',
        '摄影', '效率工具', '职场成长', '产品思考',
    ]
    // 文章分类
    const categories = [
        { name: '前端开发', count: 8 },
        { name: '后端开发', count: 3 },
        { name: '学习笔记', count: 5 },
        { name: '生活随笔', count: 4 },
        { name: '其他', count: 2 },
    ]
</script>

<style scoped>
    /* 主页 */
   .home{
        display: grid;
        grid-template-columns: minmax(0, 1fr) 370px;   
        gap: 20px;
        padding: 20px 28px;                        
    }
    /* hero区域*/
    .hero{
        position: relative;  
        grid-column: 1 / -1;
        height: clamp(200px, 28vh, 280px);
        border-radius: 16px;
        overflow: hidden;
    }

    .hero img{
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    /* 加一层遮罩防止图片太亮时按钮消失 */
    .hero::after{
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(
            90deg,
            rgba(15, 25, 35, .55) 0%,
            rgba(15, 25, 35, .22) 55%,
            rgba(15, 25, 35, 0) 100%
        );
        pointer-events: none;   
    }
    .hero-content{
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;     
        align-items: flex-start;
        gap: 12px;
        padding: 0 48px;
        z-index: 2;
    }
    .hero-hello{
        font-size: 18px;
        color: rgba(255, 255, 255, .82);
        letter-spacing: .5px;
    }
    .hero-title{
        font-size: clamp(24px, 3vw, 38px);
        font-weight: 700;
        line-height: 1.25;
        letter-spacing: 2px;
        color: #f7f2ea;
        text-shadow: 0 2px 12px rgba(0, 0, 0, .28);
    }
    .hero-sub{
        max-width: 520px;
        font-size: clamp(13px, 1.1vw, 15px);
        line-height: 1.7;
        color: rgba(255, 255, 255, .85);
        text-shadow: 0 1px 8px rgba(0, 0, 0, .22);
    }
    /* 按钮 */
    .hero-btn{
        display: inline-flex;
        margin-top: 8px;  
        align-items: center;
        gap: 10px;
        height: 44px;
        padding: 0 24px;
        border-radius: 999px;
        background-color: #ffffff;
        color: #1c2128;
        font-size: 14.5px;
        font-weight: 500;
        box-shadow: 0 4px 14px rgba(16, 24, 40, .12);
        transition: transform .2s, box-shadow .2s, background-color .2s;
    }
    .hero-btn:hover{
        background-color: #f7f9fc;
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(16, 24, 40, .2);
    }
    .hero-btn:active{
        transform: translateY(0);
        box-shadow: 0 4px 14px rgba(16, 24, 40, .12);
    }
    /* 箭头：悬停时右移一点 */
    .hero-arrow{
        display: inline-block;
        transition: transform .2s;
    }

    .hero-btn:hover .hero-arrow{
        transform: translateX(4px);
    }
    /* 内容卡片区 */
    .home-main{
        display: flex;
        flex-direction: column;
        min-height: 0;
    }
    /* 卡片区顶栏 */
    .section-head{
        flex-shrink: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    .section-title{
        font-size: 18px;
        font-weight: 600;
        color: #1c2128;
    }

    .section-more{
        display: inline-flex;
        align-items: center;
        gap: 2px;
        font-size: 13px;
        color: #8b95a3;
        transition: color .2s;
    }

    .section-more:hover{
        color: #2b78cc;
    }
    /* 卡片区 */
    .card-grid{
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 20px;
    }

    .article-card{    
        display: flex;     
        flex-direction: column;     
        border-radius: 14px;
        height: 230px;
        background-color: #ffffff;
        border: 1px solid #eceef2;
        overflow: hidden;
    }
    .card-img{
        display: block;
        flex: 0 0 45%;        /* 封面占 45% 高度 */
        width: 100%;
        object-fit: cover;
    }
    .card-title{
        padding: 12px 14px 0;
        font-size: 15px;
        font-weight: 600;
        line-height: 1.4;
        color: #1c2128;
    }
    .card-text{
        padding: 6px 14px 0;
        font-size: 12.5px;
        line-height: 1.55;
        color: #8b95a3;
    }
    /* 侧栏 */
    .home-rail{
        position: sticky;
        top: 24px;
        align-self: start;
        display: flex;
        flex-direction: column;
        gap: 14px;
        max-height: calc(100dvh - 48px);
        overflow-y: auto;
    }

    .rail-card{        
        height: auto;           
        padding: 16px;
        background-color: #ffffff;
        border: 1px solid #e4e8ef;
        border-radius: 14px;
    }
    .rail-title{
        display: flex;
        align-items: center;
        gap: 6px;
        margin: 0 0 12px;
        font-size: 14px;
        font-weight: 600;
        color: #1c2128; 
    }
    .rail-title i{
        font-size: 18px;
        color: #2b78cc; 
    }
    /* 热门标签 */
    .tag-list{
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }
    .tag-item{
        display: inline-flex;
        flex: none;
        height: 30px;
        padding: 0 14px;
        white-space: nowrap;
        border-radius: 999px;
        background-color: #f3f5f8;
        color: #5b6472;
        font-size: 13px;
        line-height: 30px;
        text-align: center;
        transition:
            background-color .22s cubic-bezier(.22, .61, .36, 1),
            color .22s,
            box-shadow .22s,
            transform .22s;
    }
    .tag-item:hover{
        background-color: #ffffff;
        color: #2b78cc;
        box-shadow:
            inset 0 0 0 1px #cfdcf0,         
            0 4px 12px rgba(43, 120, 204, .1); 
        transform: translateY(-1px);
    }
   /* 文章分类 */
   .cate-list{
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
    .cate-item{
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 38px;
        padding: 0 6px;
        border-radius: 6px;
        color: #4a5260;
        font-weight: 500;
        font-size: 13px;
        transition: background-color .18s ease,color .1s ease;
    }

    .cate-item:hover{
        background-color: #f5f9fd; 
        color: #1c2128;
        transform: translateX(3px);     
    }

    .cate-count{
        min-width: 24px;
        height: 20px;
        padding: 0 6px;
        border-radius: 6px;
        background-color: transparent;  
        color: #8b95a3;
        font-size: 11.5px;
        font-variant-numeric: tabular-nums;
        line-height: 20px;
        text-align: center;
        transition: background-color .18s, color .18s;
    }

    .cate-item:hover .cate-count{
        background-color: #eef4fb;
        color: #2b78cc;
}
</style>