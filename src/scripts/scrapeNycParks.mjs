// Parse the .env.local file to grab the Supabase keys securely
import axios from 'axios';
import * as cheerio from 'cheerio';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing Supabase URL or Service Role Key! Make sure they are in .env.local.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function scrapeNycParks() {
    console.log("🚀 Starting NYC Parks Scraper...");

    try {
        let page = 1;
        let hasMore = true;
        const eventsMap = new Map(); // Use Map to prevent duplicates within the same run

        while (hasMore) {
            const url = page === 1 ? 'https://www.nycgovparks.org/events/free' : `https://www.nycgovparks.org/events/free/p${page}`;
            console.log(`fetching page ${page}: ${url}...`);

            // 1. Fetch live HTML with a User-Agent to prevent blocks
            const { data } = await axios.get(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });

            const $ = cheerio.load(data);
            const eventsOnPage = $('.event_body');

            if (eventsOnPage.length === 0) {
                hasMore = false;
                break;
            }

            // 2. Loop over every '.event_body' on the page
            eventsOnPage.each((index, element) => {
                const titleElement = $(element).find('h3.event-title a');
                const title = titleElement.text().trim();
                const relativeUrl = titleElement.attr('href');
                const source_url = relativeUrl ? `https://www.nycgovparks.org${relativeUrl}` : null;

                // They nicely provide meta tags with clean dates!
                const startDateStr = $(element).find('meta[itemprop="startDate"]').attr('content');

                const locationName = $(element).find('[itemprop="location"] [itemprop="name"]').text().trim();
                const locationBorough = $(element).find('[itemprop="addressLocality"]').text().trim();
                const location = `${locationName}${locationBorough ? `, ${locationBorough}` : ''}`;

                const description = $(element).find('[itemprop="description"]').text().trim();

                // Only push if we have the critical data
                if (title && startDateStr && source_url) {
                    // Overwrite duplicates with the same source_url
                    eventsMap.set(source_url, {
                        title: title,
                        date_start: startDateStr,
                        location: location || "NYC Parks",
                        source_url: source_url,
                        description: description || null,
                        price: 0.00,
                        source_name: 'NYC Parks'
                    });
                }
            });

            console.log(`   found ${eventsOnPage.length} events on this page.`);

            // If fewer than 50 events on page, it likely means we hit the last page
            if (eventsOnPage.length < 50) {
                hasMore = false;
            } else {
                page++;
            }

            // Sleep slightly to avoid overwhelming rate limits
            await new Promise(r => setTimeout(r, 1000));
        }

        const eventsToInsert = Array.from(eventsMap.values());
        console.log(`✅ Parsed ${eventsToInsert.length} unique free events from NYC Parks across all pages!`);

        if (eventsToInsert.length === 0) {
            console.log("No events found to insert. Exiting.");
            return;
        }

        // 3. Insert events into Supabase
        // We use .upsert() instead of .insert() so it updates existing events instead of crashing if 'source_url' is a duplicate
        const { data: insertedData, error } = await supabase
            .from('events')
            .upsert(eventsToInsert, { onConflict: 'source_url' })
            .select();

        if (error) {
            console.error("❌ Error inserting into Supabase:", error.message);
        } else {
            console.log(`🎉 SUCCESS! Pushed events to the database.`);
        }

    } catch (error) {
        console.error("❌ Scraper crashed:", error.message);
    }
}

scrapeNycParks();
