import { z } from 'zod';

// Contact form validation schema
export const contactFormSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]*$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]*$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  
  mobileNumber: z.string()
    .regex(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
    .or(z.string().regex(/^\+91[0-9]{10}$/, 'Mobile number must be valid Indian format')),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters')
    .regex(/^[a-zA-Z0-9\s.,!?'-]*$/, 'Message contains invalid characters'),
  
  contactMethod: z.enum(['email', 'whatsapp']),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

// Service types
export interface ServiceItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  items: string[];
}

// Leadership team member
export interface TeamMember {
  id: string;
  name: string;
  title: string;
  description: string;
  image?: string;
}

// Client information
export interface Client {
  id: string;
  name: string;
  logoText: string;
  title: string;
  description: string;
}

// What we do items
export interface ServiceFeature {
  id: string;
  title: string;
  icon: string;
  description: string;
}

// Gallery item
export interface GalleryItem {
  id: string;
  image: string;
  description: string;
  alt: string;
}
