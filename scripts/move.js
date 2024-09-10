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
        // exclude the site dir itself
        if (itemPath === siteDir) {
          return;
        }
        // exclude the node_modules
        if (itemPath.includes("node_modules")) {
          return;
        }
        const target = path.resolve(siteDir, path.basename(dir));
        // mkdir
        if (!fs.existsSync(target)) {
          fs.mkdirSync(target);
        }
        console.log(`move ${itemPath} to ${target}`);
        // deep copy the dir
        function copyDir(src, dest) {
          const dirs = fs.readdirSync(src);
          dirs.forEach((item) => {
            const itemPath = path.resolve(src, item);
            const targetPath = path.resolve(dest, item);
            const stat = fs.statSync(itemPath);
            if (stat.isDirectory()) {
              if (!fs.existsSync(targetPath)) {
                fs.mkdirSync(targetPath);
              }
              copyDir(itemPath, targetPath);
            } else {
              fs.copyFileSync(itemPath, targetPath);
            }
          });
        }
        copyDir(itemPath, target);
      } else {
        readDir(itemPath);
      }
    }
  });
}
readDir(root);
