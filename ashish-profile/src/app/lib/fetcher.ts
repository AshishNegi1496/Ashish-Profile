// Spring Boot fetcher (port 8080)
export const fetcher = async (url: string) => {
  const res = await fetch(`http://localhost:8080${url}`); 
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// FastAPI fetcher (port 8000)
import { useEffect, useState } from "react";

export const fastApiFetcher = async (url: string) => {
  const res = await fetch(`http://localhost:8000/api${url}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export type Profile = {
  id: number
  name: string
  email: string
   github?: string;
  linkedin?: string;
  location?: string;
  phone?: string;
  position?: string;
  profileImage?: string; 
  summary?: string;
};

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