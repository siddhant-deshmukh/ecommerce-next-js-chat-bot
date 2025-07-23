"use client";

import { KeyboardEvent, useState } from "react"
import { Send, Settings, Shield, Sparkles } from "lucide-react"

export default function CustomizationRequest() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Welcome to our customization service! I'm here to help you create your perfect ring. What would you like to customize?",
      sender: "agent",
      timestamp: "2:30 PM",
      type: "welcome",
    },
    {
      id: 2,
      text: "Here are some popular customization options:",
      sender: "agent",
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
  ])
  const [inputMessage, setInputMessage] = useState("")

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "message",
      }
      setMessages([...messages, newMessage])
      setInputMessage("")

      // Simulate agent response based on user input
      setTimeout(() => {
        let agentResponse = ""
        const userInput = inputMessage.toLowerCase()

        if (userInput.includes("metal") || userInput.includes("gold") || userInput.includes("platinum")) {
          agentResponse =
            "Great choice! We offer 18K Rose Gold, Yellow Gold, and Platinum options. Rose Gold adds warmth, Yellow Gold is classic, and Platinum is the most durable. Which would you prefer? The price difference is typically $200-500."
        } else if (userInput.includes("diamond") || userInput.includes("carat") || userInput.includes("size")) {
          agentResponse =
            "We can customize the diamond size from 0.5ct to 3ct. Larger diamonds will increase the price significantly. We also offer different cuts: Round, Princess, Emerald, or Oval. What size and cut interests you?"
        } else if (userInput.includes("engrav")) {
          agentResponse =
            "Engraving is a beautiful personal touch! We can engrave up to 20 characters inside the band. Popular options include dates, initials, or short messages like 'Forever Yours'. Engraving adds $75 to the total cost."
        } else if (userInput.includes("setting") || userInput.includes("style")) {
          agentResponse =
            "We offer several setting styles: Classic Prong (current), Bezel (modern & secure), Halo (makes diamond appear larger), or Vintage-inspired. Each style has different pricing. Which style appeals to you?"
        } else {
          agentResponse =
            "Thank you for your customization request! Our design team will review your specifications and provide a detailed quote within 24 hours. We'll also create a 3D rendering for your approval before crafting begins."
        }

        const response = {
          id: messages.length + 2,
          text: agentResponse,
          sender: "agent",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "response",
        }
        setMessages((prev) => [...prev, response])
      }, 1500)
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  const handleOptionClick = (option) => {
    const newMessage = {
      id: messages.length + 1,
      text: option,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "message",
    }
    setMessages([...messages, newMessage])

    // Simulate agent response for option selection
    setTimeout(() => {
      let agentResponse = ""
      if (option.includes("metal")) {
        agentResponse =
          "Excellent! Metal type changes can really transform the look. Rose Gold gives a romantic feel, Yellow Gold is timeless, and Platinum is the most premium. The price difference ranges from $200-500. Which metal speaks to you?"
      } else if (option.includes("diamond")) {
        agentResponse =
          "Diamond customization is our specialty! We can adjust size (0.5ct-3ct), cut (Round, Princess, Emerald, Oval), color grade (D-J), and clarity (FL-SI2). What's most important to you - size, quality, or budget?"
      } else if (option.includes("setting")) {
        agentResponse =
          "Setting style dramatically changes the ring's personality! Classic Prong showcases the diamond, Bezel is modern and secure, Halo makes the center stone appear larger, and Vintage adds character. Which style matches your vision?"
      } else if (option.includes("engraving")) {
        agentResponse =
          "Engraving adds such a personal touch! We can engrave inside the band with dates, names, coordinates, or meaningful phrases (up to 20 characters). Font options include Script, Block, or Custom. What would you like engraved?"
      } else if (option.includes("band")) {
        agentResponse =
          "Band width affects both comfort and appearance! We offer 1.8mm (delicate), 2.3mm (standard), 2.8mm (substantial), or 3.5mm (bold). Wider bands cost slightly more but create a different aesthetic. What width feels right?"
      }

      const response = {
        id: messages.length + 2,
        text: agentResponse,
        sender: "agent",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "response",
      }
      setMessages((prev) => [...prev, response])
    }, 1000)
  }

  return (
    <div className="mt-16">
      <div className="text-left mb-3">
        {/* <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full text-sm font-medium mb-6 shadow-lg">
          <Settings className="w-4 h-4" />
          Customization Request
        </div> */}
        <h2 className="text-2xl font-bold text-black mb-4">Make It Uniquely Yours</h2>
        <p className="text-gray-600">
          Want to customize this ring? Chat with our design experts to create your perfect piece. We can modify metals,
          diamonds, settings, and add personal engravings.
        </p>
      </div>

      <div className="bg-gradient-to-br from-white to-amber-50/50 rounded-2xl shadow-xl border-2 border-gradient-to-br from-amber-200/50 to-orange-200/50 overflow-hidden">
        {/* Chat Header */}
        {/*  */}
        <div className="bg-gradient-to-r bg-amber-50/50 text-white p-4">
          <div className="flex items-center gap-3">
            {/* <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold">Design Consultation</h3>
              <p className="text-sm opacity-90">Custom Jewelry Specialist</p>
            </div> */}
            <div className="ml-auto">
              <span className="bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 rounded-full text-xs font-medium">Live Chat</span>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="h-96 p-6 overflow-y-auto space-y-4 bg-gradient-to-b from-white to-amber-50/30">
          {messages.map((message) => (
            <div key={message.id}>
              <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    message.sender === "user"
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                      : "bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 border border-gray-200"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${message.sender === "user" ? "text-white/80" : "text-gray-500"}`}>
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
                      onClick={() => handleOptionClick(option)}
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
              onClick={sendMessage}
              disabled={!inputMessage.trim()}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-xl flex items-center gap-2 font-semibold transition-all duration-300 transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              Send
            </button>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => handleOptionClick("I want to change the metal type")}
              className="px-3 py-2 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 text-amber-700 rounded-lg text-xs font-medium transition-all duration-300 border border-amber-200"
            >
              Change Metal
            </button>
            <button
              onClick={() => handleOptionClick("I want a larger diamond")}
              className="px-3 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 hover:from-orange-200 hover:to-yellow-200 text-orange-700 rounded-lg text-xs font-medium transition-all duration-300 border border-orange-200"
            >
              Larger Diamond
            </button>
            <button
              onClick={() => handleOptionClick("I want to add engraving")}
              className="px-3 py-2 bg-gradient-to-r from-yellow-100 to-amber-100 hover:from-yellow-200 hover:to-amber-200 text-yellow-700 rounded-lg text-xs font-medium transition-all duration-300 border border-yellow-200"
            >
              Add Engraving
            </button>
            <button
              onClick={() => handleOptionClick("I want a different setting style")}
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
          <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Settings className="w-6 h-6 text-white" />
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