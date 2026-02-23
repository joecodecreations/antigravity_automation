/**
 * Live integration test — requires the Antigravity Bridge running on localhost:5000
 * Run: npm run test:live
 */
const { AntigravityClient, AntigravityStream } = require('../dist');

async function main() {
    const client = new AntigravityClient();
    console.log('Testing against http://localhost:5000...\n');

    try {
        // Stats (GET — least destructive)
        const stats = await client.getStats();
        console.log('✓ GET /stats:', JSON.stringify(stats));
    } catch (e) {
        console.log('✗ GET /stats:', e.message);
    }

    try {
        // Get Command (GET)
        const cmd = await client.getCommand();
        console.log('✓ GET /get_command:', JSON.stringify(cmd));
    } catch (e) {
        console.log('✗ GET /get_command:', e.message);
    }

    try {
        // Toggle Auto-Run
        const run = await client.toggleAutoRun();
        console.log('✓ POST /toggle_auto_run:', JSON.stringify(run));
        // Toggle back
        await client.toggleAutoRun();
    } catch (e) {
        console.log('✗ POST /toggle_auto_run:', e.message);
    }

    try {
        // Send Command
        const cmd = await client.sendCommand('Hello from antigravity-automation npm package test!');
        console.log('✓ POST /send_command:', JSON.stringify(cmd));
    } catch (e) {
        console.log('✗ POST /send_command:', e.message);
    }

    try {
        // Track Action
        const track = await client.trackAction('remote_command');
        console.log('✓ POST /track_action:', JSON.stringify(track));
    } catch (e) {
        console.log('✗ POST /track_action:', e.message);
    }

    // WebSocket stream (5 second test)
    console.log('\nTesting WebSocket stream (5s)...');
    const stream = new AntigravityStream({ reconnect: false });
    let msgCount = 0;

    stream.onConnected(() => console.log('✓ WebSocket connected'));
    stream.onMessage((msg) => {
        msgCount++;
        console.log(`  Stream message #${msgCount}: [${msg.title}] ${msg.content.substring(0, 60)}...`);
    });
    stream.onError((err) => console.log('  WebSocket error:', err.message));

    stream.connect();

    await new Promise(resolve => setTimeout(resolve, 5000));
    stream.disconnect();
    console.log(`✓ WebSocket test done (${msgCount} messages received)`);

    console.log('\n✅ Live tests complete!');
}

main().catch(console.error);
