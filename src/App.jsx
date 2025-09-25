import React, { useEffect, useMemo, useRef, useState } from "react";
//import lanBg from "./assets/images/SMBG2.png"; //BG.jpeg.jpg;
import lanBg from "./assets/images/banner.jpg"; //BG.jpeg.jpg;
import top3 from "./assets/images/swara-t33.png";
import final10 from "./assets/images/swara-t10.png";
import allP3 from "./assets/images/swara-all3.png";
import regBg from "./assets/images/RG-Img1.png";
import regBg1 from "./assets/images/Rg11.png";
import { FaWhatsapp } from "react-icons/fa";

import { Menu, X } from "lucide-react"; // for hamburger menu icons
import { motion, useAnimation, useInView } from "framer-motion";
import axios from "axios";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  Phone,
  Youtube,
  Instagram,
  Facebook,
  PlayCircle,
  Shield,
  Trophy,
  User2,
  FileText,
  Globe2,
  Upload,
  ChevronDown,
} from "lucide-react";
import CollectionSection from "./components/CollectionSection";
import MediaCarousel from "./components/MediaCarousel";
import Leaderboard from "./components/LeaderBoard";

/**
 * Swara Media – Global Portrait Contest 2025
 * Single-file React + Tailwind landing page
 *
 * Notes:
 * - Uses a dark, cinematic theme with neon red/cyan accents to match Swara's vibe.
 * - Sticky transparent navbar that solidifies on scroll.
 * - Animated typing text + countdown timer.
 * - Framer Motion for tasteful animations.
 * - Smooth-scroll anchors.
 * - Registration form with Razorpay (IN) / Stripe & PayPal (global) placeholders.
 * - Replace placeholder payment keys/links before going live.
 */

// ======= CONFIG =======
const BRAND = {
  name: "Swara Media",
  primary: "#e50914", // neon red accent
  secondary: "#00e5ff", // cyan accent
  gold: "#f5c518", // award highlight
  bg: "#0b0f17", // deep navy/charcoal
  card: "#0f1421",
  text: "#e6f1ff",
  muted: "#9bb0c1",
};

// Registration deadline (IST). Update as needed.
const REG_DEADLINE = new Date("2025-10-31T23:59:59+05:30");

// Razorpay test key placeholder — replace with live key when deploying
const RAZORPAY_KEY = "rzp_test_xxxxxxxxxxxxx"; // TODO: replace

// Stripe/PayPal placeholders
const STRIPE_CHECKOUT_URL = "#"; // TODO: replace
const PAYPAL_CHECKOUT_URL = "#"; // TODO: replace

// ======= Utilities =======
const useCountdown = (deadline) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = Math.max(0, deadline - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [deadline]);
  return timeLeft;
};

const useTyping = (
  words = ["Act.", "Express.", "Shine."],
  speed = 120,
  pause = 800
) => {
  const [i, setI] = useState(0);
  const [sub, setSub] = useState(0);
  const [dir, setDir] = useState(1); // 1 typing, -1 deleting
  useEffect(() => {
    const word = words[i % words.length];
    const doneTyping = sub === word.length && dir === 1;
    const doneDeleting = sub === 0 && dir === -1;
    const delay = doneTyping ? pause : doneDeleting ? 500 : speed;
    const id = setTimeout(() => {
      if (doneTyping) setDir(-1);
      else if (doneDeleting) {
        setDir(1);
        setI((x) => (x + 1) % words.length);
      } else setSub((x) => x + dir);
    }, delay);
    return () => clearTimeout(id);
  }, [i, sub, dir, words, speed, pause]);
  const word = words[i % words.length];
  return word.slice(0, sub) + (dir === 1 ? "|" : "");
};

const loadScript = (src) =>
  new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

// ======= Layout Components =======

const Container = ({ children, className = "" }) => (
  <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`py-16 sm:py-24 ${className}`}>
    {children}
  </section>
);

