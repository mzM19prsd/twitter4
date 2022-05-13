import dotenv from 'dotenv'
dotenv.config()

export const config={
    jwt:{
        secretKey:process.env.JMT_SECRET,
        expries:parseInt(process.env.JMT_EXPIRES),
    },
    bcrypt:{
        saltRounds:parseInt(process.env.BCRYPT_SALT)
    }
}