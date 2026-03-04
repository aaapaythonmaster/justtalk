'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  polished?: string;
  explanation?: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hey there! I'm your New York buddy. Let's chat and practice English together. What's up?",
      sender: 'ai'
    }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'ai',
        polished: data.polished,
        explanation: data.explanation
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I couldn't process your message. Please try again.",
        sender: 'ai'
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-white py-4 px-6 shadow-sm">
        <h1 className="text-xl font-semibold text-center">English Buddy</h1>
      </header>
      
      <div className="flex-1 chat-container flex flex-col">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`chat-message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}>
              {message.content}
            </div>
          </div>
        ))}
        
        {messages.map((message) => (
          message.sender === 'ai' && message.polished && message.explanation && (
            <div key={`${message.id}-card`} className="px-4">
              <div className="card">
                <h3 className="font-medium mb-2">Polished Version:</h3>
                <p className="text-primary mb-2">{message.polished}</p>
                <h3 className="font-medium mb-2">Explanation:</h3>
                <p>{message.explanation}</p>
              </div>
            </div>
          )
        ))}
        
        <div ref={chatEndRef} />
      </div>
      
      <footer className="bg-white py-4 px-6">
        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button onClick={handleSend}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}