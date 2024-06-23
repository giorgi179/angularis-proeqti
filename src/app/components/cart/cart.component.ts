import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.apiService.getCart().subscribe((cart: any[]) => {
      this.cart = cart;
    });
  }

  removeFromCart(productId: number) {
    this.apiService.removeFromCart(productId).subscribe(() => {
      this.cart = this.cart.filter(item => item.productId !== productId);
    });
  }

  getTotalPrice() {
    return this.cart.reduce((total, item) => total + item.product.price, 0);
  }

  proceedToCheckout() {
    // აქ დაამატე ლოგიკა "Proceed to Checkout" ღილაკისთვის
    console.log('Proceed to Checkout');
  }
}
