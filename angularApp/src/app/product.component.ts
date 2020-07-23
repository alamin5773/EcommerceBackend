import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product',
  template: `
  <div class="test">{{product.productName}}</div><button (click)="addProductToCart(product)">+</button>
  <div>{{product.productPrice.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}}</div>
  `,
  styles: [`
  :host {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-column-gap: 10px;
    border: 1px solid blue;
    padding: 10px;
  }
  div:nth-child(1) {font-weight: bold;}
  `]
})
export class ProductComponent  {
  @Input() product: any;
  @Output() productAdded = new EventEmitter();
  addProductToCart(product) {
    this.productAdded.emit(product);
  }
}