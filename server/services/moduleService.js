class ModuleService {
    constructor({ moduleRepository }) {
        this.moduleRepository = moduleRepository;
    }

    async getModulesByCursId(cursId) {
        return await this.moduleRepository.getModulesByCursId(cursId);
    }

    async getModuleById(id) {
        return await this.moduleRepository.getModuleById(id);
    }

    async createModule(data) {
        return await this.moduleRepository.createModule(data);
    }

    async updateModule(id, data) {
        return await this.moduleRepository.updateModule(id, data);
    }

    async deleteModule(id) {
        return await this.moduleRepository.deleteModule(id);
    }
}

module.exports = ModuleService;
