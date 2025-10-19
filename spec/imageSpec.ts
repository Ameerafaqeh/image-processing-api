import request from 'supertest';
import app from '../src/index';

describe('GET /api/images', () => {
    it('should return 200 for valid parameters', async () => {
        const response = await request(app).get('/api/images?filename=sample&width=200&height=200');
        expect(response.status).toBe(200);
    });

    it('should return 400 for missing parameters', async () => {
        const response = await request(app).get('/api/images');
        expect(response.status).toBe(400);
    });

    it('should return 404 for non-existent image', async () => {
        const response = await request(app).get('/api/images?filename=notfound&width=200&height=200');
        expect(response.status).toBe(404);
    });
});
