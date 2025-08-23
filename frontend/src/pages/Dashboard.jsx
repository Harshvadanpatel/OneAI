// pages/Dashboard.jsx
import { useEffect, useState } from "react";
import InputArea from "../components/InputArea";
import LeftDashboard from "../components/LeftDashboard";
import RightDashboard from "../components/RightDashboard";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export default function Dashboard() {
  // local display state per model
  const [chatMessages, setChatMessages] = useState({
    ChatGPT: [],
    Gemini: [],
    DeepSeek: [],
    Perplexity: [],
    Claude: [],
    Grok: [],
  });

  const [chats, setChats] = useState([]);          // sidebar list
  const [activeChatId, setActiveChatId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  // helpers
  const authHeader = async () => ({
    headers: { Authorization: `Bearer ${await getToken()}` },
  });

  const refreshChats = async () => {
    const res = await axios.get("/api/chat/list", await authHeader());
    if (res.data.success) setChats(res.data.chats);
  };

  const createNewChat = async () => {
    const res = await axios.post("/api/chat/create", { name: "New Chat" }, await authHeader());
    if (res.data.success) {
      setActiveChatId(res.data.chat._id);
      await refreshChats();
      // clear local messages
      setChatMessages({
        ChatGPT: [],
        Gemini: [],
        DeepSeek: [],
        Perplexity: [],
        Claude: [],
        Grok: [],
      });
    }
  };

  const loadChat = async (chatId) => {
    const res = await axios.get(`/api/chat/${chatId}`, await authHeader());
    if (res.data.success) {
      setActiveChatId(chatId);
      // map Mongo messages -> UI buckets
      const buckets = { ChatGPT: [], Gemini: [], DeepSeek: [], Perplexity: [], Claude: [], Grok: [] };

      res.data.chat.messages.forEach(m => {
        if (m.role === 'user') {
          // push to all 3 buckets so both panels show the prompt
          buckets.Gemini.push({ role: 'user', text: m.user_text });
          buckets.ChatGPT.push({ role: 'user', text: m.user_text });
          buckets.DeepSeek.push({ role: 'user', text: m.user_text });
        } else {
          if (m.gemini_content)  buckets.Gemini.push({ role: 'assistant', text: m.gemini_content });
          if (m.chatgpt_content) buckets.ChatGPT.push({ role: 'assistant', text: m.chatgpt_content });
          if (m.deepseek_content) buckets.DeepSeek.push({ role: 'assistant', text: m.deepseek_content });
        }
      });

      setChatMessages(buckets);
    }
  };

  useEffect(() => {
    refreshChats();
  }, []);

  // ---------- Call models ----------
  const sendToGemini = async (prompt) => {
    try {
      const res = await axios.post("/api/ai/gemini", { prompt }, await authHeader());
      return res.data.success ? res.data.content : "";
    } catch {
      return "";
    }
  };

  const sendToOpenAI = async (prompt) => {
    try {
      const res = await axios.post("/api/ai/openai", { prompt }, await authHeader());
      return res.data.success ? res.data.content : "";
    } catch {
      return "";
    }
  };

  const sendToDeepSeek = async (prompt) => {
    try {
      const res = await axios.post("/api/ai/deepseek", { prompt }, await authHeader());
      return res.data.success ? res.data.content : "";
    } catch {
      return "";
    }
  };

  // ---------- On send ----------
  const handleSend = async (msg) => {
    if (!activeChatId) {
      // create a chat automatically if none selected
      await createNewChat();
    }

    // show user text in all visible panels
    setChatMessages((prev) => ({
      ...prev,
      Gemini:   [...prev.Gemini,   { role: "user", text: msg }],
      ChatGPT:  [...prev.ChatGPT,  { role: "user", text: msg }],
      DeepSeek: [...prev.DeepSeek, { role: "user", text: msg }],
    }));

    setLoading(true);
    const [g, o, d] = await Promise.all([sendToGemini(msg), sendToOpenAI(msg), sendToDeepSeek(msg)]);
    setLoading(false);

    // show assistant messages
    setChatMessages((prev) => ({
      ...prev,
      Gemini:   g ? [...prev.Gemini,   { role: "assistant", text: g }] : prev.Gemini,
      ChatGPT:  o ? [...prev.ChatGPT,  { role: "assistant", text: o }] : prev.ChatGPT,
      DeepSeek: d ? [...prev.DeepSeek, { role: "assistant", text: d }] : prev.DeepSeek,
    }));

    // persist to Mongo
    await axios.post(
      "/api/chat/append",
      {
        chatId: activeChatId,
        userText: msg,
        gemini: g || undefined,
        chatgpt: o || undefined,
        deepseek: d || undefined,
      },
      await authHeader()
    );

    // update sidebar order (updatedAt)
    await refreshChats();
  };

  return (
    <div className="flex w-auto h-screen">
      {/* Sidebar */}
      <div className="w-1/5">
        <LeftDashboard
          chats={chats}
          onNewChat={createNewChat}
          onSelectChat={loadChat}
          activeChatId={activeChatId}
        />
      </div>

      {/* Right side */}
      <div className="w-4/5 overflow-y-hidden">
        <div className="inline justify-start overflow-hidden">
          <RightDashboard chatMessages={chatMessages} />
          <div className="flex">
            <InputArea onSendMessage={handleSend} />
          </div>
        </div>
      </div>
    </div>
  );
}
