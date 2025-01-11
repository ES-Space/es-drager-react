/**
 * get all have data-drager attribute elements
 */
export function getDragerElements(): HTMLElement[] {
  return Array.from(document.querySelectorAll('[data-drager]'))
}
