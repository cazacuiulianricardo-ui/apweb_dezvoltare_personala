const Video = require('../models/Video'); 
const PDF = require('../models/PDF'); 

const uploadFile = async (req, res) => {
    try {
        const { idModule, titlu } = req.body; 

        if (!req.file) {
            return res.status(400).json({ message: 'Nu s-a încărcat niciun fișier.' });
        }

        const file = req.file;
        const fileType = file.mimetype.startsWith('video/') ? 'video' :
                         file.mimetype === 'application/pdf' ? 'pdf' : 'other';

        const fileName = file.filename; 

        if (fileType === 'video') {
            await Video.create({
                titlu: titlu || file.originalname,
                url: fileName,
                idModule: idModule
            });
        } else if (fileType === 'pdf') {
            await PDF.create({
                titlu: titlu || file.originalname,
                url: fileName,
                idModule: idModule
            });
        }

        res.status(201).json({ message: 'Fișierul a fost încărcat cu succes.' });
    } catch (error) {
        console.error('Eroare la upload:', error);
        res.status(500).json({ message: 'Eroare la încărcarea fișierului.' });
    }
};

module.exports = { uploadFile };
