import React, { useState } from 'react'
// import Alert from './Alert';
// import toast from 'react-hot-toast';

export default function Signup() {
    const [cred, setcred] = useState({ name: "", email: "", password: "", cpassword: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:7000/api/auth/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password })
        });
        const data = await response.json();
        localStorage.setItem("auth-token", data.token)
        if (data) {
            window.location.href = '/'
        } else {
            
        }
    }

    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
    }

    return (
        <div className='container p-5 border my-5'>
            <h1 className='text-center'>SignUp</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">UserName</label>
                    <input type="text" name='name' className="form-control" id="name" autoComplete="username" onChange={onChange} value={cred.name} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" name='email' className="form-control" id="email" autoComplete="username" aria-describedby="emailHelp" onChange={onChange} value={cred.email} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="password" autoComplete="current-password" minLength={5} onChange={onChange} value={cred.password} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" name='cpassword' className="form-control" id="cpassword" autoComplete="current-password" minLength={5} onChange={onChange} value={cred.cpassword} required />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
            {/* <Alert /> */}
        </div>
    )
}
