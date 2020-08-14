import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements OnInit, AfterViewInit {

  @ViewChild('expandWrapper', { static: false, read: ElementRef }) expandWrapper: ElementRef;
  // tslint:disable-next-line:no-input-rename
  @Input('expanded') expanded = false;
  // tslint:disable-next-line:no-input-rename
  @Input('expandHeight') expandHeight = '150px';

  constructor(public renderer: Renderer2) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.renderer.setStyle(this.expandWrapper.nativeElement, 'max-height', this.expandHeight);
  }
}
