import { Router } from 'express';
import {getCombinedOrderBookRequest} from '../controllers/orders.controller';
const router = new Router();


// Get all Orders
router.route('/orders').get(getCombinedOrderBookRequest);

export default router;
