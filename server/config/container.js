const { createContainer, asClass, asValue} = require('awilix');
const CursController = require('../controllers/cursController');
const CursService = require('../services/cursService');
const CursRepository = require('../repositories/cursRepository');
const UtilizatorController = require('../controllers/utilizatorController');
const UtilizatorService = require('../services/utilizatorService');
const UtilizatorRepository = require('../repositories/utilizatorRepository');
const AbonamentController = require('../controllers/abonamentController');
const AbonamentService = require('../services/abonamentService');
const AbonamentRepository = require('../repositories/abonamentRepository');
const TestService = require('../services/testService');
const TestController = require('../controllers/testController');
const ModuleController = require('../controllers/moduleController');
const ModuleService = require('../services/moduleService');
const ModuleRepository = require('../repositories/moduleRepository');
const VideoRepository = require('../repositories/videoRepository');
const VideoService = require('../services/videoService');
const PDFRepository = require('../repositories/pdfRepository');
const PDFService = require('../services/pdfService');
const ResourceController = require('../controllers/resourceController');
const CacheService = require('../services/cacheService');

const container = createContainer();

container.register({
    cursController: asClass(CursController).scoped(),
    utilizatorController: asClass(UtilizatorController).scoped(),
    abonamentController: asClass(AbonamentController).scoped(),
    testController: asClass(TestController).scoped(),

    cursService: asClass(CursService).scoped(),
    utilizatorService: asClass(UtilizatorService).scoped(),
    abonamentService: asClass(AbonamentService).scoped(),
    moduleService: asClass(ModuleService).scoped(),
    videoService: asClass(VideoService).scoped(),
    pdfService: asClass(PDFService).scoped(),

    cursRepository: asClass(CursRepository).singleton(),
    utilizatorRepository: asClass(UtilizatorRepository).singleton(),
    abonamentRepository: asClass(AbonamentRepository).singleton(),
    moduleRepository: asClass(ModuleRepository).singleton(),
    videoRepository: asClass(VideoRepository).singleton(),
    pdfRepository: asClass(PDFRepository).singleton(),

    testServiceSingleton: asClass(TestService).singleton(),
    testServiceScoped: asClass(TestService).scoped(),
    testServiceTransient: asClass(TestService).transient(),

    moduleController: asClass(ModuleController).scoped(),
    resourceController: asClass(ResourceController).scoped(),
    cacheService: asValue(CacheService),
});

module.exports = container;
