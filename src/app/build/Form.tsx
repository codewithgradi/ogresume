"use client";

import React, { useContext, useState } from "react";
import Builder from "@/components/Builder";
import Additional from "@/components/AdditionalInfo";
import Preview from "@/components/Preview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FaPlus } from "react-icons/fa";
import {  useFormContext } from "@/components/FormProvider";

type ExperienceProps = {
  role: string;
  company: string;
  city: string;
  country: string;
  start: string;
  end: string;
  description: string[];
  current?: boolean
};

type EducationProps = {
  award: string;
  institution: string;
  city: string;
  country: string;
  start: string;
  current?: boolean
  end: string;
  description: string[];
};

type FormData = {
  fullName: string;
  city: string;
  country: string;
  email: string;
  phoneNumber: string;
  linkedIn: string;
  gitHub: string;
  summary: string;
  experience: ExperienceProps[];
  education: EducationProps[];
  skills: string[];
  certs: string[];
};

export default function FormWithPreview() {
  const context = useFormContext();
  if (!context) return null;
  const { updateFormData } = context
  
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    city: "",
    country: "",
    email: "",
    phoneNumber: "",
    linkedIn: "",
    gitHub: "",
    summary: "",
    experience: [{ role: "", company: "", city: "", country: "", start: "", end: "", description: [] }],
    education: [{ award: "", institution: "", city: "", country: "", start: "", end: "", description: [] }],
    skills: [],
    certs: [],
  });

  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTopLevelChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSectionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: "experience" | "education",
    index: number
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedSection = [...prev[section]];
      updatedSection[index] = { ...updatedSection[index], [name]: value };
      return { ...prev, [section]: updatedSection };
    });
  };

    const handleRemoveSection = (section: "experience" | "education", index: number) => {
  setFormData((prev) => {
    const updated = [...prev[section]];
    updated.splice(index, 1); 
    return { ...prev, [section]: updated };
  });
};



  const addNewExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { role: "", company: "", city: "", country: "", start: "", end: "", description: [] }],
    }));
  };

  const addNewEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { award: "", institution: "", city: "", country: "", start: "", end: "", description: [] }],
    }));
  };

    const addNewSkill = () => {
  setFormData((prev) => ({
    ...prev,
    skills: [...prev.skills, ""], // push an empty string
  }));
};

const addNewCert = () => {
  setFormData((prev) => ({
    ...prev,
    certs: [...prev.certs, ""], 
  }));
};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    updateFormData(formData)

    setShowPreview(true);
  };

  const handleEdit = () => {
    setShowPreview(false);
  };

  if (showPreview) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Preview
          fullName={formData.fullName}
          city={formData.city}
          country={formData.country}
          email={formData.email}
          phoneNumber={formData.phoneNumber}
          linkedIn={formData.linkedIn}
          gitHub={formData.gitHub}
          summary={formData.summary}
          experience={formData.experience}
          education={formData.education}
          skills={formData.skills}
          certs={formData.certs}
        />
        <div className="flex justify-end mt-4 gap-2">
          <Button onClick={handleEdit} variant="outline">
            Edit
          </Button>
        </div>
      </div>
    );
  }
  

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-2">
      {/* Identity */}
      <fieldset className="space-y-4">
        <Label className="text-lg font-semibold">Identity Information</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input name="fullName" value={formData.fullName} onChange={handleTopLevelChange} placeholder="Full Name" required />
          <Input name="city" value={formData.city} onChange={handleTopLevelChange} placeholder="City" required />
          <Input name="country" value={formData.country} onChange={handleTopLevelChange} placeholder="Country" required />
          <Input name="email" value={formData.email} onChange={handleTopLevelChange} placeholder="Email" required />
          <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleTopLevelChange} placeholder="Phone Number" required />
           <Input name="linkedIn" value={formData.linkedIn} onChange={handleTopLevelChange} placeholder="LinkedIn URL" />
          <Input name="gitHub" value={formData.gitHub} onChange={handleTopLevelChange} placeholder="GitHub URL" />
        </div>
        <Textarea name="summary" value={formData.summary} onChange={handleTopLevelChange} placeholder="Professional summary..." />
      </fieldset>

      {/* Experience */}
      <fieldset className="space-y-4">
        <Label className="text-lg font-semibold">Work Experience</Label>
        <div className="space-y-4">
          {formData.experience.map((exp, index) => (
            <Builder onRemove={handleRemoveSection} key={index} type="experience" index={index} data={exp} onChange={handleSectionChange} />
          ))}
        </div>
        <Button type="button" variant="outline" className="flex items-center gap-2" onClick={addNewExperience}>
          <FaPlus /> Add New Role
        </Button>
      </fieldset>

      {/* Education */}
      <fieldset className="space-y-4">
        <Label className="text-lg font-semibold">Education</Label>
        <div className="space-y-4">
          {formData.education.map((edu, index) => (
            <Builder onRemove={handleRemoveSection} key={index} type="education" index={index} data={edu} onChange={handleSectionChange} />
          ))}
        </div>
        <Button type="button" variant="outline" className="flex items-center gap-2" onClick={addNewEducation}>
          <FaPlus /> Add New Qualification
        </Button>
      </fieldset>

     {/* Skills */} 
<fieldset className="space-y-4">
  <Label className="text-lg font-semibold">Skills</Label>
  <Additional
    type="skills"
    values={formData.skills}
    onChange={(index, value) => {
      setFormData((prev) => {
        const updated = [...prev.skills];
        updated[index] = value;
        return { ...prev, skills: updated };
      });
    }}
    onRemove={(type, index) => {
      setFormData((prev) => {
        const updated = [...prev.skills];
        updated.splice(index, 1);
        return { ...prev, skills: updated };
      });
    }}
  />
  <Button type="button" variant="outline" className="flex items-center gap-2" onClick={addNewSkill}>
    <FaPlus /> Add New Skill or Tool
  </Button>
</fieldset>

{/* Certifications */} 
<fieldset className="space-y-4">
  <Label className="text-lg font-semibold">Certifications</Label>
  <Additional
    type="certs"
    values={formData.certs}
    onChange={(index, value) => {
      setFormData((prev) => {
        const updated = [...prev.certs];
        updated[index] = value;
        return { ...prev, certs: updated };
      });
    }}
    onRemove={(type, index) => {
      setFormData((prev) => {
        const updated = [...prev.certs];
        updated.splice(index, 1);
        return { ...prev, certs: updated };
      });
    }}
  />
  <Button type="button" variant="outline" className="flex items-center gap-2" onClick={addNewCert}>
    <FaPlus /> Add New Certification
  </Button>
</fieldset>


      <div className="flex justify-end">
        <Button type="submit">{loading ? "Loading..." : "Preview CV"}</Button>
      </div>
    </form>
  );
}
