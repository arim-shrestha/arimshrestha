"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useProfile } from "@/hooks/usePortfolioData";
import { useThemeMode } from "@/contexts/ThemeModeContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

export default function Hero() {
  const { data: profile, loading } = useProfile();
  const { mode } = useThemeMode();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(
        [badgeRef.current, headingRef.current?.children, subRef.current, ctaRef.current?.children, visualRef.current],
        { opacity: 1, y: 0, x: 0, scale: 1 },
      );
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.35 });

      timeline
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
        )
        .fromTo(
          headingRef.current?.children ?? [],
          { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power3.out" },
          "-=0.2",
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        )
        .fromTo(
          ctaRef.current?.children ?? [],
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
          "-=0.3",
        )
        .fromTo(
          visualRef.current,
          { opacity: 0, scale: 0.94, x: 26 },
          { opacity: 1, scale: 1, x: 0, duration: 0.85, ease: "power3.out" },
          "-=0.75",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const codeItems = [
    { key: "name", value: `"${profile.name}"`, color: mode === "dark" ? "#c3e88d" : "#15803d" },
    { key: "role", value: `"${profile.title}"`, color: mode === "dark" ? "#c3e88d" : "#15803d" },
    { key: "location", value: `"${profile.location}"`, color: mode === "dark" ? "#c3e88d" : "#15803d" },
    { key: "stack", value: JSON.stringify(profile.stack), color: mode === "dark" ? "#f0b58e" : "#b45309" },
    { key: "experience", value: `"${profile.experienceYears} years"`, color: mode === "dark" ? "#ff9cac" : "#be123c" },
  ];

  return (
    <Box
      component="section"
      id="home"
      ref={sectionRef}
      sx={{
        position: "relative",
        minHeight: "100svh",
        height: { md: "100svh" },
        display: "flex",
        alignItems: "stretch",
        overflow: "hidden",
        boxSizing: "border-box",
        background:
          "radial-gradient(circle at 82% 30%, var(--accent-soft) 0, transparent 28%), var(--bg-primary)",
        pt: "72px",
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          borderBottom: "1px solid var(--border)",
          backgroundImage: "radial-gradient(var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(to bottom, black, transparent 88%)",
          opacity: 0.5,
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 1200,
          minHeight: { md: "calc(100svh - 72px)" },
          mx: "auto",
          px: { xs: "18px", sm: "28px" },
          pt: { xs: 5, md: 2 },
          pb: { xs: "80px", md: 9 },
          display: { md: "flex" },
          flexDirection: { md: "column" },
          boxSizing: "border-box",
        }}
      >
        <Grid
          container
          spacing={{ xs: 6, md: 7.5 }}
          alignItems="center"
          sx={{ width: "100%", minHeight: 0, flex: { md: 1 } }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                ref={badgeRef}
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  px: "14px",
                  py: "7px",
                  borderRadius: 9999,
                  border: "1px solid var(--border-strong)",
                  background: "var(--accent-soft)",
                  mb: 3.5,
                  opacity: 0,
                  width: "fit-content",
                  maxWidth: "100%",
                }}
              >
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "var(--accent-blue)",
                    boxShadow: "0 0 0 4px var(--accent-soft)",
                    flexShrink: 0,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "primary.main",
                    letterSpacing: "0.035em",
                  }}
                >
                  {loading ? (
                    <Skeleton variant="text" width={160} sx={{ fontSize: "0.75rem" }} />
                  ) : (
                    profile.statusLabel
                  )}
                </Typography>
              </Box>

              <Box ref={headingRef} sx={{ mb: 2.5 }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: "clamp(2.45rem, 5.5vw, 4rem)",
                    mb: 1.25,
                    opacity: 0,
                    color: "text.primary",
                  }}
                >
                  {loading ? (
                    <Skeleton variant="text" width="78%" sx={{ fontSize: "clamp(2.45rem, 5.5vw, 4rem)" }} />
                  ) : (
                    <>
                      Hi, I&apos;m{" "}
                      <Box component="span" className="gradient-text">
                        {profile.name}
                      </Box>
                    </>
                  )}
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: "clamp(1.2rem, 3vw, 1.85rem)",
                    fontWeight: 600,
                    color: "text.secondary",
                    opacity: 0,
                  }}
                >
                  {loading ? (
                    <Skeleton variant="text" width="52%" sx={{ fontSize: "clamp(1.2rem, 3vw, 1.85rem)" }} />
                  ) : (
                    profile.title
                  )}
                </Typography>
              </Box>

              <Typography
                ref={subRef}
                sx={{
                  fontSize: "clamp(0.95rem, 1.8vw, 1.05rem)",
                  color: "text.secondary",
                  lineHeight: 1.8,
                  maxWidth: 520,
                  mb: 4.5,
                  opacity: 0,
                }}
              >
                {loading ? (
                  <>
                    <Skeleton variant="text" width="100%" />
                    <Skeleton variant="text" width="88%" />
                    <Skeleton variant="text" width="72%" />
                  </>
                ) : (
                  profile.tagline
                )}
              </Typography>

              <Stack
                ref={ctaRef}
                direction="row"
                flexWrap="wrap"
                gap="12px"
                alignItems="center"
                sx={{
                  flexDirection: { xs: "column", sm: "row" },
                  "& .MuiButton-root": {
                    opacity: 0,
                    width: { xs: "100%", sm: "auto" },
                    justifyContent: "center",
                  },
                }}
              >
                <Button
                  variant="contained"
                  endIcon={<ArrowForwardIcon sx={{ fontSize: "14px !important" }} />}
                  onClick={() => scrollTo("experience")}
                >
                  View Experience
                </Button>
                <Button variant="outlined" onClick={() => scrollTo("contact")}>
                  Contact Me
                </Button>
                <Button
                  component="a"
                  href={loading ? undefined : profile.resumeUrl}
                  download="arim-shrestha-cv.pdf"
                  title="Download Curriculum Vitae (PDF)"
                  aria-label="Download Curriculum Vitae (PDF)"
                  variant="outlined"
                  startIcon={<DownloadIcon sx={{ fontSize: "13px !important" }} />}
                  disabled={loading || !profile.resumeUrl}
                >
                  Download CV
                </Button>
              </Stack>

              <Stack
                direction="row"
                flexWrap="wrap"
                gap={{ xs: "24px", sm: "36px" }}
                sx={{ mt: 5, pt: 3.5, borderTop: "1px solid", borderColor: "divider" }}
              >
                {[
                  { value: profile.experienceYears, label: "Years Experience" },
                  { value: String(profile.platformCount), label: "Delivery Platforms" },
                  { value: String(profile.roleCount), label: "Professional Roles" },
                ].map((stat) => (
                  <Box key={stat.label} sx={{ textAlign: "left" }}>
                    <Typography
                      sx={{
                        fontSize: "clamp(1.35rem,2.5vw,1.65rem)",
                        fontWeight: 800,
                        color: "text.primary",
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                      }}
                    >
                      {loading ? <Skeleton variant="text" width={36} /> : stat.value}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.72rem",
                        color: "text.disabled",
                        mt: "6px",
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              ref={visualRef}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                opacity: 0,
                "@media (prefers-reduced-motion: reduce)": { opacity: 1 },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 520,
                  background: "var(--bg-card)",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-hero)",
                }}
              >
                <Box
                  sx={{
                    px: "18px",
                    py: "12px",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    background: mode === "dark" ? "rgba(0,0,0,0.24)" : "rgba(21,94,99,0.05)",
                  }}
                >
                  {["#ff5f57", "#ffbd2e", "#28c840"].map((color) => (
                    <Box
                      key={color}
                      sx={{ width: 11, height: 11, borderRadius: "50%", background: color, flexShrink: 0 }}
                    />
                  ))}
                  <Typography
                    sx={{ ml: "auto", fontSize: "0.68rem", color: "text.disabled", fontFamily: "var(--font-mono)" }}
                  >
                    arim.profile.ts
                  </Typography>
                </Box>

                <Box
                  sx={{
                    px: { xs: "18px", sm: "24px" },
                    py: { xs: "20px", sm: "24px" },
                    fontFamily: "var(--font-mono)",
                    fontSize: "clamp(0.7rem,1.5vw,0.82rem)",
                    lineHeight: 1.85,
                    width: "100%",
                    minWidth: 0,
                    overflowX: "hidden",
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                  }}
                >
                  <Box sx={{ color: "text.disabled" }}>{"// Professional profile"}</Box>
                  <Box>
                    <Box component="span" sx={{ color: mode === "dark" ? "#c792ea" : "#7e22ce" }}>const</Box>
                    <Box component="span" sx={{ color: "text.secondary" }}> developer </Box>
                    <Box component="span" sx={{ color: mode === "dark" ? "#89ddff" : "#0369a1" }}>=</Box>
                    <Box component="span" sx={{ color: "text.secondary" }}> {"{"}</Box>
                  </Box>
                  {codeItems.map((item) => (
                    <Box key={item.key} sx={{ pl: { xs: "12px", sm: "18px" }, minWidth: 0, overflowWrap: "anywhere" }}>
                      <Box component="span" sx={{ color: mode === "dark" ? "#82aaff" : "#1d4ed8" }}>{item.key}</Box>
                      <Box component="span" sx={{ color: mode === "dark" ? "#89ddff" : "#0369a1" }}>: </Box>
                      <Box component="span" sx={{ color: item.color }}>{loading ? "..." : item.value}</Box>
                      <Box component="span" sx={{ color: "text.secondary" }}>,</Box>
                    </Box>
                  ))}
                  <Box>
                    <Box component="span" sx={{ color: "text.secondary" }}>{"}"}</Box>
                    <Box component="span" sx={{ color: mode === "dark" ? "#89ddff" : "#0369a1" }}>;</Box>
                  </Box>
                  <Box sx={{ mt: "10px", color: "text.disabled" }}>{"// Built for people. Engineered to scale."}</Box>
                  <Box>
                    <Box component="span" sx={{ color: mode === "dark" ? "#c792ea" : "#7e22ce" }}>export default</Box>
                    <Box component="span" sx={{ color: "text.secondary" }}> developer;</Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            position: "absolute",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <Typography sx={{ fontSize: "0.62rem", color: "text.disabled", letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Scroll
          </Typography>
          <IconButton
            onClick={() => scrollTo("about")}
            aria-label="Scroll to About section"
            sx={{
              width: 42,
              height: 42,
              border: "1px solid var(--border-strong)",
              background: "var(--bg-card)",
              color: "primary.main",
              boxShadow: "0 8px 22px rgba(23,35,34,0.08)",
              animation: "hero-scroll-bounce 2s ease-in-out infinite",
              "&:hover": {
                background: "var(--accent-soft)",
                transform: "translateY(2px)",
              },
              "@keyframes hero-scroll-bounce": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(5px)" },
              },
              "@media (prefers-reduced-motion: reduce)": {
                animation: "none",
              },
            }}
          >
            <KeyboardArrowDownRoundedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
