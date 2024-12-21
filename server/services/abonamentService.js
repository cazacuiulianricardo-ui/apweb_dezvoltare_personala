const ierarhieAbonamente = ['Standard', 'Premium', 'Anual'];
class AbonamentService {
    constructor({ abonamentRepository }) {
        this.abonamentRepository = abonamentRepository;
    }

    async getAllAbonamente() {
        return await this.abonamentRepository.getAllAbonamente();
    }

    async getAbonamentById(id) {
        return await this.abonamentRepository.getAbonamentById(id);
    }

    async createAbonament(data) {
        const validTypes = ['Standard', 'Premium', 'Anual'];
        if (!validTypes.includes(data.tip)) {
            throw new Error('Tip de abonament invalid.');
        }

        const dataInceperii = data.dataInceperii || new Date();
        let dataExpirarii;
        if (data.tip === 'Anual') {
            dataExpirarii = new Date(dataInceperii);
            dataExpirarii.setFullYear(dataExpirarii.getFullYear() + 1);
        } else {
            dataExpirarii = new Date(dataInceperii);
            dataExpirarii.setMonth(dataExpirarii.getMonth() + 1);
        }

        return await this.abonamentRepository.createAbonament({
            ...data,
            dataInceperii,
            dataExpirarii,
        });
    }

    async updateAbonament(id, data) {
        return await this.abonamentRepository.updateAbonament(id, data);
    }

    async deleteAbonament(id) {
        return await this.abonamentRepository.deleteAbonament(id);
    }

    async subscribe(idUtilizator, data) {
  
        const abonamentActiv = await this.abonamentRepository.getAbonamentActiv(idUtilizator);
        if (abonamentActiv) {
            throw new Error('Ai deja un abonament activ.');
        }

        const validTypes = ['Standard', 'Premium', 'Anual'];
        if (!validTypes.includes(data.tip)) {
            throw new Error('Tip de abonament invalid.');
        }

        const dataInceperii = new Date();
        let dataExpirarii;
        if (data.tip === 'Anual') {
            dataExpirarii = new Date(dataInceperii);
            dataExpirarii.setFullYear(dataExpirarii.getFullYear() + 1);
        } else {
            dataExpirarii = new Date(dataInceperii);
            dataExpirarii.setMonth(dataExpirarii.getMonth() + 1);
        }

        return await this.abonamentRepository.subscribeUtilizator(idUtilizator, {
            ...data,
            dataInceperii,
            dataExpirarii,
        });
    }

    async getAbonamentActiv(idUtilizator) {
        return await this.abonamentRepository.getAbonamentActiv(idUtilizator);
    }

    async upgradeAbonament(idUtilizator, tipNou) {

        const validTypes = ['Premium', 'Anual'];
        if (!validTypes.includes(tipNou)) {
            throw new Error('Tip de upgrade invalid.');
        }

        return await this.abonamentRepository.upgradeAbonament(idUtilizator, tipNou);
    }
    async switchAbonament(idUtilizator, tipNou) {
        const validTypes = ['Standard', 'Premium', 'Anual'];
        if (!validTypes.includes(tipNou)) {
            throw new Error('Tip de abonament invalid.');
        }

        const abonament = await this.abonamentRepository.getAbonamentActiv(idUtilizator);
        if (!abonament) {
            throw new Error('Nu ai niciun abonament activ.');
        }

        const currentIndex = ierarhieAbonamente.indexOf(abonament.tip);
        const newIndex = ierarhieAbonamente.indexOf(tipNou);

        if (newIndex === -1) {
            throw new Error('Tip de abonament invalid.');
        }

        if (newIndex === currentIndex) {
            throw new Error('Abonamentul selectat este același cu cel curent.');
        }

        abonament.tip = tipNou;
        abonament.pret = this.getPretAbonament(tipNou);
        

        if (tipNou === 'Anual') {
            abonament.dataExpirarii = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        } else {
            abonament.dataExpirarii = new Date();
            abonament.dataExpirarii.setMonth(abonament.dataExpirarii.getMonth() + 1);
        }

        await abonament.save();
        return abonament;
    }

    getPretAbonament(tip) {
        const preturi = {
            'Standard': 50,
            'Premium': 100,
            'Anual': 500
        };
        return preturi[tip] || 50;
    }
}

module.exports = AbonamentService;
