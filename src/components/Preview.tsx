"use client";

import React, { useRef } from "react";
import ListComponent from "./ListComponent";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa6";
import { useReactToPrint,UseReactToPrintOptions } from "react-to-print";

type ExperienceProps = {
  role: string;
  company: string;
  city: string;
  country: string;
  start: string;
  end: string;
  current?: boolean;
  description: string[];
};

type EducationProps = {
  award: string;
  institution: string;
  city: string;
  country: string;
  start: string;
  end: string;
  current?: boolean;
  description: string[];
};

type PreviewProps = {
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

export default function Preview({
  fullName,
  city,
  country,
  email,
  phoneNumber,
  linkedIn,
  gitHub,
  summary,
  experience,
  education,
  skills,
  certs,
}: PreviewProps) {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const d = new Date(Number(year), Number(month) - 1);
    return d.toLocaleString("default", { month: "short", year: "numeric" });
  };

  const cvRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: cvRef,
    pageStyle: `
      @page { size: A4; margin: 20mm; }
      body { -webkit-print-color-adjust: exact; }
    `,
  } as UseReactToPrintOptions);

  return (
    <div>
      {/* CV Content */}
      <div ref={cvRef} className="space-y-2" id="cv">
        {/* Identity */}
        <h1 className="text-3xl font-bold text-center">{fullName}</h1>
        <p className="text-sm">
          {city}, {country} | {email} | {phoneNumber} |{" "}
          <a href={`https://linkedin.com/in/${linkedIn}`}>{linkedIn}</a> |{" "}
          <a href={`https://github.com/${gitHub}`}>{gitHub}</a>
        </p>

        {/* Summary */}
        {summary && (
          <div>
            <h2 className="font-semibold py-1 text-lg">Professional Summary</h2>
            <p className="text-sm">{summary}</p>
          </div>
        )}

        {/* Experience */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Work Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="space-y-1">
              <h3 className="font-semibold text-lg">{exp.role}</h3>
              <div className="font-semibold flex items-center justify-between">
                <p className="text-sm italic">
                  {exp.company}, {exp.city}, {exp.country}
                </p>
                <p className="text-sm">
                  {formatDate(exp.start)} - {exp.current ? "Present" : formatDate(exp.end)}
                </p>
              </div>
              <ListComponent items={exp.description} />
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="space-y-1">
              <h3 className="font-semibold text-lg">{edu.award}</h3>
              <div className="font-semibold flex items-center justify-between">
                <p className="text-sm italic">
                  {edu.institution}, {edu.city}, {edu.country}
                </p>
                <p className="text-sm">
                  {formatDate(edu.start)} – {edu.current ? "Present" : formatDate(edu.end)}
                </p>
              </div>
              <ListComponent items={edu.description} />
            </div>
          ))}
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-xl font-semibold">Skills</h2>
          <ListComponent items={skills} />
        </section>

        {/* Certifications */}
        <section>
          <h2 className="text-xl font-semibold">Certifications</h2>
          <ListComponent items={certs} />
        </section>
      </div>

      {/* Buttons */}
      <div className="flex justify-around items-center my-3">
        <Button onClick={handlePrint}>Download / Print CV</Button>
        <Button onClick={()=>{window.location.reload()}} variant="outline" className="from-primary-foreground">
          <FaPlus /> Create a new CV
        </Button>
      </div>
    </div>
  );
}
