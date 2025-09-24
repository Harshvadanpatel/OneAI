import { Send } from "lucide-react";
import React, { useRef } from "react";

const InputArea = ({ onSendMessage }) => {
  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (inputRef.current && inputRef.current.value.trim() !== "") {
      const msg = inputRef.current.value.trim();
      onSendMessage(msg); // send to parent
      inputRef.current.value = "";
    }
  };

  return (
    <footer className="w-full h-auto bg-[#1e1e1e] border-t border-gray-500 p-4 flex items-center justify-center ">
      <div className="bg-[#181818] flex justify-between items-center p-4 h-28 w-210 rounded-2xl shadow-lg border border-white/20">
        <textarea
          ref={inputRef}
          placeholder="Ask Gemini something..."
          className="flex-1 bg-transparent text-white resize-none outline-none px-2 text-xl"
        />
        <div
          onClick={handleSubmit}
          className="bg-[#4cb779] text-white rounded-2xl flex justify-center items-center ml-2 hover:bg-[#4cb779]/90 h-10 w-10 cursor-pointer"
        >
          <Send />
        </div>
      </div>
    </footer>
  );
};

export default InputArea;
