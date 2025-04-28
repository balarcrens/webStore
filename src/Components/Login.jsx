import React, { useState } from 'react'
import Alert from './Alert';
import toast from 'react-hot-toast';

export default function Login() {
    const [cred, setcred] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`https://webstore-backend-1boc.onrender.com/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });
        const data = await response.json();
        localStorage.setItem("auth-token", data.token);
        // alert(data.token)
        if (data) {
            window.location.href = '/';
            toast.success("SignUp Successfully", {
                duration: 1500
            });
        } else {
            toast.error("Invalid Credentials", {
                duration: 1500,
            });
        }
    }

    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
    }

    return (
        <div className='container p-5 border my-5'>
            <h1 className='text-center'>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" id="email" autoComplete="username" aria-describedby="emailHelp" onChange={onChange} value={cred.email} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="password" autoComplete="current-password" onChange={onChange} value={cred.password} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            <Alert />
        </div>
    )
}
