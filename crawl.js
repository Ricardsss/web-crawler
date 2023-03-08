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

const crawlPage = async (baseURL, currentURL, pages) => {
  try {
    const response = await fetch(baseURL);
    if (response.status > 399) {
      console.error(`Got error with status ${response.status}.`);
      return;
    } else if (!response.headers.get("content-type").includes("text/html")) {
      console.error(
        `The response is not html, it is ${response.headers.get(
          "content-type"
        )}.`
      );
      return;
    } else {
      console.log(await response.text());
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { normalizeURL, getURLsFromHTML, crawlPage };
