const Utilizator = require('../models/Utilizator');
const { Op } = require('sequelize');

class UtilizatorRepository {
    async getAllUtilizatori() {
        return await Utilizator.findAll({
            where: { isDeleted: false }
        });
    }


    async getAllUtilizatoriIncludingDeleted() {
        return await Utilizator.findAll(); 
    }

    async getUtilizatorById(id) {
        return await Utilizator.findOne({ where: { idUtilizator: id, isDeleted: false } });
    }

    async createUtilizator(data) {
        return await Utilizator.create(data);
    }

    async updateUtilizator(id, data) {
        const utilizator = await Utilizator.findOne({ where: { idUtilizator: id, isDeleted: false } });
        if (utilizator) {
            await utilizator.update(data);
            return utilizator;
        }
        return null;
    }

    async deleteUtilizator(id) {
        const utilizator = await Utilizator.findOne({ where: { idUtilizator: id, isDeleted: false } });
        if (utilizator) {
            await utilizator.update({ isDeleted: true });
            return true;
        }
        return false;
    }

    async getUtilizatorByEmail(email) {
        return await Utilizator.findOne({ where: { email, isDeleted: false } });
    }
    async softDeleteUtilizator(id) {
        const utilizator = await Utilizator.findOne({ where: { idUtilizator: id } });
        if (utilizator && !utilizator.isDeleted) {
            await utilizator.update({ isDeleted: true });
            return utilizator;
        }
        return null;
    }

    async restoreUtilizator(id) {
        const utilizator = await Utilizator.findOne({ where: { idUtilizator: id } });
        if (utilizator && utilizator.isDeleted) {
            await utilizator.update({ isDeleted: false });
            return utilizator;
        }
        return null;
    }
}

module.exports = UtilizatorRepository;
