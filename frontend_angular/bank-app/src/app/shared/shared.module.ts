import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './directives/dropdown.directive';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  declarations: [
    DropdownDirective,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    DropdownDirective,
    DateFormatPipe
  ]
})
export class SharedModule { }
