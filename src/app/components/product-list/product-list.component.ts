import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {


  products: any[] = [2];
  categories: any[] = [];
  selectedCategory: number = 0;
  filters: any = {
    spiciness: null,
    noNuts: false,
    vegetarian: false,
    
  };
  filteredProducts: any[] = [];


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getProducts().subscribe( (data) => {
      this.products = data;
      this.filteredProducts = this.products} 
      );
    this.apiService.getCategories().subscribe(data => this.categories = data);
  }

  addToCart(product: any): void {
    this.apiService.addToCart(product).subscribe(() => {
      console.log('Product added to cart!');
    });
  }

  applyFilter(): void {
    this.filterProducts(0);
  }

  resetFilter(): void {
    this.filters = {
      spiciness: null,
      noNuts: false,
      vegetarian: false,
    };
    this.selectedCategory = 0;
    this.apiService.getProducts().subscribe(data => this.filteredProducts = data);
  }

  
  
  filterProducts(categoryId: number) {
      if(categoryId == 0) this.filteredProducts = this.products; 
       else this.filteredProducts = this.products.filter(product => product.categoryId == categoryId);
    

    if (this.filters.spiciness) {
      this.filteredProducts = this.filteredProducts.filter(product => product.spiciness === this.filters.spiciness);
    }

    if (this.filters.noNuts) {
      this.filteredProducts = this.filteredProducts.filter(product => !product.nuts);
    }

    if (this.filters.vegetarian) {
      this.filteredProducts = this.filteredProducts.filter(product => product.vegetarian);
    }
    if (this.filters.spiciness !== null) {
      this.filteredProducts = this.filteredProducts.filter(product => product.spiciness === this.filters.spiciness);
    }

    return this.filteredProducts;

  }

  onChange(e: any): void {
    this.filterProducts(e.value);
    console.log(e.value);
  }
}
