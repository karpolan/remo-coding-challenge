"use strict";
exports.__esModule = true;
var react_1 = require("react");
var firebase_1 = require("../services/firebase");
var react_router_dom_1 = require("react-router-dom");
var apis_1 = require("../apis");
var Auth = function () {
    var history = react_router_dom_1.useHistory();
    react_1.useEffect(function () {
        firebase_1["default"].auth().onAuthStateChanged(function (user) {
            if (user) {
                // TODO: Store user details
                console.log('Logged User:', user);
                history.push('/theater');
            }
        });
        // Sample API requests
        apis_1.sendGetRequest("sample-get-request?param=1").then(function (response) { return console.log(response); });
        apis_1.sendPostRequest("sample-post-request", { postParam: 1 }).then(function (response) { return console.log(response); });
    }, [ /*history*/]);
    var redirect = function () {
        var provider = new firebase_1["default"].auth.GoogleAuthProvider();
        firebase_1["default"].auth().signInWithPopup(provider);
    };
    return (react_1["default"].createElement("div", { style: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        } },
        react_1["default"].createElement("h1", null, " Remo Coding Challenge Join Room "),
        react_1["default"].createElement("button", { onClick: redirect }, " Login With Google ")));
};
exports["default"] = Auth;
