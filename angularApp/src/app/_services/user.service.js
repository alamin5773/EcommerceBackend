"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var _services_1 = require("@/_services");
var UserService = /** @class */ (function () {
    function UserService(http, authenticationService) {
        this.http = http;
        this.authenticationService = authenticationService;
    }
    UserService.prototype.PlaceOrder = function (productList) {
        var obj = Object.assign(productList.map(function (x) { return Object.values(x); }).map(function (y) {
            var _a;
            return (_a = {}, _a[y[0]] = y[1], _a);
        }));
        delete productList.productName;
        delete productList.productPrice;
        console.log(productList);
        return this.http.post(config.apiUrl + "/api/Product/PlaceOrder", productList);
    };
    UserService.prototype.getAllProduct = function () {
        return this.http.get(config.apiUrl + "/api/Product/GetProductList");
    };
    UserService.prototype.register = function (user) {
        return this.http.post(config.apiUrl + "/api/Signup/Register", user);
    };
    UserService.prototype.delete = function (id) {
        return this.http.delete(config.apiUrl + "/users/" + id);
    };
    UserService = __decorate([
        core_1.Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [http_1.HttpClient, _services_1.AuthenticationService])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
