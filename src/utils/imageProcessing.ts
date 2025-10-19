import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const resizeImage = async (
    filename: string,
    width: number,
    height: number
): Promise<string> => {
    // مجلد الصور الأصلية
    const fullDir = path.join(__dirname, '../../images/full');
    // مجلد الصور المصغرة
    const thumbsDir = path.join(__dirname, '../../images/thumbs');

    // تأكد من وجود مجلد thumbs
    if (!fs.existsSync(thumbsDir)) {
        fs.mkdirSync(thumbsDir, { recursive: true });
    }

    const inputPath = path.join(fullDir, `${filename}.jpg`);
    const outputPath = path.join(thumbsDir, `${filename}-${width}x${height}.jpg`);

    if (!fs.existsSync(inputPath)) {
        throw new Error(`Image ${filename}.jpg does not exist in full/ folder.`);
    }

    // إذا الصورة غير موجودة في thumbs، نعمل resize
    if (!fs.existsSync(outputPath)) {
        await sharp(inputPath)
            .resize(width, height)
            .toFile(outputPath);
    }

    // رجع المسار الكامل
    return outputPath;
};
