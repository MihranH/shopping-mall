const { Op } = require('sequelize');
const db = require('../models');
const { Product, Category } = db;

class InfoService {
    static async createProduct(body) {
       return Product.create(body);
    }

    static async updateProduct(body, id) {
        return Product.update(body, {
            where: { id }
        });
    }

    static async deleteProduct(id) {
        return Product.destroy({
            where: { id }
        });
    }

    static async getProduct(id) {
        return Product.findOne({
            where: { id },
            include: {
                model: Category, as: 'category'
            }
        });
    }

    static async getProducts() {
        return Product.findAll();
    }

    static checkProductFields(fields) {
        if (!fields) {
            return false;
        }
        const { title, description, sku, price, categoryId } = fields;
        if (!title || !description || !sku || !price || !categoryId) {
            return false;
        }
        return true;
    }

    static async checkSKU(sku, id) {
        const where = { sku };
        if (id) {
            where.id = { [Op.ne]: id };
        }
        return { 
            isLengthValid: sku?.length === 8, 
            exists: await Product.findOne({ where })
        };
    }

    static checkPrice(price) {
        return !isNaN(price);
    }

    static async checkCategory(categoryId) {
        const category = await Category.findByPk(categoryId);
        return !!category;
    }
}

module.exports = InfoService;