const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, 'uploads/pdfs/');
        } else if (file.mimetype.startsWith('video/')) {
            cb(null, 'uploads/videos/');
        } else {
            cb(null, 'uploads/others/'); 
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname).toLowerCase();
        const name = path.basename(file.originalname, ext).replace(/\s+/g, '_'); 
        cb(null, `${uniqueSuffix}-${name}${ext}`); 
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
