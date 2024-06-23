import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
[x: string]: any;
  products: any[] = [];
  categories: any[] = [];
  selectedCategory: string = 'All';
  filters: any = {
    spiciness: null,
    noNuts: false,
    vegetarian: false
    
  };
  

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe(data => this.products = data);
    this.apiService.getCategories().subscribe(data => this.categories = data);
  }

  addToCart(product: any): void {
    this.apiService.addToCart(product).subscribe(() => {
      alert('Product added to cart!');
    });
  }

  applyFilter(): void {
    // Trigger change detection and apply the filter logic
    this.filterProducts();
  }

  resetFilter(): void {
    this.filters = {
      spiciness: null,
      noNuts: false,
      vegetarian: false
    };
    this.selectedCategory = 'All';
    this.apiService.getProducts().subscribe(data => this.products = data);
  }

  filterProducts(): any[] {
    let filteredProducts = this.products;

    if (this.selectedCategory !== 'All') {
      filteredProducts = filteredProducts.filter(product => product.category === this.selectedCategory);
    }

    if (this.filters.spiciness) {
      filteredProducts = filteredProducts.filter(product => product.spiciness === this.filters.spiciness);
    }

    if (this.filters.noNuts) {
      filteredProducts = filteredProducts.filter(product => !product.nuts);
    }

    if (this.filters.vegetarian) {
      filteredProducts = filteredProducts.filter(product => product.vegetarian);
    }

    return filteredProducts;
    // product.model.ts



  }
}
