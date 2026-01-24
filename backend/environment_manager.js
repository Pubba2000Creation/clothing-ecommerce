const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');

/**
 * Simple .env parser to avoid external dependencies for this script.
 */
function loadEnv() {
    const env = {};
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        content.split('\n').forEach(line => {
            const trimmedLine = line.trim();
            if (trimmedLine && !trimmedLine.startsWith('#')) {
                const [key, ...valueParts] = trimmedLine.split('=');
                if (key && valueParts.length > 0) {
                    env[key.trim()] = valueParts.join('=').trim();
                }
            }
        });
    }
    return env;
}

const env = loadEnv();
const mode = process.argv[2] || 'dev';
const PORT = env.PORT || 6006;

console.log(`\n🚀 LUMINARY Backend Environment Manager`);
console.log(`📍 Mode: ${mode.toUpperCase()}`);
console.log(`🌐 Port: ${PORT}`);

try {
    if (mode === 'dev') {
        console.log(`🛠️ Starting Dev Server with nodemon...`);
        execSync(`npx nodemon server.js`, {
            stdio: 'inherit',
            env: { ...process.env, PORT }
        });
    } else if (mode === 'prod') {
        console.log(`🚀 Starting Production Server...`);
        execSync(`node server.js`, {
            stdio: 'inherit',
            env: { ...process.env, PORT }
        });
    } else {
        console.error(`❌ Unknown mode: ${mode}`);
        process.exit(1);
    }
} catch (error) {
    console.error(`\n❌ Error occurred in ${mode} mode:`, error.message);
    process.exit(1);
}
