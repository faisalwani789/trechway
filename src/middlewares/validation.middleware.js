import { validationResult, body } from "express-validator";

export const registerValidator = [
  body('email')
    .isEmail()
    .withMessage('Enter a valid email'),

  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

export const loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Email is required'),

  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 6 characters'),
];
export const passwordValidator = [
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 6 characters')
    .isStrongPassword(),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("passwords do not match")
    return true
  })
]

export const postValidator = [
  body('description').notEmpty().withMessage('description is empty').isLength({ max: 100 }).withMessage("description can't be more than 100 characters"),
  body('tags').isLength({ max: 100 }).withMessage('tags can not be more than 100 characters')
]