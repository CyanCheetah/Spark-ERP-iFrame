/**
 * Open Assistant Framework (OAF) client.
 * Stub implementation for build and local dev when not embedded in Coupa.
 * Replace with full SDK when available from Coupa.
 */

const noopResolve = (data = { status: "success", message: "OK" }) =>
  Promise.resolve(data);

function createStubEvents() {
  const listeners = {};
  return {
    on(e, fn) {
      if (!listeners[e]) listeners[e] = [];
      listeners[e].push(fn);
    },
    off(e, fn) {
      if (!listeners[e]) return;
      listeners[e] = listeners[e].filter((f) => f !== fn);
    },
    emit(e, ...args) {
      (listeners[e] || []).forEach((fn) => fn(...args));
    },
  };
}

function createStubApp() {
  const events = createStubEvents();
  return {
    setSize: () => noopResolve(),
    moveToLocation: () => noopResolve(),
    getPageContext: () =>
      noopResolve({
        status: "success",
        data: {
          pageDetails: {
            viewPortHeight: window?.innerHeight ?? 800,
            viewPortWidth: window?.innerWidth ?? 1200,
          },
        },
      }),
    moveAndResize: () => noopResolve(),
    navigateToPath: () => noopResolve(),
    readForm: () => noopResolve(),
    writeForm: () => noopResolve(),
    listenToDataLocation: () => noopResolve(),
    listenToOafEvents: () => noopResolve(),
    getElementMeta: () => noopResolve(),
    events,
    enterprise: {
      openEasyForm: () => noopResolve(),
      launchUiButtonClickProcess: () => noopResolve(),
    },
  };
}

/**
 * Initialize the OAF instance with the given config.
 * @param {Object} config - { appId, coupahost, iframeId }
 * @returns {Object} OAF app instance
 */
export function initOAFInstance(config) {
  if (!config) {
    throw new Error("OAF config is required");
  }
  return createStubApp();
}
