import React from "react";

export interface InquiryType {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface Showroom {
  city: string;
  role: string;
  address: string;
  hours: string;
  phone: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  model: string;
  message: string;
}
