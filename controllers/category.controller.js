const autoBind = require('auto-bind');
const { Product } = require('../models/m-hasToMany');
const HttpCodes = require('http-codes');

class CategoryController {
    constructor() {
        autoBind(this);
    }

    async findProductsByCategoryId(req, res, next) {
        try {
            const { categoryId } = req.params;
            const products = await Product.findAll({
                where: { categoryId },
            });
            if (!products.length) {
                return res.status(HttpCodes.NOT_FOUND).json({ message: 'No products found!' });
            }
            return res.json(products);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new CategoryController();