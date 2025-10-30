import { describe, it, expect, beforeEach } from 'vitest';
import { setDynamicYear } from '../../assets/js/utils';

describe('setDynamicYear', () => {
  let element;

  beforeEach(() => {
    // Creamos un elemento simulado antes de cada prueba
    element = document.createElement('div');
    element.id = 'test-year';
    document.body.appendChild(element);
  });

  it('should set the current year as the text content of the element', () => {
    setDynamicYear('test-year');
    const currentYear = new Date().getFullYear().toString();
    expect(element.textContent).toBe(currentYear);
  });

  it('should not throw an error if the element does not exist', () => {
    expect(() => setDynamicYear('non-existent-element')).not.toThrow();
  });
});