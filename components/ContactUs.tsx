'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
    setSubmitStatus('idle');

    try {
      if (contactMethod === 'whatsapp') {
        // For WhatsApp, format the message and open WhatsApp
        const message = `Name: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.mobileNumber}\n\nMessage: ${data.message}`;
        const whatsappUrl = `${WHATSAPP_URL}&text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } else {
        // For email, call EmailJS (you'll need to set this up separately)
        // For now, we'll simulate it
        const templateParams = {
          to_email: COMPANY_EMAIL,
          from_name: `${data.firstName} ${data.lastName}`,
          from_email: data.email,
          phone: data.mobileNumber,
          message: data.message,
        };

        // Simulate email sending
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // In production, you would call EmailJS here:
        // emailjs.send(
        //   'YOUR_SERVICE_ID',
        //   'YOUR_TEMPLATE_ID',
        //   templateParams,
        //   'YOUR_PUBLIC_KEY'
        // );

        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-background"
    >
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Decorative accent line */}
        <div className="h-1 w-20 bg-secondary rounded-full mx-auto mb-8" />

        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 lg:mb-24">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary dark:text-white mb-4">
            Contact Us
          </h2>
          <p className="text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
            Get in touch with our team. We're here to help you achieve your healthcare goals.
          </p>
        </div>

        {/* Contact Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          {/* Left Column - Contact Information */}
          <div className="space-y-8 md:space-y-10">
            {/* Address */}
            <div className="group">
              <div className="flex gap-4 items-start mb-2">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary dark:text-white mb-2">Address</h4>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm md:text-base text-slate-700 dark:text-slate-300 hover:text-primary transition-colors leading-relaxed underline-offset-2 hover:underline"
                  >
                    {COMPANY_ADDRESS}
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="group">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary dark:text-white mb-2">Phone</h4>
                  <a
                    href={`tel:${COMPANY_PHONE.replace(/\s+/g, '')}`}
                    className="text-sm md:text-base text-slate-700 dark:text-slate-300 hover:text-secondary transition-colors"
                  >
                    {COMPANY_PHONE}
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <div className="flex gap-4 items-start">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-primary dark:text-white mb-2">Email</h4>
                  <a
                    href={`mailto:${COMPANY_EMAIL}`}
                    className="text-sm md:text-base text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
                  >
                    {COMPANY_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="mt-8 md:mt-12">
              <h4 className="font-bold text-primary dark:text-white mb-4">Location</h4>
              <div className="w-full h-80 rounded-xl overflow-hidden border border-primary/20 dark:border-primary/30 hover:border-secondary dark:hover:border-secondary transition-colors shadow-md">
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
            <div className="pt-8 md:pt-12 border-t border-primary/10 dark:border-primary/20">
              <h4 className="font-bold text-primary dark:text-white mb-6">Follow Us</h4>
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
              <div className="gradient-card dark:bg-gray-800 rounded-2xl p-8 md:p-10 border border-primary/10 dark:border-primary/20 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-primary dark:text-white mb-6">Get in Touch</h3>

            {/* Contact Method Selector */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setContactMethod('email')}
                className={`flex-1 px-4 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${
                  contactMethod === 'email'
                    ? 'bg-[#193358] text-white shadow-md hover:bg-[#A7833F]'
                    : 'bg-white dark:bg-slate-800 text-[#193358] dark:text-[#A7833F] hover:bg-[#193358]/5 border border-[#193358]'
                }`}
              >
                Email
              </button>
              <button
                onClick={() => setContactMethod('whatsapp')}
                className={`flex-1 px-4 py-2 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base ${
                  contactMethod === 'whatsapp'
                    ? 'bg-[#A7833F] text-white shadow-md hover:bg-[#193358]'
                    : 'bg-white dark:bg-slate-800 text-[#A7833F] dark:text-[#193358] hover:bg-[#A7833F]/5 border border-[#A7833F]'
                }`}
              >
                WhatsApp
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
              {/* First Name */}
              <div>
                <label className="block text-sm font-semibold text-[#193358] dark:text-white mb-2">
                  First Name
                </label>
                <input
                  {...register('firstName')}
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#193358] focus:border-[#A7833F] focus:ring-2 focus:ring-[#A7833F]/20 bg-white dark:bg-slate-800 transition-all outline-none shadow-sm"
                />
                {errors.firstName && (
                  <p className="text-error text-xs md:text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm font-semibold text-[#193358] dark:text-white mb-2">
                  Last Name
                </label>
                <input
                  {...register('lastName')}
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#193358] focus:border-[#A7833F] focus:ring-2 focus:ring-[#A7833F]/20 bg-white dark:bg-slate-800 transition-all outline-none shadow-sm"
                />
                {errors.lastName && (
                  <p className="text-error text-xs md:text-sm mt-1 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#193358] dark:text-white mb-2">
                  Email
                </label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#193358] focus:border-[#A7833F] focus:ring-2 focus:ring-[#A7833F]/20 bg-white dark:bg-slate-800 transition-all outline-none shadow-sm"
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
                <label className="block text-sm font-semibold text-[#193358] dark:text-white mb-2">
                  Mobile Number
                </label>
                <input
                  {...register('mobileNumber')}
                  type="tel"
                  placeholder="9876543210"
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#193358] focus:border-[#A7833F] focus:ring-2 focus:ring-[#A7833F]/20 bg-white dark:bg-slate-800 transition-all outline-none shadow-sm"
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
                <label className="block text-sm font-semibold text-[#193358] dark:text-white mb-2">
                  Message (Max 1000 characters)
                </label>
                <textarea
                  {...register('message')}
                  placeholder="Your message here..."
                  rows={5}
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-lg border-2 border-[#193358] focus:border-[#A7833F] focus:ring-2 focus:ring-[#A7833F]/20 bg-white dark:bg-slate-800 transition-all outline-none resize-none shadow-sm"
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
                disabled={isSubmitting}
                className={`w-full px-6 py-3 md:py-4 font-semibold rounded-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-lg flex items-center justify-center gap-2 text-sm md:text-base ${
                  contactMethod === 'whatsapp'
                    ? 'bg-[#A7833F] text-white hover:bg-[#193358]'
                    : 'bg-[#193358] text-white hover:bg-[#A7833F]'
                }`}
              >
                {isSubmitting && <Loader size={20} className="animate-spin" />}
                {isSubmitting
                  ? 'Sending...'
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
