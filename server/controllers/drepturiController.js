const Drepturi = require('../models/Drepturi');

class DrepturiController {
    static async getAll(req, res) {
        try {
            const drepturi = await Drepturi.findAll();
            res.json(drepturi);
        } catch (err) {
            res.status(500).json({ message: 'Eroare la obținerea drepturilor.' });
        }
    }

    static async getById(req, res) {
        try {
            const drepturi = await Drepturi.findByPk(req.params.id);
            if (drepturi) {
                res.json(drepturi);
            } else {
                res.status(404).json({ message: 'Drepturile nu au fost găsite.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la obținerea drepturilor.' });
        }
    }

    static async create(req, res) {
        try {
            const newDrepturi = await Drepturi.create(req.body);
            res.status(201).json(newDrepturi);
        } catch (err) {
            res.status(500).json({ message: 'Eroare la crearea drepturilor.' });
        }
    }

    static async update(req, res) {
        try {
            const drepturi = await Drepturi.findByPk(req.params.id);
            if (drepturi) {
                await drepturi.update(req.body);
                res.json(drepturi);
            } else {
                res.status(404).json({ message: 'Drepturile nu au fost găsite.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la actualizarea drepturilor.' });
        }
    }

    static async delete(req, res) {
        try {
            const drepturi = await Drepturi.findByPk(req.params.id);
            if (drepturi) {
                await drepturi.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Drepturile nu au fost găsite.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la ștergerea drepturilor.' });
        }
    }
}

module.exports = DrepturiController;
