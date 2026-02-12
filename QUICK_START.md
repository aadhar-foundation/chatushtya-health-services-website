# Quick Start Guide - CHS Healthcare Website

## 🚀 Installation

```bash
# Install dependencies
npm install

# Create .env.local file
cp .env.example .env.local

# Start development server
npm run dev
```

Visit `http://localhost:3000`

---

## 🎨 New Color Theme

### Navy Blue Primary (#1E40AF)
- Trust, professionalism, healthcare
- Light: #3B82F6 | Dark: #1E3A8A

### Gold/Amber Secondary (#F59E0B)
- Energy, transformation, warmth
- Light: #FCD34D | Dark: #D97706

### Green Tertiary (#059669)
- Growth, healing, innovation
- Light: #10B981 | Dark: #047857

### Usage in Code
```tsx
<div className="bg-primary text-white">Navy Blue</div>
<div className="bg-secondary">Gold Accent</div>
<div className="bg-tertiary">Green</div>
```

---

## 📦 New Tech Stack

### Animation
- **framer-motion** - Smooth animations and transitions

### Scroll Effects
- **react-intersection-observer** - Scroll-triggered animations
- **react-scroll** - Smooth scroll navigation

### Carousels
- **swiper** - Advanced carousel/slider
- **embla-carousel-react** - Lightweight carousel

### Forms
- **react-hook-form** - Form state management
- **zod** - Schema validation

### Statistics
- **react-countup** - Animated counters

### SEO
- **next-seo** - Meta tags & Open Graph

---

## ⚡ Quick Code Examples

### Animated Component with Scroll Trigger
```tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export function AnimatedSection() {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      Content appears on scroll
    </motion.div>
  );
}
```

### Smooth Scroll Navigation
```tsx
import { scroller } from 'react-scroll';

<button onClick={() => scroller.scrollTo('section-id', { duration: 800 })}>
  Go to Section
</button>
```

### Animated Counter
```tsx
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

export function Counter() {
  const { ref, inView } = useInView();
  
  return (
    <div ref={ref}>
      {inView && <CountUp end={1000} duration={2} />}
    </div>
  );
}
```

### Form with Validation
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  message: z.string().max(1000, 'Max 1000 characters'),
});

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
    </form>
  );
}
```

### Carousel with Swiper
```tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

<Swiper spaceBetween={20} slidesPerView={3}>
  {items.map((item) => (
    <SwiperSlide key={item.id}>{item.content}</SwiperSlide>
  ))}
</Swiper>
```

---

## 📱 Responsive Breakpoints

```
2xs: 320px   - Ultra-mobile
xs:  475px   - Small phones
sm:  640px   - Landscape phones
md:  768px   - Tablets
lg:  1024px  - Small desktops
xl:  1280px  - Desktops
2xl: 1536px  - Large screens
```

### Usage
```tsx
<div className="text-sm md:text-lg lg:text-xl">
  Responsive text
</div>
```

---

## 🔐 Environment Variables

Create `.env.local`:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 📊 Project Structure

```
/app
  /layout.tsx          - Root layout with metadata
  /page.tsx            - Home page
  /globals.css         - Global styles & theme
/components
  /Navbar.tsx          - Navigation bar
  /Hero.tsx            - Hero section
  /WhatWeDo.tsx        - Services overview
  /WhyChooseUs.tsx     - Benefits section
  /AboutUs.tsx         - Company info
  /Services.tsx        - Detailed services
  /Clients.tsx         - Client logos
  /Gallery.tsx         - Image gallery
  /ContactUs.tsx       - Contact form
  /Footer.tsx          - Footer
/lib
  /constants.ts        - Configuration & data
  /validations.ts      - Zod schemas
/public
  /images             - All images
```

---

## 🎯 Common Tasks

### Add a New Animated Section
1. Use `useInView` for scroll trigger
2. Use `motion.div` from framer-motion
3. Import icons from lucide-react
4. Apply className with color utilities

### Create a New Carousel
1. Import Swiper components
2. Add CSS imports
3. Configure modules (Navigation, Pagination, Autoplay)
4. Set breakpoints for responsiveness

### Add Form Validation
1. Define Zod schema
2. Use react-hook-form with zodResolver
3. Register inputs
4. Display error messages

### Update Colors
1. Modify CSS variables in `/app/globals.css`
2. All components automatically update
3. Both light and dark modes supported

---

## 🚀 Deployment

### Build
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Deploy to Vercel
```bash
vercel deploy
```

---

## 🐛 Troubleshooting

### Animations Not Working
- Check if Framer Motion is imported
- Verify `useInView` is configured correctly
- Check browser DevTools for CSS errors

### Form Not Submitting
- Verify EmailJS credentials in .env.local
- Check console for error messages
- Ensure email template exists

### Images Not Loading
- Check `/public/images` directory
- Verify file paths in components
- Check image format (jpg, png, webp)

### Styling Issues
- Clear `.next` folder: `rm -rf .next`
- Restart dev server
- Check Tailwind configuration

---

## 📚 Documentation

- **Full Tech Stack**: See `/TECH_STACK.md`
- **Integration Setup**: See `/INTEGRATION_SETUP.md`
- **Updates Summary**: See `/UPDATES_SUMMARY.md`

---

## ✅ Deployment Checklist

- [ ] npm install completed
- [ ] .env.local configured
- [ ] npm run dev works
- [ ] Animations smooth
- [ ] Forms working
- [ ] Mobile responsive
- [ ] Dark mode tested
- [ ] SEO meta tags updated
- [ ] All links functional
- [ ] Images loading
- [ ] npm run build succeeds
- [ ] Ready for production

---

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com)
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev)

---

## 💡 Pro Tips

1. Use Tailwind's responsive prefixes (`md:`, `lg:`) for layouts
2. Import icons from `lucide-react` for consistency
3. Use CSS variables for color flexibility
4. Leverage Framer Motion's `whileInView` for animations
5. Test on real mobile devices
6. Monitor performance with Lighthouse
7. Use `next/image` for image optimization

---

## 🆘 Need Help?

1. Check the documentation files
2. Review component examples
3. Check browser console for errors
4. Test in incognito/private mode
5. Clear cache and restart dev server

---

**Happy coding! 🚀**
