# Hair Booking System

A modern, accessible booking website template for hair stylists, beauticians, and similar professionals.  
Built with Next.js, Drizzle ORM, PostgreSQL, and Google OAuth.

---

## Features

- Beautiful, responsive landing page with hero image and about section
- Online booking system with available slots only
- Services listing
- Contact form with EmailJS integration
- Login and registration with Google OAuth and email/password
- Password reset via email
- Account management (edit profile, upload profile image)
- View, edit, and cancel bookings (with loading indicators for actions)
- PostgreSQL database (hosted on Neon)
- Accessible, mobile-friendly design

---

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [Neon](https://neon.tech/) (PostgreSQL database hosting)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/) (Google OAuth & credentials)
- [Vercel](https://vercel.com/) for deployment
- [EmailJS](https://www.emailjs.com/) (contact form email delivery)
- [Nodemailer](https://nodemailer.com/) (password reset emails)

---

## Getting Started

1. **Clone the repo:**

   ```sh
   git clone https://github.com/yourusername/hair-booking-system.git
   cd hair-booking-system
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up your environment variables:**

   - Copy `.env.example` to `.env` and fill in your values.

4. **Set up your database:**

   - Create a Neon Postgres project at [neon.tech](https://neon.tech/).
   - Copy your Neon connection string to your `.env` file as `DATABASE_URL`.
   - Run Drizzle migrations:
     ```sh
     npx drizzle-kit push
     ```

5. **Set up EmailJS (for contact form):**

   - Create an account at [emailjs.com](https://www.emailjs.com/).
   - Get your Service ID, Template ID, and Public Key from the EmailJS dashboard.
   - Add them to your `.env` file:
     ```
     NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
     ```

6. **Set up email credentials for password reset:**

   - Add your SMTP credentials to your `.env`:
     ```
     SMTP_USER=your_email@gmail.com
     SMTP_PASS=your_app_password
     NEXT_PUBLIC_BASE_URL=http://localhost:3000
     ```
   - On Vercel, set `NEXT_PUBLIC_BASE_URL` to your deployed URL.

7. **Run the development server:**

   ```sh
   npm run dev
   ```

8. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Deployment

- Deploy easily to [Vercel](https://vercel.com/).
- Set your production environment variables in the Vercel dashboard.

---

## License

MIT

---

## Credits

Created by [Your Name].  
Inspired by real-world needs of independent stylists and beauty professionals.
