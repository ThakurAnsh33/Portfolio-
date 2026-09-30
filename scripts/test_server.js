import http from 'http';
import { spawn } from 'child_process';
import path from 'path';

console.log('--- Starting Server Integration Verification ---');

const serverProcess = spawn('node', ['src/index.js'], {
  cwd: path.resolve('server'),
  env: { ...process.env, PORT: '5001', NODE_ENV: 'test' },
  shell: true,
  stdio: 'pipe',
});

let serverStarted = false;

serverProcess.stdout.on('data', (data) => {
  const str = data.toString();
  console.log('[Server stdout]:', str.trim());
  if (str.includes('http://localhost:5001')) {
    serverStarted = true;
    runTests();
  }
});

serverProcess.stderr.on('data', (data) => {
  console.error('[Server stderr]:', data.toString());
});

const makeRequest = (options, postData) => {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });

    req.on('error', reject);

    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
};

const runTests = async () => {
  try {
    // 1. Health check test
    console.log('\n[Test 1] Testing GET /api/health...');
    const healthRes = await makeRequest({
      hostname: 'localhost',
      port: 5001,
      path: '/api/health',
      method: 'GET',
    });
    console.log('Health check status:', healthRes.status);
    console.log('Health check response:', healthRes.data);

    if (healthRes.status !== 200 || healthRes.data.status !== 'online') {
      throw new Error('Health check failed!');
    }

    // 2. Contact form invalid email test
    console.log('\n[Test 2] Testing POST /api/contact with invalid email...');
    const invalidRes = await makeRequest(
      {
        hostname: 'localhost',
        port: 5001,
        path: '/api/contact',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      { name: 'Recruiter', email: 'invalid-email', message: 'Hello Ansh' }
    );
    console.log('Invalid test status:', invalidRes.status);
    console.log('Invalid test response:', invalidRes.data);

    if (invalidRes.status !== 400 || invalidRes.data.success !== false) {
      throw new Error('Validation test failed!');
    }

    // 3. Contact form valid submission test
    console.log('\n[Test 3] Testing POST /api/contact with valid payload...');
    const validRes = await makeRequest(
      {
        hostname: 'localhost',
        port: 5001,
        path: '/api/contact',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      },
      {
        name: 'Technical Recruiter',
        email: 'recruiter@techcorp.com',
        message: 'Hi Ansh, we were impressed by your MERN stack portfolio and would love to connect!',
      }
    );
    console.log('Valid submission status:', validRes.status);
    console.log('Valid submission response:', validRes.data);

    if (validRes.status !== 201 || validRes.data.success !== true) {
      throw new Error('Valid submission test failed!');
    }

    console.log('\n✅ ALL INTEGRATION TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('❌ Test failed with error:', err.message);
  } finally {
    console.log('Terminating test server...');
    serverProcess.kill('SIGTERM');
    process.exit(0);
  }
};

setTimeout(() => {
  if (!serverStarted) {
    console.error('Server timed out on startup.');
    serverProcess.kill();
    process.exit(1);
  }
}, 10000);
}, 15000);

