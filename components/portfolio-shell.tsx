"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import {
  ArrowUpRight,
  Code2,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import { Database, Cloud, BrainCircuit, Server, Wrench } from "lucide-react";

import {
  certificates,
  education,
  projects,
  skillGroups,
} from "@/data/portfolio";

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Skills", "skills"],
  ["Education", "education"],
  ["Projects", "projects"],
  ["Certifications", "certifications"],
  ["Contact", "contact"],
] as const;

const skillIcons = {
  code: Code2,
  server: Server,
  database: Database,
  ai: BrainCircuit,
  cloud: Cloud,
  tools: Wrench,
} as const;

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.54 20.45H7.1V8.99H3.54v11.46Z" />
    </svg>
  );
}

const reveal = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut" as const,
    },
  },
};

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div className="section-label">
        <span>{number}</span>
        <i />
        <p>{eyebrow}</p>
      </div>

      <h2>{title}</h2>

      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function PlaceholderImage({ src, alt }: { src: string; alt: string }) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div
        className="asset-placeholder"
        role="img"
        aria-label={`${alt} placeholder`}
      >
        <div className="placeholder-icon">
          <Code2 size={25} />
        </div>

        <strong>Project Preview</strong>

        <span>
          Add <b>{src.split("/").pop()}</b> to public/
          {src.split("/").slice(1, -1).join("/")}/
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} onError={() => setMissing(true)} />
  );
}

