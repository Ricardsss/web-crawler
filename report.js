const sortPages = (pages) => {
  const sorted = [];
  for (const page in pages) {
    sorted.push([page, pages[page]]);
  }
  sorted.sort((a, b) => {
    return b[1] - a[1];
  });
  return sorted;
};

const printReport = (pages) => {
  console.log("The report is starting...");
  const sortedPages = sortPages(pages);
  sortedPages.forEach((page) => {
    console.log(
      page[1] > 1
        ? `Found ${page[1]} internal links for ${page[0]}.`
        : `Found ${page[1]} internal link for ${page[0]}.`
    );
  });
  console.log("The report is complete.");
};

module.exports = printReport;
