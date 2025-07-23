import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

import { ProductFormComponent } from './product-form.component';
import { ProductService } from '../../../../core/services/product.service';
import { SharedModule } from '../../../../shared/shared.module';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockProduct = {
    id: 'test1',
    name: 'Test Product',
    description: 'Test Description',
    logo: 'test-logo.png',
    date_release: '2025-01-01',
    date_revision: '2026-01-01'
  };

  beforeEach(async () => {
    const productSpy = jasmine.createSpyObj('ProductService', [
      'getProducts', 
      'createProduct', 
      'updateProduct', 
      'verifyProductId'
    ]);
    
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    
    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        SharedModule
      ],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: productSpy },
        { provide: Router, useValue: routerSpyObj },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({})
          }
        }
      ]
    }).compileComponents();

    productServiceSpy = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    
    productServiceSpy.getProducts.and.returnValue(of({ data: [mockProduct] }));
    productServiceSpy.createProduct.and.returnValue(of({ message: 'Product created', data: mockProduct }));
    productServiceSpy.updateProduct.and.returnValue(of({ message: 'Product updated', data: mockProduct }));
    productServiceSpy.verifyProductId.and.returnValue(of(false));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.productForm.get('id')?.value).toBe('');
    expect(component.productForm.get('name')?.value).toBe('');
    expect(component.productForm.get('description')?.value).toBe('');
    expect(component.productForm.get('logo')?.value).toBe('');
    expect(component.productForm.get('date_release')?.value).toBe('');
    expect(component.productForm.get('date_revision')?.value).toBe('');
  });

  it('should mark form as invalid when empty', () => {
    expect(component.productForm.valid).toBeFalse();
  });

  it('should validate ID field properly', () => {
    const idControl = component.productForm.get('id');
    
    idControl?.setValue('');
    expect(idControl?.valid).toBeFalse();
    expect(idControl?.hasError('required')).toBeTrue();
    
    idControl?.setValue('a');
    expect(idControl?.valid).toBeFalse();
    expect(idControl?.hasError('minlength')).toBeTrue();
    
    idControl?.setValue('abcdefghijk'); // 11 chars
    expect(idControl?.valid).toBeFalse();
    expect(idControl?.hasError('maxlength')).toBeTrue();
    
    idControl?.setValue('abc123');
    expect(idControl?.valid).toBeTrue();
  });

  it('should update date_revision when date_release changes', () => {
    const releaseDate = '2025-01-01';
    const expectedRevisionDate = '2026-01-01';
    
    component.productForm.get('date_release')?.setValue(releaseDate);
    
    const revisionDate = component.productForm.get('date_revision')?.value;
    expect(revisionDate).toBe(expectedRevisionDate);
  });

  it('should submit form and create product when valid', () => {
    component.productForm.setValue({
      id: 'test123',
      name: 'Test Product',
      description: 'This is a test product with description',
      logo: 'test-logo.png',
      date_release: '2025-01-01',
      date_revision: '2026-01-01'
    });
    
    component.onSubmit();
    
    expect(productServiceSpy.verifyProductId).toHaveBeenCalledWith('test123');
  });

  it('should reset form correctly', () => {
    component.productForm.setValue({
      id: 'test123',
      name: 'Test Product',
      description: 'This is a test product with description',
      logo: 'test-logo.png',
      date_release: '2025-01-01',
      date_revision: '2026-01-01'
    });
    
    component.resetForm();
    
    expect(component.productForm.get('id')?.value).toBe('');
    expect(component.productForm.get('name')?.value).toBe('');
    expect(component.formChanged).toBeFalse();
  });
});
