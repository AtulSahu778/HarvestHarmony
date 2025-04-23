
import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import MessageInterface from "@/components/messaging/MessageInterface";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useMessaging } from "@/hooks/useMessaging";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function MessagingPage() {
  const { user } = useAuth();
  const { getConversations, isLoading } = useMessaging();
  const [conversations, setConversations] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<any>(null);

  useEffect(() => {
    const loadConversations = async () => {
      if (user?.id) {
        const data = await getConversations(user.id);
        setConversations(data);
      }
    };

    loadConversations();
  }, [user?.id]);

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(
    (convo) => 
      convo.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      convo.user.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <Layout>
        <div className="container py-12 px-4 md:px-6">
          <h1 className="text-3xl font-bold text-harvest-dark mb-8">Messages</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Conversation List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input 
                      placeholder="Search conversations..." 
                      className="pl-9"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-harvest-primary"></div>
                    </div>
                  ) : filteredConversations.length > 0 ? (
                    filteredConversations.map((convo) => (
                      <div 
                        key={convo.id}
                        className={`flex items-center gap-3 p-3 rounded-md hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedConversation?.id === convo.id ? "bg-gray-50" : ""
                        }`}
                        onClick={() => setSelectedConversation(convo)}
                      >
                        <Avatar>
                          {convo.user.avatar ? (
                            <AvatarImage src={convo.user.avatar} />
                          ) : null}
                          <AvatarFallback>{convo.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-width-0">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-harvest-dark truncate">{convo.user.name}</h3>
                            <span className="text-xs text-gray-500">{convo.lastMessage.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{convo.lastMessage.text}</p>
                          <p className="text-xs text-gray-500 truncate">{convo.user.company}</p>
                        </div>
                        {convo.unread > 0 ? (
                          <div className="w-5 h-5 flex items-center justify-center bg-harvest-primary text-white text-xs rounded-full">
                            {convo.unread}
                          </div>
                        ) : null}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 mb-2">No conversations yet</p>
                      <p className="text-sm text-gray-400">
                        When you connect with farmers or buyers, your conversations will appear here
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Button className="bg-harvest-primary hover:bg-harvest-accent w-full">
                    New Message
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Message Interface */}
            <div className="lg:col-span-2">
              <MessageInterface 
                receiverId={selectedConversation?.user.id}
                receiverName={selectedConversation?.user.name}
                receiverAvatar={selectedConversation?.user.avatar}
                receiverCompany={selectedConversation?.user.company}
              />
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
