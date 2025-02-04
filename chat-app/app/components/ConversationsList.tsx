import Image from 'next/image';
import React from 'react';

const conversations = [
  { id: 1, name: "Prerna", image: "/images/peri.jpg", message: "Good work!" },
  { id: 2, name: "Manali", image: "/images/manu.jpg", message: "Good work!" },
  { id: 3, name: "Dhanashri", image: "/images/dhani.jpg", message: "Good work!" },
  { id: 4, name: "Prerna", image: "/images/manu.jpg", message: "Good work!" }
];

const ConversationsList = ({ searchQuery = '' }) => { // Default to empty string
  // Filter conversations based on search input
  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-6 px-4">
      {filteredConversations.map((conversation) => (
        <ul key={conversation.id} className="flex items-center gap-[15px] px-3 py-2 bg-[#312F2F] rounded-[10px] cursor-pointer mt-[13px]">
          <div className="w-14 h-14 relative">
            <span className="absolute top-0 right-0 bg-[#00FF38] w-[15px] h-[15px] rounded-full z-10"></span>
            <Image src={conversation.image} fill className="w-full h-full object-cover rounded-full" alt="user image" />
          </div>
          <div>
            <span className="text-white capitalize text-xs font-semibold">{conversation.name}</span>
            <span className="text-[#767876] block text-xs font-semibold">{conversation.message}</span>
          </div>
        </ul>
      ))}
      {filteredConversations.length === 0 && (
        <p className="text-white text-center mt-4 text-sm">No results found</p>
      )}
    </div>
  );
};

export default ConversationsList;
