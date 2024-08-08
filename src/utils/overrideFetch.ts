const EXTERNAL_DEP_PATH = "/external_deps";
const RESOURCES_MAPPING = {
  "coconut-xr.github.io/xsounds/plop.mp3": `${EXTERNAL_DEP_PATH}/plop.mp3`,
};

function getLocalResourceUrl(resourceUrl: string) {
  for (const [key, value] of Object.entries(RESOURCES_MAPPING)) {
    if (resourceUrl.includes(key)) {
      return value;
    }
  }
  return null;
}

export function overrideFetch() {
  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    const [resource, config] = args;
    const resourceUrl = resource instanceof Request ? resource.url : resource;
    const localResource = getLocalResourceUrl(String(resourceUrl)) ?? resource;

    if (localResource !== resource) {
      if (resource instanceof Request) {
        const newRequest = new Request(localResource, {
          method: resource.method,
          headers: resource.headers,
          mode: resource.mode,
          credentials: resource.credentials,
          cache: resource.cache,
          redirect: resource.redirect,
          referrer: resource.referrer,
          referrerPolicy: resource.referrerPolicy,
          integrity: resource.integrity,
          keepalive: resource.keepalive,
          signal: resource.signal,
        });
        return originalFetch(newRequest, config);
      } else {
        return originalFetch(localResource, config);
      }
    }

    return originalFetch(resource, config);
  };
}
