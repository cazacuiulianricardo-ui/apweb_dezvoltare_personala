const PDF = require('../models/PDF');

class PDFRepository {
    async getPDFsByModuleId(moduleId) {
        return await PDF.findAll({ where: { idModule: moduleId } });
    }

    async createPDF(data) {
        return await PDF.create(data);
    }

    async updatePDF(id, data) {
        const pdf = await PDF.findByPk(id);
        if (pdf) {
            await pdf.update(data);
            return pdf;
        }
        return null;
    }

    async deletePDF(id) {
        const pdf = await PDF.findByPk(id);
        if (pdf) {
            await pdf.destroy();
            return true;
        }
        return false;
    }
}

module.exports = PDFRepository;
