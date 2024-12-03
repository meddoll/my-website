let currentUser = null;
let products = [];

// Показать окно регистрации
function showRegisterWindow() {
    document.getElementById('main-window').style.display = 'none';
    document.getElementById('login-window').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'none';
    document.getElementById('register-form').reset();
    document.getElementById('main-window').style.display = 'block';
}

// Показать окно входа
function showLoginWindow() {
    document.getElementById('main-window').style.display = 'none';
    document.getElementById('login-window').style.display = 'block';
}

// Регистрация
document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    localStorage.setItem(email, password); // Сохраняем данные в localStorage
    alert('Регистрация успешна! Пожалуйста, войдите.');

    showLoginWindow();
});

// Вход
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const storedPassword = localStorage.getItem(email);
    if (storedPassword && storedPassword === password) {
        currentUser = email;
        alert('Вход успешен!');
        showAdminPanel();
    } else {
        alert('Неверный логин или пароль!');
    }
});

// Переход к админ-панели
function showAdminPanel() {
    document.getElementById('main-window').style.display = 'none';
    document.getElementById('login-window').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'block';
}

// Добавление товара
document.getElementById('add-product-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('product-name').value;
    const image = document.getElementById('product-image').files[0];
    const description = document.getElementById('product-description').value;
    const price = document.getElementById('product-price').value;

    const product = {
        name: name,
        image: URL.createObjectURL(image),
        description: description,
        price: price
    };

    products.push(product);
    renderProducts();
});

// Отображение списка товаров
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" width="100%" height="auto">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Цена: ${product.price} руб.</p>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

// Выход из аккаунта
function logout() {
    currentUser = null;
    alert('Выход из аккаунта!');
    showRegisterWindow();
}
