"use client";

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react"
import { Send, Settings, Shield, Sparkles } from "lucide-react"
import { post } from "@/lib/apiCallClient";
import { Spinner } from "@/components/ui/spinner";

export default function CustomizationRequest() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to our customization service! I'm here to help you create your perfect ring. What would you like to customize?",
      sender: "assistant",
      timestamp: "2:30 PM",
      type: "welcome",
    },
    {
      id: 2,
      text: "Here are some popular customization options:",
      sender: "assistant",
      timestamp: "2:30 PM",
      type: "options",
      options: [
        "Change metal type (Rose Gold, Yellow Gold, Platinum)",
        "Adjust diamond size or quality",
        "Modify ring setting style",
        "Add engraving",
        "Change band width",
      ],
    },
  ]);
  const [msgLoading, setMsgLoading] = useState(false);
  const chatIdRef = useRef<string>(null);
  const scrollRef = useRef<HTMLDivElement>(null)
  const [inputMessage, setInputMessage] = useState("")

  const sendMessage = useCallback((message: string) => {
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "message",
    }
    setMessages([...messages, newMessage])
    setInputMessage("")

    setMsgLoading(true);
    post('/api/customisation-chat', {
      chatId: chatIdRef.current,
      product: {
        "name": "Radiant Solitaire Diamond Ring",
        "desc": "18K White Gold | 1.5 Carat Diamond",
        "tagline": "Elevate your special moments with our exquisite Radiant Solitaire Diamond Ring. This stunning piece features a brilliant 1.5 carat diamond set in luxurious 18K white gold, creating a timeless symbol of elegance and love."
      },
      messages: messages.slice(2, -1).map(ele => { return { role: ele.sender, content: ele.text } }),
      newMessage: newMessage.text
    }).then((res) => {
      if (res && res.chatId) {
        chatIdRef.current = res.chatId;
        const response = {
          id: messages.length + 2,
          text: res.mainReply,
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "response",
          options: res.suggestedInputs ? res.suggestedInputs : [],
        }
        setMessages((prev) => [...prev, response]);
      }
    }).catch((err) => {
      if(err && err.data) {
        const response = {
          id: messages.length + 2,
          text: err.data.msg,
          sender: "assistant",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "error",
        }
        setMessages((prev) => [...prev, response]);
      }
    }).finally(() => {
      setMsgLoading(false);
    })

  }, [messages, inputMessage]);

  const handleKeyPress = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage(inputMessage);
    }
  }, [inputMessage])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  if (!isClient) return <div className="w-full h-14"></div>;
  return (
    <div className="mt-16">
      <div className="text-left mb-3">
        {/* <div className="inline-flex items-center gap-2 badge-gradient px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
          <Settings className="w-4 h-4" />
          Customization Request
        </div> */}
        <h2 className="text-2xl font-bold text-black mb-4">Make It Uniquely Yours</h2>
        <p className="text-gray-600">
          Want to customize this ring? Chat with our design experts to create your perfect piece. We can modify metals,
          diamonds, settings, and add personal engravings.
        </p>
      </div>

      <div className="bg-gradient-to-br from-white to-amber-50/50 rounded-2xl shadow-xl border-gradient overflow-hidden">
        {/* Chat Header */}
        {/*  */}
        <div className="bg-gradient-to-r bg-amber-50/50 p-4">
          <div className="flex items-center gap-3">
            {/* <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Design Consultation</h3>
              <p className="text-sm opacity-90">Custom Jewelry Specialist</p>
            </div> */}
            <div className="ml-auto">
              <span className="badge-gradient px-3 py-1 rounded-full text-xs font-medium">Live Chat</span>
            </div>
          </div>
        </div>

        <div ref={scrollRef} className="h-96 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-white to-amber-50/30 chat-scroll-area">
          {messages.map((message) => (
            <div key={message.id}>
              <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${message.type == 'error' ? `bg-red-100 text-red-950`:(
                    message.sender === "user"
                    ? "badge-gradient"
                    : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200"
                  )}`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.type == 'error' ? 'text-red-800' : (
                      message.sender === "user" ? "text-white/80" : "text-gray-500"
                    )}`}>
                    {message.timestamp}
                  </p>
                </div>
              </div>

              {/* Options for agent messages */}
              {message.type === "options" && message.options && (
                <div className="mt-3 flex gap-1 flex-wrap">
                  {message.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => sendMessage(option)}
                      className="block text-left p-2 bg-gradient-to-r from-white to-amber-50 hover:from-amber-50 hover:to-orange-50 border border-amber-200 hover:border-amber-300 rounded-lg transition-all duration-300 text-xs text-gray-700 hover:text-amber-700"
                    >
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"></div>
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {
            msgLoading &&
            <div className="mr-auto py-4 flex gap-5">
              <Spinner className="" />
              <span className="text-sm leading-relaxed font-medium">Just a Second</span>
            </div>
          }
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-amber-200 bg-gradient-to-r from-white to-amber-50/50">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your customization ideas..."
              className="flex-1 px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-colors duration-300 bg-white text-gray-800 placeholder-gray-500"
            />
            <button
              onClick={() => { sendMessage(inputMessage) }}
              disabled={!inputMessage.trim()}
              className="px-6 py-3 badge-gradient hover:from-amber-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => sendMessage("I want to change the metal type")}
              className="px-3 py-2 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 text-amber-700 rounded-lg text-xs font-medium transition-all duration-300 border border-amber-200"
            >
              Change Metal
            </button>
            <button
              onClick={() => sendMessage("I want a larger diamond")}
              className="px-3 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 hover:from-orange-200 hover:to-yellow-200 text-orange-700 rounded-lg text-xs font-medium transition-all duration-300 border border-orange-200"
            >
              Larger Diamond
            </button>
            <button
              onClick={() => sendMessage("I want to add engraving")}
              className="px-3 py-2 bg-gradient-to-r from-yellow-100 to-amber-100 hover:from-yellow-200 hover:to-amber-200 text-yellow-700 rounded-lg text-xs font-medium transition-all duration-300 border border-yellow-200"
            >
              Add Engraving
            </button>
            <button
              onClick={() => sendMessage("I want a different setting style")}
              className="px-3 py-2 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 text-amber-700 rounded-lg text-xs font-medium transition-all duration-300 border border-amber-200"
            >
              Different Setting
            </button>
          </div>
        </div>
      </div>

      {/* Customization Benefits */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-gradient-to-br from-white to-amber-50 rounded-xl border border-amber-200 shadow-lg">
          <div className="w-12 h-12 badge-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-black mb-2">Expert Design</h3>
          <p className="text-sm text-gray-600">Our master jewelers will craft your vision with precision and care</p>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-white to-orange-50 rounded-xl border border-orange-200 shadow-lg">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-black mb-2">3D Preview</h3>
          <p className="text-sm text-gray-600">See your custom design in 3D before we begin crafting</p>
        </div>

        <div className="text-center p-6 bg-gradient-to-br from-white to-yellow-50 rounded-xl border border-yellow-200 shadow-lg">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-black mb-2">Lifetime Warranty</h3>
          <p className="text-sm text-gray-600">All custom pieces include our comprehensive lifetime warranty</p>
        </div>
      </div>
    </div>
  )
}