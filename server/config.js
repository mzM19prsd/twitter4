import dotenv from 'dotenv'
dotenv.config()

export const config={
    jwt:{
        secretKey:process.env.JMT_SECRET,
        expiresInSec:parseInt(process.env.JMT_EXPIRES),
    },
    bcrypt:{
        saltRounds:parseInt(process.env.BCRYPT_SALT)
    },
    host: {
      port: parseInt(process.env.HOST_PORT),
    },
    db:{
        host:process.env.DB_HOST
    },
    csrf:{
        plaintoken:process.env.CSRF_SECRET_KEY
    }
}
