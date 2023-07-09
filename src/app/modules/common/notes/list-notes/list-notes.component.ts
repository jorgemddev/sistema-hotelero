import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router: Router,
  ) { }
  @Input()
  providers_id: number = 0;
  @Input()
  clients_id: number = 0;
  @Input()
  reservations_id: number = 0;
  @Input()
  hiddenButton: boolean = false;

  idSelected: number = 0;
  ngOnInit(): void {
    this.setFilter();
    if(this.idSend>0){
      this.getNotes();
    }
    
  }

  items: any;
  page = 1;
  perpage: number = 0;
  collectionSize = 0;
  totalPage = 0;

  //Id enviado para las soliciotudes
  idSend: number;
  filter: string;

  brands: any;
  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
  });
  delete() {
    this.api.deleteNote(this.form).subscribe(
      (response) => {
        this.toast.success(
          'Producto eliminado correctamente',
          'Gestión productos'
        );
        this.modal.dismissAll();
      },
      (e) => {
        this.toast.warning(
          e.error.mistakes,
          e.error.msg
        );
      }
    );
  }
  goToUpdate(id: number) {
    this.router.navigate(['inventario/proveedores/editar/' + id]);
  }
  goToCreate() {
    console.log('crete');
    this.router.navigate(['complementos/slider-principal']);
  }
  setFilter() {
    if (this.clients_id > 0) {
      this.idSend = this.clients_id;
      this.filter = "clients";
    } else if (this.providers_id > 0) {
      this.idSend = this.clients_id;
      this.filter = "providers";
    } else if(this.reservations_id>0){
      this.idSend = this.reservations_id;
      this.filter = "reservations";
    }
  }
  getNotes() {
    this.api.getNotesFilter(this.idSend, this.filter, this.page).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.items = data.items;
        this.page = data.current;
        this.perpage = data.per_page;
        this.collectionSize = data.count;
        console.log(this.collectionSize);
        this.totalPage = data.total;
      }
    );
  }
  openModal(md: any, size: string = 'md') {
    this.modal.open(md, {
      size: size,
    });
  }
  openDelete(id: number, md: any) {
    this.form.get('id').setValue(id);
    this.modal.open(md, {
      size: 'md',
    });
  }
  openEdit(id: number, md: any) {
    this.idSelected = id;
    this.modal.open(md, {
      size: 'md',
    });
  }
  search() {
    this.getNotes();
  }
  clean() { }
}
