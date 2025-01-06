import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import imageDownloader from 'image-downloader';
import { fileURLToPath } from 'url';
import express from 'express';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '..', 'uploads');

// Upewnij się, że folder `uploads` istnieje
if (!fs.existsSync(uploadsDir)) {
	fs.mkdirSync(uploadsDir);
}

const photosMiddleware = multer({ dest: uploadsDir });

router.use('/', express.static(uploadsDir));

router.post('/upload', photosMiddleware.array('photos', 100), async (req, res) => {
	try {
		const uploadedFiles = req.files.map((file) => {
			const ext = path.extname(file.originalname); // Pobierz rozszerzenie pliku
			const newPath = `${file.path}${ext}`; // Nowa ścieżka z rozszerzeniem
			fs.renameSync(file.path, newPath); // Zmień nazwę pliku

			// Zwróć tylko nazwę pliku, a nie całą ścieżkę
			return path.basename(newPath);
		});

		res.json(uploadedFiles); // Wyślij nazwy plików jako odpowiedź
	} catch (error) {
		console.error('Error during file upload:', error);
		res.status(500).json({ error: 'File upload failed' });
	}
});

router.post('/upload-by-link', async (req, res) => {
	const { link } = req.body;
	const newName = 'photo' + Date.now() + '.jpg';
	await imageDownloader.image({
		url: link,
		dest: path.join(__dirname, 'uploads', newName),
	});
	res.json(newName);
});

export default router;
