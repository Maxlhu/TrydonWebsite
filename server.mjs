import express from "express";
import { createRequire } from "module";
import cors from "cors";

const require = createRequire(import.meta.url);
const Mailjet = require('node-mailjet')

const app = express();
const port = 80;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/send-email', (req, res) => {
    const mailjet = Mailjet.apiConnect(
        '5b21af67827eb3c159f2b30eb6e73176',
        '4e3e0e0753cda3ce9e83a848a4c6ffd7'
    );
    var messages = []
    if (!req.body.name) {
        messages = [
            {
              From: {
                Email: 'trydon.app@gmail.com',
                Name: 'Me',
              },
              To: [
                {
                  Email: 'trydon.app@gmail.com',
                  Name: 'You',
                },
              ],
              Subject: 'New form submission',
              TextPart: 'hello',
              HTMLPart:
                `<h1> Here is the question </h1>
                  <p>${req.body.question}</p>
                `,
            },
          ]
    }
    else {
        messages = [
            {
              From: {
                Email: 'trydon.app@gmail.com',
                Name: 'Me',
              },
              To: [
                {
                  Email: 'trydon.app@gmail.com',
                  Name: 'You',
                },
              ],
              Subject: 'New form submission',
              TextPart: 'hello',
              HTMLPart:
                `<h1> Here is the form result in testing </h1>
                  <p>Name: ${req.body.name}</p>
                  <p>Company: ${req.body.company}</p>
                  <p>Email: ${req.body.mail}</p>
                  <p>clothes Sold: ${req.body.clothesSold}</p>
                  <p>Amount of customers: ${req.body.customersAmount}</p>
                  <p>Website framework: ${req.body.websiteFramework}</p>
                `,
            },
          ]
    }
    const request = mailjet.post('send', { version: 'v3.1' }).request({
      Messages: messages,
    });


  request
    .then(result => {
      console.log(result.body);
      res.send('Email sent successfully!');
    })
    .catch(err => {
      console.log(err.statusCode);
      res.status(500).send('Error sending email');
    });
});
