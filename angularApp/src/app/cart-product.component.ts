import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cart-product',
  template: `
   <div *ngIf="product">
     <div class="col-sm-4">{{product.productName}}</div>
     <input class="col-sm-4" type="number" [(ngModel)]="product.productCount" min="0" (ngModelChange)="modelChanged($event)"/>
     <label class="col-sm-4">Price: {{product.productCount*product.productPrice}}</label> 
   </div>
  `,
  styles: [`
  :host > div{
    display: flex;
    grid-template-columns: 1fr 25px;
    grid-column-gap: 10px;
    border: 1px solid blue;
    padding: 10px;
  }
  div:nth-child(1) {font-weight: bold;}
  `]
})
export class CartProductComponent  {
  @Input() product: any;
  @Output() productRemoved = new EventEmitter();
  modelChanged(product) {
     if (this.product.productCount === 0) {
      this.productRemoved.emit(this.product)
     }
  }
}