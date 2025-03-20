import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';


export async function GET(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    console.log("Gotten query - extracting date");
    console.log("Date:", date);

    if (!date) {
      return NextResponse.json({ error: 'Date query parameter is required' }, { status: 400 });
    }
    
    let { data: analysed_data, error } = await supabase
    .from('analysed_data')
    .select('*')
    .eq('date_scraped', date)
    .range(0, 9);
        

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(analysed_data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error??' }, { status: 500 });
  }
}