import supertest from 'supertest';
import app from '../src/index';

const request = supertest(app);

describe('GET /api/images', () => {
    it('should return the resized image', async () => {
        const res = await request.get('/api/images?filename=sample&width=100&height=100');
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/image/);
    });

    it('should return 400 if missing filename', async () => {
        const res = await request.get('/api/images?width=100&height=100');
        expect(res.status).toBe(400);
    });
});
