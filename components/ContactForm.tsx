'use client';

import { useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    setMessage('');
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const json = await res.json().catch(() => ({}));
    if (res.ok) {
      setStatus('success');
      setMessage('Message received. We will review it shortly.');
      form.reset();
    } else {
      setStatus('error');
      setMessage(json.error || 'Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={onSubmit} className="card mt-12 space-y-6 p-6">
      <div className="hidden"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div><label className="label" htmlFor="name">Name</label><input className="input mt-2" id="name" name="name" required maxLength={120} /></div>
      <div><label className="label" htmlFor="email">Email</label><input className="input mt-2" id="email" name="email" type="email" required maxLength={160} /></div>
      <div><label className="label" htmlFor="message">Message</label><textarea className="input mt-2 min-h-40" id="message" name="message" required maxLength={3000} /></div>
      <button className="btn-primary" disabled={status === 'loading'}>{status === 'loading' ? 'Sending' : 'Send message'}</button>
      {message && <p className="border-l-2 border-[#111827] bg-[#f3f4f6] p-4 text-left text-sm text-[#111827]">{message}</p>}
    </form>
  );
}
