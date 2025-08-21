"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic, MoreVertical, Users, Smile, FileText, Download } from "lucide-react";

export default function TaskDiscussion({ task }) {
  const [messages, setMessages] = useState(
    task?.discussions || [
      {
        user: "Sarah Chen",
        role: "Project Manager",
        text: "Team, please provide your status updates for this week's sprint review.",
        time: new Date(Date.now() - 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date(Date.now() - 3600000),
        avatar: "SC",
        color: "bg-blue-500"
      },
      {
        user: "Michael Rodriguez",
        role: "Senior Developer",
        text: "Backend API implementation is 85% complete. Database optimization completed yesterday.",
        time: new Date(Date.now() - 1800000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date(Date.now() - 1800000),
        avatar: "MR",
        color: "bg-green-500"
      },
      {
        user: "Emma Thompson",
        role: "UI/UX Designer",
        text: "Prototype reviews are scheduled for tomorrow. All design assets have been delivered to development.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date(),
        avatar: "ET",
        color: "bg-purple-500"
      },
    ]
  );
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [activeUsers, setActiveUsers] = useState([
    { name: "Sarah Chen", role: "Project Manager", online: true },
    { name: "Michael Rodriguez", role: "Senior Developer", online: true },
    { name: "Emma Thompson", role: "UI/UX Designer", online: false }
  ]);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const emojiPickerRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500",
      "bg-red-500", "bg-indigo-500", "bg-teal-500", "bg-pink-500"
    ];
    const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const sendMessage = (content, type = "text", fileName = null, fileData = null) => {
    if (!content.trim() && type === "text") return;

    const newMessage = {
      user: "You",
      role: "Team Member",
      text: content,
      type,
      fileName,
      fileData,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timestamp: new Date(),
      avatar: "YO",
      color: "bg-gray-500"
    };

    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setShowEmojiPicker(false);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (file.type.startsWith('image/')) {
          sendMessage(e.target.result, "image", file.name, file);
        } else {
          sendMessage(`📎 ${file.name}`, "file", file.name, file);
        }
      };
      reader.readAsDataURL(file);
    }
    e.target.value = ''; // Reset file input
  };

  const handleEmojiSelect = (emoji) => {
    setInput(input + emoji);
    setShowEmojiPicker(false);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return timestamp.toLocaleDateString();
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(message => {
      const date = formatTimestamp(message.timestamp);
      if (!groups[date]) groups[date] = [];
      groups[date].push(message);
    });
    return groups;
  };

  const messageGroups = groupMessagesByDate(messages);

  const emojis = [
    "😊","😂","🤣","😍","😘","😎","😢","😭","😡","😱",
    "👍","👎","👌","👏","🙌","🙏","💪","🤝","✌️","🤟",
    "✅","❌","⚠️","🚀","🎉","✨","⭐","🌟","🌈","☀️",
    "🔥","💯","💡","📌","🔍","📝","📅","📊","📈","💻"
  ];

  const downloadFile = (fileData, fileName) => {
    const link = document.createElement('a');
    link.href = fileData;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[calc(100vh-2rem)] max-h-[800px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Team Discussion</h3>
              <p className="text-xs text-gray-500">
                {activeUsers.filter(u => u.online).length} online • {messages.length} messages
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {activeUsers.slice(0, 3).map((user, index) => (
              <div key={index} className="relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 border-white ${user.color || getAvatarColor(user.name)}`}>
                  {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                {user.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
            ))}
          </div>
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50">
        {Object.entries(messageGroups).map(([date, dateMessages]) => (
          <div key={date}>
            <div className="flex items-center justify-center mb-6">
              <div className="bg-white text-gray-600 text-xs px-3 py-1.5 rounded-full font-medium border border-gray-200 shadow-sm">
                {date}
              </div>
            </div>
            {dateMessages.map((message, i) => (
              <div key={i} className={`flex items-start gap-3 mb-4 ${message.user === "You" ? "flex-row-reverse" : ""}`}>
                <div className={`flex-shrink-0 w-10 h-10 rounded-full text-white flex items-center justify-center text-sm font-semibold ${message.color} border-2 border-white shadow-sm`}>
                  {message.avatar}
                </div>
                <div className={`flex-1 max-w-md ${message.user === "You" ? "text-right" : ""}`}>
                  <div className={`flex items-baseline gap-2 mb-1 ${message.user === "You" ? "justify-end" : ""}`}>
                    <p className="text-sm font-semibold text-gray-900">{message.user}</p>
                    <p className="text-xs text-gray-500">{message.role}</p>
                    <p className="text-xs text-gray-400">{message.time}</p>
                  </div>
                  <div className={`rounded-2xl p-4 ${message.user === "You" ? "bg-blue-600 text-white" : "bg-white border border-gray-200 shadow-sm"}`}>
                    {message.type === "image" ? (
                      <div>
                        <img
                          src={message.text}
                          alt="Shared image"
                          className="max-w-full h-auto rounded-lg mb-2"
                          onError={() => console.error(`Failed to load image for message ${i}`)}
                        />
                        <p className={`text-xs ${message.user === "You" ? "text-blue-100" : "text-gray-500"}`}>
                          {message.fileName}
                        </p>
                      </div>
                    ) : message.type === "file" ? (
                      <div className="flex items-center gap-3 p-3 bg-white bg-opacity-20 rounded-lg">
                        <FileText className="w-5 h-5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{message.fileName}</p>
                          <p className="text-xs opacity-80">{(message.fileData?.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <button
                          onClick={() => downloadFile(message.text, message.fileName)}
                          className="p-1.5 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-xl">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setIsTyping(e.target.value.length > 0);
              }}
              onKeyPress={handleKeyPress}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Type your message..."
              rows="1"
              style={{
                minHeight: '44px',
                maxHeight: '120px'
              }}
            />
            {showEmojiPicker && (
              <div ref={emojiPickerRef} className="absolute bottom-14 left-0 bg-white border border-gray-200 rounded-xl shadow-xl p-3 grid grid-cols-8 gap-1 z-10">
                {emojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleEmojiSelect(emoji)}
                    className="text-lg p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              title="Add emoji"
            >
              <Smile className="w-5 h-5" />
            </button>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-2.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              title="Attach file"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.txt,.zip"
              multiple
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-sm"
              title="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}