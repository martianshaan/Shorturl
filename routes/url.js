import express from 'express';
import { handleShortGenerateURL,handleAnalytics} from '../controllers/url.js'

const router = express.Router();


router.post('/', handleShortGenerateURL);

router.get('/analytics/:shortId', handleAnalytics)

export { router }