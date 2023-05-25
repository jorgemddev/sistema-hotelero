import { Component, Input, OnInit } from '@angular/core';
import { setBlockType } from 'prosemirror-commands';
import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Editor, Validators } from 'ngx-editor';
import { isNodeActive } from 'ngx-editor/helpers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Images } from 'src/app/models/interfaces/images';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  constructor(private modal: NgbModal) {}

  @Input()
  editor: Editor = new Editor();
  isActive = false;
  isDisabled = false;
  image: Images = { path: '', name: '', id: 0 };

  form: UntypedFormGroup = new UntypedFormGroup({
    link: new UntypedFormControl(null, [Validators.required()]),
  });

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
  onSelected() {
    var link = this.form.get('link').value;
    var video = '<video src="' + link + '" autoplay muted loop></video>';
    this.editor.commands.insertHTML(video).exec();
    this.modal.dismissAll();
  }
  openRepository(md: any) {
    this.modal.open(md, {
      size: 'sm',
    });
  }
}
