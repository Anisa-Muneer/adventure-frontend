import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Success() {
    const navigate = useNavigate()
  return (
    <div className='w-full flex justify-center flex-col items-center'>
      <CheckCircleIcon color='green' className='w-36'/>
      <Typography className='py-5' variant='h5'>Payment Successful</Typography>
      <Button onClick={()=>navigate('/')} >Back To Home</Button>
    </div>
  )
}

export default Success