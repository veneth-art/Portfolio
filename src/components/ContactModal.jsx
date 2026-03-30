import { useState } from 'react'
import { FiX, FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'
import { CloseButton, PrimaryButton } from './Button'
import './ContactModal.css'

function ContactModal({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const response = await fetch('/.netlify/functions/submit_contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to send')
      
      setStatus('success')
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <CloseButton onClick={onClose}>
          <FiX />
        </CloseButton>
        
        <div className="modal-header">
          <h2>Let's Work Together</h2>
          <p>Have a project in mind? I'd love to hear about it.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                disabled={status === 'submitting'}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                required
                disabled={status === 'submitting'}
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company"
                disabled={status === 'submitting'}
              />
            </div>
            <div className="form-group">
              <label htmlFor="budget">Budget Range</label>
              <input
                type="text"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="$5K - $10K"
                disabled={status === 'submitting'}
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project, timeline, and goals..."
              rows={5}
              required
              disabled={status === 'submitting'}
            />
          </div>
          
          <PrimaryButton 
            type="submit" 
            disabled={status === 'submitting' || status === 'success'}
          >
            {status === 'submitting' ? (
              <>
                <span className="loading-spinner"></span>
                Sending...
              </>
            ) : status === 'success' ? (
              <>
                <FiCheck />
                Message Sent!
              </>
            ) : status === 'error' ? (
              <>
                <FiAlertCircle />
                Try Again
              </>
            ) : (
              <>
                <FiSend />
                Send Message
              </>
            )}
          </PrimaryButton>
        </form>
      </div>
    </div>
  )
}

export default ContactModal
