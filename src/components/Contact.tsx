"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProfile } from "@/hooks/usePortfolioData";
import content from "@/data/contact.json";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import PhoneIcon from "@mui/icons-material/Phone";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { data: profile } = useProfile();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const contactLinks = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: <EmailIcon sx={{ fontSize: 19 }} />,
      external: false,
    },
    {
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone}`,
      icon: <PhoneIcon sx={{ fontSize: 19 }} />,
      external: false,
    },
    {
      label: "GitHub Personal",
      value: profile.github,
      href: profile.github,
      icon: <GitHubIcon sx={{ fontSize: 19 }} />,
      external: true,
    },
    {
      label: "GitHub Work (Katsumok Co. Ltd. | Gamenic Nalamiz Tech)",
      value: profile.githubWork,
      href: profile.githubWork,
      icon: <GitHubIcon sx={{ fontSize: 19 }} />,
      external: true,
    },
  ].filter((link) => Boolean(link.value));

  useEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from([headingRef.current, linksRef.current], {
          opacity: 0,
          y: 28,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 76%" },
        });
      });

      return () => media.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <Box
      component="section"
      id="contact"
      ref={sectionRef}
      sx={{ py: { xs: "52px", sm: "64px", md: "80px", lg: "100px" } }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: "14px", sm: "24px" } }}>
        <Grid container spacing={{ xs: 4.5, md: 8 }} alignItems="start">
          <Grid size={{ xs: 12, md: 5 }}>
            <Box ref={headingRef}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  mb: 1.75,
                  color: "primary.main",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  "&::before": {
                    content: '""',
                    display: "block",
                    width: 24,
                    height: 2,
                    flexShrink: 0,
                    borderRadius: 1,
                    background: "var(--accent-blue)",
                  },
                }}
              >
                {content.eyebrow}
              </Box>

              <Typography
                variant="h2"
                sx={{
                  mb: 2.5,
                  fontSize: "clamp(1.9rem,4vw,2.8rem)",
                  "& span": {
                    background: "var(--accent-blue)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  },
                }}
              >
                {content.titleLead}
                <br />
                <span>{content.titleAccent}</span>
              </Typography>

              <Typography sx={{ maxWidth: 430, color: "text.secondary", fontSize: "0.95rem", lineHeight: 1.8 }}>
                {content.description}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <Box
              ref={linksRef}
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
                gap: 1.5,
              }}
            >
              {contactLinks.map((link) => (
                <Box
                  key={link.label}
                  component="a"
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  sx={{
                    minWidth: 0,
                    minHeight: 112,
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 1.6,
                    p: { xs: 2, sm: 2.25 },
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "16px",
                    background: "var(--bg-card)",
                    color: "text.primary",
                    textDecoration: "none",
                    transition: "border-color 0.25s, transform 0.25s, box-shadow 0.25s",
                    "&:hover": {
                      borderColor: "var(--border-hover)",
                      transform: "translateY(-3px)",
                      boxShadow: "var(--shadow-card)",
                    },
                    "&:focus-visible": {
                      outline: "2px solid var(--accent-blue-light)",
                      outlineOffset: 3,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      flexShrink: 0,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "11px",
                      background: "var(--accent-soft)",
                      color: "primary.main",
                    }}
                  >
                    {link.icon}
                  </Box>

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1 }}>
                      <Typography
                        sx={{
                          color: "text.primary",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          letterSpacing: "0.04em",
                          lineHeight: 1.45,
                        }}
                      >
                        {link.label}
                      </Typography>
                      {link.external && (
                        <OpenInNewRoundedIcon sx={{ mt: 0.1, color: "text.disabled", fontSize: 15, flexShrink: 0 }} />
                      )}
                    </Box>
                    <Typography
                      sx={{
                        mt: 0.65,
                        overflow: "hidden",
                        color: "text.secondary",
                        fontSize: "0.8rem",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {link.value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
