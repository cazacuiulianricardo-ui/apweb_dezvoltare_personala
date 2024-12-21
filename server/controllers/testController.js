class TestController {
    constructor({ testServiceSingleton, testServiceScoped, testServiceTransient }) {
        this.testServiceSingleton = testServiceSingleton;
        this.testServiceScoped = testServiceScoped;
        this.testServiceTransient = testServiceTransient;
    }

    testDurate(req, res) {
        res.json({
            singleton: this.testServiceSingleton.getCreationTime(),
            scoped: this.testServiceScoped.getCreationTime(),
            transient: this.testServiceTransient.getCreationTime(),
        });
    }
}

module.exports = TestController;
