import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ToastrService } from 'ngx-toastr';
import { Cars } from 'src/app/interfaces/cars';
import { Images } from 'src/app/interfaces/images';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environments';

@Component({
  standalone: true,
  imports: [CommonModule, NgxDropzoneModule, FilePickerModule, CarouselModule],
  selector: 'app-gallery-cars',
  templateUrl: './gallery-cars.component.html',
  styleUrls: ['./gallery-cars.component.css'],
})
export class GalleryCarsComponent implements OnChanges, OnInit {
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService
  ) {}
  level: any;
  domain: string = environment.baseApiUrl;

  @Output()
  onSelected = new EventEmitter<Images>();

  @Output()
  firstPicture = new EventEmitter<Images>();

  @Input()
  cars!: Cars;

  showCopyInput: boolean = false;
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.cars != null) {
      sessionStorage.setItem('cars_id', this.cars.id.toString());
      this.getImages(this.cars);
    }
  }

  form = new UntypedFormGroup({
    id: new UntypedFormControl(),
    alt: new UntypedFormControl(),
  });

  pathFull: string = '';
  idSeledted: number = 0;
  items!: Images[];

  openModal(idMdl: any, item: Images) {
    var link = this.domain + 'img/upload/cars/' + item.path + '/' + item.name;
    this.modal.open(idMdl);
    this.pathFull = link;
  }
  getImages(car: Cars) {
    this.api.getImages(car.id).subscribe(
      (response) => {
        this.items = response.data as Images[];
        this.firstPicture.emit(this.items[0]);
      },
      (e) => {
        this.items = [];
      }
    );
  }
  saveAlt(value: any, id: number) {
    this.form.get('id').setValue(id);
    this.form.get('alt').setValue(value);
    this.api.updateImage(this.form).subscribe(
      (response) => {
        this.toast.success('Agregado correctamente', 'Atributo ALT');
        this.getImages(this.cars);
      },
      (e) => {
        this.toast.warning(e.mistakes, e.msg,{enableHtml:true,closeButton:true});
      }
    );
  }
  delete(item: Images) {
    this.api.deleteImage(item.id).subscribe(
      (response) => {
        this.toast.success('La imagen seleccionada fue eliminada', 'Imagenes');
        this.getImages(this.cars);
      },
      (e) => {
        this.toast.warning(e.mistakes, e.msg,{enableHtml:true,closeButton:true});
      }
    );
  }
  showCopyLink(show: boolean) {
    console.log('es:' + show);
  }
  selectedImage(item: Images) {
    var link = this.domain + 'img/upload/cars/' + item.path + '/' + item.name;
    item.link = link;
    this.toast.success('Imagen seleccionada correctamente', 'Multimedia');
    this.onSelected.emit(item);
    this.modal.dismissAll();
  }

  getDownloadImage() {
    return this.api.getImage(this.idSeledted);
  }
  onSuccess(rs: any) {
    if (rs) {
      this.getImages(this.cars);
      this.toast.success('Imagen subida correctamente', 'Subida de imagen');
    }
  }
}
