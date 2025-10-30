// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Page in English', () => {
  // Forzamos el idioma a inglés
  test.use({ 
    locale: 'en-US'
  });

  test('should show the page in English', async ({ page }) => {
    // Navegamos a la página
    await page.goto('/');

    // Verificamos que el contenido esté en inglés
    await expect(page.locator('button[data-i18n="searchButton"]')).toHaveText('Google Search');
    await expect(page.locator('button[data-i18n="luckyButton"]')).toHaveText("I'm Feeling Lucky");
  });
});