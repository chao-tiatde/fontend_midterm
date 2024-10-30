function changeSeason(season) {
    // 1. 更新圖片
    const imageContainer = document.querySelector('.season-img');
    const images = imageContainer.querySelectorAll('img');

    // 隱藏所有圖片
    images.forEach(img => {
        img.style.display = 'none'; // 隱藏所有圖片
    });

    // 顯示所選的季節圖片
    const activeImage = imageContainer.querySelector(`.${season}-img`);
    if (activeImage) {
        activeImage.style.display = 'block'; // 顯示所選的季節圖片
    }

    // 2. 更新內容
    const seasonContent = document.querySelector('.season-c');
    const contents = seasonContent.children;

    // 隱藏所有內容
    Array.from(contents).forEach(content => {
        content.style.display = 'none'; // 隱藏所有內容
    });

    // 顯示所選的季節內容
    const activeContent = seasonContent.querySelector(`.${season}-c`);
    if (activeContent) {
        activeContent.style.display = 'block'; // 顯示所選的季節內容
    }
}