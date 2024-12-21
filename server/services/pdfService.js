class PDFService {
    constructor({ pdfRepository }) {
        this.pdfRepository = pdfRepository;
    }

    async getPDFsByModuleId(moduleId) {
        return await this.pdfRepository.getPDFsByModuleId(moduleId);
    }

    async createPDF(data) {
        return await this.pdfRepository.createPDF(data);
    }

    async updatePDF(id, data) {
        return await this.pdfRepository.updatePDF(id, data);
    }

    async deletePDF(id) {
        return await this.pdfRepository.deletePDF(id);
    }
}

module.exports = PDFService;
