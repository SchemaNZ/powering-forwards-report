import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, farmType, region } = await request.json()

    // Validate input
    if (!name || !email) {
      return Response.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

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
        <p>Want to discuss your specific situation? We can connect you with certified solar installers in Southland.</p>
        <p>Best regards,<br>Electrify Southland</p>
      `,
    })

    // Send lead notification to Nathan
    await resend.emails.send({
      from: 'Powering Forwards <reports@electrifysouthland.nz>',
      to: 'nathan@schema.nz',
      subject: `New Lead: ${name} (${farmType} farm, ${region})`,
      html: `
        <h2>New Report Download</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Farm Type:</strong> ${farmType}</p>
        <p><strong>Region:</strong> ${region}</p>
        <p><a href="https://farmcalc.electrifysouthland.nz">Follow up in the calculator</a></p>
      `,
    })

    return Response.json(
      { success: true, message: 'Lead captured successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error handling lead:', error)
    return Response.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
