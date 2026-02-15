'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import emailjs from '@emailjs/browser';
import {
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  Check,
  AlertCircle,
  Loader,
} from 'lucide-react';
import { contactFormSchema, type ContactFormData } from '@/lib/validations';
import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  MAPS_URL,
  WHATSAPP_URL,
} from '@/lib/constants';

export default function ContactUs() {
  const [contactMethod, setContactMethod] = useState<'email' | 'whatsapp'>('email');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    if (typeof window !== 'undefined') {
      emailjs.init(process.env.NEXT_PUBLIC_EMAILJSPUBKEY || '');
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      contactMethod: 'email',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setIsLoading(true);
    setSubmitStatus('idle');

    try {
      if (contactMethod === 'whatsapp') {
        // For WhatsApp, format the message and open WhatsApp
        const message = `Hello, I would like to connect with CHS.\n\nName: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.mobileNumber}\n\nMessage: ${data.message}`;

        // Use environment variable for WhatsApp mobile number
        const whatsappMobile = process.env.NEXT_PUBLIC_WHATSAPP_MOBILE || '919923336312';
        const whatsappUrl = `https://wa.me/${whatsappMobile}?text=${encodeURIComponent(message)}`;

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        window.open(whatsappUrl, '_blank');
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        // For email, use EmailJS to send
        const templateParams = {
          to_email: COMPANY_EMAIL,
          from_name: `${data.firstName} ${data.lastName}`,
          from_email: data.email,
          phone: data.mobileNumber,
          message: data.message,
        };

        try {
          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
            templateParams,
            process.env.NEXT_PUBLIC_EMAILJSPUBKEY || ''
          );

          setSubmitStatus('success');
          reset();
          setTimeout(() => setSubmitStatus('idle'), 3000);
        } catch (emailError) {
          console.error('EmailJS Error:', emailError);
          setSubmitStatus('error');
          setTimeout(() => setSubmitStatus('idle'), 3000);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-16 md:py-24 lg:py-32 bg-white"
    >
      <div className="max-w-[90%] mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Decorative accent line */}
        <div className="h-1 w-44 bg-secondary rounded-full mx-auto mb-4" />
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Contact Us
          </div>
          <div className="text-base md:text-lg text-gray-dark max-w-2xl mx-auto">
            Get in touch with our team. We're here to help you achieve your healthcare goals.
          </div>
        </div>

        {/* Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column - Contact Information */}
          <div className="space-y-8 md:space-y-10">
            {/* Address */}
            <div className="group">
              <div className="flex gap-4 items-start mb-2">
                <div className="shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-primary mb-2">Address</div>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-base text-slate-700 hover:text-primary transition-colors leading-relaxed underline-offset-2 hover:underline"
                  >
                    {COMPANY_ADDRESS}
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="group">
              <div className="flex gap-4 items-start">
                <div className="shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary mb-2">Phone</h4>
                  <a
                    href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`}
                    className="text-sm md:text-base text-slate-700  transition-colors"
                  >
                    {COMPANY_PHONE}
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <div className="flex gap-4 items-start">
                <div className="shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary mb-2">Email</h4>
                  <a
                    href={`mailto:${COMPANY_EMAIL}`}
                    className="text-sm md:text-base text-slate-700 hover:text-primary transition-colors"
                  >
                    {COMPANY_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="mt-8 md:mt-12">
              <h4 className="font-bold text-primary mb-4">Location</h4>
              <div className="w-full h-80 rounded-xl overflow-hidden border border-primary/20 hover:border-secondary transition-colors shadow-md">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15010.801843788226!2d75.8853149!3d19.8526232!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bda571790eda287%3A0xcd43302fb9f7e845!2sAadhar%20Hospital%20and%20ICU%20-%20Best%20Multi-speciality%20Hospital%20in%20Jalna!5e0!3m2!1sen!2sin!4v1770049716901!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Follow Us */}
            <div className="pt-8 md:pt-12 border-t border-primary/10">
              <h4 className="font-bold text-primary mb-6">Follow Us</h4>
              <div className="flex gap-4 flex-wrap">
                {[
                  { icon: Linkedin, url: 'https://linkedin.com/company/chatushtya-health-services', label: 'LinkedIn' },
                  { icon: Youtube, url: 'https://youtube.com/@chshealthservices', label: 'YouTube' },
                  { icon: Instagram, url: 'https://instagram.com/chshealthservices', label: 'Instagram' },
                  { icon: Facebook, url: 'https://facebook.com/chshealthservices', label: 'Facebook' },
                ].map(({ icon: Icon, url, label }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10 hover:bg-primary hover:text-white text-primary transition-all duration-300 hover:shadow-md"
                    aria-label={label}
                  >
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="gradient-card rounded-2xl p-8 md:p-10 border border-primary/10 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6">Get in Touch</h3>

            {/* Loading Overlay */}
            {isLoading && (
              <div className="fixed inset-0 bg-black/50 w-full h-full flex flex-col items-center justify-center z-50 py-10 rounded-2xl text-center mb-4">
                <div className="flex flex-col items-center justify-center rounded-xl bg-white/90 py-8 px-6">
                  <div className="flex items-center justify-center rounded-full mb-6">
                    <Image
                      src="/images/logo.png"
                      alt="CHS Logo"
                      width={200}
                      height={200}
                      className="flex relative object-contain animate-pulse"
                    />
                  </div>
                  <div className="text-primary font-semibold text-base lg:text-xl italic">
                    {contactMethod === 'whatsapp' ? 'Opening WhatsApp...' : 'Sending Message...'}
                  </div>
                </div>
              </div>
            )}

            {/* Contact Method Selector */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setContactMethod('email')}
                className={`flex-1 px-4 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${contactMethod === 'email'
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-white text-primary border border-primary'
                  }`}
              >
                Email
              </button>
              <button
                onClick={() => setContactMethod('whatsapp')}
                className={`flex-1 px-4 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${contactMethod === 'whatsapp'
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-white text-secondary border border-secondary'
                  }`}
              >
                WhatsApp
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              {/* First Name */}
              <div className='flex items-center justify-center w-full gap-4'>
                <div className='flex flex-col w-full'>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    First Name
                  </label>
                  <input
                    {...register('firstName')}
                    type="text"
                    placeholder="John"
                    className="w-full px-4 py-3 rounded-lg border-2 border-primary focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-white transition-all outline-none shadow-sm"
                  />
                  {errors.firstName && (
                    <p className="text-error text-xs md:text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className='flex flex-col w-full'>
                  <label className="block text-sm font-semibold text-primary mb-2">
                    Last Name
                  </label>
                  <input
                    {...register('lastName')}
                    type="text"
                    placeholder="Doe"
                    className="w-full px-4 py-3 rounded-lg border-2 border-primary focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-white transition-all outline-none shadow-sm"
                  />
                  {errors.lastName && (
                    <p className="text-error text-xs md:text-sm mt-1 flex items-center gap-1">
                      <AlertCircle size={16} />
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Last Name */}


              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border-2 border-primary focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-white transition-all outline-none shadow-sm"
                />
                {errors.email && (
                  <p className="text-error text-xs md:text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Mobile Number
                </label>
                <input
                  {...register('mobileNumber')}
                  type="tel"
                  placeholder="9876543210"
                  className="w-full px-4 py-3 rounded-lg border-2 border-primary focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-white transition-all outline-none shadow-sm"
                />
                {errors.mobileNumber && (
                  <p className="text-error text-xs md:text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.mobileNumber.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Message (Max 1000 characters)
                </label>
                <textarea
                  {...register('message')}
                  placeholder="Your message here..."
                  rows={5}
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-lg border-2 border-primary focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-white transition-all outline-none resize-none shadow-sm"
                />
                {errors.message && (
                  <p className="text-error text-xs md:text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 md:p-4 bg-success/10 border border-success rounded-lg flex items-center gap-2 text-success">
                  <Check size={20} />
                  <span className="text-sm md:text-base">
                    {contactMethod === 'whatsapp'
                      ? 'Redirecting to WhatsApp...'
                      : 'Message sent successfully! We\'ll be in touch soon.'}
                  </span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 md:p-4 bg-error/10 border border-error rounded-lg flex items-center gap-2 text-error">
                  <AlertCircle size={20} />
                  <span className="text-sm md:text-base">
                    Failed to send message. Please try again.
                  </span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                className={`w-full px-6 py-3 md:py-4 font-semibold rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg flex items-center justify-center gap-2 text-sm md:text-base ${contactMethod === 'whatsapp'
                  ? 'bg-secondary text-white hover:bg-primary'
                  : 'bg-primary text-white hover:bg-secondary'
                  }`}
              >
                {(isSubmitting || isLoading) && <Loader size={20} className="animate-spin" />}
                {isSubmitting || isLoading
                  ? contactMethod === 'whatsapp'
                    ? 'Sending to WhatsApp...'
                    : 'Sending Message...'
                  : contactMethod === 'whatsapp'
                    ? 'Send via WhatsApp'
                    : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
