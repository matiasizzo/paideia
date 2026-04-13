import { google } from "googleapis";

function getAuth() {
  return new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

export default async function handler(req, res) {
  // Verificar credenciales
  const { user, password } = req.headers;
  if (user !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: "No autorizado" });
  }

  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: "v4", auth });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: "1bVCZzizc6B7unfZf0rXBgwtJZZGmVq1Bm2PaeDtylI0",
      range: "Hoja 1!A:H",
    });

    const rows = response.data.values || [];
    const headers = rows[0];
    const data = rows.slice(1).map((row) => ({
      fecha: row[0] || "",
      nombre: row[1] || "",
      email: row[2] || "",
      telefono: row[3] || "",
      turno: row[4] || "",
      estado: row[5] || "Pendiente",
      psicologo: row[6] || "",
      entrevistaCon: row[7] || "",
    }));

    return res.status(200).json({ data });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
}