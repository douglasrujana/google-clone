import { test, expect } from '@playwright/test';

/**
 * @description
 * OWASP A03:2021-Injection
 * Test suite for DOM-based XSS vulnerabilities in the i18n library.
 * This test checks if the application is vulnerable to DOM-based XSS by
 * manipulating the language settings through URL parameters.
 */
test.describe('OWASP A03:2021-Injection', () => {
  // Test case for DOM-based XSS
  test('should not execute a DOM-based XSS script via i18next translation override', async ({ page }) => {
    // This payload will be used as a translation key. When i18next can't find a key,
    // it returns the key itself. With escapeValue: false, this key (our payload) would be
    // rendered as HTML if the app were vulnerable.
    const xssPayload = '<img src=x onerror=window.XSS_TRIGGERED=true>';
    const encodedPayload = encodeURIComponent(xssPayload);

    // We use the `lng` and `i18next_git` query parameters to control the translation.
    await page.goto(`/?lng=en&i18next_git=${encodedPayload}`);

    // Give the page a moment to process the script (if it were to execute).
    await page.waitForTimeout(1000);

    // The script should NOT have executed, so the global flag should be undefined.
    const xssTriggered = await page.evaluate(() => window.XSS_TRIGGERED);
    expect(xssTriggered).toBeUndefined();
  });
});