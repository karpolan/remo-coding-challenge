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
var tableConfig_json_1 = require("./tableConfig.json");
require("./Theater.scss");
var conference_map_svg_1 = require("../assets/conference-map.svg");
var Table_1 = require("./Table");
var firebase_1 = require("../services/firebase");
var react_router_dom_1 = require("react-router-dom");
var arrange_1 = require("../utils/arrange");
var apis_1 = require("../apis");
var Theater = function () {
    var history = react_router_dom_1.useHistory();
    var _a = react_1.useState(arrange_1.defaultUser), user = _a[0], setUser = _a[1]; // Current user
    // const [table, setTable] = useState<ITable>(defaultTable)  // Table where Current user is sit
    //  const [tables, setTables] = useState<ITable[]>([])  // All Tables where sitting user
    var _b = react_1.useState([]), users = _b[0], setUsers = _b[1]; // All users
    react_1.useEffect(function () {
        fetchData();
    }, []);
    react_1.useEffect(function () {
        if (!user || (user === null || user === void 0 ? void 0 : user.id) === arrange_1.defaultUser.id)
            return;
        apis_1.apiPostCurrentUser(user);
    }, [user]);
    function moveUserToTable(tableId) {
        setUser(__assign(__assign({}, user), { tableId: tableId }));
    }
    function fetchData() {
        return __awaiter(this, void 0, void 0, function () {
            var usersFormApi, currentUser;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Current Logged user
                        firebase_1["default"].auth().onAuthStateChanged(function (currentUser) { return __awaiter(_this, void 0, void 0, function () {
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
                                        setUser(arrange_1.defaultUser);
                                        _c.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, apis_1.apiGetUsers()];
                    case 1:
                        usersFormApi = _a.sent();
                        setUsers(usersFormApi);
                        return [4 /*yield*/, apis_1.apiGetCurrentUser()];
                    case 2:
                        currentUser = _a.sent();
                        console.log('currentUser:', currentUser);
                        return [2 /*return*/];
                }
            });
        });
    }
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
        if (tableId === user.tableId) {
            console.log("Current user is already sitting on \"" + tableId + "\" table");
            return;
        }
        //   const newTable = tableById(tableId);
        var users = arrange_1.usersOnTable(tableId);
        if (users.length >= arrange_1.MAX_USERS_ON_TABLE) {
            alert("No free seats on \"" + tableId + "\" table!");
            return;
        }
        // Current User can be added to this table
        moveUserToTable(tableId);
    }
    return (react_1["default"].createElement("div", { className: "remo-theater", style: { width: tableConfig_json_1["default"].width, height: tableConfig_json_1["default"].height } },
        react_1["default"].createElement("div", { className: "rt-app-bar" },
            react_1["default"].createElement("div", { className: 'user' },
                user.avatar ? react_1["default"].createElement("div", { className: 'avatar' },
                    react_1["default"].createElement("img", { src: user.avatar, title: user.name, alt: user.name })) : null,
                react_1["default"].createElement("h5", null, user.name),
                Boolean(user.email) && react_1["default"].createElement("h6", null, user.email),
                react_1["default"].createElement("button", { onClick: handleLogout }, "Logout"))),
        react_1["default"].createElement("div", { className: "rt-rooms" }, arrange_1.TABLES.map(function (table) {
            return react_1["default"].createElement(Table_1["default"], __assign({ key: table.id }, table, { users: arrange_1.usersOnTable(users, table.id), onDoubleClick: function () { return tableDoubleClick(table.id); } }));
        })),
        react_1["default"].createElement("div", { className: "rt-background" },
            react_1["default"].createElement("img", { src: conference_map_svg_1["default"], alt: "Conference background" }))));
};
exports["default"] = Theater;
