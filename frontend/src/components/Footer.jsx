import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()

    return (
        <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-[#9CA3AF] mt-20 bg-[#0D1117]">
            <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-[#2D333B] pb-6">
                <div className="md:max-w-96">
                    <img className="h-16 w-auto" src={assets.logo} alt="OneAI Logo"/>
                    <p className="mt-6 text-sm text-[#9CA3AF]">
                        OneAI brings multiple AI models into a single platform.<br/>
                        Chat, boost prompts, and compare AI responses instantly for better productivity.
                    </p>
                </div>
                <div className="flex-1 flex items-start md:justify-end gap-20">
                    <div>
                        <h2 className="font-semibold mb-5 text-white">Company</h2>
                        <ul className="text-sm space-y-2">
                            <li><a href="#" className="hover:text-[#10A37F]">Home</a></li>
                            <li><a href="#" className="hover:text-[#10A37F]">Features</a></li>
                            <li><a href="#" className="hover:text-[#10A37F]">Pricing</a></li>
                            <li><a href="#" className="hover:text-[#10A37F]">Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-semibold text-white mb-5">Subscribe to our newsletter</h2>
                        <div className="text-sm space-y-2">
                            <p>Get updates on new AI models, prompt techniques, and OneAI features delivered weekly.</p>
                            <div className="flex items-center gap-2 pt-4">
                                <input 
                                    className="border border-[#2D333B] placeholder-[#9CA3AF] focus:ring-2 ring-[#10A37F] outline-none w-full max-w-64 h-9 rounded px-2 bg-[#161B22] text-white" 
                                    type="email" 
                                    placeholder="Enter your email"
                                />
                                <button className="bg-[#10A37F] w-24 h-9 text-white rounded cursor-pointer hover:bg-[#1A7F64]">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="pt-4 text-center text-xs md:text-sm pb-5 text-[#9CA3AF]">
                Copyright 2025 © <span className='cursor-pointer text-white hover:text-[#10A37F]' onClick={()=>{navigate('/')}}>OneAI</span>. All Rights Reserved.
            </p>
        </footer>
    )
}

export default Footer
