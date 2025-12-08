import express from 'express'
import { colors } from '../utils/colors.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.json(colors)
})

export default router