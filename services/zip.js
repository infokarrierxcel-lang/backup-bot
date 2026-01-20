import archiver from "archiver";
import fs from "fs";

export const zipFolder = (source, out) => {
  new Promise((resolve, reject) => {
    const archive = archiver("zip", { zlib: { level: 9 } });
    const stream = fs.createWriteStream(out);

    archive.directory(source, false);
    archive.pipe(stream);

    archive.finalize();

    stream.on("close", resolve);
    archive.on("error", reject);
  });
};
