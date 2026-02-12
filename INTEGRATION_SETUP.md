# Integration Setup Guide

## EmailJS Configuration

### Step 1: Create EmailJS Account
1. Visit [emailjs.com](https://www.emailjs.com)
2. Sign up for a free account
3. Create a new email service

### Step 2: Get Credentials
- Service ID: From Email Services
- Template ID: From Email Templates
- Public Key: From Account settings

### Step 3: Create Email Template
Template variables:
```
{{from_name}}
{{from_email}}
{{subject}}
{{message}}
{{phone}}
```

### Step 4: Add to .env.local
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Step 5: Initialize in ContactUs Component
```tsx
import emailjs from '@emailjs/browser';

useEffect(() => {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
}, []);
```

## Google Maps Embed

The embedded map is already configured in constants.ts:
```
CONTACT_INFO.mapEmbed
```

Update the embed URL if needed:
1. Get your custom embed from [Google Maps](https://maps.google.com)
2. Replace the iframe in constants.ts

## SEO Configuration

### next-seo Setup
Already configured in layout.tsx with:
- Default site metadata
- Open Graph tags
- Twitter Card support
- Canonical URLs

Update in layout.tsx:
```tsx
export const metadata: Metadata = {
  title: 'CHS - Chatushtya Health Services',
  description: 'Healthcare capacity building and training',
  // ... more metadata
};
```

## Framer Motion Usage

### Basic Animation
```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Scroll Trigger with useInView
```tsx
import { useInView } from 'react-intersection-observer';

const { ref, inView } = useInView({ 
  threshold: 0.3,
  triggerOnce: true 
});
```

## React CountUp Integration

### Animated Statistics
```tsx
import CountUp from 'react-countup';

<CountUp
  start={0}
  end={1000}
  duration={2.75}
  useEasing={true}
  preserveValue={true}
/>
```

## React Scroll Setup

### Smooth Scroll Navigation
```tsx
import { scroller } from 'react-scroll';

const scrollToSection = (sectionId: string) => {
  scroller.scrollTo(sectionId, {
    duration: 800,
    delay: 0,
    smooth: 'easing',
    offset: -80,
  });
};
```

## Swiper Carousel Configuration

### Basic Carousel Setup
```tsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

<Swiper
  modules={[Navigation, Pagination, Autoplay]}
  spaceBetween={20}
  slidesPerView={3}
  navigation
  pagination={{ clickable: true }}
  autoplay={{ delay: 5000 }}
>
  {items.map((item, index) => (
    <SwiperSlide key={index}>
      {/* Content */}
    </SwiperSlide>
  ))}
</Swiper>
```

## Embla Carousel Configuration

### Service Carousel
```tsx
import useEmblaCarousel from 'embla-carousel-react';

const [emblaRef] = useEmblaCarousel({
  align: 'start',
  containScroll: 'trimSnaps',
});

<div className="overflow-hidden" ref={emblaRef}>
  {/* Slides */}
</div>
```

## React Hook Form + Zod Validation

### Setup
```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  firstName: z.string().min(2),
  email: z.string().email(),
  message: z.string().max(1000),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(contactSchema),
});
```

## Theme Implementation

### Using CSS Variables
```tsx
// In globals.css, colors are defined as CSS variables
--color-primary: #1E40AF;
--color-secondary: #F59E0B;
--color-tertiary: #059669;
```

### In Tailwind
```tsx
// Automatically available in Tailwind
className="bg-primary text-secondary"
```

### Dark Mode
```tsx
// Automatically applied with next-themes
// In dark mode, variables switch to dark color values
```

## Image Optimization

### Using Next.js Image Component
```tsx
import Image from 'next/image';

<Image
  src="/images/hero-bg.jpg"
  alt="Description"
  width={1200}
  height={600}
  priority
  quality={80}
/>
```

## Performance Monitoring

### Setup Analytics (Optional)
```tsx
// Already included: @vercel/analytics
import { Analytics } from '@vercel/analytics/next';

// Automatically tracks web vitals
```

## Mobile Optimization

### Responsive Design
Tailwind breakpoints are configured:
```
2xs: 320px
xs: 475px  
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Viewport Meta Tag
Already set in layout.tsx:
```tsx
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};
```

## Testing Setup (Optional)

### Install Testing Libraries
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

### Example Test
```tsx
import { render } from '@testing-library/react';
import Hero from '@/components/Hero';

test('Hero renders', () => {
  const { getByRole } = render(<Hero />);
  expect(getByRole('heading')).toBeInTheDocument();
});
```

## Debugging Tips

### Check Console for Errors
```tsx
console.log("[v0] Component mounted");
```

### React DevTools
- Install React DevTools extension
- Inspect component props and state

### Network Tab
- Check image loading
- Verify API calls
- Monitor performance

## Deployment Checklist

- [ ] Update environment variables
- [ ] Test on mobile devices
- [ ] Verify form submissions
- [ ] Check image loading
- [ ] Test SEO meta tags
- [ ] Verify smooth scrolling
- [ ] Check dark mode
- [ ] Test all carousels
- [ ] Verify animations
- [ ] Check accessibility

## Troubleshooting

### Images Not Loading
- Verify image paths in `/public` directory
- Check image formats (JPG, PNG, WebP)
- Use Next.js Image component for optimization

### Form Submission Issues
- Verify EmailJS credentials in .env.local
- Check email template variables
- Monitor console for errors

### Animations Not Showing
- Verify Framer Motion is imported
- Check `useInView` trigger conditions
- Inspect CSS animations in DevTools

### SEO Issues
- Use Google Search Console
- Verify Open Graph tags
- Check robots.txt and sitemap.xml
- Test with Lighthouse

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hook Form Docs](https://react-hook-form.com/)
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [Swiper Docs](https://swiperjs.com/docs/swiper-api)

## Support

For issues and questions:
1. Check the relevant documentation
2. Review error messages in console
3. Search GitHub issues
4. Open a new issue with reproduction steps
