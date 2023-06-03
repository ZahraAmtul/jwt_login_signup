import { Routes, Route } from 'react-router-dom'
import Home from './components/partials/Home'
import Login from './components/partials/Login'
import NavBar from './components/partials/NavBar'
import { useState } from 'react'
import axios from 'axios'

function App() {
  const [user, setUser] = useState();

  function callLoginApi(values) {
    axios.post("http://127.0.0.1:8000/api/v1/account/login/", {
        email: values.email,
        password: values.myPassword,
    }).then((response) => {
        const { user, token } = response.data;
        localhost.setItem("token", token);
        // console.log(response.data);
    }).catch(() => {
        console.log("Galat login hai")
    });
}

  console.log("logged in user is", user);

  return (
    <>
    <NavBar/>
    <Routes>
      <Route index element={<Home user={user}/>}/>
      <Route path='/Login' element={<Login user={user} setUser={setUser}/>}/>
    </Routes>
    </>
  )
}

export default App
