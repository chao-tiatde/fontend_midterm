function showContent(blockId) {
    // 隱藏所有區塊
    const blocks = document.querySelectorAll('.content');
    blocks.forEach(block => block.classList.remove('active'));

    // 顯示指定的區塊
    const activeBlock = document.getElementById(blockId);
    activeBlock.classList.add('active');
}