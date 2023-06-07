import { Router } from 'express'
import { authToken, generateToken } from '../utils.js'

const router = Router()
const users = [
    { email: 'coder@coder.com', password: 'secret', role: 'admin' }
]

router.post('/login', (req, res) => {
    const { email, password } = req.body
    const user = users.find(item => item.email === email && item.password === password)
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })
    const access_token = generateToken(user)
    res.cookie('myCookieForToken', access_token).json({ status: 'success' })
})

router.get('/private', authToken, (req, res) => {
    res.json({ status: 'success', payload: req.user })
})

export default router