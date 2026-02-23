/**
 * Quick test — requires the Antigravity Bridge to be running on localhost:5000
 * Run: npm test (offline, just validates imports)
 * Run: npm run test:live (with bridge running)
 */
const { AntigravityClient, AntigravityStream } = require('../dist');

console.log('✓ Import successful');
console.log('✓ AntigravityClient:', typeof AntigravityClient);
console.log('✓ AntigravityStream:', typeof AntigravityStream);

const client = new AntigravityClient();
console.log('✓ Client instantiated (default config)');

const custom = new AntigravityClient({ baseUrl: 'http://localhost:3000', timeout: 5000 });
console.log('✓ Client instantiated (custom config)');

const stream = new AntigravityStream({ url: 'ws://localhost:9812', reconnect: false });
console.log('✓ Stream instantiated');

console.log('\n✅ All import tests passed!');
console.log('Run "npm run test:live" with the bridge running to test API calls.');
