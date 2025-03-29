import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const imagePath = path.join(process.cwd(), 'public', 'images', 'img-top.webp');

  if (fs.existsSync(imagePath)) {
    const imageBuffer = fs.readFileSync(imagePath);
    res.setHeader('Content-Type', 'image/webp');
    res.setHeader('Cache-Control', 'no-cache');
    res.status(200).send(imageBuffer);
  } else {
    res.status(404).send('Image not found');
  }
}
