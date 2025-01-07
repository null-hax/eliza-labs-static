import { FC, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'

interface FormData {
  name: string
  category: '' | 'film' | 'advertising' | 'consulting' | 'music' | 'gaming' | 'events'
  interests: string
  contactInfo: string
  source: string
}

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
}

export const ContactForm: FC<ContactFormProps> = ({ isOpen, onClose }) => {
  const formRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    interests: '',
    contactInfo: '',
    source: 'elizalabs.ai'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('https://eliza.gg/api/partnerships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) throw new Error('Submission failed')
      
      setFormData({
        name: '',
        category: '',
        interests: '',
        contactInfo: '',
        source: 'elizalabs.ai'
      })

      toast.success('Message sent successfully', {
        className: 'bg-white border border-[#002AF0]/30',
        descriptionClassName: 'text-black/80',
        duration: 5000,
      })
      onClose()
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('Failed to send message. Please try again.', {
        className: 'bg-white border border-[#002AF0]/30',
        descriptionClassName: 'text-black/80',
        duration: 5000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/25 backdrop-blur-sm z-50"
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              ref={formRef}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg bg-white text-black backdrop-blur-md rounded border border-[#002AF0]/30 p-8 relative"
            >
              <button
                onClick={onClose}
                className="absolute top-8 right-6 w-8 h-8
                           border border-[#002AF0]/30 hover:border-[#002AF0]/40
                           text-[#002AF0] bg-[#002AF0]/10 hover:bg-[#002AF0]/20 
                           text-sm rounded-sm
                           transition-all duration-200 ease-out
                           focus:outline-none focus:ring-2 focus:ring-[#002AF0]/20
                           flex items-center justify-center"
                aria-label="Close modal"
              >
                ×
              </button>

              <h2 className="text-2xl mb-8">Contact Us</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-black text-sm mb-2" htmlFor="name">Who's asking?</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Enter your name or company."
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 bg-white/50 border border-[#002AF0]/20 rounded-sm 
                             text-black/90 text-sm
                             focus:outline-none focus:border-[#002AF0]/40 focus:ring-1 focus:ring-[#002AF0]/20
                             transition-colors placeholder:text-black/40"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-black text-sm mb-2" htmlFor="category">What are we talking about?</label>
                  <div className="relative">
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as FormData['category'] }))}
                      className="w-full p-3 bg-white/50 border border-[#002AF0]/20 rounded-sm 
                               text-black/90 text-sm appearance-none
                               focus:outline-none focus:border-[#002AF0]/40 focus:ring-1 focus:ring-[#002AF0]/20
                               transition-colors pr-10
                               [&>option[value='']]:text-black/20
                               [&:invalid]:text-black/40"
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
                        className="h-4 w-4 fill-[#002AF0]/60" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" stroke="currentColor" fill="none"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-black text-sm mb-2" htmlFor="interests">The details</label>
                  <textarea
                    id="interests"
                    placeholder="Lay it out. What do you need?"
                    value={formData.interests}
                    onChange={(e) => setFormData(prev => ({ ...prev, interests: e.target.value }))}
                    className="w-full p-3 bg-white/50 border border-[#002AF0]/20 rounded-sm 
                             text-black/90 text-sm min-h-[120px]
                             focus:outline-none focus:border-[#002AF0]/40 focus:ring-1 focus:ring-[#002AF0]/20
                             transition-colors placeholder:text-black/40 resize-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black text-sm mb-2" htmlFor="contactInfo">Where can we reach you?</label>
                  <input
                    type="text"
                    id="contactInfo"
                    placeholder="Email, phone, whatever works."
                    value={formData.contactInfo}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactInfo: e.target.value }))}
                    className="w-full p-3 bg-white/50 border border-[#002AF0]/20 rounded-sm 
                             text-black/90 text-sm
                             focus:outline-none focus:border-[#002AF0]/40 focus:ring-1 focus:ring-[#002AF0]/20
                             transition-colors placeholder:text-black/40"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full p-3 mt-4 border border-[#002AF0]/30 hover:border-[#002AF0]/40
                           hover:from-[#002AF0]/20 hover:to-[#002AF0]/10
                           text-[#002AF0] bg-[#002AF0]/10 hover:bg-[#002AF0]/20 text-sm rounded-sm
                           transition-all duration-200 ease-out
                           disabled:opacity-50 disabled:cursor-not-allowed
                           focus:outline-none focus:ring-2 focus:ring-[#002AF0]/20"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
} 