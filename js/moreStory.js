// 
function showArea(areaId) {
    // 隱藏所有區塊
    document.getElementById("area_main").classList.remove("active");
    document.getElementById("area_main2").classList.remove("active");

    // 顯示選定的區塊
    document.getElementById(areaId).classList.add("active");
}






// 區域跳轉
document.addEventListener("DOMContentLoaded", function() {
    // 獲取所有 .area_left 中的 <li>
    const listItems = document.querySelectorAll(".area_left .left");
    const listItems2 = document.querySelectorAll(".area_left2 .left");

    // 為每個 <li> 設置點擊事件
    listItems.forEach((item, index) => {
        item.addEventListener("click", function() {
            // 根據 index 對應的區域 id 進行跳轉
            const sectionId = `send${index + 1}`; // 假設區域 id 為 section1, section2 等
            const targetSection = document.getElementById(sectionId);

            if (targetSection) {
                // 計算目標區域上方 50px 的位置
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - 50;

                // 平滑滾動到計算後的位置
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    listItems2.forEach((item, index) => {
        item.addEventListener("click", function() {
            // 根據 index 對應的區域 id 進行跳轉
            const sectionId2 = `homeless${index + 1}`; // 假設區域 id 為 section1, section2 等
            const targetSection2 = document.getElementById(sectionId2);

            if (targetSection2) {
                // 計算目標區域上方 50px 的位置
                const targetPosition2 = targetSection2.getBoundingClientRect().top + window.scrollY - 50;

                // 平滑滾動到計算後的位置
                window.scrollTo({
                    top: targetPosition2,
                    behavior: "smooth"
                });
            }
        });
    });
});





//左邊區域移動
window.addEventListener('scroll', function() {
    const aBox = document.querySelector('.area_left');
    const bContainer = document.querySelector('.main');

    const rect = bContainer.getBoundingClientRect();
    const offset = 0; // 設定距離
    const offset0 = 60;
    const offset_left1 = 51;
    const stopDistance = 413;

    if (rect.top < offset && rect.bottom > aBox.offsetHeight + stopDistance) { 
        // 當B區塊頂部超出視窗的60px
        aBox.style.position = 'sticky';
        aBox.style.top = offset0 + 'px'; // 固定在視窗頂端60px的位置
        aBox.style.transform = `translateX(${offset_left1}px)`;
        
    } else if (rect.bottom <= aBox.offsetHeight + stopDistance){
        // 當A區塊達到B區塊底部停止距離
        aBox.style.position = 'relative';
        aBox.style.top = (bContainer.offsetHeight - aBox.offsetHeight - stopDistance + offset0) + 'px';
    }else {
        // 在初始狀態
        aBox.style.position = 'relative';
        aBox.style.top = offset0 + 'px'; // 距離B區塊頂端60px
        aBox.style.transform = `translateX(${offset_left1}px)`;
    }
});

window.addEventListener('scroll', function() {
    const aBox = document.querySelector('.area_left2');
    const bContainer = document.querySelector('.main');

    const rect = bContainer.getBoundingClientRect();
    const offset = 0; // 設定距離
    const offset0 = 60;
    const offset_left1 = 19;
    const stopDistance = 320;

    if (rect.top < offset && rect.bottom > aBox.offsetHeight + stopDistance) { 
        // 當B區塊頂部超出視窗的60px
        aBox.style.position = 'sticky';
        aBox.style.top = offset0 + 'px'; // 固定在視窗頂端60px的位置
        aBox.style.transform = `translateX(${offset_left1}px)`;
        
    } else if (rect.bottom <= aBox.offsetHeight + stopDistance){
        // 當A區塊達到B區塊底部停止距離
        aBox.style.position = 'relative';
        aBox.style.top = (bContainer.offsetHeight - aBox.offsetHeight - stopDistance + offset0) + 'px';
    }else {
        // 在初始狀態
        aBox.style.position = 'relative';
        aBox.style.top = offset0 + 'px'; // 距離B區塊頂端60px
        aBox.style.transform = `translateX(${offset_left1}px)`;
    }
});









//調整spacer&&淡入
// 切換顯示區域
function showArea(areaId) {
    const areaMain = document.querySelector('.area_main');
    const areaMain2 = document.querySelector('.area_main2');
    
    // 重設區塊的 active 狀態
    areaMain.classList.remove('active');
    areaMain2.classList.remove('active');

    // 根據按鈕顯示對應區塊
    if (areaId === 'area_main') {
        areaMain.classList.add('active');
    } else if (areaId === 'area_main2') {
        areaMain2.classList.add('active');
    }

    // 調整 spacer 高度
    adjustSpacer();

    // 重新觀察動畫元素
    observeFadeElements();
}

// 調整 spacer 的高度
function adjustSpacer() {
    const areaMain = document.querySelector('.area_main');
    const areaMain2 = document.querySelector('.area_main2');
    const spacer = document.querySelector('.spacer');

    // 根據顯示的區塊動態設定 spacer 的高度
    if (areaMain.classList.contains('active')) {
        spacer.style.height = areaMain.offsetHeight + 'px';
    } else if (areaMain2.classList.contains('active')) {
        spacer.style.height = areaMain2.offsetHeight + 'px';
    }
}

// 建立 IntersectionObserver 設定動畫效果
const options = {
    root: null,
    threshold: 0.3
};
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__fadeIn', 'visible'); // 使用 Animate.css 效果
            fadeInObserver.unobserve(entry.target); // 觀察完成後取消
        }
    });
}, options);

// 重新觀察 .fade 和 .fade2 元素
function observeFadeElements() {
    document.querySelectorAll('.area_main .fade, .area_main2 .fade2').forEach(section => {
        section.classList.remove('visible'); // 重置 visible 類別
        fadeInObserver.observe(section);     // 重新觀察
    });
}

// 按鈕事件綁定
document.querySelector('.btn_send').onclick = function() {
    showArea('area_main');
};
document.querySelector('.btn_homeless').onclick = function() {
    showArea('area_main2');
};

// 初始化高度和動畫觀察
adjustSpacer();
observeFadeElements();
