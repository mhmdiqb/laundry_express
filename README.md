# 🧺 Laundry Express

A web-based laundry management system built with Node.js, Express, EJS, and MySQL.

Laundry Express is designed to help manage laundry operations such as customers, transactions, laundry status tracking, and reports through a centralized web application.

---

## ✨ Features

- 🔐 User authentication
- 👥 Customer management
- 🧺 Laundry transaction management
- 📦 Laundry status tracking
- 📊 Reports
- 🖥️ Dashboard
- 🗄️ MySQL database integration
- 📱 QR Code support

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- Express Session

### Frontend

- EJS
- HTML
- CSS
- JavaScript

### Database

- MySQL

### Other Libraries

- Axios
- QRCode

---

## 📂 Project Structure

```text
laundry_express/
│
├── config/
│   └── db.js
│
├── controllers/
│   └── laundryController.js
│
├── data/
│   └── data.js
│
├── middleware/
│   └── auth.js
│
├── public/
│   └── static assets
│
├── routes/
│   └── laundryRoutes.js
│
├── views/
│   ├── dashboard.ejs
│   ├── login.ejs
│   ├── pelanggan.ejs
│   ├── transaksi.ejs
│   ├── tracking.ejs
│   ├── laporan.ejs
│   └── ...
│
├── app.js
├── laundry_db.sql
├── package.json
└── README.md