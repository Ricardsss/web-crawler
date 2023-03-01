const normalizeURL = (urlString) => {
  if (!urlString) {
    return "";
  }
  const url = new URL(urlString);
  const host = url.hostname;
  const path = url.pathname.endsWith("/")
    ? url.pathname.slice(0, -1)
    : url.pathname;
  return `${host}${path}`;
};

module.exports = { normalizeURL };
