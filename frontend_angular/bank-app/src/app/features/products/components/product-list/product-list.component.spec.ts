import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../../../core/services/product.service';
import { SharedModule } from '../../../../shared/shared.module';
import { ProductDeleteModalComponent } from '../product-delete-modal/product-delete-modal.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;

  const mockProducts = {
    data: [
      {
        id: 'test1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'logo1.png',
        date_release: '2025-01-01',
        date_revision: '2026-01-01'
      },
      {
        id: 'test2',
        name: 'Product 2',
        description: 'Description 2',
        logo: 'logo2.png',
        date_release: '2025-02-01',
        date_revision: '2026-02-01'
      }
    ]
  };

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductService', ['getProducts', 'deleteProduct']);
    
    await TestBed.configureTestingModule({
      declarations: [
        ProductListComponent,
        ProductDeleteModalComponent
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        SharedModule
      ],
      providers: [
        { provide: ProductService, useValue: spy }
      ]
    }).compileComponents();

    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    productServiceSpy.getProducts.and.returnValue(of(mockProducts));
    productServiceSpy.deleteProduct.and.returnValue(of({ message: 'Product removed successfully' }));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    expect(productServiceSpy.getProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(2);
    expect(component.filteredProducts.length).toBe(2);
  });

  it('should filter products based on search term', () => {
    component.searchTerm = 'Product 1';
    component.onSearch();
    
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].id).toBe('test1');
  });

  it('should change results per page', () => {
    const mockEvent = new Event('change');
    Object.defineProperty(mockEvent, 'target', { value: { value: '10' } });
    
    component.onResultsPerPageChange(mockEvent);
    expect(component.resultsPerPage).toBe(10);
  });

  it('should open delete modal', () => {
    const product = mockProducts.data[0];
    component.openDeleteModal(product);
    
    expect(component.showDeleteModal).toBeTrue();
    expect(component.productToDelete).toBe(product);
  });

  it('should close delete modal', () => {
    component.productToDelete = mockProducts.data[0];
    component.showDeleteModal = true;
    
    component.closeDeleteModal();
    
    expect(component.showDeleteModal).toBeFalse();
    expect(component.productToDelete).toBeNull();
  });

  it('should delete product when confirmed', () => {
    const product = mockProducts.data[0];
    component.productToDelete = product;
    
    component.confirmDelete();
    
    expect(productServiceSpy.deleteProduct).toHaveBeenCalledWith(product.id);
  });
});
