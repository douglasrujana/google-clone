:13:08 a. m. [vite] Internal server error: Failed to resolve import "./auth.js" from "assets/js/main.js". Does the file exist?
  Plugin: vite:import-analysis
  File: C:/MyCode/portafolio/html/google.com/assets/js/main.js:4:26
  2  |  import { initI18n } from './i18n.js';
  3  |  import { updateCurrentYear } from './utils.js';
  4  |  import { initAuth } from './auth.js';
     |                            ^
  5  |
  6  |  document.addEventListener('DOMContentLoaded', () => {
      at TransformPluginContext._formatLog (file:///C:/MyCode/portafolio/html/google.com/node_modules/vite/dist/node/chunks/config.js:31106:43)
      at TransformPluginContext.error (file:///C:/MyCode/portafolio/html/google.com/node_modules/vite/dist/node/chunks/config.js:31103:14)
      at normalizeUrl (file:///C:/MyCode/portafolio/html/google.com/node_modules/vite/dist/node/chunks/config.js:29590:18)
      at async file:///C:/MyCode/portafolio/html/google.com/node_modules/vite/dist/node/chunks/config.js:29648:32
      at async Promise.all (index 3)
      at async TransformPluginContext.transform (file:///C:/MyCode/portafolio/html/google.com/node_modules/vite/dist/node/chunks/config.js:29616:4)
      at async EnvironmentPluginContainer.transform (file:///C:/MyCode/portafolio/html/google.com/node_modules/vite/dist/node/chunks/config.js:30905:14)
      at async loadAndTransform (file:///C:/MyCode/portafolio/html/google.com/node_modules/vite/dist/node/chunks/config.js:26043:26)
      at async viteTransformMiddleware (file:///C:/MyCode/portafolio/html/google.com/node_modules/vite/dist/node/chunks/config.js:27118:20)
