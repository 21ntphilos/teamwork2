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
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const UserModel_1 = require("../model/UserModel");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({
                Error: "Kindly signin as a user"
            });
        }
        const token = authorization.slice(7, authorization.length);
        let verified = jsonwebtoken_1.default.verify(token, config_1.APP_SECRET);
        if (!verified) {
            return res.status(401).json({
                Error: "unauthorised"
            });
        }
        const { id } = verified;
        //find user by id
        const user = (yield UserModel_1.UserInstance.findOne({
            where: { id: id },
        }));
        if (!user) {
            return res.status(401).json({
                Error: "Invalid Credentials or User not found"
            });
        }
        req.user = verified;
        next();
    }
    catch (err) {
        return res.status(401).json({
            Error: "Unauthorized"
        });
    }
});
exports.auth = auth;
