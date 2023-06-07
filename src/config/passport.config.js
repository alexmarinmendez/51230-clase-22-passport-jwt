import passport from "passport"
import jwt from 'passport-jwt'

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = req => {
    const token = (req && req.cookies) ? req.cookies['myCookieForToken'] : null
    return token
}

const initializePassport = () => {

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.PRIVATE_KEY
    }, async(jwt_payload, done) => {
        try {
            return done(null, jwt_payload)
        } catch(err) {
            return done(err)
        }
    }))

}

export default initializePassport