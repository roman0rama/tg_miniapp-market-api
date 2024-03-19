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
Object.defineProperty(exports, "__esModule", { value: true });
var db_js_1 = require("../database/db.js");
var CategoryController = /** @class */ (function () {
    function CategoryController() {
    }
    CategoryController.createCategory = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, image, title, result, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, image = _a.image, title = _a.title;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, db_js_1.pool.query('INSERT INTO categories (image, title) VALUES ($1, $2) RETURNING *', [image, title])];
                    case 2:
                        result = _b.sent();
                        res.json(result.rows[0]);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        res.status(500).json({
                            message: "Error adding category",
                            error: err_1
                        });
                        console.error(err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.deleteCategory = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var review, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_js_1.pool.query('DELETE FROM categories WHERE id = $1', [req.params.id] // изменено на req.params.id для получения id из URL
                            )];
                    case 1:
                        review = _a.sent();
                        res.json(review.rows[0]);
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        res.status(500).json({
                            message: "Error deleting review",
                            error: err_2
                        });
                        console.log(err_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.updateCategory = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var review, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_js_1.pool.query('UPDATE categories SET title = $1 WHERE id = $2', [req.body.title, req.body.id])];
                    case 1:
                        review = _a.sent();
                        res.json(review.rows[0]);
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        res.status(500).json({
                            message: "Error deleting review",
                            error: err_3
                        });
                        console.log(err_3);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var reviews, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, db_js_1.pool.query('SELECT * FROM categories')];
                    case 1:
                        reviews = _a.sent();
                        if (reviews.rows.length == 0) {
                            return [2 /*return*/, res.status(404).json({
                                    message: 'Category list is empty. Try to add some items'
                                })];
                        }
                        res.json(reviews.rows);
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        res.status(500).json({
                            message: "Error getting category list",
                            error: err_4
                        });
                        console.log(err_4);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return CategoryController;
}());
exports.default = CategoryController;
