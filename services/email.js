const sendgridMail = require("@sendgrid/mail");
const Mailgen = require("mailgen");
require("dotenv").config();

class EmailService {
  #sender = sendgridMail;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
      case "development":
        this.link = "http://localhost:3000";
        break;

      case "production":
        this.link = "link for production";
        break;

      default:
        this.link = "http://localhost:3000";
        break;
    }
  }
  #createTemplateVerifyEmail(verifyToken, name) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: "cerberus",
      product: {
        name: "UserContacts",
        link: this.link,
      },
    });

    const email = {
      body: {
        name,
        intro:
          "Welcome to UserContacts! We're very excited to have you on board.",
        action: {
          instructions: "To get started with UserContacts, please click here:",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };

    const emailBody = mailGenerator.generate(email);
    return emailBody;
  }

  async sendVerifyEmail(verifyToken, email, name) {
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email, // Change to your recipient
      from: "rav3ndima91@gmail.com", // Change to your verified sender
      subject: "Email verification",
      html: this.#createTemplateVerifyEmail(verifyToken, name),
    };
    this.#sender.send(msg);
  }
}

module.exports = EmailService;