export default function PortfolioShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const [selectedCertificate, setSelectedCertificate] = useState<
    (typeof certificates)[number] | null
  >(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = [
        "home",
        "about",
        "skills",
        "education",
        "projects",
        "certifications",
        "contact",
      ];

      const current = sections.find((id) => {
        const element = document.getElementById(id);

        if (!element) return false;

        const rect = element.getBoundingClientRect();

        return rect.top <= 180 && rect.bottom >= 180;
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedCertificate ? "hidden" : "";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedCertificate(null);
      }
    };

    if (selectedCertificate) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectedCertificate]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const payload = (await response.json()) as {
        message?: string;
      };

      if (!response.ok) {
        throw new Error(payload.message || "Message could not be sent.");
      }

      setFormState({
        name: "",
        email: "",
        message: "",
      });

      setSubmitStatus({
        type: "success",
        message: payload.message || "Message sent successfully.",
      });
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Something went wrong while sending the message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="site-shell">
      {/* Ambient background */}
      <div className="ambient-background" aria-hidden="true">
        <div className="ambient-glow glow-one" />
        <div className="ambient-glow glow-two" />
        <div className="ambient-grid" />
      </div>

      {/* NAVBAR */}
      <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav-inner">
          <a
            className="brand"
            href="#home"
            onClick={closeMenu}
            aria-label="Amna Atiq home"
          >
            <span className="brand-mark">AA</span>

            <span className="brand-text">
              <strong>Amna Atiq</strong>
            </span>
          </a>

          <nav
            className={`nav-links ${menuOpen ? "is-open" : ""}`}
            aria-label="Primary navigation"
          >
            {navItems.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={closeMenu}
                className={activeSection === id ? "active" : ""}
              >
                {label}
              </a>
            ))}

            <a
              className="nav-resume"
              href="/Assests/Cv.pdf"
              download="Amna-Atiq-CV.pdf"
              onClick={closeMenu}
            >
              <Download size={15} />
              Resume
            </a>
          </nav>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main>
        {/* =========================================
            HERO
        ========================================= */}
        <section className="hero section-wrap" id="home">
          <div className="hero-grid-lines" aria-hidden="true" />

          <div className="hero-layout">
            <motion.div
              className="hero-copy"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: shouldReduceMotion ? 0 : 0.09,
                  },
                },
              }}
            >
              <motion.div className="availability" variants={reveal}>
                <span className="availability-dot" />

                <span>Available for opportunities</span>
              </motion.div>

              <motion.p className="hero-kicker" variants={reveal}>
                Hi, my name is
              </motion.p>

              <motion.h1 variants={reveal}>
                Amna <span>Atiq</span>
              </motion.h1>

              <motion.div className="hero-role" variants={reveal}>
                <strong>Full Stack Engineer</strong>
              </motion.div>

              <motion.p className="hero-intro" variants={reveal}>
                Developing smart, scalable, and impactful digital solutions.
              </motion.p>

              <motion.div className="hero-meta" variants={reveal}>
                <MapPin size={16} />

                <span>Faisalabad, Pakistan</span>
              </motion.div>

              <motion.div className="social-row" variants={reveal}>
                <a
                  href="https://github.com/amna-ctrl102"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon size={17} />
                  GitHub
                </a>

                <a
                  href="https://www.linkedin.com/in/amna-atiq-a69366343/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedinIcon size={17} />
                  LinkedIn
                </a>

                <span className="social-divider" />

                <a href="mailto:rajpootamna393@gmail.com">
                  <Mail size={17} />
                  Email
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
        {/* =========================================
            ABOUT
        ========================================= */}
        <motion.section
          className="section-wrap"
          id="about"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          variants={reveal}
        >
          <div className="about-grid">
            <SectionHeading
              number=""
              eyebrow="About me"
              title="Developing Skills, Building Real Solutions"
            />

            <div className="about-content">
              <div className="about-timeline">
                <div className="about-point">
                  <p>
                    I’m a Computer Science student at the University of
                    Education, Lahore, pursuing a BSCS degree with a focus on
                    software development and AI engineering.
                  </p>
                </div>

                <div className="about-point">
                  <p>
                    I build full-stack applications and backend services, work
                    with APIs and databases, and enjoy solving programming
                    problems.
                  </p>
                </div>

                <div className="about-point">
                  <p>
                    I strengthen my problem-solving skills through LeetCode and
                    hands-on projects while exploring practical applications of
                    AI. I’m currently focused on growing as a Software Engineer
                    by building reliable, scalable, and maintainable
                    applications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
        {/* =========================================
    SKILLS
========================================= */}
        <motion.section
          className="section-wrap"
          id="skills"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          variants={reveal}
        >
          <SectionHeading
            number=""
            eyebrow="Skills"
            title="Technologies & Tools"
            description="A practical toolkit covering frontend, backend, databases, AI, and cloud technologies"
          />

          <div className="skills-grid">
            {skillGroups.map((group, index) => (
              <motion.article
                className="skill-card"
                key={group.label}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                      }
                }
                transition={{
                  duration: 0.25,
                }}
              >
                <div className="skill-card-top">
                  <div className="skill-icon">
                    {(() => {
                      const Icon =
                        skillIcons[group.icon as keyof typeof skillIcons];
                      return <Icon size={21} />;
                    })()}
                  </div>

                  <span className="skill-number">0{index + 1}</span>
                </div>

                <h3>{group.label}</h3>

                <div className="skill-list">
                  {group.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
        {/* =========================================
          EDUCATION
        ========================================= */}
        <motion.section
          className="section-wrap"
          id="education"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          variants={reveal}
        >
          <SectionHeading
            number=""
            eyebrow="Academic background"
            title="An overview of my education and academic background"
          />

          <div className="education-list">
            {education.map((item, index) => (
              <motion.article
                className="education-card"
                key={item.title}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        x: 5,
                      }
                }
                transition={{
                  duration: 0.25,
                }}
              >
                <div className="education-index">0{index + 1}</div>

                <div className="education-main">
                  <h3>{item.title}</h3>

                  <p>{item.institution}</p>
                </div>

                <div className="education-result">
                  <span>{item.dates}</span>

                  <strong>{item.result}</strong>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
        {/*  ========================================= PROJECTS
        =========================================  */}
        <motion.section
          className="section-wrap projects-section"
          id="projects"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          variants={reveal}
        >
          <SectionHeading
            number=""
            eyebrow="Selected work"
            title="Featured projects"
            description="Real-world applications showcasing full-stack development, scalable architecture, and modern engineering practices"
          />

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.article
                className="project-card"
                key={project.name}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -6,
                      }
                }
                transition={{
                  duration: 0.3,
                }}
              >
                {/* Project Screenshot */}
                <div className="project-image">
                  <PlaceholderImage
                    src={project.image}
                    alt={`${project.name} project screenshot`}
                  />

                  <div className="project-image-overlay">
                    <span>View project</span>
                    <ArrowUpRight size={17} />
                  </div>

                  <span className="project-index">0{index + 1}</span>
                </div>

                {/* Project Content */}
                <div className="project-content">
                  <h3>{project.name}</h3>

                  <p>{project.description}</p>

                  {/* Technologies */}
                  <div className="tag-row">
                    {project.technologies.slice(0, 4).map((technology) => (
                      <span key={technology}>{technology}</span>
                    ))}

                    {project.technologies.length > 4 && (
                      <span className="more-technologies">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Project Actions */}
                  <div className="project-links">
                    <a
                      className="project-primary-link"
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>Live Demo</span>
                      <ExternalLink size={14} />
                    </a>

                    <a
                      className="project-secondary-link"
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <GithubIcon size={14} />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
        {/* =========================================
            CERTIFICATIONS
        ========================================= */}
        <motion.section
          className="section-wrap"
          id="certifications"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          variants={reveal}
        >
          <SectionHeading
            number=""
            eyebrow="Highlights & milestones"
            title="Certifications & achievements"
          />

          <div className="certificate-grid">
            {certificates.map((certificate) => (
              <motion.article
                className="certificate-card"
                key={certificate.title}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -7,
                      }
                }
              >
                <div className="certificate-info">
                  <span>{certificate.organization}</span>

                  <h3>{certificate.title}</h3>

                  <button
                    type="button"
                    onClick={() => setSelectedCertificate(certificate)}
                  >
                    View Certificate
                    <ArrowUpRight size={15} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
        {/* =========================================
    CONTACT
========================================= */}

        <motion.section
          className="section-wrap contact-section"
          id="contact"
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          variants={reveal}
        >
          {/* Section heading — unchanged */}
          <SectionHeading
            number=""
            eyebrow="Start a conversation"
            title="Let’s create something great"
            description="Have a project, an opportunity, or an interesting problem? I’d love to hear about it"
          />

          {/* Contact card */}
          <div className="contact-card">
            <div className="contact-layout">
              {/* ================= LEFT ================= */}

              <div className="contact-info">
                <div className="contact-details">
                  {/* Email */}
                  <a
                    href="mailto:rajpootamna393@gmail.com"
                    className="contact-detail"
                  >
                    <span className="contact-icon">
                      <Mail size={20} />
                    </span>

                    <span className="contact-detail-text">
                      <small>Email</small>
                      <strong>rajpootamna393@gmail.com</strong>
                    </span>
                  </a>

                  {/* Location */}
                  <div className="contact-detail">
                    <span className="contact-icon">
                      <MapPin size={20} />
                    </span>

                    <span className="contact-detail-text">
                      <small>Location</small>
                      <strong>Faisalabad, Pakistan</strong>
                    </span>
                  </div>
                </div>

                {/* =========================================
            RESUME + LINKEDIN + GITHUB
            ALL IN ONE LINE
        ========================================= */}

                <div className="contact-actions">
                  {/* Resume */}
                  <a
                    className="button button-secondary contact-resume"
                    href="/Assests/Cv.pdf"
                    download="Amna-Atiq-CV.pdf"
                  >
                    <Download size={17} />
                    <span>Resume</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    className="contact-social-link"
                    href="https://www.linkedin.com/in/amna-atiq-a69366343/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon size={19} />
                  </a>

                  {/* GitHub */}
                  <a
                    className="contact-social-link"
                    href="https://github.com/amna-ctrl102"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    <GithubIcon size={19} />
                  </a>
                </div>
              </div>

              {/* ================= RIGHT ================= */}

              <form className="contact-form" onSubmit={handleSubmit}>
                {/* Form Header */}
                <div className="form-header">
                  <span>
                    <MessageCircle size={17} />
                    Get in touch
                  </span>

                  <small>Usually replies quickly</small>
                </div>

                {/* Form Fields */}
                <div className="form-fields">
                  {/* Name + Email */}
                  <div className="form-row">
                    {/* Name */}
                    <label>
                      <span>Name</span>

                      <input
                        required
                        value={formState.name}
                        onChange={(event) =>
                          setFormState({
                            ...formState,
                            name: event.target.value,
                          })
                        }
                        placeholder="Your name"
                      />
                    </label>

                    {/* Email */}
                    <label>
                      <span>Email</span>

                      <input
                        required
                        type="email"
                        value={formState.email}
                        onChange={(event) =>
                          setFormState({
                            ...formState,
                            email: event.target.value,
                          })
                        }
                        placeholder="you@example.com"
                      />
                    </label>
                  </div>

                  {/* Message */}
                  <label>
                    <span>Message</span>

                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={(event) =>
                        setFormState({
                          ...formState,
                          message: event.target.value,
                        })
                      }
                      placeholder="Tell me a little about your idea..."
                    />
                  </label>
                </div>

                {/* Submit */}
                <button
                  className="button button-primary form-button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <ArrowUpRight size={17} />
                </button>

                {submitStatus && (
                  <p
                    className={`form-note ${
                      submitStatus.type === "success" ? "success" : "error"
                    }`}
                    aria-live="polite"
                  >
                    <MessageCircle size={14} />
                    {submitStatus.message}
                  </p>
                )}

                {!submitStatus && (
                  <p className="form-note">
                    <MessageCircle size={14} />
                    Sends the message directly to your email inbox.
                  </p>
                )}
              </form>
            </div>
          </div>
        </motion.section>
      </main>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="site-footer">
        <div className="footer-main">
          <a className="brand" href="#home">
            <span className="brand-mark">AA</span>

            <span className="brand-text">
              <strong>Amna Atiq</strong>

              <small>Full Stack Engineer</small>
            </span>
          </a>

          <div className="footer-links">
            <a
              href="https://github.com/amna-ctrl102"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon size={17} />
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/amna-atiq-a69366343/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedinIcon size={17} />
              LinkedIn
            </a>

            <a href="mailto:rajpootamna393@gmail.com">
              <Mail size={17} />
              Email
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <a href="#home">
            Back to top
            <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>

      {/* =========================================
          CERTIFICATE MODAL
      ========================================= */}

      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={selectedCertificate.title}
            onClick={() => setSelectedCertificate(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="certificate-modal"
              onClick={(event) => event.stopPropagation()}
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 25,
                scale: 0.96,
              }}
              transition={{
                duration: 0.3,
              }}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedCertificate(null)}
                aria-label="Close certificate"
              >
                <X size={20} />
              </button>

              <div className="modal-image">
                <PlaceholderImage
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                />
              </div>

              <div className="modal-caption">
                <span>{selectedCertificate.organization}</span>

                <h3>{selectedCertificate.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
