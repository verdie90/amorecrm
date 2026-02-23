"use client";
import { useState, useRef, useEffect } from "react";
import {
  MessageSquare, Search, Send, Paperclip, Smile, Phone,
  Video, MoreHorizontal, Filter, CheckCheck, Clock,
  Instagram, Mail, Globe, Zap, Bot, Users, ArrowRight
} from "lucide-react";
import { Avatar } from "@/components/ui/badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockConversations } from "@/lib/mock-data";
import { formatDate, cn } from "@/lib/utils";
import type { Conversation, Message } from "@/types";

const filterTabs = [
  { id: "all", label: "All", count: 4 },
  { id: "mine", label: "My Chats", count: 2 },
  { id: "unassigned", label: "Unassigned", count: 1 },
  { id: "resolved", label: "Resolved", count: 1 },
];

const channelIcon = (channel: string) => {
  const size = 12;
  const icons: Record<string, { icon: React.ReactNode; color: string }> = {
    whatsapp: { icon: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>, color: "text-[#25D366]" },
    email: { icon: <Mail size={size} />, color: "text-[#4285F4]" },
    instagram: { icon: <Instagram size={size} />, color: "text-[#E1306C]" },
    livechat: { icon: <Globe size={size} />, color: "text-[#38BDF8]" },
    sms: { icon: <MessageSquare size={size} />, color: "text-[#8B5CF6]" },
  };
  return icons[channel] || icons.livechat;
};

// Sample extra messages for the chat window
const sampleMessages: Message[] = [
  { id: "msg1", conversationId: "cv1", content: "Selamat pagi! Ada yang bisa saya bantu?", sender: "agent", senderName: "John", timestamp: new Date(Date.now() - 7200000).toISOString(), type: "text", isRead: true },
  { id: "msg2", conversationId: "cv1", content: "Halo! Saya ingin tanya mengenai proposal ERP yang kemarin.", sender: "contact", timestamp: new Date(Date.now() - 6900000).toISOString(), type: "text", isRead: true },
  { id: "msg3", conversationId: "cv1", content: "Tentu! Proposal sudah saya kirimkan via email tadi pagi. Apakah sudah diterima?", sender: "agent", senderName: "John", timestamp: new Date(Date.now() - 6600000).toISOString(), type: "text", isRead: true },
  { id: "msg4", conversationId: "cv1", content: "Sudah ya, terima kasih! Saya akan review dulu ya.", sender: "contact", timestamp: new Date(Date.now() - 3600000).toISOString(), type: "text", isRead: true },
  { id: "msg5", conversationId: "cv1", content: "Terima kasih, proposal sudah kami terima.", sender: "contact", timestamp: new Date(Date.now() - 1800000).toISOString(), type: "text", isRead: false },
];

