'use client'
import { useState } from 'react'

export default function ContactForm() {
interface ContactFormState {
    name: string
    email: string
    message: string
}

interface ContactFormEvent extends React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> {}

const [form, setForm] = useState<ContactFormState>({ name: '', email: '', message: '' })

const handleChange = (e: ContactFormEvent) => setForm({ ...form, [e.target.name]: e.target.value })
interface HandleSubmitEvent extends React.FormEvent<HTMLFormElement> {}

const handleSubmit = (e: HandleSubmitEvent) => {
    e.preventDefault()
    alert('Message sent!')
    setForm({ name: '', email: '', message: '' })
}
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white/80 p-6 rounded-xl shadow">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="p-3 rounded border" />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className="p-3 rounded border" />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required className="p-3 rounded border min-h-[100px]" />
      <button type="submit" className="bg-neutral-200 hover:bg-neutral-300 transition-colors rounded py-2 font-serif">Send</button>
    </form>
  )
}
