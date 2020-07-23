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
var operators_1 = require("rxjs/operators");
var _services_1 = require("@/_services");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(authenticationService, userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
        this.ProductDBList = [];
        this.cartProductList = [];
        this.currentUser = this.authenticationService.currentUserValue;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.loadAllProducts();
    };
    HomeComponent.prototype.loadAllProducts = function () {
        var _this = this;
        debugger;
        this.userService.getAllProduct()
            .pipe(operators_1.first())
            .subscribe(function (ProductDBList) { return _this.ProductDBList = ProductDBList; });
    };
    HomeComponent.prototype.addProductToCart = function (product) {
        debugger;
        var productExistInCart = this.cartProductList.find(function (_a) {
            var productName = _a.productName;
            return productName === product.productName;
        }); // find product by name
        if (!productExistInCart) {
            this.cartProductList.push(__assign(__assign({}, product), { productCount: 1 })); // enhance "porduct" opject with "num" property
            return;
        }
        productExistInCart.productCount += 1;
    };
    HomeComponent.prototype.removeProduct = function (product) {
        this.cartProductList = this.cartProductList.filter(function (_a) {
            var productName = _a.productName;
            return productName !== product.productName;
        });
    };
    HomeComponent = __decorate([
        core_1.Component({ templateUrl: 'home.component.html' }),
        __metadata("design:paramtypes", [_services_1.AuthenticationService,
            _services_1.UserService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
