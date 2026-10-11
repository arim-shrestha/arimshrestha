"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useProfile } from "@/hooks/usePortfolioData";
import { useThemeMode } from "@/contexts/ThemeModeContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import ThemeSwitcher from "./ThemeSwitcher";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { data: profile, loading } = useProfile();
  const { mode } = useThemeMode();
  const appBarRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        appBarRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 },
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!loading && profile.name) {
      document.title = profile.name;
    }
  }, [loading, profile.name]);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace("#", ""));
    let frameId = 0;

    const updateActiveSection = () => {
      const readingLine = Math.max(96, window.innerHeight * 0.3);
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => Boolean(section));
      const sectionsAtReadingLine = sections.filter((section) => {
        const bounds = section.getBoundingClientRect();
        return bounds.top <= readingLine && bounds.bottom > readingLine;
      });
      const activeAtReadingLine = sectionsAtReadingLine.at(-1);

      if (activeAtReadingLine) {
        setActiveSection(activeAtReadingLine.id);
      } else {
        const closestSection = sections
          .filter((section) => section.getBoundingClientRect().top <= readingLine)
          .at(-1);
        setActiveSection(closestSection?.id ?? sections[0]?.id ?? "home");
      }

      frameId = 0;
    };

    const requestUpdate = () => {
      if (!frameId) frameId = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId) window.cancelAnimationFrame(frameId);
    };
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <AppBar
        ref={appBarRef}
        position="fixed"
        elevation={0}
        sx={{
          transition: "background 0.4s ease, border-color 0.4s ease",
          background: scrolled
            ? mode === "dark"
              ? "rgba(23,35,34,0.9)"
              : "rgba(255,255,255,0.88)"
            : "transparent",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
        }}
      >
        <Toolbar
          sx={{
            maxWidth: 1200,
            width: "100%",
            mx: "auto",
            px: { xs: "14px", sm: "24px" },
            minHeight: "72px !important",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <Button
            onClick={() => scrollTo("#home")}
            disableRipple
            sx={{
              p: 0,
              minWidth: 0,
              gap: "10px",
              "&:hover": { background: "none" },
            }}
          >
            {/* Both variants render; CSS picks one so there's no flash before hydration */}
            {(["light", "dark"] as const).map((variant) => (
              <Box
                key={variant}
                component="img"
                src={`/images/logo/logo-${variant}.png`}
                alt={loading ? "Logo" : profile.name}
                sx={{
                  height: 28,
                  width: "auto",
                  display: variant === "light" ? "block" : "none",
                  ".dark &": { display: variant === "dark" ? "block" : "none" },
                }}
              />
            ))}
          </Button>

          {/* Desktop nav links */}
          <Box
            component="ul"
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: "2px",
              listStyle: "none",
              m: 0,
              p: 0,
            }}
          >
            {navLinks.map((link) => {
              const active = activeSection === link.href.replace("#", "");
              return (
                <li key={link.href}>
                  <Button
                    onClick={() => scrollTo(link.href)}
                    sx={{
                      background: active ? "rgba(21,94,99,0.08)" : "none",
                      borderRadius: "8px",
                      px: "14px",
                      py: "6px",
                      fontSize: "0.875rem",
                      fontWeight: active ? 600 : 500,
                      color: active ? "primary.light" : "text.secondary",
                      minWidth: 0,
                      "&:hover": {
                        background: active
                          ? "rgba(21,94,99,0.08)"
                          : "rgba(21,94,99,0.05)",
                        color: active ? "primary.light" : "text.primary",
                      },
                    }}
                  >
                    {link.label}
                  </Button>
                </li>
              );
            })}
          </Box>

          {/* Right side */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ThemeSwitcher />
            <Button
              component="a"
              href={loading ? undefined : profile.resumeUrl}
              download="arim-shrestha-cv.pdf"
              title="Download Curriculum Vitae (PDF)"
              aria-label="Download Curriculum Vitae (PDF)"
              variant="contained"
              size="small"
              startIcon={<DownloadIcon sx={{ fontSize: "13px !important" }} />}
              disabled={loading || !profile.resumeUrl}
              sx={{
                display: { xs: "none", md: "inline-flex" },
                fontSize: "0.8rem",
                py: "8px",
                px: "18px",
              }}
            >
              {loading ? "Loading..." : "Download CV"}
            </Button>

            {/* Hamburger */}
            <IconButton
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              sx={{
                display: { xs: "flex", md: "none" },
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "8px",
                p: "7px",
                color: "text.primary",
              }}
            >
              {menuOpen ? (
                <CloseIcon fontSize="small" />
              ) : (
                <MenuIcon fontSize="small" />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        sx={{
          display: { md: "none" },
          "& .MuiDrawer-paper": {
            top: "72px",
            background:
              mode === "dark" ? "rgba(23,35,34,0.97)" : "rgba(255,255,255,0.97)",
            backdropFilter: "blur(18px)",
            borderBottom: "1px solid",
            borderColor: "divider",
          },
        }}
        ModalProps={{ keepMounted: true }}
      >
        <List sx={{ px: 3, py: 1.5 }}>
          {navLinks.map((link) => (
            <ListItem key={link.href} disablePadding sx={{ mb: 0.5 }}>
              <Button
                onClick={() => scrollTo(link.href)}
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  px: "14px",
                  py: "11px",
                  borderRadius: "8px",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  color:
                    activeSection === link.href.replace("#", "")
                      ? "primary.light"
                      : "text.secondary",
                  "&:hover": {
                    background: "var(--accent-soft)",
                    color: "text.primary",
                  },
                }}
              >
                {link.label}
              </Button>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ pt: 1 }}>
            <Button
              component="a"
              href={profile.resumeUrl}
              download="arim-shrestha-cv.pdf"
              title="Download Curriculum Vitae (PDF)"
              aria-label="Download Curriculum Vitae (PDF)"
              variant="contained"
              fullWidth
              startIcon={<DownloadIcon />}
              sx={{ fontSize: "0.875rem" }}
            >
              Download CV
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
