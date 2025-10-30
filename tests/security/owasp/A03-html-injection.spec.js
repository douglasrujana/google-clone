import { test, expect } from '@playwright/test';

/**
 * @description
 * OWASP A03:2021-Injection
 * Test suite for HTML Injection vulnerabilities.
 * In this test, we will check if the application is vulnerable to HTML Injection
 * by injecting a simple HTML tag and verifying it is not rendered.
 */

test.describe('OWASP A03:2021-Injection', () => {
  // Test case for HTML Injection
  test('should not render an injected HTML tag from a URL parameter', async ({ page }) => {
    // Malicious HTML payload
    const htmlPayload = '<h1>Injected</h1>';
    const encodedPayload = encodeURIComponent(htmlPayload);

    // Navigate to the page with the malicious payload in the URL
    await page.goto(`/?q=${encodedPayload}`);

    // The input field should contain the decoded payload
    const searchInput = page.locator('#search-input');
    await expect(searchInput).toHaveValue(htmlPayload);

    // The injected H1 tag should NOT be present in the DOM
    // This is the key security check. If the tag exists, the app is vulnerable.
    const injectedElement = page.locator('h1:has-text("Injected")');
    await expect(injectedElement).not.toBeVisible();
  });
});