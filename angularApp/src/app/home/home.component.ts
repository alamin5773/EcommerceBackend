import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { LoggedInInfo } from '@/_models';

import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'home.component.html' })

export class HomeComponent implements OnInit {
    currentUser: LoggedInInfo;

    ProductDBList = [];
    cartProductList = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    
    }

    

    ngOnInit() {


        this.loadAllProducts();
    }

    private loadAllProducts() {
        debugger;
        this.userService.getAllProduct()
            .pipe(first())
            .subscribe(ProductDBList => this.ProductDBList = ProductDBList);
    }

    addProductToCart(product) {
        debugger;
 
        const productExistInCart = this.cartProductList.find(({productName}) => productName === product.productName); // find product by name
        if (!productExistInCart) {
          this.cartProductList.push({...product, productCount:1}); // enhance "porduct" opject with "num" property
    
          return;
        }
        productExistInCart.productCount += 1;
       
      
      }
       removeProduct(product) {
        this.cartProductList = this.cartProductList.filter(({productName}) => productName !== product.productName)
       }

    //deleteUser(id: number) {
    //    this.userService.delete(id)
    //        .pipe(first())
    //        .subscribe(() => this.loadAllUsers());
    //}

 
}