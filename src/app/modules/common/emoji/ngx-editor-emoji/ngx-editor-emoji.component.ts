import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ApiEmojiService } from '../api-emoji.service';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Editor, Validators, Toolbar, schema } from 'ngx-editor';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { isNodeActive } from 'ngx-editor/helpers';

@Component({
  selector: 'app-ngx-editor-emoji',
  templateUrl: './ngx-editor-emoji.component.html',
  styleUrls: ['./ngx-editor-emoji.component.css']
})
export class NgxEditorEmojiComponent implements OnInit {

  constructor(private modal: NgbModal, private api: ApiEmojiService) { }

  modalRef:NgbModalRef;
  active = 1;
  groupEmojis: any = [];
  emojis: any = [];
  allEmoji: any = [];
  showEmojis: boolean = false;

  @Input()
  editor: Editor = new Editor();
  
  isActive = false;
  isDisabled = false;

  items: any;
  q: string;

  ngOnInit(): void {
    this.getData();
    const plugin = new Plugin({
      key: new PluginKey(`emoji`),
      view: () => {
        return {
          update: this.update,
        };
      },
    });

    this.editor.registerPlugin(plugin);
  }
  update = (view: EditorView) => {
    const { state } = view;
    const { schema } = state;
    this.isActive = isNodeActive(state, schema.nodes['code_mirror']);
    //this.isDisabled = !this.execute(state); // returns true if executable
  };
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
  emojiFilter(item: any) {
    this.showEmojis = true;
    this.emojis = this.allEmoji.filter(d => d.igroup == item.igroup);
  }
  openModal(md: any) {
   this.modalRef= this.modal.open(md, {
      size: 'md',
    });
  }
}
