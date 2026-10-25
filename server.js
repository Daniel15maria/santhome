const http = require('http');
const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const port = Number(process.env.API_PORT || 4000);
const dataDir = path.join(__dirname, 'data');
const dataFile = path.join(dataDir, 'registrations.json');
const requestCounts = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 8;

function send(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  });
  response.end(JSON.stringify(body));
}

async function readRegistrations() {
  try {
    return JSON.parse(await fs.readFile(dataFile, 'utf8'));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

async function readJson(request) {
  let raw = '';
  for await (const chunk of request) {
    raw += chunk;
    if (raw.length > 8192) throw Object.assign(new Error('Request is too large.'), { status: 413 });
  }
  try { return JSON.parse(raw); }
  catch { throw Object.assign(new Error('Send valid JSON.'), { status: 400 }); }
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  if (request.method === 'GET' && url.pathname === '/api/health') return send(response, 200, { ok: true });
  if (request.method !== 'POST' || url.pathname !== '/api/registrations') {
    return send(response, 404, { error: 'Not found.' });
  }

  const now = Date.now();
  const client = request.socket.remoteAddress || 'unknown';
  const recent = (requestCounts.get(client) || []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) return send(response, 429, { error: 'Too many submissions. Please try again later.' });
  recent.push(now);
  requestCounts.set(client, recent);

  try {
    const body = await readJson(request);
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 120) : '';
    const batchYear = Number(body.batchYear);
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase().slice(0, 254) : '';
    const allowedInterests = ['Find my batchmates', 'Attend an event', 'Mentor current students', 'Share a school memory'];
    if (name.length < 2) return send(response, 400, { error: 'Please enter your name.' });
    if (!Number.isInteger(batchYear) || batchYear < 1950 || batchYear > new Date().getFullYear()) return send(response, 400, { error: 'Please enter a valid school batch year.' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return send(response, 400, { error: 'Please enter a valid email address.' });
    if (!allowedInterests.includes(body.interest)) return send(response, 400, { error: 'Please choose how you would like to reconnect.' });

    const registrations = await readRegistrations();
    const registration = {
      id: randomUUID(),
      name,
      batchYear,
      email,
      interest: body.interest,
      newsletter: body.newsletter === true,
      createdAt: new Date().toISOString(),
    };
    registrations.push(registration);
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dataFile, `${JSON.stringify(registrations, null, 2)}\n`, { encoding: 'utf8', mode: 0o600 });
    return send(response, 201, { ok: true, id: registration.id });
  } catch (error) {
    return send(response, error.status || 500, { error: error.status ? error.message : 'Registration could not be saved.' });
  }
});

server.listen(port, () => console.log(`Santhome alumni API listening on http://localhost:${port}`));
