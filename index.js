const { sequelize } = require('./configs/db.config');
const express = require('express');
const app = express();
const CategoryController = require('./controllers/category.controller');
require('./models/m-hasToMany');
const PORT = 3000;

app.get('/categories/:categoryId/products', CategoryController.findProductsByCategoryId);

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected successfully!');
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.error('Error connecting:', error);
    }
});
