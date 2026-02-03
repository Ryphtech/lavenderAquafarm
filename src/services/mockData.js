
const INITIAL_BREEDS = [
    {
        id: '1',
        name: 'Mosaic Guppy',
        description: 'High quality Mosaic Guppies with vibrant tails. Perfect for community tanks.',
        quality: 'Premium',
        male_avail: true,
        female_avail: true,
        price_pair: 450,
        images: ['https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=800'],
        status: 'available'
    },
    {
        id: '2',
        name: 'Halfmoon Betta',
        description: 'Stunning Halfmoon Betta with 180-degree tail spread. Aggressive but beautiful.',
        quality: 'Show Grade',
        male_avail: true,
        female_avail: false,
        price_pair: 800,
        images: ['https://images.unsplash.com/photo-1534043464124-3866f90b5f87?auto=format&fit=crop&q=80&w=800'],
        status: 'available'
    },
    {
        id: '3',
        name: 'Oranda Goldfish',
        description: 'Cute Oranda Goldfish with prominent wen (head growth). Peaceful and hardy.',
        quality: 'A Grade',
        male_avail: true,
        female_avail: true,
        price_pair: 1200,
        images: ['https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800'],
        status: 'available'
    },
    {
        id: '4',
        name: 'Flowerhorn Cichlid',
        description: 'Majestic Flowerhorn with large kok. Unique patterns and interactive personality.',
        quality: 'Show Grade',
        male_avail: true,
        female_avail: false,
        price_pair: 5000,
        images: ['https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800'],
        status: 'available'
    }
];

const loadBreeds = () => {
    const stored = localStorage.getItem('la_breeds');
    return stored ? JSON.parse(stored) : INITIAL_BREEDS;
};

const saveBreeds = (breeds) => {
    localStorage.setItem('la_breeds', JSON.stringify(breeds));
};

const loadOrders = () => {
    const stored = localStorage.getItem('la_orders');
    return stored ? JSON.parse(stored) : [];
};

const saveOrders = (orders) => {
    localStorage.setItem('la_orders', JSON.stringify(orders));
};

export const breedService = {
    getAll: () => loadBreeds(),
    getById: (id) => loadBreeds().find(b => b.id === id),
    add: (breed) => {
        const breeds = loadBreeds();
        const newBreed = { ...breed, id: Date.now().toString() };
        saveBreeds([...breeds, newBreed]);
        return newBreed;
    },
    update: (id, updates) => {
        const breeds = loadBreeds();
        const updated = breeds.map(b => b.id === id ? { ...b, ...updates } : b);
        saveBreeds(updated);
    },
    delete: (id) => {
        const breeds = loadBreeds();
        saveBreeds(breeds.filter(b => b.id !== id));
    }
};

export const orderService = {
    getAll: () => loadOrders(),
    create: (order) => {
        const orders = loadOrders();
        const newOrder = {
            ...order,
            id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toISOString(),
            shipped: false
        };
        saveOrders([newOrder, ...orders]);
        return newOrder;
    },
    update: (id, updates) => {
        const orders = loadOrders();
        const updated = orders.map(o => o.id === id ? { ...o, ...updates } : o);
        saveOrders(updated);
    }
};
