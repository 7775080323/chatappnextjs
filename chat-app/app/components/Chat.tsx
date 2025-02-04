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
"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000"); // Connect to WebSocket server

export default function Chat() {
  const [username, setUsername] = useState("User"); // Default username
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Play notification sound
  const playSound = () => {
    const sound = new Audio("/path/to/sound.mp3"); // Replace with your sound file path
    sound.play();
  };

  useEffect(() => {
    // Receive messages
    socket.on("receiveMessage", (messageData) => {
      setMessages((prev) => [...prev, messageData]);
      playSound(); // Play sound on new message
    });

    // Handle typing status
    socket.on("typing", () => {
      setIsTyping(true);
    });

    socket.on("stopTyping", () => {
      setIsTyping(false);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("typing");
      socket.off("stopTyping");
    };
  }, []);

  // Handle message input
  const handleTyping = () => {
    socket.emit("typing", username);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: username, text: message };
      socket.emit("sendMessage", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setMessage("");
      socket.emit("stopTyping"); // Stop typing status
    }
  };

  const deleteMessage = (index: number) => {
    socket.emit("deleteMessage", index);
    setMessages(messages.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center p-5">
      <div className="w-full max-w-md border p-4 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">Real-Time Chat</h2>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-2 w-full"
        />

        {/* Messages Container */}
        <div className="h-64 overflow-y-auto border p-2 mb-2">
          {messages.map((msg, index) => (
            <div key={index} className="p-1 bg-gray-200 rounded mb-1">
              <strong>{msg.sender}: </strong>{msg.text}
              <button onClick={() => deleteMessage(index)} className="ml-2 text-red-500">Delete</button>
            </div>
          ))}
        </div>

        {/* Typing Indicator */}
        {isTyping && <div className="text-gray-500">Someone is typing...</div>}

        {/* Input and Send Button */}
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              handleTyping();
            }}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="border p-2 flex-1 rounded-l-md"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
