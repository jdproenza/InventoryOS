import { createClient } from "@supabase/supabase-js";
const supabase = createClient('https://qkexwpxaemeudzrnxsee.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrZXh3cHhhZW1ldWR6cm54c2VlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE0NDczNDQsImV4cCI6MjA4NzAyMzM0NH0.2VEbPEhvfK169hVq_2dk07hStpsZKAQl4eRRjphyLq0');

(async () => {
    // Delete the potentially erroneously created partial receipts for this investment ID just in case
    await supabase.from('investments').delete().like('id', '2602201716-%');

    // Revert original investment
    const { error } = await supabase.from('investments').update({ status: 'IN_TRANSIT', notes: '' }).eq('id', '2602201716');
    if (error) console.error(error);
    else console.log('Revertido con exito');
})();
