import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Fake menu database
const menuItems = [
  // Kunafas
  { id: 1, name: "Cheese Kunafa (Small)", category: "Kunafas", price: 150, description: "Authentic Middle Eastern dessert with a rich cheese filling.", image: "https://images.unsplash.com/photo-1627844642677-8b38cb71900a?w=500&auto=format&fit=crop" },
  { id: 2, name: "Cheese Kunafa (Regular)", category: "Kunafas", price: 170, description: "Classic cheese-filled Kunafa, served warm.", image: "https://images.unsplash.com/photo-1627844642677-8b38cb71900a?w=500&auto=format&fit=crop" },
  { id: 3, name: "Cream Kunafa", category: "Kunafas", price: 240, description: "Velvety cream-filled Kunafa, a local favorite.", image: "https://images.unsplash.com/photo-1634255146522-83569727409f?w=500&auto=format&fit=crop" },
  { id: 4, name: "Nutella Kunafa", category: "Kunafas", price: 260, description: "Kunafa topped with a generous layer of Nutella.", image: "https://images.unsplash.com/photo-1579306194872-64d3b14f71ec?w=500&auto=format&fit=crop" },
  { id: 5, name: "Nutty Kunafa", category: "Kunafas", price: 280, description: "Crunchy Kunafa loaded with assorted nuts.", image: "https://images.unsplash.com/photo-1539136788836-5699e78bab75?w=500&auto=format&fit=crop" },
  { id: 6, name: "Mango Kunafa", category: "Kunafas", price: 280, description: "Seasonal specialty with fresh mango flavors.", image: "https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=500&auto=format&fit=crop" },
  { id: 7, name: "Ferrero Rocher Kunafa", category: "Kunafas", price: 400, description: "The ultimate luxury Kunafa topped with Ferrero Rocher.", image: "https://images.unsplash.com/photo-1544480542-1fa958416873?w=500&auto=format&fit=crop" },
  
  // Ice Creams
  { id: 8, name: "Vanilla Ice Cream", category: "Ice Creams", price: 30, description: "Classic vanilla scoop.", image: "https://images.unsplash.com/photo-1501443762994-82bd5dabb892?w=500&auto=format&fit=crop" },
  { id: 9, name: "Butterscotch Ice Cream", category: "Ice Creams", price: 40, description: "Creamy butterscotch scoop.", image: "https://images.unsplash.com/photo-1516559173920-a75bb646f3e8?w=500&auto=format&fit=crop" },
  
  // Milkshakes
  { id: 10, name: "Vanilla Milkshake", category: "Milkshakes", price: 110, description: "Thick and creamy vanilla shake.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop" },
  { id: 11, name: "Chocolate Milkshake", category: "Milkshakes", price: 130, description: "Rich chocolatey goodness.", image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&auto=format&fit=crop" },
  
  // Beverages
  { id: 12, name: "Mango Lassi", category: "Beverages", price: 100, description: "Traditional sweet mango yogurt drink.", image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=500&auto=format&fit=crop" },
  { id: 13, name: "Rose Milk", category: "Beverages", price: 50, description: "Refreshing chilled rose milk.", image: "https://images.unsplash.com/photo-1517093602195-b40af9688b46?w=500&auto=format&fit=crop" }
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
