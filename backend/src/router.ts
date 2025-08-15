import { Router } from 'express';
import { body } from 'express-validator';
import { createAccount, login } from './handlers';
import { handleInputErrors } from './middleware/validation';

const router = Router();

/* Autenticación y Registro de usuarios */
router.post('/auth/register',
  body('handle')
    .notEmpty()
    .withMessage('handle cannot be empty'),
  body('name')
    .notEmpty()
    .withMessage('name cannot be empty'),
  body('email')
    .isEmail()
    .withMessage('Email is not valid'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  handleInputErrors,
  createAccount
)

router.post('/auth/login',
  body('email')
    .isEmail()
    .withMessage('Email is not valid'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleInputErrors,
  login
);

export default router;




