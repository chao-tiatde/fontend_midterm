// 取得所有語言按鈕
const langButtons = document.querySelectorAll('.btn-lan');

// 取得所有需要切換語言的元素
const translatableElements = document.querySelectorAll('[data-zh][data-en]');

// 為每個按鈕添加點擊事件
langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedLang = button.innerText.trim(); // 根據按鈕文字判斷語言

        // 遍歷所有有 data-zh 和 data-en 的元素
        translatableElements.forEach(element => {
            // 只處理 input 和 textarea 元素的 placeholder
            if (element.tagName.toLowerCase() === 'input' || element.tagName.toLowerCase() === 'textarea') {
                if (selectedLang === '中') {
                    element.placeholder = element.getAttribute('data-zh'); // 切換為中文
                    element.classList.remove('en-font-size'); // 移除英文樣式
                } else if (selectedLang === 'En') {
                    element.placeholder = element.getAttribute('data-en'); // 切換為英文
                    element.classList.add('en-font-size'); // 添加英文樣式
                }
            } else {
                // 更新其他元素的文本內容（例如 <label> 和 <span>）
                if (selectedLang === '中') {
                    element.textContent = element.getAttribute('data-zh'); // 切換為中文
                    element.classList.remove('en-font-size'); // 移除英文樣式
                } else if (selectedLang === 'En') {
                    element.textContent = element.getAttribute('data-en'); // 切換為英文
                    element.classList.add('en-font-size'); // 添加英文樣式
                }
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // 當用户按下 Enter 鍵時觸發搜索
    document.getElementById("search-input").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            searchContent();
        }
    });

    // 當用户點擊搜索圖標時觸發搜索
    document.getElementById("search-icon").addEventListener("click", searchContent);

    // 搜索内容函數
    function searchContent() {
        const query = document.getElementById("search-input").value.trim().toLowerCase();
        
        // 清除之前的高亮顯示
        const allTextElements = document.querySelectorAll(".highlight"); // 查找已經高亮的元素
        allTextElements.forEach(function(element) {
            element.classList.remove("highlight"); // 移除高亮
        });

        if (query !== "") {
            const allTextElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li"); // 可以根據需要選擇其他元素
            let matchesFound = 0;
            let firstMatchElement = null; // 用來記錄第一個匹配的元素

            allTextElements.forEach(function(element) {
                const textContent = element.textContent || element.innerText;
                if (textContent.toLowerCase().includes(query)) {
                    element.style.backgroundColor = "#D6FF07"; // 高亮顯示
                    matchesFound++;

                    // 記錄第一個匹配的元素
                    if (!firstMatchElement) {
                        firstMatchElement = element;
                    }
                } else {
                    element.style.backgroundColor = ""; // 清除高亮
                }
            });

            if (matchesFound === 0) {
                alert("没有找到相關内容！");
            } else if (firstMatchElement) {
                // 滾動到第一個匹配的元素
                firstMatchElement.scrollIntoView({
                    behavior: "smooth",  // 滑動滾動
                    block: "start"       // 讓元素對其頁面頂部
                });
            }
        } else {
            // 清除所有元素的高亮
            const allTextElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, li");
            allTextElements.forEach(function(element) {
                element.style.backgroundColor = "";
            });
        }
    }
});



