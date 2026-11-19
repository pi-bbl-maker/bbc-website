/**
 * BUFFALO BACK LABS - GOOGLE APPS SCRIPT WEBHOOK
 * -------------------------------------------------------------
 * Connects the Buffalo Back Labs (bbc-website) contact form directly to:
 * 1. A Google Sheet (auto-logging all incoming partner & collective inquiries)
 * 2. Instant notification emails to labs@buffaloback.in
 *
 * SETUP INSTRUCTIONS (Takes ~2 minutes):
 * 1. Open Google Sheets (https://sheets.new) and create a new spreadsheet.
 * 2. Name it "BBL Website Inquiries".
 * 3. In the top menu, click Extensions > Apps Script.
 * 4. Paste this entire file into the editor (replacing any default code in Code.gs).
 * 5. Click "Deploy" (top right) > "New deployment".
 * 6. Under "Select type", choose "Web app".
 *    - Description: "BBL Website Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (Required so the public website form can POST data)
 * 7. Click "Deploy", authorize permissions when prompted, and copy the "Web App URL"
 *    (e.g., https://script.google.com/macros/s/AKfycb.../exec).
 * 8. Add this URL to your environment as `VITE_CONTACT_WEBHOOK_URL` in `.env.local`
 *    or hosting environment variables.
 */

const NOTIFICATION_EMAIL = "labs@buffaloback.in";
const SHEET_NAME = "Website Inquiries";

/**
 * Anti-Spam Heuristic: Flags unspaced mixed-case strings (> 15 chars) common in automated bot spam
 */
function isSuspiciousPattern(str) {
  if (!str || typeof str !== "string") return false;
  const tokens = str.split(/\s+/);
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.indexOf("http://") !== -1 || token.indexOf("https://") !== -1 || token.indexOf("@") !== -1) {
      continue;
    }
    if (token.length > 15 && /[a-z]/.test(token) && /[A-Z]/.test(token)) {
      return true;
    }
  }
  return false;
}

/**
 * URL Checker: Identifies any links or protocol strings
 */
function containsUrl(str) {
  if (!str || typeof str !== "string") return false;
  return /https?:\/\//i.test(str);
}

function doPost(e) {
  try {
    let data;
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      throw new Error("No data received");
    }

    // 1. Honeypot check: silently drop bots if hidden honeypot was filled
    const honeypot = (data && data.company_website_url) || (e.parameter && e.parameter.company_website_url);
    if (honeypot) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "success", message: "Inquiry processed." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Elapsed time check: silently drop bots submitting in under 1.5 seconds (< 1500ms)
    const elapsedMs = Number((data && data.elapsed_ms) || (e.parameter && e.parameter.elapsed_ms) || 0);
    if (elapsedMs > 0 && elapsedMs < 1500) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "success", message: "Inquiry processed." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 3. URL blocking: reject any links/URLs (http:// or https://) in message, name, or org
    if (
      containsUrl(data.message) ||
      containsUrl(data.name) ||
      containsUrl(data.org) ||
      containsUrl(data.organization)
    ) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "success", message: "Inquiry processed." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 4. Anti-spam heuristic
    if (
      isSuspiciousPattern(data.name) ||
      isSuspiciousPattern(data.message) ||
      isSuspiciousPattern(data.org)
    ) {
      return ContentService
        .createTextOutput(JSON.stringify({ status: "success", message: "Inquiry processed." }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    
    // Auto-create sheet with headers if missing
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      const headers = [
        "Timestamp",
        "Name",
        "Organization",
        "Email",
        "Topic",
        "Message",
        "Elapsed (ms)"
      ];
      sheet.appendRow(headers);
      sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#003149").setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }

    const timestamp = data.timestamp || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    const name = (data.name || "").trim() || "N/A";
    const org = (data.org || data.organization || "").trim() || "Individual / Unspecified";
    const email = (data.email || "").trim() || "N/A";
    const topic = (data.topic || "General").trim();
    const message = (data.message || "").trim() || "N/A";

    // 1. Append row to Google Sheet
    sheet.appendRow([
      timestamp,
      name,
      org,
      email,
      topic,
      message,
      elapsedMs || "N/A"
    ]);

    // 2. Email alert to labs@buffaloback.in
    const emailSubject = `[BBL Contact] ${topic}: ${name} (${org})`;
    const htmlBody = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; background: #ffffff;">
        <div style="background-color: #003149; color: #ffffff; padding: 24px; text-align: left;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 500; letter-spacing: 0.5px;">Buffalo Back Labs</h2>
          <p style="margin: 6px 0 0 0; color: #e5b622; font-size: 13px; font-weight: 500;">New Inbound Inquiry • ${topic}</p>
        </div>
        
        <div style="padding: 24px; color: #1f2937;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: 600; color: #4b5563; width: 35%;">Name:</td>
              <td style="padding: 10px 0; color: #111827;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: 600; color: #4b5563;">Organization:</td>
              <td style="padding: 10px 0; color: #111827;">${org}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: 600; color: #4b5563;">Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #003149; text-decoration: underline; font-weight: 500;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f3f4f6;">
              <td style="padding: 10px 0; font-weight: 600; color: #4b5563;">Topic:</td>
              <td style="padding: 10px 0; color: #111827;">${topic}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; font-weight: 600; color: #4b5563; vertical-align: top;">Message:</td>
              <td style="padding: 12px 0; color: #111827; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 12px; background-color: #f9fafb; border-radius: 6px; font-size: 11px; color: #6b7280; font-family: monospace;">
            Timestamp: ${timestamp} • Interaction Time: ${elapsedMs ? (elapsedMs / 1000).toFixed(1) + "s" : "N/A"}
          </div>
        </div>

        <div style="background-color: #faf9f6; padding: 12px 24px; font-size: 11px; color: #6b7280; border-top: 1px solid #e5e7eb; text-align: center;">
          Buffalo Back Labs (OPC) Private Limited • <a href="https://bbl-website.web.app" style="color: #003149;">bbl-website.web.app</a>
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: NOTIFICATION_EMAIL,
      subject: emailSubject,
      htmlBody: htmlBody,
      replyTo: email !== "N/A" ? email : undefined
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "Inquiry logged and email dispatched." }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", message: "Buffalo Back Labs Webhook is online." }))
    .setMimeType(ContentService.MimeType.JSON);
}
