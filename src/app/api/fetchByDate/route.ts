import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { off } from 'process';


export async function GET(req: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const page = searchParams.get('page');
    const postsPerPage = 9;
    const pageNumber = page ? parseInt(page, 10) : 1;
    const offset: number = (pageNumber - 1) * postsPerPage;

    console.log("Gotten query - extracting date");
    console.log("Date:", date);

    if (!date) {
      return NextResponse.json({ error: 'Date query parameter is required' }, { status: 400 });
    }
    
    let { data: analysed_data, count, error } = await supabase
    .from('analysed_data')
    .select('*', { count: 'exact' })
    .eq('date_scraped', date)
    .range(offset, offset + postsPerPage - 1);
        

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    let response = { data: analysed_data, count };
    return NextResponse.json(response, { status: 200 });
    
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error??' }, { status: 500 });
  }
}