'use client';

interface Storage {
    setItem(key: string, value: string): void;
    getItem(key: string): string | null;
}

export const storage: Storage = {
    setItem(key: string, value: string) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getItem(key: string): string | null {
        return JSON.parse(localStorage.getItem(key) ?? '');
    }
};