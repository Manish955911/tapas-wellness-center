'use client';

import { useState, useEffect } from 'react';
import { 
  Lock, Unlock, LogOut, Phone, MessageCircle, Download, Trash2, 
  CheckCircle, User, Mail, Calendar, RefreshCw, Eye, Tag, AlertCircle, Sparkles, Image as ImageIcon, Star
} from 'lucide-react';
import styles from './page.module.css';

const getSeoHealthReport = (offer) => {
  let score = 100;
  const checks = [];

  // 1. Title length
  const title = offer.seo_title || '';
  if (!title) {
    score -= 30;
    checks.push({ text: 'Meta Title is missing', status: 'fail', desc: 'Google needs a title to display in search results.' });
  } else if (title.length < 30 || title.length > 65) {
    score -= 10;
    checks.push({ text: `Meta Title is suboptimal (${title.length} chars)`, status: 'warn', desc: 'Ideal title length is between 30 and 65 characters to prevent truncation.' });
  } else {
    checks.push({ text: 'Meta Title length is optimized', status: 'pass', desc: 'Title length is perfect for Google ranking!' });
  }

  // 2. Description length
  const desc = offer.seo_description || '';
  if (!desc) {
    score -= 30;
    checks.push({ text: 'Meta Description is missing', status: 'fail', desc: 'Meta description tells searchers what your page is about.' });
  } else if (desc.length < 100 || desc.length > 170) {
    score -= 10;
    checks.push({ text: `Meta Description is suboptimal (${desc.length} chars)`, status: 'warn', desc: 'Ideal description length is between 100 and 170 characters.' });
  } else {
    checks.push({ text: 'Meta Description length is optimized', status: 'pass', desc: 'Description length is ideal for search snippets.' });
  }

  // 3. Keywords
  const kws = offer.seo_keywords || '';
  if (!kws) {
    score -= 10;
    checks.push({ text: 'Meta Keywords are missing', status: 'warn', desc: 'Add keywords like "yoga classes, back pain yoga Varanasi" to help search engines categorize.' });
  } else {
    const count = kws.split(',').length;
    if (count < 4) {
      score -= 5;
      checks.push({ text: 'Add more keywords', status: 'warn', desc: 'We recommend adding at least 4-8 comma-separated keywords.' });
    } else {
      checks.push({ text: 'Meta Keywords loaded', status: 'pass', desc: `${count} target keywords defined.` });
    }
  }

  // 4. Google Search Console
  const verify = offer.seo_google_verification || '';
  if (!verify) {
    score -= 10;
    checks.push({ text: 'Google Search Console key is missing', status: 'warn', desc: 'Verify ownership on Google Search Console to monitor keyword rankings.' });
  } else {
    checks.push({ text: 'Google Search Console verified', status: 'pass', desc: 'Verification tag is active.' });
  }

  // 5. Sitemap & Robots & Schema
  checks.push({ text: 'Dynamic sitemap.xml is active', status: 'pass', desc: 'XML sitemap is automatically served at /sitemap.xml.' });
  checks.push({ text: 'Robots.txt is active', status: 'pass', desc: 'Crawl configuration served at /robots.txt.' });
  checks.push({ text: 'Schema.org JSON-LD Structured Data active', status: 'pass', desc: 'YogaStudio rich schema is automatically injected globally.' });

  return { score: Math.max(0, score), checks };
};

