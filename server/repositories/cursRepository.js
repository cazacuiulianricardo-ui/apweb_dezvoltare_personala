const Curs = require('../models/Curs');
const Module = require('../models/Module');
const Video = require('../models/Video');
const PDF = require('../models/PDF');

class CursRepository {
    async getAllCursuri() {
        return await Curs.findAll({
            include: [
                {
                    model: Module,
                    as: 'modules',
                    include: [
                        { model: Video, as: 'videos' },
                        { model: PDF, as: 'pdfs' }
                    ]
                },
                {
                    model: require('../models/Utilizator'),
                    as: 'instructor'
                }
            ]
        });
    }

    async getCursById(id) {
        return await Curs.findByPk(id, {
            include: [
                {
                    model: Module,
                    as: 'modules',
                    include: [
                        { model: Video, as: 'videos' },
                        { model: PDF, as: 'pdfs' }
                    ]
                },
                {
                    model: require('../models/Utilizator'),
                    as: 'instructor'
                }
            ]
        });
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
            include: [
                {
                    model: Module,
                    as: 'modules',
                    include: [
                        { model: Video, as: 'videos' },
                        { model: PDF, as: 'pdfs' }
                    ]
                },
                {
                    model: require('../models/Utilizator'),
                    as: 'instructor'
                }
            ]
        });
    }

    async getCursuriByNivel(niveluri) {
        return await Curs.findAll({
            where: { nivelDificultate: niveluri },
            include: [
                {
                    model: Module,
                    as: 'modules',
                    include: [
                        { model: Video, as: 'videos' },
                        { model: PDF, as: 'pdfs' }
                    ]
                },
                {
                    model: require('../models/Utilizator'),
                    as: 'instructor'
                }
            ]
        });
    }
}

module.exports = CursRepository;