"use client";

import { useProfile } from "@/hooks/usePortfolioData";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import ContactMailOutlinedIcon from "@mui/icons-material/ContactMailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import about from "@/data/about.json";

export default function Footer() {
  const { data: profile, loading } = useProfile();

  const professionalLinks = [
    {
      label: "GitHub",
      href: profile.github,
      icon: <GitHubIcon sx={{ fontSize: 19 }} />,
    },
    {
      label: "LinkedIn",
      href: profile.linkedin,
      icon: <LinkedInIcon sx={{ fontSize: 19 }} />,
    },
  ].filter((link) => Boolean(link.href));

  const socialMediaLinks = [
    {
      label: "Facebook",
      href: profile.facebook,
      icon: <FacebookIcon sx={{ fontSize: 19 }} />,
    },
    {
      label: "Instagram",
      href: profile.instagram,
      icon: <InstagramIcon sx={{ fontSize: 19 }} />,
    },
  ].filter((link) => Boolean(link.href));

  const quickLinks = [
    { label: "Home", href: "#home", icon: <HomeOutlinedIcon /> },
    { label: "About", href: "#about", icon: <PersonOutlineRoundedIcon /> },
    { label: "Skills", href: "#skills", icon: <CodeRoundedIcon /> },
    { label: "Experience", href: "#experience", icon: <WorkOutlineRoundedIcon /> },
    { label: "Contact", href: "#contact", icon: <ContactMailOutlinedIcon /> },
  ];

  const contactDetails = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: <EmailOutlinedIcon />,
    },
    {
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone}`,
      icon: <PhoneOutlinedIcon />,
    },
    {
      label: "Location",
      value: profile.location,
      href: "",
      icon: <LocationOnOutlinedIcon />,
    },
  ].filter((item) => Boolean(item.value));

  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        isolation: "isolate",
        mt: { xs: 8, sm: 10, md: 12 },
        background: "var(--bg-secondary)",
        pt: 6,
        pb: 4,
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
        sx={{
          position: "absolute",
          right: 0,
          bottom: "calc(100% - 1px)",
          left: 0,
          zIndex: -1,
          display: "block",
          width: "100%",
          height: { xs: 66, sm: 86, md: 112 },
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <Box
          component="path"
          d="M0 90C218 60 404 28 640 50C888 73 1048 88 1240 60C1320 48 1384 40 1440 44V120H0Z"
          sx={{ fill: "var(--accent-soft)", opacity: 0.75 }}
        />
        <Box
          component="path"
          d="M0 78C230 64 374 38 592 40C838 42 962 78 1174 68C1282 63 1370 48 1440 46V120H0Z"
          sx={{ fill: "var(--bg-secondary)" }}
        />
      </Box>

      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: "14px", sm: "24px" } }}>
        {/* Centered identity */}
        <Stack
          alignItems="center"
          sx={{ maxWidth: 620, mx: "auto", mb: 5, textAlign: "center" }}
        >
          <Box sx={{ mb: 1.75 }}>
            {/* Both variants render; CSS picks one so there's no flash before hydration */}
            {(["light", "dark"] as const).map((variant) => (
              <Box
                key={variant}
                component="img"
                src={`/images/logo/logo-${variant}.png`}
                alt={loading ? "Logo" : profile.name}
                sx={{
                  height: { xs: 36, sm: 42 },
                  width: "auto",
                  display: variant === "light" ? "block" : "none",
                  ".dark &": { display: variant === "dark" ? "block" : "none" },
                }}
              />
            ))}
          </Box>

          <Typography
            sx={{
              maxWidth: 520,
              color: "text.disabled",
              fontSize: { xs: "0.8rem", sm: "0.85rem" },
              lineHeight: 1.75,
            }}
          >
            {loading ? (
              <Box sx={{ display: "grid", justifyItems: "center" }}>
                <Skeleton variant="text" width={320} />
                <Skeleton variant="text" width={250} />
              </Box>
            ) : (
              about.footerText
            )}
          </Typography>

        </Stack>

        <Box
          sx={{
            maxWidth: 900,
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" },
            gap: { xs: 4, md: 7 },
            mx: "auto",
            mb: 6,
          }}
        >
          <Box component="nav" aria-label="Footer navigation">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <LinkRoundedIcon sx={{ color: "primary.main", fontSize: 18 }} />
              <Typography sx={{ fontSize: "0.9rem", fontWeight: 700 }}>
                Quick Links
              </Typography>
            </Box>
            <Stack gap={1.2}>
              {quickLinks.map((link) => (
                <Box
                  key={link.href}
                  component="a"
                  href={link.href}
                  sx={{
                    width: "fit-content",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.9,
                    color: "text.secondary",
                    fontSize: "0.78rem",
                    textDecoration: "none",
                    transition: "color 0.2s ease, transform 0.2s ease",
                    "& svg": { fontSize: 15 },
                    "&:hover": { color: "primary.light", transform: "translateX(3px)" },
                    "&:focus-visible": { outline: "2px solid var(--accent-blue-light)", outlineOffset: 3 },
                  }}
                >
                  {link.icon}
                  {link.label}
                </Box>
              ))}
            </Stack>
          </Box>

          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <PhoneOutlinedIcon sx={{ color: "primary.main", fontSize: 18 }} />
              <Typography sx={{ fontSize: "0.9rem", fontWeight: 700 }}>
                Get in Touch
              </Typography>
            </Box>
            <Stack gap={1.4}>
              {contactDetails.map((item) => (
                <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      borderRadius: "9px",
                      background: "var(--bg-card)",
                      color: "primary.main",
                      "& svg": { fontSize: 16 },
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Box sx={{ minWidth: 0 }}>
                    <Typography sx={{ color: "text.disabled", fontSize: "0.65rem" }}>
                      {item.label}
                    </Typography>
                    {item.href ? (
                      <Typography
                        component="a"
                        href={item.href}
                        sx={{
                          display: "block",
                          overflow: "hidden",
                          color: "text.secondary",
                          fontSize: "0.76rem",
                          textDecoration: "none",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          "&:hover": { color: "primary.light" },
                        }}
                      >
                        {item.value}
                      </Typography>
                    ) : (
                      <Typography sx={{ color: "text.secondary", fontSize: "0.76rem" }}>
                        {item.value}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>

          {(professionalLinks.length > 0 || socialMediaLinks.length > 0) && (
            <Box sx={{ gridColumn: { sm: "1 / -1", md: "auto" } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <OpenInNewRoundedIcon sx={{ color: "primary.main", fontSize: 18 }} />
                <Typography sx={{ fontSize: "0.9rem", fontWeight: 700 }}>
                  Connect
                </Typography>
              </Box>
              <Stack gap={2.25}>
                {[
                  { label: "Professional", links: professionalLinks },
                  { label: "Social Media", links: socialMediaLinks },
                ].filter((group) => group.links.length > 0).map((group) => (
                  <Box key={group.label}>
                    <Typography
                      sx={{
                        mb: 1,
                        color: "text.disabled",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {group.label}
                    </Typography>
                    <Stack direction="row" gap="10px">
                      {group.links.map((link) => (
                        <IconButton
                          key={link.label}
                          component={loading ? "button" : "a"}
                          href={loading ? undefined : link.href}
                          target={loading ? undefined : "_blank"}
                          rel={loading ? undefined : "noopener noreferrer"}
                          aria-label={link.label}
                          disabled={loading}
                          sx={{
                            width: 42,
                            height: 42,
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: "11px",
                            background: "var(--bg-card)",
                            color: "text.secondary",
                            transition: "border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s",
                            "&:hover": {
                              borderColor: "primary.main",
                              color: "primary.light",
                              background: "var(--accent-soft)",
                              transform: "translateY(-3px)",
                            },
                            "&:focus-visible": {
                              outline: "2px solid var(--accent-blue-light)",
                              outlineOffset: 3,
                            },
                          }}
                        >
                          {link.icon}
                        </IconButton>
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Box>

        <Box
          aria-hidden="true"
          sx={{
            width: "100%",
            maxWidth: 900,
            height: "2px",
            mx: "auto",
            borderRadius: "999px",
            background:
              "linear-gradient(90deg, transparent 0%, var(--accent-blue) 12%, var(--accent-blue) 88%, transparent 100%)",
            opacity: 0.62,
            boxShadow: "0 0 12px rgba(21,94,99,0.2)",
          }}
        />

        <Stack alignItems="center" sx={{ mt: 3, textAlign: "center" }}>
          <Typography sx={{ fontSize: "0.78rem", color: "text.disabled" }}>
            &copy; 2026 {profile.name}. All rights reserved.
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
