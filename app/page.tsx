'use client'

import { useState } from 'react'

export default function ReportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    farmType: 'dairy',
    region: 'Southland',
    timeline: 'interested',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/report-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', farmType: 'dairy', region: 'Southland', timeline: 'interested' })
        
        // Trigger PDF download after successful submission
        setTimeout(() => {
          const link = document.createElement('a')
          link.href = '/powering-forwards-report.pdf'
          link.download = 'powering-forwards-report.pdf'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }, 500)
      } else {
        console.error('Form submission failed:', data)
        alert('There was an error. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-neutral-50)', padding: '3rem 1.5rem' }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, marginBottom: '0.5rem' }}>
            Powering Forwards
          </h1>
          <p style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
            Farm Energy Analysis Report
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--color-neutral-700)', lineHeight: 1.8 }}>
            A Life Cycle Cost and Resilience Analysis of Backup Power Solutions for Southland Farms
          </p>
        </header>

        {/* Content Box */}
        <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: '1rem', padding: '2rem', border: '2px solid var(--color-neutral-200)', marginBottom: '2rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 700, marginBottom: '1rem' }}>
              Discover the Financial Case for Solar + Battery Storage
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-neutral-700)', marginBottom: '1rem', lineHeight: 1.8 }}>
              This comprehensive report analyzes the economics of transitioning from diesel backup generators to solar + battery systems for Southland farms.
            </p>
            <p style={{ fontSize: '1rem', color: 'var(--color-neutral-700)', marginBottom: '1rem' }}>
              Download the full report to learn:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
              {[
                '20-year net present value analysis for different farm types',
                'Risk mitigation benefits: Generator failure, fuel supply, energy price hedging',
                'System sizing and financing options for your farm',
                'Scenario analysis across different inflation rates',
                'Environmental and resilience benefits',
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 700, marginRight: '1rem', flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: '1rem', color: 'var(--color-neutral-700)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lead Capture Form */}
          {!submitted ? (
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                Download the Report
              </h3>
              <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label htmlFor="name" style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-neutral-900)' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid var(--color-neutral-200)', borderRadius: '0.5rem', backgroundColor: 'var(--color-surface)', color: 'var(--color-neutral-900)', fontSize: '1rem', fontFamily: "'Rubik', sans-serif" }}
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-neutral-900)' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid var(--color-neutral-200)', borderRadius: '0.5rem', backgroundColor: 'var(--color-surface)', color: 'var(--color-neutral-900)', fontSize: '1rem', fontFamily: "'Rubik', sans-serif" }}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-neutral-900)' }}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid var(--color-neutral-200)', borderRadius: '0.5rem', backgroundColor: 'var(--color-surface)', color: 'var(--color-neutral-900)', fontSize: '1rem', fontFamily: "'Rubik', sans-serif" }}
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label htmlFor="farmType" style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-neutral-900)' }}>
                      Farm Type
                    </label>
                    <select
                      id="farmType"
                      name="farmType"
                      value={formData.farmType}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid var(--color-neutral-200)', borderRadius: '0.5rem', backgroundColor: 'var(--color-surface)', color: 'var(--color-neutral-900)', fontSize: '1rem', fontFamily: "'Rubik', sans-serif", cursor: 'pointer' }}
                    >
                      <option value="dairy">Dairy</option>
                      <option value="sheepBeef">Sheep/Beef</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="region" style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-neutral-900)' }}>
                      Region
                    </label>
                    <select
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid var(--color-neutral-200)', borderRadius: '0.5rem', backgroundColor: 'var(--color-surface)', color: 'var(--color-neutral-900)', fontSize: '1rem', fontFamily: "'Rubik', sans-serif", cursor: 'pointer' }}
                    >
                      <option value="Southland">Southland</option>
                      <option value="Otago">Otago</option>
                      <option value="Canterbury">Canterbury</option>
                      <option value="West Coast">West Coast</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="timeline" style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-neutral-900)' }}>
                      Installation Timeline
                    </label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.75rem 1rem', border: '2px solid var(--color-neutral-200)', borderRadius: '0.5rem', backgroundColor: 'var(--color-surface)', color: 'var(--color-neutral-900)', fontSize: '1rem', fontFamily: "'Rubik', sans-serif", cursor: 'pointer' }}
                    >
                      <option value="next-month">Next Month</option>
                      <option value="next-3-months">Next 3 Months</option>
                      <option value="next-6-months">Next 6 Months</option>
                      <option value="next-year">Next Year</option>
                      <option value="interested">Just Interested in the Report</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: '100%',
                    backgroundColor: loading ? 'var(--color-neutral-500)' : 'var(--color-primary)',
                    color: 'white',
                    padding: '1rem',
                    marginTop: '1.5rem',
                    fontSize: '1rem',
                    fontWeight: 700,
                    opacity: loading ? 0.5 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    border: 'none',
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)')}
                  onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = 'var(--color-primary)')}
                >
                  {loading ? 'Processing...' : 'Download Report 📄'}
                </button>

                <p style={{ fontSize: '0.875rem', color: 'var(--color-neutral-700)', textAlign: 'center', marginTop: '1rem' }}>
                  We'll send you the full report instantly. Your details help us connect you with certified solar installers.
                </p>
              </form>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1rem' }}>
                Report Downloaded!
              </h3>
              <p style={{ color: 'var(--color-neutral-700)' }}>
                The PDF should download shortly. Check your inbox for details about next steps.
              </p>
            </div>
          )}
        </div>

        {/* CTA to Calculator */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--color-neutral-700)', marginBottom: '1.5rem' }}>
            Want to run your own calculations?
          </p>
          <a
            href="https://farmcalc.electrifysouthland.nz"
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              fontWeight: 700,
              padding: '1rem 2rem',
              borderRadius: '0.5rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary-dark)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-primary)')}
          >
            Try the Interactive Calculator 🧮
          </a>
        </div>
      </div>
    </div>
  )
}
