class CursService {
    constructor({ cursRepository }) {
        this.cursRepository = cursRepository;
    }

    async getAllCursuri() {
        return await this.cursRepository.getAllCursuri();
    }

    async getCursById(id) {
        return await this.cursRepository.getCursById(id);
    }

    async createCurs(data) {

        if (new Date(data.dataIncepere) >= new Date(data.dataFinalizare)) {
            throw new Error('Data de începere trebuie să fie înainte de data de finalizare.');
        }

        return await this.cursRepository.createCurs(data);
    }

    async updateCurs(id, data) {
        return await this.cursRepository.updateCurs(id, data);
    }

    async deleteCurs(id) {
        return await this.cursRepository.deleteCurs(id);
    }

    async getCursuriByInstructorId(instructorId) {
        return await this.cursRepository.getCursuriByInstructorId(instructorId);
    }

    async getCursuriByNivel(niveluri) {
        return await this.cursRepository.getCursuriByNivel(niveluri);
    }
}

module.exports = CursService;
