import { Component, Input, OnInit } from '@angular/core';
import { Plugin, PluginKey } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

import { Editor } from 'ngx-editor';
import { isNodeActive } from 'ngx-editor/helpers';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-shortcode',
  templateUrl: './shortcode.component.html',
  styleUrls: ['./shortcode.component.css']
})

export class ShortCodeComponent implements OnInit {

  constructor(private modal: NgbModal) { }

  @Input()
  editor: Editor = new Editor();
  isActive = false;
  isDisabled = false;


  ngOnInit(): void {
    const plugin = new Plugin({
      key: new PluginKey(`btn-add-article`),
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

  selected2() {
    this.editor.commands.insertHTML(`
    <iframe width="560" height="315" style="border:solid 10px black;" src="https://www.youtube.com/embed/RMo2haIPYBM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> `).exec();
    this.editor.commands.insertHTML(`
    <div style="background: orange; display: flex; width: 100%; height: 64px">
    Example text with example custom container with inline style
  </div>
  <div style="background: #000000; width: 100%; height: 30px; text-align: center">
    Example footer
  </div>
  `).exec();
    this.editor.setContent(`
  <div style="background: orange; display: flex; width: 100%; height: 64px">
    Example text with example custom container with inline style
  </div>
  `);
  }
  onSelected(code: any) {
    this.editor.commands.insertHTML(code).insertNewLine().exec();
    this.modal.dismissAll();
  }
  openModal(md: any) {
    this.modal.open(md, {
      size: 'xl',
    });
  }
}
