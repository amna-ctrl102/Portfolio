export type Project = {
  name: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  image: string;
};

export const projects: Project[] = [
  {
    name: "Real Estate",
    description:
      "A full-stack real estate platform where users can browse, search, and filter property listings, view detailed property information, create and manage listings, and contact property owners.",
    technologies: ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    liveUrl: "https://mern-estate-frontend-lac.vercel.app/",
    githubUrl: "https://github.com/amna-ctrl102/MERN-estate",
    image: "/Assests/mern-estate.png",
  },
  {
    name: "MultiVendor E-Commerce",
    description:
      "A full-stack multi-vendor e-commerce platform where sellers can manage shops and products while buyers can browse products, place orders, make payments, and communicate with sellers.",
    technologies: ["React.js", "JavaScript", "Redux Toolkit", "Node.js", "Express.js", "MongoDB"],
    liveUrl: "https://multivendor-frontend-amber.vercel.app/",
    githubUrl: "https://github.com/amna-ctrl102/Multivendor",
    image: "/Assests/Multivendor.png",
  },
];

export const skillGroups = [
  {
    label: "Frontend",
    icon: "code",
    skills: [
      "React.js",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit"
    ],
  },

  {
    label: "Backend",
    icon: "server",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
    ],
  },

  {
    label: "Databases",
    icon: "database",
    skills: [
      "MongoDB",
      "PostgreSQL",
    ],
  },

  {
    label: "Cloud & DevOps",
    icon: "cloud",
    skills: [
      "AWS",
      "Docker",
      "Github Actions",
      "Vercel Deployment",
    ],
  },

  {
    label: "AI",
    icon: "ai",
    skills: [
      "OpenAI APIs",
      "Gemini",
      "Claude",
    ],
  },

  {
    label: "Tools",
    icon: "tools",
    skills: [
      "Git",
      "GitHub",
      "Postman",
      "VS Code",
    ],
  },
];

export const education = [
  {
    title: "Bachelor of Science in Computer Science",
    institution: "University of Education, Lahore - Faisalabad Campus",
    dates: "2024 – 2028 (Expected)",
    result: "CGPA: 3.72 / 4.00",
  },
  {
    title: "Intermediate (12th Grade) - ICS",
    institution: "Government Graduate College for Women",
    dates: "2021 – 2023",
    result: "Marks: 1014 / 1200",
  },
  {
    title: "Matriculation (10th Grade) - Computer Science",
    institution: "Government Deccan Girls High School",
    dates: "2019 – 2021",
    result: "Marks: 1005 / 1100",
  },
];

export const certificates = [
  {
    title: "Dev Weekends Fellowship Certificate",
    organization: "Dev Weekends Fellowship",
    image: "/Assests/Participation.png",
  },
  {
    title: "AI Fluency Certificate",
    organization: "Anthropic Academy",
    image: "/Assests/AI Fluency.png",
  },
];
