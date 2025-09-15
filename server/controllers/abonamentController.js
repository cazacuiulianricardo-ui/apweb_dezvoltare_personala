const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'secretul_tau_super_sigur';

class AbonamentController {
    constructor({ abonamentService, utilizatorService, cursService }) {
        this.abonamentService = abonamentService;
        this.utilizatorService = utilizatorService;
        this.cursService = cursService;
    }

    async getAll(req, res) {
        try {
            const abonamente = await this.abonamentService.getAllAbonamente();
            res.json(abonamente);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la obținerea listelor de abonamente.', error: err.message });
        }
    }

    async getById(req, res) {
        try {
            const abonament = await this.abonamentService.getAbonamentById(req.params.id);
            if (abonament) {
                res.json(abonament);
            } else {
                res.status(404).json({ message: 'Abonamentul nu a fost găsit.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la obținerea abonamentului.', error: err.message });
        }
    }

    async create(req, res) {
        try {
            const { tip, pret, drepturi, idUtilizator } = req.body;

            if (!tip || !pret || !drepturi || !idUtilizator) {
                return res.status(400).json({ message: 'Toate câmpurile sunt obligatorii.' });
            }

            const newAbonament = await this.abonamentService.createAbonament({
                tip,
                pret,
                drepturi,
                idUtilizator
            });

            res.status(201).json(newAbonament);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la crearea abonamentului.', error: err.message });
        }
    }

    async update(req, res) {
        try {
            const updatedAbonament = await this.abonamentService.updateAbonament(req.params.id, req.body);
            if (updatedAbonament) {
                res.json(updatedAbonament);
            } else {
                res.status(404).json({ message: 'Abonamentul nu a fost găsit.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la actualizarea abonamentului.', error: err.message });
        }
    }

    async delete(req, res) {
        try {
            const success = await this.abonamentService.deleteAbonament(req.params.id);
            if (success) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Abonamentul nu a fost găsit.' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Eroare la ștergerea abonamentului.', error: err.message });
        }
    }

    async subscribe(req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Neautorizat. Token-ul nu a fost furnizat.' });
            }

            let decoded;
            try {
                decoded = jwt.verify(token, secretKey);
            } catch (err) {
                return res.status(401).json({ message: 'Token invalid sau expirat.' });
            }

            const utilizator = await this.utilizatorService.getUtilizatorById(decoded.id);
            if (!utilizator) {
                return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
            }

            const { tip, pret, drepturi } = req.body;
            if (!tip || !pret || !drepturi) {
                return res.status(400).json({ message: 'Toate câmpurile sunt obligatorii.' });
            }

            const abonament = await this.abonamentService.subscribe(utilizator.idUtilizator, {
                tip,
                pret,
                drepturi
            });

            res.status(201).json({ message: 'Te-ai abonat cu succes!', abonament });
        } catch (err) {
            console.error('Eroare la abonare:', err);
            res.status(500).json({ message: 'Eroare la abonare.', error: err.message });
        }
    }

    async getAbonamentActiv(req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Neautorizat. Token-ul nu a fost furnizat.' });
            }

            let decoded;
            try {
                decoded = jwt.verify(token, secretKey);
            } catch (err) {
                return res.status(401).json({ message: 'Token invalid sau expirat.' });
            }

            const utilizator = await this.utilizatorService.getUtilizatorById(decoded.id);
            if (!utilizator) {
                return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
            }

            const abonament = await this.abonamentService.getAbonamentActiv(utilizator.idUtilizator);
            if (!abonament) {
                return res.status(404).json({ message: 'Nu ai niciun abonament activ.' });
            }

            res.json(abonament);
        } catch (err) {
            console.error('Eroare în getAbonamentActiv:', err);
            res.status(500).json({ message: 'Eroare la obținerea abonamentului activ.', error: err.message });
        }
    }

    async upgradeAbonament(req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Neautorizat. Token-ul nu a fost furnizat.' });
            }

            let decoded;
            try {
                decoded = jwt.verify(token, secretKey);
            } catch (err) {
                return res.status(401).json({ message: 'Token invalid sau expirat.' });
            }

            const utilizator = await this.utilizatorService.getUtilizatorById(decoded.id);
            if (!utilizator) {
                return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
            }

            const { tipNou } = req.body;
            if (!tipNou) {
                return res.status(400).json({ message: 'Tipul nou este necesar pentru upgrade.' });
            }

            const abonament = await this.abonamentService.upgradeAbonament(utilizator.idUtilizator, tipNou);
            if (!abonament) {
                return res.status(404).json({ message: 'Abonament inexistent sau expirat.' });
            }

            res.json({ message: 'Abonamentul a fost actualizat cu succes!', abonament });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la actualizarea abonamentului.', error: err.message });
        }
    }

    async getAvailableCourses(req, res) {
        try {
            const { idAbonament } = req.params;
    
            if (!idAbonament) {
                return res.status(400).json({ message: 'ID-ul abonamentului este necesar.' });
            }
    
            const abonament = await this.abonamentService.getAbonamentById(idAbonament);
    
            if (!abonament) {
                return res.status(404).json({ message: 'Abonamentul nu a fost găsit.' });
            }
    
            const niveluri = abonament.tip === 'Standard' ? ['începător'] : ['începător', 'avansat'];
    
            const cursuri = await this.cursService.getCursuriByNivel(niveluri);
                if (cursuri.length === 0) {
                return res.status(404).json({ message: 'Nu sunt cursuri disponibile pentru acest abonament.' });
            }
    
            res.json(cursuri);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la obținerea cursurilor pentru abonament.', error: err.message });
        }
    }

    async getMyCourses(req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Neautorizat. Token-ul nu a fost furnizat.' });
            }

            let decoded;
            try {
                decoded = jwt.verify(token, secretKey);
            } catch (err) {
                return res.status(401).json({ message: 'Token invalid sau expirat.' });
            }

            const utilizator = await this.utilizatorService.getUtilizatorById(decoded.id);
            if (!utilizator) {
                return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
            }

            const abonament = await this.abonamentService.getAbonamentActiv(utilizator.idUtilizator);
            if (!abonament) {
                return res.status(404).json({ message: 'Nu există abonament activ.' });
            }

            const niveluri = abonament.tip === 'Standard' ? ['începător'] : ['începător', 'avansat'];

            const cursuri = await this.cursService.getCursuriByNivel(niveluri);

            res.json(cursuri);
        } catch (err) {
            console.error('Eroare în getMyCourses:', err);
            res.status(500).json({ message: 'Eroare la obținerea cursurilor.', error: err.message });
        }
    }
    async switchAbonament(req, res) {
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Neautorizat. Token-ul nu a fost furnizat.' });
            }

            let decoded;
            try {
                decoded = jwt.verify(token, secretKey);
            } catch (err) {
                return res.status(401).json({ message: 'Token invalid sau expirat.' });
            }

            const utilizator = await this.utilizatorService.getUtilizatorById(decoded.id);
            if (!utilizator) {
                return res.status(404).json({ message: 'Utilizatorul nu a fost găsit.' });
            }

            const { tipNou } = req.body;
            if (!tipNou) {
                return res.status(400).json({ message: 'Tipul nou este necesar pentru schimbare.' });
            }

            const abonament = await this.abonamentService.switchAbonament(utilizator.idUtilizator, tipNou);
            if (!abonament) {
                return res.status(404).json({ message: 'Abonament inexistent sau expirate.' });
            }

            res.json({ message: 'Abonamentul a fost schimbat cu succes!', abonament });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la schimbarea abonamentului.', error: err.message });
        }
    }
}

module.exports = AbonamentController;
