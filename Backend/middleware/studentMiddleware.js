const jwt = require('jsonwebtoken');
const Student = require('../models/etudiantSchema'); // Assuming the student model is imported

async function studentMiddleware(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        if (decoded.role !== 'etudiant') {
            return res.status(403).json({ message: 'Forbidden' });
        }

        const user = await Student.findById(decoded.sub);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in studentMiddleware:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = studentMiddleware;