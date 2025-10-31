import { test, expect } from '@playwright/test';

/**
 * @description
 * OWASP A05:2021-Security Misconfiguration
 * Test suite for sensitive file exposure.
 * This test checks if the .git directory is publicly accessible, which is a common security misconfiguration.
 */
test.describe('OWASP A05:2021-Security Misconfiguration', () => {
  // Test case for sensitive file exposure
  test('should not allow access to sensitive .git/config file', async ({ page }) => {
    // Attempt to fetch a sensitive file from the .git directory
    const response = await page.goto('/.git/config');

    // Check if the response was successful
    const isOk = response && response.ok();

    // The request for a sensitive file should NOT be successful.
    // A successful response (status 200-299) indicates a vulnerability.
    expect(isOk).toBe(false);
  });
});