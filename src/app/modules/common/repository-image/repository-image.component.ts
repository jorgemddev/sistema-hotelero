import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RequestsService } from 'src/app/services/requests.service';
import { Images } from 'src/app/models/interfaces/images';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-repository-image',
  templateUrl: 'repository-image.component.html',
  styleUrls: ['repository-image.component.css'],
})
export class RepositoryImageComponent implements OnChanges, OnInit {
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
    private request: RequestsService
  ) { }
  level: any;
  domain: string = this.api.domain;

  @Output()
  onSelected = new EventEmitter<Images>();

  showCopyInput: boolean = false;
  ngOnInit(): void {
    this.getImages();
    this.level = sessionStorage.getItem('ccviLevel')
      ? sessionStorage.getItem('ccviLevel')
      : 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getImages();
  }

  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
    alt: new UntypedFormControl()
  });

  pathFull: string = '';
  idSeledted: number = 0;
  items!: Images[];

  openModal(idMdl: any, item: Images) {
    var link = this.domain + 'img/upload/' + item.path + '/' + item.name;
    this.modal.open(idMdl);
    this.pathFull = link;
  }
  getImages() {
    this.api.getImages().subscribe(
      (response) => {
        this.request.setLoading(false);
        this.items = response.data as Images[];
      },
      (error) => {
        this.items = [];
        this.request.setCode(error);
      }
    );
  }
  saveAlt(value: any,id:number) {
    this.form.get('id').setValue(id);
    this.form.get('alt').setValue(value);
    this.api.updateImage(this.form).subscribe(
      (response) => {
        this.request.setLoading(false);
          this.toast.success('Agregado correctamente', 'Atributo ALT');
          this.getImages();
      },
      (error) => {
        this.toast.warning('No fue posible agregar o modificars', 'Atributo ALT');
      }
    );
  }
  delete(item: Images) {
    this.api.deleteImage(item.id).subscribe(
      (response) => {
        this.toast.success('La imagen seleccionada fue eliminada', 'Imagenes');
        this.getImages();
      },
      (error) => {
        this.toast.warning(
          'La imagen seleccionada, no fue eliminada',
          'Imagenes'
        );
        this.request.setCode(error);
      }
    );
  }
  showCopyLink(show: boolean) {
    console.log('es:' + show);
  }
  selectedImage(item: Images) {
    var link = this.domain + 'img/upload/' + item.path + '/' + item.name;
    item.link=link;
    this.toast.success('Imagen seleccionada correctamente', 'Multimedia');
    this.onSelected.emit(item);
    this.modal.dismissAll();
  }

  getDownloadImage() {
    return this.api.getImage(this.idSeledted);
  }
  onSuccess(rs: any) {
    if (rs) {
      this.getImages();
      this.toast.success('Imagen subida correctamente', 'Subida de imagen');
    }
  }
}
