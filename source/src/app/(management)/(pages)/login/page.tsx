/*
* Import
*/
import { headers } from 'next/headers';
import React from 'react';
import { login, sigin, logout, placeholder } from './actions';
import LikeButton from './button';
import LoginButton from './login-button';
import SubmitButton from './submit-button';
import Link from 'next/link';
import { setting } from '@/system/setting';
import TextField from '@mui/material/TextField';
import TextInput from './textinput';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Form from 'next/form';
import FormClient from './form';
import { getFormStore } from './store';

/*
* Export
*/
export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
    const data = { id: 1, name: "Directus/Ping", type: "Quản trị lương", options: {id: 1, name: "Directus", type: "Admin"} };
    const string = JSON.stringify(data);
    const encoded = Buffer.from(string).toString('base64');
    console.log(encoded);
    const decoded = Buffer.from(encoded, 'base64').toString('utf8');
    console.log(decoded);
    //Nho replace 3 ky tu dat biet trong chuoi base64 la: + / = (dau = co the bo vi khong can de giai ma)
    //console.log((await headers()).get('x-app') + '-page');

    const { id } = await params;
    const sxjson = '{"fontWeight": "bold", "color": "red", ":has(.Mui-expanded)": {"color": "green"}, "& span": {"color": "yellow"}, ":hover": {"color": "blue"}}';
    const sx = JSON.parse(sxjson);

    return (
        <section>
            <h1>LOGIN</h1>
            <p>Setting: {setting.project_name} ({setting.default_language})</p>

            <hr />

            <LikeButton likes={12} />

            <hr />

            <Form action={placeholder} key="my-form">
              <TextField name="email" defaultValue="manager@example.com" />
              <TextField name="password" defaultValue="Manager@123" />
              <TextInput name="text" placeholder="Text input" />
              <LoginButton pendingText="Logining..." fn={login}>Login Button</LoginButton>
            </Form>

            <hr />

            <Form action={placeholder}>
              <TextField name="email" defaultValue="signer@example.com" />
              <TextField name="password" defaultValue="Signer@123" />
              <TextInput name="description" placeholder="Description input" />
              <LoginButton pendingText="Onclicking..." fn={sigin} useFormAction={false}>Onclick Button</LoginButton>
            </Form>

            <hr />

            <Form action={sigin}>
              <TextField name="title" defaultValue="Title" />
              <TextInput name="note" placeholder="Note" />
              <SubmitButton>Submit Button</SubmitButton>
            </Form>

            <hr />

            <form action={logout}>
                <button type="submit">Logout</button>
            </form>

            <hr />

            <FormClient data={{}} />

            <hr />
            
            <Link href="/">Home Page</Link>
        </section>
    );
}