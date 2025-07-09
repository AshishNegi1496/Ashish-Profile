'use client';

import { useState } from 'react';

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skill: '',
    startDate: '',
    endDate: '',
    highlights: '',
    imageUrl: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    try {
      const response = await fetch('http://10.208.10.157:8081/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          skill: formData.skill.split(',').map((s) => s.trim()) // Convert to array
        })
      });

      if (!response.ok) throw new Error('Failed to submit');
      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        skill: '',
        startDate: '',
        endDate: '',
        highlights: '',
        imageUrl: ''
      });
    } catch {
      alert('Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className=" text-black max-w-2xl mx-auto mt-10 space-y-4 p-4 border rounded-md bg-gray-50">
      <h2 className=" text-xl font-semibold">Submit a New Project</h2>
      
      <input name="title" placeholder="Title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400" value={formData.title} onChange={handleChange} required />
      <textarea name="description" placeholder="Description" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400" value={formData.description} onChange={handleChange} required />
      <input name="skill" placeholder="Skill (comma-separated)" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400" value={formData.skill} onChange={handleChange} required />
      <input type="date" name="startDate" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400" value={formData.startDate} onChange={handleChange} required />
      <input type="date" name="endDate" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400" value={formData.endDate} onChange={handleChange} />
      <textarea name="highlights" placeholder="Highlights" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400" value={formData.highlights} onChange={handleChange} />
      <input name="imageUrl" placeholder="Image URL" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400" value={formData.imageUrl} onChange={handleChange} />

      <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        {submitting ? 'Submitting...' : 'Submit Project'}
      </button>

      {success && <p className="text-green-600 mt-2">Project submitted successfully!</p>}
    </form>
  );
}
