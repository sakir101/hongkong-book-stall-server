"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowModelRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const cowModel_validation_1 = require("./cowModel.validation");
const cowModel_controller_1 = require("./cowModel.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(cowModel_validation_1.CowModelValidation.createCowModelZodSchema), cowModel_controller_1.CowModelController.createCowModel);
router.get('/:id', cowModel_controller_1.CowModelController.getSingleCowModel);
router.patch('/:id', (0, validateRequest_1.default)(cowModel_validation_1.CowModelValidation.updateCowModelZodSchema), cowModel_controller_1.CowModelController.updateCowModel);
router.delete('/:id', cowModel_controller_1.CowModelController.deleteCowModel);
router.get('/', cowModel_controller_1.CowModelController.getAllCowModels);
exports.CowModelRoutes = router;
