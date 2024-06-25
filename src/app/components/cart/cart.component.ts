import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  cart: any[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.apiService.getCart().subscribe(data => {
      this.cart = data;
    });
  }

  getTotalPrice() {
    return this.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  increaseQuantity(item: { quantity: number; }) {
    if (item.quantity < 100) {
      item.quantity++;
      this.updateCart();
    }
  }

  decreaseQuantity(item: { quantity: number; }) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    }
  }

  removeFromCart(productId: number) {
    this.cart = this.cart.filter(item => item.productId !== productId);
    this.updateCart();
  }

  updateCart() {
    this.apiService.updateCart(this.cart).subscribe();
  }

  proceedToCheckout() {
   
  }
}
