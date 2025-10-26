"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

const personalities = {
  pretentious: {
    name: "Criterion Claude",
    responses: [
      "Ah, you see, this film is a masterclass in visual storytelling that most plebeians simply cannot comprehend.",
      "The cinematography here is reminiscent of Tarkovsky's later work, though I doubt you'd understand the reference.",
      "This is cinema, not mere entertainment. The auteur theory clearly applies here.",
      "The mise-en-scène is absolutely exquisite. Do you even know what that means?",
      "I suppose if you enjoy Marvel films, this might be too sophisticated for your palate.",
      "The symbolism is so obvious, yet somehow it flies over most viewers' heads.",
      "This is why I only watch films with subtitles. Hollywood has ruined cinema.",
    ],
  },
  braindead: {
    name: "Blockbuster Bob",
    responses: [
      "OMG this movie is AMAZING! Best thing ever made!",
      "Wow, explosions! This is so good! 10/10!",
      "I love everything about this! The colors are so pretty!",
      "This is better than pizza! And I LOVE pizza!",
      "So good! My brain feels happy watching this!",
      "Everything is awesome! This movie makes me smile!",
      "I don't understand it but it's GREAT! Five stars!",
      "Pretty pictures! Good sounds! Me like movie!",
    ],
  },
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [currentPersonality, setCurrentPersonality] = useState("pretentious")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const switchPersonality = () => {
    const newPersonality = Math.random() > 0.5 ? "pretentious" : "braindead"
    setCurrentPersonality(newPersonality)
    return newPersonality
  }

  const getBotResponse = (userMessage) => {
    const personality = switchPersonality()
    const responses = personalities[personality].responses
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    return { text: randomResponse, personality }
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = { text: input, sender: "user" }
    const botResponse = getBotResponse(input)
    const botMessage = {
      text: botResponse.text,
      sender: "bot",
      personality: botResponse.personality,
      name: personalities[botResponse.personality].name,
    }

    setMessages((prev) => [...prev, userMessage, botMessage])
    setInput("")
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 z-50"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 h-96 bg-card border-border shadow-xl z-50 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Movie Chat</h3>
            <p className="text-xs text-muted-foreground">Ask me about any movie!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center text-muted-foreground text-sm">Start a conversation about movies!</div>
            )}
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : message.personality === "pretentious"
                        ? "bg-secondary text-secondary-foreground border border-border"
                        : "bg-accent text-accent-foreground"
                  }`}
                >
                  {message.sender === "bot" && <div className="text-xs opacity-70 mb-1">{message.name}</div>}
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about a movie..."
                className="flex-1 bg-secondary border-border"
              />
              <Button onClick={handleSend} size="sm" className="px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
