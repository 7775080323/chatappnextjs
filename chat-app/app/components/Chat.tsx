// "use client";

// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000"); // Match backend server URL

// const Chat = () => {
//   const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
//   const [input, setInput] = useState("");

//   useEffect(() => {
//     if (!socket) return;

//     // ✅ Listen for incoming messages
//     socket.on("message", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     return () => {
//       socket.off("message"); // Cleanup listener on unmount
//     };
//   }, []);

//   const sendMessage = (e?: React.FormEvent) => {
//     e?.preventDefault();
//     if (input.trim() === "") return;

//     const message = { sender: "user", text: input };

//     setMessages((prevMessages) => [...prevMessages, message]);

//     // ✅ Emit message to backend
//     socket.emit("sendMessage", message);

//     setInput("");
//   };

//   return (
//     <div className="chat-container">
//       {/* Chat Messages */}
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index} className={msg.sender === "user" ? "sent" : "received"}>
//             <span>{msg.text}</span>
//           </div>
//         ))}
//       </div>

//       {/* Input Form */}
//       <form onSubmit={sendMessage}>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage(e)}
//           placeholder="Type a message..."
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;


// "use client";

// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000"); // Connect to WebSocket server

// export default function Chat() {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<string[]>([]);

//   useEffect(() => {
//     // Receive messages
//     socket.on("receiveMessage", (messageData) => {
//       setMessages((prev) => [...prev, messageData]);
//     });

//     return () => {
//       socket.off("receiveMessage"); // Cleanup on unmount
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit("sendMessage", message);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-5">
//       <div className="w-full max-w-md border p-4 rounded-md shadow-md">
//         <h2 className="text-xl font-bold mb-4">Real-Time Chat</h2>
//         <div className="h-64 overflow-y-auto border p-2 mb-2">
//           {messages.map((msg, index) => (
//             <div key={index} className="p-1 bg-gray-200 rounded mb-1">
//               {msg}
//             </div>
//           ))}
//         </div>
//         <div className="flex">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="border p-2 flex-1 rounded-l-md"
//             placeholder="Type a message..."
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

//i am using
// "use client";

// import { useEffect, useState } from "react";
// import io from "socket.io-client";

// const socket = io("http://localhost:5000");

// interface Message {
//   sender: string;
//   text: string;
// }

// export default function Chat() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     // Load previous messages from API
//     fetch("http://localhost:5000/api/messages")
//       .then((res) => res.json())
//       .then((data) => setMessages(data));

//     // Receive previous messages from WebSocket
//     socket.on("previousMessages", (data: Message[]) => {
//       setMessages(data);
//     });

//     // Receive new messages
//     socket.on("receiveMessage", (messageData: Message) => {
//       setMessages((prev) => [...prev, messageData]);
//     });

//     return () => {
//       socket.off("receiveMessage");
//       socket.off("previousMessages");
//     };
//   }, []);

//   const sendMessage = () => {
//     if (message.trim()) {
//       const newMessage = { sender: "User", text: message };

//       // Emit message to server
//       socket.emit("sendMessage", newMessage);
//       setMessage("");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-5">
//       <div className="w-full max-w-md border p-4 rounded-md shadow-md">
//         <h2 className="text-xl font-bold mb-4">Real-Time Chat</h2>
//         <div className="h-64 overflow-y-auto border p-2 mb-2">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`p-1 rounded mb-1 ${
//                 msg.sender === "User" ? "bg-blue-500 text-white text-right" : "bg-gray-200 text-left"
//               }`}
//             >
//               <span className="font-bold">{msg.sender}: </span>
//               {msg.text}
//             </div>
//           ))}
//         </div>
//         <div className="flex">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="border p-2 flex-1 rounded-l-md"
//             placeholder="Type a message..."
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { ReactNode, useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://192.168.31.179:5000"); // Ensure correct backend URL

interface Message {
  time: ReactNode;
  sender: string;
  text: string;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Ask for username
    const enteredUsername = prompt("Enter your name:");
    setUsername(enteredUsername || "User");

    // Load previous messages from API
    fetch("http://localhost:5000/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));

    // Receive previous messages from WebSocket
    socket.on("previousMessages", (data: Message[]) => {
      setMessages(data);
    });

    // Receive new messages
    socket.on("receiveMessage", (messageData: Message) => {
      setMessages((prev) => [...prev, messageData]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("previousMessages");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: username, text: message };

      // Emit message to server
      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-black text-white shadow-lg rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-3 text-lg font-semibold">
          Real-Time Chat
        </div>

        {/* Messages Box */}
        <div className="h-80 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                msg.sender === username ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`px-4 py-2 max-w-xs rounded-lg shadow ${
                  msg.sender === username
                    ? "bg-blue-500 text-white" // User messages (sent)
                    : "bg-gray-800 text-gray-200" // Other messages (received)
                }`}
              >
                <span className="block text-xs font-semibold">{msg.sender}</span>
                <span>{msg.text}</span>
                <span className="block text-xs text-gray-400 mt-1">{msg.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="flex border-t border-gray-700">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-l-xl text-white outline-none"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-xl hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}