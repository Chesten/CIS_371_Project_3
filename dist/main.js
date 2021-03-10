"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php";
axios_1["default"]
    .get(URL, {
    params: {
        s: "gin"
    }
})
    .then(function (r) { return r.data; })
    .then(function (data) {
    console.log(data);
});
var theInput;
var theButton;
theInput = document.querySelector("#userInput > input[type=text]");
theButton = document.querySelector("#userInput > button");
theButton === null || theButton === void 0 ? void 0 : theButton.addEventListener("click", function () {
    var _a;
    var inputLen = (_a = theInput === null || theInput === void 0 ? void 0 : theInput.value.length) !== null && _a !== void 0 ? _a : 0;
    if (inputLen > 0)
        console.log("You entered", theInput === null || theInput === void 0 ? void 0 : theInput.value);
    else
        console.log("Please enter some text");
});
