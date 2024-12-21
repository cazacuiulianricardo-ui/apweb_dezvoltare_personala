const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'secretul_tau_super_sigur';

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Neautorizat. Token-ul nu a fost furnizat.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Neautorizat. Token-ul nu a fost furnizat.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Token invalid sau expirat.' });
    }
};

module.exports = authenticate;
