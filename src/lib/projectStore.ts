import { useState, useEffect } from "react";
import { projects as defaultProjects, type Project } from "@/data/projects";

const STORAGE_KEY = "muhammeds_portfolio_projects";
const MESSAGES_KEY = "muhammeds_portfolio_messages";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  service?: string;
  budget?: string;
  message: string;
  createdAt: string;
  read?: boolean;
}

// Get initial projects (SSR safe)
export function getStoredProjects(): Project[] {
  if (typeof window === "undefined") return defaultProjects;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading stored projects:", err);
  }
  return defaultProjects;
}

export function saveStoredProjects(projects: Project[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.dispatchEvent(new Event("portfolio-projects-updated"));
  } catch (err) {
    console.error("Error saving projects:", err);
  }
}

export function resetStoredProjects(): Project[] {
  if (typeof window === "undefined") return defaultProjects;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new Event("portfolio-projects-updated"));
  } catch (err) {
    console.error("Error resetting projects:", err);
  }
  return defaultProjects;
}

export function useProjects(): Project[] {
  const [projectsList, setProjectsList] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    setProjectsList(getStoredProjects());
    const handleUpdate = () => {
      setProjectsList(getStoredProjects());
    };
    window.addEventListener("portfolio-projects-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("portfolio-projects-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return projectsList;
}

// Contact messages helpers
export function getStoredMessages(): ContactMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem(MESSAGES_KEY);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error("Error reading messages:", err);
  }
  return [];
}

export function saveContactMessage(msg: Omit<ContactMessage, "id" | "createdAt">): ContactMessage {
  const newMsg: ContactMessage = {
    ...msg,
    id: "msg_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
    read: false,
  };
  if (typeof window !== "undefined") {
    const existing = getStoredMessages();
    const updated = [newMsg, ...existing];
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("portfolio-messages-updated"));
  }
  return newMsg;
}

export function useMessages(): ContactMessage[] {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    setMessages(getStoredMessages());
    const handleUpdate = () => {
      setMessages(getStoredMessages());
    };
    window.addEventListener("portfolio-messages-updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("portfolio-messages-updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return messages;
}
