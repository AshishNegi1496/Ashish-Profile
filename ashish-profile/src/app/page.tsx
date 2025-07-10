


// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import Head from "next/head";
// import {
//   Typography,
//   Button,
//   Container,
//   Box,
//   Grid,
//   Paper,
//   Avatar,
//   Link as MuiLink,
//   useTheme,
//   Chip,
//   Stack,
//   Fab,
// } from "@mui/material";
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// import { useProfiles } from "./lib/fetcher";
// import Loader from "./components/Loader";
// import ReusableDialog from "./components/ReusableDialog";
// import Chatbot from "./components/Chatbot";
// import ChatIcon from '@mui/icons-material/Chat';

// const altImg =
//   "https://lh3.googleusercontent.com/aida-public/AB6AXuBtUlfdm1JH2SjTck8lbNVEuEGEMLJgbe8RNkfrKpuG25vi8GCC1UxQgfBgc2YBxmcuzgMeStW7KYEe7CUI2nQi5J9937h_bb87eML-4wtgA4SpV_zqdTM6MebiPb_e2Me5EPgjyqV1lJVqg0R2uBJ4jO1tqBskw90lW1csityH4W5F8uA_y8F0g95QM0yIDyRT_EXDMsEU1RD8VhfBplwQKEzAFbaggcyRe2wqNSbh1iXXQvDWrQzWkJ1kQ7ELqDjLIO4aGBMzwas";

// export default function HomePage() {
//   const theme = useTheme();
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [dialogContent, setDialogContent] = useState<{ title: string; content: React.ReactNode } | null>(null);
//   const [chatbotOpen, setChatbotOpen] = useState(false);
//   const { profiles, loading } = useProfiles();
//   const profile = profiles?.[0] || {};
//   const name = profile.name || "Ashish Negi";

//   if (loading) return <Loader />;

//   interface Experience {
//     title: string;
//     company: string;
//     start_date: string;
//     end_date?: string;
//     description?: string;
//   }

//   const cardData = [
//     {
//       title: "Skills",
//       desc: Array.isArray(profile.skills) && profile.skills.length > 0
//         ? profile.skills.slice(0, 5).join(", ") + (profile.skills.length > 5 ? "..." : "")
//         : "No skills listed.",
//       showKnowMore: Array.isArray(profile.skills) && profile.skills.length > 0,
//       content: (
//         <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
//           {profile.skills?.map((skill: string, i: number) => (
//             <Chip key={i} label={skill} color="primary" variant="outlined" size="small" />
//           ))}
//         </Stack>
//       ),
//     },
//     {
//       title: "Experience",
//       desc: Array.isArray(profile.experience) && profile.experience.length > 0
//         ? profile.experience[0].title + " at " + profile.experience[0].company
//         : "No experience listed.",
//       showKnowMore: Array.isArray(profile.experience) && profile.experience.length > 0,
//       content: (
//         <Stack spacing={2}>
//           {profile.experience?.map((exp: Experience, i: number) => (
//             <Box key={i}>
//               <Typography fontWeight={700}>{exp.title}</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {exp.company} • {exp.start_date} – {exp.end_date || "Present"}
//               </Typography>
//               {exp.description && <Typography variant="body2">{exp.description}</Typography>}
//             </Box>
//           ))}
//         </Stack>
//       ),
//     },


//     {
//       title: "Certifications",
//       desc: Array.isArray(profile.certifications) && profile.certifications.length > 0
//         ? profile.certifications[0].name
//         : "No certifications listed.",
//       showKnowMore: Array.isArray(profile.certifications) && profile.certifications.length > 0,
//       content: (
//         <Stack spacing={1}>
//           {profile.certifications?.map((cert: { name: string; issuer: string; issue_date: string; credential_url?: string }, i: number) => (
//             <Box key={i}>
//               <Typography fontWeight={600} variant="body2">{cert.name}</Typography>
//               <Typography variant="caption" color="text.secondary">
//                 {cert.issuer} • {cert.issue_date}
//               </Typography>
//               {cert.credential_url && (
//                 <Button href={cert.credential_url} target="_blank" size="small" sx={{ ml: 1 }} variant="text">
//                   View Credential
//                 </Button>
//               )}
//             </Box>
//           ))}
//         </Stack>
//       ),
//     },





