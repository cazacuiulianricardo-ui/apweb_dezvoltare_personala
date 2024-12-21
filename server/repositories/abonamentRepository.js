const Abonament = require('../models/Abonament');
const { Op } = require('sequelize');

class AbonamentRepository {
    async getAllAbonamente() {
        return await Abonament.findAll();
    }

    async getAbonamentById(id) {
        return await Abonament.findByPk(id);
    }

    async createAbonament(data) {
        return await Abonament.create(data);
    }

    async updateAbonament(id, data) {
        const abonament = await Abonament.findByPk(id);
        if (abonament) {
            await abonament.update(data);
            return abonament;
        }
        return null;
    }

    async deleteAbonament(id) {
        const abonament = await Abonament.findByPk(id);
        if (abonament) {
            await abonament.destroy();
            return true;
        }
        return false;
    }

    async subscribeUtilizator(idUtilizator, data) {
        return await Abonament.create({ ...data, idUtilizator });
    }

    async getAbonamentActiv(idUtilizator) {
        return await Abonament.findOne({
            where: {
                idUtilizator,
                dataInceperii: { [Op.lte]: new Date() },
                dataExpirarii: { [Op.gte]: new Date() },
            }
        });
    }

    async upgradeAbonament(idUtilizator, tipNou) {
        const abonament = await Abonament.findOne({
            where: {
                idUtilizator,
                dataExpirarii: { [Op.gte]: new Date() },
            }
        });

        if (!abonament) return null;

        if (tipNou === 'Premium' && abonament.tip === 'Standard') {
            abonament.tip = 'Premium';
            abonament.pret = 100; 
            
        } else if (tipNou === 'Anual') {
            abonament.tip = 'Anual';
            abonament.pret = 500; 
            abonament.dataExpirarii = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        } else {
            throw new Error('Tip de upgrade invalid.');
        }

        await abonament.save();
        return abonament;
    }
    async switchAbonament(idUtilizator, tipNou) {
   
    }
}

module.exports = AbonamentRepository;