const useSolidNav = () => {
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return solid;
};

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#how", label: "How It Works" },
  { href: "#rewards", label: "Rewards" },
  { href: "#rules", label: "Rules" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

const Navbar = () => {
  const solid = useSolidNav();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const updateActive = () => {
      let current = "#home"; // default
      sections.forEach((section) => {
        const top = section.getBoundingClientRect().top;
        if (top <= window.innerHeight / 2) {
          current = `#${section.id}`;
        }
      });
      setActive(current);
    };

    updateActive(); // ✅ check on page load

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((sec) => observer.observe(sec));

    window.addEventListener("scroll", updateActive); // also update on scroll

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActive);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 inset-x-0 z-50 transition-colors ${
        solid
          ? "bg-black/80 backdrop-blur border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <Container className="flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3">
          <img
            src="/sm-w.png"
            alt="Swara Media"
            className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto md:p-3"
          />
        </a>

        {/* Desktop nav (md+) */}
        <nav className="hidden md:flex items-center gap-4 md:gap-4 lg:gap-6 text-base md:text-sm lg:text-lg">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`transition-colors ${
                active === l.href
                  ? "text-red-500"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Register button (all devices) */}
        <a
          href="#register"
          className="hidden sm:inline-flex items-center gap-2 rounded-xl sm:rounded-2xl px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2 text-xs sm:text-sm lg:text-base font-semibold shadow"
          style={{ background: BRAND.primary, color: "white" }}
        >
          Register Now
        </a>

        {/* Mobile menu button (md:hidden) */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </Container>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="md:hidden bg-black/90 backdrop-blur border-t border-white/10">
          <nav className="flex flex-col items-center gap-4 py-6 text-lg">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-white/80 hover:text-white transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            {/* Register button inside mobile menu */}
            <a
              href="#register"
              className="mt-2 inline-flex items-center gap-2 rounded-xl px-5 py-2 text-sm font-semibold shadow"
              style={{ background: BRAND.primary, color: "white" }}
              onClick={() => setOpen(false)}
            >
              Register Now
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};

// ======= HERO =======
const Hero = () => {
  const typed = useTyping(["Act.", "Express.", "Shine."], 110, 900);
  const { days, hours, minutes, seconds } = useCountdown(REG_DEADLINE);

  return (
    <div
      id="home"
      className="relative min-h-[98vh] flex items-center justify-center text-center px-4 sm:px-6 md:px-8"
      style={{
        width: "100%",
        minHeight: "115vh",
        background: `
    radial-gradient(1400px 600px at 70% -10%, ${BRAND.secondary}22, transparent),
    radial-gradient(860px 400px at 10% 110%, ${BRAND.primary}22, transparent),
    url(${lanBg})
  `,
        backgroundSize: "100% 100%", // stretches full width & height
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Cinematic backdrop */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
      </div>

      <Container>
        <div className="text-center  md:mt-10 md:p-20 ">
          

          
         

          

          {/* Countdown */}
          <div
            className="mt-8 sm:mt-10 inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base md:text-lg"
            style={{ background: BRAND.primary, color: "white" }}
          >
            <Clock size={16} />
            <span className="text-[#fff]">Registration Closes In</span>
            <strong className="tracking-wider">
              {days}d : {hours}h : {minutes}m : {seconds}s
            </strong>
          </div>
        </div>
      </Container>

      {/* Bottom glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] h-20 sm:h-24 blur-2xl sm:blur-3xl"
        style={{ background: `${BRAND.primary}33` }}
      />
    </div>
  );
};

// ======= ABOUT =======
const About = () => (
  <Section
    id="about"
    className="bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_100%)] py-12 sm:py-16 md:py-20 lg:py-28"
  >
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-start">
        {/* Left Text Content */}
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-snug">
            About the Contest
          </h2>

          <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 leading-relaxed">
            Swara Media is launching a first-of-its-kind global talent hunt for
            Telugu-speaking creators. Participants will submit a
            <span className="font-semibold text-white">
              {" "}
              3-minute portrait video
            </span>{" "}
            showcasing their talent. Winners will get the golden opportunity to
            act in Swara Media Web Series and become part of our creative
            family.
          </p>

          <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/80 leading-relaxed">
            <span className="font-semibold" style={{ color: BRAND.secondary }}>
              This is not just a contest
            </span>{" "}
            — it’s your gateway to the entertainment industry!
          </p>
        </div>

        {/* Right Video Box */}
        <div className="relative w-[240px] sm:w-[280px] md:w-[240px] lg:w-[280px] xl:w-[340px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl mx-auto">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/oL4t2seryYM"
            title="Swara Media Shorts"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </Container>
  </Section>
);

// ======= HOW IT WORKS =======
const Step = ({ icon: Icon, title, text, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start({ opacity: 1, y: 0 });
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 
                 bg-[rgba(255,255,255,0.03)] border border-white/10 backdrop-blur flex flex-col items-center justify-items-center"
    >
      <div className="flex flex-col items-center justify-items-center gap-2 sm:gap-3">
        <div
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl sm:rounded-2xl grid place-items-center"
          style={{ background: `${BRAND.secondary}11`, color: BRAND.secondary }}
        >
          <Icon size={18} className="sm:size-6 md:size-8" />
        </div>
        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white text-center">
          {title}
        </h3>
      </div>
      <p className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-white/70 text-center">
        {text}
      </p>
    </motion.div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: FileText,
      title: "Register Online",
      text: "Fill in details & pay ₹1999.",
    },
    {
      icon: Upload,
      title: "Submit Your Video",
      text: "A 3-min portrait shot performance.",
    },
    {
      icon: Shield,
      title: "Get Shortlisted",
      text: "Our jury selects the top entries.",
    },
    {
      icon: Youtube,
      title: "Audience Voting",
      text: "Videos published on YouTube.",
    },
    {
      icon: Trophy,
      title: "Win & Shine",
      text: "Winners announced in grand finale.",
    },
  ];

  return (
    <Section id="how">
      <Container>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center">
          How It Works
        </h2>
        <p className="mt-2 text-sm sm:text-base md:text-lg text-white/70 text-center">
          Five simple steps to the spotlight.
        </p>

        {/* 🔹 Responsive Grid */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {steps.map((s, i) => (
            <Step key={i} {...s} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
};

// ======= REWARDS =======
const Rewards = () => (
  <Section id="rewards" className="relative">
    {/* 🔹 Background Gradient */}
    <div
      className="absolute inset-0 -z-10 opacity-30"
      style={{
        background: `radial-gradient(600px 300px at 20% 30%, ${BRAND.gold}22, transparent),
                     radial-gradient(700px 400px at 80% 70%, ${BRAND.secondary}22, transparent)`,
      }}
    />

    <Container>
      {/* 🔹 Heading */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center">
        Rewards & Opportunities
      </h2>

      {/* 🔹 Responsive Grid */}
      <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {[
          {
            title: "Top 3 Winners",
            text: "Guaranteed role in Swara Media Web Series.",
            accent: top3,
          },
          {
            title: "Top 10 Finalists",
            text: "Featured in Swara Media Talent Showcase.",
            accent: final10,
          },
          {
            title: "All Participants",
            text: "Digital Certificate & Talent Community Access.",
            accent: allP3,
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6 }}
            className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 
                       bg-[rgba(255,255,255,0.03)] backdrop-blur shadow-lg sm:shadow-xl"
          >
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div className="w-15 h-15 sm:w-15 sm:h-15 md:w-20 md:h-20 lg:h-25 lg:w-25 rounded-2xl overflow-hidden">
                <img
                  src={card.accent}
                  alt={card.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-semibold">
                {card.title}
              </h3>
              <p className=" text-sm sm:text-base md:text-lg text-white/80 text-center">
                {card.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔹 Subtitle */}
      <p className="mt-6 sm:mt-8 text-center text-sm sm:text-base md:text-lg lg:text-xl text-white/80">
        This is your chance to be discovered!
      </p>
    </Container>
  </Section>
);

//======= REGISTRATION =======
// const Register = () => {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     city: "",
//     country: "",
//     idFile: null,
//     agree: false,
//   });
//   const [loading, setLoading] = useState(false);
//   const [regId, setRegId] = useState("");

//   const onChange = (e) => {
//     const { name, value, type, checked, files } = e.target;
//     setForm((f) => ({
//       ...f,
//       [name]: type === "checkbox" ? checked : files ? files[0] : value,
//     }));
//   };

//   const validate = () => {
//     if (!form.name || !form.email || !form.phone || !form.city || !form.country)
//       return false;
//     if (!form.agree) return false;
//     return true;
//   };

//   const createRegistrationId = () => {
//     const ts = Date.now().toString(36);
//     const slug = form.name
//       .trim()
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "")
//       .slice(0, 4);
//     return `SWARA25-${slug}-${ts}`.toUpperCase();
//   };

//   const handleRazorpay = async () => {
//     setLoading(true);
//     const ok = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
//     if (!ok) {
//       alert("Payment SDK failed to load. Check your network.");
//       setLoading(false);
//       return;
//     }

//     const orderAmount = 1999 * 100;
//     const rId = createRegistrationId();

//     const options = {
//       key: RAZORPAY_KEY,
//       amount: orderAmount,
//       currency: "INR",
//       name: "Swara Media",
//       description: "Global Portrait Contest 2025 Registration",
//       image: "https://swara.media/favicon.ico",
//       handler: function (response) {
//         setRegId(rId);
//         alert(
//           `Payment successful! Registration ID: ${rId}\nRazorpay Payment ID: ${response.razorpay_payment_id}`
//         );
//       },
//       prefill: { name: form.name, email: form.email, contact: form.phone },
//       notes: { registration_id: rId },
//       theme: { color: BRAND.primary },
//     };
//     const rzp = new window.Razorpay(options);
//     rzp.open();
//     setLoading(false);
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) {
//       alert("Please complete all required fields and accept the rules.");
//       return;
//     }

//     // Generate Registration ID
//     const rId = createRegistrationId();
//     setRegId(rId);

//     // 👇 If India → Razorpay, else Stripe/PayPal
//     if ((form.country || "").toLowerCase() === "india") {
//       await handleRazorpay();
//     } else {
//       const url =
//         STRIPE_CHECKOUT_URL !== "#" ? STRIPE_CHECKOUT_URL : PAYPAL_CHECKOUT_URL;
//       if (url === "#") {
//         alert(
//           `Demo mode: Registration ID ${rId}. Configure Stripe/PayPal URLs.`
//         );
//       } else {
//         window.location.href = url + `?reg=${encodeURIComponent(rId)}`;
//       }
//     }

//     // 👇 Send data to backend API (common for all payments)
//     try {
//       const response = await axios.post("http://localhost:5000/register", {
//         reg_id: rId,
//         name: form.name,
//         email: form.email,
//         phone: form.phone,
//         city: form.city,
//         country: form.country,
//         id_file: form.idFile ? form.idFile.name : null,
//         agree: form.agree,
//         payment_id: "PAY12345", // replace with actual Razorpay/Stripe payment_id
//       });

//       console.log("✅ Saved in backend:", response.data);
//     } catch (error) {
//       console.error("❌ Error saving to backend:", error);
//       alert("Something went wrong while saving registration.");
//     }

//     setForm({
//       name: "",
//       email: "",
//       phone: "",
//       city: "",
//       country: "",
//       idFile: null,
//       agree: false,
//     });
//   };

//   return (
//     <Section id="register">
//       <Container>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
//           {/* Left form */}
//           <div className="rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 bg-[rgba(255,255,255,0.03)] backdrop-blur">
//             <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
//               Register Now
//             </h2>
//             <p className="mt-2 text-white/70 text-sm sm:text-base">
//               Entry Fee:{" "}
//               <span className="font-semibold text-white text-base sm:text-lg">
//                 ₹1999
//               </span>
//             </p>
//             <form
//               onSubmit={onSubmit}
//               className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
//             >
//               <Input
//                 label="Full Name"
//                 name="name"
//                 value={form.name}
//                 onChange={onChange}
//                 required
//               />
//               <Input
//                 label="Email"
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={onChange}
//                 required
//               />
//               <Input
//                 label="Mobile Number (with country code)"
//                 name="phone"
//                 value={form.phone}
//                 onChange={onChange}
//                 required
//               />
//               <Input
//                 label="City"
//                 name="city"
//                 value={form.city}
//                 onChange={onChange}
//                 required
//               />
//               <Input
//                 label="Country"
//                 name="country"
//                 value={form.country}
//                 onChange={onChange}
//                 required
//               />
//               <FileInput
//                 label="ID Proof Upload"
//                 name="idFile"
//                 onChange={onChange}
//               />

//               {/* Checkbox */}
//               <div className="sm:col-span-2 flex items-start gap-3 mt-2">
//                 <input
//                   type="checkbox"
//                   name="agree"
//                   checked={form.agree}
//                   onChange={onChange}
//                   className="mt-1 w-4 h-4"
//                 />
//                 <p className="text-xs sm:text-sm text-white/80">
//                   I accept the{" "}
//                   <a
//                     href="#rules"
//                     className="underline"
//                     style={{ color: BRAND.secondary }}
//                   >
//                     Contest Rules & Regulations
//                   </a>
//                   .
//                 </p>
//               </div>

//               {/* Buttons */}
//               <div className="sm:col-span-2 mt-4 flex flex-wrap items-center gap-3">
//                 <button
//                   disabled={loading}
//                   type="submit"
//                   className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl font-semibold shadow-xl text-white text-sm sm:text-base"
//                   style={{ background: BRAND.primary }}
//                 >
//                   {loading ? "Processing..." : "Register Now"}
//                 </button>
//                 {/* {regId && (
//                   <span
//                     className="text-xs sm:text-sm rounded-full px-3 py-1 border"
//                     style={{
//                       borderColor: BRAND.secondary,
//                       color: BRAND.secondary,
//                     }}
//                   >
//                     Registration ID: {regId}
//                   </span>
//                 )} */}
//               </div>
//             </form>
//           </div>

//           {/* Right info panel */}
//           <div className="rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 bg-[radial-gradient(600px_200px_at_20%_10%,rgba(229,9,20,0.15),transparent),radial-gradient(600px_200px_at_90%_90%,rgba(0,229,255,0.12),transparent)]">
//             <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
//               What you’ll need
//             </h3>
//             <ul className="mt-4 space-y-3 text-white/80 text-xs sm:text-sm md:text-base">
//               {[
//                 "A 3-minute vertical (portrait) performance video.",
//                 "Government-issued ID for verification.",
//                 "YouTube consent for audience voting stage.",
//                 "Parent/guardian consent if under 18.",
//                 "Stable internet for upload & payments.",
//               ].map((t, i) => (
//                 <li key={i} className="flex items-start gap-2">
//                   <CheckCircle2
//                     className="mt-0.5 flex-shrink-0"
//                     size={16}
//                     style={{ color: BRAND.secondary }}
//                   />
//                   <span>{t}</span>
//                 </li>
//               ))}
//             </ul>
//             <div className="mt-6 p-4 rounded-2xl border border-white/10 text-white/80 text-xs sm:text-sm md:text-base">
//               After payment, your Registration ID is generated automatically.
//               Keep it safe for all future communications.
//             </div>
//           </div>
//         </div>
//       </Container>
//     </Section>
//   );
// };

// /* Inputs */
// const Input = ({ label, className = "", ...props }) => (
//   <label className={`flex flex-col gap-1 ${props.className || className}`}>
//     <span className="text-xs sm:text-sm text-white/70">{label}</span>
//     <input
//       {...props}
//       className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#0b0f17] border border-white/10 text-white text-sm sm:text-base placeholder-white/40 focus:outline-none focus:ring-2"
//       style={{ outlineColor: BRAND.secondary }}
//     />
//   </label>
// );

// const FileInput = ({ label, name, onChange }) => (
//   <label className="flex flex-col gap-1 sm:col-span-2">
//     <span className="text-xs sm:text-sm text-white/70">{label}</span>
//     <input
//       name={name}
//       type="file"
//       onChange={onChange}
//       className="file:mr-4 file:rounded-lg file:border-0 file:px-3 sm:file:px-4 file:py-2 file:bg-[#121a2a] file:text-white/90 file:hover:opacity-90 text-white/70 text-xs sm:text-sm"
//     />
//   </label>
// );

const Register = () => {
  return (
    <section id="register" className="w-full px-4 sm:px-6 lg:px-12 py-10 mt-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left Side */}
        <div
          className="relative flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-black/30 min-h-[400px] sm:min-h-[450px] lg:min-h-[550px]"
          style={{
            backgroundImage: `url(${regBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Right Side */}
        <div
          className="rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 
          bg-[radial-gradient(600px_200px_at_20%_10%,rgba(229,9,20,0.15),transparent),radial-gradient(600px_200px_at_90%_90%,rgba(0,229,255,0.12),transparent)]"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-white">
            What you’ll need
          </h3>
          <ul className="mt-4 space-y-3 text-white/80 text-xs sm:text-sm md:text-base">
            {[
              "A 3-minute vertical (portrait) performance video.",
              // "Government-issued ID for verification.",
              "YouTube consent for audience voting stage.",
              "Parent/guardian consent if under 18.",
              "Stable internet for upload & payments.",
            ].map((t, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2
                  className="mt-0.5 flex-shrink-0"
                  size={16}
                  style={{ color: BRAND.secondary }}
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 p-4 rounded-2xl border border-white/10 text-white/80 text-xs sm:text-sm md:text-base">
            After payment, your Registration ID is generated automatically. Keep
            it safe for all future communications.
          </div>

          <a
            href="https://pages.razorpay.com/pl_RIifPAF4Pwbo2X/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-6 py-3 mt-6 bg-red-600 hover:bg-red-700  text-white font-semibold rounded-full shadow-lg transition">
              Register Now - 1999/-
            </button>
          </a>
        </div>
        {/* //Small Image + Button Section - fixed at bottom */}
        {/* <div className="absolute bottom-0 left-0 right-0 flex flex-row items-center justify-center gap-3 p-6 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <img
              src={regBg1}
              alt="Register Icon"
              className="w-16 h-20 object-contain"
            />
          <a
            href="https://pages.razorpay.com/pl_RIifPAF4Pwbo2X/view"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="px-6 py-3 mt-2 bg-red-600 hover:bg-red-700  text-white font-semibold rounded-full shadow-lg transition">
              Register Now - 1999/-
            </button>
          </a>
        </div> */}
      </div>
    </section>
  );
};

// ======= RULES (Accordion) =======
const AccordionItem = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full flex items-center justify-between
          px-4 sm:px-5 lg:px-6 py-3 sm:py-4
          text-left text-white/90
          hover:bg-white/5
        "
      >
        <span className="font-medium text-base sm:text-lg lg:text-xl">
          {title}
        </span>
        <ChevronDown
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-4 mt-3 sm:px-5 lg:px-6 pb-4 sm:pb-5 text-white/70 text-sm sm:text-base">
          {children}
        </div>
      )}
    </div>
  );
};