export default function AdminLeadsPage() {
  const [passcode, setPasscode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authError, setAuthError] = useState('');
  const [leads, setLeads] = useState({
    trial_bookings: [],
    contact_submissions: [],
    class_registrations: [],
    newsletter_subscribers: []
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('trial_bookings');
  const [updatingId, setUpdatingId] = useState(null);

  // Manual Newsletter states
  const [newSubscriberEmail, setNewSubscriberEmail] = useState('');
  const [addingSubscriber, setAddingSubscriber] = useState(false);

  // CMS state variables
  const [galleryItems, setGalleryItems] = useState([]);
  const [testimonialsItems, setTestimonialsItems] = useState([]);
  const [activeOffer, setActiveOffer] = useState({
    banner_text: '',
    button_text: '',
    button_link: '',
    is_active: false,
    whatsapp_phone: '916394554685',
    facebook_link: 'https://facebook.com/tapasyogavaranasi',
    instagram_link: 'https://instagram.com/tapasyogavaranasi',
    youtube_link: 'https://youtube.com/@tapasyogavaranasi',
    contact_email: 'contact@tapasyoga.in',
    seo_title: 'TAPAS Yoga — Clinical Yoga Therapy & Online Classes | Varanasi',
    seo_description: 'TAPAS Online Yoga Classes offers traditional Patanjali-based yoga therapy for diabetes, back pain, thyroid, PCOD, and stress. Join live classes from Varanasi\'s premier wellness center.',
    seo_keywords: 'yoga therapy, online yoga classes, Varanasi yoga, diabetes yoga, back pain yoga, PCOD yoga, clinical yoga, Patanjali yoga',
    seo_google_verification: ''
  });

  const [newGallery, setNewGallery] = useState({ title: '', desc: '', img: '', tag: 'varanasi', tagLabel: 'Varanasi Center' });
  const [gallerySaving, setGallerySaving] = useState(false);

  const [newTestimonial, setNewTestimonial] = useState({ name: '', tag: 'all', program: '', since: '2025', text: '', rating: 5 });
  const [testimonialSaving, setTestimonialSaving] = useState(false);

  const [offerSaving, setOfferSaving] = useState(false);

  // Blog CMS states
  const [blogPosts, setBlogPosts] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', category: 'Yoga Therapy', img: '', excerpt: '', content: '' });
  const [blogSaving, setBlogSaving] = useState(false);

  // Auto-login if passcode is stored in sessionStorage
  useEffect(() => {
    const storedPass = sessionStorage.getItem('tapas_admin_key');
    if (storedPass) {
      verifyAndLoad(storedPass);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    verifyAndLoad(passcode);
  };

  const fetchCmsData = async (key = passcode) => {
    try {
      // 1. Fetch gallery
      const galleryRes = await fetch('/api/gallery');
      const galleryResult = await galleryRes.json();
      if (galleryRes.ok && galleryResult.success) {
        setGalleryItems(galleryResult.data);
      }

      // 2. Fetch testimonials
      const testRes = await fetch('/api/testimonials');
      const testResult = await testRes.json();
      if (testRes.ok && testResult.success) {
        setTestimonialsItems(testResult.data);
      }

      // 3. Fetch active offer
      const offerRes = await fetch('/api/offers');
      const offerResult = await offerRes.json();
      if (offerRes.ok && offerResult.success) {
        setActiveOffer(offerResult.data || {
          banner_text: '',
          button_text: '',
          button_link: '',
          is_active: false,
          whatsapp_phone: '916394554685',
          facebook_link: 'https://facebook.com/tapasyogavaranasi',
          instagram_link: 'https://instagram.com/tapasyogavaranasi',
          youtube_link: 'https://youtube.com/@tapasyogavaranasi',
          contact_email: 'contact@tapasyoga.in'
        });
      }

      // 4. Fetch blogs
      const blogRes = await fetch('/api/blog');
      const blogResult = await blogRes.json();
      if (blogRes.ok && blogResult.success) {
        setBlogPosts(blogResult.data);
      }
    } catch (err) {
      console.error('Error fetching CMS details:', err);
    }
  };

  const verifyAndLoad = async (keyToVerify) => {
    setLoading(true);
    setAuthError('');
    try {
      const res = await fetch(`/api/leads?key=${keyToVerify}`);
      const result = await res.json();

      if (res.ok && result.success) {
        setIsAuthorized(true);
        setLeads(result.data);
        sessionStorage.setItem('tapas_admin_key', keyToVerify);
        setPasscode(keyToVerify);
        // Load additional CMS data
        fetchCmsData(keyToVerify);
      } else {
        setAuthError(result.error || 'Invalid passcode. Please try again.');
        setIsAuthorized(false);
        sessionStorage.removeItem('tapas_admin_key');
      }
    } catch (err) {
      setAuthError('Failed to verify. Server might be offline.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('tapas_admin_key');
    setIsAuthorized(false);
    setPasscode('');
    setLeads({
      trial_bookings: [],
      contact_submissions: [],
      class_registrations: [],
      newsletter_subscribers: []
    });
    setGalleryItems([]);
    setTestimonialsItems([]);
  };

  const handleStatusChange = async (type, id, newStatus) => {
    setUpdatingId(id);
    const key = sessionStorage.getItem('tapas_admin_key');
    try {
      const res = await fetch('/api/leads', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': key
        },
        body: JSON.stringify({ type, id, status: newStatus })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        // Update local state
        setLeads(prev => {
          const list = prev[type] || [];
          const updatedList = list.map(item => item.id == id ? { ...item, status: newStatus } : item);
          return { ...prev, [type]: updatedList };
        });
      } else {
        alert(result.error || 'Failed to update status.');
      }
    } catch (err) {
      alert('An error occurred during updating status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure you want to delete this lead? This cannot be undone.')) return;
    
    const key = sessionStorage.getItem('tapas_admin_key');
    try {
      const res = await fetch(`/api/leads?type=${type}&id=${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-key': key
        }
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setLeads(prev => {
          const list = prev[type] || [];
          return { ...prev, [type]: list.filter(item => item.id != id) };
        });
      } else {
        alert(result.error || 'Failed to delete lead.');
      }
    } catch (err) {
      alert('An error occurred during deletion.');
    }
  };

  // Manual Newsletter subscription
  const handleAddSubscriber = async (e) => {
    e.preventDefault();
    if (!newSubscriberEmail) return;
    setAddingSubscriber(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newSubscriberEmail })
      });
      const result = await res.json();
      if (res.ok && result.success) {
        // Append to the list in React state
        setLeads(prev => {
          const subscribers = prev.newsletter_subscribers || [];
          // Avoid duplicates in local UI list if it's already there
          if (subscribers.some(sub => sub.email.toLowerCase() === newSubscriberEmail.toLowerCase())) {
            return prev;
          }
          const newSub = {
            id: result.id || Math.floor(Math.random() * 1000000) + '',
            email: newSubscriberEmail,
            is_active: true,
            created_at: new Date().toISOString()
          };
          return {
            ...prev,
            newsletter_subscribers: [newSub, ...subscribers]
          };
        });
        setNewSubscriberEmail('');
        alert(result.message || 'Subscriber successfully registered!');
      } else {
        alert(result.error || 'Failed to add subscriber.');
      }
    } catch (err) {
      alert('An error occurred while adding subscriber.');
    } finally {
      setAddingSubscriber(false);
    }
  };

  // CMS Gallery Methods
  const handleAddGallery = async (e) => {
    e.preventDefault();
    if (!newGallery.title || !newGallery.img) return;
    setGallerySaving(true);
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': passcode },
        body: JSON.stringify(newGallery)
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setGalleryItems(prev => [result.data, ...prev]);
        setNewGallery({ title: '', desc: '', img: '', tag: 'varanasi', tagLabel: 'Varanasi Center' });
        alert('Image successfully added to gallery!');
      } else {
        alert(result.error || 'Failed to add gallery item.');
      }
    } catch (err) {
      alert('Network error adding gallery item.');
    } finally {
      setGallerySaving(false);
    }
  };

  const handleDeleteGallery = async (id) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;
    try {
      const res = await fetch(`/api/gallery?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': passcode }
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setGalleryItems(prev => prev.filter(item => item.id != id));
      } else {
        alert(result.error || 'Failed to delete gallery item.');
      }
    } catch (err) {
      alert('Network error deleting gallery item.');
    }
  };

  // CMS Testimonial Methods
  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.text || !newTestimonial.program) return;
    setTestimonialSaving(true);
    try {
      const res = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': passcode },
        body: JSON.stringify(newTestimonial)
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setTestimonialsItems(prev => [result.data, ...prev]);
        setNewTestimonial({ name: '', tag: 'all', program: '', since: '2025', text: '', rating: 5 });
        alert('Student review successfully added!');
      } else {
        alert(result.error || 'Failed to add review.');
      }
    } catch (err) {
      alert('Network error adding review.');
    } finally {
      setTestimonialSaving(false);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!confirm('Are you sure you want to delete this student review?')) return;
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': passcode }
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setTestimonialsItems(prev => prev.filter(item => item.id != id));
      } else {
        alert(result.error || 'Failed to delete review.');
      }
    } catch (err) {
      alert('Network error deleting review.');
    }
  };

  // CMS Blog Methods
  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.author || !newBlog.content) return;
    setBlogSaving(true);
    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': passcode },
        body: JSON.stringify(newBlog)
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setBlogPosts(prev => [result.data, ...prev]);
        setNewBlog({ title: '', author: '', category: 'Yoga Therapy', img: '', excerpt: '', content: '' });
        alert('Blog post successfully published!');
      } else {
        alert(result.error || 'Failed to publish blog post.');
      }
    } catch (err) {
      alert('Network error publishing blog post.');
    } finally {
      setBlogSaving(false);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      const res = await fetch(`/api/blog?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': passcode }
      });
      const result = await res.json();
      if (res.ok && result.success) {
        setBlogPosts(prev => prev.filter(item => item.id != id));
      } else {
        alert(result.error || 'Failed to delete blog post.');
      }
    } catch (err) {
      alert('Network error deleting blog post.');
    }
  };

  // CMS Offer Methods
  const handleUpdateOffer = async (e) => {
    e.preventDefault();
    setOfferSaving(true);
    try {
      const res = await fetch('/api/offers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': passcode },
        body: JSON.stringify(activeOffer)
      });
      const result = await res.json();
      if (res.ok && result.success) {
        alert('Site-wide promotional offer successfully updated!');
      } else {
        alert(result.error || 'Failed to update offer banner.');
      }
    } catch (err) {
      alert('Network error updating offer banner.');
    } finally {
      setOfferSaving(false);
    }
  };

  const exportToCSV = (type) => {
    const list = leads[type] || [];
    if (list.length === 0) {
      alert('No data available to export.');
      return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Generate headers
    const headers = Object.keys(list[0]).filter(k => k !== 'id');
    csvContent += headers.join(",") + "\n";

    // Generate rows
    list.forEach(item => {
      const row = headers.map(header => {
        let val = item[header] === undefined || item[header] === null ? '' : String(item[header]);
        // Escape quotes
        val = val.replace(/"/g, '""');
        // Wrap in quotes if contains comma
        if (val.includes(',') || val.includes('\n') || val.includes('"')) {
          val = `"${val}"`;
        }
        return val;
      });
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tapas_yoga_leads_${type}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Format date cleanly
  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthorized) {
    return (
      <div className={styles.loginContainer}>
        <div className="glass-card" style={{ maxWidth: '420px', width: '100%', padding: '2.5rem' }}>
          <div className={styles.loginHeader}>
            <div className={styles.lockIconBox}>
              <Lock size={28} />
            </div>
            <h2>Admin Leads Panel</h2>
            <p>Enter the master security passcode to access the Tapas Yoga lead management dashboard.</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="passcode" style={{ display: 'block', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Security Passcode</label>
              <input
                id="passcode"
                type="password"
                className="form-control"
                placeholder="••••••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                style={{ textAlign: 'center', fontSize: '1.2rem', letterSpacing: '2px' }}
                required
              />
            </div>
            {authError && (
              <div className={styles.errorAlert}>
                <AlertCircle size={16} /> <span>{authError}</span>
              </div>
            )}
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Verifying...' : 'Authorize Access'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate quick metrics
  const totalLeads = leads.trial_bookings.length + leads.contact_submissions.length + leads.class_registrations.length;
  const newLeads = 
    leads.trial_bookings.filter(l => l.status === 'new').length + 
    leads.contact_submissions.filter(l => l.status === 'new').length + 
    leads.class_registrations.filter(l => l.status === 'new').length;

  const isCmsTab = ['cms_gallery', 'cms_testimonials', 'cms_offers', 'cms_blog'].includes(activeTab);

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashHeader}>
        <div>
          <span className="section-badge"><Unlock size={12} /> Authorized Session</span>
          <h1>Leads & CMS Management</h1>
          <p>Real-time analytics, lead tracking, and website content manager panels.</p>
        </div>
        <div className={styles.headerActions}>
          <button onClick={() => { verifyAndLoad(passcode); fetchCmsData(); }} className="btn-secondary" disabled={loading}>
            <RefreshCw size={14} className={loading ? styles.spin : ''} /> Refresh
          </button>
          <button onClick={handleLogout} className="btn-secondary" style={{ borderColor: 'var(--rose)', color: 'var(--rose)' }}>
            <LogOut size={14} /> Disconnect
          </button>
        </div>
      </header>

      {/* Analytics Stats */}
      <section className={styles.metricsGrid}>
        <div className="glass-card" style={{ borderLeft: '4px solid var(--violet)' }}>
          <span className={styles.metricLabel}>Total Inquiries</span>
          <h3>{totalLeads}</h3>
          <p style={{ color: 'var(--text-muted)' }}>Accumulated across forms</p>
        </div>
        <div className="glass-card" style={{ borderLeft: '4px solid var(--amber)' }}>
          <span className={styles.metricLabel}>Pending Action</span>
          <h3>{newLeads}</h3>
          <p style={{ color: 'var(--amber)' }}>Needs review/reply</p>
        </div>
        <div className="glass-card" style={{ borderLeft: '4px solid var(--cyan)' }}>
          <span className={styles.metricLabel}>Gallery Items</span>
          <h3>{galleryItems.length}</h3>
          <p style={{ color: 'var(--text-muted)' }}>Dynamic photos loaded</p>
        </div>
        <div className="glass-card" style={{ borderLeft: '4px solid var(--emerald)' }}>
          <span className={styles.metricLabel}>Reviews</span>
          <h3>{testimonialsItems.length}</h3>
          <p style={{ color: 'var(--text-muted)' }}>Student reviews loaded</p>
        </div>
      </section>

      {/* Leads & CMS Main Panel */}
      <section className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div className={styles.panelHeader}>
          <div className={styles.tabsList}>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'trial_bookings' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('trial_bookings')}
            >
              Trial Bookings ({leads.trial_bookings.length})
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'contact_submissions' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('contact_submissions')}
            >
              Contact Messages ({leads.contact_submissions.length})
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'class_registrations' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('class_registrations')}
            >
              Class Signups ({leads.class_registrations.length})
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'newsletter_subscribers' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('newsletter_subscribers')}
            >
              Newsletter ({leads.newsletter_subscribers.length})
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'cms_gallery' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('cms_gallery')}
            >
              🖼️ Gallery
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'cms_testimonials' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('cms_testimonials')}
            >
              ⭐ Reviews
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'cms_blog' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('cms_blog')}
            >
              📝 Blogs
            </button>
            <button 
              className={`${styles.tabBtn} ${activeTab === 'cms_offers' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('cms_offers')}
            >
              📢 Promo Banner
            </button>
          </div>
          {!isCmsTab && (
            <button onClick={() => exportToCSV(activeTab)} className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <Download size={14} /> Export CSV
            </button>
          )}
        </div>

        {/* Lead Tables */}
        <div className={styles.tableContainer}>
          {activeTab === 'newsletter_subscribers' && (
            <form onSubmit={handleAddSubscriber} style={{ display: 'flex', gap: '1rem', padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Mail size={16} style={{ color: 'var(--cyan)' }} /> Manually Add Subscriber:
              </span>
              <input 
                type="email" 
                placeholder="Enter email address" 
                value={newSubscriberEmail}
                onChange={(e) => setNewSubscriberEmail(e.target.value)}
                required
                style={{ flexGrow: 1, maxWidth: '300px', padding: '0.5rem 0.75rem', borderRadius: '6px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none', fontSize: '0.88rem' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }} disabled={addingSubscriber}>
                {addingSubscriber ? 'Subscribing...' : 'Add Subscriber'}
              </button>
            </form>
          )}

          {!isCmsTab && leads[activeTab]?.length === 0 && (
            <div className={styles.emptyState}>
              <User size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
              <h4>No leads found in this category</h4>
              <p>Submissions will display here automatically in real-time once filled on the site.</p>
            </div>
          )}

          {!isCmsTab && leads[activeTab]?.length > 0 && (
            <table className={styles.leadsTable}>
              <thead>
                {activeTab === 'trial_bookings' && (
                  <tr>
                    <th>Submission Date</th>
                    <th>Name</th>
                    <th>WhatsApp/Phone</th>
                    <th>Preferred Batch</th>
                    <th>Goal / Need</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                )}
                {activeTab === 'contact_submissions' && (
                  <tr>
                    <th>Date</th>
                    <th>Sender Name</th>
                    <th>Contact Details</th>
                    <th>Subject</th>
                    <th>Message Details</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                )}
                {activeTab === 'class_registrations' && (
                  <tr>
                    <th>Date</th>
                    <th>Registrant Name</th>
                    <th>Contact Details</th>
                    <th>Requested Class</th>
                    <th>Preferred Slot</th>
                    <th>Level</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                )}
                {activeTab === 'newsletter_subscribers' && (
                  <tr>
                    <th>Date Subscribed</th>
                    <th>Subscriber Email</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                )}
              </thead>
              <tbody>
                {activeTab === 'trial_bookings' && leads.trial_bookings.map((lead) => (
                  <tr key={lead.id} className={lead.status === 'new' ? styles.newRow : ''}>
                    <td className={styles.dateCol}><Calendar size={12} /> {formatDate(lead.created_at)}</td>
                    <td><strong>{lead.name}</strong></td>
                    <td>
                      <div className={styles.contactCell}>
                        <span>{lead.phone}</span>
                        <div className={styles.quickContact}>
                          <a href={`tel:${lead.phone}`} className={styles.actionIcon} title="Call Phone"><Phone size={14} /></a>
                          <a 
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=Pranam%20${encodeURIComponent(lead.name)}!%20Thank%20you%20for%20booking%20a%20Free%20Trial%20Class%20at%20TAPAS%20Yoga%20Center.%20We%20would%20like%20to%20confirm%20your%20slot.`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`${styles.actionIcon} ${styles.whatsappColor}`} 
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle size={14} />
                          </a>
                        </div>
                      </div>
                    </td>
                    <td><span className={styles.badge} style={{ background: 'rgba(139, 92, 246, 0.08)', color: 'var(--violet)' }}>{lead.preferredBatch}</span></td>
                    <td><span className={styles.goalText}>{lead.goal}</span></td>
                    <td>
                      <select 
                        value={lead.status} 
                        onChange={(e) => handleStatusChange('trial_bookings', lead.id, e.target.value)}
                        className={`${styles.statusSelect} ${styles[lead.status]}`}
                        disabled={updatingId === lead.id}
                      >
                        <option value="new">🆕 New</option>
                        <option value="contacted">📞 Contacted</option>
                        <option value="enrolled">🧘 Enrolled</option>
                        <option value="closed">❌ Closed</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button onClick={() => handleDelete('trial_bookings', lead.id)} className={styles.deleteBtn} title="Delete Lead">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}

                {activeTab === 'contact_submissions' && leads.contact_submissions.map((lead) => (
                  <tr key={lead.id} className={lead.status === 'new' ? styles.newRow : ''}>
                    <td className={styles.dateCol}><Calendar size={12} /> {formatDate(lead.created_at)}</td>
                    <td><strong>{lead.firstName} {lead.lastName}</strong></td>
                    <td>
                      <div className={styles.contactDetails}>
                        <a href={`mailto:${lead.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--cyan)' }}><Mail size={12} /> {lead.email}</a>
                        {lead.phone && <a href={`tel:${lead.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-secondary)' }}><Phone size={12} /> {lead.phone}</a>}
                      </div>
                    </td>
                    <td><span className={styles.subjectText}>{lead.subject}</span></td>
                    <td>
                      <div className={styles.messageBox} title={lead.message}>
                        <Eye size={12} /> {lead.message}
                      </div>
                    </td>
                    <td>
                      <select 
                        value={lead.status} 
                        onChange={(e) => handleStatusChange('contact_submissions', lead.id, e.target.value)}
                        className={`${styles.statusSelect} ${styles[lead.status]}`}
                        disabled={updatingId === lead.id}
                      >
                        <option value="new">🆕 New</option>
                        <option value="contacted">📞 Contacted</option>
                        <option value="closed">❌ Closed</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button onClick={() => handleDelete('contact_submissions', lead.id)} className={styles.deleteBtn} title="Delete Inquire">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}

                {activeTab === 'class_registrations' && leads.class_registrations.map((lead) => (
                  <tr key={lead.id} className={lead.status === 'new' ? styles.newRow : ''}>
                    <td className={styles.dateCol}><Calendar size={12} /> {formatDate(lead.created_at)}</td>
                    <td><strong>{lead.firstName} {lead.lastName}</strong></td>
                    <td>
                      <div className={styles.contactDetails}>
                        <a href={`mailto:${lead.email}`} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--cyan)' }}><Mail size={12} /> {lead.email}</a>
                        <a href={`tel:${lead.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-secondary)' }}><Phone size={12} /> {lead.phone}</a>
                      </div>
                    </td>
                    <td><strong>{lead.classType}</strong></td>
                    <td><span className={styles.badge} style={{ background: 'rgba(6, 182, 212, 0.08)', color: 'var(--cyan)' }}>{lead.preferredTime || 'Any Time'}</span></td>
                    <td><span className={styles.badge} style={{ background: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b' }}>{lead.experienceLevel}</span></td>
                    <td>
                      <select 
                        value={lead.status} 
                        onChange={(e) => handleStatusChange('class_registrations', lead.id, e.target.value)}
                        className={`${styles.statusSelect} ${styles[lead.status]}`}
                        disabled={updatingId === lead.id}
                      >
                        <option value="new">🆕 New</option>
                        <option value="contacted">📞 Contacted</option>
                        <option value="enrolled">🧘 Enrolled</option>
                        <option value="closed">❌ Closed</option>
                      </select>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button onClick={() => handleDelete('class_registrations', lead.id)} className={styles.deleteBtn}>
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}

                {activeTab === 'newsletter_subscribers' && leads.newsletter_subscribers.map((lead) => (
                  <tr key={lead.id}>
                    <td className={styles.dateCol}><Calendar size={12} /> {formatDate(lead.created_at)}</td>
                    <td><a href={`mailto:${lead.email}`} style={{ color: 'var(--cyan)', fontWeight: 600 }}>{lead.email}</a></td>
                    <td>
                      <span className={styles.dayStatus} style={{ background: lead.is_active ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)', color: lead.is_active ? 'var(--emerald)' : 'var(--rose)' }}>
                        {lead.is_active ? 'Active' : 'Unsubscribed'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button onClick={() => handleDelete('newsletter_subscribers', lead.id)} className={styles.deleteBtn}>
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* CMS Gallery Manager */}
        {activeTab === 'cms_gallery' && (
          <div style={{ padding: '2.5rem 2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
              <form onSubmit={handleAddGallery} className="glass-card" style={{ padding: '2rem', alignSelf: 'start', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ color: 'var(--cyan)', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-header)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ImageIcon size={18} /> Add Photo to Gallery
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Image URL</label>
                    <input 
                      type="text" 
                      placeholder="e.g. /images/slide1.png or Unsplash link" 
                      value={newGallery.img} 
                      onChange={(e) => setNewGallery(prev => ({ ...prev, img: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Photo Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Spine Decompression Focus" 
                      value={newGallery.title} 
                      onChange={(e) => setNewGallery(prev => ({ ...prev, title: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Short Description</label>
                    <textarea 
                      placeholder="e.g. Clinical sequences addressing spinal sciatica." 
                      value={newGallery.desc} 
                      onChange={(e) => setNewGallery(prev => ({ ...prev, desc: e.target.value }))}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', height: '70px', outline: 'none', resize: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Category Tag</label>
                      <select 
                        value={newGallery.tag}
                        onChange={(e) => setNewGallery(prev => ({ ...prev, tag: e.target.value, tagLabel: e.target.value === 'varanasi' ? 'Varanasi Center' : 'Global Practice' }))}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                      >
                        <option value="varanasi">Varanasi Center</option>
                        <option value="global">Global Practice</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Display Text</label>
                      <input 
                        type="text" 
                        value={newGallery.tagLabel} 
                        onChange={(e) => setNewGallery(prev => ({ ...prev, tagLabel: e.target.value }))}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} disabled={gallerySaving}>
                    {gallerySaving ? 'Saving to Database...' : 'Add to Gallery'}
                  </button>
                </div>
              </form>

              <div>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-header)', fontSize: '1.25rem' }}>Dynamic Gallery Items</h4>
                {galleryItems.length === 0 ? (
                  <div className="glass-card" style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <AlertCircle size={32} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
                    <p style={{ fontSize: '0.9rem' }}>No dynamic items found in database. The website is currently showing default hardcoded photos.</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.25rem' }}>
                    {galleryItems.map((item) => (
                      <div key={item.id} className="glass-card" style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ position: 'relative', width: '100%', height: '110px', borderRadius: '6px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                          <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={item.title}>{item.title}</strong>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '1rem', display: 'block' }}>{item.tagLabel}</span>
                        <button 
                          onClick={() => handleDeleteGallery(item.id)} 
                          className={styles.deleteBtn}
                          style={{ border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.4rem', fontSize: '0.75rem', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.25rem', marginTop: 'auto' }}
                        >
                          <Trash2 size={12} /> Delete Photo
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CMS Testimonials Manager */}
        {activeTab === 'cms_testimonials' && (
          <div style={{ padding: '2.5rem 2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
              <form onSubmit={handleAddTestimonial} className="glass-card" style={{ padding: '2rem', alignSelf: 'start', border: '1px solid var(--border-subtle)' }}>
                <h4 style={{ color: 'var(--cyan)', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-header)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Star size={18} /> Add Student Review
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Student Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sharma Ji" 
                      value={newTestimonial.name} 
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, name: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Program Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Back Pain Spine Health" 
                      value={newTestimonial.program} 
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, program: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Student Since</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 2023" 
                        value={newTestimonial.since} 
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, since: e.target.value }))}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Rating</label>
                      <select 
                        value={newTestimonial.rating}
                        onChange={(e) => setNewTestimonial(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                      >
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Page Filter Tag</label>
                    <select 
                      value={newTestimonial.tag}
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, tag: e.target.value }))}
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                    >
                      <option value="all">General Practice (All)</option>
                      <option value="diabetes">Diabetes Therapy</option>
                      <option value="backpain">Back Pain Spine Therapy</option>
                      <option value="vinyasa">Vinyasa Flow</option>
                      <option value="meditation">Meditation</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Student Review Text</label>
                    <textarea 
                      placeholder="My chronic spine pain completely healed within 3 months of regular practice..." 
                      value={newTestimonial.text} 
                      onChange={(e) => setNewTestimonial(prev => ({ ...prev, text: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', height: '80px', outline: 'none', resize: 'none' }}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} disabled={testimonialSaving}>
                    {testimonialSaving ? 'Saving to Database...' : 'Add Review'}
                  </button>
                </div>
              </form>

              <div>
                <h4 style={{ color: 'var(--text-primary)', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-header)', fontSize: '1.25rem' }}>Dynamic Reviews</h4>
                {testimonialsItems.length === 0 ? (
                  <div className="glass-card" style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <AlertCircle size={32} style={{ margin: '0 auto 0.75rem', opacity: 0.5 }} />
                    <p style={{ fontSize: '0.9rem' }}>No dynamic reviews found. The website is currently showing default hardcoded client stories.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {testimonialsItems.map((item) => (
                      <div key={item.id} className="glass-card" style={{ padding: '1.25rem', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                        <div>
                          <strong style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>{item.name}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', margin: '0.2rem 0' }}>
                            Student since {item.since} • {item.program}
                          </span>
                          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.6, marginTop: '0.5rem' }}>"{item.text}"</p>
                          <div style={{ display: 'flex', gap: '0.1rem', color: 'var(--amber)', marginTop: '0.5rem' }}>
                            {[...Array(item.rating || 5)].map((_, rIdx) => <Star key={rIdx} size={12} fill="var(--amber)" stroke="var(--amber)" />)}
                          </div>
                        </div>
                        <button 
                          onClick={() => handleDeleteTestimonial(item.id)} 
                          className={styles.deleteBtn}
                          style={{ border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.4rem', color: 'var(--rose)' }}
                          title="Delete review"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CMS Blog Manager */}
        {activeTab === 'cms_blog' && (
          <div style={{ padding: '2rem 1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
              {/* Left Column: Form */}
              <div className="glass-card" style={{ border: '1px solid var(--border-subtle)', padding: '2rem' }}>
                <h4 style={{ color: 'var(--cyan)', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-header)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Sparkles size={18} style={{ color: 'var(--amber)' }} /> Publish New Blog Post
                </h4>
                <form onSubmit={handleAddBlog}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Article Title *</label>
                      <input 
                        type="text" 
                        placeholder="e.g. 5 Poses for Shoulder Recovery" 
                        value={newBlog.title} 
                        onChange={(e) => setNewBlog(prev => ({ ...prev, title: e.target.value }))}
                        required
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                      />
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Author Name *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Dr. Priya Sharma" 
                          value={newBlog.author} 
                          onChange={(e) => setNewBlog(prev => ({ ...prev, author: e.target.value }))}
                          required
                          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Category *</label>
                        <select 
                          value={newBlog.category} 
                          onChange={(e) => setNewBlog(prev => ({ ...prev, category: e.target.value }))}
                          required
                          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                        >
                          <option value="Yoga Therapy">Yoga Therapy</option>
                          <option value="Ashtanga Yoga">Ashtanga Yoga</option>
                          <option value="Meditation">Meditation</option>
                          <option value="Health Tips">Health Tips</option>
                          <option value="Success Stories">Success Stories</option>
                          <option value="Yoga Philosophy">Yoga Philosophy</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Image URL (Optional)</label>
                      <input 
                        type="url" 
                        placeholder="https://images.unsplash.com/... or /images/..." 
                        value={newBlog.img} 
                        onChange={(e) => setNewBlog(prev => ({ ...prev, img: e.target.value }))}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Short Excerpt *</label>
                      <textarea 
                        rows="2"
                        placeholder="Brief summary of the article..."
                        value={newBlog.excerpt} 
                        onChange={(e) => setNewBlog(prev => ({ ...prev, excerpt: e.target.value }))}
                        required
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem', color: 'var(--text-secondary)' }}>Main Body Content *</label>
                      <textarea 
                        rows="6"
                        placeholder="Full body content of your post. Separate paragraphs with periods."
                        value={newBlog.content} 
                        onChange={(e) => setNewBlog(prev => ({ ...prev, content: e.target.value }))}
                        required
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '6px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical', fontFamily: 'inherit', fontSize: '0.9rem', lineHeight: '1.4' }}
                      />
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={blogSaving}>
                      {blogSaving ? 'Publishing post...' : 'Publish Article'}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Column: List */}
              <div className="glass-card" style={{ border: '1px solid var(--border-subtle)', padding: '2rem' }}>
                <h4 style={{ color: 'var(--violet)', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-header)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ImageIcon size={18} /> Published Articles ({blogPosts.length})
                </h4>
                
                {blogPosts.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textAlign: 'center', padding: '3rem 1rem' }}>No custom blog articles found. Default seed posts are rendering on the main blog page.</p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '520px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                    {blogPosts.map((item) => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--border-subtle)', borderRadius: '8px', background: 'var(--bg-surface)' }}>
                        <div style={{ flexGrow: 1, paddingRight: '1rem' }}>
                          <span style={{ fontSize: '0.72rem', background: 'rgba(139, 92, 246, 0.08)', color: 'var(--violet)', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: 600 }}>{item.category}</span>
                          <h5 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.98rem', margin: '0.4rem 0 0.15rem' }}>{item.title}</h5>
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>By {item.author} • {item.date}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteBlog(item.id)} 
                          className={styles.deleteBtn}
                          style={{ border: '1px solid var(--border-subtle)', borderRadius: '6px', padding: '0.4rem', color: 'var(--rose)' }}
                          title="Delete article"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CMS Offers Manager */}
        {activeTab === 'cms_offers' && (
          <div style={{ padding: '3rem 2rem', maxWidth: '640px', margin: '0 auto' }}>
            <div className="glass-card" style={{ padding: '2.5rem', border: '1px solid var(--border-subtle)' }}>
              <h4 style={{ color: 'var(--cyan)', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'var(--font-header)', fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Sparkles size={20} style={{ color: 'var(--amber)' }} /> Announcement Banner Settings
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.5 }}>
                Publish a site-wide sticky alert bar at the very top of all pages. Ideal for flash discounts, Varanasi Grand Openings, or special slot availability announcements.
              </p>
              
              <form onSubmit={handleUpdateOffer}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Banner Notification Text</label>
                    <textarea 
                      placeholder="e.g. 🕉️ Grand Opening Special: Get 20% off all Varanasi Studio Programs this week!" 
                      value={activeOffer.banner_text} 
                      onChange={(e) => setActiveOffer(prev => ({ ...prev, banner_text: e.target.value }))}
                      required
                      style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', height: '90px', outline: 'none', resize: 'none', fontSize: '0.95rem', lineHeight: 1.5 }}
                    />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Action Button Text (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Claim Offer" 
                        value={activeOffer.button_text} 
                        onChange={(e) => setActiveOffer(prev => ({ ...prev, button_text: e.target.value }))}
                        style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Action Button Link (Optional)</label>
                      <input 
                        type="text" 
                        placeholder="e.g. /pricing" 
                        value={activeOffer.button_link} 
                        onChange={(e) => setActiveOffer(prev => ({ ...prev, button_link: e.target.value }))}
                        style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--bg-deep)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-subtle)', margin: '0.5rem 0 1rem' }}>
                    <input 
                      type="checkbox" 
                      id="is_active" 
                      checked={activeOffer.is_active} 
                      onChange={(e) => setActiveOffer(prev => ({ ...prev, is_active: e.target.checked }))}
                      style={{ width: '22px', height: '22px', cursor: 'pointer' }}
                    />
                    <label htmlFor="is_active" style={{ fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer', color: 'var(--text-primary)' }}>
                      Enable & Show Announcement Banner
                    </label>
                  </div>
                  
                  {/* Social Media & Contact Links Settings */}
                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', marginTop: '0.5rem' }}>
                    <h4 style={{ color: 'var(--cyan)', fontWeight: 700, marginBottom: '1rem', fontFamily: 'var(--font-header)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      Social Links & Contact Info
                    </h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>WhatsApp Phone Number (with Country Code, no spaces/plus)</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 916394554685" 
                          value={activeOffer.whatsapp_phone || ''} 
                          onChange={(e) => setActiveOffer(prev => ({ ...prev, whatsapp_phone: e.target.value }))}
                          style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Contact Email Address</label>
                        <input 
                          type="email" 
                          placeholder="e.g. info@tapasyoga.in" 
                          value={activeOffer.contact_email || ''} 
                          onChange={(e) => setActiveOffer(prev => ({ ...prev, contact_email: e.target.value }))}
                          style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Facebook URL</label>
                          <input 
                            type="text" 
                            placeholder="e.g. https://facebook.com/tapasyogavaranasi" 
                            value={activeOffer.facebook_link || ''} 
                            onChange={(e) => setActiveOffer(prev => ({ ...prev, facebook_link: e.target.value }))}
                            style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                          />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Instagram URL</label>
                          <input 
                            type="text" 
                            placeholder="e.g. https://instagram.com/tapasyogavaranasi" 
                            value={activeOffer.instagram_link || ''} 
                            onChange={(e) => setActiveOffer(prev => ({ ...prev, instagram_link: e.target.value }))}
                            style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>YouTube Channel URL</label>
                        <input 
                          type="text" 
                          placeholder="e.g. https://youtube.com/@tapasyoga" 
                          value={activeOffer.youtube_link || ''} 
                          onChange={(e) => setActiveOffer(prev => ({ ...prev, youtube_link: e.target.value }))}
                          style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* SEO & Search Engine Optimization Panel */}
                  <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
                    <h4 style={{ color: 'var(--violet)', fontWeight: 700, marginBottom: '0.5rem', fontFamily: 'var(--font-header)', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      🌐 SEO & Google Ranking Center (Self-SEO)
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                      Optimize your website's search engine keywords, descriptions, and schemas to rank higher on Google search queries.
                    </p>

                    {/* SEO Health Audit UI */}
                    {(() => {
                      const report = getSeoHealthReport(activeOffer);
                      const isGood = report.score >= 80;
                      const isWarning = report.score >= 50 && report.score < 80;
                      const scoreColor = isGood ? 'var(--cyan)' : isWarning ? 'var(--amber)' : 'var(--rose)';
                      
                      return (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', background: 'rgba(142, 68, 173, 0.04)', border: '1px solid var(--border-glow-violet)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid var(--border-subtle)', paddingRight: '1rem' }}>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>SEO Score</div>
                            <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '50%', border: `4px solid ${scoreColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 10px rgba(0,0,0,0.05)' }}>
                              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: scoreColor }}>{report.score}</span>
                            </div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: scoreColor, marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              {isGood ? 'Optimized' : isWarning ? 'Needs Work' : 'Poor SEO'}
                            </div>
                          </div>

                          <div>
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem', letterSpacing: '0.5px' }}>SEO Recommendations Checklist</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', maxHeight: '120px', overflowY: 'auto', paddingRight: '0.5rem' }}>
                              {report.checks.map((check, i) => (
                                <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.8rem' }}>
                                  <span style={{ 
                                    color: check.status === 'pass' ? '#1B5E20' : check.status === 'warn' ? '#F39C12' : '#D35400',
                                    fontWeight: 800,
                                    marginRight: '0.25rem'
                                  }}>
                                    {check.status === 'pass' ? '✓' : check.status === 'warn' ? '⚠' : '✗'}
                                  </span>
                                  <div>
                                    <strong style={{ color: 'var(--text-primary)' }}>{check.text}</strong>
                                    <span style={{ color: 'var(--text-secondary)', display: 'block', fontSize: '0.75rem' }}>{check.desc}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })()}

                    {/* SEO Fields inputs */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>Google Meta Title</label>
                          <span style={{ fontSize: '0.75rem', color: (activeOffer.seo_title || '').length >= 30 && (activeOffer.seo_title || '').length <= 65 ? '#1B5E20' : '#F39C12' }}>
                            {(activeOffer.seo_title || '').length} / 65 chars (Ideal: 30-65)
                          </span>
                        </div>
                        <input 
                          type="text" 
                          placeholder="e.g. TAPAS Yoga — Clinical Yoga Therapy & Online Classes | Varanasi" 
                          value={activeOffer.seo_title || ''} 
                          onChange={(e) => setActiveOffer(prev => ({ ...prev, seo_title: e.target.value }))}
                          style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                      </div>

                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                          <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>Google Meta Description</label>
                          <span style={{ fontSize: '0.75rem', color: (activeOffer.seo_description || '').length >= 100 && (activeOffer.seo_description || '').length <= 170 ? '#1B5E20' : '#F39C12' }}>
                            {(activeOffer.seo_description || '').length} / 170 chars (Ideal: 100-170)
                          </span>
                        </div>
                        <textarea 
                          placeholder="A summary of classes, treatments, and locations that searchers will see on Google snippets..." 
                          value={activeOffer.seo_description || ''} 
                          onChange={(e) => setActiveOffer(prev => ({ ...prev, seo_description: e.target.value }))}
                          rows={3}
                          style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical', fontFamily: 'inherit', fontSize: '0.9rem', lineHeight: '1.4' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Target Search Keywords (comma-separated)</label>
                        <input 
                          type="text" 
                          placeholder="e.g. online yoga classes, yoga therapy, varanasi yoga, thyroid yoga, back pain therapy" 
                          value={activeOffer.seo_keywords || ''} 
                          onChange={(e) => setActiveOffer(prev => ({ ...prev, seo_keywords: e.target.value }))}
                          style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                      </div>

                      <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Google Search Console Verification Code (Optional)</label>
                        <input 
                          type="text" 
                          placeholder="e.g. google-site-verification=xxxxxxxxx" 
                          value={activeOffer.seo_google_verification || ''} 
                          onChange={(e) => setActiveOffer(prev => ({ ...prev, seo_google_verification: e.target.value }))}
                          style={{ width: '100%', padding: '0.85rem', borderRadius: '8px', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', outline: 'none' }}
                        />
                        <span style={{ fontSize: '0.7rem', color: 'rgba(44, 62, 80, 0.5)', display: 'block', marginTop: '0.25rem' }}>
                          Enter the google-site-verification HTML meta tag token to claim site ownership on Search Console.
                        </span>
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={offerSaving}>
                    {offerSaving ? 'Saving website settings...' : 'Publish Settings to Website'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
