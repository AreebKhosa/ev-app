"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Check,
  Calendar,
  Building2,
  Headphones,
  Mail,
  Clock,
  MapPin,
  Sparkles,
  ShieldCheck,
  Wrench,
  Layers,
  Bike,
} from "lucide-react";
import { api } from "@/services/api";

interface ObjectiveConfig {
  id: string;
  label: string;
  badge: string;
  title: string;
  subtitle: string;
  accentColor: string;
  icon: React.ReactNode;
  btnText: string;
  placeholder: string;
}

const INQUIRY_OBJECTIVES: ObjectiveConfig[] = [
  {
    id: "test-ride",
    label: "Book a Test Ride",
    badge: "✦ VIP Test Ride Pilot Session",
    title: "Schedule Your Test Ride",
    subtitle: "Experience velocity firsthand with a 45-minute guided test ride alongside a Volt dynamics specialist.",
    accentColor: "#D4FF00",
    icon: <Calendar className="w-4 h-4" />,
    btnText: "Schedule Test Ride Session",
    placeholder: "Let us know your preferred riding routes or specific handling performance questions...",
  },
  {
    id: "fleet",
    label: "Fleet & B2B Orders",
    badge: "✦ Enterprise Fleet Procurement",
    title: "Enterprise Fleet Solutions",
    subtitle: "Custom volume pricing, co-branded telemetry integration, and depot charging infrastructure.",
    accentColor: "#00E5FF",
    icon: <Building2 className="w-4 h-4" />,
    btnText: "Request Enterprise Volume Quote",
    placeholder: "Describe your organization's deployment requirements, operational area, and delivery timeline...",
  },
  {
    id: "support",
    label: "Technical Support",
    badge: "✦ Engineering Diagnostic & Service",
    title: "Priority Technical Support",
    subtitle: "Direct line to our hardware & firmware engineers for drivetrain telemetry, diagnostics, and warranty service.",
    accentColor: "#FF9100",
    icon: <Headphones className="w-4 h-4" />,
    btnText: "Open Technical Support Ticket",
    placeholder: "Describe any diagnostic symptoms, error codes, firmware behavior, or maintenance needed...",
  },
  {
    id: "general",
    label: "General Inquiry",
    badge: "✦ Studio Communications",
    title: "Connect With Volt Studio",
    subtitle: "Questions regarding vehicle releases, showroom visits, media press kits, or custom bespoke builds.",
    accentColor: "#D4FF00",
    icon: <Mail className="w-4 h-4" />,
    btnText: "Send Direct Transmission",
    placeholder: "How can our engineering and design team assist you today?",
  },
];

