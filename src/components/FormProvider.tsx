'use client'

import { createContext, useState, ReactNode, useContext } from 'react';

// Unified interfaces to match your Form component exactly
export interface WorkExperience {
  role: string;
  company: string;
  city: string;
  country: string;
  start: string;
  end: string;
  description: string[];
  current?: boolean;
}

export interface Education {
  award: string;
  institution: string;
  city: string;
  country: string;
  start: string;
  end: string;
  description: string[];
  current?: boolean;
}

export interface UserFormData {
  fullName: string;
  city: string;
  country: string;
  email: string;
  phoneNumber: string;
  linkedIn: string;
  gitHub: string;
  summary?: string;
  experience: WorkExperience[];
  education: Education[];
  skills: string[];
  certs: string[]; 
}

interface FormContextType {
  formData: UserFormData | null;
  updateFormData: (newData: UserFormData) => void;
}

export const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<UserFormData | null>(null);

  const updateFormData = (newData: UserFormData) => {
    setFormData(newData);
  };

  return (
    <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
};

// This custom hook fixes the "Property 'formData' does not exist" error
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};