import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — TAPAS Yoga Therapy',
  description: 'Terms of Service and legal compliance guidelines for TAPAS Online Yoga Classes, Naturopathy, Detox, and Varanasi Wellness Center.',
};

export default function TermsPage() {
  return (
    <div style={{ background: 'var(--bg-deep)', minHeight: '80vh', padding: '8rem 2rem 4rem', color: 'var(--text-secondary)' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '3rem' }} className="glass-card">
        <h1 style={{ fontFamily: 'var(--font-header)', color: 'var(--text-primary)', fontSize: '2.8rem', marginBottom: '1rem', fontWeight: 800 }}>Terms of Service</h1>
        <p style={{ color: 'var(--cyan)', fontWeight: 700, marginBottom: '2.5rem', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>Last updated: June 14, 2026</p>
        
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1.02rem' }}>
          Welcome to **TAPAS Yoga Therapy & Wellness Center** (referred to as "TAPAS Yoga", "we", "our", or "us"). By accessing our website, booking free trial classes, using our wellness diagnostics, participating in online interactive cohorts, or attending sessions at our Varanasi physical center, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.
        </p>

        <hr style={{ border: 0, borderTop: '1px solid var(--border-subtle)', margin: '2rem 0' }} />

        {/* 1. Medical Disclaimer & Liability Waiver */}
        <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.4rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          1. Medical Disclaimer & Liability Waiver (Important)
        </h3>
        <p style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
          <strong>No Medical Advice:</strong> TAPAS Yoga provides clinical yoga therapy, traditional Ayurvedic Panchakarma, Naturopathy, and wellness consults as complementary, drugless health recovery programs. Our programs, online diagnostics, diet templates, and metabolic guides do NOT constitute medical advice, diagnosis, treatment, or surgery.
        </p>
        <p style={{ marginBottom: '1rem', lineHeight: '1.8' }}>
          <strong>Doctor Consultation Required:</strong> We strongly advise all students and clients to consult their primary care physician before beginning any physical exercise, breathing sequences (Pranayama), detox regimes, or yoga therapy programs—especially if they have chronic back pain, herniated discs, PCOD, diabetes, hypertension, high blood pressure, or are pregnant.
        </p>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
          <strong>Voluntary Participation & Waiver of Liability:</strong> You acknowledge that all physical exercises and therapies involve inherent risks. By using our services, you voluntarily assume all risk of injury, strain, or physical complication. Under no circumstances shall TAPAS Yoga, its certified Yogacharyas, instructors, or therapists be held liable for injuries, damage, or health complications resulting from your practice or participation in in-person or online sessions.
        </p>

        {/* 2. Registrations & Booking Slots */}
        <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.4rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          2. Registrations, Leads, and Free Trial Slots
        </h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
          To request free trials, consults, or access members-only content, you agree to provide true, accurate, and current contact details (name, WhatsApp number, email, and health parameters). 
          Free trial slots are strictly limited and distributed based on slot availability. Submission of a request does not guarantee a slot booking until confirmed manually by our team via WhatsApp/call.
        </p>

        {/* 3. Fees, Payments & Cancellation Policies */}
        <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.4rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          3. Membership Fees, Refunds & Rescheduling
        </h3>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
          <li style={{ marginBottom: '0.75rem' }}>
            <strong>No Refund Policy:</strong> All subscription payments, package purchases, Panchakarma therapy fees, and workshop bookings are non-refundable. We advise students to attend their free trial session and check the schedule before purchasing memberships.
          </li>
          <li style={{ marginBottom: '0.75rem' }}>
            <strong>Session Rescheduling:</strong> Standard private classes or assessment bookings must be rescheduled at least 12 hours in advance. Failure to attend or notify late cancellation will result in that session being marked as completed without refund or credit.
          </li>
          <li style={{ marginBottom: '0.75rem' }}>
            <strong>Membership Freezes:</strong> Monthly memberships cannot be frozen. Multi-month therapeutic packages (3-month or 6-month plans) can be frozen for up to 14 days by submitting a request in writing with supporting medical proof.
          </li>
        </ul>

        {/* 4. Studio Code of Conduct */}
        <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.4rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          4. Studio & Interactive Class Code of Conduct
        </h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
          We maintain a clean, peaceful, and respectful environment for healing. 
          For **in-person Varanasi sessions** (Paharia center) and **online live cohorts**, students must treat instructors and fellow practitioners with respect. We reserve the right to terminate access or cancel memberships without refund for any student displaying disruptive, inappropriate, or disrespectful behavior.
        </p>

        {/* 5. Intellectual Property Rights */}
        <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.4rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          5. Proprietary Content & Intellectual Property
        </h3>
        <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
          All site designs, custom CMS databases, logos, wellness tools source code, exercise blueprints, and class recordings are the exclusive intellectual property of TAPAS Yoga. No part of our digital products, therapy guides, or live streams may be recorded, copied, resold, or redistributed without explicit written permission from our center's administration.
        </p>

        {/* 6. Governing Law & Dispute Resolution */}
        <h3 style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-header)', fontSize: '1.4rem', fontWeight: 700, marginTop: '2rem', marginBottom: '1rem' }}>
          6. Governing Law & Jurisdictional Protection
        </h3>
        <p style={{ marginBottom: '2.5rem', lineHeight: '1.8' }}>
          These terms are governed by and construed in accordance with the laws of India. Any legal disputes, claims, or actions arising from our digital services or physical therapies shall be subject to the exclusive jurisdiction of the competent courts of **Varanasi, Uttar Pradesh, India**.
        </p>

        <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-primary">Accept & Return Home</Link>
          <Link href="/privacy" className="btn-secondary">View Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
