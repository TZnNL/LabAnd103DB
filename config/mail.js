var nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "tuanvki33@gmail.com",
        pass: "ngcv ttho yjee yehg"
    }
});

module.exports = transporter;