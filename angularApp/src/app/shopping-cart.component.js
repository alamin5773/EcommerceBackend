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
var _services_1 = require("@/_services");
var forms_1 = require("@angular/forms");
var _services_2 = require("@/_services");
var router_1 = require("@angular/router");
var ShoppingCartComponent = /** @class */ (function () {
    function ShoppingCartComponent(authenticationService, formBuilder, route, router, userService, alertService) {
        this.authenticationService = authenticationService;
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.userService = userService;
        this.alertService = alertService;
        this.productRemoved = new core_1.EventEmitter();
    }
    ShoppingCartComponent.prototype.ngOnInit = function () {
    };
    ShoppingCartComponent.prototype.calcTotal = function () {
        return this.products.reduce(function (acc, prod) { return acc += prod.productCount; }, 0);
    };
    ShoppingCartComponent.prototype.calcTotalAmount = function () {
        return this.products.reduce(function (acc, prod) { return acc += prod.productCount * prod.productPrice; }, 0);
    };
    ShoppingCartComponent.prototype.removeProduct = function (product) {
        this.productRemoved.emit(product);
    };
    ShoppingCartComponent.prototype.onSubmit = function () {
        var _this = this;
        this.alertService.clear();
        this.userService.PlaceOrder(this.products)
            .subscribe(function (data) {
            _this.alertService.success(data.message, true);
            // this.products=[];
            _this.products.forEach(function (product) {
                product.productCount = 0;
            });
        }, function (error) {
            _this.alertService.error(error);
        });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], ShoppingCartComponent.prototype, "products", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ShoppingCartComponent.prototype, "productRemoved", void 0);
    ShoppingCartComponent = __decorate([
        core_1.Component({
            selector: 'shopping-cart',
            template: "\n  <form  (ngSubmit)=\"onSubmit()\">\n  <h2>Shopping Cart ({{calcTotal()}})</h2>\n  <h3> {{Message}}</h3>\n  <div class=\"col-sm-12 d-flex\" *ngIf=\"calcTotal()>0\">\n  <h5 class=\"col-sm-4\">Total: {{calcTotalAmount()}}</h5> \n  <div class=\"form-group col-sm-4\">\n  <button class=\"btn btn-primary btn-small  float-right\">Place order</button>\n  </div>\n  </div>\n  </form>\n  <cart-product *ngFor=\"let product of products\" [product]=\"product\" (productRemoved)=\"removeProduct($event)\"><cart-product>\n  \n  ",
            styles: [":host{}"]
        }),
        __metadata("design:paramtypes", [_services_1.AuthenticationService,
            forms_1.FormBuilder,
            router_1.ActivatedRoute,
            router_1.Router,
            _services_2.UserService,
            _services_1.AlertService])
    ], ShoppingCartComponent);
    return ShoppingCartComponent;
}());
exports.ShoppingCartComponent = ShoppingCartComponent;
