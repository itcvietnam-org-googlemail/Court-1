// lib/form-store.ts
import { cache } from 'react';

// Sử dụng cache() để đảm bảo dữ liệu chỉ tồn tại trong vòng đời của 1 request duy nhất
export const getFormStore = cache((data?: any) => {
  return { data };
});