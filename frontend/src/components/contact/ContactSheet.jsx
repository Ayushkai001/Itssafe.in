import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { EASE_OUT } from '../../lib/motion';

const ENDPOINT = 'https://formspree.io/f/mgodeozn';
const EMPTY = { name: '', designation: '', organization: '', email: '', phone: '', industry: '', message: '' };
const INDUSTRIES = ['Mining', 'Oil & Gas / Energy', 'Construction', 'Heavy industrial', 'Other'];

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Enter your full name.';
  if (!v.designation.trim()) e.designation = 'Enter your designation.';
  if (!v.organization.trim()) e.organization = 'Enter your organization.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address.';
  if ((v.phone.match(/\d/g) || []).length < 7 || /[^\d\s()+-]/.test(v.phone)) e.phone = 'Enter a valid phone number.';
  if (!v.industry) e.industry = 'Choose your industry.';
  return e;
}

export default function ContactSheet({ open, onClose }) {
  const reduce = useReducedMotion();
  const uid = useId();
  const firstFieldRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed

  // Lock page scroll, close on Escape, and manage focus while the sheet is open.
  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    const t = window.setTimeout(() => firstFieldRef.current?.focus({ preventScroll: true }), 60);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKey);
      root.style.overflow = prevOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  const set = (key) => (e) => {
    const value = e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const reset = () => {
    setValues(EMPTY);
    setErrors({});
    setStatus('idle');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    const found = validate(values);
    setErrors(found);
    const firstInvalid = Object.keys(EMPTY).find((k) => found[k]);
    if (firstInvalid) {
      document.getElementById(`${uid}-${firstInvalid}`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      const honeypot = e.currentTarget.elements.namedItem('_gotcha')?.value ?? '';
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          designation: values.designation.trim(),
          organization: values.organization.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          industry: values.industry,
          message: values.message.trim(),
          _subject: `Warble AI inquiry — ${values.organization.trim()}`,
          _gotcha: honeypot,
        }),
      });
      setStatus(res.ok ? 'sent' : 'failed');
    } catch {
      setStatus('failed');
    }
  };

  const field = (key, label, { type = 'text', autoComplete, full = false, inputMode, ref } = {}) => {
    const id = `${uid}-${key}`;
    const err = errors[key];
    return (
      <div className={`field${full ? ' field--full' : ''}`} data-invalid={err ? 'true' : undefined}>
        <input
          ref={ref}
          id={id}
          name={key}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder=" "
          className="field__control"
          value={values[key]}
          onChange={set(key)}
          aria-invalid={err ? true : undefined}
          aria-describedby={err ? `${id}-error` : undefined}
          required
        />
        <label htmlFor={id} className="field__label">
          {label}
        </label>
        {err ? (
          <p id={`${id}-error`} className="field__error">
            {err}
          </p>
        ) : null}
      </div>
    );
  };

  const sheetMotion = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 48, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 32, scale: 0.98 },
      };

  return createPortal(
    <AnimatePresence onExitComplete={() => status === 'sent' && reset()}>
      {open ? (
        <div key="contact-sheet">
          <m.div
            className="sheet-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
          <div
            className="sheet-viewport"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <m.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${uid}-title`}
              aria-describedby={`${uid}-intro`}
              className="sheet"
              transition={{ duration: 0.55, ease: EASE_OUT }}
              {...sheetMotion}
            >
              <button type="button" className="sheet__close" onClick={onClose} aria-label="Close">
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M1 1l10 10M11 1 1 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>

              {status === 'sent' ? (
                <div className="py-6 text-center" aria-live="polite">
                  <div className="mx-auto grid size-16 place-items-center rounded-full bg-ember-soft text-ember">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 id={`${uid}-title`} className="sheet__title mt-6">
                    Thank you.
                  </h2>
                  <p id={`${uid}-intro`} className="sheet__intro mx-auto max-w-md">
                    Your interest in Warble AI has been received. Our team will get back to you within 48 business hours.
                  </p>
                  <button type="button" className="btn mt-8" onClick={onClose}>
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <p className="t-tile-eyebrow">Get in touch</p>
                  <h2 id={`${uid}-title`} className="sheet__title">
                    Bring Warble&nbsp;AI to your site.
                  </h2>
                  <p id={`${uid}-intro`} className="sheet__intro">
                    Tell us about your organisation and requirements. We’ll reach out within 48 business hours.
                  </p>

                  <form className="form" onSubmit={onSubmit} noValidate>
                    {field('name', 'Full name', { autoComplete: 'name', ref: firstFieldRef })}
                    {field('designation', 'Designation', { autoComplete: 'organization-title' })}
                    {field('organization', 'Organization', { autoComplete: 'organization' })}
                    {field('email', 'Work email', { type: 'email', autoComplete: 'email', inputMode: 'email' })}
                    {field('phone', 'Phone number', { type: 'tel', autoComplete: 'tel', inputMode: 'tel' })}

                    <div className="field" data-invalid={errors.industry ? 'true' : undefined}>
                      <select
                        id={`${uid}-industry`}
                        name="industry"
                        className="field__control"
                        value={values.industry}
                        onChange={set('industry')}
                        data-filled={values.industry ? 'true' : undefined}
                        aria-invalid={errors.industry ? true : undefined}
                        aria-describedby={errors.industry ? `${uid}-industry-error` : undefined}
                        required
                      >
                        <option value="" disabled hidden />
                        {INDUSTRIES.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                      <label htmlFor={`${uid}-industry`} className="field__label">
                        Industry
                      </label>
                      {errors.industry ? (
                        <p id={`${uid}-industry-error`} className="field__error">
                          {errors.industry}
                        </p>
                      ) : null}
                    </div>

                    <div className="field field--full">
                      <textarea
                        id={`${uid}-message`}
                        name="message"
                        rows={4}
                        placeholder=" "
                        className="field__control"
                        value={values.message}
                        onChange={set('message')}
                      />
                      <label htmlFor={`${uid}-message`} className="field__label">
                        Message or requirements (optional)
                      </label>
                    </div>

                    <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                    <div className="field--full grid gap-3">
                      {status === 'failed' ? (
                        <p className="form__status" role="alert">
                          We couldn’t send your message. Please try again, or email{' '}
                          <a className="underline" href="mailto:itssafewithus@itssafe.in">
                            itssafewithus@itssafe.in
                          </a>
                          .
                        </p>
                      ) : null}
                      <button type="submit" className="btn form__submit" disabled={status === 'sending'}>
                        {status === 'sending' ? <span className="spinner" aria-label="Sending" /> : 'Send inquiry'}
                      </button>
                      <p className="form__note">We use your details only to respond to this inquiry.</p>
                    </div>
                  </form>
                </>
              )}
            </m.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
