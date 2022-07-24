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
exports.destroyDiner = exports.updateDiner = exports.showOneDiner = exports.showAllDiners = exports.tokenRevalidate = exports.DinerLogin = exports.registerDiner = void 0;
const diner_model_1 = __importDefault(require("../models/diner.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../utils/jwt");
const validateFields_1 = require("../middlewares/validateFields");
const restaurant_model_1 = __importDefault(require("../models/restaurant.model"));
const registerDiner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newDiner = yield (0, validateFields_1.toNewDiner)(req.body);
        // Verificar que el email no exista
        const email = newDiner.email;
        const emailExists = yield diner_model_1.default.findOne({ email });
        if (emailExists) {
            throw new Error('the email already exists');
        }
        // Encrypta la contraseña
        const encryptPassword = yield bcrypt_1.default.hash(newDiner.password, 8);
        const diner = yield diner_model_1.default.create(Object.assign(Object.assign({}, newDiner), { password: encryptPassword }));
        // Generar el JWT
        const token = yield (0, jwt_1.JWTgenerator)(diner.id);
        res.status(200).json({
            ok: true,
            message: 'Diner created',
            data: diner,
            token: token
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Diner coult not be created',
            data: error.message
        });
    }
});
exports.registerDiner = registerDiner;
const DinerLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verificar si existe el correo
        const dinerFromDB = yield diner_model_1.default.findOne({ email });
        if (!dinerFromDB) {
            throw new Error('the email does not exist');
        }
        // Validar el password
        const validPassword = bcrypt_1.default.compareSync(password, dinerFromDB.password);
        if (!validPassword) {
            throw new Error('the password is incorrect');
        }
        // Generar el JWT
        const token = yield (0, jwt_1.JWTgenerator)(dinerFromDB.id);
        res.status(200).json({
            ok: true,
            message: 'Diner logged',
            data: dinerFromDB,
            token: token
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'User or password incorrect',
            data: error.message
        });
    }
});
exports.DinerLogin = DinerLogin;
const tokenRevalidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req;
    try {
        const dinerFromDB = yield diner_model_1.default.findById(uid).select('-password -createdAt -updatedAt');
        if (!dinerFromDB) {
            throw new Error('the diner does not exist');
        }
        // Generar el JWT
        const token = yield (0, jwt_1.JWTgenerator)(dinerFromDB.id);
        res.json({
            ok: true,
            message: 'token revalidated',
            token,
            data: dinerFromDB
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Incorrect Sesion',
            data: error.message
        });
    }
});
exports.tokenRevalidate = tokenRevalidate;
const showAllDiners = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req;
    try {
        const restaurant = yield restaurant_model_1.default.findById(uid);
        if (!restaurant) {
            throw new Error('you can not see orders because you are not a diner or a restaurant');
        }
        const diner = yield diner_model_1.default.find();
        res.status(200).json({
            ok: true,
            message: 'Diner found',
            data: diner
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Diner coult not be found',
            data: error.message
        });
    }
});
exports.showAllDiners = showAllDiners;
const showOneDiner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { uid } = req;
    try {
        const diner = yield diner_model_1.default.findById(id);
        const restaurant = yield restaurant_model_1.default.findById(uid);
        if (!diner && !restaurant) {
            throw new Error('you can not see orders because you are not a diner or a restaurant');
        }
        res.status(200).json({
            ok: true,
            message: 'Diner found',
            data: diner
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Diner coult not be found',
            data: error.message
        });
    }
});
exports.showOneDiner = showOneDiner;
const updateDiner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { uid } = req;
    try {
        const newDiner = yield (0, validateFields_1.toUpdateDiner)(req.body);
        const diner = yield diner_model_1.default.findById(id);
        if (!diner || diner.id !== uid) {
            throw new Error('the diner does not exist');
        }
        const dinerUpdated = yield diner_model_1.default.findByIdAndUpdate(id, newDiner, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        if (!dinerUpdated) {
            throw new Error('the diner could not be updated');
        }
        res.status(200).json({
            ok: true,
            message: 'Diner updated',
            data: dinerUpdated
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Diner coult not be updated',
            data: error.message
        });
    }
});
exports.updateDiner = updateDiner;
const destroyDiner = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { uid } = req;
    try {
        const diner = yield diner_model_1.default.findById(id);
        if (!diner || diner.id !== uid) {
            throw new Error('the diner does not exist');
        }
        const dinerDeleted = yield diner_model_1.default.findByIdAndDelete(id);
        if (!dinerDeleted) {
            throw new Error('the diner could not be deleted');
        }
        // TODO: Eliminar orden en cascada
        res.status(200).json({
            ok: true,
            message: 'Diner deleted',
            data: dinerDeleted
        });
    }
    catch (error) {
        res.status(404).json({
            ok: false,
            message: 'Diner coult not be deleted',
            data: error.message
        });
    }
});
exports.destroyDiner = destroyDiner;
