const area_cyj = document.querySelector('.area_cyj');
const area_whj = document.querySelector('.area_whj');
let currentIndex = 0; // 0 表示顯示 area_cyj，1 表示顯示 area_whj

// 設定滑動效果
const switchArea = (index) => {
    currentIndex = index;
    updateDisplay();
};

// 更新顯示的函數
function updateDisplay() {
    if (currentIndex === 0) {
        area_cyj.style.transform = 'translateX(0)';
        area_cyj.style.opacity = '1';
        area_whj.style.transform = 'translateX(100%)';
        area_whj.style.opacity = '0';
        enablePageScroll(); // 啟用頁面滾動
    } else {
        area_cyj.style.transform = 'translateX(-100%)';
        area_cyj.style.opacity = '0';
        area_whj.style.transform = 'translateX(0)';
        area_whj.style.opacity = '1';
        enablePageScroll(); // 啟用頁面滾動
    }
}

// 啟用頁面滾動
function enablePageScroll() {
    document.body.style.overflow = 'auto'; // 允許頁面滾動
}

// 設定滑動效果
document.querySelector('.area_2member').addEventListener('wheel', (event) => {
    const scrollSpeed = event.deltaY > 0 ? 1 : -1; // 根據滾動方向確定速度
    const targetIndex = currentIndex + scrollSpeed;

    // 確保索引在範圍內
    if (targetIndex >= 0 && targetIndex <= 1) {
        event.preventDefault(); // 僅在切換頁面時防止滾動
        switchArea(targetIndex);
    }
});

// 當進入 area_whj 時，確保可以正常滾動頁面
document.querySelector('.area_whj').addEventListener('wheel', (event) => {
    enablePageScroll(); // 確保頁面可以滾動
});







//淡入
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.word_fade');

    const options = {
        root: null, // 使用viewport
        threshold: 0.3 // 當區塊出現在視窗的10%時觸發
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeIn'); // 添加淡入效果類別
                entry.target.classList.add('visible'); // 將透明度設置為1
                observer.unobserve(entry.target); // 移除觀察，避免重複觸發
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section); // 觀察每個區塊
    });
});

