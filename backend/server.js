const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Fake menu database
const menuItems = [
  { id: 1, name: "Chocolate Truffle Cake", category: "cakes", price: 25, description: "Rich chocolate cake with truffle frosting", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&auto=format&fit=crop" },
  { id: 2, name: "Vanilla Bean Cupcake", category: "pastries", price: 4, description: "Classic vanilla cupcake with buttercream", image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500&auto=format&fit=crop" },
  { id: 3, name: "Sourdough Bread", category: "breads", price: 8, description: "Freshly baked artisan sourdough loaf", image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?w=500&auto=format&fit=crop" },
  { id: 4, name: "Butter Croissant", category: "pastries", price: 3.5, description: "Flaky, buttery French pastry", image: "https://images.unsplash.com/photo-1555507036-ab1e4006a2a0?w=500&auto=format&fit=crop" },
  { id: 5, name: "Strawberry Shortcake", category: "cakes", price: 30, description: "Light sponge cake with fresh strawberries", image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&auto=format&fit=crop" },
  { id: 6, name: "Cinnamon Roll", category: "pastries", price: 4.5, description: "Warm cinnamon roll with cream cheese icing", image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=500&auto=format&fit=crop" },
  { id: 7, name: "Baguette", category: "breads", price: 4, description: "Traditional French baguette with a crispy crust", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop" },
  { id: 8, name: "Chocolate Chip Cookie", category: "snacks", price: 2, description: "Classic cookie with gooey chocolate chips", image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&auto=format&fit=crop" },
  { id: 9, name: "Iced Caramel Macchiato", category: "beverages", price: 5.5, description: "Espresso with milk, vanilla, and caramel drizzle", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&auto=format&fit=crop" },
  { id: 10, name: "Blueberry Muffin", category: "snacks", price: 3.5, description: "Moist muffin bursting with fresh blueberries", image: "https://images.unsplash.com/photo-1607958996333-41aef7bc0aa1?w=500&auto=format&fit=crop" },
  { id: 11, name: "Matcha Latte", category: "beverages", price: 5, description: "Creamy green tea matcha latte", image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=500&auto=format&fit=crop" },
  { id: 12, name: "Cheesecake Slice", category: "cakes", price: 6, description: "New York style cheesecake slice", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&auto=format&fit=crop" }
];

app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other services or SMTP details
  auth: {
    user: process.env.EMAIL_USER || 'bakery.test@example.com',
    pass: process.env.EMAIL_PASS || 'password123'
  }
});

app.post('/api/checkout', async (req, res) => {
  const { name, phone, address, notes, items, total } = req.body;

  try {
    // Basic validation
    if (!name || !phone || !address || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Prepare email content
    const itemsList = items.map(item => `${item.quantity}x ${item.name} ($${item.price * item.quantity})`).join('\n');
    
    const mailOptions = {
      from: process.env.EMAIL_USER || 'bakery.test@example.com',
      to: process.env.OWNER_EMAIL || 'owner@bakery.com',
      subject: `New Order from ${name} - Total: $${total}`,
      text: `
New Order Received!

Customer Details:
Name: ${name}
Phone: ${phone}
Address: ${address}
Notes: ${notes ? notes : 'None'}

Order Details:
${itemsList}

Total Amount: $${total}
      `
    };

    // Attempt to send email
    // NOTE: If credentials are fake, this will fail. We catch and respond gracefully.
    try {
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
         await transporter.sendMail(mailOptions);
      } else {
         console.log("Skipping email send. Credentials missing. Email content:");
         console.log(mailOptions.text);
      }
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the whole checkout process just because the email didn't send 
    }

    res.status(200).json({ message: "Order processed successfully", orderId: Math.floor(Math.random() * 1000000) });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Failed to process order" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
