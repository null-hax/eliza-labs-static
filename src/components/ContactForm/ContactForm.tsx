import { FC, useState } from 'react'
import { motion } from 'framer-motion'

interface FormData {
  name: string
  category: '' | 'film' | 'advertising' | 'consulting' | 'music' | 'gaming' | 'events'
  details: string
  contactInfo: string
}

export const ContactForm: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    details: '',
    contactInfo: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    if (process.env.NODE_ENV === 'development') {
      // Simulate API call in development
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Form submitted:', formData)
      setFormData({
        name: '',
        category: 'film',
        details: '',
        contactInfo: ''
      })
    }
    
    setIsSubmitting(false)
  }

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto p-8 bg-black backdrop-blur-md rounded border border-[#ff6a1a]/30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl mb-8">Contact Us</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-white text-sm mb-2" htmlFor="name">Who's Asking?</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name or company."
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-3 bg-black/50 border border-[#ff6a1a]/20 rounded-sm 
                     text-white/90 text-sm
                     focus:outline-none focus:border-[#ff6a1a]/40 focus:ring-1 focus:ring-[#ff6a1a]/20
                     transition-colors placeholder:text-white/40"
            required
          />
        </div>

        <div className="relative">
          <label className="block text-white text-sm mb-2" htmlFor="category">What Are We Talking About?</label>
          <div className="relative">
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as FormData['category'] }))}
              className="w-full p-3 bg-black/50 border border-[#ff6a1a]/20 rounded-sm 
                       text-white/90 text-sm appearance-none
                       focus:outline-none focus:border-[#ff6a1a]/40 focus:ring-1 focus:ring-[#ff6a1a]/20
                       transition-colors pr-10
                       [&>option[value='']]:text-white/20
                       [&:invalid]:text-white/40"
              required
            >
              <option value="" disabled>Choose the type of inquiry.</option>
              <option value="film">Film</option>
              <option value="advertising">Advertising</option>
              <option value="consulting">Consulting</option>
              <option value="music">Music</option>
              <option value="gaming">Gaming</option>
              <option value="events">Events</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <svg 
                className="h-4 w-4 fill-[#ff6a1a]/60" 
                viewBox="0 0 20 20"
              >
                <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" stroke="currentColor" fill="none"/>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-white text-sm mb-2" htmlFor="details">The Details</label>
          <textarea
            id="details"
            placeholder="Lay it out. What do you need?"
            value={formData.details}
            onChange={(e) => setFormData(prev => ({ ...prev, details: e.target.value }))}
            className="w-full p-3 bg-black/50 border border-[#ff6a1a]/20 rounded-sm 
                     text-white/90 text-sm min-h-[120px]
                     focus:outline-none focus:border-[#ff6a1a]/40 focus:ring-1 focus:ring-[#ff6a1a]/20
                     transition-colors placeholder:text-white/40 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-white text-sm mb-2" htmlFor="contactInfo">Where Can We Reach You?</label>
          <input
            type="text"
            id="contactInfo"
            placeholder="Email, phone, whatever works."
            value={formData.contactInfo}
            onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
            className="w-full p-3 bg-black/50 border border-[#ff6a1a]/20 rounded-sm 
                     text-white/90 text-sm
                     focus:outline-none focus:border-[#ff6a1a]/40 focus:ring-1 focus:ring-[#ff6a1a]/20
                     transition-colors placeholder:text-white/40"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-3 mt-4 border border-[#ff6a1a]/30 hover:border-[#ff6a1a]/40
                   hover:from-[#ff6a1a]/20 hover:to-[#ff6a1a]/10
                   text-[#ff6a1a] bg-[#ff6a1a]/10 hover:bg-[#ff6a1a]/20 text-sm rounded-sm
                   transition-all duration-200 ease-out
                   disabled:opacity-50 disabled:cursor-not-allowed
                   focus:outline-none focus:ring-2 focus:ring-[#ff6a1a]/20"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </motion.form>
  )
} 