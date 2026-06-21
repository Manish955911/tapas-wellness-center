# Vercel & Supabase Deployment Guide (Hinglish)

Tapas Yoga Classes application ko Vercel aur Supabase par **₹0 (Absolutely Free)** me live karne ke liye ye steps follow karein.

---

## Step 1: GitHub par Code Upload karna

Vercel par deploy karne ke liye aapka code GitHub repository par hona chahiye.

1. [GitHub](https://github.com) par ek naya account banayein (agar pehle se nahi hai).
2. Apne terminal me project root folder par jayein aur ye commands run karein:
   ```bash
   git init
   git add .
   git commit -m "feat: ready for production"
   ```
3. GitHub par ek naya repository banayein aur usko connect karke code push kar dein:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/tapas-yoga.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 2: Supabase (Free Database) Setup karna

Wiping (data loss) se bachne aur admin panel data ko permanent save rakhne ke liye hum Supabase use karenge.

1. [Supabase Website](https://supabase.com) par jayein aur **Sign In with GitHub** karein.
2. **New Project** create karein:
   * **Project Name**: `tapas-yoga`
   * **Database Password**: Ek accha password set karein (isse save rakhna).
   * **Region**: `South Asia (Mumbai)` ya nearest region select karein.
   * **Pricing Plan**: `Free` select karein.
3. Project create hone me 1-2 minutes lagenge.
4. Project Dashboard open hone ke baad, left sidebar me **SQL Editor** par click karein.
5. **New Query** par click karein.
6. Project folder me mojud [schema.sql](file:///Users/techsagacorp/tapas_yoga_classes/schema.sql) file ke sare codes ko copy karein aur yahan paste kar dein.
7. **Run** button par click karein. Aapke sare database tables (leads, blogs, gallery, reviews) generate ho jayenge.

---

## Step 3: Supabase API Keys nikalna

1. Supabase Dashboard me bottom-left me **Project Settings** (Gear icon ⚙️) par jayein.
2. Left menu me **API** par click karein.
3. Yahan se do keys ko copy karein:
   * **Project URL**: `https://xxxxxx.supabase.co`
   * **anon public API Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## Step 4: Vercel par Deploy karna

1. [Vercel Website](https://vercel.com) par jayein aur **Sign Up / Login with GitHub** karein.
2. Dashboard par **Add New** > **Project** par click karein.
3. Apne GitHub repository (`tapas-yoga`) ko search karke **Import** par click karein.
4. **Configure Project** screen par:
   * **Framework Preset**: Automatically `Next.js` select ho jayega.
   * **Root Directory**: `./` (default)
5. **Environment Variables** (Sabse important step) dropdown par click karein aur ye 3 keys add karein:
   
   | Key | Value |
   | :--- | :--- |
   | `NEXT_PUBLIC_SUPABASE_URL` | *Aapka Supabase Project URL* |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | *Aapka Supabase anon key* |
   | `ADMIN_PASSCODE` | `TapasAdmin2026` *(Ya jo passcode aap rakhna chahein)* |

6. **Deploy** button par click karein!
7. 1-2 minutes me aapki website live ho jayegi aur aapko ek link mil jayega (jaise `tapas-yoga.vercel.app`).

---

## Step 5: Custom Domain Setup karna (Hostinger)

Jab aap Hostinger se domain buy kar lenge, toh use aise connect karein:

1. Vercel dashboard me apne project par jayein > **Settings** > **Domains**.
2. Apna custom domain (jaise `tapasyoga.in`) enter karke **Add** par click karein.
3. Vercel aapko 2 main DNS records dikhayega:
   * **A Record** (Name: `@`, Value: `76.76.21.21`)
   * **CNAME Record** (Name: `www`, Value: `cname.vercel-dns.com`)
4. Apne **Hostinger** account me login karein, **Domain Panel** par jayein aur **DNS Zone Editor** open karein.
5. Purane generic/parking A Records aur CNAME records ko delete karein aur Vercel wale A Record aur CNAME Record ko add kar dein.
6. *Note: Email service ke MX records ko mat chhedna, taaki Titan Email chalta rahe.*
7. DNS propagation hone ke baad, aapki website direct custom domain par load hone lagegi.
