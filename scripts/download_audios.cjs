const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

const audioDir = path.join(__dirname, '../public/assets/audio');
if (!fs.existsSync(audioDir)) {
  fs.mkdirSync(audioDir, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Saved: ${dest} (${fs.statSync(dest).size} bytes)`);
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('Downloading audio files...');
  
  // 1. Rukun 1 (Ihram & Talbiyah) - Existing working audio
  try {
    await download(
      'https://cdns3.asblr.link/UserAudios/NrSmqxTWxUR9hXO4ku3Xk6dz9KU2/WgejbpldMnRR5a7DVJRG.mp3',
      path.join(audioDir, 'rukun-1-ihram.mp3')
    );
  } catch(e) {
    console.error('1:', e.message);
  }

  // 2. Rukun 2 (Doa Wukuf di Arafah) - Hisn Muslim official audio for Dua Arafah
  try {
    await download(
      'https://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_120.mp3',
      path.join(audioDir, 'rukun-2-arafah.mp3')
    );
  } catch(e) {
    console.error('2:', e.message);
  }

  // 3. Rukun 3 (Thawaf Ifadah) - EveryAyah Alafasy Surah Al-Baqarah 201 (Rabbana Atina...)
  try {
    await download(
      'https://everyayah.com/data/Alafasy_128kbps/002201.mp3',
      path.join(audioDir, 'rukun-3-thawaf.mp3')
    );
  } catch(e) {
    console.error('3:', e.message);
  }

  // 4. Rukun 4 (Sa'i) - Hisn Muslim official audio for Dua Safa & Marwah
  try {
    await download(
      'https://www.hisnmuslim.com/audio/ar/ar_7esn_AlMoslem_by_Doors_119.mp3',
      path.join(audioDir, 'rukun-4-sai.mp3')
    );
  } catch(e) {
    console.error('4:', e.message);
  }

  // Check other Hajj chapters from Hisn Muslim
  try {
    const data = await new Promise((res, rej) => {
      https.get('https://www.hisnmuslim.com/api/ar/husn_ar.json', (r) => {
        let d = '';
        r.on('data', c => d += c);
        r.on('end', () => res(d));
      }).on('error', rej);
    });
    const clean = data.replace(/^\uFEFF/, '');
    const json = JSON.parse(clean);
    const list = json['العربية'];
    const items = list.filter(x => x.ID >= 113 && x.ID <= 126);
    console.log('Hisn Muslim Hajj items:', items);
  } catch (e) {
    console.log('Error fetching Hajj items:', e.message);
  }
}

main();
