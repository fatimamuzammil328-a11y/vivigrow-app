# Vivigrow App 🌿

AgroFertilizers Marketing System is a comprehensive full‑stack web application built for Vivgro Ltd., an agriculture‑tech platform. It lets users (farmers, dealers, admins) sign up, log in, and later manage products, orders, etc. The core of the repo is a React front‑end and an Express + MongoDB back‑end, deployed on Vercel as serverless functions.

## How to Run

1. **Install Dependencies**
```bash
npm install
cd backend
npm install
cd ..
```

2. **Start MongoDB**
Make sure MongoDB is running locally on port 27017 (`mongodb://localhost:27017/Agrofertilizers`).

3. **Seed Database (Optional)**
```bash
cd backend
node seed.js
```

4. **Run the Application**
Open two terminal tabs:

**Tab 1 (Backend):**
```bash
cd backend
npm start
```

**Tab 2 (Frontend):**
```bash
npm start
```

## MongoDB Schema Integration Guide 🛡️🌿

Aapne jo MongoDB schema banaya hai, usse is React/Node.js app mein "attach" karne ke liye ye steps follow karein.

### 1. Project Structure Setup
Sabse pehle apne project root mein (ya `backend` folder agar hai) ek `models` directory banayein.

### 2. Model File Create Karein
Apne schema ko ek file mein save karein, misal ke taur par `Product.js`.

### 3. Database Connection
Apne main server file (e.g., `server.js` ya `app.js`) mein MongoDB se connect karein.

### 4. Schema ko Use Karein
Ab aap kisi bhi API route mein is model ko use kar ke data save ya read kar sakte hain.

> [!TIP]
> Agar aapka schema complex hai (nested objects or arrays), to Mongoose validation aapko data clean rakhne mein madad karegi! 👋
