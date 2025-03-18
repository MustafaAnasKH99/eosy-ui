import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getTodayDate } from '@/utils/getDate';

export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    
    // today's date yyyy-mm-dd
    let date = getTodayDate();
    
    let { data: analysed_data, error } = await supabase
    .from('analysed_data')
    .select('*')
    .eq('date_scraped', date)
    .range(0, 9);
        

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(analysed_data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}