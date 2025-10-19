import express from 'express';
import { resizeImage } from '../utils/imageProcessing';

const router = express.Router();

router.get('/', async (req, res) => {
    const filename = req.query.filename as string;
    const width = parseInt(req.query.width as string);
    const height = parseInt(req.query.height as string);

    if (!filename) return res.status(400).send('Missing filename parameter.');
    if (!width || !height) return res.status(400).send('Missing width or height parameter.');
    if (width <= 0 || height <= 0) return res.status(400).send('Width and height must be positive numbers.');

    try {
        const imagePath = await resizeImage(filename, width, height);
        res.sendFile(imagePath);
    } catch (err: any) {
        res.status(404).send(err.message);
    }
});

export default router;
