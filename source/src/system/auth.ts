import { createDirectus, readMe, authentication, rest } from '@directus/sdk';
import { cookies } from 'next/headers'; 
import { createClient } from '@/system/client';

export async function auth() {
  const client = createClient(true);
  
  try {
    const user = await client.request(readMe());
    
    return user;
  } catch (error) {
    return null; 
  }
}