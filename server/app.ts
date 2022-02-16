// tslint:disable-next-line: no-var-requires
const express = require('express');
// tslint:disable-next-line: no-var-requires
const cors = require('cors');
// tslint:disable-next-line: no-var-requires
const bodyParser = require('body-parser');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mockData = require('./mockData'); // Mock data by default

app.get('/', (req: any, res: any) => res.send('Hello World!'));
app.get('/sample-get-request', (req: any, res: any) => res.json(req.query));
app.post('/sample-post-request', (req: any, res: any) => res.json(req.body));

app.get('/users', (req: any, res: any) => {
  return res.json(mockData.users);
});

app.post('/users', (req: any, res: any) => {
  mockData.users = req.body;
  res.status(200).end();
});

app.get('/currentUser', (req: any, res: any) => {
  return res.json(mockData.currentUser);
});

app.post('/currentUser', (req: any, res: any) => {
  mockData.currentUser = req.body;
  res.status(200).end();
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

export {}; // Fix to make TS compiler happy. Was error: server/app.ts:2:1 - error TS1208: All files must be modules when the '--isolatedModules' flag is provided.
