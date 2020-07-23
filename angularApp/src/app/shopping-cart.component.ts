import { Component, Input, Output, EventEmitter, OnInit  } from '@angular/core';
import { AlertService, AuthenticationService } from '@/_services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { UserService } from '@/_services';

import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'shopping-cart',
  template: `
  <form  (ngSubmit)="onSubmit()">
  <h2>Shopping Cart ({{calcTotal()}})</h2>
  <h3> {{Message}}</h3>
  <div class="col-sm-12 d-flex" *ngIf="calcTotal()>0">
  <h5 class="col-sm-4">Total: {{calcTotalAmount()}}</h5> 
  <div class="form-group col-sm-4">
  <button class="btn btn-primary btn-small  float-right">Place order</button>
  </div>
  </div>
  </form>
  <cart-product *ngFor="let product of products" [product]="product" (productRemoved)="removeProduct($event)"><cart-product>
  
  `,
  styles: [`:host{}`]
})
export class ShoppingCartComponent implements OnInit  {
  loginForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
   
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    
) {
 
}

ngOnInit() {

  
 
}

  @Input() products: any[];

  private Message: string;
 
  @Output() productRemoved = new EventEmitter();
  calcTotal() {
    return this.products.reduce((acc, prod) => acc+= prod.productCount ,0)
  }

  calcTotalAmount() {
    return this.products.reduce((acc, prod) => acc+= prod.productCount * prod.productPrice  ,0)
  }
  removeProduct(product) {
    this.productRemoved.emit(product)
  }

  onSubmit() {

    this.alertService.clear();

    this.userService.PlaceOrder(this.products)
    .subscribe( 
    data => {
      this.alertService.success(data.message, true);
     
    // this.products=[];

      this.products.forEach(function (product) {
        product.productCount=0;
       
    });

  },
  error => {
      this.alertService.error(error);
      
  });

 
  

}



}