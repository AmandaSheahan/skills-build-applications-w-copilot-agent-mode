import { Router } from 'express';
import { getApiBaseUrl } from '../config/api.js';
import { Activity } from '../models/index.js';
const router = Router();
router.get('/', async (_request, response) => {
    try {
        const activities = await Activity.find().populate('userId').lean();
        response.json({ apiBaseUrl: getApiBaseUrl(), items: activities });
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch activities', details: error.message });
    }
});
router.post('/', async (request, response) => {
    try {
        const activity = await Activity.create(request.body);
        response.status(201).json({ apiBaseUrl: getApiBaseUrl(), item: activity });
    }
    catch (error) {
        response.status(400).json({ error: 'Failed to create activity', details: error.message });
    }
});
export default router;
