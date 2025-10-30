import { test, expect } from '@playwright/test';

/**
 * @description
 * PRUEBA DE SEGURIDAD: Inyección (Cross-Site Scripting Reflejado)
 * OWASP Top 10: A03:2021-Injection
 *
 * @vulnerability
 * El Cross-Site Scripting (XSS) Reflejado ocurre cuando una aplicación web
 * recibe datos en una petición HTTP y los incluye en la respuesta
 * de manera insegura. En este caso, un atacante puede crear una URL
 * que contenga un script malicioso y engañar a un usuario para que haga clic en ella.
 * Si la aplicación no sanitiza correctamente la entrada de la URL, el script
 * se ejecutará en el navegador de la víctima, permitiendo al atacante
 * robar cookies, tokens de sesión o realizar acciones en nombre del usuario.
 *
 * @test-flow
 * 1. Navegamos a la página principal con un parámetro de búsqueda en la URL
 *    que contiene un script malicioso.
 * 2. Escuchamos si se dispara un evento 'dialog' (como un alert).
 * 3. Verificamos que NINGÚN diálogo se haya abierto. Si se abre,
 *    significa que el script se ejecutó y la aplicación es vulnerable.
 *
 * @mitigation
 * Para prevenir esta vulnerabilidad, cualquier dato proveniente de fuentes
 * no confiables (como los parámetros de la URL) debe ser sanitizado
 * o escapado antes de ser renderizado en la página. Las librerías de
 * plantillas modernas suelen hacer esto por defecto, pero es crucial
 * no insertar HTML directamente en el DOM sin el debido cuidado
 * (por ejemplo, usando `element.innerHTML = unsanitizedData`).
 */
test.describe('OWASP A03:2021-Injection', () => {
  test('should not execute a reflected XSS script from a URL parameter', async ({ page }) => {
    let dialogTriggered = false;

    // Escuchamos si se dispara un evento 'dialog' (como un alert, confirm o prompt)
    page.on('dialog', () => {
      dialogTriggered = true;
    });

    // 1. Navegamos a la página con un script malicioso en el parámetro de búsqueda 'q'
    await page.goto('/?q=<script>alert("XSS-VULNERABILITY-DETECTED")</script>');

    // 2. Verificamos que el diálogo NUNCA se haya disparado
    // Si dialogTriggered es true, la prueba fallará, indicando una vulnerabilidad.
    expect(dialogTriggered).toBe(false, 'A dialog was triggered, indicating a potential XSS vulnerability.');

    // 3. (Opcional pero recomendado) Verificamos que el script se renderizó como texto
    // y no se interpretó como HTML.
    const searchValue = await page.inputValue('input[name="q"]');
    expect(searchValue).toBe('<script>alert("XSS-VULNERABILITY-DETECTED")</script>');
  });
});
