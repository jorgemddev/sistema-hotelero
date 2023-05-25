import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Form, FormGroup, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';
import schema from './shema/iframe';

@Component({
  selector: 'app-editor-html',
  templateUrl: './editor-html.component.html',
  styleUrls: ['./editor-html.component.css'],
})
export class EditorHtmlComponent implements OnInit, OnChanges,OnDestroy {
  constructor(
    private api: ApiService,
    private modal: NgbModal,
    private toastr: ToastrService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.editor = new Editor();
  }

  @Input()
  form:UntypedFormGroup=new UntypedFormGroup({
    content: new UntypedFormControl(null, [Validators.required()]),
  });

  @Input()
  custom:boolean=false;

  @Input()
  full:boolean=false;

  @Input()
  myToolbar:Toolbar;

  toolbar:Toolbar;
  editor: Editor;
  viewCustom:boolean=true;

  html: '' = '';

  ngOnInit(): void {
    this.editor = new Editor({
      schema,
    });
    if(this.myToolbar==null){
      this.toolbar= [
        // default value
        ['bold', 'italic'],
        ['underline', 'strike'],
    
        ['code', 'blockquote'],
        ['ordered_list', 'bullet_list'],
        [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
        ['link'],
        ['text_color', 'background_color'],
        ['align_left', 'align_center', 'align_right', 'align_justify'],
        ['horizontal_rule', 'format_clear'],
      ];
    }else{
      this.toolbar=this.myToolbar;
    }
    if(this.custom){
      this.viewCustom=this.custom;
    }
  }

  // make sure to destory the editor
  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
