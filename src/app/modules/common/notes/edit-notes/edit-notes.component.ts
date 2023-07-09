import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toolbar } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.css']
})
export class EditNotesComponent implements OnChanges {
  constructor(
    private api: ApiService,
    private toast: ToastrService,
    private modal: NgbModal
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.id > 0) {
      console.log('desde Note edit:' + this.id);
      this.getNote(this.id);
    }
  }
  @Output()
  success = new EventEmitter<boolean>();
  @Input()
  id: number = 0;
  @Input()
  providersId: number;
  @Input()
  clientsId: number;
  @Input()
  reservationsId: number;

  items: any;
  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
    content: new UntypedFormControl(''),
    providers_id: new UntypedFormControl(0),
    clients_id: new UntypedFormControl(0),
    reservations_id: new UntypedFormControl(0),
  });
  getNote(id: number) {
    this.api.getNote(id).subscribe(
      (response) => {
        this.primaryForm.patchValue(response.data);
      },
      (error) => {
        this.toast.warning('', 'Proveedor no encontrado');
      }
    );
  }
  update() {
    this.primaryForm.get('providers_id').setValue(this.providersId);
    this.primaryForm.get('clients_id').setValue(this.clientsId);
    this.primaryForm.get('reservations_id').setValue(this.reservationsId);
    this.api.updateNote(this.primaryForm).subscribe(
      (response) => {
        this.toast.success(
          'Nota modificada correctamente',
          'Gestión Notas'
        );
        this.success.emit(true);
        this.modal.dismissAll();
      },
      (error) => {
        this.toast.warning(error.error.mistakes, 'Tenemos un error');
      }
    );
  }
  openModal(md: any, size = 'md') {
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
