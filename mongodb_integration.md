# MongoDB Schema Integration Guide 🛡️🌿

Aapne jo MongoDB schema banaya hai, usse is React/Node.js app mein "attach" karne ke liye ye steps follow karein.

## 1. Project Structure Setup
Sabse pehle apne project root mein (ya `backend` folder agar hai) ek `models` directory banayein.

```bash
mkdir src/models
```

## 2. Model File Create Karein
Apne schema ko ek file mein save karein, misal ke taur par `Product.js`.

```javascript
/* src/models/Product.js */
const mongoose = require('mongoose');

// Aapka banaya hua schema yahan paste karein
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    cat: { type: String, required: true },
    price: { type: String, required: true },
    desc: { type: String },
    badge: { type: String },
    emoji: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// Isse "attach" (export) karein
module.exports = mongoose.model('Product', ProductSchema);
```

## 3. Database Connection
Apne main server file (e.g., `server.js` ya `app.js`) mein MongoDB se connect karein.

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/vivigrow', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => console.log('❌ Connection Error:', err));
```

## 4. Schema ko Use Karein
Ab aap kisi bhi API route mein is model ko use kar ke data save ya read kar sakte hain.

```javascript
const Product = require('./models/Product');

// Naya product save karne ke liye
const addNewProduct = async (data) => {
    const newProd = new Product(data);
    await newProd.save();
    console.log("Product Saved!");
};
```

> [!TIP]
> Agar aapka schema complex hai (nested objects or arrays), to Mongoose validation aapko data clean rakhne mein madad karegi! 👋
