# Powering Forwards Report Landing Page

Lead capture and PDF download page for the Powering Forwards farm energy analysis report.

**Live at:** https://poweringforwards.electrifysouthland.nz

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```
RESEND_API_KEY=your_resend_api_key
```

3. Place PDF at `public/powering-forwards-report.pdf`

4. Run locally:
```bash
npm run dev
```

## Deployment

Deploy to Vercel:
```bash
vercel deploy --prod
```

## Features

- Lead capture form (name, email, farm type, region)
- Automatic email confirmations
- PDF download trigger
- Link to interactive calculator
- Responsive design with green theme

## Environment Variables

- `RESEND_API_KEY` - Resend email API key for sending confirmations
