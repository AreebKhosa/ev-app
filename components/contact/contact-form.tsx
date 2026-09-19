"use client";

import React, { useState } from "react";
import { Send, Check, Calendar, Building2, Headphones, Mail } from "lucide-react";
import { ContactFormData } from "@/types/contact";

const INQUIRY_TOPICS = [
  { id: "test-ride", label: "Book a Test Ride", icon: <Calendar className="w-3.5 h-3.5" /> },
  { id: "fleet", label: "Fleet & B2B Orders", icon: <Building2 className="w-3.5 h-3.5" /> },
  { id: "support", label: "Technical Support", icon: <Headphones className="w-3.5 h-3.5" /> },
  { id: "general", label: "General Inquiry", icon: <Mail className="w-3.5 h-3.5" /> },
];

export function ContactForm() {
  const [selectedTopic, setSelectedTopic] = useState("test-ride");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    model: "Volt Stealth Alpha",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: "", email: "", phone: "", model: "Volt Stealth Alpha", message: "" });
      }, 3000);
    }, 1200);
  };

  return (
    <div className="rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 p-6 md:p-10 shadow-lg space-y-6">
      <div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          Initiate Transmission
        </h2>
        <p className="text-xs text-neutral-500 mt-1">
          Select your inquiry objective and our specialists will route your request directly.
        </p>
      </div>

      {/* Topic Selection Chips */}
      <div className="space-y-2">
        <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 block">
          Select Objective
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {INQUIRY_TOPICS.map((topic) => (
            <button
              key={topic.id}
              type="button"
              onClick={() => setSelectedTopic(topic.id)}
              className={`p-2.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                selectedTopic === topic.id
                  ? "bg-neutral-950 text-white dark:bg-[#D4FF00] dark:text-black border-transparent shadow-md scale-[1.02]"
                  : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-neutral-600 dark:text-neutral-400 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
              }`}
            >
              {topic.icon}
              <span className="text-[11px] text-center leading-tight">{topic.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Alex Vance"
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4FF00] transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="rider@voltstudio.com"
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4FF00] transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
              Phone (Optional)
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 019-2834"
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4FF00] transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
              Fleet Model of Interest
            </label>
            <select
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00] transition-all cursor-pointer"
            >
              <option value="Volt Stealth Alpha" className="bg-white dark:bg-[#121316]">Volt Stealth Alpha (Urban)</option>
              <option value="Apex Nomad 750" className="bg-white dark:bg-[#121316]">Apex Nomad 750 (All-Terrain)</option>
              <option value="CyberTrack GT Dual" className="bg-white dark:bg-[#121316]">CyberTrack GT Dual (Hyper)</option>
              <option value="Pulse City Cruiser" className="bg-white dark:bg-[#121316]">Pulse City Cruiser (Step-Thru)</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
            Message Details *
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Specify test ride preferences, customized fleet sizing, or technical inquiries..."
            className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4FF00] transition-all resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className={`w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer active:scale-95 ${
            isSuccess
              ? "bg-[#D4FF00] text-black"
              : "bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black"
          }`}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : isSuccess ? (
            <>
              <Check className="w-4 h-4 text-black" />
              <span>Transmission Received!</span>
            </>
          ) : (
            <>
              <span>Send Transmission</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
