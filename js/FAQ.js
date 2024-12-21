$(document).ready(function () {
    // FAQ 點擊展開/收合效果
    $('.btn_click').on('click', function () {
        const currentAnswer = $(this).next('.A');
        const currentIcon = $(this).find('img');

        // 關閉其他展開區塊
        $('.A').not(currentAnswer).slideUp(300);
        $('.btn_click img').not(currentIcon).attr('src', 'img/img_FAQ/arrow down.svg');

        // 切換當前區塊的展開/收合
        if (currentAnswer.is(':visible')) {
            currentAnswer.slideUp(300);
            currentIcon.attr('src', 'img/img_FAQ/arrow down.svg');
        } else {
            currentAnswer.slideDown(300);
            currentIcon.attr('src', 'img/img_FAQ/arrow up.svg');
        }
    });

    // 預設顯示第一個 FAQ
    const firstQuestion = $('.btn_click').first();
    const firstAnswer = firstQuestion.next('.A');
    const firstIcon = firstQuestion.find('img');

    firstAnswer.slideDown(0); // 立即展開
    firstIcon.attr('src', 'img/img_FAQ/arrow up.svg');

    // 區塊切換功能
    $('.sub').on('click', function () {
        // 移除其他按鈕的 active 標記
        $('.sub').removeClass('active');
        $(this).addClass('active');

        // 隱藏其他區塊並顯示目標區塊
        $('.Q_section').removeClass('active').hide();
        const targetId = $(this).data('target');
        $('#' + targetId).addClass('active').fadeIn(300);
    });

    // 預設顯示第一個區塊
    $('.sub').first().addClass('active');
    $('.Q_section').first().addClass('active').show();
});