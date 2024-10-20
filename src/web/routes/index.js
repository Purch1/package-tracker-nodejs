import { Router } from 'express';

import authRouter from './auth.routes.js'; 
import packageRouter from './package.routes.js'; 
import deliveryRouter from './delivery.routes.js'; 

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/packages', packageRouter); 
appRouter.use('/deliveries', deliveryRouter);
