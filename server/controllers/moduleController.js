class ModuleController {
    constructor({ moduleService }) {
        this.moduleService = moduleService;
    }

    async getModulesByCursId(req, res) {
        try {
            const cursId = req.params.cursId;
            const modules = await this.moduleService.getModulesByCursId(cursId);
            res.json(modules);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la obținerea modulelor.', error: err.message });
        }
    }

    async getModuleById(req, res) {
        try {
            const moduleId = req.params.id;
            const module = await this.moduleService.getModuleById(moduleId);
            if (module) {
                res.json(module);
            } else {
                res.status(404).json({ message: 'Modulul nu a fost găsit.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la obținerea modulului.', error: err.message });
        }
    }

    async createModule(req, res) {
        try {
            const { nume } = req.body;
            const idCurs = req.params.cursId;

            if (!nume) {
                return res.status(400).json({ message: 'Numele modulului este necesar.' });
            }

            const newModule = await this.moduleService.createModule({ nume, idCurs });
            res.status(201).json(newModule);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la crearea modulului.', error: err.message });
        }
    }

    async updateModule(req, res) {
        try {
            const moduleId = req.params.id;
            const { nume } = req.body;

            if (!nume) {
                return res.status(400).json({ message: 'Numele modulului este necesar.' });
            }

            const updatedModule = await this.moduleService.updateModule(moduleId, { nume });
            if (updatedModule) {
                res.json(updatedModule);
            } else {
                res.status(404).json({ message: 'Modulul nu a fost găsit.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la actualizarea modulului.', error: err.message });
        }
    }

    async deleteModule(req, res) {
        try {
            const moduleId = req.params.id;
            const success = await this.moduleService.deleteModule(moduleId);
            if (success) {
                res.json({ message: 'Modulul a fost șters cu succes.' });
            } else {
                res.status(404).json({ message: 'Modulul nu a fost găsit.' });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Eroare la ștergerea modulului.', error: err.message });
        }
    }
}

module.exports = ModuleController;
