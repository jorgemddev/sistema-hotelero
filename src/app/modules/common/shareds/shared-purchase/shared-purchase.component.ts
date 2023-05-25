import { Component, Input, OnInit } from '@angular/core';
import { ApiSharedService } from '../api-shared.service';

@Component({
  selector: 'app-shared-purchase',
  templateUrl: './shared-purchase.component.html',
  styleUrls: ['./shared-purchase.component.css']
})
export class SharedPurchaseComponent implements OnInit {

  constructor(private apiShared:ApiSharedService) { }

  ngOnInit(): void {
    this.getData();
  }
  @Input()
  purchases_id: number;
  active = 1;
  
  codephones:any=[];
  getData() {
    this.apiShared.getCodPhones().subscribe(
      (response) => {
        var data = response.data;
        this.codephones = data;
      },
      (error) => {
        this.codephones = null;
      }
    );
  }
}
