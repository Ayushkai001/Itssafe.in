import React from 'react';
import logo from '../assets/itssafe_logo.png';

export default function Footer() {
  return (
    <footer className="bg-cyan-900 text-white pt-32 pb-12 border-t border-white/[0.05]" id="contact">
      <div className="max-w-6xl mx-auto px-6 md:px-16">

        {/* Top brand strip */}
        <div className="border-b border-white/[0.06] pb-16 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-md">
            <div className="mb-8 inline-block bg-white rounded-xl px-4 py-2 shadow-sm">
              <img src={logo} alt="ITS SAFE Solutions" className="h-10 w-auto object-contain" />
            </div>
            <p className="font-['Inter'] font-light text-white/40 text-sm leading-relaxed">
              Engineering the safety systems that protect the humans who build our world. Industrial AI headquartered in Dhanbad, India .
            </p>
          </div>

          {/* Leadership quote */}
          <div className="max-w-xs">

            <blockquote className="font-['Inter'] font-light text-white/50 text-sm italic leading-relaxed mb-4">
              "Because every worker deserves to return home."
            </blockquote>
            <span className="font-['Space_Grotesk'] font-semibold text-white/70 text-xs uppercase tracking-widest">
              — Founders, ITSSAFE SOLUTIONS
            </span>
          </div>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24 text-sm font-['Inter']">
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-[0.2em] text-[11px]">Company</h4>
            <ul className="space-y-4 text-white/40">
              <li><a href="#section_1a" className="hover:text-white transition-colors duration-200">About Us</a></li>
              <li><a href="#section_1c" className="hover:text-white transition-colors duration-200">What Research Says</a></li>
              <li><a href="#section_1a" className="hover:text-white transition-colors duration-200">Our Focus Area</a></li>
              <li><a href="#section_2c" className="hover:text-white transition-colors duration-200">Secure Early Access</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-[0.2em] text-[11px]">Support</h4>
            <ul className="space-y-4 text-white/40">
              <li><a href="mailto:itssafewithus@itssafe.in" className="hover:text-white transition-colors duration-200">Help Center</a></li>
              <li><a href="https://www.linkedin.com/company/itssafe-solutions-pvt-ltd/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">Community</a></li>
              <li><a href="mailto:itssafewithus@itssafe.in?subject=Query" className="hover:text-white transition-colors duration-200">Query</a></li>
              <li><a href="#section_2c" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-[0.2em] text-[11px]">Legal</h4>
            <ul className="space-y-4 text-white/40">
              <li><a href="mailto:itssafewithus@itssafe.in?subject=Policy+Inquiry" className="hover:text-white transition-colors duration-200">Our Policy</a></li>
              <li><a href="mailto:itssafewithus@itssafe.in?subject=Terms+of+Service" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
              <li><a href="mailto:itssafewithus@itssafe.in?subject=ISO+Certifications" className="hover:text-white transition-colors duration-200">ISO Certifications</a></li>
              <li><a href="mailto:itssafewithus@itssafe.in?subject=Security" className="hover:text-white transition-colors duration-200">Security</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/[0.05] text-xs text-white/25 font-['Inter'] gap-4">
          <p>© 2026 ITS SAFE Solutions Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6 uppercase tracking-widest">
            <a href="https://www.linkedin.com/company/itssafe-solutions-pvt-ltd/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">LinkedIn</a>
            <a href="mailto:itssafewithus@itssafe.in" className="hover:text-white transition-colors duration-200">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