const Rules = () => (
  <Section id="rules">
    <Container>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center">
        Rules & Regulations
      </h2>
      <div className="mt-8 space-y-3 max-w-3xl mx-auto">
        <AccordionItem title="Eligibility">
          Open to all Telugu-speaking participants worldwide. Minors must submit
          parent/guardian consent.
        </AccordionItem>
        <AccordionItem title="Video Guidelines">
          Submit one (1) portrait/vertical video up to 3 minutes, original
          content only. No copyrighted music unless you own rights. Keep it
          respectful and community-friendly.
        </AccordionItem>
        <AccordionItem title="Selection Process">
          Jury shortlists top entries based on performance, originality, and
          storytelling. Shortlisted videos go to YouTube for audience voting.
        </AccordionItem>
        <AccordionItem title="Prizes">
          Top 3 winners get roles in a Swara Media Web Series. Top 10 finalists
          featured in our Talent Showcase. All participants receive digital
          certificates.
        </AccordionItem>
        <AccordionItem title="Rights & Disqualification">
          By submitting, you grant Swara Media rights to showcase your video for
          judging, marketing, and audience voting. Plagiarism, hate speech, or
          rule violations lead to disqualification.
        </AccordionItem>
      </div>
    </Container>
  </Section>
);

// ======= FAQ =======
const FAQ = () => (
  <Section id="faq">
    <Container>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center">
        FAQ
      </h2>
      <div
        className="
          mt-8 
          grid grid-cols-1 
          sm:grid-cols-1 
          md:grid-cols-2 
          lg:grid-cols-2 
          xl:grid-cols-2 
          gap-4 sm:gap-6 lg:gap-8
        "
      >
        <FaqItem
          q="Can I participate from abroad?"
          a="Yes, it’s open worldwide."
        />
        <FaqItem
          q="Can I submit more than one video?"
          a="No, only one entry per person."
        />
        <FaqItem
          q="Is the fee refundable?"
          a="No, the registration fee is non-refundable."
        />
        <FaqItem
          q="What languages are accepted?"
          a="Primarily Telugu; non-dialogue performances are welcome from anyone worldwide."
        />
      </div>
    </Container>
  </Section>
);

