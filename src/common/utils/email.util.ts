import nodemailer, { Transporter } from "nodemailer";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: this.configService.get<string>("EMAIL_USER"),
        pass: this.configService.get<string>("EMAIL_PASSWORD")
      },
    });
  }

  async sendApiKey(
    email: string,
    apiKey: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    const projectName = this.configService.get<string>("PROJECT_NAME");

    await this.transporter.sendMail({
      from: `"${projectName}" <${this.configService.get<string>("EMAIL_USER")}>`,
      to: email,
      subject: `${projectName} - Secure Verification Link`,
      text: `Your verification link is ${apiKey}. It expires in 10 minutes. IP: ${ipAddress}, Device: ${userAgent}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${projectName} API Key</title>
</head>

<body style="
margin:0;
padding:40px 20px;
font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
background:#eef2ff;
background-image:
radial-gradient(circle at top left,#6366f122 0%,transparent 35%),
radial-gradient(circle at top right,#84cc1622 0%,transparent 35%),
radial-gradient(circle at bottom,#f9731622 0%,transparent 40%);
">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
<tr>
<td align="center">

<table role="presentation"
style="
width:100%;
max-width:650px;
border-radius:28px;
overflow:hidden;
background:rgba(255,255,255,.65);
backdrop-filter:blur(24px);
-webkit-backdrop-filter:blur(24px);
border:1px solid rgba(255,255,255,.6);
box-shadow:
0 20px 60px rgba(79,70,229,.15),
0 10px 30px rgba(249,115,22,.08);
">

<!-- Header -->
<tr>
<td style="padding:45px 40px;text-align:center;">

<div style="
display:inline-block;
padding:10px 18px;
border-radius:999px;
background:rgba(99,102,241,.10);
color:#4338ca;
font-size:12px;
font-weight:700;
letter-spacing:2px;
text-transform:uppercase;
">
🚀 Next Generation API Platform
</div>

<h1 style="
margin:25px 0 10px;
font-size:34px;
font-weight:800;
color:#111827;
">
${projectName}
</h1>

<p style="
margin:0;
font-size:16px;
color:#6b7280;
line-height:28px;
">
Your API key has been generated successfully.
Keep it secure. Never share it publicly.
</p>

</td>
</tr>

<!-- API KEY -->
<tr>
<td style="padding:0 40px;">

<div style="
border-radius:22px;
padding:25px;
background:
linear-gradient(135deg,
rgba(99,102,241,.12),
rgba(249,115,22,.10),
rgba(132,204,22,.10));
border:1px solid rgba(99,102,241,.20);
">

<div style="
font-size:13px;
font-weight:700;
color:#4f46e5;
margin-bottom:12px;
letter-spacing:1px;
">
YOUR API KEY
</div>

<div style="
font-family:Consolas,monospace;
font-size:15px;
font-weight:700;
line-height:28px;
color:#111827;
word-break:break-all;
background:white;
padding:18px;
border-radius:14px;
border-left:6px solid #4f46e5;
">
${apiKey}
</div>

</div>

</td>
</tr>

<!-- Security -->
<tr>
<td style="padding:35px 40px;">

<div style="
display:flex;
gap:12px;
flex-wrap:wrap;
">

<div style="
display:inline-block;
padding:14px 18px;
border-radius:16px;
background:rgba(99,102,241,.08);
border:1px solid rgba(99,102,241,.15);
margin-bottom:10px;
">

<div style="color:#6366f1;font-size:12px;font-weight:700;">
IP ADDRESS
</div>

<div style="
margin-top:6px;
color:#111827;
font-size:14px;
font-weight:600;
">
${ipAddress || "Unknown"}
</div>

</div>

<div style="
display:inline-block;
padding:14px 18px;
border-radius:16px;
background:rgba(132,204,22,.10);
border:1px solid rgba(132,204,22,.20);
margin-bottom:10px;
">

<div style="color:#65a30d;font-size:12px;font-weight:700;">
DEVICE
</div>

<div style="
margin-top:6px;
color:#111827;
font-size:14px;
font-weight:600;
">
${userAgent || "Unknown Device"}
</div>

</div>

</div>

</td>
</tr>

<!-- Warning -->
<tr>
<td style="padding:0 40px 35px;">

<div style="
padding:22px;
border-radius:18px;
background:rgba(249,115,22,.08);
border-left:5px solid #f97316;
">

<div style="
font-size:17px;
font-weight:700;
color:#ea580c;
margin-bottom:10px;
">
🔒 Security Recommendations
</div>

<ul style="
padding-left:18px;
margin:0;
color:#444;
line-height:28px;
font-size:14px;
">
<li>Store this API key securely.</li>
<li>Never commit it to GitHub.</li>
<li>Do not share it with anyone.</li>
<li>Rotate the key immediately if you suspect exposure.</li>
</ul>

</div>

</td>
</tr>

<!-- Footer -->
<tr>
<td
style="
padding:28px;
text-align:center;
background:
linear-gradient(90deg,#4f46e5,#f97316,#84cc16);
">

<div style="
font-size:15px;
font-weight:700;
color:white;
">
${projectName}
</div>

<div style="
margin-top:8px;
font-size:13px;
color:rgba(255,255,255,.9);
">
© ${new Date().getFullYear()} ${projectName}. All Rights Reserved.
</div>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
    });
  }

  async NotificationEmail(
    email: string,
    notification: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<void> {
    const projectName = this.configService.get<string>("PROJECT_NAME");

    await this.transporter.sendMail({
      from: `"${projectName}" <${this.configService.get<string>("EMAIL_USER")}>`,
      to: email,
      subject: `${projectName} - System Notification`,
      text: `${projectName}: ${notification}. IP: ${ipAddress}, Device: ${userAgent}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${projectName} Notification</title>
</head>

<body style="
margin:0;
padding:40px 20px;
font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;
background:#eef2ff;
background-image:
radial-gradient(circle at top left,#6366f122 0%,transparent 35%),
radial-gradient(circle at top right,#84cc1622 0%,transparent 35%),
radial-gradient(circle at bottom,#f9731622 0%,transparent 40%);
">

<table role="presentation" width="100%" cellspacing="0" cellpadding="0">
<tr>
<td align="center">

<table role="presentation"
style="
width:100%;
max-width:650px;
border-radius:28px;
overflow:hidden;
background:rgba(255,255,255,.65);
backdrop-filter:blur(24px);
-webkit-backdrop-filter:blur(24px);
border:1px solid rgba(255,255,255,.6);
box-shadow:
0 20px 60px rgba(79,70,229,.15),
0 10px 30px rgba(249,115,22,.08);
">

<!-- Header -->
<tr>
<td style="padding:45px 40px;text-align:center;">

<div style="
display:inline-block;
padding:10px 18px;
border-radius:999px;
background:rgba(99,102,241,.10);
color:#4338ca;
font-size:12px;
font-weight:700;
letter-spacing:2px;
text-transform:uppercase;
">
🔔 System Notification
</div>

<h1 style="
margin:25px 0 10px;
font-size:34px;
font-weight:800;
color:#111827;
">
${projectName}
</h1>

<p style="
margin:0;
font-size:16px;
color:#6b7280;
line-height:28px;
">
We've sent you an important notification regarding your account.
</p>

</td>
</tr>

<!-- Notification -->
<tr>
<td style="padding:0 40px;">

<div style="
border-radius:22px;
padding:25px;
background:
linear-gradient(
135deg,
rgba(99,102,241,.12),
rgba(249,115,22,.10),
rgba(132,204,22,.10)
);
border:1px solid rgba(99,102,241,.20);
">

<div style="
font-size:13px;
font-weight:700;
color:#4f46e5;
margin-bottom:12px;
letter-spacing:1px;
">
MESSAGE
</div>

<div style="
background:white;
padding:20px;
border-radius:14px;
border-left:6px solid #4f46e5;
color:#111827;
font-size:15px;
line-height:28px;
font-weight:500;
">
${notification}
</div>

</div>

</td>
</tr>

<!-- Request Details -->
<tr>
<td style="padding:35px 40px;">

<div style="
display:flex;
gap:12px;
flex-wrap:wrap;
">

<div style="
display:inline-block;
padding:14px 18px;
border-radius:16px;
background:rgba(99,102,241,.08);
border:1px solid rgba(99,102,241,.15);
margin-bottom:10px;
">

<div style="
color:#6366f1;
font-size:12px;
font-weight:700;
">
IP ADDRESS
</div>

<div style="
margin-top:6px;
color:#111827;
font-size:14px;
font-weight:600;
">
${ipAddress || "Unknown"}
</div>

</div>

<div style="
display:inline-block;
padding:14px 18px;
border-radius:16px;
background:rgba(132,204,22,.10);
border:1px solid rgba(132,204,22,.20);
margin-bottom:10px;
">

<div style="
color:#65a30d;
font-size:12px;
font-weight:700;
">
DEVICE
</div>

<div style="
margin-top:6px;
color:#111827;
font-size:14px;
font-weight:600;
">
${userAgent || "Unknown Device"}
</div>

</div>

</div>

</td>
</tr>

<!-- Information -->
<tr>
<td style="padding:0 40px 35px;">

<div style="
padding:22px;
border-radius:18px;
background:rgba(249,115,22,.08);
border-left:5px solid #f97316;
">

<div style="
font-size:17px;
font-weight:700;
color:#ea580c;
margin-bottom:10px;
">
ℹ️ Important Information
</div>

<p style="
margin:0;
font-size:14px;
line-height:28px;
color:#444;
">
If you did not expect this notification or believe there has been unauthorized
activity on your account, please contact the administrator immediately.
</p>

</div>

</td>
</tr>

<!-- Footer -->
<tr>
<td
style="
padding:28px;
text-align:center;
background:
linear-gradient(
90deg,
#4f46e5,
#f97316,
#84cc16
);
">

<div style="
font-size:15px;
font-weight:700;
color:white;
">
${projectName}
</div>

<div style="
margin-top:8px;
font-size:13px;
color:rgba(255,255,255,.9);
">
© ${new Date().getFullYear()} ${projectName}. All Rights Reserved.
</div>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
    });
  }
}

