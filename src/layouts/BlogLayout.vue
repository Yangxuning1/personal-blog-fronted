<template>
    <div class="blog-layout">
        <!-- 侧栏 -->
        <aside class="sidebar">
            <!-- logo -->
            <RouterLink to="/" class="logo">
                <img src="@/assets/images/logo.png">
            </RouterLink>
            <!-- 个人资料 -->
            <div class="profile">
                <RouterLink to="/profile" class="profile-avatar">
                    <img src="@/assets/images/avatar.jpg">
                </RouterLink>
                <p class="profile-name">Xuning Yang</p>
                <p class="profile-bio">在圆圆的地球上扁扁的生活</p>
            </div>
            <!-- 导航 -->
            <nav class="nav">
                <ul>
                    <li>
                        <RouterLink to="/" active-class="active" class="nav-item">
                            <i class="iconfont icon-home nav-icon"></i>
                            <span>首页</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/category" active-class="active" class="nav-item">
                            <i class="iconfont icon-category nav-icon"></i>
                            <span>分类</span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/me" active-class="active" class="nav-item">
                            <i class="iconfont icon-user nav-icon"></i>
                            <span>我的</span>
                        </RouterLink>
                    </li>
                </ul>
            </nav>

            <!-- 底部区域 -->
            <div class="sidebar-footer">
                <p class="quote">「困扰我们的不是事情本身<br>而是我们对它的看法」</p>

                <svg class="deco" viewBox="0 0 64 24" fill="none" aria-hidden="true">
                    <path d="M2 23 L18 7 L27 16 L34 10 L62 23 Z" fill="currentColor" opacity=".35"/>
                    <path d="M22 23 L38 4 L54 23 Z" fill="currentColor"/>
                </svg>

                <p class="copyright">
                    © {{ year }} MORROW<br>
                    All rights reserved.
                </p>
            </div>
        </aside>
        <!-- 侧栏右侧区域 -->
        <div class="main-col">
            <!-- 顶栏 -->
            <header class="header">
                <!-- 左侧留白区域 -->
                <span class="header-spacer"></span>
                <!-- 搜索框 -->
                <search class="search">
                    <i class="iconfont icon-search"></i>
                    <input type="text" placeholder="搜索文章、标签..." class="search-input">
                </search>
                <!-- 右边区域 -->
                <div class="header-action">
                    <div class="user-menu">
                        <button class="avatar-btn" aria-haspopup="menu">
                            <img src="@/assets/images/avatar.jpg">
                        </button>
                        <div class="menu">
                            <div class="menu-panel" role="menu">
                                <RouterLink to="/me" class="menu-item" role="menuitem">
                                    <i class="iconfont icon-me"></i>
                                    <span>管理个人主页</span>
                                </RouterLink>
                                <RouterLink to="/profile" class="menu-item" role="menuitem">
                                    <i class="iconfont icon-profile"></i>
                                    <span>修改个人资料</span>   
                                </RouterLink>
                                <button class="menu-item logout" role="menuitem">
                                    <i class="iconfont icon-logout"></i>
                                    <span>退出登录</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <!-- 内容区域-->
            <main class="content">
                <RouterView />
            </main>
        </div>
        
    </div>
    
</template>

<script lang="ts" setup>
    // 获取底部装饰出的年份日期
    const year = new Date().getFullYear()
</script>

