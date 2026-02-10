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
      
      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', farmType: 'dairy', region: 'Southland' })
        
        // Trigger PDF download after successful submission
        window.location.href = '/powering-forwards-report.pdf'
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-4">
            Powering Forwards
          </h1>
          <p className="text-2xl text-green-700 font-semibold mb-2">
            Farm Energy Analysis Report
          </p>
          <p className="text-lg text-neutral-700">
            A Life Cycle Cost and Resilience Analysis of Backup Power Solutions for Southland Farms
          </p>
        </header>

        {/* Content Box */}
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Discover the Financial Case for Solar + Battery Storage
            </h2>
            <p className="text-lg text-neutral-700 mb-4">
              This comprehensive report analyzes the economics of transitioning from diesel backup generators to solar + battery systems for Southland farms.
            </p>
            <p className="text-neutral-600 mb-4">
              Download the full report to learn:
            </p>
            <ul className="space-y-2 text-neutral-700 mb-6">
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span>20-year net present value analysis for different farm types</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span>Risk mitigation benefits: Generator failure, fuel supply, energy price hedging</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span>System sizing and financing options for your farm</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span>Scenario analysis across different inflation rates</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <span>Environmental and resilience benefits</span>
              </li>
            </ul>
          </div>

          {/* Lead Capture Form */}
          {!submitted ? (
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                Download the Report
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    placeholder="your@email.com"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="farmType" className="block text-sm font-semibold text-neutral-900 mb-2">
                      Farm Type
                    </label>
                    <select
                      id="farmType"
                      name="farmType"
                      value={formData.farmType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                    >
                      <option value="dairy">Dairy</option>
                      <option value="sheepBeef">Sheep/Beef</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="region" className="block text-sm font-semibold text-neutral-900 mb-2">
                      Region
                    </label>
                    <select
                      id="region"
                      name="region"
                      value={formData.region}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
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
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {loading ? 'Processing...' : 'Download Report (PDF)'}
                </button>

                <p className="text-sm text-neutral-600 text-center mt-4">
                  We'll send you the full report instantly. Your details help us connect you with certified solar installers.
                </p>
              </form>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">✓</div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">
                Report Downloaded!
              </h3>
              <p className="text-neutral-700">
                The PDF should download shortly. Check your inbox for details about next steps.
              </p>
            </div>
          )}
        </div>

        {/* CTA to Calculator */}
        <div className="text-center">
          <p className="text-neutral-700 mb-4">
            Want to run your own calculations?
          </p>
          <a
            href="https://farmcalc.electrifysouthland.nz"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Try the Interactive Calculator
          </a>
        </div>
      </div>
    </div>
  )
}
