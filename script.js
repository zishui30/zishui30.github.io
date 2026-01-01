// 网页登录验证逻辑（优化手机端兼容，解决登录失败问题）
window.onload = function() {
    // 1. 自定义账号密码（可随意修改，注意用半角字符）
    const targetUser = "cswqyw"; // 账号
    const targetPwd = "09191030"; // 密码

    // 2. 获取登录相关+网页内容容器元素
    const loginMask = document.getElementById("loginMask");
    const userName = document.getElementById("userName");
    const userPwd = document.getElementById("userPwd");
    const loginBtn = document.getElementById("loginBtn");
    const loginError = document.getElementById("loginError");
    const webContent = document.getElementById("webContent"); // 网页内容容器

    // 核心优化：提取登录验证逻辑为独立函数，方便多场景调用
    function doLogin() {
        // 优化1：强制转换为半角字符 + 过滤首尾空格，解决手机端输入兼容问题
        const inputUser = userName.value.trim().replace(/[\uFF00-\uFFEF]/g, function(c) {
            return String.fromCharCode(c.charCodeAt(0) - 65248);
        });
        const inputPwd = userPwd.value.trim().replace(/[\uFF00-\uFFEF]/g, function(c) {
            return String.fromCharCode(c.charCodeAt(0) - 65248);
        });

        // 验证账号密码
        if (inputUser === targetUser && inputPwd === targetPwd) {
            // 验证通过：隐藏登录框 + 显示网页内容
            loginMask.style.display = "none";
            webContent.style.display = "block"; // 显示隐藏的网页内容
        } else {
            // 验证失败，显示错误提示
            loginError.style.display = "block";
            // 3秒后自动隐藏错误提示
            setTimeout(() => {
                loginError.style.display = "none";
            }, 3000);
            // 清空输入框
            userName.value = "";
            userPwd.value = "";
        }
    }

    // 3. 登录按钮点击事件（优化2：确保元素加载完成后绑定，兼容手机端）
    if (loginBtn) {
        loginBtn.addEventListener("click", doLogin);
    }

    // 4. 优化3：兼容手机端软键盘回车事件（多场景监听，确保生效）
    // 给账号输入框绑定回车事件
    if (userName) {
        userName.addEventListener("keydown", function(e) {
            // 兼容电脑端Enter + 手机端软键盘Enter（keyCode 13是通用回车标识）
            if (e.key === "Enter" || e.keyCode === 13) {
                e.preventDefault();
                userPwd.focus(); // 光标跳转到密码框，提升手机端体验
            }
        });
    }

    // 给密码输入框绑定回车事件（直接触发登录）
    if (userPwd) {
        userPwd.addEventListener("keydown", function(e) {
            if (e.key === "Enter" || e.keyCode === 13) {
                e.preventDefault();
                doLogin(); // 触发登录
            }
        });
    }

    // 保留电脑端全局回车事件（不影响电脑端使用）
    document.addEventListener("keydown", function(e) {
        if (e.key === "Enter" || e.keyCode === 13) {
            // 仅当登录框可见时触发，避免影响其他功能
            if (loginMask.style.display !== "none") {
                doLogin();
            }
        }
    });

    // 5. 原有所有功能（无需修改，自动执行）
    createMeteors();
    bindImgClickZoom();
    bindSmallThings();
    bindLoadMore();
    bindMusicBtn();
    bindNewYearSurprise();
    createSnowflakes();
    initTitleAnimation();
};

// 1. 生成流星划过效果（随机数量+速度+位置）
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
        meteor.style.animationDelay = Math.random() * 10 + 's'; // 延迟出现
        body.appendChild(meteor);
    }
}

// 2. 图片点击放大功能（核心：点击显示，遮罩/ESC关闭）
function bindImgClickZoom() {
    const cardImgs = document.querySelectorAll('.card-img'); // 所有可点击图片
    const imgMask = document.getElementById('imgMask');
    const bigImg = document.getElementById('bigImg');

    // 绑定每张图片的点击事件
    cardImgs.forEach(img => {
        img.addEventListener('click', function() {
            const imgSrc = this.src; // 获取当前点击图片地址
            bigImg.src = imgSrc; // 给放大图片赋值
            imgMask.style.display = 'flex'; // 显示遮罩层
            setTimeout(() => {
                imgMask.classList.add('active'); // 添加动画，平滑放大
            }, 10);
        });
    });

    // 点击遮罩层隐藏放大图片
    imgMask.addEventListener('click', function(e) {
        if (e.target === this) {
            imgMask.classList.remove('active'); // 平滑缩小
            setTimeout(() => {
                imgMask.style.display = 'none'; // 隐藏遮罩层
            }, 300);
        }
    });

    // 按ESC键关闭放大图片
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

// 5. 加载更多功能（100件小事追加内容）
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

// 6. 背景音乐播放/暂停交互
function bindMusicBtn() {
    const musicBtn = document.querySelector('.music-btn');
    if (!musicBtn) return;

    let isPlaying = false;
    const audio = new Audio('assets/music/bgm.mp3'); // 背景音乐路径
    audio.loop = true;
    audio.preload = 'metadata';

    musicBtn.addEventListener('click', function() {
        this.classList.add('btn-click');
        setTimeout(() => {
            this.classList.remove('btn-click');
        }, 300);

        if (!isPlaying) {
            audio.play().catch(err => {
                console.log("请手动触发播放（移动端浏览器限制）");
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

// 7. 新年惊喜解锁交互（若你未使用，可忽略，不影响整体功能）
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

// 8. 雪花动画生成（跨年氛围补充）
function createSnowflakes() {
    const snowCount = 40; // 雪花数量，可调整
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
