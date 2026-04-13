import { google } from "googleapis";

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { user, password } = req.headers;
  if (user !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "No autorizado" });
  }

  try {
    const { rowIndex, estado, psicologo, entrevistaCon } = req.body;
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    // rowIndex es el índice real en la sheet (1-based, +1 por el header)
    const range = `Hoja 1!F${rowIndex + 2}:H${rowIndex + 2}`;

    await sheets.spreadsheets.values.update({
      spreadsheetId: "1bVCZzizc6B7unfZf0rXBgwtJZZGmVq1Bm2PaeDtylI0",
      range,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[estado, psicologo, entrevistaCon]],
      },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}