import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Images } from 'src/app/models/interfaces/images';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { ApiService } from 'src/app/services/api.service';
import { Icons } from 'src/app/models/interfaces/icons'
@Component({
  selector: 'app-gallery-icons',
  templateUrl: './gallery-icons.component.html',
  styleUrls: ['./gallery-icons.component.css']
})
export class GalleryIconsComponent implements OnChanges, OnInit {
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toast: ToastrService,
  ) { }
  level: any;
  domain: string = this.api.domain;

  @Output()
  onSelected = new EventEmitter<Icons>();
  @Output()
  onClose = new EventEmitter<boolean>();

  showCopyInput: boolean = false;
  ngOnInit(): void {
    this.getIcons();
    this.level = sessionStorage.getItem('ccviLevel')
      ? sessionStorage.getItem('ccviLevel')
      : 0;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getIcons();
  }
  icon: Icons = {
    name: 'fa-solid fa-face-smile fa-fw'
  };
  color: string = "#4609E8";
  size: string = "fa-1x";
  items: any;
  page = 1;
  perpage: number = 0;
  collectionSize = 0;
  totalPage = 0;

  openModal(idMdl: any, item: Images) {
    var link = this.domain + 'img/upload/' + item.path + '/' + item.name;
    this.modal.open(idMdl);
  }
  getIcons() {
    this.api.getIcons(this.page).subscribe(
      (response) => {
        var data = response.data as Paginate;
        if (response.status == 'ok') {
          this.items = data.items;
          this.page = data.current;
          this.perpage = data.per_page;
          this.collectionSize = data.count;
          this.totalPage = data.total;
        } else {
          this.items = data.items;
          this.page = data.current;
          this.perpage = data.per_page;
          this.collectionSize = data.count;
          this.totalPage = data.total;
        }
      },
      (error) => {
        this.toast.error("No se pudo obtener los iconos solicitados", "Iconos");
      }
    );
  }

  selectedColor(color: any) {
    this.color = color;
  }
  selectedSize(size: any) {
    console.log(size.target.value);
    this.size = size.target.value;
  }
  selected(item: any) {
    this.toast.success('Icono seleccionado correctamente');
    this.icon={
      id:item.id,
      name:item.icon,
      size:this.size,
      color:this.color
    }
    this.onSelected.emit(this.icon);
    this.onClose.emit(true);
  }


}
