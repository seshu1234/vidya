"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface CourseProgressContextType {
  completedChapters: string[]; // List of completed chapter slugs/IDs
  markAsComplete: (chapterId: string) => void;
  isCompleted: (chapterId: string) => boolean;
}

const CourseProgressContext = createContext<CourseProgressContextType | undefined>(undefined);

export function CourseProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedChapters, setCompletedChapters] = useState<string[]>(() => {
    // Load from localStorage on mount (client-side only check)
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem("vidya_progress");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse progress", e);
            }
        }
    }
    return [];
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("vidya_progress", JSON.stringify(completedChapters));
  }, [completedChapters]);

  const markAsComplete = (chapterId: string) => {
    setCompletedChapters((prev) => {
        if (prev.includes(chapterId)) return prev;
        return [...prev, chapterId];
    });
  };

  const isCompleted = (chapterId: string) => {
    return completedChapters.includes(chapterId);
  };

  return (
    <CourseProgressContext.Provider value={{ completedChapters, markAsComplete, isCompleted }}>
      {children}
    </CourseProgressContext.Provider>
  );
}

export function useCourseProgress() {
  const context = useContext(CourseProgressContext);
  if (context === undefined) {
    throw new Error("useCourseProgress must be used within a CourseProgressProvider");
  }
  return context;
}
