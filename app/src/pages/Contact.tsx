import { motion } from "motion/react";
import { Mail, Send, Github, Linkedin, Twitter, MapPin, Phone } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";

// Types
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactInfo {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  href: string;
  color: string;
}

interface SocialLink {
  icon: React.ComponentType<any>;
  href: string;
  color: string;
}

// Reusable component for contact cards
const ContactCard: React.FC<{ info: ContactInfo; index?: number }> = ({ info, index = 0 }) => {
  const Icon = info.icon;
  return (
    <motion.a
      key={info.label}
      href={info.href}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      whileHover={{ scale: 1.02, x: 5 }}
      className="block bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all"
    >
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: `${info.color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color: info.color }} />
        </div>
        <div>
          <div className="text-sm text-white/50 mb-1">{info.label}</div>
          <div className="text-lg">{info.value}</div>
        </div>
      </div>
    </motion.a>
  );
};

// Reusable component for social link buttons
const SocialButton: React.FC<{ social: SocialLink; index?: number }> = ({ social, index = 0 }) => {
  const Icon = social.icon;
  return (
    <motion.a
      key={index}
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1, y: -3 }}
      whileTap={{ scale: 0.95 }}
      className="w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 hover:border-white/20 transition-all"
      style={{ background: `${social.color}10` }}
    >
      <Icon className="w-5 h-5" style={{ color: social.color }} />
    </motion.a>
  );
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Sorry — this form isn’t connected yet. Please reach out via email.");
    // console.log("Form submitted:", formData);
  };

  // Contact info
  const contactInfo: ContactInfo[] = [
    { icon: Mail, label: "Email", value: "will.li.1@stonybrook.edu", href: "mailto:will.li.1@stonybrook.edu", color: "var(--pastel-blue)" },
    // { icon: Phone, label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567", color: "var(--pastel-yellow)" },
    { icon: MapPin, label: "Location", value: "New York, NY", href: "#", color: "var(--pastel-pink)" },
  ];

  const socialLinks: SocialLink[] = [
    { icon: Github, href: "https://github.com/w-lly/", color: "var(--pastel-blue)" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/will-li-e271828/", color: "var(--pastel-yellow)" },
  ];

  return (
    <div className="min-h-screen px-6 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div
        className="absolute top-40 right-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--pastel-blue)" }}
      />
      <div
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--pastel-pink)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Send className="w-6 h-6" style={{ color: "var(--pastel-yellow)" }} />
            <span style={{ color: "var(--pastel-yellow)" }}>Get in Touch</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6">Let's Connect</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Whether you have a project in mind, want to collaborate, or just want to say hello, I'd love to hear from you
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Sidebar: Contact info and socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info, index) => (
              <ContactCard key={info.label} info={info} index={index} />
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
            >
              <h3 className="text-lg mb-4">Follow Me</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <SocialButton key={index} social={social} index={index} />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
              <h2 className="text-2xl mb-6">Send Me a Message</h2>

              <div className="space-y-6">
                {["name", "email", "subject"].map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="block mb-2 text-sm text-white/70">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      id={field}
                      name={field}
                      value={formData[field as keyof FormData]}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors"
                      placeholder={`Your ${field}`}
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm text-white/70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 transition-colors resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-xl flex items-center justify-center gap-2 text-black transition-all"
                  style={{ background: "var(--pastel-yellow)" }}
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
