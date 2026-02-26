import axios from 'axios';
import * as cheerio from 'cheerio';

async function testPagination(url) {
    try {
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const $ = cheerio.load(data);
        const count = $('.event_body').length;
        console.log(`URL: ${url} -> Events: ${count}`);
    } catch (e) {
        console.log(`URL: ${url} -> Error: ${e.response ? e.response.status : e.message}`);
    }
}

async function run() {
    await testPagination('https://www.nycgovparks.org/events/free/p2');
    await testPagination('https://www.nycgovparks.org/events/free/page/2');
    await testPagination('https://www.nycgovparks.org/events/free?page=2');
    await testPagination('https://www.nycgovparks.org/events/free?p=2');
}
run();
