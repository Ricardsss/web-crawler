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

const getURLsFromHTML = (htmlBody, baseURL) => {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const aElements = dom.window.document.querySelectorAll("a");
  for (const aElement of aElements) {
    if (aElement.href.slice(0, 1) === "/") {
      try {
        urls.push(new URL(aElement.href, baseURL).href);
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`);
      }
    } else {
      try {
        urls.push(new URL(aElement.href).href);
      } catch (err) {
        console.log(`${err.message}: ${aElement.href}`);
      }
    }
  }
  return urls;
};

const crawlPage = async (baseURL, currentURL, pages) => {
  const base = new URL(baseURL);
  const current = new URL(currentURL);
  if (base.hostname !== current.hostname) {
    return pages;
  } else {
    const normalizedCurrent = normalizeURL(currentURL);
    if (pages[normalizedCurrent] > 0) {
      pages[normalizedCurrent]++;
      return pages;
    } else {
      pages[normalizedCurrent] = 1;
      let htmlBody;
      try {
        const response = await fetch(currentURL);
        if (response.status > 399) {
          console.error(`Got error with status ${response.status}.`);
          return pages;
        } else if (
          !response.headers.get("content-type").includes("text/html")
        ) {
          console.error(
            `The response is not html, it is ${response.headers.get(
              "content-type"
            )}.`
          );
          return pages;
        } else {
          htmlBody = await response.text();
        }
      } catch (error) {
        console.log(error.message);
      }
      const pageUrls = getURLsFromHTML(htmlBody, baseURL);
      for (const pageUrl of pageUrls) {
        pages = await crawlPage(baseURL, pageUrl, pages);
      }
      return pages;
    }
  }
};

module.exports = { normalizeURL, getURLsFromHTML, crawlPage };
