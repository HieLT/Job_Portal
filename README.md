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
   - Cấu hình .env
      * **Id client cho ứng dụng Google OAuth2** GOOGLE_CLIENT_ID = 
      * **Key client secret cho ứng dụng Google OAuth2** GOOGLE_CLIENT_SECRET = 
      * **Key secret dùng để sign và xác minh session cookies** SESSION_SECRET = 
      * **Email đăng ký Google OAuth2 và dùng để gửi email** EMAIL_USER = 
      * **Refresh token dùng để lấy token truy cập mới khi access token hết hạn của Google OAuth2** REFRESH_TOKEN = 
      * **URI chuyển hướng khi xác thực thành công** REDICT_URI = 
      * **URI kết nối tới Mongo Atlas** MONGO_URI = 
      * **Key để mã hóa và xác thực token** TOKEN_KEY = 
      * **Đường dẫn tới bucket lưu trữ trên Firsebase** STORAGE_BUCKET = 
      * **Key cho service account của Firebase, chứa thông tin xác thực và quyền truy cập** FIREBASE_SERVICE_ACCOUNT_KEY = 
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
