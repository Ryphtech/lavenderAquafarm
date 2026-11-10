import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    where
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { initialBreeds } from '../data/mockData';

export const breedService = {
    getAll: async () => {
        try {
            let snapshot;
            try {
                const q = query(collection(db, 'breeds'), orderBy('name', 'asc'));
                snapshot = await getDocs(q);
            } catch {
                snapshot = await getDocs(collection(db, 'breeds'));
            }

            if (!snapshot.empty) {
                const data = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                return data.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
            }

            // Fallback to initialBreeds if collection is empty
            return initialBreeds.map(b => ({
                ...b,
                in_stock: b.inStock ?? b.in_stock,
                price: parseFloat(b.price)
            }));
        } catch (error) {
            console.error('Error fetching breeds from Firestore:', error);
            // Fallback to initialBreeds on permission/network error
            return initialBreeds.map(b => ({
                ...b,
                in_stock: b.inStock ?? b.in_stock,
                price: parseFloat(b.price)
            }));
        }
    },

    getById: async (id) => {
        try {
            const docRef = doc(db, 'breeds', String(id));
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }

            // Try query by numeric or string id field
            const q = query(collection(db, 'breeds'), where('id', '==', isNaN(id) ? id : Number(id)));
            const matchSnap = await getDocs(q);
            if (!matchSnap.empty) {
                return { id: matchSnap.docs[0].id, ...matchSnap.docs[0].data() };
            }

            // Fallback to mockData
            const mock = initialBreeds.find(b => String(b.id) === String(id));
            if (mock) {
                return {
                    ...mock,
                    in_stock: mock.inStock ?? mock.in_stock,
                    price: parseFloat(mock.price)
                };
            }

            return null;
        } catch (error) {
            console.error('Error getting breed by ID:', error);
            const mock = initialBreeds.find(b => String(b.id) === String(id));
            return mock || null;
        }
    },

    add: async (breed) => {
        try {
            const breedData = {
                ...breed,
                created_at: new Date().toISOString()
            };

            let docId = breed.id ? String(breed.id) : null;
            if (docId) {
                const docRef = doc(db, 'breeds', docId);
                await setDoc(docRef, breedData);
                return { id: docId, ...breedData };
            } else {
                const docRef = await addDoc(collection(db, 'breeds'), breedData);
                return { id: docRef.id, ...breedData };
            }
        } catch (error) {
            console.error('Error adding breed:', error);
            throw error;
        }
    },

    update: async (id, updates) => {
        try {
            const docRef = doc(db, 'breeds', String(id));
            await updateDoc(docRef, {
                ...updates,
                updated_at: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error updating breed:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const docRef = doc(db, 'breeds', String(id));
            await deleteDoc(docRef);
        } catch (error) {
            console.error('Error deleting breed:', error);
            throw error;
        }
    }
};

export const orderService = {
    getAll: async () => {
        try {
            let snapshot;
            try {
                const q = query(collection(db, 'orders'), orderBy('created_at', 'desc'));
                snapshot = await getDocs(q);
            } catch {
                snapshot = await getDocs(collection(db, 'orders'));
            }

            const orders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return orders.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        } catch (error) {
            console.error('Error fetching orders:', error);
            return [];
        }
    },

    create: async (order) => {
        try {
            const orderId = order.id || `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
            const orderData = {
                ...order,
                id: orderId,
                status: order.status || 'Waiting for Confirmation',
                created_at: order.created_at || new Date().toISOString()
            };

            const docRef = doc(db, 'orders', orderId);
            await setDoc(docRef, orderData);
            return orderData;
        } catch (error) {
            console.error('Error creating order in Firestore:', error);
            throw error;
        }
    },

    update: async (id, updates) => {
        try {
            const docRef = doc(db, 'orders', String(id));
            await updateDoc(docRef, {
                ...updates,
                updated_at: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    }
};
