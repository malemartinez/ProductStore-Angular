import { ElementRef, asNativeElements } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  it('should create an instance', () => {
    const directive = new HighlightDirective(new ElementRef(asNativeElements));
    expect(directive).toBeTruthy();
  });
});
