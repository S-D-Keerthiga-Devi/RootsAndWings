import express from 'express';
import {
  getAvailablePlants,
  adoptPlant,
  getAllPlants,
  adminUpdatePlant,
  createPlant,
  getPlantDashboard,
  getUserPlants
} from '../controllers/rootsController.js';

const router = express.Router();

// Admin Routes
router.get('/all', getAllPlants);
router.post('/update', adminUpdatePlant);
router.post('/create', createPlant);

// User Routes
router.get('/available', getAvailablePlants);
router.post('/adopt', adoptPlant);
router.get('/user-plants/:userId', getUserPlants);
router.get('/:userId', getPlantDashboard);

export default router;