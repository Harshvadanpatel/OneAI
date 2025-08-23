import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'
import { assets } from '../assets/assets'

const Hero = () => {
  const navigate = useNavigate()
  const { user, isSignedIn } = useUser()
  const { openSignIn } = useClerk()

  const handleStartChatting = () => {
    if (isSignedIn) {
      navigate("/ai")   // ✅ User is logged in → Go to Dashboard
    } else {
      openSignIn({})    // ✅ Not logged in → Open Clerk SignIn popup
    }
  }

  return (
    <div className='hero px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-[#0D1117] bg-cover bg-no-repeat min-h-screen' >

      <div className='text-center mb-6'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl front-semibold mx-auto leading-[1.2] text-white'>
          Chat with multiple AI models <br /> and <span className='text-[#10A37F]'>boost your prompts</span>
        </h1>
        <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-[#9CA3AF]'>
          OneAI lets you interact with multiple AI models in one platform. Apply system-level instructions, compare responses, and get consistent results faster.
        </p>
      </div>

      <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs'>
        <button
          onClick={handleStartChatting}
          className='bg-[#10A37F] text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition cursor-pointer'
        >
          Start Chatting Now
        </button>
        <button className='bg-[#161B22] text-white px-10 py-3 rounded-lg border border-[#2D333B] hover:scale-102 active:scale-95 transition cursor-pointer'>
          Learn More
        </button>
      </div>

      <div className='flex item-center gap-4 mt-8 mx-auto text-[#9CA3AF]'>
        <img src={assets.user_group} alt="" className='h-8' /> Trusted by 10k+ users
      </div>
    </div>
  )
}

export default Hero
