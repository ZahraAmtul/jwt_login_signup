import axios from 'axios'
import React, { useState } from 'react'

export default function LoginCopy() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    function callingLoginApi(values, bag) {
        axios.post("http://127.0.0.1:8000/api/v1", {
            email: values.email,
            password: values.myPassword,
        }).then((response) => {
            const { user, token } = response.data;
            localStorage.setItem("token", token);
            bag.props.setUser(user);
            // console.log(response.data);
        }).catch(() => {
            console.log("Invalid Credentials")
        });
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value)
    }
    function resetForm (){
        setPassword("")
        setEmail("")
    }
    //validations
    const schema = Yup.object().shape({
        email: Yup.string().email().required(),
        myPassword: Yup.string().min(6).max(12).required(),
    })
    return (
        <div className='mx-5 mt-5'>
            <form onSubmit={callingLoginApi}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input value={email}
                        onChange={handleEmailChange}
                        type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input value={password}
                        onChange={handlePasswordChange}
                        type="password" class="form-control" id="exampleInputPassword1" />
                </div>
                <div className='text-center'>
                    <button type='button' onClick={resetForm} class="btn btn-primary">Login</button>
                    <button type='submit' class="btn btn-primary">Reset</button>

                </div>
            </form>
        </div>
    )
}
