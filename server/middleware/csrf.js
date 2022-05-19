import { config } from "../config.js";
import bcrypt from 'bcrypt';

export const csrfCheck=(req, res, next)=>{
    if(
        req.method==='GET'||
        req.method==='OPTIONS'||
        req.method==='HEAD'
    ) {
        return next()
    }
    
    const csrfHeader=req.get('x-csrf');
    if(!csrfHeader){
        return res.status(403).json({message:'failed csrf check'})
    }
    validateCsrfToken(csrfHeader).then((valid)=>{
        if(!valid){
            return res.status(403).json({message:'failed csrf check'})
        }
        next()
    })
    .catch((err)=>{
        console.log(err)
        return res.status(500).json({message:'server error'})
    })
}

async function validateCsrfToken(header){
    return bcrypt.compare(config.csrf.plaintoken, header)
}