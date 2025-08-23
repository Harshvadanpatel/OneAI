import { assets } from "../assets/assets"

const Testimonial = () => {
    const dummyTestimonialData = [
        {
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            name: 'John Doe',
            title: 'AI Enthusiast',
            content: 'OneAI has transformed how I interact with AI. Comparing multiple models in one platform saves me time and gives better insights.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            name: 'Jane Smith',
            title: 'Content Strategist',
            content: 'The prompt boosting feature is amazing! I can refine my inputs and get precise outputs from different AI models instantly.',
            rating: 5,
        },
        {
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
            name: 'David Lee',
            title: 'Developer',
            content: 'OneAI helps me test AI responses across multiple models. It makes experimenting and learning much faster and more organized.',
            rating: 4,
        },
    ]

    return (
        <div className='px-4 sm:px-20 xl:px-32 py-24'>
            <div className='text-center'>
                <h2 className='text-white text-[42px] font-semibold'>Loved by OneAI Users</h2>
                <p className='text-[#9CA3AF] max-w-lg mx-auto'>
                    Hear from users who boosted their productivity with OneAI.
                </p>
            </div>
            <div className='flex flex-wrap mt-10 justify-center'>
                {dummyTestimonialData.map((testimonial, index) => (
                    <div 
                        key={index} 
                        className='p-8 m-4 max-w-xs rounded-lg bg-[#161B22] shadow-lg border border-[#2D333B] hover:-translate-y-1 transition duration-300 cursor-pointer'
                    >
                        <div className="flex items-center gap-1">
                            {Array(5).fill(0).map((_,i)=>(
                                <img 
                                    key={i} 
                                    src={i < testimonial.rating ? assets.star_icon : assets.star_dull_icon} 
                                    className="w-4 h-4" 
                                    alt="star"
                                />
                            ))}
                        </div>
                        <p className='text-[#9CA3AF] text-sm my-5'>"{testimonial.content}"</p>
                        <hr className='mb-5 border-[#2D333B]' />
                        <div className='flex items-center gap-4'>
                            <img src={testimonial.image} className='w-12 object-contain rounded-full' alt='' />
                            <div className='text-sm text-[#9CA3AF]'>
                                <h3 className='font-medium text-white'>{testimonial.name}</h3>
                                <p className='text-xs'>{testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Testimonial
