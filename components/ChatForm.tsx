'use client'
import React, { useState } from 'react'

const ChatForm = ({
    onSendMessage,
}:{
    onSendMessage:(message:string)=>void
}) => {
    const [message , setMessage]=useState("")
    const handleSubmit=(e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(message.trim() !== ""){
            onSendMessage(message)
            setMessage("")
        }
        
    }
  return (
    <form onSubmit={handleSubmit} className='flex gap-2 mt-4'>
        <input type='text'
            onChange={(e)=>setMessage(e.target.value)}
            className='flex-1 px-4 py-2 rounded-lg' 
            placeholder='Type your message here..'/>

        <button type='submit'
            className='px-4 py-2 text-white rounded-lg bg-blue-500'>
            send    
        </button>    

    </form>
  )
}

export default ChatForm
