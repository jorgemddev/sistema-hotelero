import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-video-youtube',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './video-youtube.component.html',
  styleUrls: ['./video-youtube.component.css']
})
export class VideoYoutubeComponent implements OnInit, OnChanges {
  constructor(private modal: NgbModal, private _sanitizer: DomSanitizer, private toast: ToastrService) {
    this.form = new UntypedFormGroup({
      input: new UntypedFormControl({ value: '', disabled: true }),
    });
  }
  ngOnInit(): void {
    if (this.urlYoutube != null) {
      this.addVideoYoutube();
    }
    if (this.embedYoutube != null) {
      this.showEmbedYoutube();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.urlYoutube != null) {
      this.addVideoYoutube();
    }
    if (this.embedYoutube != null) {
      this.showEmbedYoutube();
    }
  }
  form: UntypedFormGroup;
  @Input()
  urlYoutube: string;

  @Input()
  embedYoutube: string;

  viewYoutube: SafeResourceUrl;

  @Output()
  onUrl = new EventEmitter<string>();


  addVideoYoutube() {
    if (this.validURL(this.urlYoutube)) {
      var youtube = this.getVideoIframe(this.urlYoutube);
      console.log(youtube['changingThisBreaksApplicationSecurity']);
      this.form.get('input').setValue(youtube['changingThisBreaksApplicationSecurity']);
      this.urlYoutube = "";
      var url: string = this.form.get('input').value;
      this.viewYoutube = this._sanitizer.bypassSecurityTrustResourceUrl(url);
      this.onUrl.emit(url);
    } else {
      this.toast.warning(
        'El link de acceso a youtube, no es valido',
        'Error en el link'
      );
      this.urlYoutube = "";
    }
  }
  showEmbedYoutube() {
    if (this.validURL(this.embedYoutube)) {
      this.form.get('input').setValue(this.embedYoutube);
      this.urlYoutube = "";
      var url: string = this.form.get('input').value;
      this.viewYoutube = this._sanitizer.bypassSecurityTrustResourceUrl(this.embedYoutube);
      this.onUrl.emit(url);
    } else {
      this.toast.warning(
        'El link de acceso a youtube, no es valido',
        'Error en el link'
      );
      this.urlYoutube = "";
    }
  }
  getVideoIframe(url) {
    var video, results;
    if (url === null) {
      return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video = results === null ? url : results[1];
    return this._sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.youtube.com/embed/' + video
    );
  }
  validURL(str) {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
      'i'
    ); // fragment locator
    return !!pattern.test(str);
  }
  openYoutube(inputTag: string, md: any) {
    this.modal.open(md, {
      size: 'md',
    });
  }
}
