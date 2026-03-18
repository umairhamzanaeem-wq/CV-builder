"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/resumeStore";

export function SkillsEditor() {
  const { content, setSkills } = useResumeStore();
  const skills = content.skills ?? [];
  const [input, setInput] = useState("");

  function add(e: React.FormEvent) {
    e.preventDefault();
    const value = input.trim();
    if (!value || skills.includes(value)) return;
    setSkills([...skills, value]);
    setInput("");
  }

  function remove(index: number) {
    setSkills(skills.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      <form onSubmit={add} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a skill"
          className="flex-1 input-base py-2"
        />
        <button type="submit" className="btn-primary py-2 px-3 text-sm">Add</button>
      </form>
      {skills.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {skills.map((skill, index) => (
            <li
              key={`${skill}-${index}`}
              className="inline-flex items-center gap-1 rounded border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-700"
            >
              {skill}
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Remove"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
