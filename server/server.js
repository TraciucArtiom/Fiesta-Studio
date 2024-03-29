const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const app = express();
const port = 3000;

// Подключение к базе данных
const dbPath = path.resolve(__dirname, 'mydatabase.db');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    define: {
        timestamps: false
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
    tableName: 'users'
});

const Query = sequelize.define('Query', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'query'
}
);

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'comments'
}
);

// Middleware для разрешения CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    next();
});

// Разрешение парсинга JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Обработка POST-запроса от форм
app.post('/reg', async (req, res) => {
    try {
        const { username, email, password } = req.body;
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
app.post('/login', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({
            where: {
                username: username,
                email: email,
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
app.post('/query', async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        const newQuery = await Query.create({
            name: name,
            email: email,
            phone: phone,
            message: message
        });

        console.log('Query added:', newQuery.toJSON());
        res.json({ message: 'Query added successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/add-comment', async (req, res) => {
    try{
        const {name, text} = req.body;
        const newComment = await Comment.create({
            name: name,
            text: text
        });
        console.log('Comment added:', newComment.toJSON());
        res.json({ message: 'Comment added successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/read-comments', async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.json({ message: 'Comments read successfully', comments: comments });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Запуск сервера
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});