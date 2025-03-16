import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '../../utils/supabase/server';
import { cookies } from 'next/headers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  console.log('gotten req');
  const { data, error } = await supabase.from('analysed_data').select('*');

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(200).json(data);
}