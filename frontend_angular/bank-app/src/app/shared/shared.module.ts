import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './directives/dropdown.directive';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { HoverEffectDirective } from './directives/hover-effect.directive';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    DropdownDirective,
    DateFormatPipe,
    LoadingComponent,
    ErrorMessageComponent,
    HoverEffectDirective,
    NotificationComponent
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
    DateFormatPipe,
    LoadingComponent,
    ErrorMessageComponent,
    HoverEffectDirective,
    NotificationComponent
  ]
})
export class SharedModule { }
