import { Component, Input, OnInit } from '@angular/core';
import { setBlockType } from 'prosemirror-commands';
import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { Editor } from 'ngx-editor';
import { isNodeActive } from 'ngx-editor/helpers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Images } from 'src/app/models/interfaces/images';
import Image from 'ngx-editor/lib/commands/Image';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  constructor(private modal: NgbModal) { }

  @Input()
  editor: Editor = new Editor();
  isActive = false;
  isDisabled = false;
  image: Images = { path: '', name: '', id: 0 };



  update = (view: EditorView) => {
    const { state } = view;
    const { schema } = state;
    this.isActive = isNodeActive(state, schema.nodes['code_mirror']);
    //this.isDisabled = !this.execute(state); // returns true if executable
  };

  ngOnInit(): void {
    const plugin = new Plugin({
      key: new PluginKey(`custom-menu-upload-img`),
      view: () => {
        return {
          update: this.update,
        };
      },
    });

    this.editor.registerPlugin(plugin);
  }
  onSelectedImage(e: Images) {

    this.editor.commands
      .insertImage(e.link, { alt: e.alt})
      .exec();
  }
  openRepository(md: any) {
    this.modal.open(md, {
      size: 'xl',
    });
  }
}
