import { Maximize2 } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { assets } from "../assets/assets";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AITool = ({ name, icon, chatMessages, user }) => (
  <div className="flex flex-col border border-white/20 bg-[#1e1e1e]">
    {/* Header */}
    <div className="flex border border-white/20 justify-between h-15 w-120 bg-[#181818]">
      <div className="p-5 gap-2 flex items-center">
        <img src={icon} alt={`${name} logo`} className="h-5 w-5" />
        <span>{name}</span>
      </div>
      <div className="flex p-5 gap-2 items-center">
        <Maximize2 className="h-5 w-5" />
      </div>
    </div>

    {/* Messages */}
    <div className="overflow-y-auto scrollbar-black w-120  overflow-x-auto p-3">
      {chatMessages && chatMessages.length > 0 ? (
        chatMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex p-2 my-1 ${msg.role === "user" ? "bg-[#181818]" : "bg-[#1e1e1e]"
              }`}
          >
            <img
              src={msg.role === "user" ? user.imageUrl : icon}
              className="w-8 mx-3 mt-1 h-8 rounded-full"
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

const RightDashboard = ({ chatMessages }) => {
  const { user } = useUser();

  const aiTools = [
    { name: "ChatGPT" ,icon: assets.openai },
    { name: "Gemini", icon: assets.gemini },
    { name: "DeepSeek", icon: assets.deepseek },
    { name: "Perplexity", icon: assets.perplexity },
    { name: "Claude", icon: assets.claude },
    { name: "Grok", icon: assets.grok },
  ];

  return (
    <div className="overflow-x-scroll scrollbar-blue">
      <div className="flex h-136 gap-4">
        {aiTools.map((tool, i) => (
          <AITool
            key={i}
            name={tool.name}
            icon={tool.icon}
            chatMessages={chatMessages[tool.name] || []}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default RightDashboard;
