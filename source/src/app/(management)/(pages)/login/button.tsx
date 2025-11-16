'use client'
 
import { useEffect, useState } from 'react';
 
export default function LikeButton({ likes, t, token }: { 
    likes: number;
    t?: (key: string, replacement?: Record<string, string | number>) => string;
    token?: string;
 }) {
    const [like, setLike] = useState(likes);

    const increment = () => {
        setLike(previousLike => previousLike + 1);
    };

    const decrement = () => {
        setLike(previousLike => previousLike - 1);
    };

    return (<div>
        <button onClick={increment}>
            Like ({like})
        </button>
        <button onClick={decrement}>
            Unlike
        </button>
        {token ? (
            <p>{token}</p>
        ) : (
            <p>Token empty!</p>
        )}
    </div>);
}