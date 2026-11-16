import { useCallback, useState } from 'react'
import Container from '../components/common/Container.jsx'
import PageBanner from '../components/common/PageBanner.jsx'
import Reveal from '../components/common/Reveal.jsx'
import FaqAccordion from '../components/common/FaqAccordion.jsx'
import SuccessPopup from '../components/common/SuccessPopup.jsx'
import { PhoneIcon, MailIcon, MapPinIcon } from '../components/common/icons.jsx'
import { faqs } from '../data/faqs.js'
import bannerImage from '../assets/site-image/sect-fur-image.jpeg'

const contactInfo = [
  {
    label: 'Call Us',
    value: '+1 780 531 6230',
    href: 'tel:+17805316230',
    Icon: PhoneIcon,
  },
  {
    label: 'Email Us',
    value: 'michael@globalretirementfundsinc.com',
    href: 'mailto:michael@globalretirementfundsinc.com',
    Icon: MailIcon,
  },
  {
    label: 'View on Map',
    value: 'Find us on Google Maps',
    href: 'https://maps.google.com',
    Icon: MapPinIcon,
  },
]

const initialForm = { name: '', email: '', phone: '', message: '' }

// Submissions are emailed via Web3Forms (web3forms.com). The access key is
// public by design: it can only deliver to the inbox set in the Web3Forms
// dashboard, so it's safe to ship in frontend code. Works on any host
// (Vercel, cPanel, localhost) with no backend.
const FORM_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = '85dcc53b-38c5-4b64-bec7-17fca135147a'

function Contact() {
  const [form, setForm] = useState(initialForm)
  // 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState('idle')
  // Reason returned by the form service, shown under the error message.
  const [errorDetail, setErrorDetail] = useState('')
  // Hidden anti-spam field; humans never see or fill it.
  const [honeypot, setHoneypot] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const closePopup = useCallback(() => setStatus('idle'), [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        // Don't leave the visitor waiting forever if the service is slow.
        signal: AbortSignal.timeout(15000),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `New Contact Form Message from ${form.name}`,
          from_name: 'Global Retirement Funds Website',
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          message: form.message,
          botcheck: honeypot,
        }),
      })
      const result = await response.json().catch(() => ({}))

      if (!response.ok || result.success !== true) {
        throw new Error(result.message || 'Submission failed')
      }

      setStatus('success')
      setForm(initialForm)
    } catch (error) {
      console.error('[contact form] submission failed:', error)
      setErrorDetail(
        error?.name === 'TimeoutError'
          ? 'The request timed out.'
          : error?.message || '',
      )
      setStatus('error')
    }
  }

  return (
    <>
      <SuccessPopup
        open={status === 'success'}
        onClose={closePopup}
        title="Thank You!"
        message="Your message has been sent successfully. Our team will get back to you shortly."
      />

      <PageBanner
        title="Contact Us"
        subtitle="Reach out today and let our team guide you with clear and practical solutions for your project needs."
        image={bannerImage}
      />

      <section className="section">
        <Container>
          <div className="contact-grid">
            <Reveal x={-40} y={0}>
              <h2 className="section-title">Get in Touch</h2>
              <p className="contact-copy__text">
                Reach out today and let our team guide you with clear and
                practical solutions for your project needs.
              </p>

              <div className="contact-info-list">
                {contactInfo.map(({ label, value, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="contact-info-link"
                  >
                    <span className="contact-info-icon">
                      <Icon className="icon-sm" />
                    </span>
                    <span>
                      <span className="contact-info-label">{label}</span>
                      <span className="contact-info-value">{value}</span>
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal x={40} y={0} delay={0.1}>
              <form onSubmit={handleSubmit} className="contact-form">
                {status === 'error' && (
                  <p className="form-error" role="alert">
                    Sorry, your message could not be sent. Please try again or
                    email us directly at michael@globalretirementfundsinc.com.
                    {errorDetail && (
                      <span className="form-error__detail">
                        Reason: {errorDetail}
                      </span>
                    )}
                  </p>
                )}

                <div className="form-row">
                  <div>
                    <label htmlFor="name" className="form-label field-gap">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      className="form-input input-field fluid-text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="form-label field-gap">
                      Phone
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className="form-input input-field fluid-text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="form-label field-gap">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="form-input input-field fluid-text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="form-label field-gap">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    className="form-input input-field fluid-text-sm"
                  />
                </div>

                <input
                  type="text"
                  name="botcheck"
                  value={honeypot}
                  onChange={(event) => setHoneypot(event.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px' }}
                />

                <button
                  type="submit"
                  className="form-submit btn"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="section section--alt">
        <Container>
          <Reveal className="section-header">
            <span className="eyebrow">FAQs</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </Reveal>

          <Reveal delay={0.1} className="faq-wrap">
            <FaqAccordion items={faqs} />
          </Reveal>
        </Container>
      </section>
    </>
  )
}

export default Contact
