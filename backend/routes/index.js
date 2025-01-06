import { Router } from 'express';
import userRoutes from './user.js';
import placeRoutes from './place.js';
import bookingRoutes from './booking.js';
import imageRoutes from './image.js';

const router = Router();

router.use('/api/users', userRoutes);
router.use('/api/places', placeRoutes);
router.use('/api/bookings', bookingRoutes);
router.use('/api/images', imageRoutes);

export default router;
