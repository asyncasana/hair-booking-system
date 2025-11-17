# **Hair Booking System**

A production-ready booking platform built for a local hairstylist.  
It includes authentication, slot-based bookings, a responsive admin dashboard, automated email flows, and a clean Next.js + Drizzle architecture.

---

## 📸 Preview

<p align="center">
  <img src="https://raw.githubusercontent.com/asyncasana/hair-booking-system/main/public/preview.png" width="800" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/asyncasana/hair-booking-system/main/public/auth.png" width="800" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/asyncasana/hair-booking-system/main/public/account.png" width="800" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/asyncasana/hair-booking-system/main/public/booking.png" width="800" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/asyncasana/hair-booking-system/main/public/booking1.png" width="800" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/asyncasana/hair-booking-system/main/public/booking2.png" width="800" />
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/asyncasana/hair-booking-system/main/public/dashboard.png" width="800" />
</p>

---

## Live Demo  
🔗 https://hair-with-iryna.vercel.app/

---

## **Features**

- **Responsive landing page** with hero section and service details  
- **Slot-based booking system** (only shows available times)  
- **Admin dashboard** for managing bookings and availability  
- **Google OAuth + Email/Password authentication** (NextAuth)  
- **Password reset via email** (Nodemailer)  
- **Contact form** using EmailJS  
- **User dashboard** for profile updates and managing bookings  
- **PostgreSQL database** hosted on Neon  
- **Fully mobile-friendly & accessible UI**

---

## **Tech Stack**

- **Framework:** Next.js  
- **Database:** PostgreSQL (Neon)  
- **ORM:** Drizzle ORM  
- **Auth:** NextAuth (Google OAuth + Credentials)  
- **Styling:** Tailwind CSS  
- **Email:** EmailJS (contact), Nodemailer (password reset)  
- **Deployment:** Vercel  

---

## **Live Demo**

🔗 **https://hair-with-iryna.vercel.app/**

---

## **Local Development**

### **1. Clone the repository**

```bash
git clone https://github.com/asyncasana/hair-booking-system.git
cd hair-booking-system
```

### **2. Install dependencies**

```bash
npm install
```

### **3. Set up environment variables**

```bash
cp .env.example .env
```

Fill in your values for:

- Database connection  
- EmailJS keys  
- SMTP credentials  
- NextAuth secrets  

### **4. Run database migrations**

```bash
npx drizzle-kit push
```

### **5. Start development server**

```bash
npm run dev
```

Open http://localhost:3000

---

## **License**

MIT
