import { Router } from 'express';
import { createTheater, deleteTheater, getTheaterById, getTheaters, updateTheater } from '../controllers/theater.controllers';
import { theaterValidator, validateBody } from '../middleware/validation.middleware';

const router = Router();

router.get('/', getTheaters);
router.get('/:id', getTheaterById);
router.post('/', validateBody(theaterValidator), createTheater);
router.put('/:id', updateTheater);
router.delete('/:id', deleteTheater);

export default router;

