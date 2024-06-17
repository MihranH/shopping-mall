const router = require('express').Router();
const ProductController = require('../controllers/ProductController');

router.post('/', (req, res) => ProductController.createProduct(req, res));
router.put('/:id', (req, res) => ProductController.updateProduct(req, res));
router.delete('/:id', (req, res) => ProductController.deleteProduct(req, res));
router.get('/list', (req, res) => ProductController.getProducts(req, res));
router.get('/:id', (req, res) => ProductController.getProduct(req, res));

module.exports = router;
