export class LocalStorage {
  get() {
    return JSON.parse(localStorage.getItem('directus-data')!);
  }
  set(data: string) {
    localStorage.setItem('directus-data', JSON.stringify(data));
  }
}