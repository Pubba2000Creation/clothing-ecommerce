import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'node:process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
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

const DEV_PORT = env.DEV_PORT || 5173;
const PRO_PORT = env.PRO_PORT || 5173;

console.log(`\n🚀 LUMINARY Environment Manager`);
console.log(`📍 Mode: ${mode.toUpperCase()}`);

try {
    if (mode === 'dev') {
        console.log(`🌐 Starting Dev Server on port: ${DEV_PORT}`);
        execSync(`npx vite --port ${DEV_PORT}`, { stdio: 'inherit' });
    } else if (mode === 'prod') {
        console.log(`🌐 Starting Production Preview on port: ${PRO_PORT}`);
        execSync(`npx vite preview --port ${PRO_PORT}`, { stdio: 'inherit' });
    } else if (mode === 'build') {
        console.log(`🛠️ Building for Production...`);
        execSync('npx vite build', { stdio: 'inherit' });
    } else {
        console.error(`❌ Unknown mode: ${mode}`);
        process.exit(1);
    }
} catch (error) {
    console.error(`\n❌ Error occurred in ${mode} mode:`, error.message);
    process.exit(1);
}
