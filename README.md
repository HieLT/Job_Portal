# Job_Portal
## Môi trường

- **Node.js**: Phiên bản `v18.18.2`
- **Link download**: https://nodejs.org/dist/v18.18.2/node-v18.18.2-x64.msi

## Cài đặt

1. **Clone repo:**
   git clone https://github.com/HieLT/Job_Portal.git
2. **Chạy back-end**
   - cd server
   - npm install
   - npm start
3. **Chạy front-end**
   - cd job_portal_fe
   - npm install 
   - Cấu hình .env 
      * Cấu hình đường dẫn địa chỉ máy chủ 
        VITE_API_URL =
      * Cấu hình mã định danh google (tùy chọn)
        VITE_GOOGLE_CLIENT_ID =
      * Cấu hình đường dẫn địa chỉ máy chủ socket
        VITE_SOCKET_DOMAIN =
   - npm run dev
