const authorize = (roles = []) => {
    
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Neautorizat. Nu ai acces la această resursă.' });
        }

        if (roles.length && !roles.includes(req.user.tipUtilizator)) {
            return res.status(403).json({ message: 'Acces interzis. Nu ai permisiunea necesară.' });
        }

        next();
    };
};

module.exports = authorize;
