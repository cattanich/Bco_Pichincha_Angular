import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
import { Product } from '../../../../core/models/product.interface';
import { CustomValidators } from '../../../../core/services/validators/custom-validators';
import { CanComponentDeactivate } from '../../../../core/guards/unsaved-changes.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, CanComponentDeactivate {
  productForm!: FormGroup;
  isEditMode = false;
  productId = '';
  formSubmitted = false;
  isLoading = false;
  formChanged = false;
  
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.productId = params['id'];
        this.loadProduct();
      }
    });

    this.productForm.valueChanges.subscribe(() => {
      this.formChanged = true;
    });
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.formChanged && !this.formSubmitted) {
      return confirm('¿Desea salir del formulario? Los cambios no guardados se perderán.');
    }
    return true;
  }

  initForm(): void {
    this.productForm = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required, CustomValidators.dateValidator]],
      date_revision: [{ value: '', disabled: true }, [Validators.required]]
    });

    // Update date_revision when date_release changes
    this.productForm.get('date_release')?.valueChanges.subscribe(date => {
      if (date) {
        const releaseDate = new Date(date);
        const revisionDate = new Date(releaseDate);
        revisionDate.setFullYear(releaseDate.getFullYear() + 1);
        
        this.productForm.get('date_revision')?.setValue(
          revisionDate.toISOString().split('T')[0]
        );
      }
    });
  }

  loadProduct(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (response) => {
        const product = response.data.find(p => p.id === this.productId);
        if (product) {
          // Disable ID field in edit mode
          this.productForm.get('id')?.disable();
          
          // Format dates for input
          const formattedProduct = {
            ...product,
            date_release: new Date(product.date_release).toISOString().split('T')[0],
            date_revision: new Date(product.date_revision).toISOString().split('T')[0]
          };
          
          this.productForm.patchValue(formattedProduct);
          this.formChanged = false;
        } else {
          this.router.navigate(['/products']);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading product', error);
        this.router.navigate(['/products']);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    
    if (this.productForm.invalid) {
      return;
    }
    
    const formData = {...this.productForm.getRawValue()};
    
    // Enable ID for form submission if in edit mode
    if (this.isEditMode) {
      formData.id = this.productId;
      this.saveProduct(formData);
    } else {
      // Check if ID exists
      this.isLoading = true;
      this.productService.verifyProductId(formData.id).subscribe({
        next: (exists) => {
          if (exists) {
            this.productForm.get('id')?.setErrors({ idExists: true });
            this.isLoading = false;
            this.formSubmitted = false;
          } else {
            this.saveProduct(formData);
          }
        },
        error: (error) => {
          console.error('Error verifying ID', error);
          this.isLoading = false;
          this.formSubmitted = false;
        }
      });
    }
  }
  
  saveProduct(formData: any): void {
    this.isLoading = true;
    const request$ = this.isEditMode
      ? this.productService.updateProduct(formData)
      : this.productService.createProduct(formData);
      
    request$.subscribe({
      next: () => {
        this.formChanged = false;
        this.router.navigate(['/products']);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error saving product', error);
        this.isLoading = false;
        this.formSubmitted = false;
      }
    });
  }
  
  resetForm(): void {
    this.formSubmitted = false;
    if (this.isEditMode) {
      this.loadProduct();
    } else {
      this.productForm.reset();
      this.formChanged = false;
    }
  }
}