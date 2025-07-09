import { NgIf } from '@angular/common';
import { Component, inject, input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl, ReactiveFormsModule } from '@angular/forms';
import {BsDatepickerConfig, BsDatepickerModule} from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-picker',
  imports: [BsDatepickerModule,NgIf,ReactiveFormsModule],
  templateUrl: './date-picker.html',
  styleUrl: './date-picker.css'
})
export class DatePicker implements ControlValueAccessor {
  label = input<string>('');
  maxDate = input<Date>();
  bsConfig?:Partial<BsDatepickerConfig>;

  constructor(@Self() public ngControl: NgControl){
    this.ngControl.valueAccessor = this;
    this.bsConfig = {
      containerClass: 'theme-red',
      dateInputFormat: 'DD MMMM YYYY'
    }
  }

  writeValue(obj: any): void {
    
  }
  registerOnChange(fn: any): void {
    
  }
  registerOnTouched(fn: any): void {
    
  }

  get control(): FormControl{
    return this.ngControl.control as FormControl
  }

}
