const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware для работы с JSON
app.use(express.json());

// Отдача статических файлов (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Загружаем базу данных (если это необходимо)
const dbFilePath = './database.json';
let database = JSON.parse(fs.readFileSync(dbFilePath));

// API для получения списка товаров
app.get('/products', (req, res) => {
    res.json(database.products);
});

// API для добавления товара
app.post('/products', (req, res) => {
    const newProduct = req.body;
    database.products.push(newProduct);
    fs.writeFileSync(dbFilePath, JSON.stringify(database, null, 2));
    res.status(201).send('Товар добавлен');
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
