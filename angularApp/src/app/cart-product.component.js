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
var CartProductComponent = /** @class */ (function () {
    function CartProductComponent() {
        this.productRemoved = new core_1.EventEmitter();
    }
    CartProductComponent.prototype.modelChanged = function (product) {
        if (this.product.productCount === 0) {
            this.productRemoved.emit(this.product);
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CartProductComponent.prototype, "product", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CartProductComponent.prototype, "productRemoved", void 0);
    CartProductComponent = __decorate([
        core_1.Component({
            selector: 'cart-product',
            template: "\n   <div *ngIf=\"product\">\n     <div class=\"col-sm-4\">{{product.productName}}</div>\n     <input class=\"col-sm-4\" type=\"number\" [(ngModel)]=\"product.productCount\" min=\"0\" (ngModelChange)=\"modelChanged($event)\"/>\n     <label class=\"col-sm-4\">Price: {{product.productCount*product.productPrice}}</label> \n   </div>\n  ",
            styles: ["\n  :host > div{\n    display: flex;\n    grid-template-columns: 1fr 25px;\n    grid-column-gap: 10px;\n    border: 1px solid blue;\n    padding: 10px;\n  }\n  div:nth-child(1) {font-weight: bold;}\n  "]
        })
    ], CartProductComponent);
    return CartProductComponent;
}());
exports.CartProductComponent = CartProductComponent;
