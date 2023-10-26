import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Paginate } from 'src/app/models/interfaces/paginate';
import { Products } from 'src/app/models/interfaces/products';
import { ApiService } from 'src/app/services/api.service';
import { ApiSearchService } from '../api-search.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {

  constructor(private api: ApiService, private apiSearch: ApiSearchService, private modal: NgbModal, private toast: ToastrService) { }

  ngOnInit(): void {
    this.getData();
  }

  @Output()
  success = new EventEmitter<boolean>();

  @Output()
  selected = new EventEmitter<Products>();
  @Input() viewSelected: boolean = false;

  @Output()
  edit = new EventEmitter<Products>();
  @Input() viewEdit: boolean = true;

  @Output()
  delete = new EventEmitter<Products>();
  @Input() viewDelete: boolean = true;

  categorys: any;

  q: string;
  category: number = 0;
  items: Products[];
  page = 1;
  perpage: number = 0;
  collectionSize = 0;
  totalPage = 0;

  secondForm = new UntypedFormGroup({
    id: new UntypedFormControl(),
  });

  getProducts() {
    this.apiSearch.searchProducts(this.q, this.category, this.page).subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.items = data.items as Products[];
        this.page = data.current;
        this.perpage = data.per_page;
        this.collectionSize = data.count;
        console.log(this.collectionSize);
        this.totalPage = data.total;
      },
      (error) => {
        this.items = null;
        this.page = 1;
        this.collectionSize = 0;
        this.totalPage = 0;
      }
    );
  }

  getData() {
    this.api.getFamilys().subscribe(
      (response) => {
        var data = response.data as Paginate;
        this.categorys = data.items;
      },
      (error) => {
        this.categorys = null;
      }
    );
  }

  onSearch(q: string = null, category: any = 0) {
    if (q != null) {
      this.q = q;
    }

    if (category > 0) {
      this.category = category;
    }
    this.getProducts();
  }
  search() {
    this.getProducts();
  }

  selectedDelete(item: any) {
    this.delete.emit(item);
    this.success.emit(true);
  }
  selectedEdit(item: Products) {
    this.edit.emit(item);
    this.success.emit(true);
  }
  selectedItem(item: Products) {
    this.selected.emit(item);
    this.success.emit(true);
  }
}
