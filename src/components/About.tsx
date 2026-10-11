"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProfile } from "@/hooks/usePortfolioData";
import about from "@/data/about.json";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import CodeIcon from "@mui/icons-material/Code";
import ApiIcon from "@mui/icons-material/Api";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ExtensionIcon from "@mui/icons-material/Extension";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

gsap.registerPlugin(ScrollTrigger);

const highlightIcons: Record<string, React.ReactElement> = {
  code: <CodeIcon sx={{ fontSize: 20 }} />,
  api: <ApiIcon sx={{ fontSize: 20 }} />,
  desktop: <DesktopWindowsIcon sx={{ fontSize: 20 }} />,
  plugin: <ExtensionIcon sx={{ fontSize: 20 }} />,
  education: <SchoolOutlinedIcon sx={{ fontSize: 20 }} />,
};

export default function About() {
  const { data: profile, loading } = useProfile();
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        rightRef.current?.children ?? [],
        { opacity: 0, x: 50 },
        {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <Box
      component="section"
      id="about"
      ref={sectionRef}
      sx={{ py: { xs: "64px", sm: "80px", md: "104px" }, background: "var(--bg-secondary)" }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: "18px", sm: "28px" } }}>
        <Grid container spacing={{ xs: 4.5, md: 10 }} alignItems="start">
          {/* Left */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box ref={leftRef} sx={{ opacity: 0 }}>
              {/* Section label */}
              <Box
                sx={{
                  display: "inline-flex", alignItems: "center", gap: 1,
                  fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em",
                  textTransform: "uppercase", color: "primary.main", mb: 1.75,
                  "&::before": {
                    content: '""', display: "block",
                    width: 24, height: 2,
                    background: "var(--accent-blue)",
                    borderRadius: 1, flexShrink: 0,
                  },
                }}
              >
                {about.eyebrow}
              </Box>

              <Typography
                variant="h2"
                sx={{
                  fontSize: "clamp(1.9rem,4vw,2.8rem)",
                  mb: 3,
                  "& span": {
                    color: "var(--accent-blue)",
                  },
                }}
              >
                {about.titleLead}<br />
                <span>{about.titleAccent}</span>
              </Typography>

              <Typography
                sx={{ color: "text.secondary", lineHeight: 1.8, mb: 2, fontSize: "0.975rem" }}
              >
                {loading ? (
                  <>
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="96%" />
                    <Skeleton variant="text" width="92%" />
                    <Skeleton variant="text" width="74%" />
                  </>
                ) : (
                  profile.bio
                )}
              </Typography>

              <Typography
                sx={{ color: "text.secondary", lineHeight: 1.8, mb: 3, fontSize: "0.975rem" }}
              >
                {about.focusText}
              </Typography>

              {/* Location & status chips */}
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25, mt: 3.5 }}>
                {[
                  { icon: <LocationOnIcon sx={{ fontSize: 14 }} />, text: profile.location },
                  { icon: <AccessTimeIcon sx={{ fontSize: 14 }} />, text: about.availabilityLabel },
                ].map((item) => (
                  <Chip
                    key={item.text}
                    icon={<Box sx={{ color: "primary.main !important", display: "flex" }}>{item.icon}</Box>}
                    label={loading ? "Loading..." : item.text}
                    variant="outlined"
                    sx={{
                      borderColor: "divider",
                      background: "var(--accent-soft)",
                      color: "text.secondary",
                      fontSize: "0.82rem",
                      fontWeight: 500,
                      height: "auto",
                      py: "8px",
                      "& .MuiChip-icon": { color: "primary.main" },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Right: highlight cards */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box ref={rightRef} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {about.highlights.map((item) => (
                <Card key={item.title} sx={{ opacity: 0 }}>
                  <CardContent
                    sx={{
                      p: 3,
                      display: "flex", gap: "18px", alignItems: "flex-start",
                      "&:last-child": { pb: 3 },
                    }}
                  >
                    <Box
                      sx={{
                        width: 44, height: 44, borderRadius: "12px", flexShrink: 0,
                        background: "var(--accent-soft)",
                        border: "1px solid",
                        borderColor: "divider",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "primary.main",
                      }}
                    >
                      {highlightIcons[item.icon]}
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "0.95rem", fontWeight: 600, color: "text.primary", mb: 0.75 }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ fontSize: "0.84rem", color: "text.secondary", lineHeight: 1.6 }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
