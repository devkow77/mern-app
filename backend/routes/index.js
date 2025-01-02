import { Router } from 'express';
import userRoutes from './user.js';
import serviceRoutes from './service.js';

const router = Router();

router.use('/api/users', userRoutes);
router.use('/api/services', serviceRoutes);

export default router;
