// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Page in Spanish', () => {
  // Forzamos el idioma a español
  test.use({ 
    locale: 'es-ES'
  });

  test('should show the page in Spanish', async ({ page }) => {
    // Navegamos a la página
    await page.goto('/');

    // Verificamos que el contenido esté en español
    await expect(page.locator('button[data-i18n="searchButton"]')).toHaveText('Buscar con Google');
    await expect(page.locator('button[data-i18n="luckyButton"]')).toHaveText('Voy a tener suerte');
  });
});