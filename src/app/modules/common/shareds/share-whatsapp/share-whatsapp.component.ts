import { ApiSharedService } from '../api-shared.service';
import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Editor, schema, Toolbar, Validators } from 'ngx-editor';
import { ApiService } from 'src/app/services/api.service';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-share-whatsapp',
  templateUrl: './share-whatsapp.component.html',
  styleUrls: ['./share-whatsapp.component.css']
})
export class ShareWhatsappComponent implements OnInit {

  constructor(private apiShared: ApiSharedService, private api: ApiService) { }


  @Input()
  purchases_id: number;
  active = 1;

  codephones: any = [];
  groupEmojis: any = [];
  emojis: any = [];
  allEmoji: any = [];


  ngOnChanges(changes: SimpleChanges): void {
    this.editor = new Editor();
  }

  @Input()
  form: UntypedFormGroup = new UntypedFormGroup({
    code: new UntypedFormControl(null, [Validators.required()]),
    phone: new UntypedFormControl(null, [Validators.required()]),
    content: new UntypedFormControl(null, [Validators.required()]),
  });

  @Input()
  myToolbar: Toolbar;
  isActive = false;
  isDisabled = false;
  toolbar: Toolbar;
  editor: Editor;
  viewCustom: boolean = true;
  showEmojis: boolean = false;

  html: '' = '';

  ngOnInit(): void {
    this.getData();
    this.editor = new Editor({
      schema,
    });
    if (this.myToolbar == null) {
      this.toolbar = [
        // default value
      ];
    } else {
      this.toolbar = this.myToolbar;
    }
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }


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
    this.api.getGroupEmoji().subscribe(
      (response) => {
        var data = response.data;
        this.groupEmojis = data;
      },
      (error) => {
        this.groupEmojis = null;
      }
    );
    this.api.getAllEmojis().subscribe(
      (response) => {
        var data = response.data;
        this.allEmoji = data;
      },
      (error) => {
        this.groupEmojis = null;
      }
    );
  }
  selected(item: any) {
    this.editor.commands.insertText(item.icharacter).exec();

  }
  textToWsp() {
    var content:string = this.form.get('content').value.replace("<p>"," ").replace("</p>"," ");
    var text = encodeURI(content);
    console.log(content);
    return "https://wa.me/"+this.form.get('code').value+this.form.get('phone').value+"?text="+content;
  }
  emojiFilter(item: any) {
    this.showEmojis = true;
    this.emojis = this.allEmoji.filter(d => d.igroup == item.igroup);
  }

}