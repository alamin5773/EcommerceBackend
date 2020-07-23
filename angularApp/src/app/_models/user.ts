

export class User {
    Name: string;
    EmailAddress: string;
    Password: string;
}

export class LoggedInInfo {

    token: string;

    
}

import { DecimalPipe } from "@angular/common";
export class ProductDB {
    productID: number;
    productName: string;
    productPrice: DecimalPipe;
}


