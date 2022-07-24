"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroyCategory = exports.updateCategory = exports.showOneCategory = exports.showAllCategory = exports.createCategory = void 0;
const validateFields_1 = require("../middlewares/validateFields");
const category_model_1 = __importDefault(require("../models/category.model"));
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const diner_model_1 = __importDefault(require("../models/diner.model"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, image } = req.body;
        const newCategory = yield (0, validateFields_1.toNewCategory)({ name, description, image });
        const category = yield category_model_1.default.create(newCategory);
        res.status(200).json({
            ok: true,
            message: 'Category created',
            data: category
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Category coult not be create',
            data: error.message
        });
    }
});
exports.createCategory = createCategory;
const showAllCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req;
        const restaurant = yield restaurant_model_1.default.findById(uid);
        const dinerFromDB = yield diner_model_1.default.findById(uid);
        if (!dinerFromDB && !restaurant) {
            throw new Error('access denied');
        }
        const categories = yield category_model_1.default.find().select('-createdAt -updatedAt');
        res.status(200).json({
            ok: true,
            message: 'Categories found',
            data: categories
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Categories coult not be found',
            data: error.message
        });
    }
});
exports.showAllCategory = showAllCategory;
const showOneCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req;
        const { id } = req.params;
        // TODO: Validar si el token proviene de un usuario autorizado
        const restaurant = yield restaurant_model_1.default.findById(uid);
        if (!restaurant) {
            throw new Error('the restaurant does not exist here');
        }
        const category = yield category_model_1.default.findById(id);
        res.status(200).json({
            ok: true,
            message: 'Category found',
            data: category
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Category coult not be found',
            data: error.message
        });
    }
});
exports.showOneCategory = showOneCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req;
        const { id } = req.params;
        const { body } = req;
        const category = yield category_model_1.default.findById(id);
        if (!category) {
            throw new Error('the category does not exist here');
        }
        const restaurant = yield restaurant_model_1.default.findById(uid);
        if (!restaurant) {
            throw new Error('the restaurant does not exist here');
        }
        const newCategory = yield (0, validateFields_1.toNewCategory)(body);
        const updatedCategory = yield category_model_1.default.findByIdAndUpdate(id, newCategory, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        res.status(200).json({
            ok: true,
            message: 'Category updated',
            data: updatedCategory
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Category coult not be updated',
            data: error.message
        });
    }
});
exports.updateCategory = updateCategory;
const destroyCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req;
        const { id } = req.params;
        const restaurant = yield restaurant_model_1.default.findById(uid);
        if (!restaurant) {
            throw new Error('the restaurant does not exist here');
        }
        const category = yield category_model_1.default.findById(id);
        if (!category) {
            throw new Error('the category does not exist here');
        }
        yield category_model_1.default.findByIdAndDelete(category.id);
        res.status(200).json({
            ok: true,
            message: 'Category deleted',
            data: category
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Category coult not be deleted',
            data: error.message
        });
    }
});
exports.destroyCategory = destroyCategory;
