const { DataTypes } = require("@sequelize/core");
const { sequelize } = require('../configs/db.config');

const Category = sequelize.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT
}, {
    sequelize,
    modelName: 'category',
    timestamps: false,  
    tableName: 'categories'
});

const Product = sequelize.define('product', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'product',
    timestamps: false,
    freezeTableName: true,
    tableName: 'products'
});

Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

async function main() {
    try {
        await sequelize.sync({force: true});

        const category = await Category.create({
            name: 'Digital',
            description: 'Digital Products Category'
        });

        const product1 = await Product.create({
            name: 'IPhone12',
            price: 600,
            categoryId: category.id
        });

        const product2 = await Product.create({
            name: 'Macbook Pro 14Inch',
            price: 1800,
            categoryId: category.id
        });

        console.log('Category:', category.dataValues);
        console.log('Product 1:', product1.dataValues);
        console.log('Product 2:', product2.dataValues);

    } catch (error) {
        console.error('Error:', error);
    }
}

main();

module.exports = { Product };