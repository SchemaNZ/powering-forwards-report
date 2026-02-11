'use client'

import { useState } from 'react'

export default function ReportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    farmType: 'dairy',
    region: 'Southland',
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
        setFormData({ name: '', email: '', farmType: 'dairy', region: 'Southland' })
        
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
    <div className="min-h-screen py-12" style={{ backgroundColor: '#E8F0E0' }}>
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-neutral-900 mb-2">
            Powering Forwards
          </h1>
          <p className="text-base md:text-lg text-neutral-700 font-medium">
            Farm Energy Analysis Report
          </p>
          <p className="text-sm md:text-base text-neutral-600 mt-2">
            A Life Cycle Cost and Resilience Analysis of Backup Power Solutions for Southland Farms
          </p>
        </header>

        {/* Content Box */}
        <div className="bg-white rounded-2xl p-8 md:p-10 border-2 border-accent/30 mb-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-sans font-bold text-neutral-900 mb-4">
              Discover the Financial Case for Solar + Battery Storage
            </h2>
            <p className="text-base md:text-lg text-neutral-700 mb-4">
              This comprehensive report analyzes the economics of transitioning from diesel backup generators to solar + battery systems for Southland farms.
            </p>
            <p className="text-base text-neutral-600 mb-4">
              Download the full report to learn:
            </p>
            <ul className="space-y-3 text-neutral-700 mb-8">
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span className="text-base">20-year net present value analysis for different farm types</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span className="text-base">Risk mitigation benefits: Generator failure, fuel supply, energy price hedging</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span className="text-base">System sizing and financing options for your farm</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span className="text-base">Scenario analysis across different inflation rates</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span className="text-base">Environmental and resilience benefits</span>
              </li>
            </ul>
          </div>

          {/* Lead Capture Form */}
          {!submitted ? (
            <div>
              <h3 className="text-xl md:text-2xl font-sans font-bold text-neutral-900 mb-6">
                Download the Report
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-base font-bold text-neutral-900 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-base"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-base font-bold text-neutral-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-base"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="farmType" className="block text-base font-bold text-neutral-900 mb-2">
                      Farm Type
                    </label>
                    <select
                      id="farmType"
                      name="farmType"
                      value={formData.farmType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-base"
                    >
                      <option value="dairy">Dairy</option>
                      <option value="sheepBeef">Sheep/Beef</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="region" className="block text-base font-bold text-neutral-900 mb-2">
                      Region
                    </label>
                    <select
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-base"
                    >
                      <option value="Southland">Southland</option>
                      <option value="Otago">Otago</option>
                      <option value="Canterbury">Canterbury</option>
                      <option value="West Coast">West Coast</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6 text-base"
                >
                  {loading ? 'Processing...' : 'Download Report 📄'}
                </button>

                <p className="text-sm text-neutral-600 text-center mt-4">
                  We'll send you the full report instantly. Your details help us connect you with certified solar installers.
                </p>
              </form>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Report Downloaded!
              </h3>
              <p className="text-neutral-700 text-base">
                The PDF should download shortly. Check your inbox for details about next steps.
              </p>
            </div>
          )}
        </div>

        {/* CTA to Calculator */}
        <div className="text-center">
          <p className="text-neutral-700 mb-4 text-base">
            Want to run your own calculations?
          </p>
          <a
            href="https://farmcalc.electrifysouthland.nz"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-base"
          >
            Try the Interactive Calculator 🧮
          </a>
        </div>
      </div>
    </div>
  )
}
