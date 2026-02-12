# 🚀 Quick Start Guide - CHS Website

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Customization Checklist

### Must Customize
- [ ] Change company information in `/lib/constants.ts`
- [ ] Update logo image: `/public/images/chs-logo.jpg`
- [ ] Replace hero background: `/public/images/hero-bg.jpg`
- [ ] Add team member photos: `/public/images/leaders/`
- [ ] Add gallery images: `/public/images/gallery/`

### Nice to Have
- [ ] Update theme colors in `/app/globals.css`
- [ ] Customize taglines in `/lib/constants.ts`
- [ ] Add your social media links
- [ ] Set up WhatsApp number
- [ ] Configure contact details

## 📝 Key Files to Edit

### Company Content
**File**: `/lib/constants.ts`

Key constants to update:
```typescript
export const SITE_NAME = 'Your Company Name';
export const COMPANY_EMAIL = 'your-email@company.com';
export const COMPANY_PHONE = '+91-XXXXX-XXXXX';
export const COMPANY_ADDRESS = 'Your address here';
export const WHATSAPP_NUMBER = '919876543210';
```

### Colors & Theme
**File**: `/app/globals.css`

Update CSS variables in `:root` section:
```css
:root {
  --color-primary: #YourBlueColor;
  --color-secondary: #YourTealColor;
  --color-tertiary: #YourOrangeColor;
}
```

### Metadata & SEO
**File**: `/app/layout.tsx`

Update metadata:
```typescript
export const metadata: Metadata = {
  title: 'Your Company | Your Tagline',
  description: 'Your company description',
  // ... other metadata
};
```

## 🖼️ Image Placeholder Locations

Replace these with your actual images:

| Location | Purpose | Recommended Size |
|----------|---------|-----------------|
| `/public/images/chs-logo.jpg` | Logo | 200x200px |
| `/public/images/hero-bg.jpg` | Hero section | 1920x1080px |
| `/public/images/leaders/*.jpg` | Team members | 400x500px |
| `/public/images/gallery/*.jpg` | Gallery images | 600x400px minimum |
| `/public/og-image.jpg` | Social sharing | 1200x630px |

## 🎨 Theme Colors Reference

### Current Theme
- **Primary**: Deep Blue (#0A4D8C)
- **Secondary**: Teal (#00A896)
- **Tertiary**: Orange (#FF6B35)

### Where Used
- **Primary**: Headers, buttons, links, icons
- **Secondary**: Accents, highlights, gradients
- **Tertiary**: Warnings, special features

## 📱 Test Your Changes

### Desktop (1280px+)
```bash
npm run dev
# Open browser devtools, no device emulation
```

### Tablet (768px-1024px)
```bash
# In Chrome DevTools: Toggle device toolbar
# Select iPad or similar
```

### Mobile (320px-640px)
```bash
# In Chrome DevTools: Toggle device toolbar
# Select iPhone 12 or similar
```

## 🔗 Important Links

| Section | Link | Edit File |
|---------|------|-----------|
| Navbar Links | `#home`, `#about`, etc. | `/components/Navbar.tsx` |
| Contact Info | Phone, Email, Address | `/lib/constants.ts` |
| Services | What We Do, Services | `/lib/constants.ts` |
| Team | Leadership team | `/lib/constants.ts` |
| Clients | Client info | `/lib/constants.ts` |

## 🚀 Deploy to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Deploy CHS website"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Click "Deploy"

**That's it!** Your site is live! 🎉

## 🐛 Common Issues & Solutions

### Images not showing?
- Check file path is correct
- Ensure images are in `/public/` directory
- Rebuild: `npm run build`

### Styling looks wrong?
- Clear cache: `rm -rf .next`
- Restart dev server
- Check Tailwind classes are correct

### Form not working?
- Verify mobile number format (10 digits)
- Check email format is valid
- Ensure message is 10-1000 characters

### Colors not changing?
- Update CSS variables in `/app/globals.css`
- Make sure to save the file
- Restart dev server

## 📊 Project Structure at a Glance

```
Next.js App
  ├─ 10 React Components
  ├─ Fully Responsive
  ├─ Form Validation
  ├─ Modal/Lightbox
  ├─ Animations
  └─ Deployed!
```

## 💡 Pro Tips

1. **Mobile First**: Test on mobile first, then desktop
2. **Content**: Keep text concise and compelling
3. **Images**: Use high-quality images for best appearance
4. **Links**: Test all links work before deploying
5. **Forms**: Test contact form before going live
6. **SEO**: Update metadata in `layout.tsx`
7. **Colors**: Test color combinations for accessibility

## 📞 Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **React Hook Form**: https://react-hook-form.com/
- **Zod Validation**: https://zod.dev/

## ✅ Pre-Launch Checklist

- [ ] All images replaced with yours
- [ ] Company information updated
- [ ] Contact details verified
- [ ] Colors customized
- [ ] Links tested
- [ ] Contact form tested
- [ ] Mobile view verified
- [ ] SEO metadata set
- [ ] Social media links added
- [ ] Deployed to production

## 🎉 You're Ready!

Your professional CHS website is ready to launch! 

**Next Steps**:
1. Customize content in `/lib/constants.ts`
2. Replace images in `/public/`
3. Test on mobile and desktop
4. Deploy to Vercel
5. Share with your team!

---

**Questions?** Check the full README.md and IMPLEMENTATION.md files for detailed documentation.

Happy building! 🚀
