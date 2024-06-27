import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routes } from '@angular/router';
import { ContactComponent } from '../contact/contact.component';


@Injectable({
  providedIn: 'root'
})

export class ApiService {


  
  [x: string]: any;
  private baseUrl = 'https://restaurant.stepprojects.ge/api';
  

  constructor(private http: HttpClient) { }

  
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Products/GetAll`);
    //console.log(this.http.get(`${this.baseUrl}/Products/GetAll`));
  }

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Categories/GetAll`);
    //console.log(this.http.get(`${this.baseUrl}/Categories/GetAll`));
  }

  getCart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Baskets/GetAll`);
  }

  addToCart(product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Baskets/AddToBasket`, { productId: product.id });
  }

  removeItemFromCart(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Basket/Remove/${productId}`);
  }
  updateCart(cart: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Basket/Update`, cart);
  }
  
}
