import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../../core/models/product.interface';

@Component({
  selector: 'app-product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.scss']
})
export class ProductDeleteModalComponent {
  @Input() product: Product | null = null;
  @Output() cancel = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onCancel(): void {
    this.cancel.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
}
