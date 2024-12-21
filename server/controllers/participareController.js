const Participare = require('../models/Participare');

class ParticipareController {
    static async getAll(req, res) {
        try {
            const participari = await Participare.findAll();
            res.json(participari);
        } catch (err) {
            res.status(500).json({ message: 'Eroare la obținerea participărilor.' });
        }
    }

    static async getById(req, res) {
        try {
            const participare = await Participare.findByPk(req.params.id);
            if (participare) {
                res.json(participare);
            } else {
                res.status(404).json({ message: 'Participarea nu a fost găsită.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la obținerea participării.' });
        }
    }

    static async create(req, res) {
        try {
            const newParticipare = await Participare.create(req.body);
            res.status(201).json(newParticipare);
        } catch (err) {
            res.status(500).json({ message: 'Eroare la crearea participării.' });
        }
    }

    static async delete(req, res) {
        try {
            const participare = await Participare.findByPk(req.params.id);
            if (participare) {
                await participare.destroy();
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Participarea nu a fost găsită.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la ștergerea participării.' });
        }
    }
}

module.exports = ParticipareController;
