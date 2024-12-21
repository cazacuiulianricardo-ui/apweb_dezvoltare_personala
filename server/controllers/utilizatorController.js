class UtilizatorController {
    constructor({ utilizatorService }) {
        this.utilizatorService = utilizatorService;
    }

    async getAll(req, res) {
        try {
            const utilizatori = await this.utilizatorService.getAllUtilizatori();
            res.json(utilizatori);
        } catch (err) {
            res.status(500).json({ message: 'Eroare la obținerea utilizatorilor.', error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const utilizator = await this.utilizatorService.getUtilizatorById(req.params.id);
            if (utilizator) {
                res.json(utilizator);
            } else {
                res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la obținerea utilizatorului.', error: err.message });
        }
    }

    async create(req, res) {
        try {
            const { nume, email, parola, tipUtilizator } = req.body;

            if (!nume || !email || !parola || !tipUtilizator) {
                return res.status(400).json({ message: 'Toate câmpurile sunt obligatorii.' });
            }

            const newUtilizator = await this.utilizatorService.createUtilizator({
                nume,
                email,
                parola,
                tipUtilizator
            });

            res.status(201).json(newUtilizator);
        } catch (err) {
            res.status(500).json({ message: 'Eroare la crearea utilizatorului.', error: err.message });
        }
    }

    async update(req, res) {
        try {
            const updatedUtilizator = await this.utilizatorService.updateUtilizator(req.params.id, req.body);
            if (updatedUtilizator) {
                res.json(updatedUtilizator);
            } else {
                res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la actualizarea utilizatorului.', error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const success = await this.utilizatorService.deleteUtilizator(req.params.id);
            if (success) {
                res.json({ message: 'Utilizator șters cu succes.' });
            } else {
                res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la ștergerea utilizatorului.', error: err.message });
        }
    }
    async softDelete(req, res) {
        try {
            const utilizator = await this.utilizatorService.softDeleteUtilizator(req.params.id);
            if (utilizator) {
                res.json({ message: 'Utilizator șters logic cu succes.', utilizator });
            } else {
                res.status(404).json({ message: 'Utilizatorul nu a fost găsit sau este deja șters logic.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la ștergerea logică a utilizatorului.', error: err.message });
        }
    }

    async restore(req, res) {
        try {
            const utilizator = await this.utilizatorService.restoreUtilizator(req.params.id);
            if (utilizator) {
                res.json({ message: 'Utilizator restaurat cu succes.', utilizator });
            } else {
                res.status(404).json({ message: 'Utilizatorul nu a fost găsit sau nu este marcat ca șters logic.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la restaurarea utilizatorului.', error: err.message });
        }
    }
}

module.exports = UtilizatorController;
