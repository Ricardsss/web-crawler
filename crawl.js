const { JSDOM } = require("jsdom");

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

const isValidURL = (urlString) => {
  try {
    return Boolean(new URL(urlString));
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getURLsFromHTML = (html, baseURL) => {
  const urls = [];
  const dom = new JSDOM(html);
  const aTags = dom.window.document.querySelectorAll("a");
  aTags.forEach((aTag) => {
    const urlString = aTag.href;
    if (isValidURL(urlString)) {
      urls.push(urlString);
    } else if (urlString.startsWith("/")) {
      urls.push(`${baseURL}${urlString}`);
    }
  });
  return urls;
};

module.exports = { normalizeURL, getURLsFromHTML };
