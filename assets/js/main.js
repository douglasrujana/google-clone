import { setDynamicYear } from './utils.js';
import { initI18n } from './i18n.js';

/**
 * @description
 * Rellena el campo de búsqueda con el valor del parámetro 'q' de la URL.
 * Esto es esencial para simular y probar ataques de XSS reflejado.
 */
function populateSearchFromQuery() {
  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get('q');
  if (query) {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.value = query;
    }
  }
}

const main = async () => {
  setDynamicYear('current-year');
  await initI18n();
  populateSearchFromQuery();
};

window.addEventListener('DOMContentLoaded', main);