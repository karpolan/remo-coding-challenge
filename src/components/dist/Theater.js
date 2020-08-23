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
var react_1 = require("react");
require("./Theater.scss");
var conference_map_svg_1 = require("../assets/conference-map.svg");
var tableConfig_json_1 = require("./tableConfig.json");
var Table_1 = require("./Table");
var firebase_1 = require("../services/firebase");
var react_router_dom_1 = require("react-router-dom");
var mockData_1 = require("../utils/mockData");
var arrange_1 = require("../utils/arrange");
var defaultUser = {
    id: 'id_unknown',
    name: 'Guess who?'
};
var defaultTable = {
    id: 'id_unknown'
};
var TABLES = tableConfig_json_1["default"].tables || []; // Todo: move to fetch
var USERS = mockData_1["default"].users || []; // Todo: move to fetch
var TABLES_WITH_USERS = arrange_1.placeUserToTables(USERS, TABLES) || [];
var Theater = function () {
    var history = react_router_dom_1.useHistory();
    var _a = react_1.useState(defaultUser), user = _a[0], setUser = _a[1]; // Current user
    var _b = react_1.useState(defaultTable), table = _b[0], setTable = _b[1]; // Table where Current user is sit
    var tables = TABLES_WITH_USERS;
    react_1.useEffect(function () {
        firebase_1["default"].auth().onAuthStateChanged(function (currentUser) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!currentUser) return [3 /*break*/, 2];
                        _a = setUser;
                        _b = {
                            id: currentUser.uid,
                            uid: currentUser.uid
                        };
                        return [4 /*yield*/, currentUser.getIdToken()];
                    case 1:
                        _a.apply(void 0, [(_b.idToken = _c.sent(),
                                _b.email = String(currentUser.email),
                                _b.name = String(currentUser.displayName),
                                _b.avatar = String(currentUser.photoURL),
                                _b.currentUser = true,
                                _b)]);
                        return [3 /*break*/, 3];
                    case 2:
                        setUser(defaultUser);
                        _c.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    }, []);
    var handleLogout = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, firebase_1["default"].auth().signOut()];
                case 1:
                    _a.sent();
                    history.push('/');
                    return [2 /*return*/];
            }
        });
    }); };
    function tableDoubleClick(tableId) {
        var newTable = arrange_1.findTableById(tables, tableId);
        if (newTable === table) {
            console.log("Current user is already sitting on \"" + tableId + "\" table");
            return;
        }
        // Try to add Current User to new table
        var newSeatIndex = arrange_1.addUserToTable(newTable, user);
        if (newSeatIndex < 0) {
            // No free seats on that table
            alert("No free seats on \"" + tableId + "\" table!");
            return;
        }
        // Current User added successfully
        if (table) {
            // Remove Current User from old table
            arrange_1.removeUserFromTable(table, user);
        }
        setTable(newTable);
    }
    return (react_1["default"].createElement("div", { className: "remo-theater", style: { width: tableConfig_json_1["default"].width, height: tableConfig_json_1["default"].height } },
        react_1["default"].createElement("div", { className: "rt-app-bar" },
            react_1["default"].createElement("div", { className: 'user' },
                user.avatar ? react_1["default"].createElement("div", { className: 'avatar' },
                    react_1["default"].createElement("img", { src: user.avatar, title: user.name, alt: user.name })) : null,
                react_1["default"].createElement("h5", null, user.name),
                Boolean(user.email) && react_1["default"].createElement("h6", null, user.email),
                react_1["default"].createElement("button", { onClick: handleLogout }, "Logout"))),
        react_1["default"].createElement("div", { className: "rt-rooms" }, tables.map(function (table) { return react_1["default"].createElement(Table_1["default"], __assign({ key: table.id }, table, { onDoubleClick: function () { return tableDoubleClick(table.id); } })); })),
        react_1["default"].createElement("div", { className: "rt-background" },
            react_1["default"].createElement("img", { src: conference_map_svg_1["default"], alt: "Conference background" }))));
};
exports["default"] = Theater;
