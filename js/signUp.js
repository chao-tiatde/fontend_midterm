document.addEventListener('DOMContentLoaded', () => {
    // 密碼輸入框及按鈕
    const passwordInput = document.getElementById('password');
    const togglePassword1 = document.getElementById('togglePassword1');

    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePassword2 = document.getElementById('togglePassword2');

    // 切換密碼顯示/隱藏
    togglePassword1.addEventListener('click', (event) => {
        event.preventDefault();
        const isPasswordVisible = passwordInput.getAttribute('type') === 'text';
        passwordInput.setAttribute('type', isPasswordVisible ? 'password' : 'text');
        togglePassword1.querySelector('img').src = isPasswordVisible
            ? 'img/img_signUp/visibility_off.svg'
            : 'img/img_signUp/visibility.svg';
    });

    togglePassword2.addEventListener('click', (event) => {
        event.preventDefault();
        const isPasswordVisible = confirmPasswordInput.getAttribute('type') === 'text';
        confirmPasswordInput.setAttribute('type', isPasswordVisible ? 'password' : 'text');
        togglePassword2.querySelector('img').src = isPasswordVisible
            ? 'img/img_signUp/visibility_off.svg'
            : 'img/img_signUp/visibility.svg';
    });
});



document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('openTerms');
    const closeBtn = document.getElementById('closeTerms');
    const modal = document.getElementById('termsModal');
    const body = document.body; // 選取 body

    // 打開彈出視窗
    openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        body.classList.add('no-scroll'); // 禁止背景滾動
    });

    // 關閉彈出視窗
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        body.classList.remove('no-scroll'); // 恢復背景滾動
    });

    // 點擊視窗外部關閉視窗
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.classList.add('hidden');
            body.classList.remove('no-scroll'); // 恢復背景滾動
        }
    });
});





const firebaseConfig = {
    apiKey: "AIzaSyDPifQUmES6_NQDDkOzA18SS_2-1-DRZTg",
    authDomain: "frontend-midterm-4a62f.firebaseapp.com",
    projectId: "frontend-midterm-4a62f",
    storageBucket: "frontend-midterm-4a62f.firebasestorage.app",
    messagingSenderId: "922826580440",
    appId: "1:922826580440:web:1aae31a36a0b4a9d1ad2ad",
    measurementId: "G-VXTCCCKXCL"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();





document.addEventListener('DOMContentLoaded', () => {
    const togglePassword1 = document.getElementById('togglePassword1');
    const togglePassword2 = document.getElementById('togglePassword2');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');


    // 表單提交邏輯
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); // 阻止預設提交行為

        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        // 驗證密碼一致性
        if (password !== confirmPassword) {
            alert('密碼與確認密碼不一致！');
            return;
        }

        // 模擬提交成功
        alert(`註冊成功！\n用戶名稱: ${username}\n電子郵件: ${email}`);
        
        // 清空表單
        registerForm.reset();
    });
});
