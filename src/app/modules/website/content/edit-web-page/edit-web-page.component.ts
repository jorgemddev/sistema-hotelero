import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Profile } from 'src/app/models/interfaces/profile';
import { ApiService } from 'src/app/services/api.service';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-edit-web-page',
  templateUrl: './edit-web-page.component.html',
  styleUrls: ['./edit-web-page.component.css']
})
export class EditWebPageComponent implements OnInit {
  router: any;
  error: any;
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toastr: ToastrService,
    private request:RequestsService,
    private routeActive: ActivatedRoute,
  ) {}

  @Input() iconClass = 'fa-solid fa-photo-film';
  @Input() title = '';
  @Output() buttonClick = new EventEmitter();

  status: any;
  categorys: any;
  ngOnInit(): void {
    var data = this.routeActive.snapshot.params;
    if (data['id'] != null) {
      this.getData();
      this.getPage(data['id']);
    } else {
      console.log('Se devuelve');
      this.router.navigate(['/users/list-user']);
    }
  }
  profile: Profile = {
    name: '',
    thumbnail: '',
  };

  primaryForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
    title: new UntypedFormControl(),
    path: new UntypedFormControl(''),
    mdescription:new UntypedFormControl(''),
    content: new UntypedFormControl(''),
    state_id: new UntypedFormControl(1),
    category_id: new UntypedFormControl(1),
  });
  inputImgSelected: any;
  update() {
    this.api.updatePage(this.primaryForm).subscribe(
      (response) => {
        this.request.setLoading(false);
          this.toastr.success('Modificada correctamente', 'Pagina dinamica');
          setTimeout(() => {
            //this.router.navigate(['/cars/adj-car/' + data.id]);
          }, 2000);
      },
      (error) => {
        this.request.setCode(error);
        this.error = error;
      }
    );
  }
  getPage(id: number) {
    this.api.getPage(id).subscribe(
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
  onSelectedImage(e: any) {
    console.log('Imagen seleccionada' + e);
    this.primaryForm.get(this.inputImgSelected)?.setValue(e);
  }
  openRepository(inputTag: string, md: any) {
    this.inputImgSelected = inputTag;
    this.modal.open(md, {
      size: 'xl',
    });
  }
}
