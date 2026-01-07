"use client";

import React, { useState, useEffect, useRef } from "react";
import { UserFormData } from "./FormProvider";
import { Sparkles, User } from "lucide-react";
import ReactMarkdown from "react-markdown"; // Run: npm install react-markdown
import { Button } from "./ui/button";
import Link from "next/link";

export default function Feedback({ data }: { data: UserFormData | null }) {
  const [streamedText, setStreamedText] = useState("");
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!data) return;

    // Use a flag to prevent state updates if the component unmounts
    let isMounted = true;

    async function fetchGeminiFeedback() {
      setLoading(true);
      setStreamedText(""); 
      
      // Clear any existing interval before starting a new one
      if (intervalRef.current) clearInterval(intervalRef.current);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userData: data }),
        });

        const result = await response.json();
        if (!result.text) throw new Error("No text returned");
        if (!isMounted) return;

        const fullText = result.text;
        let currentIndex = 0;

        intervalRef.current = setInterval(() => {
          setStreamedText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
          
          if (currentIndex >= fullText.length) {
            if (intervalRef.current) clearInterval(intervalRef.current);
          }
        }, 10); 

      } catch (err) {
        if (isMounted) setStreamedText("Error: Failed to process CV data.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchGeminiFeedback();

    // CLEANUP: This is the most important part to stop the glitch
    return () => {
      isMounted = false;
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data]);

  if (!data) return null;

  return (
    <div className="space-y-4 max-w-2xl mx-auto p-4">
      {/* User Query */}
      <div className="flex justify-end items-start gap-2">
        <div className="bg-blue-100 p-3 rounded-lg text-sm max-w-xs shadow-sm">
          Analyze my CV profile please.
        </div>
        <div className="bg-blue-500 p-2 rounded-full shadow-md">
          <User className="text-white w-4 h-4" />
        </div>
      </div>

      {/* AI Response Container */}
      <div className="flex justify-start items-start gap-2">
        <div className="bg-purple-500 p-2 rounded-full shadow-md shrink-0">
          <Sparkles className="text-white w-4 h-4" />
        </div>
        
        <div className="bg-white border border-gray-100 p-5 rounded-2xl shadow-lg w-full min-h-[150px] transition-all">
          <p className="text-[10px] font-black text-purple-500 mb-3 tracking-widest uppercase">
            AI Career Consultant
          </p>
          
          <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {loading && streamedText === "" ? (
              <div className="flex items-center gap-1 py-2">
                <span className="w-2 h-2 bg-purple-300 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
              </div>
            ) : (
              <div className="markdown-content text-sm leading-relaxed text-gray-700">
              <ReactMarkdown>
                {streamedText}
              </ReactMarkdown>
            </div>
            )}
          </div>
        </div>
      </div>
      <Button
          type="button"
          variant="outline"
          size="sm"
          
        >
        <Link href={'/'}>
             Return Home
        </Link>
        </Button>
    </div>
  );
}