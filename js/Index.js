// 在頁面載入時，預設顯示冬天的內容
document.addEventListener('DOMContentLoaded', function() {
    const defaultButton = document.querySelector('.btn-season:nth-child(4)');
    changeSeason('winter', defaultButton); // 設定冬天的內容和按鈕
});

function changeSeason(season, button) {
    // 1. 更新圖片
    const imageContainer = document.querySelector('.season-img');
    const images = imageContainer.querySelectorAll('img');
    images.forEach(img => img.style.display = 'none'); // 隱藏所有圖片
    const activeImage = imageContainer.querySelector(`.${season}-img`);
    if (activeImage) {
        activeImage.style.display = 'block'; // 顯示所選的季節圖片
    }
    // 2. 更新主要季節內容 
    const seasons = document.querySelectorAll('.season-c > div');
    seasons.forEach(s => s.style.display = 'none'); // 隱藏所有季節內容
    const activeSeasonContent = document.querySelector(`.${season}-c`);
    if (activeSeasonContent) {
        activeSeasonContent.style.display = 'block'; // 顯示所選的季節內容
    }
    // 3. 更新give內容
    const giveDivs = document.querySelectorAll('.give > div');
    giveDivs.forEach(div => div.style.opacity = '0');
    const activeGiveContent = document.querySelector(`.give .${season}`); 
    if (activeGiveContent) {
        activeGiveContent.style.opacity = '1'; 
    }
    // 4. 更新按鈕樣式
    const buttons = document.querySelectorAll('.btn-season');
    buttons.forEach(btn => btn.classList.remove('active')); // 移除所有按鈕的 "active" 樣式
    button.classList.add('active'); // 為當前點擊的按鈕添加 "active" 樣式
}

document.addEventListener('DOMContentLoaded', () => {
    let currentSlide = 0; // 當前顯示的幻燈片索引
    const slides = document.querySelectorAll('.carousel-img > div'); // 獲取所有幻燈片
    const indicators = document.querySelectorAll('.indicator'); // 獲取所有指示器
    const cards = document.querySelectorAll('.carousel-right .card-c1'); // 獲取所有文本卡片
    function showSlide(index) {
        // 更新索引，處理循環
        if (index < 0) {
            currentSlide = slides.length - 1; // 循環到最後一張
        } else if (index >= slides.length) {
            currentSlide = 0; // 循環到第一張
        } else {
            currentSlide = index; // 更新當前索引
        }
        // 隱藏所有幻燈片
        slides.forEach(slide => {
            slide.classList.remove('active'); // 移除所有幻燈片的 active 類
        });
        // 顯示當前幻燈片
        slides[currentSlide].classList.add('active'); // 只顯示當前幻燈片
        // 隱藏所有文本卡片
        cards.forEach(card => {
            card.classList.remove('active'); // 移除所有卡片的 active 類
        });
        // 顯示當前卡片
        cards[currentSlide].classList.add('active'); // 只顯示當前卡片
        // 更新指示器的激活狀態
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === currentSlide);
        });
    }
    // 按鈕功能
    function nextSlide() {
        showSlide(currentSlide + 1); // 顯示下一張幻燈片
    }
    function prevSlide() {
        showSlide(currentSlide - 1); // 顯示上一張幻燈片
    }
    function setSlide(index) {
        showSlide(index); // 設置到指定幻燈片
    }
    // 初始化顯示的幻燈片
    showSlide(currentSlide);
    // 設置按鈕和指示器的點擊事件
    document.querySelector('.control-next').addEventListener('click', nextSlide);
    document.querySelector('.control-prev').addEventListener('click', prevSlide);
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => setSlide(i));
    });
});