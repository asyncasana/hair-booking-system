# Hair Booking System

A modern, accessible booking website template for hair stylists, beauticians, and similar professionals.  
Built with Next.js, Drizzle ORM, PostgreSQL, and Google OAuth.

---

## Features

- Beautiful, responsive landing page with hero image and about section
  Coming Soon:
- Online booking system
- Services listing
- Contact form
- Login with Google OAuth
- PostgreSQL database (local and Neon for production)
- Accessible, mobile-friendly design

---

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/) (Google OAuth)
- [Vercel](https://vercel.com/) for deployment

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

   - Make sure PostgreSQL is running.
   - Run Drizzle migrations:
     ```sh
     npx drizzle-kit push
     ```

5. **Run the development server:**

   ```sh
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

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