const FaqItem = ({ q, a }) => (
  <div
    className="
      rounded-2xl p-5 
      border border-white/10 
      bg-[rgba(255,255,255,0.03)] 
      transition hover:shadow-lg hover:shadow-white/5
    "
  >
    <h3 className="text-white font-medium text-base sm:text-lg lg:text-xl">
      {q}
    </h3>
    <p className="mt-2 text-white/70 text-sm sm:text-base">{a}</p>
  </div>
);

// ======= CONTACT =======
const Contact = () => (
  <Section id="contact">
    <Container>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white text-center mb-8">
        Contact
      </h2>
      <div className="flex justify-center">
        <div className="rounded-3xl p-2 md:p-8 border border-white/10 bg-[rgba(255,255,255,0.03)] min-h-[320px] w-full max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Need Help?
          </h2>
          <ul className="mt-4 space-y-3 text-white/80 text-xl">
            <li className="flex items-center gap-3">
              <Mail size={18} style={{ color: BRAND.secondary }} />{" "}
              contests@swara.media
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} style={{ color: BRAND.secondary }} /> WhatsApp:
              +91-XXXXXXXXXX
            </li>
            <li className="flex items-center gap-3">
              <Globe2 size={18} style={{ color: BRAND.secondary }} />{" "}
              swara.media
            </li>
          </ul>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl border border-white/10"
            >
              <Youtube />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl border border-white/10"
            >
              <Instagram />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl border border-white/10"
            >
              <Facebook />
            </a>
          </div>
        </div>
      </div>
    </Container>
  </Section>
);

