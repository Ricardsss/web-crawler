const { crawlPage } = require("./crawl");

async function main() {
  if (process.argv.length !== 3) {
    console.error("Must provide exactly one base url.");
    process.exit();
  } else {
    console.log(`The crawler has started at ${process.argv[2]}.`);
    const pages = await crawlPage(process.argv[2], process.argv[2], {});
    console.log(pages);
  }
}
main();
