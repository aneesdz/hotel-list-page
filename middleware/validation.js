const { body, param, query } = require('express-validator');

const validateHotelCreation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('latitude').optional().isNumeric().withMessage('Latitude must be a number'),
  body('longitude').optional().isNumeric().withMessage('Longitude must be a number'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
];

const validateHotelUpdate = [
  param('id').isInt().withMessage('Invalid hotel ID'),
  body('title').optional().isString().withMessage('Title must be a string'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('latitude').optional().isNumeric().withMessage('Latitude must be a number'),
  body('longitude').optional().isNumeric().withMessage('Longitude must be a number'),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
];

const validateHotelDeletion = [
  param('id').isInt().withMessage('Invalid hotel ID'),
];

const validateHotelFilters = [
  query('title').optional().isString().withMessage('Title must be a string'),
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Min Price must be a positive number'),
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Max Price must be a positive number'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Offset must be a non-negative integer'),
  query('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Limit must be a positive integer'),
];

module.exports = {
  validateHotelCreation,
  validateHotelUpdate,
  validateHotelDeletion,
  validateHotelFilters,
};