//     {
//       title: "Languages",
//       desc: Array.isArray(profile.languages) && profile.languages.length > 0
//         ? profile.languages.join(", ")
//         : "No languages listed.",
//       showKnowMore: Array.isArray(profile.languages) && profile.languages.length > 0,
//       content: <Typography variant="body2">{profile.languages?.join(", ")}</Typography>,
//     },
//     {
//       title: "Passions",
//       desc: "Esports, Cricket, Lawn Tennis, Photography, Cooking, Travelling, Learning new technology, and many more. You can find some of my moments and clicks in the Gallery section.",
//       showKnowMore: true,
//       content: (
//         <>
//           <List
//             sx={{
//               listStyleType: 'disc',
//               pl: 2,
//               mb: 1,
//               '& .MuiListItem-root': {
//                 display: 'list-item',
//                 color: 'black',
//                 fontSize: '1rem',
//                 py: 0,
//               },
//             }}
//           >
//             <ListItem>Esports</ListItem>
//             <ListItem>Cricket</ListItem>
//             <ListItem>Lawn Tennis</ListItem>
//             <ListItem>Photography</ListItem>
//             <ListItem>Cooking</ListItem>
//             <ListItem>Travelling</ListItem>
//             <ListItem>Learning New Technology</ListItem>
//           </List>
//           <Typography variant="body2">
//             ...and many more! Check out the{' '}
//             <Link href="/gallery" color="primary" >
//               Gallery
//             </Link>{' '}
//             for pictures.
//           </Typography>
//         </>
//       ),
//     }
//   ];

//   const handleKnowMore = (title: string) => {
//     const card = cardData.find(c => c.title === title);
//     if (card) setDialogContent({ title: card.title, content: card.content });
//     setDialogOpen(true);
//   };

//   return (
//     <div className="w-full">
//       <Box sx={{ backgroundColor: "#f8f9fa", minHeight: "100vh", fontFamily: "Poppins, sans-serif" }}>
//         <Head>
//           <title>{name} | {profile.position || "Project Engineer"}</title>
//           <meta name="description" content="Personal portfolio of Ashish Negi - Full-stack developer." />
//           <link rel="icon" href="/favicon.ico" />
//         </Head>



//         {/* Main */}
//         <Container sx={{ py: 8 }}>
//           <Grid container spacing={6} alignItems="center">
//             <Grid
//               sx={{
//                 flexBasis: {
//                   xs: "100%",
//                   md: "50%",
//                 },
//                 maxWidth: {
//                   xs: "100%",
//                   md: "50%",
//                 },
//               }}
//             >
//               <Typography variant="subtitle1" color="text.secondary" gutterBottom>
//                 {profile.position || "Project Engineer"}
//               </Typography>
//               <Typography variant="h2" fontWeight={700} color="text.primary" gutterBottom sx={{ lineHeight: 1.1 }}>
//                 I am {name}
//               </Typography>
//               <Typography color="text.secondary" sx={{ maxWidth: 480, mb: 3 }}>
//                 {profile.summary ||
//                   "Full Stack Developer with expertise in React.js, Spring Boot, FastAPI, and microservices. Experienced with cloud-native solutions, CI/CD, Docker, and data visualization."}
//               </Typography>
//               <Link href="/projects" passHref >
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   size="large"
//                   sx={{
//                     backgroundColor: "#222",
//                     "&:hover": { backgroundColor: "#444", transform: "scale(1.05)" },
//                     borderRadius: 2,
//                     px: 5,
//                     py: 2,
//                     textTransform: "none",
//                     fontWeight: 500,
//                   }}
//                 >
//                   View Projects
//                 </Button>
//               </Link>
//             </Grid>


//             <div
//               style={{
//                 maxWidth: "100%",
//                 display: "flex",
//                 justifyContent: "center",
//                 boxSizing: "border-box",
//               }}
//             >
//               <Avatar
//                 src={profile?.profileImage || altImg}
//                 alt={name}
//                 sx={{
//                   width: 320,
//                   height: 320,
//                   boxShadow: 4,
//                   borderRadius: "50%",
//                   objectFit: "cover",
//                 }}
//               />
//             </div>


//           </Grid>

