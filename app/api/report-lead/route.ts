import { Resend } from 'resend'
import { reportLeadSchema } from '@/lib/schemas'

export async function POST(request: Request) {
  try {
    // Basic Rate Limiting (Optional: integrate with Upstash Redis for production)
    // const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Instantiate Resend at runtime, not build time
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    const body = await request.json()
    
    // Validate input
    const validation = reportLeadSchema.safeParse(body)
    if (!validation.success) {
      return Response.json(
        { error: 'Invalid input', details: validation.error.issues },
        { status: 400 }
      )
    }
    
    const { name, email, phone, farmType, region, timeline } = validation.data

    // Format timeline for display
    const timelineMap: Record<string, string> = {
      'next-month': 'Next Month',
      'next-3-months': 'Next 3 Months',
      'next-6-months': 'Next 6 Months',
      'next-year': 'Next Year',
      'interested': 'Just Interested in the Report',
    }
    const timelineDisplay = timelineMap[timeline as string] || (timeline as string)

    // Send confirmation email to user
    await resend.emails.send({
      from: 'Powering Forwards <reports@electrifysouthland.nz>',
      to: email,
      subject: 'Your Powering Forwards Report - Farm Energy Analysis',
      html: `
        <h2>Thank you for downloading the Powering Forwards Report</h2>
        <p>Hi ${name},</p>
        <p>Your PDF report is attached. This comprehensive analysis covers the financial and strategic case for solar + battery storage on ${farmType} farms in the ${region} region.</p>
        <h3>What's next?</h3>
        <p><a href="https://farmcalc.electrifysouthland.nz">Try the interactive calculator</a> to see results for your specific farm:</p>
        <ul>
          <li>Annual electricity bill</li>
          <li>Target solar offset percentage</li>
          <li>Financing options</li>
        </ul>
        <p>Based on your interest timeline (${timelineDisplay}), we can discuss the best next steps for your situation. We can connect you with certified solar installers and financing partners in Southland.</p>
        <p>Best regards,<br>Electrify Southland</p>
      `,
    })

    // Send lead notification to Nathan
    await resend.emails.send({
      from: 'Powering Forwards <reports@electrifysouthland.nz>',
      to: 'nathan+pfrd@schema.nz',
      subject: `New Lead: ${name} (${farmType} farm, ${region})`,
      html: `
        <h2>New Report Download Lead</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Farm Type:</strong> ${farmType}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><strong>Installation Timeline:</strong> ${timelineDisplay}</p>
        <hr />
        <p><a href="https://farmcalc.electrifysouthland.nz">Follow up in the calculator</a></p>
      `,
    })

    return Response.json(
      { success: true, message: 'Lead captured successfully' },
      { status: 200 }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    
    console.error('[REPORT_LEAD_ERROR]', {
      timestamp: new Date().toISOString(),
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    })
    
    return Response.json(
      { error: 'Failed to process request. Please try again later.' },
      { status: 500 }
    )
  }
}
