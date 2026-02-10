import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.VITE_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: any, res: any) {
    try {
        const { count, error } = await supabase
            .from('wlug_registrations')
            .select('*', { count: 'exact', head: true });

        if (error) {
            throw error;
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET');

        return res.status(200).json({ total: count });
    } catch (error: any) {
        return res.status(500).json({ error: error.message });
    }
}
