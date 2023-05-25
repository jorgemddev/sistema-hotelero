import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnChanges {
  router: any;
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toastr: ToastrService,
    private routeActive: ActivatedRoute,
    private request:RequestsService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    if(this.primaryForm.get('id')?.value!=this.id){
      this.getData();
      this.getCategory(this.id);
    }
  }
  status: any;
  categorys: any;
  ngOnInit(): void {
    var data = this.routeActive.snapshot.params;
    if (data['id'] != null) {
      this.getData();
      console.log('id:' + data['id']);
      this.getCategory(data['id']);
    } else {
      console.log('Se devuelve');
      this.router.navigate(['/noticias/categorias/nuevo']);
    }
  }
  @Input()
  id: number=0;

  @Output()
  finish = new EventEmitter<boolean>(false);
  
  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    tag: new UntypedFormControl(),
    detail: new UntypedFormControl(''),
    state_id: new UntypedFormControl(1),
    category_id: new UntypedFormControl(1),
  });

  update() {
    this.api.updateCategory(this.primaryForm).subscribe(
      (response) => {
        this.request.setLoading(false);
          this.toastr.success('Categoria modificada correctamente', '¡Todo bien!');
          this.finish.emit(true);
      },
      (error) => {
        this.request.setCode(error);
        this.toastr.warning(
          'Ocurrio un error al crear el contenido, verifique',
          '¡Ups!'
        );
      }
    );
  }
  getCategory(id: number) {
    this.api.getCategory(id).subscribe(
      (response) => {
        this.primaryForm.patchValue(response.data);
      },
      (error) => {
        this.error = error;
      }
    );
  }
  getData() {
    this.api.getCategorys().subscribe(
      (response) => {
        this.categorys = response.data;
      },
      (error) => {
        this.error = error;
      }
    );

    this.api.getState().subscribe(
      (response) => {
        this.status = response.data;
      },
      (error) => {
        this.error = error;
      }
    );
  }
}
