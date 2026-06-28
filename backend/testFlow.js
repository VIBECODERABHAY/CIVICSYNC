const http = require('http');

async function testLifecycle() {
  console.log('--- STARTING CIVICSYNC LIFECYCLE TEST ---\n');

  // Helper to make API requests
  const request = (method, path, body = null) => {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'localhost',
        port: 5000,
        path: path,
        method: method,
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(data) }));
      });

      req.on('error', reject);
      if (body) req.write(JSON.stringify(body));
      req.end();
    });
  };

  try {
    // 1. Register a Civilian
    console.log('1. Registering a new Civilian...');
    const civReg = await request('POST', '/api/auth/civilian/register', {
      name: 'John Doe',
      email: `john${Date.now()}@test.com`,
      password: 'password123'
    });
    console.log('Civilian Registered:', civReg.data.user.name, '\n');
    const civId = civReg.data.user.id;

    // 2. Submit a Complaint (Bypassing Gemini for the automated test by injecting fields directly to avoid API quota)
    // Wait, the API route hardcodes the Gemini call if we hit /api/reports/submit. 
    // To ensure the test runs without failing on a bad base64, we will send a tiny 1x1 base64 jpeg.
    const tinyJpeg = '/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=';
    
    console.log('2. Civilian Submitting a Report with Image (Waiting for Gemini AI)...');
    const reportRes = await request('POST', '/api/reports/submit', {
      user_id: civId,
      title: 'Pothole on Main St',
      description: 'Huge pothole damaging cars.',
      address: '123 Main St',
      lat: 28.6139,
      lng: 77.2090,
      image_base64: tinyJpeg
    });
    console.log('Report Submitted!');
    console.log('Gemini Analysis:', reportRes.data.analysis);
    console.log('Report ID:', reportRes.data.report_id, '\n');
    const reportId = reportRes.data.report_id;

    // 3. Register Nagar Nigam Tech & Worker
    console.log('3. Registering Nagar Nigam Officials...');
    const techReg = await request('POST', '/api/auth/official/register', {
      name: 'Tech Admin',
      email: `admin${Date.now()}@nn.com`,
      password: 'admin',
      role: 'tech_team',
      department: 'Roads'
    });
    const workerReg = await request('POST', '/api/auth/official/register', {
      name: 'Worker Bob',
      email: `bob${Date.now()}@nn.com`,
      password: 'bob',
      role: 'worker',
      department: 'Roads'
    });
    console.log('Officials Registered.\n');
    const workerId = workerReg.data.official.id;

    // 4. Tech Team Assigns Work
    console.log('4. Tech Team assigning task to Worker Bob...');
    const assignRes = await request('POST', '/api/official/assign', {
      complaint_id: reportId,
      worker_id: workerId,
      instructions: 'Please fill the pothole with asphalt today.'
    });
    console.log('Assignment Status:', assignRes.data.message, '\n');
    const assignmentId = assignRes.data.assignment_id;

    // 5. Worker Resolves the Issue
    console.log('5. Worker fixing issue and uploading photo...');
    const resolveRes = await request('POST', '/api/official/resolve', {
      assignment_id: assignmentId,
      complaint_id: reportId,
      fixed_image_base64: tinyJpeg
    });
    console.log('Resolution Status:', resolveRes.data.message, '\n');

    console.log('--- TEST COMPLETED SUCCESSFULLY ---');

  } catch (error) {
    console.error('Test Failed:', error);
  }
}

testLifecycle();
