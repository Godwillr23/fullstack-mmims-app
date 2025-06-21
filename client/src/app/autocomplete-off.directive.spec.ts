import { ElementRef, Renderer2 } from '@angular/core';
import { AutocompleteOffDirective } from './autocomplete-off.directive';

describe('AutocompleteOffDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = new ElementRef(document.createElement('input'));

    // Mock only the needed method with proper casting
    const mockRenderer = {
      setAttribute: jasmine.createSpy('setAttribute')
    } as Partial<Renderer2> as Renderer2;

    const directive = new AutocompleteOffDirective(mockElementRef, mockRenderer);
    expect(directive).toBeTruthy();
    expect(mockRenderer.setAttribute).toHaveBeenCalledWith(
      mockElementRef.nativeElement,
      'autocomplete',
      'off'
    );
  });
});
