import express from 'express'
import cookieParser from 'cookie-parser'
import jwtRouter from './routers/jwt.router.js'
import initializePassport from './config/passport.config.js'
import passport from 'passport'

const app = express()
app.use(express.json())
app.use(cookieParser())

initializePassport()
app.use(passport.initialize())

app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))

app.use('/jwt', jwtRouter)

app.listen(8080, () => console.log('Server Up!'))