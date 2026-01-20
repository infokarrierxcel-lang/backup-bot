import archiver from "archiver";
import fs from "fs";

export const zipFolder = (source, out) =>
  new Promise((resolve) => {
    const archive = archiver("zip");
    const stream = fs.createWriteStream(out);

    archive.directory(source, false);
    archive.pipe(stream);
    archive.finalize();

    stream.on("close", resolve);
  });
