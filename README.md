# 🛍️ Susan's Market - Permanent Fedora Hosting Guide

Follow these steps to host this application permanently on your Fedora Linux machine or VPS.

## 1. Prepare the Production Build
Ensure your API Key is set in your environment before building:
```bash
export API_KEY=your_gemini_api_key_here
npm install
npm run build
```
This creates a `dist/` folder containing your permanent website files.

## 2. Install Nginx on Fedora
```bash
sudo dnf update
sudo dnf install nginx
sudo systemctl enable --now nginx
```

## 3. Configure the Web Server
Create a configuration file for your site:
```bash
sudo nano /etc/nginx/conf.d/susan_market.conf
```
Paste the following:
```nginx
server {
    listen 80;
    server_name your_domain_or_ip;

    root /var/www/susan-market/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 4. Deploy Files
```bash
sudo mkdir -p /var/www/susan-market
sudo cp -r dist /var/www/susan-market/
sudo chown -R nginx:nginx /var/www/susan-market
sudo chmod -R 755 /var/www/susan-market
```

## 5. Adjust Permissions (SELinux)
Fedora is secure by default. You must allow Nginx to read the files:
```bash
sudo chcon -Rt httpd_sys_content_t /var/www/susan-market
```

## 6. Open the Firewall
```bash
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

## 7. Restart Nginx
```bash
sudo systemctl restart nginx
```

Your market is now live permanently!