PS C:\MyCode\portafolio\html\google.com> npx playwright test

Running 6 tests using 2 workers

  1) [chromium] › tests\language.spec.js:8:3 › Language Switching (ES -> EN) › should start in Spanish and switch to English

    Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
    Call log:
      - navigating to "/", waiting until "load"


       7 |
       8 |   test('should start in Spanish and switch to English', async ({ page }) => {
    >  9 |     await page.goto('/');
         |                ^
      10 |
      11 |     // Verificamos que el estado inicial es español
      12 |     await expect(page.locator('button[data-i18n="searchButton"]')).toHaveText('Buscar con Google');
        at C:\MyCode\portafolio\html\google.com\tests\language.spec.js:9:16

  2) [chromium] › tests\language.spec.js:27:3 › Language Switching (EN -> ES) › should start in English and switch to Spanish

    Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
    Call log:
      - navigating to "/", waiting until "load"


      26 |
      27 |   test('should start in English and switch to Spanish', async ({ page }) => {
    > 28 |     await page.goto('/');
         |                ^
      29 |
      30 |     // Verificamos que el estado inicial es inglés
      31 |     await expect(page.locator('button[data-i18n="searchButton"]')).toHaveText('Google Search');
        at C:\MyCode\portafolio\html\google.com\tests\language.spec.js:28:16

  3) [firefox] › tests\language.spec.js:27:3 › Language Switching (EN -> ES) › should start in English and switch to Spanish

    Error: page.goto: Protocol error (Page.navigate): Invalid url: "/"
    Call log:
      - navigating to "/", waiting until "load"


      26 |
      27 |   test('should start in English and switch to Spanish', async ({ page }) => {
    > 28 |     await page.goto('/');
         |                ^
      29 |
      30 |     // Verificamos que el estado inicial es inglés
      31 |     await expect(page.locator('button[data-i18n="searchButton"]')).toHaveText('Google Search');
        at C:\MyCode\portafolio\html\google.com\tests\language.spec.js:28:16

  4) [firefox] › tests\language.spec.js:8:3 › Language Switching (ES -> EN) › should start in Spanish and switch to English

    Error: page.goto: Protocol error (Page.navigate): Invalid url: "/"
    Call log:
      - navigating to "/", waiting until "load"


       7 |
       8 |   test('should start in Spanish and switch to English', async ({ page }) => {
    >  9 |     await page.goto('/');
         |                ^
      10 |
      11 |     // Verificamos que el estado inicial es español
      12 |     await expect(page.locator('button[data-i18n="searchButton"]')).toHaveText('Buscar con Google');
        at C:\MyCode\portafolio\html\google.com\tests\language.spec.js:9:16

  5) [webkit] › tests\language.spec.js:8:3 › Language Switching (ES -> EN) › should start in Spanish and switch to English

    Error: page.goto: Protocol error (Playwright.navigate): Cannot navigate to invalid URL
    Call log:
      - navigating to "/", waiting until "load"


       7 |
       8 |   test('should start in Spanish and switch to English', async ({ page }) => {
    >  9 |     await page.goto('/');
         |                ^
      10 |
      11 |     // Verificamos que el estado inicial es español
      12 |     await expect(page.locator('button[data-i18n="searchButton"]')).toHaveText('Buscar con Google');
        at C:\MyCode\portafolio\html\google.com\tests\language.spec.js:9:16

  6) [webkit] › tests\language.spec.js:27:3 › Language Switching (EN -> ES) › should start in English and switch to Spanish

    Error: page.goto: Protocol error (Playwright.navigate): Cannot navigate to invalid URL
    Call log:
      - navigating to "/", waiting until "load"


      26 |
      27 |   test('should start in English and switch to Spanish', async ({ page }) => {
    > 28 |     await page.goto('/');
         |                ^
      29 |
      30 |     // Verificamos que el estado inicial es inglés
      31 |     await expect(page.locator('button[data-i18n="searchButton"]')).toHaveText('Google Search');
        at C:\MyCode\portafolio\html\google.com\tests\language.spec.js:28:16

  6 failed
    [chromium] › tests\language.spec.js:8:3 › Language Switching (ES -> EN) › should start in Spanish and switch to English
    [chromium] › tests\language.spec.js:27:3 › Language Switching (EN -> ES) › should start in English and switch to Spanish
    [firefox] › tests\language.spec.js:8:3 › Language Switching (ES -> EN) › should start in Spanish and switch to English
    [firefox] › tests\language.spec.js:27:3 › Language Switching (EN -> ES) › should start in English and switch to Spanish
    [webkit] › tests\language.spec.js:8:3 › Language Switching (ES -> EN) › should start in Spanish and switch to English
    [webkit] › tests\language.spec.js:27:3 › Language Switching (EN -> ES) › should start in English and switch to Spanish

  Serving HTML report at <http://localhost:45997>. Press Ctrl+C to quit.
