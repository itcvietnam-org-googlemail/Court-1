'use client'
 
import { useActionState, startTransition } from 'react';
import { login, logout } from './actions';
 
export default function LoginForm() {
  const [state, action, pending] = useActionState(login, {message: ''});
 
  return (
    <form>
        <p>{state.message}</p>
        <input type="text" name="email" defaultValue="manager@example.com" />
        <input type="text" name="password" defaultValue="Manager@123" />
        <button formAction={action}>
            {pending ? 'Logining' : 'Login'}
        </button>
    </form>
  );
}