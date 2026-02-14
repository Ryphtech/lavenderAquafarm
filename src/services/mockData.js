import { supabase } from '../lib/supabase';

export const breedService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('breeds')
            .select('*')
            .order('name');

        if (error) {
            console.error('Error fetching breeds:', error);
            throw error;
        }
        return data;
    },

    getById: async (id) => {
        const { data, error } = await supabase
            .from('breeds')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    add: async (breed) => {
        const { data, error } = await supabase
            .from('breeds')
            .insert([breed])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id, updates) => {
        const { error } = await supabase
            .from('breeds')
            .update(updates)
            .eq('id', id);

        if (error) throw error;
    },

    delete: async (id) => {
        const { error } = await supabase
            .from('breeds')
            .delete()
            .eq('id', id);

        if (error) throw error;
    }
};

export const orderService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    create: async (order) => {
        const { data, error } = await supabase
            .from('orders')
            .insert([{
                ...order,
                id: order.id || `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
                status: order.status || 'Waiting for Confirmation'
            }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id, updates) => {
        const { error } = await supabase
            .from('orders')
            .update(updates)
            .eq('id', id);

        if (error) throw error;
    }
};

