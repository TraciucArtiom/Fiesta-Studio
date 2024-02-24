const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const app = express();
const port = 3000;

// Подключение к базе данных SQLite
const dbPath = path.resolve(__dirname, 'mydatabase.db');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    define: {
        timestamps: false // Отключаем автоматическое добавление createdAt и updatedAt
    }
});

// Определение модели пользователя
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users' // Указываем имя таблицы в базе данных
});

// Middleware для разрешения CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Разрешение парсинга JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Обработка POST-запроса от формы
app.post('/submit', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Сохранение данных в базе данных
        const newUser = await User.create({
            username: username,
            email: email,
            password: password
        });

        console.log('User added:', newUser.toJSON());
        res.json({ message: 'User added successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Обработка POST-запроса от формы входа
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Поиск пользователя в базе данных
        const user = await User.findOne({
            where: {
                username: username,
                password: password
            }
        });

        if (user) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});