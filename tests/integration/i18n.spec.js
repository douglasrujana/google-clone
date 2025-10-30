import { test, expect } from '@playwright/test';

test.describe('i18next integration', () => {
  test('should initialize i18next and load translations', async ({ page }) => {
    await page.goto('/index.html');

    // Espera a que i18next se inicialice
    await page.waitForFunction(() => window.i18next.isInitialized);

    // Verifica que el idioma detectado (por ejemplo, inglés) se haya cargado
    const loadedLanguages = await page.evaluate(() => Object.keys(window.i18next.services.resourceStore.data));
    expect(loadedLanguages).toContain('en');

    // Verifica que una clave de traducción existe en el recurso cargado
    const hasTitleKey = await page.evaluate(() => window.i18next.exists('title', { lng: 'en' }));
    expect(hasTitleKey).toBe(true);
  });
});