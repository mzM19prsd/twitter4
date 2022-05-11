import express from 'express';
import 'express-async-errors';
import bcrypt from "bcrypt"
import jsonwebtoken from 'jsonwebtoken';

const router = express.Router();

function createJWT(email){
    return jsonwebtoken.sign({email}, secretKey)
}

//토큰 유효성
const isAuth=(req, res, next)=>{
    const authHeader=req.get('Authorization')
    const token=authHeader.split(' ')[1];
    if(!(authHeader&& authHeader.startsWith('Bearer'))){
        return res.status(401)
    }
    jsonwebtoken.verify(
        token,
        secretKey,
        (error, decoded)=>{
            if(error){
                return res.status(401)
            }
            const user=userData.find((user)=>user.email===decoded.email);
            if(!user){
                return res.status(401)
            }
            req.email=user.email;
            req.token=token;
            next()
        }

    )
    return res.status(200)
}

const secretKey='secret';
let userData=[
    {
        "email":"asd@asd.com",
        "password":"asd123",
        "name":"kate",
        "username":"9999",
        "url":"",
    }];

 // http://localhost:8080/auth/signup   
router.post('/signup',(req, res, next)=>{
    const {email, password, name, username, url}=req.body;
    const find=userData.find((user) => user.email===email);
    if(find){
        return res.status(409).json({message:"already sign up"})
    }
    const hashed=bcrypt.hashSync(password, 12);    
    const newAccount={email, "password":hashed, name, username, url}
    userData.push(newAccount)
    res.status(201).json({message:"success"})
  });

router.post('/login', (req, res, next)=>{
    const {email, password}=req.body;
    const user=userData.find((user) => user.email===email);
    if(!user){      
        return res.status(401).json({message:"invalid"})
    }
    const compare=bcrypt.compareSync(password, user.password)
    if(!compare){
        return res.status(401).json({message:"invalid"})
    }
    const token=createJWT(user.email)
    return res.status(200).json({token, email})
    
});

router.get('/me', isAuth, (req, res, next)=>{
    const user=userData.find((user)=>req.email===user.email);
    if(!user){
        return res.status(404)
    }
    res.status(200).json({token:req.token, email:req.email})
} );

export default router;
