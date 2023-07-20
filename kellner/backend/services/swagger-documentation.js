const loginDocumentation = `
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login as a manager
 *     tags:
 *       - Manager
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mEmail:
 *                 type: string
 *               mPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Incorrect username or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Error occurred during login
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginResponse:
 *       type: object
 *       properties:
 *         mId:
 *           type: string
 *         mName:
 *           type: string
 *         mEmail:
 *           type: string
 *         token:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         errorMessage:
 *           type: string
 */
`;

module.exports = loginDocumentation;
