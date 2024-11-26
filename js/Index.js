console.log("測試 JavaScript 是否正常執行");
alert("JS 正在運行！");

//綁定點擊事件
document.querySelector(".btn-lan.zh").addEventListener("click", () => switchLanguage("zh"));
document.querySelector(".btn-lan.en").addEventListener("click", () => switchLanguage("en"));
//語言切換函數
function switchLanguage(language) {
    document.querySelectorAll("[data-zh]").forEach(element => {
        element.textContent = element.getAttribute(`data-${language}`) || element.textContent;
        if (element.placeholder) {
            element.placeholder = element.getAttribute(`data-${language}`);
        }
    });
}
// bigpic文字滑入
window.onload = function() {
    document.querySelector('.bigpic-l').classList.add('show');
    document.querySelector('.bigpic-r').classList.add('show');
};
//purpose淡入
document.addEventListener("DOMContentLoaded", function() {
    const purposeSection = document.querySelector('.purpose');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                purposeSection.classList.add('show');
                observer.unobserve(entry.target); // 只觸發一次
            }
        });
    });

    observer.observe(purposeSection);
});
//do淡入
document.addEventListener("DOMContentLoaded", function() {
    const elementsToShow = document.querySelectorAll('.season-img, .season-c, .give'); // 選擇需要淡入的元素

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // 只觸發一次
            }
        });
    });

    elementsToShow.forEach(element => {
        observer.observe(element); // 觀察每一个元素
    });
});
// 在頁面載入時，預設顯示冬天的內容
document.addEventListener('DOMContentLoaded', function() {
    const defaultButton = document.querySelector('.btn-season:nth-child(4)');
    changeSeason('winter', defaultButton); // 設定冬天的內容和按鈕
});
//give按鈕切換
function changeSeason(season, button) {
    // 1. 更新圖片
    const imageContainer = document.querySelector('.season-img');
    const images = imageContainer.querySelectorAll('img');
    images.forEach(img => {
        img.style.display = 'none'; // 隐藏所有圖片
        img.style.opacity = '0'; // 確保透明度為0
    });

    const activeImage = imageContainer.querySelector(`.${season}-img`);
    if (activeImage) {
        activeImage.style.display = 'block'; // 顯示所選的季節圖片
        activeImage.style.opacity = '1'; // 設置透明度為1，触發過渡
    }

    // 2. 更新主要季節内容 
    const seasons = document.querySelectorAll('.season-c > div');
    seasons.forEach(s => {
        s.style.display = 'none'; // 隐藏所有季節内容
        s.style.opacity = '0'; // 確保透明度為0
        s.classList.remove('show'); // 移除淡入效果
    });

    const activeSeasonContent = document.querySelector(`.${season}-c`);
    if (activeSeasonContent) {
        activeSeasonContent.style.display = 'block'; // 顯示所選的季節内容
        setTimeout(() => {
            activeSeasonContent.style.opacity = '1'; // 設置透明度為1，触發過渡
        }, 10); // 短暂延遲以確保樣式更新
    }

    // 3. 更新give内容
    const giveDivs = document.querySelectorAll('.give > div');
    giveDivs.forEach(div => {
        div.style.opacity = '0'; // 初始透明度為0
        div.classList.remove('show'); // 移除淡入效果
    });

    const activeGiveContent = document.querySelector(`.give .${season}`);
    if (activeGiveContent) {
        activeGiveContent.style.opacity = '0'; // 確保初始為0
        setTimeout(() => {
            activeGiveContent.style.opacity = '1'; // 設置為1以觸發淡入效果
        }, 10); // 短暂延遲再改變透明度
    }

    // 4. 更新按鈕樣式
    const buttons = document.querySelectorAll('.btn-season');
    buttons.forEach(btn => btn.classList.remove('active')); // 移除所有按鈕的 "active" 樣式
    button.classList.add('active'); // 為当前點擊的按鈕添加 "active" 樣式
}
// 確保在設置透明度之前，為每个内容和圖片設置過渡效果
const allElements = document.querySelectorAll('.season-img img, .season-c > div, .give > div');
allElements.forEach(element => {
    element.style.transition = 'opacity 0.8s ease'; // 设置过渡效果
});
//carousel淡入
document.addEventListener("DOMContentLoaded", function() {
    const purposeSection = document.querySelector('.carousel');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                purposeSection.classList.add('show');
                observer.unobserve(entry.target); // 只觸發一次
            }
        });
    });

    observer.observe(purposeSection);
});
//輪播器
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