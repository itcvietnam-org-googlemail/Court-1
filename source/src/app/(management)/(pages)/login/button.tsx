'use client'
 
import { useState } from 'react'
 
export default function LikeButton({ likes, token }: { likes: number; token?: string }) {
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