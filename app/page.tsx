'use client'

import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import { useEffect, useState } from "react";
import { socket } from "@/lib/socketClient"
export default function Home() {

  const[room , setRoom]=useState("");
  const[joined , setJoined]=useState(false);
  const [messages , setMessages]=useState<
  {sender:string; message:string}[]>([]);
  const [userName , setUserName]=useState("");

  useEffect(()=>{

     socket.on("message" , (data)=>{
      setMessages((prev)=> [...prev, data])
    })


    socket.on("user_joined" , (message)=>{
      setMessages((prev)=> [...prev, { sender:"system" , message}])
    })
     return ()=>{
    socket.off("user_joined");
    socket.off("message")
  }
  },[])

 
  
  const handleJoinedRoom=()=>{
    if(room && userName){
      socket.emit("join-room" , {room , username:userName})
    }
    setJoined(true)
  }

  const handleSendMessage=(message:string)=>{
    const data={room , message , sender:userName};
    setMessages((prev)=>[...prev , {sender:userName , message}]);
    socket.emit("message" , data);
    
  }
  
  
  return (
   <div className="flex mt-24 justify-center w-full">
    {!joined ? (
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Join a Room</h1>
        <input 
          type="text"
          placeholder="enter your userName"
          value={userName}
          onChange={(e)=>setUserName(e.target.value)}
          className="w-64 px-4 py-2 mb-4 border-2 rounded-lg"/>
          <input 
          type="text"
          placeholder="enter your userName"
          value={room}
          onChange={(e)=>setRoom(e.target.value)}
          className="w-64 px-4 py-2 mb-4 border-2 rounded-lg"/>
          <button 
          onClick={handleJoinedRoom}
          className="text-white bg-blue-600 rounded-lg px-4 py-2">Join Room</button>
      </div>
    ):(
      <div className="w-full max-w-3xl mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Room:{room}</h1>
      <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-gray-200 border2 rounded-lg" >
        {
          messages.map((item , index)=>(
            <ChatMessage 
              key={index}
              sender={item.sender}
              message={item.message}
              isOwnMessage={item.sender === userName}/>
          ))
        }
      </div>
      <div>
        <ChatForm onSendMessage={handleSendMessage}/>
      </div>
    </div>
    )}
    
   </div>
  );
}
