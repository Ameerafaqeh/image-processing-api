import { resizeImage } from '../src/utils/imageProcessing';
import fs from 'fs';
import path from 'path';

describe('resizeImage', () => {
    const filename = 'sample';
    const width = 100;
    const height = 100;

    it('should create a resized image', async () => {
        const outputPath = await resizeImage(filename, width, height);
        expect(fs.existsSync(outputPath)).toBeTrue();
    });

    it('should throw error if image does not exist', async () => {
        await expectAsync(resizeImage('notexist', width, height)).toBeRejectedWithError('Image notexist.jpg does not exist in full/ folder.');
    });
});
