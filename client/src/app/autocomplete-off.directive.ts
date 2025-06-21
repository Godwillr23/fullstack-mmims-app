import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  standalone: false,
  selector: '[appAutocompleteOff]'  // this will be used like: <input appAutocompleteOff>
})
export class AutocompleteOffDirective implements AfterViewInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const element = this.el.nativeElement;
    if (element.tagName === 'INPUT') {
      this.renderer.setAttribute(element, 'autocomplete', 'off');
    }
  }
}
