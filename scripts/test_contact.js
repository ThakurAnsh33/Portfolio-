import http from 'http';

const postData = JSON.stringify({
  name: 'Recruiter Test',
  email: 'recruiter@techcompany.com',
  message: 'Hello Ansh, testing contact endpoint and Nodemailer logging.',
});

const req = http.request(
  {
    hostname: 'localhost',
    port: 5000,
    path: '/api/contact',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData),
    },
  },
  (res) => {
    let body = '';
    res.on('data', (chunk) => (body += chunk));
    res.on('end', () => {
      console.log('HTTP Status:', res.statusCode);
      console.log('Response Body:', body);
    });
  }
);

req.on('error', (e) => {
  console.error('Request Error:', e.message);
});

req.write(postData);
req.end();

