// app.js
const express = require('express');
const pool = require('./db');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'ShopEase API',
      version: '1.0.0',
    },
  },
  apis: ['app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * /products:
 *  get:
 *    description: Get all products
 *    responses:
 *      '200':
 *        description: Success
 */
app.get('/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * @swagger
 * /products/{id}:
 *  get:
 *    description: Get a specific product by ID
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: integer
 *    responses:
 *      '200':
 *        description: Success
 */
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * @swagger
 * /products:
 *  post:
 *    description: Add a new product
 *    parameters:
 *      - name: name
 *        in: body
 *        required: true
 *        type: string
 *      - name: description
 *        in: body
 *        required: true
 *        type: string
 *      - name: price
 *        in: body
 *        required: true
 *        type: number
 *      - name: stock
 *        in: body
 *        required: true
 *        type: integer
 *    responses:
 *      '201':
 *        description: Created
 */
app.post('/products', async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const result = await pool.query(
      'INSERT INTO products (name, description, price, stock) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, price, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * @swagger
 * /products/{id}:
 *  put:
 *    description: Update an existing product
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: integer
 *      - name: name
 *        in: body
 *        required: true
 *        type: string
 *      - name: description
 *        in: body
 *        required: true
 *        type: string
 *      - name: price
 *        in: body
 *        required: true
 *        type: number
 *      - name: stock
 *        in: body
 *        required: true
 *        type: integer
 *    responses:
 *      '200':
 *        description: Updated
 */
app.put('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const result = await pool.query(
      'UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *',
      [name, description, price, stock, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

/**
 * @swagger
 * /products/{id}:
 *  delete:
 *    description: Delete a product
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: integer
 *    responses:
 *      '204':
 *        description: No Content
 */
app.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
