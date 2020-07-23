import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';
import {  AuthenticationService } from '@/_services';


import { ProductDB } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private authenticationService: AuthenticationService,) { }

    PlaceOrder(productList) {
       

         let obj = Object.assign(productList.map( x => Object.values(x)).map(y => ({[y[0]]: y[1]})));

         delete productList.productName;
         delete productList.productPrice;

         console.log (productList );
        return this.http.post<{message: string}>(`${config.apiUrl}/api/Product/PlaceOrder`,productList);

         
    }

    getAllProduct() {
      

       return this.http.get<ProductDB[]>(`${config.apiUrl}/api/Product/GetProductList`);
  
    }


    register(user: User) {
        return this.http.post(`${config.apiUrl}/api/Signup/Register`, user);
    }

    delete(id: number) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }

   
}