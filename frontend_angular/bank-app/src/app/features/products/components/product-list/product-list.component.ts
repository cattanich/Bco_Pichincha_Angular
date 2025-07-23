import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.interface';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  totalResults = 0;
  searchTerm = '';
  resultsPerPage = 5;
  showDeleteModal = false;
  productToDelete: Product | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading products', error);
      }
    });
  }

  applyFilters(): void {
    // Filter by search term
    let filtered = this.products;
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term) || 
        product.id.toLowerCase().includes(term)
      );
    }
    
    this.filteredProducts = filtered;
    this.totalResults = this.filteredProducts.length;
  }

  onSearch(): void {
    this.applyFilters();
  }

  onResultsPerPageChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.resultsPerPage = parseInt(select.value, 10);
  }

  openDeleteModal(product: Product): void {
    this.productToDelete = product;
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }

  confirmDelete(): void {
    if (this.productToDelete) {
      this.productService.deleteProduct(this.productToDelete.id).subscribe({
        next: () => {
          this.loadProducts();
          this.closeDeleteModal();
        },
        error: (error) => {
          console.error('Error deleting product', error);
          this.closeDeleteModal();
        }
      });
    }
  }
}
