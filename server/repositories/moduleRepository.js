const Module = require('../models/Module');
const Video = require('../models/Video');
const PDF = require('../models/PDF');

class ModuleRepository {
    async getModulesByCursId(cursId) {
        return await Module.findAll({
            where: { idCurs: cursId },
            include: [
                { model: Video, as: 'videos' },
                { model: PDF, as: 'pdfs' }
            ]
        });
    }

    async getModuleById(id) {
        return await Module.findByPk(id, {
            include: [
                { model: Video, as: 'videos' },
                { model: PDF, as: 'pdfs' }
            ]
        });
    }

    async createModule(data) {
        return await Module.create(data);
    }

    async updateModule(id, data) {
        const module = await Module.findByPk(id);
        if (module) {
            await module.update(data);
            return module;
        }
        return null;
    }

    async deleteModule(id) {
        const module = await Module.findByPk(id);
        if (module) {
            await module.destroy();
            return true;
        }
        return false;
    }
}

module.exports = ModuleRepository;
