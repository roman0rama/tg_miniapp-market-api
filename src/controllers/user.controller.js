"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_js_1 = require("../database/db.js");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.createUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = req.body.userId;
                        return [4 /*yield*/, db_js_1.pool.query('INSERT INTO person (id, login, passwordhash, fullname) ' +
                                'VALUES ($1, NULL, NULL, NULL) RETURNING *', [userId])];
                    case 1:
                        user = _a.sent();
                        res.json(user);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        res.status(500).json({
                            message: "Error creating user",
                            error: err_1
                        });
                        console.log(err_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.checkValidUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, fullName, selectedUser, user, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        _a = req.body, userId = _a.userId, fullName = _a.fullName;
                        return [4 /*yield*/, db_js_1.pool.query('SELECT id FROM person WHERE id = $1', [userId])];
                    case 1:
                        selectedUser = _b.sent();
                        if (!(selectedUser.rowCount === 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, db_js_1.pool.query('INSERT INTO person (id, login, passwordhash, fullname) ' +
                                'VALUES ($1, NULL, NULL, $2) RETURNING *', [userId, fullName])];
                    case 2:
                        user = _b.sent();
                        res.json(user.rows[0].id);
                        return [3 /*break*/, 4];
                    case 3:
                        res.json(selectedUser.rows[0].id);
                        _b.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_2 = _b.sent();
                        res.status(500).json({
                            message: "Error validating user",
                            error: err_2
                        });
                        console.error(err_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.updateUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, login, password, fullname, user, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, login = _a.login, password = _a.password, fullname = _a.fullname;
                        return [4 /*yield*/, db_js_1.pool.query('UPDATE person set passwordhash = $1, fullname = $2 where login = $3 RETURNING *', [password, fullname, login])];
                    case 1:
                        user = _b.sent();
                        res.json(user.rows[0]);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _b.sent();
                        res.status(500).json({
                            message: "Error updating user item",
                            error: err_3
                        });
                        console.log(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.getOneUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, db_js_1.pool.query('SELECT * FROM person WHERE id = $1', [id])];
                    case 1:
                        user = _a.sent();
                        if (user.rows.length == 0) {
                            return [2 /*return*/, res.status(404).json({
                                    message: 'User not found.'
                                })];
                        }
                        res.json(user.rows[0]);
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        res.status(500).json({
                            message: "Error getting user data",
                            error: err_4
                        });
                        console.log(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.deleteUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.body.id;
                        return [4 /*yield*/, db_js_1.pool.query('DELETE FROM person WHERE id = $1', [id])];
                    case 1:
                        user = _a.sent();
                        res.json(user.rows[0]);
                        return [3 /*break*/, 3];
                    case 2:
                        err_5 = _a.sent();
                        res.status(500).json({
                            message: "Error deleting user item",
                            error: err_5
                        });
                        console.log(err_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.getUsers = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_js_1.pool.query('SELECT * FROM person')];
                    case 1:
                        users = _a.sent();
                        if (users.rows.length == 0) {
                            return [2 /*return*/, res.status(404).json({
                                    message: 'User list is empty. Try to add some items'
                                })];
                        }
                        res.json(users.rows);
                        return [3 /*break*/, 3];
                    case 2:
                        err_6 = _a.sent();
                        res.status(500).json({
                            message: "Error getting user list",
                            error: err_6
                        });
                        console.log(err_6);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserController.Auth = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, login, password, user, isValidPass, token, _b, passwordhash, userData, err_7;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = req.body, login = _a.login, password = _a.password;
                        return [4 /*yield*/, db_js_1.pool.query('SELECT * FROM person WHERE login = $1', [login])];
                    case 1:
                        user = _c.sent();
                        if (user.rows.length == 0) {
                            return [2 /*return*/, res.status(200).json({
                                    message: 'User not found.'
                                })];
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare("".concat(password), "".concat(user.rows[0].passwordhash))];
                    case 2:
                        isValidPass = _c.sent();
                        if (!isValidPass) {
                            return [2 /*return*/, res.status(400).json({
                                    message: 'Invalid login or password.'
                                })];
                        }
                        token = jsonwebtoken_1.default.sign({
                            _id: user.rows[0].id
                        }, "".concat(process.env.BCRYPT_SECRET_KEY), {
                            expiresIn: '30d'
                        });
                        _b = user.rows[0], passwordhash = _b.passwordhash, userData = __rest(_b, ["passwordhash"]);
                        res.json(__assign(__assign({}, userData), { bearer: token }));
                        return [3 /*break*/, 4];
                    case 3:
                        err_7 = _c.sent();
                        res.status(500).json({
                            message: "Auth error",
                            error: err_7
                        });
                        console.log(err_7);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = UserController;
