import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import checkoutBg from '../assets/checkout_bg.jpg';

// Mock tracking function
const trackEvent = (eventName, data = {}) => {
  console.log(`[Tracking] Event: ${eventName}`, data);
};

export default function CheckoutFlow() {
  const [form, setForm] = useState({
    fullName: '',
    companyName: '',
    organization: '',
    workEmail: '',
    phoneNumber: '',
    industry: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = 'Required';
    if (!form.companyName.trim()) newErrors.companyName = 'Required';
    if (!form.workEmail.trim() || !/\S+@\S+\.\S+/.test(form.workEmail)) newErrors.workEmail = 'Invalid Email';
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = 'Required';
    if (!form.industry) newErrors.industry = 'Required';
    return newErrors;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    trackEvent('inquiry_submitted', { timestamp: new Date().toISOString() });

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      const res = await fetch('https://formspree.io/f/mgodeozn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.fullName,
          designation: form.companyName,
          organization: form.workEmail,   // mapped as per current field order
          phone: form.phoneNumber,
          industry: form.industry,
          email: form.workEmail,
          message: form.message,
        }),
      });

      if (res.ok) {
        setShowModal(true);
        setForm({ fullName: '', companyName: '', workEmail: '', phoneNumber: '', industry: '', message: '' });
      } else {
        showToast('Submission failed. Please try again.');
      }
    } catch {
      showToast('Network error. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <section
      id="section_2c"
      className="relative py-20 md:py-32 px-6 md:px-16 lg:px-24 overflow-hidden font-['Inter',sans-serif] text-[#1a1a1a]"
      style={{
        backgroundImage: `url(${checkoutBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Subtle Grain Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
      />

      <div className="max-w-7xl mx-auto w-full relative z-10">

        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-[11px] uppercase tracking-[0.5em] text-[#1B2D6E] font-bold">
              Get In Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-[#1B2D6E] font-['Space_Grotesk']">
            Interested in <span className="text-[#3FE56C] drop-shadow-sm">ITSSAFE?</span>
          </h2>
          <p className="text-[#1a1a1a]/70 text-lg md:text-xl font-normal max-w-2xl leading-relaxed">
            Tell us about your organisation and requirements. Our team will reach out to you within 48 Buisiness hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">

          {/* Left: Product Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative bg-blue-50 rounded-[3rem] p-10 md:p-14 border border-black/5 overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900 blur-[100px] rounded-full -mr-20 -mt-20 transition-colors duration-700" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-12">
                <div className="px-4 py-1.5 bg-[#1B2D6E]/5 text-[#1B2D6E] text-[10px] font-bold rounded-lg uppercase tracking-widest border border-[#1B2D6E]/10">
                  Product Details
                </div>
              </div>

              <h3 className="text-4xl font-bold text-[#1B2D6E] mb-6 tracking-tight font-['Space_Grotesk']">Human Safety Bands</h3>
              <p className="text-[#1a1a1a]/70 text-xl leading-relaxed mb-6 max-w-sm">
                Next-gen neural safety interface with multi-modal sensor fusion. Built for the extreme. Key Features :
              </p>
              <div className="grid grid-cols-1 gap-1">
                {[
                  { l: 'Heart Rate ', v: 'Active ECG' },
                  { l: 'Sweat Rate', v: 'Active EDA' },
                  { l: 'SpO2', v: 'Real-time SpO2' },
                  { l: 'Smart Alerts', v: 'Instant Notifications' },
                  { l: 'AI Prediction ', v: 'In Real Time' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-gray-50 border border-black/5 hover:border-[#1B2D6E]/20 transition-all">
                    <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-[#1a1a1a]/50">{item.l}</span>
                    <span className="text-sm font-bold text-[#1B2D6E]">{item.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact Interest Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-[3rem] p-10 md:p-14 border border-black/5 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-[#1B2D6E] mb-2 tracking-tight font-['Space_Grotesk']">Invite Us to implement First</h3>
            <p className="text-[#1a1a1a]/50 text-sm mb-10">Fill out the form and we'll get back to you shortly.</p>

            <form onSubmit={handleCheckout} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6">
              {/* Full Name */}
              <div className="col-span-1">
                <label className="text-[9px] uppercase tracking-[0.4em] text-[#1B2D6E] font-bold mb-3 block ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Your Full Name"
                  className={`w-full bg-gray-50 border ${errors.fullName ? 'border-red-400' : 'border-black/10'} px-6 py-4 rounded-2xl text-[#1a1a1a] text-sm focus:outline-none focus:border-[#1B2D6E] focus:ring-1 focus:ring-[#1B2D6E]/30 transition-all placeholder:text-black/30`}
                  value={form.fullName}
                  onChange={e => setForm({ ...form, fullName: e.target.value })}
                />
                {errors.fullName && <p className="text-red-400 text-[10px] mt-1 ml-2">{errors.fullName}</p>}
              </div>

              {/* Company */}
              <div className="col-span-1">
                <label className="text-[9px] uppercase tracking-[0.4em] text-[#1B2D6E] font-bold mb-3 block ml-1">Designation</label>
                <input
                  type="text"
                  placeholder="Designation"
                  className={`w-full bg-gray-50 border ${errors.companyName ? 'border-red-400' : 'border-black/10'} px-6 py-4 rounded-2xl text-[#1a1a1a] text-sm focus:outline-none focus:border-[#1B2D6E] focus:ring-1 focus:ring-[#1B2D6E]/30 transition-all placeholder:text-black/30`}
                  value={form.companyName}
                  onChange={e => setForm({ ...form, companyName: e.target.value })}
                />
                {errors.companyName && <p className="text-red-400 text-[10px] mt-1 ml-2">{errors.companyName}</p>}
              </div>

              {/* Organization */}
              <div className="col-span-1">
                <label className="text-[9px] uppercase tracking-[0.4em] text-[#1B2D6E] font-bold mb-3 block ml-1">Organization</label>
                <input
                  type="text"
                  placeholder="Your Organization"
                  className={`w-full bg-gray-50 border ${errors.organization ? 'border-red-400' : 'border-black/10'} px-6 py-4 rounded-2xl text-[#1a1a1a] text-sm focus:outline-none focus:border-[#1B2D6E] focus:ring-1 focus:ring-[#1B2D6E]/30 transition-all placeholder:text-black/30`}
                  value={form.organization}
                  onChange={e => setForm({ ...form, organization: e.target.value })}
                />
                {errors.organization && <p className="text-red-400 text-[10px] mt-1 ml-2">{errors.organization}</p>}
              </div>

              {/* Phone */}
              <div className="col-span-1">
                <label className="text-[9px] uppercase tracking-[0.4em] text-[#1B2D6E] font-bold mb-3 block ml-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Your Number"
                  className={`w-full bg-gray-50 border ${errors.phoneNumber ? 'border-red-400' : 'border-black/10'} px-6 py-4 rounded-2xl text-[#1a1a1a] text-sm focus:outline-none focus:border-[#1B2D6E] focus:ring-1 focus:ring-[#1B2D6E]/30 transition-all placeholder:text-black/30`}
                  value={form.phoneNumber}
                  onChange={e => setForm({ ...form, phoneNumber: e.target.value })}
                />
                {errors.phoneNumber && <p className="text-red-400 text-[10px] mt-1 ml-2">{errors.phoneNumber}</p>}
              </div>

              {/* Industry */}
              <div className="col-span-1">
                <label className="text-[9px] uppercase tracking-[0.4em] text-[#1B2D6E] font-bold mb-3 block ml-1">Industry</label>
                <select
                  className={`w-full bg-gray-50 border ${errors.industry ? 'border-red-400' : 'border-black/10'} px-6 py-4 rounded-2xl text-[#1a1a1a] text-sm focus:outline-none focus:border-[#1B2D6E] focus:ring-1 focus:ring-[#1B2D6E]/30 transition-all appearance-none cursor-pointer`}
                  value={form.industry}
                  onChange={e => setForm({ ...form, industry: e.target.value })}
                >
                  <option value="" disabled>Sector?</option>
                  <option value="Mining">Mining</option>
                  <option value="Energy">Oil & Gas / Energy</option>
                  <option value="Construction">Construction</option>
                  <option value="Industrial">Heavy Industrial</option>
                  <option value="Other">Other</option>
                </select>
                {errors.industry && <p className="text-red-400 text-[10px] mt-1 ml-2">{errors.industry}</p>}
              </div>
              {/* Work Email */}
              <div className="col-span-1">
                <label className="text-[9px] uppercase tracking-[0.4em] text-[#1B2D6E] font-bold mb-3 block ml-1">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className={`w-full bg-gray-50 border ${errors.workEmail ? 'border-red-400' : 'border-black/10'} px-6 py-4 rounded-2xl text-[#1a1a1a] text-sm focus:outline-none focus:border-[#1B2D6E] focus:ring-1 focus:ring-[#1B2D6E]/30 transition-all placeholder:text-black/30`}
                  value={form.workEmail}
                  onChange={e => setForm({ ...form, workEmail: e.target.value })}
                />
                {errors.workEmail && <p className="text-red-400 text-[10px] mt-1 ml-2">{errors.workEmail}</p>}
              </div>

              {/* Message */}
              <div className="col-span-full">
                <label className="text-[9px] uppercase tracking-[0.4em] text-[#1B2D6E] font-bold mb-3 block ml-1">Message / Requirements</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your safety challenges and what you're looking for..."
                  className="w-full bg-gray-50 border border-black/10 px-6 py-4 rounded-2xl text-[#1a1a1a] text-sm focus:outline-none focus:border-[#1B2D6E] focus:ring-1 focus:ring-[#1B2D6E]/30 transition-all placeholder:text-black/30 resize-none"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="col-span-full mt-2 w-full bg-[#1B2D6E] text-white py-5 rounded-[1.5rem] font-bold text-sm uppercase tracking-[0.3em] shadow-lg hover:shadow-xl hover:bg-[#253b8d] hover:scale-[1.02] transition-all active:scale-[0.98] flex items-center justify-center gap-4"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Send Inquiry</span>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>

      {/* Modal & Toast */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1a1a1a]/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[3rem] p-12 max-w-sm w-full text-center border border-black/10 shadow-2xl"
            >
              <div className="w-20 h-20 bg-[#1B2D6E]/5 rounded-full mx-auto mb-10 flex items-center justify-center text-4xl border border-[#1B2D6E]/10 relative">
                ☺️
                <div className="absolute inset-0 rounded-full animate-ping bg-[#1B2D6E]/10" />
              </div>
              <h3 className="text-3xl font-bold text-[#1B2D6E] mb-3 tracking-tighter font-['Space_Grotesk']">We Hear You!!.</h3>
              <p className="text-[#1a1a1a]/70 mb-10 text-sm leading-relaxed">Your inquiry for our product,Human Safety Bands has been prioritized.Currently Our Product Development is in last Testing Stage. As per of your interest WE WILL PRIORITIZE YOU AND GET BACK TO YOU SOON.</p>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-[#1B2D6E] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all hover:bg-[#253b8d]"
              >
                Return to Site
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[60] bg-white border border-black/10 shadow-xl flex items-center gap-4 px-8 py-4 rounded-full"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#3FE56C] animate-pulse" />
            <span className="text-xs font-bold uppercase text-[#1B2D6E] tracking-[0.4em]">{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
