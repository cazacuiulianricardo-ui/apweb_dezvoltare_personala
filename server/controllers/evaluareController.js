const Evaluare = require('../models/Evaluare');

class EvaluareController {
    static async getAll(req, res) {
        try {
            const evaluari = await Evaluare.findAll();
            res.json(evaluari);
        } catch (err) {
            res.status(500).json({ message: 'Eroare la obținerea evaluărilor.' });
        }
    }

    static async getById(req, res) {
        try {
            const evaluare = await Evaluare.findByPk(req.params.id);
            if (evaluare) {
                res.json(evaluare);
            } else {
                res.status(404).json({ message: 'Evaluarea nu a fost găsită.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la obținerea evaluării.' });
        }
    }

    static async create(req, res) {
        try {
            const newEvaluare = await Evaluare.create(req.body);
            res.status(201).json(newEvaluare);
        } catch (err) {
            res.status(500).json({ message: 'Eroare la crearea evaluării.' });
        }
    }

    static async update(req, res) {
        try {
            const evaluare = await Evaluare.findByPk(req.params.id);
            if (evaluare) {
                await evaluare.update(req.body);
                res.json(evaluare);
            } else {
                res.status(404).json({ message: 'Evaluarea nu a fost găsită.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la actualizarea evaluării.' });
        }
    }

    static async delete(req, res) {
        try {
            const evaluare = await Evaluare.findByPk(req.params.id);
            if (evaluare) {
                await evaluare.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Evaluarea nu a fost găsită.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la ștergerea evaluării.' });
        }
    }
}

module.exports = EvaluareController;
