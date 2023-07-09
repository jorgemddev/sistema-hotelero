import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Editor, Validators, Toolbar, schema } from 'ngx-editor';
import { ApiEmojiService } from '../api-emoji.service';

@Component({
  selector: 'app-gallery-emoji',
  templateUrl: './gallery-emoji.component.html',
  styleUrls: ['./gallery-emoji.component.css']
})
export class GalleryEmojiComponent implements OnInit {

  constructor(private api: ApiEmojiService) { }

  active = 1;
  groupEmojis: any = [];
  emojis: any = [];
  allEmoji: any = [];


  ngOnChanges(changes: SimpleChanges): void {
    this.editor = new Editor();
  }

  @Input()
  form: UntypedFormGroup = new UntypedFormGroup({
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
    this.api.getGroupEmoji().subscribe(
      (response) => {
        var data = response.data;
        this.groupEmojis = data;
      },
    );
    this.api.getAllEmojis().subscribe(
      (response) => {
        var data = response.data;
        this.allEmoji = data;
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