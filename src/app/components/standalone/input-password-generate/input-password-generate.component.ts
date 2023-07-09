import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PasswordGenerateComponent } from '../password-generate/password-generate.component';

@Component({
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule,PasswordGenerateComponent],
  selector: 'app-input-password-generate',
  templateUrl: './input-password-generate.component.html',
  styleUrls: ['./input-password-generate.component.css']
})
export class InputPasswordGenerateComponent implements OnInit, OnChanges {
  constructor(private modal:NgbModal) {
    this.form = new FormGroup({
      input: new FormControl({ value: '', disabled: true }),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {

      this.form.get('input')?.enable();
      console.log("ALGO CAMBIO",this.form.get('input')?.value);

  }
  ngOnInit() {

  }


  form: FormGroup;
  msg: string = '';
  passGenerete="";
typeInput:string="password";
  @Input() options: string[] | undefined;
  @Output() selectedValue: EventEmitter<string> = new EventEmitter();

  @Input()
  class!: string;
  @Input()
  label!: string;

  @Input()
  items!: Items[];
  filteredItems: Items[] = [];

  @Input()
  default!: any;

  selected(input:any) {
    this.form.get('input')?.setValue(input.value);
    this.filteredItems = [];
    this.selectedValue.emit(this.form.get('input')?.value);
  }

  openModal(mdl:any){
this.modal.open(mdl,{size:'sm'});
  }
  usePass(){
    this.selectedValue.emit(this.passGenerete);
    this.form.get('input')?.setValue(this.passGenerete);
  }
}

export interface Items {
  id: string;
  tag: string;
}
