"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useExperience } from "@/hooks/usePortfolioData";
import content from "@/data/experience.json";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import EastRoundedIcon from "@mui/icons-material/EastRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import PhoneIphoneRoundedIcon from "@mui/icons-material/PhoneIphoneRounded";
import DesktopWindowsOutlinedIcon from "@mui/icons-material/DesktopWindowsOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

gsap.registerPlugin(ScrollTrigger);

const platformIcons = {
  Web: LanguageRoundedIcon,
  "E-commerce": StorefrontOutlinedIcon,
  Mobile: PhoneIphoneRoundedIcon,
  Desktop: DesktopWindowsOutlinedIcon,
  "Creative tools": AutoAwesomeOutlinedIcon,
};

export default function Experience() {
  const { data: experienceData } = useExperience();
  const archive = content.contributionArchive;
  const [selectedYear, setSelectedYear] = useState<number>(archive.defaultYear);
  const [selectedPersonalYear, setSelectedPersonalYear] = useState<number>(archive.personalProfile.defaultYear);
  const [activeGithubProfile, setActiveGithubProfile] = useState<"office" | "personal">("office");
  const selectedActivity = archive.years.find((item) => item.year === selectedYear) ?? archive.years[0];
  const selectedPersonalActivity =
    archive.personalProfile.years.find((item) => item.year === selectedPersonalYear) ?? archive.personalProfile.years[0];
  const isOfficeProfile = activeGithubProfile === "office";
  const activeProfileUrl = isOfficeProfile ? archive.profileUrl : archive.personalProfile.profileUrl;
  const activeProfileLabel = isOfficeProfile ? archive.profileLabel : archive.personalProfile.profileLabel;
  const [careerStart, careerEnd] = content.careerRange.split("—").map((year) => year.trim());
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const archiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 28,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
        });

        gsap.from(overviewRef.current, {
          opacity: 0,
          x: -24,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: overviewRef.current, start: "top 82%" },
        });

        gsap.from("[data-experience-card]", {
          opacity: 0,
          y: 36,
          duration: 0.7,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: { trigger: timelineRef.current, start: "top 80%" },
        });

        if (archive.visible) {
          gsap.from(archiveRef.current, {
            opacity: 0,
            y: 36,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: archiveRef.current, start: "top 84%" },
          });
        }
      });

      const roleCards = gsap.utils.toArray<HTMLElement>("[data-experience-card]");
      roleCards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 38%",
          end: "bottom 38%",
          onEnter: () => setActiveRoleIndex(index),
          onEnterBack: () => setActiveRoleIndex(index),
        });
      });

      return () => media.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, [archive.visible]);

  const scrollToRole = (index: number) => {
    setActiveRoleIndex(index);
    document.getElementById(`experience-role-${index}`)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <Box
      component="section"
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      sx={{
        position: "relative",
        overflow: "clip",
        pt: { xs: "68px", sm: "84px", md: "112px" },
        pb: 0,
        background: "var(--bg-secondary)",
        "&::after": {
          content: '\"\"',
          position: "absolute",
          width: 560,
          height: 560,
          right: -260,
          top: -260,
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent-soft) 0%, transparent 68%)",
          pointerEvents: "none",
        },
      }}
    >
      <Box sx={{ position: "relative", zIndex: 1, maxWidth: 1200, mx: "auto", px: { xs: "18px", sm: "28px" } }}>
        <Box
          ref={headingRef}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.2fr) minmax(300px, 0.8fr)" },
            gap: { xs: 3, md: 8 },
            alignItems: "end",
            pb: { xs: 4.5, md: 6 },
            mb: { xs: 5, md: 7 },
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Box>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                mb: 1.75,
                color: "primary.main",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                "&::before": {
                  content: '\"\"',
                  width: 24,
                  height: 2,
                  borderRadius: 1,
                  background: "var(--accent-blue)",
                },
              }}
            >
              {content.eyebrow}
            </Box>

            <Typography
              id="experience-heading"
              variant="h2"
              sx={{
                maxWidth: 680,
                fontSize: "clamp(2.15rem, 5vw, 4rem)",
                lineHeight: 1.02,
                "& span": { color: "var(--accent-blue)" },
              }}
            >
              {content.titleLead} <span>{content.titleAccent}</span>
            </Typography>
          </Box>

          <Box>
            <Typography sx={{ color: "text.secondary", fontSize: "0.98rem", lineHeight: 1.8, mb: 3 }}>
              {content.description}
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                overflow: "hidden",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "14px",
                background: "var(--accent-soft)",
              }}
            >
              {content.stats.map((stat) => (
                <Box
                  key={stat.label}
                  sx={{
                    position: "relative",
                    minWidth: 0,
                    px: { xs: 1.25, sm: 1.75 },
                    py: 1.75,
                    "&:not(:first-of-type)": { borderLeft: "1px solid", borderColor: "divider" },
                    "&::before": {
                      content: '\"\"',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: "var(--accent-blue)",
                      opacity: 0.85,
                    },
                  }}
                >
                  <Typography sx={{ fontFamily: "var(--font-heading)", fontSize: "1.35rem", fontWeight: 700, lineHeight: 1.1 }}>
                    {stat.value}
                  </Typography>
                  <Typography sx={{ mt: 0.5, color: "text.secondary", fontSize: "0.7rem", lineHeight: 1.35 }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "250px minmax(0, 1fr)" },
            gap: { xs: 5, md: 7, lg: 9 },
            alignItems: "start",
          }}
        >
          <Box
            ref={overviewRef}
            component="aside"
            aria-label={content.overviewLabel}
            sx={{ position: { md: "sticky" }, top: { md: 100 }, minWidth: 0 }}
          >
            <Box
              sx={{
                position: "relative",
                overflow: "hidden",
                p: { xs: 2, sm: 2.5, md: 2.25 },
                border: "1px solid",
                borderColor: "var(--border-strong)",
                borderRadius: "20px",
                background:
                  "linear-gradient(150deg, color-mix(in srgb, var(--bg-card) 96%, transparent), color-mix(in srgb, var(--accent-soft) 76%, var(--bg-card)))",
                boxShadow: "var(--shadow-card)",
                "&::after": {
                  content: `'${content.stats[0].value}'`,
                  position: "absolute",
                  top: -14,
                  right: -4,
                  color: "var(--accent-soft)",
                  fontFamily: "var(--font-heading)",
                  fontSize: "5.5rem",
                  fontWeight: 700,
                  lineHeight: 1,
                  pointerEvents: "none",
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Typography
                  sx={{
                    color: "primary.main",
                    fontSize: "0.67rem",
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                  }}
                >
                  {content.overviewLabel}
                </Typography>
                <Typography
                  sx={{
                    mt: 1.1,
                    maxWidth: 190,
                    fontFamily: "var(--font-heading)",
                    fontSize: { xs: "1.55rem", md: "1.8rem" },
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.12,
                  }}
                >
                  {content.overviewTitle}
                </Typography>
                <Typography sx={{ mt: 1.25, color: "text.secondary", fontSize: "0.76rem", lineHeight: 1.65 }}>
                  {content.journey}
                </Typography>
              </Box>

              <Box
                aria-label={content.careerRange}
                sx={{
                  position: "relative",
                  zIndex: 1,
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  alignItems: "center",
                  gap: 1,
                  mt: 2.25,
                  py: 1.25,
                  borderTop: "1px solid",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography sx={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 700 }}>
                  {careerStart}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", color: "primary.main" }}>
                  <Box sx={{ width: 5, height: 5, flexShrink: 0, borderRadius: "50%", background: "currentColor" }} />
                  <Box sx={{ flex: 1, height: 1, background: "currentColor", opacity: 0.45 }} />
                  <EastRoundedIcon sx={{ mx: -0.35, fontSize: 16 }} />
                </Box>
                <Typography sx={{ fontFamily: "var(--font-mono)", fontSize: "0.72rem", fontWeight: 700 }}>
                  {careerEnd}
                </Typography>
              </Box>

              <Box
                component="nav"
                aria-label={content.overviewPrompt}
                sx={{
                  position: "relative",
                  zIndex: 1,
                  display: { xs: "grid", md: "flex" },
                  gridAutoFlow: { xs: "column" },
                  gridAutoColumns: { xs: "minmax(190px, 72%)", sm: "minmax(190px, 1fr)" },
                  flexDirection: { md: "column" },
                  gap: 0.75,
                  mt: 2,
                  mx: { xs: -2, sm: -2.5, md: 0 },
                  px: { xs: 2, sm: 2.5, md: 0 },
                  pb: { xs: 0.75, md: 0 },
                  overflowX: { xs: "auto", md: "visible" },
                  scrollSnapType: { xs: "x mandatory", md: "none" },
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": { display: "none" },
                }}
              >
                {experienceData.map((exp, index) => {
                  const isActive = activeRoleIndex === index;
                  const years = exp.duration.match(/\d{4}/g)?.join("—") ?? exp.duration;

                  return (
                    <ButtonBase
                      key={`${exp.company}-overview`}
                      onClick={() => scrollToRole(index)}
                      aria-current={isActive ? "step" : undefined}
                      sx={{
                        position: "relative",
                        display: "grid",
                        gridTemplateColumns: "32px minmax(0, 1fr) auto",
                        alignItems: "center",
                        gap: 1,
                        width: "100%",
                        minWidth: 0,
                        px: 1,
                        py: 1.15,
                        border: "1px solid",
                        borderColor: isActive ? "var(--border-strong)" : "transparent",
                        borderRadius: "12px",
                        background: isActive ? "var(--accent-soft)" : "transparent",
                        textAlign: "left",
                        scrollSnapAlign: "start",
                        transition: "background-color 0.2s ease, border-color 0.2s ease",
                        "&:hover": { background: "var(--accent-soft)" },
                        "&:focus-visible": { outline: "2px solid var(--accent-blue-light)", outlineOffset: 2 },
                      }}
                    >
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          display: "grid",
                          placeItems: "center",
                          borderRadius: "10px",
                          background: isActive ? "var(--accent-blue)" : "var(--bg-card)",
                          color: isActive ? "var(--bg-primary)" : "primary.main",
                          border: "1px solid",
                          borderColor: isActive ? "var(--accent-blue)" : "divider",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.62rem",
                          fontWeight: 700,
                        }}
                      >
                        {String(experienceData.length - index).padStart(2, "0")}
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{
                            overflow: "hidden",
                            color: isActive ? "text.primary" : "text.secondary",
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {exp.company}
                        </Typography>
                        <Typography sx={{ mt: 0.15, color: "text.disabled", fontSize: "0.62rem" }}>
                          {years}
                        </Typography>
                      </Box>
                      <EastRoundedIcon
                        sx={{
                          color: isActive ? "primary.main" : "text.disabled",
                          fontSize: 16,
                          transform: isActive ? "translateX(2px)" : "none",
                          transition: "transform 0.2s ease",
                        }}
                      />
                    </ButtonBase>
                  );
                })}
              </Box>

              <Typography
                sx={{
                  position: "relative",
                  zIndex: 1,
                  display: { xs: "none", md: "block" },
                  mt: 1.5,
                  color: "text.disabled",
                  fontSize: "0.62rem",
                  lineHeight: 1.5,
                }}
              >
                {content.overviewPrompt}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(3, minmax(0, 1fr))",
                  sm: "repeat(5, minmax(0, 1fr))",
                  md: "repeat(2, minmax(0, 1fr))",
                },
                gap: 0.75,
                mt: 1.5,
              }}
            >
              {content.platforms.map((platform) => {
                const PlatformIcon = platformIcons[platform as keyof typeof platformIcons];

                return (
                  <Box
                    key={platform}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 0.55,
                      minWidth: 0,
                      minHeight: 58,
                      px: 0.5,
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: "11px",
                      background: "color-mix(in srgb, var(--bg-card) 58%, transparent)",
                      color: "text.secondary",
                      "&:last-of-type": { gridColumn: { md: "1 / -1" } },
                    }}
                  >
                    {PlatformIcon && <PlatformIcon sx={{ color: "primary.main", fontSize: 16 }} />}
                    <Typography
                      sx={{
                        width: "100%",
                        fontSize: "0.56rem",
                        fontWeight: 600,
                        lineHeight: 1.2,
                        textAlign: "center",
                      }}
                    >
                      {platform}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box
            ref={timelineRef}
            sx={{
              position: "relative",
              "&::before": {
                content: '\"\"',
                position: "absolute",
                left: { xs: "13px", sm: "16px" },
                top: 12,
                bottom: 12,
                width: 1,
                background: "linear-gradient(180deg, var(--accent-blue), var(--border-strong))",
              },
            }}
          >
            {experienceData.map((exp, index) => {
              const isLatest = index === 0;
              const isActiveRole = activeRoleIndex === index;
              const roleNumber = String(experienceData.length - index).padStart(2, "0");
              const companyInitials = exp.company
                .split(/\s+/)
                .filter((word) => !["pvt.", "ltd.", "co.", "tech"].includes(word.toLowerCase()))
                .slice(0, 2)
                .map((word) => word[0])
                .join("");

              return (
                <Box
                  key={exp._id ?? `${exp.company}-${exp.duration}`}
                  id={`experience-role-${index}`}
                  data-experience-card
                  data-role-index={index}
                  sx={{
                    scrollMarginTop: 104,
                    position: "relative",
                    pl: { xs: 5.5, sm: 7 },
                    pb: index < experienceData.length - 1 ? { xs: 3, md: 4 } : 0,
                  }}
                >
                  <Box
                    aria-hidden="true"
                    sx={{
                      position: "absolute",
                      left: { xs: 0, sm: "3px" },
                      top: 24,
                      zIndex: 2,
                      width: 27,
                      height: 27,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: "50%",
                      background: isActiveRole ? "var(--accent-blue)" : "var(--bg-secondary)",
                      border: "1px solid var(--accent-blue)",
                      boxShadow: isActiveRole
                        ? "0 0 0 6px var(--accent-soft), 0 6px 18px color-mix(in srgb, var(--accent-blue) 28%, transparent)"
                        : "0 0 0 5px var(--accent-soft)",
                      color: isActiveRole ? "var(--bg-primary)" : "primary.main",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      transition: "background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease",
                    }}
                  >
                    {roleNumber}
                  </Box>
                  <Card
                    sx={{
                      position: "relative",
                      overflow: "hidden",
                      background: isActiveRole
                        ? "linear-gradient(135deg, var(--bg-card) 0%, color-mix(in srgb, var(--accent-soft) 72%, var(--bg-card)) 100%)"
                        : "var(--bg-card)",
                      borderColor: isActiveRole ? "var(--border-hover)" : "var(--border)",
                      boxShadow: isActiveRole ? "var(--shadow-hero)" : "var(--shadow-card)",
                      transition: "border-color 0.3s ease, background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                      "&::before": {
                        content: '\"\"',
                        position: "absolute",
                        inset: "0 auto 0 0",
                        width: isActiveRole ? 4 : 0,
                        background: "var(--accent-blue)",
                        transition: "width 0.25s ease",
                      },
                      "&::after": {
                        content: `'${roleNumber}'`,
                        position: "absolute",
                        right: { xs: 18, sm: 26 },
                        top: { xs: 8, sm: 4 },
                        color: isActiveRole ? "var(--accent-soft)" : "color-mix(in srgb, var(--accent-soft) 58%, transparent)",
                        fontFamily: "var(--font-heading)",
                        fontSize: { xs: "4rem", sm: "5.5rem" },
                        fontWeight: 700,
                        lineHeight: 1,
                        pointerEvents: "none",
                      },
                      "&:hover": { transform: "translateY(-3px)" },
                    }}
                  >
                    <CardContent sx={{ p: { xs: 2.5, sm: 3.5, md: 4 }, "&:last-child": { pb: { xs: 2.5, sm: 3.5, md: 4 } } }}>
                      <Box
                        sx={{
                          position: "relative",
                          zIndex: 1,
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          justifyContent: "space-between",
                          gap: { xs: 2, sm: 3 },
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "flex-start", gap: { xs: 1.5, sm: 2 }, minWidth: 0 }}>
                          <Box
                            sx={{
                              width: { xs: 46, sm: 54 },
                              height: { xs: 46, sm: 54 },
                              display: "grid",
                              placeItems: "center",
                              flexShrink: 0,
                              border: "1px solid",
                            borderColor: isActiveRole ? "primary.main" : "divider",
                              borderRadius: "14px",
                            background: isActiveRole ? "var(--accent-blue)" : "var(--accent-soft)",
                            color: isActiveRole ? "var(--bg-primary)" : "primary.main",
                              fontFamily: "var(--font-heading)",
                              fontSize: { xs: "0.9rem", sm: "1rem" },
                              fontWeight: 700,
                              letterSpacing: "0.04em",
                            transition: "background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease",
                            }}
                          >
                            {companyInitials}
                          </Box>
                          <Box sx={{ minWidth: 0 }}>
                            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1, mb: 0.8 }}>
                              <Typography
                                sx={{
                                  color: "primary.main",
                                  fontFamily: "var(--font-mono)",
                                  fontSize: "0.66rem",
                                  fontWeight: 700,
                                  letterSpacing: "0.12em",
                                }}
                              >
                                ROLE {roleNumber}
                              </Typography>
                              {isLatest && (
                                <Chip
                                  label={content.latestLabel}
                                  size="small"
                                  sx={{
                                    height: 23,
                                    background: "var(--accent-soft)",
                                    color: "primary.main",
                                    fontSize: "0.66rem",
                                    fontWeight: 700,
                                  }}
                                />
                              )}
                            </Box>
                            <Typography
                              component="h3"
                              sx={{
                                fontFamily: "var(--font-heading)",
                                fontSize: { xs: "1.25rem", md: "1.5rem" },
                                fontWeight: 700,
                                letterSpacing: "-0.015em",
                                lineHeight: 1.22,
                              }}
                            >
                              {exp.title}
                            </Typography>
                            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.7, mt: 0.9 }}>
                              <BusinessOutlinedIcon sx={{ color: "primary.main", fontSize: 16 }} />
                              <Typography sx={{ color: "text.primary", fontSize: "0.82rem", fontWeight: 600 }}>
                                {exp.company}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          position: "relative",
                          zIndex: 1,
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "1.2fr 1.45fr 1.1fr 1fr" },
                          gap: { xs: 1.25, sm: 0 },
                          mt: 3,
                          p: { xs: 1.5, sm: 0 },
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: "12px",
                          background: "var(--accent-soft)",
                          overflow: "hidden",
                          "& > div": {
                            px: { sm: 1.6 },
                            py: { sm: 1.4 },
                          },
                          "& > div:not(:first-of-type)": {
                            borderLeft: { lg: "1px solid" },
                            borderColor: { lg: "divider" },
                          },
                          "& > div:nth-of-type(even)": {
                            borderLeft: { sm: "1px solid", lg: "1px solid" },
                            borderColor: { sm: "divider" },
                          },
                          "& > div:nth-of-type(n+3)": {
                            borderTop: { sm: "1px solid", lg: 0 },
                            borderColor: { sm: "divider" },
                          },
                        }}
                      >
                        {[
                          { label: content.metaLabels.period, icon: <CalendarMonthOutlinedIcon />, value: exp.duration },
                          { label: content.metaLabels.employment, icon: <WorkOutlineOutlinedIcon />, value: exp.type },
                          { label: content.metaLabels.workplace, icon: <HomeWorkOutlinedIcon />, value: exp.workplace },
                          { label: content.metaLabels.location, icon: <LocationOnOutlinedIcon />, value: exp.location },
                        ].map((item) => (
                          <Box key={item.value} sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}>
                            <Box
                              sx={{
                                display: "grid",
                                placeItems: "center",
                                width: 28,
                                height: 28,
                                flexShrink: 0,
                                borderRadius: "8px",
                                background: "color-mix(in srgb, var(--bg-card) 58%, transparent)",
                                color: "primary.main",
                                "& svg": { fontSize: 15 },
                              }}
                            >
                              {item.icon}
                            </Box>
                            <Box sx={{ minWidth: 0 }}>
                              <Typography
                                sx={{
                                  mb: 0.15,
                                  color: "text.disabled",
                                  fontSize: "0.54rem",
                                  fontWeight: 700,
                                  letterSpacing: "0.08em",
                                  lineHeight: 1.2,
                                  textTransform: "uppercase",
                                }}
                              >
                                {item.label}
                              </Typography>
                              <Typography
                                sx={{
                                  minWidth: 0,
                                  color: "text.secondary",
                                  fontSize: "0.68rem",
                                  fontWeight: 600,
                                  lineHeight: 1.35,
                                }}
                              >
                                {item.value}
                              </Typography>
                            </Box>
                          </Box>
                        ))}
                      </Box>

                      <Box
                        sx={{
                          position: "relative",
                          zIndex: 1,
                          display: "grid",
                          gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.45fr) minmax(190px, 0.55fr)" },
                          gap: { xs: 3, lg: 4 },
                          mt: 3,
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              mb: 1.75,
                              color: "text.disabled",
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                              "&::after": {
                                content: '\"\"',
                                flex: 1,
                                height: 1,
                                background: "divider",
                              },
                            }}
                          >
                            {content.impactLabel}
                          </Typography>
                          <Box component="ul" sx={{ display: "flex", flexDirection: "column", gap: 0.85, m: 0, p: 0, listStyle: "none" }}>
                            {exp.description.map((point, pointIndex) => (
                              <Box
                                component="li"
                                key={point}
                                sx={{
                                  display: "grid",
                                  gridTemplateColumns: "28px minmax(0, 1fr)",
                                  gap: 1.25,
                                  alignItems: "start",
                                  p: 1.2,
                                  border: "1px solid",
                                  borderColor: "divider",
                                  borderRadius: "11px",
                                  background: "color-mix(in srgb, var(--bg-card) 56%, transparent)",
                                  color: "text.secondary",
                                  fontSize: "0.79rem",
                                  lineHeight: 1.65,
                                }}
                              >
                                <Box
                                  aria-hidden="true"
                                  sx={{
                                    width: 28,
                                    height: 28,
                                    display: "grid",
                                    placeItems: "center",
                                    borderRadius: "8px",
                                    background: "var(--accent-soft)",
                                    color: "primary.main",
                                    fontFamily: "var(--font-mono)",
                                    fontSize: "0.58rem",
                                    fontWeight: 700,
                                  }}
                                >
                                  {String(pointIndex + 1).padStart(2, "0")}
                                </Box>
                                <Box component="span" sx={{ pt: 0.25 }}>
                                  {point}
                                </Box>
                              </Box>
                            ))}
                          </Box>
                        </Box>

                        <Box
                          sx={{
                            alignSelf: "start",
                            p: 2,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: "14px",
                            background: "var(--accent-soft)",
                          }}
                        >
                          <Typography
                            sx={{
                              mb: 0.5,
                              color: "primary.main",
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              letterSpacing: "0.12em",
                              textTransform: "uppercase",
                            }}
                          >
                            {content.toolsLabel}
                          </Typography>
                          <Typography sx={{ mb: 1.75, color: "text.disabled", fontSize: "0.66rem", lineHeight: 1.5 }}>
                            {content.toolsDescription}
                          </Typography>
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.65 }}>
                            {exp.technologies.map((technology) => (
                              <Chip
                                key={technology}
                                label={technology}
                                size="small"
                                sx={{
                                  height: 28,
                                  border: "1px solid",
                                  borderColor: "divider",
                                  background: "color-mix(in srgb, var(--bg-card) 74%, transparent)",
                                  color: "text.secondary",
                                  fontSize: "0.7rem",
                                }}
                              />
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box
          ref={archiveRef}
          component="section"
          id="github"
          aria-hidden={!archive.visible}
          aria-labelledby="contribution-archive-heading"
          sx={{
            display: archive.visible ? "block" : "none",
            position: "relative",
            mt: { xs: 9, md: 14 },
            py: { xs: 8, md: 11 },
            scrollMarginTop: "72px",
            isolation: "isolate",
            "&::before": {
              content: '\"\"',
              position: "absolute",
              zIndex: -1,
              inset: 0,
              left: "50%",
              width: "100vw",
              transform: "translateX(-50%)",
              background:
                "radial-gradient(circle at 88% 12%, var(--accent-soft) 0%, transparent 32%), var(--bg-primary)",
            },
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) auto" },
              gap: { xs: 2.5, md: 5 },
              alignItems: "end",
              mb: { xs: 3.5, md: 4.5 },
            }}
          >
            <Box sx={{ maxWidth: 720 }}>
              <Typography
                sx={{
                  mb: 1.25,
                  color: "primary.main",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                {archive.eyebrow}
              </Typography>
              <Typography
                id="contribution-archive-heading"
                component="h2"
                sx={{
                  fontFamily: "var(--font-heading)",
                  fontSize: { xs: "1.75rem", sm: "2.2rem", md: "2.6rem" },
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  lineHeight: 1.1,
                }}
              >
                {archive.title}
              </Typography>
              <Typography sx={{ mt: 1.5, color: "text.secondary", fontSize: "0.9rem", lineHeight: 1.75 }}>
                {archive.description}
              </Typography>
              <Box
                role="tablist"
                aria-label="GitHub profile"
                sx={{
                  display: "inline-grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                  gap: 0.75,
                  mt: 2.25,
                  p: 0.6,
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "12px",
                  background: "var(--accent-soft)",
                }}
              >
                {[
                  { id: "office" as const, label: archive.officeTabLabel, icon: <WorkOutlineOutlinedIcon /> },
                  { id: "personal" as const, label: archive.personalTabLabel, icon: <PersonOutlineRoundedIcon /> },
                ].map((profile) => {
                  const isActive = activeGithubProfile === profile.id;

                  return (
                    <ButtonBase
                      key={profile.id}
                      id={`${profile.id}-github-tab`}
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`${profile.id}-github-panel`}
                      onClick={() => setActiveGithubProfile(profile.id)}
                      sx={{
                        display: "flex",
                        gap: 0.8,
                        px: { xs: 1.25, sm: 1.75 },
                        py: 1,
                        borderRadius: "9px",
                        background: isActive ? "var(--accent-blue)" : "transparent",
                        color: isActive ? "var(--bg-primary)" : "text.secondary",
                        fontSize: "0.76rem",
                        fontWeight: 700,
                        transition: "background-color 0.2s ease, color 0.2s ease",
                        "& svg": { fontSize: 16 },
                        "&:focus-visible": { outline: "2px solid var(--accent-blue-light)", outlineOffset: 2 },
                      }}
                    >
                      {profile.icon}
                      {profile.label}
                    </ButtonBase>
                  );
                })}
              </Box>
              <Typography
                sx={{
                  mt: 1.25,
                  color: "primary.main",
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.72rem",
                  fontWeight: 600,
                }}
              >
                {isOfficeProfile
                  ? `(${archive.context})`
                  : `@${archive.personalProfile.username} · Personal profile`}
              </Typography>
            </Box>

            <Button
              component="a"
              href={activeProfileUrl}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              startIcon={<GitHubIcon />}
              endIcon={<OpenInNewRoundedIcon sx={{ fontSize: "15px !important" }} />}
              sx={{ justifySelf: { md: "end" }, px: 2, py: 1.15, whiteSpace: "nowrap" }}
            >
              {activeProfileLabel}
            </Button>
          </Box>

          {isOfficeProfile ? (
            <Box
              id="office-github-panel"
              role="tabpanel"
              aria-labelledby="office-github-tab"
              sx={{
                overflow: "hidden",
                border: "1px solid",
                borderColor: "var(--border-strong)",
                borderRadius: { xs: "16px", md: "20px" },
                background: "#0d1117",
                boxShadow: "var(--shadow-hero)",
              }}
            >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                px: { xs: 2, sm: 2.5 },
                py: 1.35,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                color: "#c9d1d9",
              }}
            >
              <Box sx={{ display: "flex", gap: 0.75 }} aria-hidden="true">
                {["#ff7b72", "#d29922", "#3fb950"].map((color) => (
                  <Box key={color} sx={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                ))}
              </Box>
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, minWidth: 0 }}>
                <GitHubIcon sx={{ fontSize: 16 }} />
                <Typography sx={{ overflow: "hidden", fontFamily: "var(--font-mono)", fontSize: "0.7rem", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  github.com/gamenic-arim
                </Typography>
              </Box>
              <Typography sx={{ display: { xs: "none", sm: "block" }, color: "#8b949e", fontSize: "0.68rem", whiteSpace: "nowrap" }}>
                {selectedActivity.contributions}
              </Typography>
            </Box>

            <Box
              id="github-activity-panel"
              role="tabpanel"
              aria-labelledby={`github-year-${selectedActivity.year}`}
              aria-live="polite"
            >
              <Box
                component="img"
                key={selectedActivity.year}
                src={selectedActivity.image}
                alt={selectedActivity.alt}
                loading="lazy"
                decoding="async"
                sx={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  aspectRatio: "1.92 / 1",
                  objectFit: "contain",
                  background: "#0d1117",
                }}
              />
            </Box>

            <Box
              role="tablist"
              aria-label="GitHub contribution year"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "repeat(8, 88px)", md: "repeat(8, minmax(0, 1fr))" },
                gap: 1,
                overflowX: "auto",
                px: { xs: 1.5, sm: 2 },
                py: 1.5,
                borderTop: "1px solid rgba(255,255,255,0.1)",
                scrollbarWidth: "thin",
              }}
            >
              {archive.years.map((item) => {
                const isSelected = item.year === selectedActivity.year;

                return (
                  <ButtonBase
                    key={item.year}
                    id={`github-year-${item.year}`}
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls="github-activity-panel"
                    onClick={() => setSelectedYear(item.year)}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      minWidth: 0,
                      px: 1.25,
                      py: 1,
                      border: "1px solid",
                      borderColor: isSelected ? "#3fb950" : "rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      background: isSelected ? "rgba(46,160,67,0.18)" : "rgba(255,255,255,0.025)",
                      color: isSelected ? "#f0f6fc" : "#8b949e",
                      textAlign: "left",
                      transition: "border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease",
                      "&:hover": { borderColor: "#3fb950", background: "rgba(46,160,67,0.12)", color: "#f0f6fc" },
                      "&:focus-visible": { outline: "2px solid #58a6ff", outlineOffset: 2 },
                    }}
                  >
                    <Typography sx={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 700 }}>
                      {item.year}
                    </Typography>
                    <Typography sx={{ overflow: "hidden", width: "100%", mt: 0.25, fontSize: "0.58rem", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.contributions}
                    </Typography>
                  </ButtonBase>
                );
              })}
            </Box>
            </Box>
          ) : (
            <Box
              id="personal-github-panel"
              role="tabpanel"
              aria-labelledby="personal-github-tab"
              sx={{
                overflow: "hidden",
                border: "1px solid",
                borderColor: "var(--border-strong)",
                borderRadius: { xs: "16px", md: "20px" },
                background: "#0d1117",
                boxShadow: "var(--shadow-hero)",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  px: { xs: 2, sm: 2.5 },
                  py: 1.35,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                  color: "#c9d1d9",
                }}
              >
                <Box sx={{ display: "flex", gap: 0.75 }} aria-hidden="true">
                  {["#ff7b72", "#d29922", "#3fb950"].map((color) => (
                    <Box key={color} sx={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
                  ))}
                </Box>
                <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, minWidth: 0 }}>
                  <GitHubIcon sx={{ fontSize: 16 }} />
                  <Typography sx={{ overflow: "hidden", fontFamily: "var(--font-mono)", fontSize: "0.7rem", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    github.com/{archive.personalProfile.username}
                  </Typography>
                </Box>
                <Typography sx={{ display: { xs: "none", sm: "block" }, color: "#8b949e", fontSize: "0.68rem", whiteSpace: "nowrap" }}>
                  {selectedPersonalActivity.contributions}
                </Typography>
              </Box>

              <Box
                id="personal-github-activity-panel"
                role="tabpanel"
                aria-labelledby={`personal-github-year-${selectedPersonalActivity.year}`}
                aria-live="polite"
              >
                <Box
                  component="img"
                  key={selectedPersonalActivity.year}
                  src={selectedPersonalActivity.image}
                  alt={selectedPersonalActivity.alt}
                  loading="lazy"
                  decoding="async"
                  sx={{
                    display: "block",
                    width: "100%",
                    height: "auto",
                    aspectRatio: "1.92 / 1",
                    objectFit: "contain",
                    background: "#0d1117",
                  }}
                />
              </Box>

              <Box
                role="tablist"
                aria-label="Personal GitHub contribution year"
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "repeat(3, minmax(88px, 1fr))", sm: "repeat(3, minmax(0, 1fr))" },
                  gap: 1,
                  overflowX: "auto",
                  px: { xs: 1.5, sm: 2 },
                  py: 1.5,
                  borderTop: "1px solid rgba(255,255,255,0.1)",
                  scrollbarWidth: "thin",
                }}
              >
                {archive.personalProfile.years.map((item) => {
                  const isSelected = item.year === selectedPersonalActivity.year;

                  return (
                    <ButtonBase
                      key={item.year}
                      id={`personal-github-year-${item.year}`}
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls="personal-github-activity-panel"
                      onClick={() => setSelectedPersonalYear(item.year)}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        minWidth: 0,
                        px: 1.25,
                        py: 1,
                        border: "1px solid",
                        borderColor: isSelected ? "#3fb950" : "rgba(255,255,255,0.1)",
                        borderRadius: "10px",
                        background: isSelected ? "rgba(46,160,67,0.18)" : "rgba(255,255,255,0.025)",
                        color: isSelected ? "#f0f6fc" : "#8b949e",
                        textAlign: "left",
                        transition: "border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease",
                        "&:hover": { borderColor: "#3fb950", background: "rgba(46,160,67,0.12)", color: "#f0f6fc" },
                        "&:focus-visible": { outline: "2px solid #58a6ff", outlineOffset: 2 },
                      }}
                    >
                      <Typography sx={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 700 }}>
                        {item.year}
                      </Typography>
                      <Typography sx={{ overflow: "hidden", width: "100%", mt: 0.25, fontSize: "0.58rem", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.contributions}
                      </Typography>
                    </ButtonBase>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
