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
        while (_) try {
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
exports.__esModule = true;
exports.sendPostRequest = exports.sendGetRequest = exports.apiPostCurrentUser = exports.apiGetCurrentUser = exports.apiPostUsers = exports.apiGetUsers = void 0;
var API_URL = 'http://localhost:8000';
var HEADERS = {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
};
function apiGetUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var LOG_ID, res, result, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    LOG_ID = 'apiGetUsers()';
                    console.time(LOG_ID);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch(API_URL + "/users", {
                            headers: HEADERS,
                            method: 'GET',
                            mode: 'cors'
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    result = _a.sent();
                    // console.warn(`${LOG_ID} - success:`, result);
                    return [2 /*return*/, result];
                case 4:
                    error_1 = _a.sent();
                    console.error(LOG_ID + " -", error_1);
                    return [2 /*return*/, []];
                case 5:
                    console.timeEnd(LOG_ID);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.apiGetUsers = apiGetUsers;
function apiPostUsers(users) {
    return __awaiter(this, void 0, void 0, function () {
        var LOG_ID, res, result, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    LOG_ID = 'apiPostUsers()';
                    console.time(LOG_ID);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetch(API_URL + "/users", {
                            headers: HEADERS,
                            method: 'POST',
                            mode: 'cors',
                            body: JSON.stringify(users)
                        })];
                case 2:
                    res = _a.sent();
                    result = res.status < 400;
                    // console.warn(`${LOG_ID} - success:`, result);
                    return [2 /*return*/, result];
                case 3:
                    error_2 = _a.sent();
                    console.error(LOG_ID + " -", error_2);
                    return [2 /*return*/, false];
                case 4:
                    console.timeEnd(LOG_ID);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.apiPostUsers = apiPostUsers;
function apiGetCurrentUser() {
    return __awaiter(this, void 0, void 0, function () {
        var LOG_ID, res, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    LOG_ID = 'apiGetCurrentUser()';
                    console.time(LOG_ID);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch(API_URL + "/currentUser", {
                            headers: HEADERS,
                            method: 'GET',
                            mode: 'cors'
                        })];
                case 2:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    result = _a.sent();
                    console.warn(LOG_ID + " - success:", result);
                    return [2 /*return*/, result];
                case 4:
                    error_3 = _a.sent();
                    console.error(LOG_ID + " -", error_3);
                    return [2 /*return*/, {}];
                case 5:
                    console.timeEnd(LOG_ID);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.apiGetCurrentUser = apiGetCurrentUser;
function apiPostCurrentUser(user) {
    return __awaiter(this, void 0, void 0, function () {
        var LOG_ID, res, result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    LOG_ID = 'apiPostCurrentUser()';
                    console.time(LOG_ID);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetch(API_URL + "/currentUser", {
                            headers: HEADERS,
                            method: 'POST',
                            mode: 'cors',
                            body: JSON.stringify(user)
                        })];
                case 2:
                    res = _a.sent();
                    result = res.status < 400;
                    console.warn(LOG_ID + " - success:", result);
                    return [2 /*return*/, result];
                case 3:
                    error_4 = _a.sent();
                    console.error(LOG_ID + " -", error_4);
                    return [2 /*return*/, false];
                case 4:
                    console.timeEnd(LOG_ID);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.apiPostCurrentUser = apiPostCurrentUser;
exports.sendGetRequest = function (endpoint) { return __awaiter(void 0, void 0, void 0, function () {
    var fullUrl, headers, rawResponse, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fullUrl = endpoint.indexOf(API_URL) === -1 ? API_URL + endpoint : endpoint;
                headers = {
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(fullUrl, {
                        headers: headers,
                        method: 'GET',
                        mode: 'cors'
                    }).then(function (result) {
                        return result;
                    })];
            case 2:
                rawResponse = _a.sent();
                return [4 /*yield*/, rawResponse.json()];
            case 3: return [2 /*return*/, _a.sent()];
            case 4:
                e_1 = _a.sent();
                throw e_1;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.sendPostRequest = function (endpoint, data) { return __awaiter(void 0, void 0, void 0, function () {
    var fullUrl, headers, rawResponse, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fullUrl = endpoint.indexOf(API_URL) === -1 ? API_URL + endpoint : endpoint;
                headers = {
                    Accept: 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, fetch(fullUrl, {
                        body: JSON.stringify(data),
                        headers: headers,
                        method: 'POST',
                        mode: 'cors'
                    }).then(function (result) {
                        return result;
                    })];
            case 2:
                rawResponse = _a.sent();
                return [4 /*yield*/, rawResponse.json()];
            case 3: return [2 /*return*/, _a.sent()];
            case 4:
                e_2 = _a.sent();
                throw e_2;
            case 5: return [2 /*return*/];
        }
    });
}); };
