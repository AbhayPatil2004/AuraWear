function storeApprovedEmailBody(owner, storeName) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8" />
        <title>Store Approved</title>
    </head>
    <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f6f8;">
        <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center" style="padding: 30px 15px;">
                    <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                        
                        <!-- Header -->
                        <tr>
                            <td style="padding: 20px; text-align:center; background:#111827; color:#ffffff; border-radius:8px 8px 0 0;">
                                <h2 style="margin:0;">🎉 Store Approved!</h2>
                            </td>
                        </tr>

                        <!-- Body -->
                        <tr>
                            <td style="padding: 30px; color:#333;">
                                <p style="font-size:16px;">Hi <strong>${owner}</strong>,</p>

                                <p style="font-size:15px; line-height:1.6;">
                                    We’re excited to let you know that your store 
                                    <strong>${storeName}</strong> has been successfully approved!
                                </p>

                                <p style="font-size:15px; line-height:1.6;">
                                    You can now start listing products, managing orders, and growing your business with us.
                                </p>

                                <p style="font-size:15px; line-height:1.6;">
                                    🎁 <strong>7-day free trial</strong> has been activated for your store.
                                </p>

                                <div style="margin: 30px 0; text-align:center;">
                                    <a href="#" 
                                       style="background:#2563eb; color:#ffffff; text-decoration:none; padding:12px 25px; border-radius:6px; font-size:15px;">
                                        Go to Seller Dashboard
                                    </a>
                                </div>

                                <p style="font-size:14px; color:#555;">
                                    If you have any questions, feel free to reach out to our support team.
                                </p>

                                <p style="margin-top:30px; font-size:14px;">
                                    Best regards,<br/>
                                    <strong>AuraShop Team</strong>
                                </p>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td style="padding: 15px; text-align:center; background:#f9fafb; font-size:12px; color:#777; border-radius:0 0 8px 8px;">
                                © ${new Date().getFullYear()} AuraShop. All rights reserved.
                            </td>
                        </tr>

                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}

export default storeApprovedEmailBody;
