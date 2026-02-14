import { createClient } from '@supabase/supabase-js';
import { initialBreeds } from './src/data/mockData.js';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Error: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env file.');
    console.error('Please add these variables to your .env file.');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function seed() {
    console.log('Starting seed...');

    const formattedBreeds = initialBreeds.map(({ id, ...rest }) => ({
        ...rest,
        in_stock: rest.inStock,
        price: parseFloat(rest.price)
    }));

    // Remove inStock property after mapping to in_stock
    formattedBreeds.forEach(b => delete b.inStock);

    const { data, error } = await supabase
        .from('breeds')
        .insert(formattedBreeds);

    if (error) {
        console.error('Error seeding breeds:', error);
    } else {
        console.log('Breeds seeded successfully:', data);
    }
}

seed();
