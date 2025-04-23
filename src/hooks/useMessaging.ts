
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export function useMessaging() {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (messageData: {
    sender_id: string;
    receiver_id: string;
    content: string;
    contract_id?: string;
  }) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("messages")
        .insert([messageData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const markMessageAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from("messages")
        .update({ read: true })
        .eq("id", messageId);

      if (error) throw error;
      return true;
    } catch (error: any) {
      console.error("Error marking message as read:", error.message);
      return false;
    }
  };

  const getConversations = async (userId: string) => {
    setIsLoading(true);
    try {
      // Get all messages where user is either sender or receiver
      const { data: messages, error } = await supabase
        .from("messages")
        .select(`
          id,
          sender_id,
          receiver_id,
          content,
          read,
          created_at,
          senderProfile:profiles!sender_id(full_name, profile_image_url, business_name),
          receiverProfile:profiles!receiver_id(full_name, profile_image_url, business_name)
        `)
        .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Group messages by conversation
      const conversations = messages?.reduce((acc: any, message: any) => {
        // Determine other party in conversation
        const isUserSender = message.sender_id === userId;
        const otherUserId = isUserSender ? message.receiver_id : message.sender_id;
        const otherUserProfile = isUserSender ? message.receiverProfile : message.senderProfile;

        // Check if conversation already exists
        let conversation = acc.find((c: any) => 
          (c.user.id === otherUserId)
        );

        if (!conversation) {
          // Create new conversation
          conversation = {
            id: otherUserId, // Use other user's ID as conversation ID
            user: {
              id: otherUserId,
              name: otherUserProfile.full_name,
              avatar: otherUserProfile.profile_image_url,
              company: otherUserProfile.business_name || "",
            },
            messages: [],
            unread: 0
          };
          acc.push(conversation);
        }

        // Add message to conversation
        conversation.messages.push({
          id: message.id,
          content: message.content,
          time: message.created_at,
          isOwnMessage: isUserSender,
          read: message.read
        });

        // Count unread messages
        if (!isUserSender && !message.read) {
          conversation.unread += 1;
        }

        return acc;
      }, []);

      // Sort conversations by most recent message
      conversations?.sort((a: any, b: any) => {
        const aTime = a.messages[0]?.time;
        const bTime = b.messages[0]?.time;
        return new Date(bTime).getTime() - new Date(aTime).getTime();
      });

      // Add last message field
      conversations?.forEach((conv: any) => {
        conv.lastMessage = {
          text: conv.messages[0]?.content,
          time: formatMessageTime(conv.messages[0]?.time)
        };
      });

      return conversations || [];
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load conversations",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getMessages = async (userId: string, otherUserId: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("messages")
        .select(`
          id,
          sender_id,
          receiver_id,
          content,
          created_at,
          senderProfile:profiles!sender_id(full_name, profile_image_url)
        `)
        .or(`and(sender_id.eq.${userId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${userId})`)
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Format messages
      const formattedMessages = data.map((msg) => ({
        id: msg.id,
        sender: {
          id: msg.sender_id,
          name: msg.senderProfile.full_name,
          avatar: msg.senderProfile.profile_image_url,
        },
        content: msg.content,
        timestamp: formatMessageTime(msg.created_at),
        isOwnMessage: msg.sender_id === userId,
      }));

      return formattedMessages;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load messages",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to format message time
  const formatMessageTime = (timestamp: string) => {
    if (!timestamp) return "";
    
    const messageDate = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - messageDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1 && messageDate.getDate() === now.getDate()) {
      // Today - show time only
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays <= 1) {
      // Yesterday
      return 'Yesterday';
    } else if (diffDays <= 7) {
      // Within last week
      const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
      return messageDate.toLocaleDateString(undefined, options);
    } else {
      // Older
      const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
      return messageDate.toLocaleDateString(undefined, options);
    }
  };

  return {
    isLoading,
    sendMessage,
    getConversations,
    getMessages,
    markMessageAsRead,
  };
}
