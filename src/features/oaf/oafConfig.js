import { CONFIG_PROPS } from "./oafConstants";

// URL params are only available in the browser. At build time (e.g. Vercel) document is undefined.
const getUrlParams = () =>
  typeof window !== "undefined"
    ? new URLSearchParams(window.document.location.search)
    : new URLSearchParams();

const urlParams = getUrlParams();

/**
 * Determines the Coupa host URL based on environment and URL parameters.
 * @returns {string} The Coupa host URL.
 */
const getCoupaHost = () => {
  if (!import.meta.env.PROD) {
    return CONFIG_PROPS.HOST_URLS.LOCALHOST;
  }
  const host = urlParams.get(CONFIG_PROPS.URL_PARAMS.COUPA_HOST);
  if (!host) {
    console.warn("No Coupa host found in URL parameters, using default host");
  }
  return host
    ? `${CONFIG_PROPS.HOST_URLS.HTTPS_PROTOCOL}${host}`
    : CONFIG_PROPS.HOST_URLS.DEFAULT_HOST;
};

/**
 * Validates the configuration object.
 * Iframe ID is only required at runtime when the app is loaded in the browser inside Coupa (URL has params).
 * At build time (e.g. Vercel) there is no document/window or URL params, so we skip iframeId check then.
 * @param {OafConfig} config - Configuration to validate
 * @throws {Error} If required properties are missing
 */
const validateConfig = (config) => {
  if (!config.appId) {
    throw new Error("App ID is required for OAF configuration");
  }
  if (!config.coupahost) {
    throw new Error("Coupa host is required for OAF configuration");
  }
  const isBuildTime = typeof window === "undefined";
  if (!config.iframeId && import.meta.env.PROD && !isBuildTime) {
    throw new Error("Iframe ID not found in URL parameters");
  }
};

/**
 * Configuration object for the OAF (Open Assistant Framework) feature.
 *
 * @typedef {Object} OafConfig
 * @property {string} appId - The unique application identifier for OAF registration
 * @property {string} coupahost - The Coupa host URL, automatically determined based on environment and URL parameters
 * @property {string|null} iframeId - The ID of the floating iframe element, extracted from URL parameters (may be null)
 */
const config = {
  appId: CONFIG_PROPS.APP_ID,
  coupahost: getCoupaHost(),
  iframeId: urlParams.get(CONFIG_PROPS.URL_PARAMS.IFRAME_ID),
};

// Validate configuration before exporting
validateConfig(config);

export default config;
