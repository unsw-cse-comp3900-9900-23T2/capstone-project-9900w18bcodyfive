const express = require('express');
const limiter = require('../services/ratelimiting');

const router = new express.Router()
const {
    getAllCategories,
    } = require('../../Controllers/userController.js')

/*================================================================================================================================== 
    USER SETUP
  ================================================================================================================================== */  

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         cId:
 *           type: string
 *         rId:
 *           type: string
 *         cName:
 *           type: string
 *         cDescription:
 *           type: string
 *         cType:
 *           type: string
 *         cImage:
 *           type: string
 *     GetCategoryRequest:
 *       type: object
 *       properties:
 *         resId:
 *           type: string
 *     GetCategoryResponse:
 *       type: object
 *       properties:
 *         cId:
 *           type: string
 *         rId:
 *           type: string
 *         cName:
 *           type: string
 *         cDescription:
 *           type: string
 *         cType:
 *           type: string
 *         cImage:
 *           type: string
 *     Error:
 *       type: object
 *       properties:
 *         errorMessage:
 *           type: string
 */  


/**
 * @swagger
 * /api/getAllCategories/:rId:
 *   post:
 *     summary: Get all categories
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GetCategoryRequest'
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCategoryResponse'
 *       400:
 *         description: Failed to fetch categories. Did you pass along a valid resId?
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
*/

// Get all categories
router.get('api/getAllCategories/:rId', getAllCategories)

module.exports = router


