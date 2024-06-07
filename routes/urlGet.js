import express from 'express';
import { handleGetShortURL } from '../controllers/url.js'

const router = express.Router();


router.get('/:id', handleGetShortURL)

export { router }