"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var home_1 = require("./home");
var login_1 = require("./login");
var register_1 = require("./register");
var _helpers_1 = require("./_helpers");
var routes = [
    { path: 'home', component: home_1.HomeComponent, canActivate: [_helpers_1.AuthGuard] },
    { path: 'login', component: login_1.LoginComponent },
    { path: 'register', component: register_1.RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];
exports.appRoutingModule = router_1.RouterModule.forRoot(routes);
