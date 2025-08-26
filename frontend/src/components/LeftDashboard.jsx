// components/LeftDashboard.jsx
import React from "react";
import { assets } from "../assets/assets";
import { Protect, useClerk, useUser, useAuth } from "@clerk/clerk-react";
import { LogOut, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LeftDashboard = ({
  chats = [],
  onNewChat,
  onSelectChat,
  activeChatId,
  refreshChats, // optional fn from parent to reload list
  setChats,     // optional state setter from parent
}) => {
  const navigate = useNavigate();
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const { getToken } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return (
      <aside className="bg-[#181818] text-white border-r border-gray-800 h-full flex flex-col items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </aside>
    );
  }

  const BASE = import.meta.env.VITE_BASE_URL || "";

  const handleDeleteChat = async (chatId, e) => {
    e.preventDefault();  
    // e.stopPropagation(); // prevent selecting the chat
    try {
      // get Clerk token
      const token = await getToken();

      // correct endpoint: /api/chat/delete (note singular "chat")
      await axios.post(
        `${BASE}/api/chat/delete`,
        { chatId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // update UI immediately:
      if (typeof refreshChats === "function") {
        await refreshChats();
      } else if (typeof setChats === "function") {
        setChats((prev) => prev.filter((c) => c._id !== chatId));
      } else {
        // fallback: reload page to reflect deletion
        window.location.reload();
      }
    } catch (err) {
      console.error("Error deleting chat:", err);
      // optional: show toast / alert
    }
  };

  return (
    <aside className="bg-[#181818] text-white border-r border-gray-800 h-full flex flex-col">
      <img
        src={assets.logo}
        alt="logo"
        className="p-4 w-32 sm:w-44 cursor-pointer"
        onClick={() => navigate("/")}
      />

      <button onClick={onNewChat} className="bg-white  text-[#2c2c2c] cursor-pointer mt-5 py-2 px-4 rounded-xl mb-4 ">
        + New Chat
      </button>

      <div className="border-t  border-gray-500  p-4 flex mt-3  justify-between align-middle">
        <div className="text-gray-400 font-medium  p-2 ">Projects</div>
        <button>
          <div className=" cursor-pointer w-8 h-8 mt-1 bg-white text-black text-2xl flex justify-center align-middle rounded-full">+</div>
        </button>
      </div>

      <div className="mt-2  p-4 flex-1 scrollbar-black  overflow-y-auto">
        {chats.length === 0 && (
          <div className="mb-3 p-2 rounded-3xl bg-[#1e1e1e] text-gray-400">No chats yet</div>
        )}
        {chats.map((c) => (
          <div
            key={c._id}
            onClick={() => onSelectChat && onSelectChat(c._id)}
            className={`mb-3 p-2 flex justify-between items-center rounded-3xl cursor-pointer ${
              activeChatId === c._id ? "bg-[#1e1e1e]" : "hover:bg-[#1e1e1e]"
            }`}
            title={c.name || c.title || c.title}
          >
            <span className="truncate pr-2">{c.name || c.title}</span>
            <button onClick={(e) => handleDeleteChat(c._id, e)} className="text-gray-400 hover:text-red-300 transition">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className=" w-full border-t  border-gray-500 p-4  px-7 flex items-center justify-between">
        <div onClick={openUserProfile} className="flex gap-2 items-center cursor-pointer" >
          <img src={user.imageUrl} className="w-8 rounded-full" alt="user avatar" />
          <div>
            <h1 className="text-sm font-medium">{user.fullName}</h1>
            <p className="text-xs text-gray-500">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect> Plan
            </p>
          </div>
        </div>
        <LogOut onClick={() => signOut()} className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer" />
      </div>
    </aside>
  );
};

export default LeftDashboard;
