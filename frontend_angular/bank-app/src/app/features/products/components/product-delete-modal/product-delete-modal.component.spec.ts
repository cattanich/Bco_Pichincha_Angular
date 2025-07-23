import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDeleteModalComponent } from './product-delete-modal.component';

describe('ProductDeleteModalComponent', () => {
  let component: ProductDeleteModalComponent;
  let fixture: ComponentFixture<ProductDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDeleteModalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDeleteModalComponent);
    component = fixture.componentInstance;
    
    component.product = {
      id: 'test1',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: '2025-01-01',
      date_revision: '2026-01-01'
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit cancel event when onCancel is called', () => {
    spyOn(component.cancel, 'emit');
    component.onCancel();
    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should emit confirm event when onConfirm is called', () => {
    spyOn(component.confirm, 'emit');
    component.onConfirm();
    expect(component.confirm.emit).toHaveBeenCalled();
  });

  it('should display product name in the confirmation message', () => {
    const modalText = fixture.nativeElement.querySelector('.modal-text');
    expect(modalText.textContent).toContain('Test Product');
  });

  it('should have cancel and confirm buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('Cancelar');
    expect(buttons[1].textContent).toContain('Confirmar');
  });
});
