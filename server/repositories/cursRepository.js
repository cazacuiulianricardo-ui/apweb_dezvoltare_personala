const Curs = require('../models/Curs');

class CursRepository {
    async getAllCursuri() {
        return await Curs.findAll({ include: ['instructor'] });
    }

    async getCursById(id) {
        return await Curs.findByPk(id, { include: ['instructor'] });
    }

    async createCurs(data) {
        return await Curs.create(data);
    }

    async updateCurs(id, data) {
        const curs = await Curs.findByPk(id);
        if (curs) {
            await curs.update(data);
            return curs;
        }
        return null;
    }

    async deleteCurs(id) {
        const curs = await Curs.findByPk(id);
        if (curs) {
            await curs.destroy();
            return true;
        }
        return false;
    }

    async getCursuriByInstructorId(instructorId) {
        return await Curs.findAll({
            where: { idInstructor: instructorId },
            include: ['instructor']
        });
    }

    async getCursuriByNivel(niveluri) {
        return await Curs.findAll({
            where: { nivelDificultate: niveluri },
            include: ['instructor']
        });
    }
}

module.exports = CursRepository;
