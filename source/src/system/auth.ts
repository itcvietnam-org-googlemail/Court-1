import { createDirectus, readMe, authentication, rest } from '@directus/sdk';
import { cookies } from 'next/headers'; 
import { createClient } from '@/system/client';

export async function auth() {
  const client = createClient(true);
  
  try {
    // readMe() là một yêu cầu API bảo mật.
    // SDK sẽ tự động dùng refresh_token để làm mới access_token nếu cần.
    const user = await client.request(readMe());
    
    // Nếu thành công, có nghĩa là người dùng đã đăng nhập hợp lệ
    return user;

  } catch (error) {
    // Nếu xảy ra lỗi (401 Unauthorized, 403 Forbidden), 
    // có nghĩa là chưa đăng nhập hoặc refresh token đã hết hạn.
    return null; 
  }
}