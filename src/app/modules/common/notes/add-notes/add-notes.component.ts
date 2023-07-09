import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal
  ) {}
  @Output()
  success=new EventEmitter<boolean>();
  @Input()
  providersId:number;
  @Input()
  clientsId:number;

  @Input()
  reservationsId:number;


  items: any;
  primaryForm = new UntypedFormGroup({
    tag: new UntypedFormControl(),
    content: new UntypedFormControl(''),    
    providers_id:new UntypedFormControl(0),
    clients_id:new UntypedFormControl(0),
    reservations_id:new UntypedFormControl(0),
  });

  create() {
    this.primaryForm.get('providers_id').setValue(this.providersId);
    this.primaryForm.get('clients_id').setValue(this.clientsId);
    this.primaryForm.get('reservations_id').setValue(this.reservationsId);
    this.api.createNote(this.primaryForm).subscribe(
      (response) => {
        this.toast.success('Nota creado correctamente', 'Gestión Notas');
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (error) => {
        this.toast.warning(error.error.mistakes, 'Tenemos un error');
      }
    );
  }
  openModal(md: any,size='md') {
    this.modal.open(md, {
      size: 'xl',
    });
  }
  toolbar:Toolbar= [
    // default value
    ['bold', 'italic'],
    ['underline', 'strike','text_color'],
  ];
}
