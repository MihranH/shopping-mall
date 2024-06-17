const ProductService = require('../services/ProductService');
const Logger = require('../services/Logger');

class ProductController {
    static async createProduct(req, res) {
        try {
            const { title, description, sku, price, categoryId } = req.body;
            const data = { title, description, sku, price, categoryId };

            const fieldsExist = ProductService.checkProductFields(data);
            if (!fieldsExist) {
                return res.status(400).send({ message: 'Info provided is incomplete' });
            }
    
            const isPriceValid = ProductService.checkPrice(price);
            const isSKUValid = await ProductService.checkSKU(sku);
            const isCategoryValid = await ProductService.checkCategory(categoryId);

            if (!isSKUValid.isLengthValid) {
                return res.status(400).send({ message: `SKU should be 8 characters long but you provided with length ${sku.length}` });
            }
            if (isSKUValid.exists) {
                return res.status(400).send({ message: 'SKU is not unique' });
            }
            if (!isPriceValid) {
                return res.status(400).send({ message: 'Price is invalid' });
            }
            if (!isCategoryValid) {
                return res.status(400).send({ message: 'Category is invalid' });
            }

            const products = await ProductService.createProduct(data);
            return res.send(products);
        } catch (error) {
            Logger.error(error);
            return res.status(500).send({ message: 'Something went wrong' });
        }
    }

    static async updateProduct(req, res) {
        try {
            const { title, description, sku, price, categoryId } = req.body;
            const data = { title, description, sku, price, categoryId };

            const fieldsExist = ProductService.checkProductFields(data);
            if (!fieldsExist) {
                return res.status(400).send({ message: 'Info provided is incomplete' });
            }
            if (!req.params.id || isNaN(req.params.id)) {
                return res.status(400).send({ message: 'Product ID provided is invalid' });
            }

            const product = await ProductService.getProduct(req.params.id);
            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }

            const isPriceValid = ProductService.checkPrice(price);
            const isSKUValid = await ProductService.checkSKU(sku, req.params.id);
            const isCategoryValid = await ProductService.checkCategory(categoryId);

            if (!isSKUValid.isLengthValid) {
                return res.status(400).send({ message: `SKU should be 8 characters long but you provided with length ${sku.length}` });
            }
            if (isSKUValid.exists) {
                return res.status(400).send({ message: 'SKU is not unique' });
            }
            if (!isPriceValid) {
                return res.status(400).send({ message: 'Price is invalid' });
            }
            if (!isCategoryValid) {
                return res.status(400).send({ message: 'Category is invalid' });
            }

            await ProductService.updateProduct(data, req.params.id);
            return res.send(true);
        } catch (error) {
            Logger.error(error);
            return res.status(500).send({ message: 'Something went wrong' });
        }
    }

    static async deleteProduct(req, res) {
        try {
            if (!req.params.id || isNaN(req.params.id)) {
                return res.status(400).send({ message: 'Product ID provided is invalid' });
            }
            const product = await ProductService.getProduct(req.params.id);
            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }
            await ProductService.deleteProduct(req.params.id);
            return res.send(true);
        } catch (error) {
            Logger.error(error);
            return res.status(500).send({ message: 'Something went wrong' });
        }
    }
    
    static async getProduct(req, res) {
        try {
            if (!req.params.id || isNaN(req.params.id)) {
                return res.status(400).send({ message: 'Product ID provided is invalid' });
            }
            const product = await ProductService.getProduct(req.params.id);
            if (!product) {
                return res.status(404).send({ message: 'Product not found' });
            }

            return res.send(product);
        } catch (error) {
            Logger.error(error);
            return res.status(500).send({ message: 'Something went wrong' });
        }
    }

    static async getProducts(_, res) {
        try {
            const products = await ProductService.getProducts();

            return res.send({ count: products.length, products});
        } catch (error) {
            Logger.error(error);
            return res.status(500).send({ message: 'Something went wrong' });
        }
    }
}

module.exports = ProductController;
