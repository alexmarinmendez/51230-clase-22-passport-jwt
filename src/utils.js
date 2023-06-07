import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const generateToken = user => {
    return jwt.sign({ user }, process.env.PRIVATE_KEY, { expiresIn: '24h' })
}

export const authToken = (req, res, next) => {
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoiY29kZXJAY29kZXIuY29tIiwicGFzc3dvcmQiOiJzZWNyZXQiLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNjg2MTQ1NjkxLCJleHAiOjE2ODYyMzIwOTF9.DxTw1WDztThzYuo6912CQ_2cIHCVrRNgydX8CSyOdKM'
    let token = req.headers.authorization
    if (!token) token = req.cookies['myCookieForToken']
    if (!token) return res.status(401).json({ error: 'Not authenticated!'})
    jwt.verify(token, process.env.PRIVATE_KEY, (err, credential) => {
        if (err) return res.status(403).json({ error: 'Not authorized!'})
        req.user = credential.user
        next()
    })
}