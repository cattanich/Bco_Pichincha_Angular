import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.interface';
import { ProductService } from '../../../../core/services/product.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';

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
  isLoading = false;
  
  // Track which dropdown is open
  openDropdownId: string | null = null;

  constructor(
    private productService: ProductService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products', error);
        this.notificationService.showError('Error al cargar los productos: ' + (error.message || 'Error desconocido'));
        this.isLoading = false;
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

  // Toggle dropdown menu
  toggleDropdown(productId: string, event: MouseEvent): void {
    event.stopPropagation();
    if (this.openDropdownId === productId) {
      this.openDropdownId = null;
    } else {
      this.openDropdownId = productId;
    }
  }

  // Close dropdown when clicking outside
  closeDropdowns(event: MouseEvent): void {
    if (!(event.target as HTMLElement).closest('.dropdown-container')) {
      this.openDropdownId = null;
    }
  }

  openDeleteModal(product: Product, event: MouseEvent): void {
    event.stopPropagation();
    this.productToDelete = product;
    this.showDeleteModal = true;
    this.openDropdownId = null;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.productToDelete = null;
  }

  confirmDelete(): void {
    if (this.productToDelete) {
      this.isLoading = true;
      this.productService.deleteProduct(this.productToDelete.id).subscribe({
        next: () => {
          this.loadProducts();
          this.closeDeleteModal();
          this.isLoading = false;
          this.notificationService.showSuccess('Producto eliminado con éxito');
        },
        error: (error) => {
          console.error('Error deleting product', error);
          this.notificationService.showError('Error al eliminar el producto: ' + (error.message || 'Error desconocido'));
          this.closeDeleteModal();
          this.isLoading = false;
        }
      });
    }
  }
}
