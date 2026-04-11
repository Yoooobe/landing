const API_KEY = 'fc-85398e4099b742ff95c2d9bcd2519198';
const urls = [
  'https://stripe.com',
  'https://linear.app',
  'https://vercel.com',
  'https://ramp.com',
  'https://demo.yoobe.co',
  'https://4unik.yoobe.me'
];

async function scrapeUrlText(url, https) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      url: url,
      formats: ["markdown"]
    });

    const options = {
      hostname: 'api.firecrawl.dev',
      port: 443,
      path: '/v1/scrape',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          if (parsed.success && parsed.data) {
            resolve(parsed.data.markdown);
          } else {
            resolve(`Error scraping ${url}: ${responseData}`);
          }
        } catch (e) {
          resolve(`Parse error for ${url}: ${e.message}`);
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(data);
    req.end();
  });
}

async function main() {
  const [{ default: fs }, https] = await Promise.all([
    import('node:fs'),
    import('node:https'),
  ]);

  for (const url of urls) {
    console.log(`Scraping ${url}...`);
    try {
      const markdown = await scrapeUrlText(url, https);
      const filename = url.replace(/https?:\/\//, '').replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.md';
      fs.writeFileSync(`/Users/genautech/landing/scrapings/${filename}`, markdown || 'No content');
      console.log(`Saved to ${filename}`);
    } catch (e) {
      console.error(`Failed ${url}:`, e);
    }
  }
}

main();
