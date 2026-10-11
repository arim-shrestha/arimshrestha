"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSkills } from "@/hooks/usePortfolioData";
import { type SkillCategory } from "@/lib/portfolioTypes";
import { useThemeMode } from "@/contexts/ThemeModeContext";
import content from "@/data/skills.json";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import CodeIcon from "@mui/icons-material/Code";
import StorageIcon from "@mui/icons-material/Storage";
import BuildIcon from "@mui/icons-material/Build";
import DnsIcon from "@mui/icons-material/Dns";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import DesktopWindowsIcon from "@mui/icons-material/DesktopWindows";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
import ExtensionIcon from "@mui/icons-material/Extension";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

gsap.registerPlugin(ScrollTrigger);

const categoryIcons: Record<string, React.ReactElement> = {
  Frontend: <CodeIcon sx={{ fontSize: 18 }} />,
  Backend: <DnsIcon sx={{ fontSize: 18 }} />,
  Database: <StorageIcon sx={{ fontSize: 18 }} />,
  "Tools & DevOps": <BuildIcon sx={{ fontSize: 18 }} />,
  "Mobile Development": <SmartphoneIcon sx={{ fontSize: 18 }} />,
  "Desktop Development": <DesktopWindowsIcon sx={{ fontSize: 18 }} />,
  "Cloud & Deployment": <CloudQueueIcon sx={{ fontSize: 18 }} />,
  "Adobe Extensions & Plugins": <ExtensionIcon sx={{ fontSize: 18 }} />,
  "Tools & Creative": <BuildIcon sx={{ fontSize: 18 }} />,
  "CMS & E-commerce": <StorefrontOutlinedIcon sx={{ fontSize: 18 }} />,
};

const loadingSkills: SkillCategory[] = Array.from({ length: 4 }, (_, index) => ({
  _id: `loading-skill-${index}`,
  category: "",
  skills: ["", "", "", "", "", ""],
  order: index,
}));

export default function Skills() {
  const { data: skillsData, loading } = useSkills();
  const { mode } = useThemeMode();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cardsAnimDone = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (loading || cardsAnimDone.current || !skillsData.length || !cardsRef.current) return;
    cardsAnimDone.current = true;

    gsap.fromTo(
      cardsRef.current.children,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
      },
    );
  }, [skillsData, loading]);

  return (
    <Box
      component="section"
      id="skills"
      ref={sectionRef}
      sx={{ py: { xs: "52px", sm: "64px", md: "80px", lg: "100px" } }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: "14px", sm: "24px" } }}>
        <Box
          ref={headingRef}
          sx={{ textAlign: "center", maxWidth: 560, mx: "auto", mb: 7.5, opacity: 0 }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "primary.main",
              mb: 1.75,
              justifyContent: "center",
              "&::before": {
                content: '\"\"',
                display: "block",
                width: 24,
                height: 2,
                background: "var(--accent-blue)",
                borderRadius: 1,
                flexShrink: 0,
              },
            }}
          >
            {content.eyebrow}
          </Box>
          <Typography
            variant="h2"
            sx={{
              fontSize: "clamp(1.9rem,4vw,2.8rem)",
              "& span": {
                background: "var(--accent-blue)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              },
            }}
          >
            {content.titleLead} <span>{content.titleAccent}</span>
          </Typography>
          <Typography sx={{ color: "text.secondary", mt: 2, fontSize: "0.95rem", lineHeight: 1.7 }}>
            {content.description}
          </Typography>
        </Box>

        <Box
          ref={cardsRef}
          sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px,1fr))", gap: 2.5 }}
        >
          {(loading ? loadingSkills : skillsData).map((category, index) => (
            <Card
              key={loading ? `skills-skeleton-${index}` : category.category}
              sx={{
                opacity: loading ? 1 : 0,
                background:
                  index % 2 === 0
                    ? "var(--bg-card)"
                    : mode === "dark"
                      ? "rgba(13,15,24,0.8)"
                      : "rgba(241,245,249,0.8)",
                "&:hover": { transform: "translateY(-4px)" },
              }}
            >
              <CardContent sx={{ p: "28px", "&:last-child": { pb: "28px" } }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2.5 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: "10px",
                      flexShrink: 0,
                      background: "var(--accent-soft)",
                      border: "1px solid",
                      borderColor: "divider",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: mode === "dark" ? "primary.light" : "primary.main",
                    }}
                  >
                    {!loading && categoryIcons[category.category]}
                  </Box>
                  {loading ? (
                    <Skeleton variant="text" width={130} sx={{ fontSize: "0.95rem" }} />
                  ) : (
                    <Typography sx={{ fontSize: "0.95rem", fontWeight: 700, letterSpacing: "-0.01em" }}>
                      {category.category}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {category.skills.map((skill, skillIndex) => (
                    <Chip
                      key={loading ? `skill-skeleton-${index}-${skillIndex}` : skill}
                      label={loading ? <Skeleton variant="text" width={56} /> : skill}
                      size="small"
                      sx={{
                        background: "var(--accent-soft)",
                        border: "1px solid var(--border)",
                        color: mode === "dark" ? "primary.light" : "primary.main",
                        fontSize: "0.8rem",
                        fontWeight: 500,
                        borderRadius: "9999px",
                        cursor: loading ? "progress" : "default",
                        "&:hover": {
                          background: "var(--accent-soft)",
                          borderColor: "primary.main",
                          transform: "translateY(-2px)",
                        },
                        transition: "background 0.2s, border-color 0.2s, transform 0.2s",
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
