import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — TAPAS Yoga Therapy',
  description: 'Privacy Policy and data protection guidelines for TAPAS Online Yoga Classes, Naturopathy, Detox, and Varanasi Wellness Center.',
};

export default function PrivacyPage() {
  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '80vh', padding: '8rem 2rem 4rem', color: 'var(--text-secondary)' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '3rem' }} className="glass-card">
        <h1 style={{ fontFamily: 'var(--font-header)', color: 'var(--text-primary)', fontSize: '2.8rem', marginBottom: '1rem', fontWeight: 800 }}>Privacy Policy</h1>
        <p style={{ color: 'var(--cyan)', fontWeight: 700, marginBottom: '2.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Last updated: June 14, 2026</p>
        
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1.02rem' }}>
          At **TAPAS Yoga Therapy & Wellness Center** ("TAPAS Yoga", "we", "our", or "us"), we prioritize the privacy and confidentiality of our students and website visitors. We are committed to protecting all personal and medical/health information you share with us. This Privacy Policy details how we collect, store, utilize, and protect your information.
        </p>

        <hr style={{ border: 0, borderTop: '1px solid var(--border-subtle)', margin: '2rem 0' }} />

        {/* 1. Information We Collect */}
        <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.4rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          1. Information We Collect
        </h3>
        <p style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          To provide custom therapeutic programs, online classes, and Ayurvedic consultations, we collect information through lead forms, trial reservation widgets, and workshop registration panels. This data includes:
        </p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Personal Identity & Contact Details:</strong> Full Name, Email Address, and WhatsApp phone number.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Health & Fitness Details:</strong> Primary health focus (e.g., back pain, sciatica, thyroid, diabetes, stress), physical symptoms, preferred batch times, and any specific wellness comments.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            <strong>Technical Data:</strong> Standard server log details, cookies, and IP addresses to optimize website rendering.
          </li>
        </ul>

        {/* 2. How We Use Your Data */}
        <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.4rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          2. How We Use Your Information
        </h3>
        <p style={{ marginBottom: '0.75rem', lineHeight: '1.8' }}>
          We use the information we collect strictly to manage your student lifecycle and optimize your therapy programs:
        </p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
          <li style={{ marginBottom: '0.5rem' }}>
            To verify and confirm your free trial class slots or consult schedules.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            To allow our certified Yogacharyas to customize clinical yoga therapy postures, breathing sets, and detox guides to your health needs.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            To send live Zoom/cohort links and updates directly to your WhatsApp number.
          </li>
          <li style={{ marginBottom: '0.5rem' }}>
            To contact you for custom wellness assessments or query resolutions.
          </li>
        </ul>

        {/* 3. Third-Party Sharing Restriction */}
        <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.4rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          3. Absolute Protection Against Third-Party Sharing
        </h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', color: 'var(--text-primary)' }}>
          <strong>No Data Sales:</strong> Your medical details and contact records are confidential. **We do NOT sell, lease, trade, rent, or share** your contact information or personal health data with third-party advertisers, insurance providers, or marketing networks. All medical profiles are strictly accessed by authorized instructors and treating therapists directly within TAPAS Yoga.
        </p>

        {/* 4. Data Security */}
        <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.4rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          4. Security of Your Data
        </h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
          We utilize secure, password-protected databases (via Supabase) and SSL data encryption to safeguard your submissions. However, while we take all reasonable precautions to secure your data, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>

        {/* 5. User Rights & Data Deletion */}
        <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.4rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          5. Accessing, Correcting, or Deleting Your Data
        </h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
          You have the right to request a copy of the personal data we store about you, update any details, or request total deletion of your lead/booking records. To do so, please contact our administrative desk via WhatsApp at **+91 63945 54685** or email us at **info@tapasyoga.com**.
        </p>

        {/* 6. Cookie Policy */}
        <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.4rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          6. Cookies and Browser Data
        </h3>
        <p style={{ marginBottom: '2.5rem', lineHeight: '1.8' }}>
          We use simple functional cookies to persist your form preferences (such as remembering if you dismissed the promo alert banner or closed the trial modal) to prevent repetitive popups. You can choose to disable cookies in your browser settings, though some functional parts of the site may cease to render.
        </p>

        <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-primary">Accept & Return Home</Link>
          <Link href="/terms" className="btn-secondary">View Terms of Service</Link>
        </div>
      </div>
    </div>
  );
}
