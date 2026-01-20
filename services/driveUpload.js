import { google } from "googleapis";
import fs from "fs";

let auth;

if (process.env.GOOGLE_SERVICE_ACCOUNT) {
  // Render
  auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT),
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
} else {
  // Local
  auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
}

export const uploadToDrive = async (filePath) => {
  const drive = google.drive({ version: "v3", auth });

  await drive.files.create({
    requestBody: {
      name: filePath.split("/").pop(),
      parents: [process.env.DRIVE_FOLDER_ID],
    },
    media: {
      mimeType: "application/zip",
      body: fs.createReadStream(filePath),
    },
  });
};
