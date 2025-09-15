const ierarhieAbonamente = ['Standard', 'Premium', 'Anual'];

class AbonamentService {
    constructor({ abonamentRepository, cacheService }) {
        this.abonamentRepository = abonamentRepository;
        this.cacheService = cacheService;
    }

    async getAllAbonamente() {
        return await this.abonamentRepository.getAllAbonamente();
    }

    async getAbonamentById(id) {
        const cacheKey = `abonament_${id}`;

        if (this.cacheService.isSet(cacheKey)) {
            return this.cacheService.get(cacheKey);
        }

        const abonament = await this.abonamentRepository.getAbonamentById(id);

        if (abonament) {
            this.cacheService.set(cacheKey, abonament, 300000);
        }

        return abonament;
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
        const updatedAb = await this.abonamentRepository.updateAbonament(id, data);
        if (updatedAb) {
            const cacheKey = `abonament_${id}`;
            console.log(`[CACHE INVALIDATION] Sterg ${cacheKey} din cache, pentru ca s-a modificat.`);
            this.cacheService.remove(cacheKey);
        }

        return updatedAb;
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

        const newAb = await this.abonamentRepository.subscribeUtilizator(idUtilizator, {
            ...data,
            dataInceperii,
            dataExpirarii,
        });

        if (newAb && newAb.idAbonament) {
            const cacheKey = `abonament_${newAb.idAbonament}`;
            console.log(`[CACHE SET] subscribe: adaug ${cacheKey} in cache (abonament nou).`);
            this.cacheService.set(cacheKey, newAb, 300000);
        }

        return newAb;
    }

    async getAbonamentActiv(idUtilizator) {
        const cacheKey = `abonament_activ_${idUtilizator}`;

        if (this.cacheService.isSet(cacheKey)) {
            console.log(`[CACHE HIT] getAbonamentActiv: ${cacheKey}`);
            return this.cacheService.get(cacheKey);
        }
        console.log(`[CACHE MISS] getAbonamentActiv: ${cacheKey} - interoghez DB`);
        const abonament = await this.abonamentRepository.getAbonamentActiv(idUtilizator);

        if (abonament) {
            this.cacheService.set(cacheKey, abonament, 300000);
        }

        return abonament;
    }

    async upgradeAbonament(idUtilizator, tipNou) {

        const validTypes = ['Premium', 'Anual'];
        if (!validTypes.includes(tipNou)) {
            throw new Error('Tip de upgrade invalid.');
        }

        const upgraded = await this.abonamentRepository.upgradeAbonament(idUtilizator, tipNou);

        if (upgraded) {
            const cacheKeyAbonament = `abonament_${upgraded.idAbonament}`;
            console.log(`[CACHE INVALIDATION] upgradeAbonament: Sterg ${cacheKeyAbonament} din cache, s-a modificat.`);
            this.cacheService.remove(cacheKeyAbonament);

            const cacheKeyAbonamentActiv = `abonament_activ_${idUtilizator}`;
            console.log(`[CACHE INVALIDATION] upgradeAbonament: Sterg ${cacheKeyAbonamentActiv} din cache, s-a modificat tipul abonamentului.`);
            this.cacheService.remove(cacheKeyAbonamentActiv);
        }

        return upgraded;
    }

    async switchAbonament(idUtilizator, tipNou) {
        // Valideaza tipul nou de abonament
        const validTypes = ['Standard', 'Premium', 'Anual'];
        if (!validTypes.includes(tipNou)) {
            throw new Error('Tip de abonament invalid.');
        }

        // Obtine abonamentul activ al utilizatorului
        const abonament = await this.abonamentRepository.getAbonamentActiv(idUtilizator);
        if (!abonament) {
            throw new Error('Nu ai niciun abonament activ.');
        }

        // Verifica daca abonamentul selectat este diferit de cel curent
        const currentIndex = ierarhieAbonamente.indexOf(abonament.tip);
        const newIndex = ierarhieAbonamente.indexOf(tipNou);

        if (newIndex === currentIndex) {
            throw new Error('Abonamentul selectat este acelasi cu cel curent.');
        }

        // Actualizeaza tipul si pretul abonamentului
        abonament.tip = tipNou;
        abonament.pret = this.getPretAbonament(tipNou);

        // Calculeaza noua data de expirare
        if (tipNou === 'Anual') {
            abonament.dataExpirarii = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
        } else {
            abonament.dataExpirarii = new Date();
            abonament.dataExpirarii.setMonth(abonament.dataExpirarii.getMonth() + 1);
        }

        // Salveaza modificarile
        await abonament.save();

        // Elimina abonamentul din cache
        const cacheKeyAbonament = `abonament_${abonament.idAbonament}`;
        console.log(`[CACHE INVALIDATION] switchAbonament: Sterg ${cacheKeyAbonament} din cache, s-a modificat tipul abonamentului.`);
        this.cacheService.remove(cacheKeyAbonament);

        const cacheKeyAbonamentActiv = `abonament_activ_${idUtilizator}`;
        console.log(`[CACHE INVALIDATION] switchAbonament: Sterg ${cacheKeyAbonamentActiv} din cache, s-a modificat tipul abonamentului.`);
        this.cacheService.remove(cacheKeyAbonamentActiv);

        return abonament;
    }

    getPretAbonament(tip) {
        // Returneaza pretul in functie de tipul abonamentului
        const preturi = {
            'Standard': 50,
            'Premium': 100,
            'Anual': 500
        };
        return preturi[tip] || 50;
    }
}

module.exports = AbonamentService;
