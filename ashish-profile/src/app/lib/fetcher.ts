import { useAuthStore } from "@/app/store/useAuthStore";
import { API_BASE_URL_PROFILE } from "@/app/config";
import { API_BASE_URL_PROJECTS } from "@/app/config";
export const fetcher = async (url: string) => {
    console.log('Fetcher called for:', url);
  const token = useAuthStore.getState().token;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL_PROJECTS}${url}`, {
    headers,
  });

  // const res = await fetch(`${API_BASE_URL_PROJECTS}${url}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  // });

  if (!res.ok) {
    throw new Error("Unauthorized or failed to fetch");
  }

  return res.json();
};
// FastAPI service (port 8000) for profiles
import { useEffect, useState } from "react";

export const fastApiFetcher = async (url: string) => {
  const res = await fetch(`${API_BASE_URL_PROFILE}/api${url}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export type Education = {
  degree: string;
  institution: string;
  start_year: number;
  end_year?: number;
  grade?: string;
};

export type Experience = {
  title: string;
  company: string;
  start_date: string;
  end_date?: string;
  description?: string;
};

export type Certification = {
   id: string;
  name: string;
  issuer: string;
  issue_date: string;
  credential_url?: string;
};

export type Profile = {
  id: string; 
  name: string;
  email?: string;
  phone?: string;
  github?: string;
  linkedin?: string;
  location?: string;
  position?: string;
  profileImage?: string;
  summary?: string;
  resumeUrl?: string;
  skills?: string[];
  experience?: Experience[];
  education?: Education[];
  certifications?: Certification[];
  languages?: string[];
}

export function useProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fastApiFetcher("/profiles")
      .then(setProfiles)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { profiles, loading, error };
}

