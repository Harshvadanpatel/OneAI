import { Maximize2, Lock } from "lucide-react";
import { useUser, useClerk } from "@clerk/clerk-react";
import { assets } from "../assets/assets";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./RightDashboard.css";

const AITool = ({ name, icon, chatMessages, user, isLocked, onUpgradeClick }) => (
<div className={`flex flex-col border border-white/20 bg-[#1e1e1e] h-[77vh] relative ${isLocked ? "locked-tool" : ""}`}>
    {/* Lock Overlay */}
    {isLocked && (
      <div 
        className="lock-overlay absolute inset-0 rounded-lg flex items-center justify-center z-10 top-15 cursor-pointer hover:bg-black/20 transition-all"
        onClick={onUpgradeClick}
      >
        <div className="lock-badge flex flex-col items-center gap-2">
          <Lock className="h-8 w-8 text-yellow-400" />
          <span className="text-sm text-yellow-400 font-semibold">Upgrade to Premium</span>
        </div>
      </div>
    )}
    
    {/* Header */}
    <div className={`flex border border-white/20 justify-between h-15 w-120 bg-[#181818]`}>
      <div className="p-5 gap-2 mt-1 flex items-center">
        <img src={icon} alt={`${name} logo`} className="h-8 w-8" />
        <span>{name}</span>
      </div>
      <div className="flex p-5 gap-2 items-center">
        <Maximize2 className="h-5 w-5" />
      </div>
    </div>

    {/* Messages */}
    <div className={`overflow-y-auto scrollbar-black w-120 overflow-x-auto p-3 ${isLocked ? "opacity-40 pointer-events-none" : ""}`}>
      {chatMessages && chatMessages.length > 0 ? (
        chatMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex p-2 my-1 ${msg.role === "user" ? "bg-[#181818]" : "bg-[#1e1e1e]"
              }`}
          >
            <img
              src={msg.role === "user" ? user.imageUrl : icon}
              className="w-8 mx-3 mt-3 h-8 rounded-full"
              alt={msg.role}
            />
            <div className="mx-2 mt-1 reset-tw prose prose-invert break-words whitespace-pre-wrap w-[400px]">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code: ({ node, inline, className, children, ...props }) => (
                    !inline ? (
                      <pre className="overflow-x-auto max-w-[380px] bg-[#181818] p-2 rounded">
                        <code {...props}>{children}</code>
                      </pre>
                    ) : (
                      <code className="bg-[#181818] px-1 rounded">{children}</code>
                    )
                  ),
                  table: ({ node, ...props }) => (
                    <div className="overflow-x-auto max-w-[380px]">
                      <table className="table-auto border-collapse" {...props} />
                    </div>
                  ),
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>

          </div>
        ))
      ) : (
        <p className="text-gray-400">No messages yet</p>
      )}
    </div>

  </div>
);

const RightDashboard = ({ chatMessages, isPremium = false }) => {
  const { user } = useUser();
  const { openUserProfile } = useClerk();

  const handleUpgradeClick = () => {
    openUserProfile({ 
      appearance: {
        elements: {
          rootBox: "mx-auto",
          card: "bg-[#1e1e1e] border border-white/20"
        }
      }
    });
  };

  const aiTools = [
    { name: "ChatGPT", icon: assets.chatgpt, isLocked: false },
    { name: "Gemini", icon: assets.gemini, isLocked: false },
    { name: "DeepSeek", icon: assets.deepseek, isLocked: false },
    { name: "Perplexity", icon: assets.perplexity, isLocked: !isPremium },
    { name: "Claude", icon: assets.claude, isLocked: !isPremium },
    { name: "Grok", icon: assets.grok, isLocked: !isPremium },
  ];

  return (
    <div className="overflow-x-scroll  scrollbar-blue">
      <div className="flex h-auto gap-4">
        {aiTools.map((tool, i) => (
          <AITool
            key={i}
            name={tool.name}
            icon={tool.icon}
            onUpgradeClick={handleUpgradeClick}
            chatMessages={chatMessages[tool.name] || []}
            user={user}
            isLocked={tool.isLocked}
          />
        ))}
      </div>
    </div>
  );
};

export default RightDashboard;
