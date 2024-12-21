class UtilizatorService {
    constructor({ utilizatorRepository }) {
        this.utilizatorRepository = utilizatorRepository;
    }

    async getAllUtilizatori() {
        return await this.utilizatorRepository.getAllUtilizatori();
    }

    async getUtilizatorById(id) {
        return await this.utilizatorRepository.getUtilizatorById(id);
    }

    async createUtilizator(data) {
        const existingUtilizator = await this.utilizatorRepository.getUtilizatorByEmail(data.email);
        if (existingUtilizator) {
            throw new Error('Email-ul este deja înregistrat.');
        }
        return await this.utilizatorRepository.createUtilizator(data);
    }

    async updateUtilizator(id, data) {
        return await this.utilizatorRepository.updateUtilizator(id, data);
    }

    async deleteUtilizator(id) {
        return await this.utilizatorRepository.deleteUtilizator(id);
    }

    async getUtilizatorByEmail(email) {
        return await this.utilizatorRepository.getUtilizatorByEmail(email);
    }
    async softDeleteUtilizator(id) {
        return await this.utilizatorRepository.softDeleteUtilizator(id);
    }

    async restoreUtilizator(id) {
        return await this.utilizatorRepository.restoreUtilizator(id);
    }
}

module.exports = UtilizatorService;
