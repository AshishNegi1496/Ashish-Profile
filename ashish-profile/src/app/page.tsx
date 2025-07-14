

"use client";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { Avatar, Chip, Stack, Button, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useProfiles } from "./lib/fetcher";
import Loader from "./components/Loader";
import ReusableDialog from "./components/ReusableDialog";
import Chatbot from "./components/Chatbot";
import ChatIcon from "@mui/icons-material/Chat";

const altImg =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBtUlfdm1JH2SjTck8lbNVEuEGEMLJgbe8RNkfrKpuG25vi8GCC1UxQgfBgc2YBxmcuzgMeStW7KYEe7CUI2nQi5J9937h_bb87eML-4wtgA4SpV_zqdTM6MebiPb_e2Me5EPgjyqV1lJVqg0R2uBJ4jO1tqBskw90lW1csityH4W5F8uA_y8F0g95QM0yIDyRT_EXDMsEU1RD8VhfBplwQKEzAFbaggcyRe2wqNSbh1iXXQvDWrQzWkJ1kQ7ELqDjLIO4aGBMzwas";

export default function HomePage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<{ title: string; content: React.ReactNode } | null>(null);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const { profiles, loading } = useProfiles();
  const profile = profiles?.[0] || {};
  const name = profile.name || "Ashish Negi";

  if (loading) return <Loader />;

  interface Experience {
    title: string;
    company: string;
    start_date: string;
    end_date?: string;
    description?: string;
  }

  const cardData = [
    {
      title: "Skills",
      desc: Array.isArray(profile.skills) && profile.skills.length > 0
        ? profile.skills.slice(0, 5).join(", ") + (profile.skills.length > 5 ? "..." : "")
        : "No skills listed.",
      showKnowMore: Array.isArray(profile.skills) && profile.skills.length > 0,
      content: (
        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {profile.skills?.map((skill: string, i: number) => (
            <Chip key={i} label={skill} color="primary" variant="outlined" size="small" />
          ))}
        </Stack>
      ),
    },
    {
      title: "Experience",
      desc: Array.isArray(profile.experience) && profile.experience.length > 0
        ? profile.experience[0].title + " at " + profile.experience[0].company
        : "No experience listed.",
      showKnowMore: Array.isArray(profile.experience) && profile.experience.length > 0,
      content: (
        <Stack spacing={2}>
          {profile.experience?.map((exp: Experience, i: number) => (
            <div key={i}>
              <Typography fontWeight={700}>{exp.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {exp.company} • {exp.start_date} – {exp.end_date || "Present"}
              </Typography>
              {exp.description && <Typography variant="body2">{exp.description}</Typography>}
            </div>
          ))}
        </Stack>
      ),
    },
    {
      title: "Certifications",
      desc: Array.isArray(profile.certifications) && profile.certifications.length > 0
        ? profile.certifications[0].name
        : "No certifications listed.",
      showKnowMore: Array.isArray(profile.certifications) && profile.certifications.length > 0,
      content: (
        <Stack spacing={1}>
          {profile.certifications?.map(
            (
              cert: { name: string; issuer: string; issue_date: string; credential_url?: string },
              i: number
            ) => (
              <div key={i}>
                <Typography fontWeight={600} variant="body2">
                  {cert.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {cert.issuer} • {cert.issue_date}
                </Typography>
                {cert.credential_url && (
                  <Button
                    href={cert.credential_url}
                    target="_blank"
                    size="small"
                    sx={{ ml: 1 }}
                    variant="text"
                  >
                    View Credential
                  </Button>
                )}
              </div>
            )
          )}
        </Stack>
      ),
    },
    {
      title: "Languages",
      desc: Array.isArray(profile.languages) && profile.languages.length > 0
        ? profile.languages.join(", ")
        : "No languages listed.",
      showKnowMore: Array.isArray(profile.languages) && profile.languages.length > 0,
      content: <Typography variant="body2">{profile.languages?.join(", ")}</Typography>,
    },
    {
      title: "Passions",
      desc:
        "Esports, Cricket, Lawn Tennis, Photography, Cooking, Travelling, Learning new technology, and many more. You can find some of my moments and clicks in the Gallery section.",
      showKnowMore: true,
      content: (
        <div>
          <ul className="list-disc pl-5 mb-1 text-black text-base">
            <li>Esports</li>
            <li>Cricket</li>
            <li>Lawn Tennis</li>
            <li>Photography</li>
            <li>Cooking</li>
            <li>Travelling</li>
            <li>Learning New Technology</li>
          </ul>
          <Typography variant="body2">
            ...and many more! Check out the{" "}
            <Link href="/gallery" className="text-purple-500 hover:underline">
              Gallery
            </Link>{" "}
            for pictures.
          </Typography>
        </div>
      ),
    },
  ];

  const handleKnowMore = (title: string) => {
    const card = cardData.find((c) => c.title === title);
    if (card) setDialogContent({ title: card.title, content: card.content });
    setDialogOpen(true);
  };
  
  return (
  <div className="bg-background text-foreground min-h-screen font-[Poppins,sans-serif] dark:bg-background dark:text-foreground">
    <Head>
      <title>{name} | {profile.position || "Project Engineer"}</title>
      <meta name="description" content="Personal portfolio of Ashish Negi - Full-stack developer." />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="container mx-auto px-6 py-16 md:py-24">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-12" id="home">
        <div className="md:w-1/2 text-center md:text-left card-enter card-enter-active">
          <p className="text-accent font-semibold mb-3 text-lg">
            {profile.position || "Project Engineer"}
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
            I Am {name}
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto md:mx-0">
            {profile.summary ||
              "Full Stack Developer with expertise in React.js, Spring Boot, FastAPI, and microservices. Experienced with cloud-native solutions, CI/CD, Docker, and data visualization."}
          </p>
         <a href="/projects" className="btn-primary">
  View Projects
</a>
        </div>

        <div className="md:w-1/2 flex justify-center floating-animation">
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full animated-gradient bg-gradient-to-br from-secondary via-purple-900 to-secondary flex items-center justify-center shadow-2xl shadow-purple-500/10">
            <div className="absolute inset-0 bg-black/20 rounded-full blur-2xl" />
            {profile.profileImage || altImg ? (
              <img
                src={profile.profileImage || altImg}
                alt={name}
                className="w-60 h-60 md:w-80 md:h-80 rounded-full object-cover z-10"
              />
            ) : (
              <span className="text-8xl font-bold text-white z-10">{name[0]}</span>
            )}
          </div>
        </div>
      </section>

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24 md:mt-32" id="cards-section">
        {cardData.map((item, idx) => (
         
          <div
  key={item.title}
  className="p-8 rounded-2xl shadow-lg transition-all duration-300 transform hover:-translate-y-2 card-enter bg-[color:var(--secondary)] text-[color:var(--foreground)] hover:shadow-purple-500/20"
  style={{ transitionDelay: `${100 * (idx + 1)}ms` }}
>
  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
  <p className="text-[color:var(--muted-foreground)] mb-6">{item.desc}</p>

  {item.showKnowMore && (
    <button
      onClick={() => handleKnowMore(item.title)}
      className="font-semibold flex items-center group text-[color:var(--primary)] hover:text-[color:var(--muted-foreground)] transition-colors"
    >
      Know More
      <ArrowForwardIcon className="ml-1 transform group-hover:translate-x-1 transition-transform" fontSize="small" />
    </button>
  )}
</div>

        ))}
      </section>
    </main>

    {/* Floating Chat Button */}
    {!chatbotOpen && (
      <button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 transition-transform transform hover:scale-110"
        onClick={() => setChatbotOpen(true)}
      >
        <span className="material-icons-outlined text-3xl">chat</span>
      </button>
    )}

    {/* Chatbot Dialog */}
    <Chatbot
      isOpen={chatbotOpen}
      onClose={() => setChatbotOpen(false)}
      profileName={name}
    />

    {/* Reusable Dialog for Know More */}
    {dialogContent && (
      <ReusableDialog
        open={dialogOpen}
        title={dialogContent.title}
        content={dialogContent.content}
        onClose={() => setDialogOpen(false)}
      />
    )}
  </div>
);
}