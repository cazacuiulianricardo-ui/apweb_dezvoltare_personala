const path = require('path');

class ResourceController {
    constructor({ videoService, pdfService }) {
        this.videoService = videoService;
        this.pdfService = pdfService;
    }

    async addVideo(req, res) {
        try {
            const moduleId = req.params.moduleId;
            const { titlu } = req.body;
            const file = req.file;

            if (!titlu || !file) {
                return res.status(400).json({ message: 'Titlul și fișierul sunt necesare.' });
            }

            const videoUrl = `/uploads/videos/${file.filename}${path.extname(file.originalname)}`;
            const newVideo = await this.videoService.createVideo({ titlu, url: videoUrl, idModule: moduleId });
            res.status(201).json(newVideo);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la adăugarea videoclipului.', error: err.message });
        }
    }

    async updateVideo(req, res) {
        try {
            const videoId = req.params.videoId;
            const { titlu, url } = req.body;

            if (!titlu && !url) {
                return res.status(400).json({ message: 'Cel puțin un câmp (titlu sau url) este necesar pentru actualizare.' });
            }

            const updatedVideo = await this.videoService.updateVideo(videoId, { titlu, url });
            if (updatedVideo) {
                res.json(updatedVideo);
            } else {
                res.status(404).json({ message: 'Videoclipul nu a fost găsit.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la actualizarea videoclipului.', error: err.message });
        }
    }

    async deleteVideo(req, res) {
        try {
            const videoId = req.params.videoId;
            const success = await this.videoService.deleteVideo(videoId);
            if (success) {
                res.json({ message: 'Videoclipul a fost șters cu succes.' });
            } else {
                res.status(404).json({ message: 'Videoclipul nu a fost găsit.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la ștergerea videoclipului.', error: err.message });
        }
    }


    async addPDF(req, res) {
        try {
            const moduleId = req.params.moduleId;
            const { titlu } = req.body;
            const file = req.file;

            if (!titlu || !file) {
                return res.status(400).json({ message: 'Titlul și fișierul sunt necesare.' });
            }

            const pdfUrl = `/uploads/pdfs/${file.filename}${path.extname(file.originalname)}`;
            const newPDF = await this.pdfService.createPDF({ titlu, url: pdfUrl, idModule: moduleId });
            res.status(201).json(newPDF);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la adăugarea fișierului PDF.', error: err.message });
        }
    }

    async updatePDF(req, res) {
        try {
            const pdfId = req.params.pdfId;
            const { titlu, url } = req.body;

            if (!titlu && !url) {
                return res.status(400).json({ message: 'Cel puțin un câmp (titlu sau url) este necesar pentru actualizare.' });
            }

            const updatedPDF = await this.pdfService.updatePDF(pdfId, { titlu, url });
            if (updatedPDF) {
                res.json(updatedPDF);
            } else {
                res.status(404).json({ message: 'Fișierul PDF nu a fost găsit.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la actualizarea fișierului PDF.', error: err.message });
        }
    }

    async deletePDF(req, res) {
        try {
            const pdfId = req.params.pdfId;
            const success = await this.pdfService.deletePDF(pdfId);
            if (success) {
                res.json({ message: 'Fișierul PDF a fost șters cu succes.' });
            } else {
                res.status(404).json({ message: 'Fișierul PDF nu a fost găsit.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la ștergerea fișierului PDF.', error: err.message });
        }
    }
}

module.exports = ResourceController;
