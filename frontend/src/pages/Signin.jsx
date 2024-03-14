import React, { useState } from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signin = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  return (
    <div className='bg-slate-300 h-screen flex justify-center'>
        <div className='flex flex-col justify-center'>
            <div className='bg-white rounded-lg w-80 text-center p-2 h-max px-4'>
                <Heading label={"Sign in"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <InputBox onChange={(e)=> {
                    setUsername(e.target.value);
                }}
                 placeholder={"johndoe@gmail.com"} label={"Email"} />
                <InputBox onChange={(e) => {
                   setPassword(e.target.value);
                }}
                 placeholder={"123456"} label={"Password"} />
                <div className='pt-4'>
                    <Button onPress={async () => {
                      await axios.post("http://localhost:3000/api/v1/user/signin", {
                        username,
                        password
                      }).then((res) => {
                          localStorage.setItem("token", res.data.token);
                          navigate("/dashboard");
                      })
                    }} label={"Sing in"} />
                </div>
                <BottomWarning label={"Don't have account?"} buttonText={"Sign up"} to={"/signup"} />
            </div>
        </div>
    </div>
  )
}

export default Signin