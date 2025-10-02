"use client";

import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa6";

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

type BuilderProps = {
  type: "experience" | "education";
  index: number;
  data: ExperienceProps | EducationProps;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: "experience" | "education",
    index: number
  ) => void;
  onRemove: (section: "experience" | "education", index: number) => void;
};

export default function Builder({ type, index, data, onChange, onRemove }: BuilderProps) {
  // Helper to trigger synthetic events for description and current checkbox
  const triggerChange = (name: string, value: any) => {
    const synthetic = {
      target: { name, value },
    } as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    onChange(synthetic, type, index);
  };

  const descriptions = (data as any).description || [];

  return (
    <div className="border border-gray-200 rounded-xl p-6 shadow-sm bg-gray-50 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          name={type === "education" ? "award" : "role"}
          placeholder={type === "education" ? "Qualification / Award" : "Role / Position"}
          value={type === "education" ? (data as EducationProps).award : (data as ExperienceProps).role}
          onChange={(e) => onChange(e as React.ChangeEvent<HTMLInputElement>, type, index)}
          required
        />

        <Input
          name={type === "education" ? "institution" : "company"}
          placeholder={type === "education" ? "Institution" : "Company"}
          value={type === "education" ? (data as EducationProps).institution : (data as ExperienceProps).company}
          onChange={(e) => onChange(e as React.ChangeEvent<HTMLInputElement>, type, index)}
          required
        />

        <Input
          name="city"
          placeholder="City"
          value={(data as any).city || ""}
          onChange={(e) => onChange(e as React.ChangeEvent<HTMLInputElement>, type, index)}
          required
        />

        <Input
          name="country"
          placeholder="Country"
          value={(data as any).country || ""}
          onChange={(e) => onChange(e as React.ChangeEvent<HTMLInputElement>, type, index)}
          required
        />
      </div>

      {/* Dates and Currently There */}
      <div className="flex flex-wrap items-center gap-6 mt-4">
        <div>
          <Label className="block mb-1">From</Label>
          <Input
            type="month"
            name="start"
            value={(data as any).start || ""}
            onChange={(e) => onChange(e as React.ChangeEvent<HTMLInputElement>, type, index)}
            min="1900-01"
          />
        </div>

        <div>
          <Label className="block mb-1">To</Label>
          {!(data as any).current ? (
            <Input
              type="month"
              name="end"
              value={(data as any).end || ""}
              onChange={(e) => onChange(e as React.ChangeEvent<HTMLInputElement>, type, index)}
              min="1900-01"
            />
          ) : (
            <p>Present</p>
          )}

          <div className="flex items-center gap-2 mt-1">
            <input
              type="checkbox"
              id={`current-${type}-${index}`}
              checked={(data as any).current || false}
              onChange={(e) => {
                const checked = e.target.checked;
                const updated = { ...(data as any), current: checked };
                if (checked) updated.end = ""; // clear end date if "current" checked
                triggerChange("current", checked);
                triggerChange("end", updated.end);
              }}
            />
            <Label htmlFor={`current-${type}-${index}`}>Currently here</Label>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="flex items-center gap-2 text-red-600 ml-auto"
          onClick={() => onRemove(type, index)}
        >
          <FaTrash /> Remove
        </Button>
      </div>

      {/* Descriptions */}
      <div className="space-y-2">
        {descriptions.map((desc: string, descIndex: number) => (
          <div key={descIndex} className="relative">
            <Textarea
              name="description"
              placeholder="Description / Responsibility"
              value={desc}
              onChange={(e) => {
                const updated = [...descriptions];
                updated[descIndex] = (e.target as HTMLTextAreaElement).value;
                triggerChange("description", updated);
              }}
            />
            <button
              type="button"
              className="absolute top-1 right-1 text-sm text-red-500"
              onClick={() => {
                const updated = descriptions.filter((_:string, i:number) => i !== descIndex);
                triggerChange("description", updated);
              }}
              aria-label="remove description"
            >
              ✕
            </button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const updated = [...descriptions, ""];
            triggerChange("description", updated);
          }}
        >
          + Add Description
        </Button>
      </div>
    </div>
  );
}
