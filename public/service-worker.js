const PATH_EXTERNAL_DEPS = "/external_deps";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("local-cache").then((cache) => {
      return cache.addAll([`${PATH_EXTERNAL_DEPS}/plop.mp3`]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.hostname === "coconut-xr.github.io" && url.pathname === "/plop.mp3") {
    event.respondWith(caches.match(`${PATH_EXTERNAL_DEPS}/plop.mp3`));
  }
});
