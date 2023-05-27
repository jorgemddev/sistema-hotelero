import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css'],
})
export class BrandComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private routeActive: ActivatedRoute,
    private modal: NgbModal,
    private toast: ToastrService,
  ) {}
  usernameDisp = '...';
  textColor = '';
  image: string = '';
  error: any;
  primaryFm = new UntypedFormGroup({
    domain: new UntypedFormControl(''),
    name: new UntypedFormControl(''),
    business: new UntypedFormControl(''),
    slogan: new UntypedFormControl(''),
    rut: new UntypedFormControl(''),
    location: new UntypedFormControl(''),
    email: new UntypedFormControl(''),
    phone: new UntypedFormControl(''),
    whatsapp: new UntypedFormControl(''),
    instagram: new UntypedFormControl(''),
    twitter: new UntypedFormControl(''),
    facebook: new UntypedFormControl(''),
    youtube: new UntypedFormControl(''),
    logo: new UntypedFormControl(''),
    id: new UntypedFormControl(''),
  });

  ngOnInit(): void {
    this.getCompany();
  }
  privileges: any = [];
  companys: any = [];
  regions: any = [];
  cities: any = [];
  update() {
    this.api.updateCompany(this.primaryFm).subscribe(
      (response) => {
          this.getCompany();
          this.toast.success('Cambios registrados correctamente');
      },
      (e) => {
        this.toast.warning(e.error.mistakes,e.error.msg);
      }
    );
  }
  saveImageProfile() {
    this.update();
  }
  getCompany() {
    this.api.getCompany().subscribe(
      (response) => {
        var data = response.data;
        this.primaryFm.patchValue(data);
        this.image = this.primaryFm.get('image')?.value;
      },
      (e) => {
        this.toast.warning(e.error.mistakes,e.error.msg);
      }
    );
  }
  getData() {
    this.api.getRegion().subscribe(
      (response) => {
        this.regions = response.data;
        console.log(response.data);
      },
      (error) => {
        this.error = error;
      }
    );
    this.api.getAllCities().subscribe(
      (response) => {
        this.cities = response.data;
        console.log(response.data);
      },
      (error) => {
        this.error = error;
      }
    );
  }
  filterCities(event: any) {
    var filter: string = event.target.value;
    this.api.getCitiesFilter(filter).subscribe(
      (response) => {
        this.cities = response.data;
        console.log(response.data);
      },
      (error) => {
        this.error = error;
      }
    );
  }

  openRepository(md: any) {
    this.modal.open(md, {
      size: 'xl',
    });
  }
  toBack() {
    this.router.navigate(['/users/list-user']);
  }
}