// ======= FOOTER =======
const Footer = () => (
  <footer className="border-t border-white/10">
    <Container className="py-10 text-white/70 text-sm">
      <div
        className="
        grid grid-cols-1 
        sm:grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-2 
        xl:grid-cols-2 
        gap-4
      "
      >
        {/* Left Side */}
        <p className="text-center sm:text-center md:text-left lg:text-left xl:text-left">
          © 2025 Swara Media
        </p>

        {/* Right Side */}
        <p
          className="
          text-center 
          sm:text-center 
          md:text-right 
          lg:text-right 
          xl:text-right 
          space-x-4
        "
        >
          <a href="#" className="hover:text-white">
            Terms & Conditions
          </a>
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Refund Policy
          </a>
        </p>
      </div>
    </Container>
  </footer>
);

// ======= ROOT PAGE =======
export default function SwaraLandingPage() {
  useEffect(() => {
    // Smooth scroll
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (id && id.startsWith("#") && id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div
      style={{
        background: BRAND.bg,
        color: BRAND.text,
        fontFamily: "Poppins, ui-sans-serif, system-ui",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;800&display=swap"
        rel="stylesheet"
      />

      <Navbar />
      <main>
        <Hero />
        <About />
        <CollectionSection />
        <HowItWorks />
        <Rewards />
        <MediaCarousel />
        <Register />
        <Leaderboard />
        <Rules />
        <FAQ />
        <Contact />
      </main>
      <Footer />

      {/* Floating register badge */}
      {/* <a
        href="#register"
        className="fixed bottom-6 right-6 rounded-full shadow-2xl px-5 py-3 font-semibold z-100"
        style={{ background: "green", color: "white" }}
      >
        <FaWhatsapp size={20} />
        <span>Chat on WhatsApp</span>
      </a> */}
      <a
        href="https://wa.me/919866843232"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 rounded-full shadow-2xl px-3 py-3 font-semibold z-100 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white transition"
      >
        <FaWhatsapp size={42} />
        {/* <span>Chat on WhatsApp</span> */}
      </a>
    </div>
  );
}
