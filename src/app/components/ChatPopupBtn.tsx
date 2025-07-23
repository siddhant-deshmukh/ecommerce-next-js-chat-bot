"use client"

import { MessageCircle, Send } from "lucide-react"
import { KeyboardEvent, useState } from "react"

export default function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Sarah, your jewelry consultant. How can I help you with this beautiful ring today?",
      sender: "agent",
      timestamp: "2:30 PM",
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setInputMessage("")

      // Simulate agent response
      setTimeout(() => {
        const agentResponse = {
          id: messages.length + 2,
          text: "Thank you for your question! Let me help you with that. This ring is perfect for engagements and comes with a lifetime warranty. Would you like to know more about the diamond specifications?",
          sender: "agent",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, agentResponse])
      }, 1500)
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 btn-gradient rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 z-50 flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-gradient-to-br from-white to-amber-50/50 rounded-2xl shadow-2xl border-gradient z-50 flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="badge-gradient p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold">Sarah - Jewelry Expert</h3>
                <p className="text-xs opacity-90">Online now</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
            >
              ×
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === "user"
                      ? "badge-gradient"
                      : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === "user" ? "text-white/80" : "text-gray-500"}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-amber-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-300 bg-white text-sm"
              />
              <button
                onClick={sendMessage}
                className="w-10 h-10 btn-gradient rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
