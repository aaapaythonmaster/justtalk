'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  polished?: string;
  explanation?: string;
}

export default function ChatPage() {
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
        content: data.response || "Sorry, I couldn't process your message. Please try again.",
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
    <div className="chat-page">
      {/* 导航栏 */}
      <nav className="navbar">
        <div className="nav-left">
          <Link href="/" className="nav-logo">
            Justtalk
          </Link>
          <div className="nav-links">
            <Link href="/chat" className="nav-link">
              chat
            </Link>
            <Link href="/record" className="nav-link">
              record
            </Link>
          </div>
        </div>
        <div className="nav-moons">
          <div className="moon-icon moon-1"></div>
          <div className="moon-icon moon-2"></div>
          <div className="moon-icon moon-3"></div>
          <div className="moon-icon moon-4"></div>
          <div className="moon-icon moon-5"></div>
        </div>
      </nav>

      {/* 聊天区域 */}
      <div className="chat-container">
        {messages.map((message) => (
          <div key={message.id}>
            <div className={`chat-message ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}>
              {message.content}
            </div>
            
            {message.sender === 'ai' && message.polished && message.explanation && (
              <div className="polished-card">
                <h3>Polished Version</h3>
                <p>{message.polished}</p>
                <h3>Explanation</h3>
                <p>{message.explanation}</p>
              </div>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* 输入区域 */}
      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="send-button" onClick={handleSend}>
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
