
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Image } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useMessaging } from "@/hooks/useMessaging";
import { useAuth } from "@/contexts/AuthContext";

type MessageInterfaceProps = {
  receiverId?: string;
  receiverName?: string;
  receiverAvatar?: string;
  receiverCompany?: string;
  contractId?: string;
};

export default function MessageInterface({
  receiverId,
  receiverName,
  receiverAvatar,
  receiverCompany,
  contractId
}: MessageInterfaceProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const { user, profile } = useAuth();
  const { sendMessage, getMessages, isLoading } = useMessaging();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch messages when receiver changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (user?.id && receiverId) {
        const fetchedMessages = await getMessages(user.id, receiverId);
        setMessages(fetchedMessages);
      }
    };

    fetchMessages();
  }, [user?.id, receiverId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user?.id || !receiverId || !profile) return;

    const newMessage = {
      sender_id: user.id,
      receiver_id: receiverId,
      content: message,
      ...(contractId && { contract_id: contractId }),
    };

    const sentMessage = await sendMessage(newMessage);
    if (sentMessage) {
      // Add the new message to the UI
      setMessages([...messages, {
        id: sentMessage.id,
        sender: {
          id: user.id,
          name: profile.full_name,
          avatar: profile.profile_image_url,
        },
        content: sentMessage.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwnMessage: true,
      }]);
      setMessage("");
    }
  };

  if (!receiverId) {
    return (
      <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md items-center justify-center">
        <div className="text-center p-8">
          <h3 className="font-medium text-lg mb-2">Select a conversation</h3>
          <p className="text-gray-500">Choose a contact from the list to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            {receiverAvatar ? (
              <AvatarImage src={receiverAvatar} />
            ) : null}
            <AvatarFallback>
              {receiverName ? receiverName.substring(0, 2).toUpperCase() : "??"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-harvest-dark">{receiverName || "User"}</h3>
            {receiverCompany && <p className="text-sm text-gray-500">{receiverCompany}</p>}
          </div>
        </div>
        {contractId && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">View Contract</Button>
          </div>
        )}
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-harvest-primary"></div>
          </div>
        ) : messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwnMessage ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] ${
                  msg.isOwnMessage
                    ? "bg-harvest-primary text-white rounded-tl-xl rounded-tr-none"
                    : "bg-gray-100 text-harvest-dark rounded-tr-xl rounded-tl-none"
                } rounded-bl-xl rounded-br-xl p-3 shadow-sm`}
              >
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.isOwnMessage ? "text-harvest-light" : "text-gray-500"}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <Separator />
      
      {/* Input area */}
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex items-center gap-2">
          <Button type="button" size="icon" variant="ghost">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button type="button" size="icon" variant="ghost">
            <Image className="h-4 w-4" />
          </Button>
          <Input
            className="flex-1"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            className="bg-harvest-primary hover:bg-harvest-accent"
            disabled={isLoading || !message.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
