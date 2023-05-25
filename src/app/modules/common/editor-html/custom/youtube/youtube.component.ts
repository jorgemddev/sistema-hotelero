import { Component, Input, OnInit } from '@angular/core';
import { setBlockType } from 'prosemirror-commands';
import { EditorState, Plugin, PluginKey, Transaction } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { Editor, Validators } from 'ngx-editor';
import { isNodeActive } from 'ngx-editor/helpers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Images } from 'src/app/models/interfaces/images';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent implements OnInit {
  constructor(private modal: NgbModal,private _sanitizer: DomSanitizer
    ) {}

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
    var youtube2='<iframe width="560" height="315" src="https://www.youtube.com/embed/wRFi5vmJydk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
    var result=this._sanitizer.bypassSecurityTrustResourceUrl(youtube2);
    this.editor.commands.insertHTML(result['changingThisBreaksApplicationSecurity']).exec();
    this.modal.dismissAll();
  }
  getVideoIframe(url) {
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
}

  openRepository(md: any) {
    this.modal.open(md, {
      size: 'md',
    });
  }
}
