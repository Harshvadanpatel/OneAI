import React, { useState } from 'react'
import InputArea from './InputArea'
import RightDashboard from './RightDashboard'

const ChatPage = () => {
    const [chatMessages, setChatMessages] = useState([]) // central state

    return (
        <div className="flex flex-col h-screen">
            {/* Show all AI models */}
            <div className="flex-1 overflow-hidden">
                <RightDashboard chatMessages={chatMessages} />
            </div>

            {/* Input box at bottom */}
            <InputArea setChatMessages={setChatMessages} />
        </div>
    )
}

export default ChatPage
