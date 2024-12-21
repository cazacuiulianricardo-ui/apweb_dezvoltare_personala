class CursController {
    constructor({ cursService }) {
        this.cursService = cursService;
    }

    async getAll(req, res) {
        try {
            const cursuri = await this.cursService.getAllCursuri();
            res.json(cursuri);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la obținerea cursurilor.', error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const curs = await this.cursService.getCursById(req.params.id);
            if (curs) {
                res.json(curs);
            } else {
                res.status(404).json({ message: 'Cursul nu a fost găsit.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la obținerea cursului.', error: err.message });
        }
    }

    async create(req, res) {
        try {
            const { titlu, descriere, nivelDificultate, idInstructor, dataIncepere, dataFinalizare } = req.body;

            if (!titlu || !descriere || !nivelDificultate || !idInstructor || !dataIncepere || !dataFinalizare) {
                return res.status(400).json({ message: 'Toate câmpurile sunt obligatorii.' });
            }

            const curs = await this.cursService.createCurs({
                titlu,
                descriere,
                nivelDificultate,
                idInstructor,
                dataIncepere,
                dataFinalizare
            });

            res.status(201).json(curs);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la crearea cursului.', error: err.message });
        }
    }

    async update(req, res) {
        try {
            const updatedCurs = await this.cursService.updateCurs(req.params.id, req.body);
            if (updatedCurs) {
                res.json(updatedCurs);
            } else {
                res.status(404).json({ message: 'Cursul nu a fost găsit.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la actualizarea cursului.', error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const success = await this.cursService.deleteCurs(req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Cursul nu a fost găsit.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la ștergerea cursului.', error: err.message });
        }
    }

    async getMyCreatedCourses(req, res) {
        try {
            const instructorId = req.user.id; 
            const cursuri = await this.cursService.getCursuriByInstructorId(instructorId);
            res.json(cursuri);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la obținerea cursurilor create de tine.', error: err.message });
        }
    }

    async createCourse(req, res) {
        try {
            const instructorId = req.user.id;
            const { titlu, descriere, nivelDificultate, dataIncepere, dataFinalizare, durata } = req.body;

            if (!titlu || !descriere || !nivelDificultate || !dataIncepere || !dataFinalizare || !durata) {
                return res.status(400).json({ message: 'Toate câmpurile sunt obligatorii.' });
            }

            const curs = await this.cursService.createCurs({
                titlu,
                descriere,
                nivelDificultate,
                idInstructor: instructorId,
                dataIncepere,
                dataFinalizare,
                durata
            });

            return res.status(201).json(curs);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Eroare la crearea cursului.', error: err.message });
        }
    }
}

module.exports = CursController;
