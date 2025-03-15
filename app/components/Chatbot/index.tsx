"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCat,
  faPaperPlane,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Tambah pesan user ke chat
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages([...newMessages, { text: data.reply, sender: "bot" }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { text: "Error: Tidak bisa menghubungi AI.", sender: "bot" },
      ]);
      console.error("Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
  };

  return (
    <div className="chatbot-wrapper">
      <button className="chatbot-button font-bold" onClick={toggleChatbot}>
        <FontAwesomeIcon icon={faCat} /> <p className="ml-2">Tanya Yoraa</p>
      </button>
      <div className={`chatbox ${isOpen ? "show" : "hide"}`}>
        <div className="chatbox-header">
          <span className="header-title">Yoralph</span>
          <div className="header-icons">
            <FontAwesomeIcon
              icon={faTrash}
              onClick={resetChat}
              className="mr-4 text-xl"
            />
            <FontAwesomeIcon
              icon={faTimes}
              onClick={toggleChatbot}
              className="mr-2 text-xl"
            />
          </div>
        </div>
        <div className="chatbox-body">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {isTyping && (
            <div className="chat-message bot">Yoraa sedang mengetik...</div>
          )}
        </div>
        <div className="chatbox-footer">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tulis pesan..."
          />
          <button onClick={sendMessage}>
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
