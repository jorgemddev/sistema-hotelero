import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormControlName,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  selector: 'app-input-text-complete',
  templateUrl: './input-text-complete.component.html',
  styleUrls: ['./input-text-complete.component.css'],
})
export class InputTextCompleteComponent implements OnInit, OnChanges {
  constructor() {
    this.form = new FormGroup({
      input: new FormControl({ value: '', disabled: true }),
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.items && this.items.length > 0) {
      this.itemsReceived = true;
      this.form.get('input')?.enable();
      if (this.default != null) {
        this.searchDefault();
      }
    }
  }
  ngOnInit() {
    if (this.items && this.items.length > 0) {
      this.itemsReceived = true;
    }
  }

  itemsReceived = false;

  form: FormGroup;
  itemSelected!: Items | null;
  msg: string = '';

  @Input() options: string[] | undefined;
  @Output() selectedOption: EventEmitter<Items> = new EventEmitter();

  @Input()
  class!: string;
  @Input()
  label!: string;

  @Input()
  items!: Items[];
  filteredItems: Items[] = [];

  @Input()
  default!: any;

  searchDefault() {
    console.log(this.default);
    let item;
    if (item=this.items.find((item: Items) => item.id == this.default)) {
      console.log('encontrado',item);
      this.form.get('input')?.setValue(item.tag);
      this.selected(item);
    }else if (item=this.items.find((item: Items) => item.tag == this.default)){
      console.log('encontrado texto',item);
    }
  }

  filterItems(event: any) {
    if (event != null) {
      this.filteredItems = [];
      this.itemSelected = null;
      const searchTerm = event.target.value;
      this.filteredItems = this.items.filter((item) => {
        return item.tag.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }
  }
  selected(item: Items) {
    this.form.get('input')?.setValue(item.tag);
    this.filteredItems = [];
    this.selectedOption.emit(item);
    this.itemSelected = item;
    this.checkResult();
  }
  checkResult() {
    if (!this.itemSelected) {
      this.msg = 'el  valor ingresado en ' + this.label + ', no es valido';
    } else {
      this.msg = '';
    }
  }
}
export interface Items {
  id: string;
  tag: string;
}
