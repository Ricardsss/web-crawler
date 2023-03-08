const { crawlPage } = require("./crawl");

function main() {
  if (process.argv.length !== 3) {
    console.error("Must provide exactly one base url.");
    process.exit();
  } else {
    console.log(`The crawler has started at ${process.argv[2]}.`);
    crawlPage(process.argv[2], {});
  }
}
main();