export default function InboxPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedConv, setSelectedConv] = useState<Conversation>(mockConversations[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [aiSuggestion] = useState("Terima kasih atas konfirmasinya! Apakah ada hal lain yang ingin didiskusikan mengenai proposal tersebut?");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      conversationId: selectedConv.id,
      content: message,
      sender: "agent",
      senderName: "John",
      timestamp: new Date().toISOString(),
      type: "text",
      isRead: true,
    };
    setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  };

  const convFilter = mockConversations.filter((c) => {
    if (activeFilter === "mine") return c.assignedTo === "user_1";
    if (activeFilter === "unassigned") return !c.assignedTo;
    if (activeFilter === "resolved") return c.status === "resolved";
    return true;
  });

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-(--text-primary)">Inbox</h1>
          <p className="text-sm text-(--text-muted) mt-0.5">Manage all conversations in one place</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" icon={<Bot size={14} />}>AI Assistant</Button>
          <Button size="sm" icon={<Zap size={14} />}>Broadcast</Button>
        </div>
      </div>

      <div className="flex flex-1 gap-4 overflow-hidden min-h-0">
        {/* Conversation List */}
        <div className="w-80 flex-shrink-0 bg-(--bg-surface) border border-(--border-color) rounded-2xl flex flex-col overflow-hidden">
          {/* Search */}
          <div className="p-3 border-b border-(--border-color)">
            <Input placeholder="Search conversations..." leftIcon={<Search size={14} />} />
          </div>

          {/* Filter tabs */}
          <div className="flex overflow-x-auto gap-1 px-3 py-2 border-b border-(--border-color)">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={cn(
                  "flex-shrink-0 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all",
                  activeFilter === tab.id
                    ? "bg-[#1e3a8a] text-white"
                    : "text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-muted)"
                )}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={cn("ml-1.5 text-[10px]", activeFilter === tab.id ? "opacity-70" : "")}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {convFilter.map((conv) => {
              const ch = channelIcon(conv.channel);
              const isSelected = selectedConv?.id === conv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConv(conv)}
                  className={cn(
                    "flex gap-3 p-3 cursor-pointer hover:bg-(--bg-muted) transition-colors border-b border-(--border-color) last:border-0",
                    isSelected && "bg-[#1e3a8a]/5 border-r-2 border-r-[#1e3a8a]"
                  )}
                >
                  <div className="relative">
                    <Avatar name={conv.contactName} size="md" />
                    <div className={cn("absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-(--bg-surface) flex items-center justify-center", ch.color)}>
                      {ch.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className={cn("text-xs font-semibold text-(--text-primary) truncate", conv.unreadCount > 0 && "font-bold")}>
                        {conv.contactName}
                      </p>
                      <span className="text-[10px] text-(--text-muted) flex-shrink-0 ml-1">
                        {formatDate(conv.lastMessageAt, "relative")}
                      </span>
                    </div>
                    <p className="text-[11px] text-(--text-muted) truncate mt-0.5">{conv.lastMessage}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant={conv.status === "resolved" ? "success" : "info"} size="sm">{conv.status}</Badge>
                      {conv.unreadCount > 0 && (
                        <span className="bg-[#1e3a8a] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 bg-(--bg-surface) border border-(--border-color) rounded-2xl flex flex-col overflow-hidden min-w-0">
          {selectedConv ? (
            <>
              {/* Chat header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-(--border-color)">
                <div className="flex items-center gap-3">
                  <Avatar name={selectedConv.contactName} size="md" online />
                  <div>
                    <p className="font-semibold text-sm text-(--text-primary)">{selectedConv.contactName}</p>
                    <div className="flex items-center gap-1.5">
                      <div className={cn("flex items-center gap-1 text-xs", channelIcon(selectedConv.channel).color)}>
                        {channelIcon(selectedConv.channel).icon}
                        <span className="capitalize">{selectedConv.channel}</span>
                      </div>
                      <span className="text-(--text-muted) text-xs">·</span>
                      <Badge variant={selectedConv.status === "resolved" ? "success" : "info"} size="sm">{selectedConv.status}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="xs"><Phone size={14} /></Button>
                  <Button variant="ghost" size="xs"><Video size={14} /></Button>
                  <Button variant="ghost" size="xs"><Users size={14} /></Button>
                  <Button variant="ghost" size="xs"><MoreHorizontal size={14} /></Button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-(--bg-muted)">
                {messages.map((msg) => {
                  const isAgent = msg.sender === "agent" || msg.sender === "bot";
                  return (
                    <div key={msg.id} className={cn("flex gap-2", isAgent ? "justify-end" : "justify-start")}>
                      {!isAgent && <Avatar name={selectedConv.contactName} size="xs" />}
                      <div className={cn("max-w-[66%] space-y-1")}>
                        {!isAgent && (
                          <p className="text-[10px] text-(--text-muted) px-1">{selectedConv.contactName}</p>
                        )}
                        <div
                          className={cn(
                            "px-3.5 py-2.5 rounded-2xl text-sm",
                            isAgent
                              ? "bg-[#1e3a8a] text-white rounded-tr-sm"
                              : "bg-(--bg-surface) border border-(--border-color) text-(--text-primary) rounded-tl-sm"
                          )}
                        >
                          {msg.content}
                        </div>
                        <div className={cn("flex items-center gap-1 px-1", isAgent ? "justify-end" : "justify-start")}>
                          <span className="text-[10px] text-(--text-muted)">{formatDate(msg.timestamp, "relative")}</span>
                          {isAgent && <CheckCheck size={12} className={msg.isRead ? "text-[#38bdf8]" : "text-(--text-muted)"} />}
                        </div>
                      </div>
                      {isAgent && msg.sender === "bot" && <Avatar name="AI" size="xs" />}
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* AI Suggestion */}
              {aiSuggestion && (
                <div className="border-t border-(--border-color) px-4 py-2 bg-[#1e3a8a]/3">
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-semibold text-[#1e3a8a] bg-[#1e3a8a]/10 px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5">AI</span>
                    <p className="text-xs text-(--text-secondary) flex-1 line-clamp-2">{aiSuggestion}</p>
                    <Button variant="ghost" size="xs" onClick={() => setMessage(aiSuggestion)}>
                      Use <ArrowRight size={10} />
                    </Button>
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-3 border-t border-(--border-color)">
                <div className="flex items-end gap-2">
                  <div className="flex-1 bg-(--bg-muted) rounded-xl border border-(--border-color) px-3 py-2.5 flex items-end gap-2">
                    <Button variant="ghost" size="xs" className="flex-shrink-0"><Paperclip size={14} /></Button>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                      placeholder="Type a message... (Enter to send)"
                      className="flex-1 bg-transparent text-sm text-(--text-primary) placeholder:text-(--text-muted) resize-none focus:outline-none max-h-32 min-h-[20px]"
                      rows={1}
                    />
                    <Button variant="ghost" size="xs" className="flex-shrink-0"><Smile size={14} /></Button>
                  </div>
                  <Button
                    size="md"
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    icon={<Send size={14} />}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-(--text-muted)">
              <div className="text-center">
                <MessageSquare size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </div>

        {/* Contact sidebar - hidden on smaller screens */}
        <div className="hidden xl:flex w-64 flex-shrink-0 bg-(--bg-surface) border border-(--border-color) rounded-2xl flex-col p-4 gap-4">
          {selectedConv && (
            <>
              <div className="text-center">
                <Avatar name={selectedConv.contactName} size="xl" className="mx-auto mb-2" />
                <h3 className="font-display font-bold text-sm text-(--text-primary)">{selectedConv.contactName}</h3>
                <Badge variant="info" size="sm" className="mt-1">{selectedConv.channel}</Badge>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <p className="text-(--text-muted) mb-1">Status</p>
                  <Badge variant={selectedConv.status === "resolved" ? "success" : "info"}>{selectedConv.status}</Badge>
                </div>
                <div>
                  <p className="text-(--text-muted) mb-1">Assigned To</p>
                  <p className="text-(--text-primary) font-medium">{selectedConv.assignedTo ? "John Santoso" : "Unassigned"}</p>
                </div>
                <div>
                  <p className="text-(--text-muted) mb-1">Last Activity</p>
                  <p className="text-(--text-primary)">{formatDate(selectedConv.lastMessageAt, "relative")}</p>
                </div>
              </div>

              <div className="border-t border-(--border-color) pt-3 space-y-2">
                <Button variant="secondary" size="sm" className="w-full justify-start" icon={<CheckCheck size={13} />}>
                  Resolve
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start" icon={<Users size={13} />}>
                  Reassign
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start text-red-500 hover:text-red-600" icon={<Clock size={13} />}>
                  Snooze
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
