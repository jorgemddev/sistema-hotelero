import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, FormArray, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { Helps } from 'src/app/libs/helps';
import { Users } from 'src/app/models/interfaces/users';
import { Denominations } from 'src/app/modules/sales/interfaces/denominations';
import { ToastrService } from 'ngx-toastr';
import { ApiSearchService } from '../../../common/searches/api-search.service';
import { ApiService } from 'src/app/services/api.service';
import { CashService } from 'src/app/services/cash.service';
import { ApiSalesService } from '../../api-sales.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pos-init',
  templateUrl: './pos-init.component.html',
  styleUrls: ['./pos-init.component.css']
})
export class PosInitComponent implements OnInit {



  constructor(private helps: Helps, private modal:NgbModal,private api: ApiSalesService, private apiPrimary: ApiService, private toast: ToastrService) { }
  user: Users;
  ngOnInit(): void {
    let data = this.helps.getToken()?.data as Users;
    this.user = data;
    console.log("DATA", data);
  }

  form = new UntypedFormGroup({
    iniammount: new UntypedFormControl(0),
  });
  create() {
    this.api.initBox(this.form).subscribe((res) => {
      this.toast.success(res.msg);
      this.apiPrimary.isLogged().subscribe((res) => {
        this.helps.saveToken(res);
        this.modal.dismissAll();
      });
    }, e => { this.toast.warning(e.error.mistakes, e.msg, { enableHtml: true, closeButton: true }); });
  }



}