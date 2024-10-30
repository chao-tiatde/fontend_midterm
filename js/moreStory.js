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
    const listItems = document.querySelectorAll(".area_left .left_js");
    const listItems2 = document.querySelectorAll(".area_left2 .left_js");

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