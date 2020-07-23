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
var ProductComponent = /** @class */ (function () {
    function ProductComponent() {
        this.productAdded = new core_1.EventEmitter();
    }
    ProductComponent.prototype.addProductToCart = function (product) {
        this.productAdded.emit(product);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], ProductComponent.prototype, "product", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ProductComponent.prototype, "productAdded", void 0);
    ProductComponent = __decorate([
        core_1.Component({
            selector: 'product',
            template: "\n  <div class=\"test\">{{product.productName}}</div><button (click)=\"addProductToCart(product)\">+</button>\n  <div>{{product.productPrice.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}}</div>\n  ",
            styles: ["\n  :host {\n    display: grid;\n    grid-template-columns: 1fr auto;\n    grid-column-gap: 10px;\n    border: 1px solid blue;\n    padding: 10px;\n  }\n  div:nth-child(1) {font-weight: bold;}\n  "]
        })
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
