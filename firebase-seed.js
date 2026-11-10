import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initialBreeds } from './src/data/mockData.js';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Check if credentials provided via CLI args or .env
const email = process.argv[2] || process.env.ADMIN_EMAIL;
const password = process.argv[3] || process.env.ADMIN_PASSWORD;

async function seed() {
    console.log('Starting Firebase Firestore seed...');

    if (email && password) {
        try {
            console.log(`Authenticating as ${email}...`);
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Authenticated successfully!');
        } catch (authErr) {
            console.error('Authentication failed:', authErr.message);
            console.log('Attempting write without auth...');
        }
    } else {
        console.log('Note: No admin credentials passed.');
        console.log('You can run: node firebase-seed.js <admin-email> <admin-password>\n');
    }

    try {
        for (const item of initialBreeds) {
            const { id, inStock, ...rest } = item;
            const breedData = {
                ...rest,
                id,
                in_stock: inStock ?? true,
                price: parseFloat(rest.price),
                created_at: new Date().toISOString()
            };

            await setDoc(doc(db, 'breeds', String(id)), breedData);
            console.log(`✓ Seeded breed: ${breedData.name} (ID: ${id})`);
        }
        console.log('\n🎉 All breeds seeded successfully into Firestore!');
    } catch (error) {
        console.error('\n❌ Error seeding to Firebase:', error.message);
        if (error.code === 'permission-denied' || error.message.includes('insufficient permissions')) {
            console.log('\nTip: Since your Firestore rules require an authenticated admin to write:');
            console.log('1. Run the script with your admin credentials:');
            console.log('   node firebase-seed.js <email> <password>');
            console.log('2. OR temporarily set `allow write: if true;` in Firestore Rules, run this script, and set it back.');
        }
    }
}

seed();
