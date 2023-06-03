import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';


export default function Login(
) {
    const [user, setUser] = useState("");
    function callLoginApi(values, bag) {
        axios
        .post("http://127.0.0.1:8000/api/v1/account/login/", {
            email: values.email,
            password: values.myPassword,
        })
        .then((response) => {
            const { user, token } = response.data;
            localStorage.setItem("token", token);
            bag.props.setUser(user);
            // console.log(response.data);
        })
        .catch(() => {
            console.log("Galat login hai")
        });
    }
      //validations
          // in password after string min(6,"error message customized").max(12)
          const schema = Yup.object().shape({ //schema is structure validation
            email: Yup.string().email().required(),
            password: Yup.string().required(),
        });
        const initialValues={
            email:"",
            password:""
        }
    if(user){
        return <Navigate to="/"/>
    }
    const {handleSubmit, values, handleChange, 
        resetForm,errors,handleBlur,touched,
        isValid,dirty} = useFormik({
        initialValues:{
            email:"",
            password:"",
        },
        validationSchema: schema,
        onSubmit: callLoginApi,
    });
  
    return (
        <div className='mx-5 mt-5'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="sr-only" >Email address</label>
                    <input 
                        value={values.email} // const [email, setEmail] = useState();
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="email"
                        id="email"
                        type="email" className="form-control" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    {touched.email && errors.email && (<div className='text-red-700'>{errors.email}</div>)}   
                </div>
                <div className="mb-3">
                    <label htmlFor="password" >Password</label>
                    <input value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        name="password"
                        id="password"
                        type="password" className="form-control" />
                     {touched.password && errors.password && (<div className='text-red-700'>{errors.password}</div>)}   
                </div>
                <div className='text-center'>
                    <button type='submit' disabled={!dirty && !isValid} className="btn btn-primary disabled:text-indigo-100">Login</button>
                    <button type='button' onClick={resetForm} className="btn btn-primary">Reset</button>

                </div>
            </form>
        </div>
    )
}
