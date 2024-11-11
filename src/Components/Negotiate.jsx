// Chat.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../Config/firebase';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';

const Chat = ({ listingId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, 'chats'), where('listingId', '==', listingId));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, [listingId]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      await addDoc(collection(db, 'chats'), {
        listingId,
        text: newMessage,
        sender: user.uid,
        timestamp: new Date(),
      });
      setNewMessage('');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="h-64 overflow-y-scroll mb-2">
        {messages.map((msg) => (
          <div key={msg.id} className={msg.sender === user.uid ? "text-right" : "text-left"}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
        className="w-full px-4 py-2 border rounded-md"
      />
      <button onClick={sendMessage} className="w-full bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
        Send
      </button>
    </div>
  );
};

export default Chat;
