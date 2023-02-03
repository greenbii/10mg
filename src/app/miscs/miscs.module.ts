import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomselectComponent } from './customselect/customselect.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './custom.filter.pipe';



@NgModule({
  declarations: [
    CustomselectComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CustomselectComponent,
    FilterPipe
  ]
})
export class MiscsModule { }
