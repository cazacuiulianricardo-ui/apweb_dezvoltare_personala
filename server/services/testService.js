class TestService {
    constructor() {
        this.createdAt = new Date();
        console.log(`TestService [${this.constructor.name}] Transient instance created at ${this.createdAt}`);
    }

    getCreationTime() {
        return this.createdAt;
    }
}

module.exports = TestService;
