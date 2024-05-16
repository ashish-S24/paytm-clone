import React, { useEffect, useState } from 'react'
import { Appbar } from '../components/Appbar'
import { Balance } from '../components/Balance'
import { Users } from '../components/Users'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

const Dashboard = () => {
  const [balance , setBalance] = useState();
  const [ searchParams ] = useSearchParams();
  const userId = searchParams.get("user");
   useEffect(()=> {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          params: {
            userId: userId
          }
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
  
    fetchBalance();
   }, [])
  return (
    <div>
        <Appbar />
        <div className='m-8'>
            <Balance value={balance} />
            <Users />
        </div>
    </div>
  )
}

export default Dashboard