"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProjects } from "@/hooks/usePortfolioData";
import content from "@/data/projects.json";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Skeleton from "@mui/material/Skeleton";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";

gsap.registerPlugin(ScrollTrigger);

const loadingProjects = Array.from({ length: 3 }, (_, index) => ({
  _id: `loading-project-${index}`,
  category: "freelance",
  title: "",
  description: "",
  status: "",
  location: "",
  services: [],
  tech: [],
  github: "",
  live: "",
  links: [],
  isVisible: true,
  featured: false,
  image: "",
  imageFit: "cover" as const,
  video: "",
  order: index,
}));

const loadingTechItems = ["", "", "", "", ""];

export default function Projects() {
  const { data: projectsData, loading } = useProjects();
  const visibleTabs = content.tabs.filter((tab) => tab.isVisible);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(visibleTabs[0].id);
  const [showAll, setShowAll] = useState(false);
  const cardAnimDone = useRef(false);

  const activeTab = visibleTabs.find((tab) => tab.id === activeCategory) ?? visibleTabs[0];
  const categoryProjects = projectsData.filter((project) => project.category === activeCategory);
  const displayed = loading ? loadingProjects : showAll ? categoryProjects : categoryProjects.slice(0, 3);

  // Heading animation — runs once on mount
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
    if (loading || !displayed.length || !gridRef.current) return;

    const cards = Array.from(gridRef.current.children);

    if (!cardAnimDone.current) {
      cardAnimDone.current = true;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 80%" },
        },
      );
      return;
    }

    gsap.set(cards, { opacity: 1, y: 0 });
  }, [displayed, loading]);

  useEffect(() => {
    if (!showAll) return;
    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (!cards) return;
    const newCards = Array.from(cards).slice(3);
    gsap.fromTo(
      newCards,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
    );
  }, [showAll]);

  return (
    <Box
      component="section"
      id="projects"
      ref={sectionRef}
      sx={{ py: { xs: "52px", sm: "64px", md: "80px", lg: "100px" } }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: "14px", sm: "24px" } }}>
        {/* Heading */}
        <Box
          ref={headingRef}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            mb: 7,
            flexWrap: "wrap",
            gap: 2,
            opacity: 0,
          }}
        >
          <Box>
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
                "&::before": {
                  content: '""',
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
            <Typography
              sx={{
                color: "text.secondary",
                mt: 1.75,
                fontSize: "0.95rem",
                lineHeight: 1.7,
                maxWidth: 480,
              }}
            >
              {content.description}
            </Typography>
          </Box>
          {content.profileUrl && (
            <Button
              component="a"
              href={content.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              startIcon={<GitHubIcon sx={{ fontSize: "16px !important" }} />}
              sx={{ fontSize: "0.825rem", py: "9px", px: "18px" }}
            >
              {content.profileButtonLabel}
            </Button>
          )}
        </Box>

        {visibleTabs.length > 1 && (
          <Box
            role="tablist"
            aria-label={content.tabsLabel}
            sx={{
              display: "grid",
              gridTemplateColumns: `repeat(${visibleTabs.length}, minmax(0, 1fr))`,
              gap: 1,
              mb: { xs: 3.5, md: 4.5 },
              p: 0.75,
              overflowX: "auto",
              border: "1px solid",
              borderColor: "divider",
              borderRadius: "16px",
              background: "var(--accent-soft)",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
          {visibleTabs.map((tab, index) => {
            const isActive = activeCategory === tab.id;
            const projectCount = projectsData.filter((project) => project.category === tab.id).length;

            return (
              <ButtonBase
                key={tab.id}
                id={`project-tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls="projects-category-panel"
                onClick={() => {
                  setActiveCategory(tab.id);
                  setShowAll(false);
                }}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "32px minmax(0, 1fr) auto",
                  alignItems: "center",
                  gap: 1,
                  minWidth: 0,
                  px: { xs: 1.25, sm: 1.75 },
                  py: 1.25,
                  border: "1px solid",
                  borderColor: isActive ? "var(--border-strong)" : "transparent",
                  borderRadius: "12px",
                  background: isActive ? "var(--bg-card)" : "transparent",
                  color: isActive ? "text.primary" : "text.secondary",
                  boxShadow: isActive ? "var(--shadow-card)" : "none",
                  textAlign: "left",
                  transition: "background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
                  "&:hover": { background: "color-mix(in srgb, var(--bg-card) 72%, transparent)" },
                  "&:focus-visible": { outline: "2px solid var(--accent-blue-light)", outlineOffset: 2 },
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    display: "grid",
                    placeItems: "center",
                    borderRadius: "9px",
                    background: isActive ? "var(--accent-blue)" : "var(--bg-card)",
                    color: isActive ? "var(--bg-primary)" : "primary.main",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </Box>
                <Typography sx={{ minWidth: 0, fontSize: "0.76rem", fontWeight: 700, lineHeight: 1.3 }}>
                  {tab.label}
                </Typography>
                <Box
                  sx={{
                    minWidth: 24,
                    px: 0.65,
                    py: 0.25,
                    borderRadius: "999px",
                    background: isActive ? "var(--accent-soft)" : "var(--bg-card)",
                    color: "text.disabled",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    textAlign: "center",
                  }}
                >
                  {projectCount}
                </Box>
              </ButtonBase>
            );
          })}
          </Box>
        )}

        {/* Project grid */}
        <Box
          ref={gridRef}
          id="projects-category-panel"
          role={visibleTabs.length > 1 ? "tabpanel" : undefined}
          aria-labelledby={visibleTabs.length > 1 ? `project-tab-${activeTab.id}` : undefined}
          aria-label={visibleTabs.length === 1 ? activeTab.label : undefined}
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(auto-fill, minmax(340px, 1fr))",
            },
            gap: 2.5,
          }}
        >
          {!loading && !displayed.length && (
            <Box
              sx={{
                gridColumn: "1 / -1",
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "auto 1fr auto" },
                alignItems: { xs: "flex-start", md: "center" },
                gap: { xs: 2, md: 3 },
                px: { xs: 2.5, sm: 3.5 },
                py: { xs: 3, sm: 3.5 },
                border: "1px solid var(--border)",
                borderRadius: "20px",
                background: "var(--bg-card)",
                boxShadow: "var(--shadow-card)",
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "14px",
                  display: "grid",
                  placeItems: "center",
                  color: "primary.main",
                  background: "var(--accent-soft)",
                }}
              >
                <GitHubIcon />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, color: "text.primary" }}>
                  {activeTab.emptyTitle}
                </Typography>
                <Typography sx={{ mt: 0.55, color: "text.secondary", lineHeight: 1.7, fontSize: "0.88rem" }}>
                  {activeTab.emptyMessage}
                </Typography>
              </Box>
              {content.profileUrl && (
                <Button
                  component="a"
                  href={content.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  endIcon={<OpenInNewIcon sx={{ fontSize: "15px !important" }} />}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  Open GitHub
                </Button>
              )}
            </Box>
          )}
          {displayed.map((project, i) => (
            <Card
              key={loading ? `project-skeleton-${i}` : project._id ?? String(i)}
              className="project-card"
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                opacity: 1,
                "&:hover": { transform: "translateY(-6px)" },
              }}
            >
              {/* Project visual */}
              <Box
                sx={{
                  position: "relative",
                  aspectRatio: "16 / 10",
                  overflow: "hidden",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  background:
                    "linear-gradient(135deg, color-mix(in srgb, var(--accent-blue) 16%, var(--bg-secondary)), var(--bg-secondary))",
                }}
              >
                {loading ? (
                  <Skeleton variant="rectangular" width="100%" height="100%" animation="wave" />
                ) : project.video ? (
                  <Box
                    component="video"
                    src={project.video}
                    poster={project.image || undefined}
                    aria-label={`${project.title} project reel`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    preload="metadata"
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                      objectFit: "cover",
                      background: "#0c1211",
                    }}
                  />
                ) : project.image ? (
                  <Box
                    component="img"
                    src={project.image}
                    alt={`${project.title} project preview`}
                    loading="lazy"
                    decoding="async"
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "block",
                      objectFit: project.imageFit ?? "cover",
                      p: project.imageFit === "contain" ? { xs: 3, sm: 4 } : 0,
                      background: project.imageFit === "contain" ? "#fff" : "transparent",
                      transition: "transform 0.55s cubic-bezier(0.2, 0.7, 0, 1)",
                      ".project-card:hover &": { transform: "scale(1.035)" },
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      placeItems: "center",
                      backgroundImage:
                        "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                      backgroundSize: "28px 28px",
                    }}
                  >
                    <Box
                      sx={{
                        width: 58,
                        height: 58,
                        display: "grid",
                        placeItems: "center",
                        borderRadius: "18px",
                        color: "primary.main",
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-strong)",
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      <DashboardIcon />
                    </Box>
                  </Box>
                )}

                {!loading && (
                  <Box
                    sx={{
                      position: "absolute",
                      inset: "14px 14px auto 14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 1,
                      pointerEvents: "none",
                    }}
                  >
                    <Box
                      sx={{
                        px: 1.1,
                        py: 0.55,
                        borderRadius: "999px",
                        color: "var(--text-primary)",
                        background: "color-mix(in srgb, var(--bg-card) 88%, transparent)",
                        border: "1px solid color-mix(in srgb, var(--border-strong) 70%, transparent)",
                        boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                        backdropFilter: "blur(10px)",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.64rem",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {project.status}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                      {project.video && (
                        <Box
                          sx={{
                            width: 30,
                            height: 30,
                            display: "grid",
                            placeItems: "center",
                            borderRadius: "50%",
                            color: "var(--text-primary)",
                            background: "color-mix(in srgb, var(--bg-card) 88%, transparent)",
                            border: "1px solid color-mix(in srgb, var(--border-strong) 70%, transparent)",
                            backdropFilter: "blur(10px)",
                          }}
                        >
                          <PlayCircleOutlineRoundedIcon sx={{ fontSize: 18 }} />
                        </Box>
                      )}
                      {project.featured && (
                        <Box
                          sx={{
                            px: 1.1,
                            py: 0.55,
                            borderRadius: "999px",
                            color: "var(--bg-primary)",
                            background: "var(--accent-blue)",
                            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                            fontSize: "0.62rem",
                            fontWeight: 700,
                            letterSpacing: "0.07em",
                            textTransform: "uppercase",
                          }}
                        >
                          Featured
                        </Box>
                      )}
                    </Box>
                  </Box>
                )}
              </Box>

              <CardContent sx={{ p: { xs: "22px", sm: "24px" }, flexGrow: 1 }}>
                {/* Project number, location, and links */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    mb: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.2,
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "primary.main",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.66rem",
                        fontWeight: 700,
                        letterSpacing: "0.11em",
                      }}
                    >
                      PROJECT {String(i + 1).padStart(2, "0")}
                    </Typography>
                    {!loading && project.location && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.35,
                          minWidth: 0,
                          color: "text.disabled",
                        }}
                      >
                        <LocationOnOutlinedIcon sx={{ fontSize: 14 }} />
                        <Typography sx={{ fontSize: "0.68rem", fontWeight: 600 }}>
                          {project.location}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {!loading && project.github && (
                      <IconButton
                        component="a"
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        aria-label={`View ${project.title} source on GitHub`}
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: "8px",
                          color: "text.secondary",
                          "&:hover": {
                            borderColor: "primary.main",
                            color: "text.primary",
                            background: "var(--accent-soft)",
                          },
                        }}
                      >
                        <GitHubIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                    )}
                    {!loading && project.live && !project.links?.length && (
                      <IconButton
                        component="a"
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        aria-label={`Open ${project.title} live website`}
                        sx={{
                          border: "1px solid",
                          borderColor: "divider",
                          borderRadius: "8px",
                          color: "text.secondary",
                          "&:hover": {
                            borderColor: "primary.main",
                            color: "primary.main",
                            background: "var(--accent-soft)",
                          },
                        }}
                      >
                        <OpenInNewIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    )}
                  </Box>
                </Box>

                {/* Title & description */}
                <Typography
                  sx={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    mb: 1,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {loading ? <Skeleton variant="text" width="58%" sx={{ fontSize: "1.05rem" }} /> : project.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "0.85rem",
                    color: "text.secondary",
                    lineHeight: 1.7,
                  }}
                >
                  {loading ? (
                    <>
                      <Skeleton variant="text" width="100%" />
                      <Skeleton variant="text" width="92%" />
                      <Skeleton variant="text" width="78%" />
                    </>
                  ) : (
                    project.description
                  )}
                </Typography>

                {!loading && project.services.length > 0 && (
                  <Box sx={{ mt: 2.25 }}>
                    <Typography
                      sx={{
                        mb: 1,
                        color: "text.disabled",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.11em",
                        textTransform: "uppercase",
                      }}
                    >
                      Scope & delivery
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.7 }}>
                      {project.services.map((service) => (
                        <Chip
                          key={service}
                          label={service}
                          size="small"
                          variant="outlined"
                          sx={{
                            height: 26,
                            color: "text.secondary",
                            borderColor: "divider",
                            background: "color-mix(in srgb, var(--bg-secondary) 58%, transparent)",
                            fontSize: "0.66rem",
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                {!loading && project.links && project.links.length > 0 && (
                  <Box sx={{ mt: 2.25 }}>
                    <Typography
                      sx={{
                        mb: 0.7,
                        color: "text.disabled",
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.11em",
                        textTransform: "uppercase",
                      }}
                    >
                      Project links
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {project.links.map((link) => (
                        <Button
                          key={`${link.label}-${link.url}`}
                          component="a"
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          size="small"
                          endIcon={<OpenInNewIcon sx={{ fontSize: "12px !important" }} />}
                          sx={{
                            minWidth: 0,
                            px: 0.8,
                            py: 0.35,
                            color: "primary.main",
                            fontSize: "0.68rem",
                            fontWeight: 600,
                            "&:hover": { background: "var(--accent-soft)" },
                          }}
                        >
                          {link.label}
                        </Button>
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>

              {/* Tech stack */}
              <Box
                sx={{
                  px: { xs: "22px", sm: "24px" },
                  py: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.75,
                  borderTop: "1px solid",
                  borderColor: "divider",
                  background: "color-mix(in srgb, var(--bg-secondary) 52%, transparent)",
                }}
              >
                {(loading ? loadingTechItems : project.tech).map((t, techIndex) => (
                  <Chip
                    key={loading ? `project-tech-skeleton-${i}-${techIndex}` : t}
                    label={loading ? <Skeleton variant="text" width={48} /> : t}
                    size="small"
                    sx={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      background: "var(--accent-soft)",
                      border: "1px solid var(--border-strong)",
                      color: "primary.main",
                      borderRadius: "9999px",
                      letterSpacing: "0.03em",
                    }}
                  />
                ))}
              </Box>
            </Card>
          ))}
        </Box>

        {/* Show more */}
        {!loading && categoryProjects.length > 3 && (
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <Button
              variant="outlined"
              onClick={() => setShowAll(!showAll)}
              sx={{ fontSize: "0.875rem" }}
            >
              {showAll
                ? "Show Less"
                : `${content.viewAllLabel} (${categoryProjects.length})`}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
