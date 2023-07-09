import { Component, Input, OnInit } from '@angular/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { Editor } from 'ngx-editor';
import { isNodeActive } from 'ngx-editor/helpers';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { SettingRoutingModule } from 'src/app/modules/setting/setting-routing.module';
import { ApiEditorHtmlService } from '../../api-editor-html.service';


@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.css']
})
export class EmojiComponent implements OnInit {

  constructor(private modal: NgbModal, private api: ApiEditorHtmlService) { }

  modalRef:NgbModalRef;
 
  @Input()
  editor: Editor = new Editor();

  isActive = false;
  isDisabled = false;

  items: any;
  q: string;

  ngOnInit(): void {
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

  selected(item: any) {
    this.editor.commands.insertText(item.icharacter).insertNewLine().exec();
  }

  openModal(md: any) {
   this.modalRef= this.modal.open(md, {
      size: 'md',
    });
  }
}
