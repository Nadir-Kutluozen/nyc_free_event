import axios from 'axios';
import fs from 'fs';

async function fetchHtml() {
    const { data } = await axios.get('https://www.nycgovparks.org/events/free', {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    });

    fs.writeFileSync('nyc_events.html', data);
    console.log('Saved to nyc_events.html');
}
fetchHtml();