<style scoped>
    .blog-layout {
        display: flex;
        height: 100dvh;
        overflow: hidden;
    }
    /* 侧栏 */
    .sidebar {
        display: flex;
        flex-direction: column;
        flex: 0 0 250px;
        background-color: #f5f5f5;
        padding: 0 16px;
        gap: 30px;
        border-right: 1px solid #e9ebef;
    }
    /* 侧栏右侧区域 */
    .main-col {
        flex: 1;
        display: flex;
        min-width: 0;
        flex-direction: column;
    }
    
    /* 内容区域 */
    .content {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        scrollbar-gutter: stable;
    }
    /* logo */
    .logo{
        display: block;
        width: 100%;
        height: 80px;
    }
    .logo img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    /* 个人资料 */
    .profile{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 0px 20px;
        width: 100%;
        gap: 15px;
    }
    /* 个人头像 */
    .profile-avatar{
        display: block;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        overflow: hidden;
    }
    .profile-avatar img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    /* 用户名 */
    .profile-name{
        font-size: 18px;
        font-weight: bold;
    }
    /* 个性签名 */
    .profile-bio{
        margin-top: -10px;
        font-size: 13px;
        color: #666;
    }
    /* 导航 */
    .nav{
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
   .nav-item{
        display: flex;
        align-items: center;
        position: relative;
        padding: 0 14px;
        height: 40px;
        border-radius: 12px;
        gap: 12px;
        cursor: pointer;
    }
    .nav-icon{
        font-size: 20px;
        color: #1c2128;
        transition: color .2s;
    }
    .nav-item span{
        color: #5b6472;
        transition: color .2s;
    }
    .nav-item:hover{
        background-color: #eef1f5;
        transform: translateX(3px);
    }
    .nav-item.active{
        background-color: #dbe8f6;
    }
    .nav-item.active span{
        color: #1c2128;
    }
    .nav-item.active .nav-icon{
        color: #2b78cc;
    }
    .nav-item::before{
            content: '';
            position: absolute;
            left: 0;
            top: 50%;
            width: 3px;
            height: 18px;
            border-radius: 0 2px 2px 0;
            background-color: #2b78cc;
            opacity: 0;
            transform: translateY(-50%) scaleY(0.4);
            transition: opacity .2s, transform .2s;
    }
    .nav-item.active::before{
        opacity: 1;
        transform: translateY(-50%) scaleY(1);
    }
    /* 侧栏底部 */
    .sidebar-footer{
        margin-top: auto;        
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 50px;
        padding: 18px 20px 25px;
    }

    /* 那条短分隔线 */
    .quote{
        position: relative;
        padding-top: 18px;
        font-size: 13px;
        line-height: 1.9;
        color: #9aa3ad;
    }

    .quote::before{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 24px;
        height: 1px;
        background-color: #dcdfe4;
    }

    /* 山形装饰 */
    .deco{
        width: 80px;
        height: auto;      
        color: #dfe4ea;   
    }
    /* 版权信息 */
    .copyright{
        margin-top: 35px;
        font-size: 11.5px;
        line-height: 1.7;
        color: #a8b0ba;
    }

    /* 顶栏 */
    .header {
        /* background-color: pink; */
        flex: 0 0 60px;
        display: flex;
        padding: 0 28px;
        align-items: center;
        border-bottom: 1px solid #eceef2;
    }
    .header-spacer{
        flex: 4;
    }
    .header-action{
        flex:1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    /* 搜索框 */
    .search{
        display: flex;
        padding: 0 14px;
        gap: 8px;
        align-items: center;
        width: 320px;
        height: 36px;
        border: 1px solid #dfe3e9;
        border-radius: 999px;
        outline: 0;
        transition: border-color .2s, box-shadow .2s;
    }
    .search-input{
        flex: 1;
        height: 100%;
        outline: 0;
        border: 0;
        background-color: transparent;
        font-size: 14px;
    }
    .search:focus-within{
        border-color: #2b78cc;
        box-shadow: 0 0 0 3px rgba(43, 120, 204, .15);
    }   
    .user-menu{
        position: relative;
    }
    /* 头像 */
    .avatar-btn{
        display: block;
        width: 38px;
        height: 38px;
        padding: 0;
        border: 1px solid #eceef2;
        border-radius: 50%;
        overflow: hidden;
        background: none;
        transition: border-color .2s;
    }
    .avatar-btn:hover{
        border-color: #2b78cc;
    }
    .avatar-btn img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }
    /* 下拉菜单 */
    .menu{
        position: absolute;
        top: 100%;
        right: 0;
        padding-top: 10px;        /* 透明桥，鼠标能滑进菜单 */
        opacity: 0;
        /* 元素隐藏 */
        visibility: hidden;  
        /* 禁止鼠标点击 */
        pointer-events: none;
        /* 保证菜单浮在别的页面元素上 */
        z-index: 100;
    }
    .menu-panel{
        width: 180px;
        padding: 6px;
        background-color: #ffffff;
        border: 1px solid #eceef2;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(16, 24, 40, .1);
    }
    .menu-item{
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;
        height: 38px;
        padding: 0 10px;
        border-radius: 8px;
        font-size: 13.5px;
        color: #5b6472;
        text-align: left;
        cursor: pointer;
        background: none;        
        border: 0;               
        font-family: inherit;    /* 清掉按钮的默认字体 */
        transition: background-color .15s, color .15s;
    }
    .menu-item:hover{
        background-color: #f3f5f8;
        color: #1c2128;
    }
    .menu-item:active{
        background-color: #e9edf2;
    }
    .user-menu:hover .menu,
    .user-menu:focus-within .menu{
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
    }
    .menu-item i{
        font-size: 15px;
        transition: transform .15s;
    }
    .menu-item:hover{
        transform: translateX(2px);
    }
    .logout{
        color: #d9534f;
    }
    .logout:hover{
        background-color: #fdf3f2;
        color: #c0392b;
    }
</style>