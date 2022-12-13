const sendGrid = require('@sendgrid/mail');
require('dotenv').config();

const { SENDGRID_API_KEY } = process.env;
sendGrid.setApiKey(SENDGRID_API_KEY);

// async function main() {
//   const email = {
//     from: 'myklush@ukr.net',
//     to: 'myklush@ukr.net',
//     subject: 'SendGrid test',
//     html: '<h1>Hi hw6<h1>',
//   };
//   const response = await sendGrid.send(email);
//   console.log('Email sent', response);
// }
// main().catch((err) => console.error('App error', err));

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: 'myklush@ukr.net' };
    await sendGrid.send(email);
    return true;
  } catch (error) {
    throw Error;
  }
};

module.exports = sendEmail;