//           {/* Cards Section */}
//           <Grid container spacing={4} sx={{ mt: 8 }}>
//             {cardData?.map((item) => (
//               <Grid
//                 key={item.title}
//                 sx={{
//                   display: "flex",
//                   flexBasis: {
//                     xs: "100%",
//                     md: "50%",
//                     lg: "25%",
//                   },
//                   maxWidth: {
//                     xs: "100%",
//                     md: "50%",
//                     lg: "25%",
//                   },
//                 }}
//               >
//                 <Paper
//                   elevation={4}
//                   sx={{
//                     p: 4,
//                     borderRadius: 4,
//                     transition: "box-shadow 0.3s, transform 0.3s",
//                     "&:hover": {
//                       boxShadow: 8,
//                       transform: "translateY(-4px)",
//                     },
//                     width: "100%",
//                     minHeight: 240,
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "space-between",
//                     flex: 1,
//                   }}
//                 >
//                   <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
//                     {item.title}
//                   </Typography>
//                   <Typography color="text.secondary" sx={{ mb: 3 }}>
//                     {item.desc}
//                   </Typography>
//                   {item.showKnowMore && (
//                     <MuiLink
//                       href="#"
//                       color="text.primary"
//                       underline="none"
//                       sx={{
//                         fontWeight: 500,
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 0.5,
//                         "&:hover": { color: "grey.700" },
//                       }}
//                       onClick={e => {
//                         e.preventDefault();
//                         handleKnowMore(item?.title);
//                       }}
//                     >
//                       Know More <ArrowForwardIcon fontSize="small" />
//                     </MuiLink>
//                   )}
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>
//         </Container>
//         <Chatbot
//           isOpen={chatbotOpen}
//           onClose={() => setChatbotOpen(false)}
//           profileName={name} // Pass the dynamic name to the chatbot
//         />

//         {/* Floating Action Button to open Chatbot */}
//         {!chatbotOpen && (
//           <Fab
//             color="primary"
//             aria-label="chat"
//             sx={{
//               position: 'fixed',
//               bottom: 20,
//               right: 20,
//               bgcolor: theme.palette.primary.main, // Use theme primary color
//               '&:hover': {
//                 bgcolor: theme.palette.primary.dark, // Darken on hover
//               },
//               zIndex: 1200, // Slightly lower than chatbot window
//             }}
//             onClick={() => setChatbotOpen(true)}
//           >
//             <ChatIcon />
//           </Fab>
//         )}


//         {dialogContent && (
//           <ReusableDialog
//             open={dialogOpen}
//             title={dialogContent.title}
//             content={dialogContent.content}
//             onClose={() => setDialogOpen(false)}
//           />
//         )}

//       </Box>
//     </div>
//   );
// }


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
    <div className="bg-slate-900 text-slate-300 min-h-screen font-[Poppins,sans-serif]">
      <Head>
        <title>{name} | {profile.position || "Project Engineer"}</title>
        <meta name="description" content="Personal portfolio of Ashish Negi - Full-stack developer." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}

      {/* Main */}
      <main className="container mx-auto px-6 py-16 md:py-24">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-12" id="home">
          <div className="md:w-1/2 text-center md:text-left card-enter card-enter-active">
            <p className="text-purple-400 font-semibold mb-3 text-lg">{profile.position || "Project Engineer"}</p>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">I Am {name}</h1>
            <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto md:mx-0">
              {profile.summary ||
                "Full Stack Developer with expertise in React.js, Spring Boot, FastAPI, and microservices. Experienced with cloud-native solutions, CI/CD, Docker, and data visualization."}
            </p>
            <a
              className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-10 py-4 rounded-full font-semibold hover:scale-105 transition-transform transform shadow-lg shadow-purple-500/20"
              href="#projects"
            >
              View Projects
            </a>
          </div>
          <div className="md:w-1/2 flex justify-center floating-animation">
            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full animated-gradient bg-gradient-to-br from-slate-800 via-purple-900 to-slate-800 flex items-center justify-center shadow-2xl shadow-purple-500/10">
              <div className="absolute inset-0 bg-black/20 rounded-full blur-2xl"></div>
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
              className="bg-slate-800/50 p-8 rounded-2xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-2 card-enter"
              style={{ transitionDelay: `${100 * (idx + 1)}ms` }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-slate-400 mb-6">{item.desc}</p>
              {item.showKnowMore && (
                <button
                  className="font-semibold text-purple-400 hover:text-purple-300 flex items-center group"
                  onClick={() => handleKnowMore(item.title)}
                >
                  Know More
                  <ArrowForwardIcon className="ml-1 transform group-hover:translate-x-1 transition-transform" fontSize="small" />
                </button>
              )}
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}


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