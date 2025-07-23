import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @Input() appDropdown: string = 'show';
  private isOpen = false;
  
  constructor(private el: ElementRef) {}
  
  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    const dropdown = this.el.nativeElement.querySelector('.dropdown-menu');
    
    if (dropdown) {
      if (this.isOpen) {
        dropdown.classList.add(this.appDropdown);
      } else {
        dropdown.classList.remove(this.appDropdown);
      }
    }
  }
  
  @HostListener('document:click', ['$event']) onDocumentClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen = false;
      const dropdown = this.el.nativeElement.querySelector('.dropdown-menu');
      
      if (dropdown) {
        dropdown.classList.remove(this.appDropdown);
      }
    }
  }
}
