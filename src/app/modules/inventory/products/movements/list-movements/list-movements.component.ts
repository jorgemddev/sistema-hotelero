import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToolbarItem, Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';
import { Buttons, Toolbar } from 'src/app/components/standalone/toolbar-search/toolbar-search.component';
import { Filters } from 'src/app/models/interfaces/filters';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-list-movements',
  templateUrl: './list-movements.component.html',
  styleUrls: ['./list-movements.component.css']
})
export class ListMovementsComponent implements OnInit {
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private router:Router

  ) { }
  private keyUpSubject = new Subject<string>();
  ngOnInit(): void {
    this.getMovements();
    this.keyUpSubject
      .pipe(debounceTime(500)) // Establece un tiempo de espera de 500 ms (ajústalo según tus necesidades)
      .subscribe((searchTerm) => {
        // Realiza la llamada a la API con el término de búsqueda
        this.getMovements();
      });
  }
  item: any;
  items: any;
  page = 1;
  perpage: number = 0;
  collectionSize = 0;
  totalPage = 0;
  filter = 0;
  btn_toolbar: Toolbar = {
    buttons: [
      {
        id: 1,
        value: "NUEVO",
        iconFaWSome: 'fa-solid fa-circle-plus',
        strClass: 'btn-primary'
      }]
  }
  q: string = "";
  filters: Filters[] = [{ id: 0, tag: 'TODAS' }, { id: 1, tag: 'ENTRADAS' }, { id: 2, tag: 'SALIDAS' }, { id: 3, tag: 'TRASPASOS' },];
  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
    barcode: new UntypedFormControl({ value: '', disabled: true }),
    name: new UntypedFormControl({ value: '', disabled: true }),
    user: new UntypedFormControl({ value: '', disabled: true }),
    sku: new UntypedFormControl({ value: '', disabled: true }),
    intstk: new UntypedFormControl({ value: '', disabled: true }),
    outstk: new UntypedFormControl({ value: '', disabled: true }),
    type: new UntypedFormControl({ value: '', disabled: true }),
    created_at: new UntypedFormControl({ value: '', disabled: true }),
  });

  getMovements() {
    this.api.listMovements(this.q, this.filter, this.page).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.items = data.items;
        this.page = data.current;
        this.perpage = data.per_page;
        this.collectionSize = data.count;
        console.log(this.collectionSize);
        this.totalPage = data.total;
      },
      (e) => {
        this.items = [];
      }
    );
  }
  openModal(md: any, item: any = null, size: string = 'md') {
    if (item != null) {
      this.item=item;
      this.form.patchValue(item);
      console.log(item);
    }
    this.modal.open(md, {
      size: size,
    });
  }
  search(q: any) {
    if (q.length > 2) {
      this.q = q;
      this.keyUpSubject.next(q)
    } else {
      this.q = "";
      this.keyUpSubject.next(q)
    }

  }
  filterMovements(filter: any) {
    this.filter = filter;
    this.getMovements();
  }

  actionButton(event: Buttons) {
    console.log(event);
    switch (event?.id) {
      case 1:
        this.router.navigate(['/inventario/productos/movimiento']);
        break;
    }
  }
  clean() { }
}
