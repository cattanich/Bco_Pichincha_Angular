import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';
import { Product } from '../models/product.interface';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', () => {
    const mockProducts = {
      data: [
        {
          id: 'test1',
          name: 'Product 1',
          description: 'Description 1',
          logo: 'logo1.png',
          date_release: '2025-01-01',
          date_revision: '2026-01-01'
        }
      ]
    };

    service.getProducts().subscribe(response => {
      expect(response).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should create a product', () => {
    const mockProduct: Product = {
      id: 'test1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'logo1.png',
      date_release: '2025-01-01',
      date_revision: '2026-01-01'
    };

    const mockResponse = {
      message: 'Product added successfully',
      data: mockProduct
    };

    service.createProduct(mockProduct).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3002/bp/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockResponse);
  });

  it('should update a product', () => {
    const mockProduct: Product = {
      id: 'test1',
      name: 'Updated Product',
      description: 'Updated Description',
      logo: 'logo1.png',
      date_release: '2025-01-01',
      date_revision: '2026-01-01'
    };

    const mockResponse = {
      message: 'Product updated successfully',
      data: mockProduct
    };

    service.updateProduct(mockProduct).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:3002/bp/products/${mockProduct.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(mockProduct);
    req.flush(mockResponse);
  });

  it('should delete a product', () => {
    const productId = 'test1';
    const mockResponse = {
      message: 'Product removed successfully'
    };

    service.deleteProduct(productId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:3002/bp/products/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('should verify a product ID', () => {
    const productId = 'test1';
    const mockResponse = true;

    service.verifyProductId(productId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:3002/bp/products/verification/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
