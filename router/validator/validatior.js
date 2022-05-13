import { body, validationResult } from 'express-validator';



export const textLength= body('text').trim().isLength({min:3}).withMessage("3글자 이상");

export const nameLength= body('username').trim().isLength({min:2}).withMessage("2글자이상")

export const isEmail=body('email').trim().isEmail().withMessage("email")

export function validate(req, res, next) {
    const err=validationResult(req);
    if(err.isEmpty()){   
    return next()
    }
    return res.status(400).json(err.array());
}
