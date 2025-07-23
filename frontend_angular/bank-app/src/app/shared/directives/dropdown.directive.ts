import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @Input() appDropdown: string = 'show';
  private isOpen = false;
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  @HostListener('click', ['$event']) toggleOpen(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    const dropdown = this.el.nativeElement.querySelector('.dropdown-menu');
    
    if (dropdown) {
      if (this.isOpen) {
        // Verificar que appDropdown no esté vacío
        if (this.appDropdown && this.appDropdown.trim() !== '') {
          dropdown.classList.add(this.appDropdown);
        } else {
          dropdown.classList.add('show'); // Valor por defecto
        }
      } else {
        // Verificar que appDropdown no esté vacío
        if (this.appDropdown && this.appDropdown.trim() !== '') {
          dropdown.classList.remove(this.appDropdown);
        } else {
          dropdown.classList.remove('show'); // Valor por defecto
        }
      }
    }
  }
  
  @HostListener('document:click', ['$event']) onDocumentClick(event: Event) {
    // Solo cerramos el menú si se hace clic fuera del elemento y sus hijos
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen = false;
      const dropdown = this.el.nativeElement.querySelector('.dropdown-menu');
      
      if (dropdown) {
        // Verificar que appDropdown no esté vacío
        if (this.appDropdown && this.appDropdown.trim() !== '') {
          dropdown.classList.remove(this.appDropdown);
        } else {
          dropdown.classList.remove('show'); // Valor por defecto
        }
      }
    }
  }
}
