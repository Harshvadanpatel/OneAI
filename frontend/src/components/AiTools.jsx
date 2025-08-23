import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import {assets} from '../assets/assets.js' // import your uploaded SVGs

const AiTools = () => {
    const navigate = useNavigate()
    const { user } = useUser()

    return (
        <div className='px-4 sm:px-20 xl:px-32 my-24'>
            <div className='text-center'>
                <h2 className='text-white text-[42px] font-semibold'>Integrated AI Platforms</h2>
                <p className='text-[#9CA3AF] max-w-lg mx-auto'>
                    Connect with leading AI engines to supercharge your content creation and AI experiments.
                </p>
            </div>

            <div className='flex flex-wrap mt-10 justify-center'>

                {/* OpenAI */}
                <div 
                    className='p-8 m-4 max-w-xs rounded-lg bg-[#161B22] shadow-lg border border-[#2D333B] hover:-translate-y-1 transition-all duration-300 cursor-pointer' 
                    onClick={() => user && navigate('/ai/openai')}
                >
                    <img src={assets.openai} alt="OpenAI" className='w-12 h-12 p-3 rounded-xl bg-white'/>
                    <h3 className='mt-6 mb-3 text-lg font-semibold text-white'>OpenAI</h3>
                    <p className='text-[#9CA3AF] text-sm max-w-[95%]'>
                        Access OpenAI’s models for chat, content generation, and AI-powered assistance.
                    </p>
                </div>

                {/* Gemini */}
                <div 
                    className='p-8 m-4 max-w-xs rounded-lg bg-[#161B22] shadow-lg border border-[#2D333B] hover:-translate-y-1 transition-all duration-300 cursor-pointer' 
                    onClick={() => user && navigate('/ai/gemini')}
                >
                    <img src={assets.gemini} alt="Gemini" className='w-12 h-12 p-3 rounded-xl bg-white'/>
                    <h3 className='mt-6 mb-3 text-lg font-semibold text-white'>Gemini</h3>
                    <p className='text-[#9CA3AF] text-sm max-w-[95%]'>
                        Explore Gemini’s AI engine for conversational intelligence and content creation.
                    </p>
                </div>

                {/* DeepSeek */}
                <div 
                    className='p-8 m-4 max-w-xs rounded-lg bg-[#161B22] shadow-lg border border-[#2D333B] hover:-translate-y-1 transition-all duration-300 cursor-pointer' 
                    onClick={() => user && navigate('/ai/deepseek')}
                >
                    <img src={assets.deepseek} alt="DeepSeek" className='w-12 h-12 p-3 rounded-xl bg-white'/>
                    <h3 className='mt-6 mb-3 text-lg font-semibold text-white'>DeepSeek</h3>
                    <p className='text-[#9CA3AF] text-sm max-w-[95%]'>
                        Use DeepSeek for advanced AI search and semantic analysis capabilities.
                    </p>
                </div>

                {/* Claude */}
                <div 
                    className='p-8 m-4 max-w-xs rounded-lg bg-[#161B22] shadow-lg border border-[#2D333B] hover:-translate-y-1 transition-all duration-300 cursor-pointer' 
                    onClick={() => user && navigate('/ai/claude')}
                >
                    <img src={assets.claude} alt="Claude" className='w-12 h-12 p-3 rounded-xl bg-white'/>
                    <h3 className='mt-6 mb-3 text-lg font-semibold text-white'>Claude</h3>
                    <p className='text-[#9CA3AF] text-sm max-w-[95%]'>
                        Engage with Claude AI for natural language understanding and advanced reasoning.
                    </p>
                </div>

                {/* Grook */}
                <div 
                    className='p-8 m-4 max-w-xs rounded-lg bg-[#161B22] shadow-lg border border-[#2D333B] hover:-translate-y-1 transition-all duration-300 cursor-pointer' 
                    onClick={() => user && navigate('/ai/grook')}
                >
                    <img src={assets.grok} alt="Grook" className='w-12 h-12 p-3 rounded-xl bg-white'/>
                    <h3 className='mt-6 mb-3 text-lg font-semibold text-white'>Grook</h3>
                    <p className='text-[#9CA3AF] text-sm max-w-[95%]'>
                        Access Grook AI for data insights, summarization, and creative assistance.
                    </p>
                </div>

                {/* Perplexity */}
                <div 
                    className='p-8 m-4 max-w-xs rounded-lg bg-[#161B22] shadow-lg border border-[#2D333B] hover:-translate-y-1 transition-all duration-300 cursor-pointer' 
                    onClick={() => user && navigate('/ai/perplexity')}
                >
                    <img src={assets.perplexity} alt="Perplexity" className='w-12 h-12 p-3 rounded-xl bg-white'/>
                    <h3 className='mt-6 mb-3 text-lg font-semibold text-white'>Perplexity</h3>
                    <p className='text-[#9CA3AF] text-sm max-w-[95%]'>
                        Leverage Perplexity AI for knowledge retrieval and question-answering tasks.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default AiTools
