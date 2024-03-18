import express from 'express'
import { rateController } from '../../controllers/index.js'
const router = express.Router()
router.route('/').get(rateController.getRate).post(rateController.createRate)
export default router