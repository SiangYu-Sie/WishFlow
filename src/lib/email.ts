import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWishEmails = async (
  customerEmail: string,
  purpose: string,
  usage: string,
  requirements: string
) => {
  if (!process.env.EMAIL_USER) {
    console.log('Skipping emails, no EMAIL_USER configured');
    return;
  }

  // 1. Alert Admin
  await transporter.sendMail({
    from: `"Wish Platform" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: '✨ 新的許願接案需求',
    html: `
      <h2>有客戶提交了新的許願！</h2>
      <p><strong>聯絡信箱：</strong> ${customerEmail}</p>
      <p><strong>目的：</strong> ${purpose}</p>
      <p><strong>用途：</strong> ${usage}</p>
      <p><strong>具體需求：</strong> ${requirements}</p>
    `,
  });

  // 2. Auto-reply to Customer
  await transporter.sendMail({
    from: `"Wish Platform" <${process.env.EMAIL_USER}>`,
    to: customerEmail,
    subject: '💡 您的許願已收到！',
    html: `
      <h2>感謝您的許願！</h2>
      <p>我們已經收到您的需求：</p>
      <blockquote style="border-left: 4px solid #8b5cf6; padding-left: 10px; color: #555;">
        ${purpose}
      </blockquote>
      <p>我們最快會在<strong>一個禮拜內</strong>提供一個模擬的程式給您體驗，請隨時留意信箱通知喔！</p>
    `,
  });
};
