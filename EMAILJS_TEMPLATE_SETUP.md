# EmailJS Template Setup Guide

## Template Configuration

Use the following settings in EmailJS Dashboard:

- **Service ID**: `service_8w0r074`
- **Template ID**: `template_chs_contact` (or create your own)
- **Public Key**: `Inme3O5tNDx3AxFGS`

## Template Variables from Contact Form

The following variables will be sent from the ContactUs.tsx form:

```
from_name    = {{from_name}}         (First Name + Last Name)
from_email   = {{from_email}}        (User Email)
phone        = {{phone}}             (Mobile Number)
message      = {{message}}           (User Message)
to_email     = {{to_email}}          (Your Company Email)
```

## EmailJS HTML Email Template

Copy and paste this HTML template into your EmailJS template editor:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f5f5f5;
        }
        
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 0;
        }
        
        .header {
            background: linear-gradient(135deg, #193358 0%, #2a4a7c 100%);
            padding: 40px 20px;
            text-align: center;
            border-bottom: 5px solid #A7833F;
        }
        
        .header h1 {
            color: #ffffff;
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 700;
        }
        
        .header p {
            color: #e0e0e0;
            font-size: 14px;
        }
        
        .content {
            padding: 40px 30px;
        }
        
        .greeting {
            color: #193358;
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        
        .section {
            background-color: #f9f9f9;
            border-left: 4px solid #A7833F;
            padding: 20px;
            margin-bottom: 25px;
            border-radius: 4px;
        }
        
        .section-label {
            color: #A7833F;
            font-weight: 700;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
            display: block;
        }
        
        .section-content {
            color: #333;
            font-size: 15px;
            line-height: 1.6;
        }
        
        .sender-info {
            background: linear-gradient(135deg, rgba(25, 51, 88, 0.05) 0%, rgba(167, 131, 63, 0.05) 100%);
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 25px;
        }
        
        .info-row {
            margin-bottom: 15px;
            display: flex;
            align-items: flex-start;
        }
        
        .info-label {
            color: #193358;
            font-weight: 600;
            min-width: 100px;
        }
        
        .info-value {
            color: #555;
            flex: 1;
            word-break: break-word;
        }
        
        .message-box {
            background-color: #f0f0f0;
            border: 1px solid #e0e0e0;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 25px;
        }
        
        .message-box p {
            color: #333;
            font-size: 15px;
            line-height: 1.8;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        
        .footer {
            background-color: #193358;
            color: #ffffff;
            padding: 30px;
            text-align: center;
            border-top: 5px solid #A7833F;
        }
        
        .footer p {
            margin-bottom: 10px;
            font-size: 14px;
        }
        
        .footer-highlight {
            color: #A7833F;
            font-weight: 600;
        }
        
        .action-required {
            background-color: #FFF3CD;
            border: 1px solid #FFC107;
            border-radius: 6px;
            padding: 15px;
            margin-bottom: 25px;
            color: #856404;
            font-size: 14px;
        }
        
        a {
            color: #A7833F;
            text-decoration: none;
        }
        
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <h1>📧 New Contact Form Submission</h1>
            <p>Chatushtya Health Services LLP</p>
        </div>
        
        <!-- Content -->
        <div class="content">
            <p class="greeting">Hello,</p>
            <p>You have received a new message from the website contact form. Here are the details:</p>
            
            <!-- Sender Information -->
            <div class="sender-info">
                <div class="info-row">
                    <div class="info-label">Name:</div>
                    <div class="info-value"><strong>{{from_name}}</strong></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Email:</div>
                    <div class="info-value"><a href="mailto:{{from_email}}">{{from_email}}</a></div>
                </div>
                <div class="info-row">
                    <div class="info-label">Phone:</div>
                    <div class="info-value"><a href="tel:{{phone}}">{{phone}}</a></div>
                </div>
            </div>
            
            <!-- Message -->
            <div class="section">
                <span class="section-label">💬 Message</span>
                <div class="message-box">
                    <p>{{message}}</p>
                </div>
            </div>
            
            <!-- Action Required -->
            <div class="action-required">
                <strong>⚠️ Action Required:</strong> Please respond to this inquiry within 24 hours to maintain excellent customer service.
            </div>
        </div>
        
        <!-- Footer -->
        <div class="footer">
            <p><span class="footer-highlight">Chatushtya Health Services LLP</span></p>
            <p>Healthcare Capacity Building & Professional Excellence</p>
            <p style="margin-top: 15px; font-size: 12px; color: #999;">
                This is an automated email from your website contact form.
            </p>
        </div>
    </div>
</body>
</html>
```

## Implementation Steps

1. **Log in to EmailJS Dashboard**: https://dashboard.emailjs.com
2. **Create a New Template**:
   - Go to Email Templates
   - Click "Create New Template"
   - Set Template ID as `template_chs_contact`
   - Paste the HTML code above

3. **Update ContactUs.tsx**:
```typescript
import emailjs from '@emailjs/browser';

// Initialize EmailJS (add this in your layout.tsx or top-level component)
if (!window.emailjs) {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJSPUBKEY);
}

// In the onSubmit function:
const templateParams = {
  to_email: COMPANY_EMAIL,
  from_name: `${data.firstName} ${data.lastName}`,
  from_email: data.email,
  phone: data.mobileNumber,
  message: data.message,
};

try {
  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    templateParams,
    process.env.NEXT_PUBLIC_EMAILJSPUBKEY!
  );
  setSubmitStatus('success');
} catch (error) {
  console.error('EmailJS Error:', error);
  setSubmitStatus('error');
}
```

4. **Install EmailJS**:
```bash
npm install @emailjs/browser
```

5. **Test the Form**: Fill out the contact form and verify the email is received correctly.

## Color Scheme Reference

- **Deep Navy Blue**: `#193358` (Primary background)
- **Golden**: `#A7833F` (Accent color)
- **White**: `#FFFFFF` (Content background)

## Testing Variables

Use these test values to verify your template:

```
from_name: John Doe
from_email: john@example.com
phone: 9876543210
message: This is a test message from the contact form.
to_email: contact@chatushtya-health-services.com
```

## Troubleshooting

- **Email not sending**: Verify Service ID and Public Key in .env.local
- **Variables not replacing**: Ensure variable names match exactly (case-sensitive)
- **Template not found**: Check Template ID is correctly set in .env.local
- **View raw HTML**: EmailJS converts the template, so if styling looks off, check the preview

For more help, visit: https://www.emailjs.com/docs/
