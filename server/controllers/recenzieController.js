const Recenzie = require('../models/Recenzie');

class RecenzieController {
    static async getAll(req, res) {
        try {
            const recenzii = await Recenzie.findAll();
            res.json(recenzii);
        } catch (err) {
            res.status(500).json({ message: 'Eroare la obținerea recenziilor.' });
        }
    }

    static async getById(req, res) {
        try {
            const recenzie = await Recenzie.findByPk(req.params.id);
            if (recenzie) {
                res.json(recenzie);
            } else {
                res.status(404).json({ message: 'Recenzia nu a fost găsită.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la obținerea recenziei.' });
        }
    }

    static async create(req, res) {
        try {
            const newRecenzie = await Recenzie.create(req.body);
            res.status(201).json(newRecenzie);
        } catch (err) {
            res.status(500).json({ message: 'Eroare la crearea recenziei.' });
        }
    }

    static async update(req, res) {
        try {
            const recenzie = await Recenzie.findByPk(req.params.id);
            if (recenzie) {
                await recenzie.update(req.body);
                res.json(recenzie);
            } else {
                res.status(404).json({ message: 'Recenzia nu a fost găsită.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la actualizarea recenziei.' });
        }
    }

    static async delete(req, res) {
        try {
            const recenzie = await Recenzie.findByPk(req.params.id);
            if (recenzie) {
                await recenzie.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Recenzia nu a fost găsită.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la ștergerea recenziei.' });
        }
    }
}

module.exports = RecenzieController;
