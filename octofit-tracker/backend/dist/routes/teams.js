import { Router } from 'express';
import { getApiBaseUrl } from '../config/api.js';
import { Team } from '../models/index.js';
const router = Router();
router.get('/', async (_request, response) => {
    try {
        const teams = await Team.find().lean();
        response.json({ apiBaseUrl: getApiBaseUrl(), items: teams });
    }
    catch (error) {
        response.status(500).json({ error: 'Failed to fetch teams', details: error.message });
    }
});
router.post('/', async (request, response) => {
    try {
        const team = await Team.create(request.body);
        response.status(201).json({ apiBaseUrl: getApiBaseUrl(), item: team });
    }
    catch (error) {
        response.status(400).json({ error: 'Failed to create team', details: error.message });
    }
});
export default router;