export function ContactForm() {
  const [selectedTopic, setSelectedTopic] = useState("test-ride");
  const [availableModels, setAvailableModels] = useState<string[]>([
    "Volt Stealth Alpha",
    "Apex Nomad 750",
    "CyberTrack GT Dual",
    "Pulse City Cruiser",
  ]);

  // Base Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    model: "Volt Stealth Alpha",
    message: "",
  });

  // Objective-Specific Contextual Fields
  // 1. Test Ride
  const [testRideDate, setTestRideDate] = useState("");
  const [testRideSlot, setTestRideSlot] = useState("14:00 - Afternoon Session");
  const [testRideShowroom, setTestRideShowroom] = useState("San Francisco - Mission Flagship");
  const [riderExperience, setRiderExperience] = useState("Experienced E-Bike Pilot");

  // 2. Fleet & B2B
  const [companyName, setCompanyName] = useState("");
  const [fleetQuantity, setFleetQuantity] = useState("10–25 Vehicles");
  const [deploymentTimeline, setDeploymentTimeline] = useState("Immediate (Q1/Q2)");

  // 3. Technical Support
  const [vinNumber, setVinNumber] = useState("");
  const [subsystemCategory, setSubsystemCategory] = useState("Powertrain / Motor");
  const [firmwareVersion, setFirmwareVersion] = useState("v4.2.0");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Fetch Live Models from Backend
  useEffect(() => {
    api.products.getAll().then((res) => {
      if (res.data && res.data.length > 0) {
        const names = res.data.map((p: any) => p.name);
        setAvailableModels(names);
        if (names[0]) {
          setFormData((prev) => ({ ...prev, model: names[0] }));
        }
      }
    }).catch(() => {});
  }, []);

  const activeConfig = INQUIRY_OBJECTIVES.find((o) => o.id === selectedTopic) || INQUIRY_OBJECTIVES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Build comprehensive structured message based on selected objective
      let enrichedMessage = formData.message;

      if (selectedTopic === "test-ride") {
        enrichedMessage = `[TEST RIDE REQUEST]\n• Preferred Date: ${testRideDate || "Flexible"}\n• Time Slot: ${testRideSlot}\n• Showroom: ${testRideShowroom}\n• Experience: ${riderExperience}\n• Model: ${formData.model}\n\nAdditional Notes:\n${formData.message}`;
      } else if (selectedTopic === "fleet") {
        enrichedMessage = `[ENTERPRISE B2B FLEET INQUIRY]\n• Company: ${companyName || "N/A"}\n• Fleet Volume: ${fleetQuantity}\n• Target Model: ${formData.model}\n• Timeline: ${deploymentTimeline}\n\nProject Scope:\n${formData.message}`;
      } else if (selectedTopic === "support") {
        enrichedMessage = `[TECHNICAL SUPPORT TICKET]\n• Vehicle Model: ${formData.model}\n• VIN/Serial: ${vinNumber || "N/A"}\n• Subsystem: ${subsystemCategory}\n• Firmware: ${firmwareVersion}\n\nDiagnostic Details:\n${formData.message}`;
      }

      await api.queries.submit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        topic: activeConfig.label,
        model: formData.model,
        message: enrichedMessage,
      });

      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          model: availableModels[0] || "Volt Stealth Alpha",
          message: "",
        });
        setCompanyName("");
        setVinNumber("");
        setTestRideDate("");
      }, 4000);
    } catch (err) {
      console.error("Failed to submit inquiry:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-3xl backdrop-blur-2xl bg-white/80 dark:bg-[#121316]/90 border border-black/10 dark:border-white/10 p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-7 transition-all duration-300">
      {/* 1. TOP INTERACTIVE OBJECTIVE SWITCHER PILLS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 tracking-wider">
            Select Inquiry Objective
          </label>
          <span className="text-[10px] font-mono text-[#92b500] dark:text-[#D4FF00] font-bold">
            Interactive Form Architecture
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {INQUIRY_OBJECTIVES.map((topic) => {
            const isSelected = selectedTopic === topic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setSelectedTopic(topic.id)}
                className={`p-3 rounded-2xl text-xs font-bold flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-pointer border relative overflow-hidden ${
                  isSelected
                    ? "bg-neutral-950 text-white dark:bg-white dark:text-black border-transparent shadow-lg scale-[1.02]"
                    : "bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/5 text-neutral-600 dark:text-neutral-400 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-[#D4FF00] text-black"
                      : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  {topic.icon}
                </div>
                <span className="text-[11px] text-center leading-snug">{topic.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. DYNAMIC HEADER ACCENT BANNER (ADAPTS WITH ANIMATION) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeConfig.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative overflow-hidden"
        >
          <div className="space-y-1 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#D4FF00] text-black uppercase tracking-wider">
              {activeConfig.badge}
            </span>
            <h3 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight">
              {activeConfig.title}
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 max-w-lg leading-relaxed">
              {activeConfig.subtitle}
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0 text-neutral-900 dark:text-white">
            {activeConfig.icon}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 3. DYNAMIC FORM FIELDS */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Core Contact Info (Always Shown) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
              {selectedTopic === "fleet" ? "Primary Contact Name *" : "Full Name *"}
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={selectedTopic === "fleet" ? "Alex Vance (VP Operations)" : "Alex Vance"}
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4FF00] transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
              {selectedTopic === "fleet" ? "Corporate Work Email *" : "Email Address *"}
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="alex@enterprise.com"
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4FF00] transition-all"
            />
          </div>
        </div>

        {/* Dynamic Fields Per Selected Objective */}
        <AnimatePresence mode="wait">
          {selectedTopic === "test-ride" && (
            <motion.div
              key="test-ride-fields"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 pt-1 border-t border-black/5 dark:border-white/10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
                    Preferred Ride Date
                  </label>
                  <input
                    type="date"
                    value={testRideDate}
                    onChange={(e) => setTestRideDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
                    Preferred Time Slot
                  </label>
                  <select
                    value={testRideSlot}
                    onChange={(e) => setTestRideSlot(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00] cursor-pointer"
                  >
                    <option value="10:00 - Morning Session (Quiet Roads)" className="bg-white dark:bg-[#121316]">10:00 AM - Morning Session (Quiet Roads)</option>
                    <option value="14:00 - Afternoon Session (Sunlight)" className="bg-white dark:bg-[#121316]">2:00 PM - Afternoon Session (Sunlight)</option>
                    <option value="17:30 - Twilight Session (Headlight & HUD Demo)" className="bg-white dark:bg-[#121316]">5:30 PM - Twilight Session (Night HUD Demo)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
                    Showroom Hub Location
                  </label>
                  <select
                    value={testRideShowroom}
                    onChange={(e) => setTestRideShowroom(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00] cursor-pointer"
                  >
                    <option value="San Francisco - Mission Flagship" className="bg-white dark:bg-[#121316]">San Francisco Flagship Hub (540 Mission St)</option>
                    <option value="Brooklyn - DUMBO Design Lab" className="bg-white dark:bg-[#121316]">Brooklyn DUMBO Design Lab (45 Main St)</option>
                    <option value="Austin - Downtown Gigafactory Hub" className="bg-white dark:bg-[#121316]">Austin Tech Corridor Hub (200 Congress Ave)</option>
                    <option value="Berlin - Mitte Studio EU" className="bg-white dark:bg-[#121316]">Berlin Mitte Studio (Torstraße 112)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                    <Bike className="w-3.5 h-3.5 text-[#92b500] dark:text-[#D4FF00]" />
                    Rider Experience Level
                  </label>
                  <select
                    value={riderExperience}
                    onChange={(e) => setRiderExperience(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00] cursor-pointer"
                  >
                    <option value="Experienced E-Bike Pilot" className="bg-white dark:bg-[#121316]">Experienced E-Bike Pilot</option>
                    <option value="Daily Commuter" className="bg-white dark:bg-[#121316]">Daily Commuter (Acoustic Bike)</option>
                    <option value="Novice Rider" className="bg-white dark:bg-[#121316]">Novice / First Time on Electric</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {selectedTopic === "fleet" && (
            <motion.div
              key="fleet-fields"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 pt-1 border-t border-black/5 dark:border-white/10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#00E5FF]" />
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Hyperion Logistics Inc."
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#00E5FF]" />
                    Target Fleet Volume
                  </label>
                  <select
                    value={fleetQuantity}
                    onChange={(e) => setFleetQuantity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00] cursor-pointer"
                  >
                    <option value="5–15 Vehicles (Pilot Cohort)" className="bg-white dark:bg-[#121316]">5–15 Vehicles (Pilot Cohort)</option>
                    <option value="16–50 Vehicles (Commercial Rollout)" className="bg-white dark:bg-[#121316]">16–50 Vehicles (Commercial Rollout)</option>
                    <option value="50+ Vehicles (Enterprise Fleet & API)" className="bg-white dark:bg-[#121316]">50+ Vehicles (Enterprise Fleet & API)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
                  Target Deployment Timeline
                </label>
                <select
                  value={deploymentTimeline}
                  onChange={(e) => setDeploymentTimeline(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00] cursor-pointer"
                >
                  <option value="Immediate (Next 30 Days)" className="bg-white dark:bg-[#121316]">Immediate (Next 30 Days)</option>
                  <option value="Upcoming Quarter (Q2/Q3)" className="bg-white dark:bg-[#121316]">Upcoming Quarter (Q2/Q3)</option>
                  <option value="Annual Budget Planning" className="bg-white dark:bg-[#121316]">Annual Budget Planning</option>
                </select>
              </div>
            </motion.div>
          )}

          {selectedTopic === "support" && (
            <motion.div
              key="support-fields"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 pt-1 border-t border-black/5 dark:border-white/10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#FF9100]" />
                    Vehicle VIN / Order Reference
                  </label>
                  <input
                    type="text"
                    value={vinNumber}
                    onChange={(e) => setVinNumber(e.target.value)}
                    placeholder="VT-948201 or VIN-4829"
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-mono font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4FF00]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-mono uppercase font-bold text-neutral-500 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-[#FF9100]" />
                    Diagnostic Subsystem
                  </label>
                  <select
                    value={subsystemCategory}
                    onChange={(e) => setSubsystemCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00] cursor-pointer"
                  >
                    <option value="Powertrain & Motor Drive" className="bg-white dark:bg-[#121316]">Powertrain & Motor Drive</option>
                    <option value="Battery Pack & Fast Charging" className="bg-white dark:bg-[#121316]">Battery Pack & Fast Charging</option>
                    <option value="Hydraulic Brakes & Rotors" className="bg-white dark:bg-[#121316]">Hydraulic Brakes & Rotors</option>
                    <option value="Bluetooth Telemetry & App Sync" className="bg-white dark:bg-[#121316]">Bluetooth Telemetry & App Sync</option>
                    <option value="Firmware Over-The-Air (FOTA)" className="bg-white dark:bg-[#121316]">Firmware Over-The-Air (FOTA)</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Model Selection & Phone Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
              Phone Number (For SMS Updates)
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
              Vehicle Model
            </label>
            <select
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-bold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#D4FF00] transition-all cursor-pointer"
            >
              {availableModels.map((m) => (
                <option key={m} value={m} className="bg-white dark:bg-[#121316]">
                  {m}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Detailed Message Textarea */}
        <div className="space-y-1">
          <label className="text-[11px] font-mono uppercase font-bold text-neutral-500">
            {selectedTopic === "test-ride"
              ? "Test Ride Preferences & Questions *"
              : selectedTopic === "fleet"
              ? "Deployment & Scope Requirements *"
              : selectedTopic === "support"
              ? "Detailed Diagnostic Description *"
              : "Transmission Message *"}
          </label>
          <textarea
            required
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder={activeConfig.placeholder}
            className="w-full px-4 py-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D4FF00] transition-all resize-none"
          />
        </div>

        {/* Submit Action Button */}
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-xl cursor-pointer active:scale-95 ${
            isSuccess
              ? "bg-[#D4FF00] text-black"
              : "bg-neutral-950 text-white dark:bg-white dark:text-black hover:bg-[#D4FF00] hover:text-black dark:hover:bg-[#D4FF00] dark:hover:text-black"
          }`}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : isSuccess ? (
            <>
              <Check className="w-4 h-4 text-black stroke-[3]" />
              <span>Transmission Dispatched Successfully!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeConfig.btnText}</span>
              <Send className="w-3.5 h-3.5 ml-1" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
