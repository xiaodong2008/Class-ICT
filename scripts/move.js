const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "../");
const siteDir = path.resolve(root, "site");
if (!fs.existsSync(siteDir)) {
  fs.mkdirSync(siteDir);
}

// start
function readDir(dir) {
  // read all directorys inside the dir
  const dirs = fs.readdirSync(dir);
  dirs.forEach((item) => {
    const itemPath = path.resolve(dir, item);
    const stat = fs.statSync(itemPath);
    if (stat.isDirectory()) {
      // if the dir is a site project, then move it to the site dir
      if (item === "site") {
        const target = path.resolve(siteDir, path.basename(dir));
        fs.renameSync(dir, target);
        console.log(`move ${dir} to ${target}`);
      } else {
        readDir(itemPath);
      }
    }
  });
}
readDir(root);
