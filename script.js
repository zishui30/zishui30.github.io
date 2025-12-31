// 页面加载完成后再执行所有操作
window.onload = function() {
    // 1. 生成流星划过效果
    createMeteors();
    // 2. 绑定图片点击放大功能
    bindImgClickZoom();
    // 3. 修复100件小事点亮交互
    bindSmallThings();
    // 4. 修复加载更多功能
    bindLoadMore();
    // 5. 修复背景音乐播放/暂停
    bindMusicBtn();
    // 6. 修复新年惊喜解锁交互
    bindNewYearSurprise();
    // 7. 确保雪花动画正常生成
    createSnowflakes();
    // 8. 确保标题打字机动画正常触发
    initTitleAnimation();
};

// 1. 生成流星划过效果（随机出现+不同速度/位置）
function createMeteors() {
    const meteorCount = 8; // 流星数量，可调整
    const body = document.body;

    for (let i = 0; i < meteorCount; i++) {
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        // 随机配置流星位置、长度、动画时长
        meteor.style.left = Math.random() * 50 + '%';
        meteor.style.width = Math.random() * 80 + 50 + 'px'; // 流星长度
        meteor.style.animationDuration = Math.random() * 3 + 2 + 's'; // 划过速度
        meteor.style.animationDelay = Math.random() * 10 + 's'; // 延迟出现，避免同时划过
        body.appendChild(meteor);
    }
}

// 2. 图片点击放大功能（核心：点击显示，再次点击/点击遮罩隐藏）
function bindImgClickZoom() {
    const cardImgs = document.querySelectorAll('.card-img'); // 所有可点击图片
    const imgMask = document.getElementById('imgMask');
    const bigImg = document.getElementById('bigImg');

    // 绑定每张图片的点击事件
    cardImgs.forEach(img => {
        img.addEventListener('click', function() {
            const imgSrc = this.src; // 获取当前点击图片的地址
            bigImg.src = imgSrc; // 给放大的图片赋值地址
            imgMask.style.display = 'flex'; // 显示遮罩层
            setTimeout(() => {
                imgMask.classList.add('active'); // 添加动画类，实现平滑放大
            }, 10);
        });
    });

    // 点击遮罩层隐藏放大图片
    imgMask.addEventListener('click', function(e) {
        // 排除点击放大图片本身的情况
        if (e.target === this) {
            imgMask.classList.remove('active'); // 移除动画类，平滑缩小
            setTimeout(() => {
                imgMask.style.display = 'none'; // 隐藏遮罩层
            }, 300);
        }
    });

    // 按ESC键隐藏放大图片（便捷操作）
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imgMask.style.display === 'flex') {
            imgMask.classList.remove('active');
            setTimeout(() => {
                imgMask.style.display = 'none';
            }, 300);
        }
    });
}

// 3. 标题打字机动画初始化
function initTitleAnimation() {
    const mainTitle = document.getElementById('mainTitle');
    if (mainTitle) {
        mainTitle.style.width = '0';
        setTimeout(() => {
            mainTitle.style.animation = 'typing 3.5s steps(25) forwards, blink 0.8s step-end infinite';
        }, 100);
    }
}

// 4. 100件小事点亮交互
function bindSmallThings() {
    const thingItems = document.querySelectorAll('.thing-item');
    thingItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('active');
            this.classList.add('btn-click');
            setTimeout(() => {
                this.classList.remove('btn-click');
            }, 300);
        });
    });
}

// 5. 加载更多功能
function bindLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more');
    if (!loadMoreBtn) return;

    const moreThings = [
        "和你一起看日落",
        "陪你吃路边摊",
        "听你讲小时候的故事",
        "一起窝在沙发看电影",
        "帮你吹凉热饭",
        "陪你逛超市买零食",
        "和你一起拍搞怪照片",
        "在雨天和你共撑一把伞"
    ];

    let isLoaded = false;
    loadMoreBtn.addEventListener('click', function() {
        if (isLoaded) return;

        this.classList.add('btn-click');
        setTimeout(() => {
            this.classList.remove('btn-click');
        }, 300);

        const thingsList = document.querySelector('.things-list');
        moreThings.forEach(thing => {
            setTimeout(() => {
                const newItem = document.createElement('div');
                newItem.className = 'thing-item';
                newItem.innerText = thing;
                newItem.style.opacity = '0';
                newItem.style.transform = 'translateY(10px)';
                thingsList.appendChild(newItem);
                setTimeout(() => {
                    newItem.style.opacity = '1';
                    newItem.style.transform = 'translateY(0)';
                    newItem.style.transition = 'all 0.3s ease';
                    newItem.addEventListener('click', function() {
                        this.classList.toggle('active');
                        this.classList.add('btn-click');
                        setTimeout(() => {
                            this.classList.remove('btn-click');
                        }, 300);
                    });
                }, 50 * moreThings.indexOf(thing));
            }, 100);
        });

        isLoaded = true;
        loadMoreBtn.innerText = "已经加载全部啦 ❤️";
    });
}

// 6. 背景音乐交互
function bindMusicBtn() {
    const musicBtn = document.querySelector('.music-btn');
    if (!musicBtn) return;

    let isPlaying = false;
    const audio = new Audio('assets/music/bgm.mp3');
    audio.loop = true;
    audio.preload = 'metadata';

    musicBtn.addEventListener('click', function() {
        this.classList.add('btn-click');
        setTimeout(() => {
            this.classList.remove('btn-click');
        }, 300);

        if (!isPlaying) {
            audio.play().catch(err => {
                console.log("请手动触发播放（移动端限制）");
            });
            this.innerText = "暂停音乐 🎵";
            isPlaying = true;
        } else {
            audio.pause();
            this.innerText = "播放音乐 🎵";
            isPlaying = false;
        }
    });
}

// 7. 新年惊喜解锁交互
function bindNewYearSurprise() {
    const unlockBtn = document.getElementById('unlockBtn');
    const surpriseContent = document.getElementById('surpriseContent');
    if (!unlockBtn || !surpriseContent) return;

    unlockBtn.addEventListener('click', function() {
        this.classList.add('btn-click');
        setTimeout(() => {
            this.style.display = 'none';
            surpriseContent.style.display = 'block';
            surpriseContent.style.opacity = '0';
            surpriseContent.style.transform = 'translateY(20px)';
            surpriseContent.style.transition = 'all 0.6s ease';
            setTimeout(() => {
                surpriseContent.style.opacity = '1';
                surpriseContent.style.transform = 'translateY(0)';
            }, 100);
        }, 300);
    });
}

// 8. 雪花动画生成
function createSnowflakes() {
    const snowCount = 40;
    const body = document.body;

    for (let i = 0; i < snowCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerText = '❄️';
        snowflake.style.left = Math.random() * 100 + 'vw';
        snowflake.style.animationDuration = Math.random() * 8 + 12 + 's';
        snowflake.style.fontSize = Math.random() * 8 + 10 + 'px';
        snowflake.style.opacity = Math.random() * 0.5 + 0.5;
        body.appendChild(snowflake);
    }
}
