# VPS Deployment Guide — TAPAS Yoga Classes

This guide provides step-by-step instructions to deploy the **TAPAS Yoga Classes** Next.js web application onto a self-hosted Linux Virtual Private Server (VPS) running Ubuntu 22.04 LTS or 24.04 LTS. It configures a production-ready environment using Node.js, PM2 process management, Nginx reverse proxy, and Let's Encrypt SSL.

---

## 1. Domain DNS Configuration

Before logging into your server, configure your domain's DNS zone file to point to your VPS IP address. Log into your registrar (GoDaddy, Hostinger, Namecheap, Google Domains, etc.) and add the following records:

| Record Type | Name (Host) | Value (IP Address) | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `YOUR_VPS_IP_ADDRESS` | Automatic / 3600 |
| **A** | `www` | `YOUR_VPS_IP_ADDRESS` | Automatic / 3600 |

*Note: DNS propagation can take anywhere from a few minutes up to 24 hours.*

---

## 2. Server Initial Access (SSH)

Log into your clean Ubuntu VPS instance via SSH:

```bash
ssh root@YOUR_VPS_IP_ADDRESS
```

Update the system's package list and upgrade existing packages to ensure security patches are applied:

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 3. Install System Dependencies

### A. Install Node.js (Node LTS v20)
We will install Node.js using the NodeSource binary distributions repository:

```bash
# Add NodeSource GPG key and repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs
```

Verify installation:
```bash
node -v
npm -v
```

### B. Install PM2 (Process Manager)
PM2 keeps your Next.js application running in the background and restarts it automatically if the server crashes or restarts:

```bash
sudo npm install -g pm2
```

### C. Install Nginx (Web Server / Reverse Proxy)
Nginx will listen on public HTTP (port 80) and HTTPS (port 443) ports, forwarding incoming web requests to the Next.js local port (3000):

```bash
sudo apt install -y nginx
```

Ensure Nginx is running and starts automatically on system boot:
```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## 4. Setup Git and Deploy Code

Create the application directory under `/var/www` and clone your repository:

```bash
# Move to the web root directory
cd /var/www

# Clone your repository
git clone https://github.com/YOUR_USERNAME/tapas_yoga_classes.git tapas_yoga

# Grant ownership permissions to your user (or leave as root if running simply)
cd tapas_yoga
```

---

## 5. Configure Environment Variables

Create a local production environment file to store secrets, Supabase credentials, and admin tokens:

```bash
nano .env.local
```

Paste and configure the following production keys:

```env
# Node Environment
NODE_ENV=production

# Supabase Credentials (Required for dynamic testimonials, gallery, and manual subscriptions)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-public-key

# Administrative Dashboard Passkey
ADMIN_CMS_PASSKEY=TapasAdmin2026
```

*Press `Ctrl+O` then `Enter` to save, and `Ctrl+X` to exit the nano editor.*

---

## 6. Build and Start Next.js App

Install the node package dependencies and compile the production bundle (Turbopack optimization):

```bash
# Install node packages
npm install

# Compile production bundle
npm run build
```

Once the compilation shows a successful output, start the background process using PM2:

```bash
# Start NextJS in production mode under PM2
pm2 start npm --name "tapas-yoga" -- start

# Configure PM2 to start automatically on system boot
pm2 save
pm2 startup
```

*Note: After running `pm2 startup`, copy and run the command printed in your terminal screen to complete system startup configuration.*

---

## 7. Configure Nginx Reverse Proxy

Nginx must intercept incoming traffic from your public domain and forward it to port `3000`.

1. Create a server configuration block for your site:
```bash
sudo nano /etc/nginx/sites-available/tapasyoga.in
```

2. Paste the following server block configurations:
```nginx
server {
    listen 80;
    server_name tapasyoga.in www.tapasyoga.in;

    # Dynamic reverse proxy configuration
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        
        # Security header settings
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Enable high payload files if uploading large gallery images
    client_max_body_size 16M;
}
```

3. Enable Nginx site block and test the configuration syntax:
```bash
# Symlink to sites-enabled
sudo ln -s /etc/nginx/sites-available/tapasyoga.in /etc/nginx/sites-enabled/

# Test Nginx syntax configuration
sudo nginx -t
```

4. Restart Nginx to load the configuration changes:
```bash
sudo systemctl restart nginx
```

---

## 8. Secure with SSL (HTTPS using Let's Encrypt)

Secure all server traffic with a free SSL certificate using Certbot:

```bash
# Install Certbot and the Nginx plugin
sudo apt install -y certbot python3-certbot-nginx

# Request and apply certificates for domains
sudo certbot --nginx -d tapasyoga.in -d www.tapasyoga.in
```

1. Enter your administration email when prompted.
2. Accept the terms of service (A).
3. Select whether to share your email (optional).
4. Choose **Yes/Redirect** to automatically redirect all standard HTTP requests to secure HTTPS.

Certbot automatically configures cron renewal scripts, verifying and refreshing certificates every 90 days.

---

## 9. Useful VPS Commands & Troubleshooting

### Check application status
```bash
pm2 status
pm2 logs tapas-yoga
```

### Restart app after code updates
Whenever you fetch new code (`git pull`), rebuild and restart the background process:
```bash
cd /var/www/tapas_yoga
git pull
npm install
npm run build
pm2 restart tapas-yoga
```

### Inspect Nginx Access & Error Logs
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```
