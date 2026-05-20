const https = require('https');

function fetchVersion() {
    return new Promise((resolve) => {
        const installUrl = 'https://antigravity.google/cli/install.sh';
        https.get(installUrl, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                const match = data.match(/DOWNLOAD_BASE_URL="([^"]+)"/);
                if (!match) {
                    resolve('');
                    return;
                }
                const baseUrl = match[1];
                const manifestUrl = `${baseUrl}/manifests/linux_amd64.json`;

                https.get(manifestUrl, (mRes) => {
                    let mData = '';
                    mRes.on('data', (chunk) => mData += chunk);
                    mRes.on('end', () => {
                        try {
                            const json = JSON.parse(mData);
                            resolve(json.version || '');
                        } catch {
                            resolve('');
                        }
                    });
                }).on('error', () => resolve(''));
            });
        }).on('error', () => resolve(''));
    });
}

fetchVersion().then(version => {
    process.stdout.write(version);
});
