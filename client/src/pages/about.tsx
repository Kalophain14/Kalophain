import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        <div className="prose prose-lg dark:prose-invert">
          <p>
            Hi, I'm Temoso Chueu, a passionate full-stack developer based in Cape Town,
            South Africa. I specialize in building modern web applications and exploring
            new technologies.
          </p>
          <p>
            With a strong foundation in both frontend and backend development,
            I enjoy creating seamless user experiences and solving complex technical
            challenges.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Skills & Expertise</h2>
          <ul>
            <li>Frontend Development (React, TypeScript, Tailwind CSS)</li>
            <li>Backend Development (Node.js, Express, PostgreSQL)</li>
            <li>UI/UX Design</li>
            <li>Performance Optimization</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
}
