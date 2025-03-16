import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

export default function ContactMe() {
  return (
    <motion.div
      className="w-full py-20 bg-white border-2 rounded-lg flex flex-col items-center justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <motion.h2
        className="text-5xl font-bold text-blue-600 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
      >
        Let's Connect!
      </motion.h2>
      <motion.p
        className="text-xl text-gray-700 mb-12 text-center max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.4 }}
      >
        Have a question or want to collaborate? Feel free to reach out to me
        via:{" "}
      </motion.p>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.6 }}
      >
        {/* Email */}
        <motion.a
          href="mailto:your-email@example.com"
          className="px-8 py-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={faEnvelope} className="h-8 w-8" />
          <span className="text-lg font-medium">Email Me</span>
        </motion.a>

        {/* WhatsApp */}
        <motion.a
          href="https://wa.me/your-whatsapp-number"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-6 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={faWhatsapp} className="h-8 w-8" />
          <span className="text-lg font-medium">WhatsApp</span>
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href="https://www.linkedin.com/in/your-linkedin-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-6 bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-colors flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={faLinkedin} className="h-8 w-8" />
          <span className="text-lg font-medium">LinkedIn</span>
        </motion.a>

        {/* GitHub */}
        <motion.a
          href="https://github.com/your-github-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FontAwesomeIcon icon={faGithub} className="h-8 w-8" />
          <span className="text-lg font-medium">GitHub</span>
        </motion.a>
      </motion.div>
      <motion.p
        className="text-xl text-gray-700 mt-12 text-center max-w-2xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.4 }}
      >
        I'm always open to new opportunities and discussions!
      </motion.p>
      {/* Contact Options */}
    </motion.div>
  );
}
