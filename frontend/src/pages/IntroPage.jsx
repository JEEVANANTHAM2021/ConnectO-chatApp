/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, MessageCircle, } from "lucide-react";
import { GrSecure } from "react-icons/gr";
import { HiMiniHomeModern } from "react-icons/hi2";

export default function IntroPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-200 relative overflow-hidden">

      {/* 3D Gradient Blobs Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-72 h-72 bg-primary bg-opacity-30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-secondary bg-opacity-30 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
      </div>

      {/* Navbar */}
      <div className="navbar bg-base-100 bg-opacity-80 backdrop-blur-md px-4 md:px-8">
        <div className="flex-1">
          <h1 className="text-xl md:text-2xl font-bold text-primary">
            ConnectO
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-3">
          <Link to="/login" className="btn btn-ghost">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Get In
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="btn btn-ghost btn-circle">
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Card */}
      {open && (
        <div className="md:hidden absolute right-4 top-16 bg-base-100 shadow-xl rounded-xl p-4 w-48 z-50">
          <div className="flex flex-col gap-3">
            <Link to="/login" className="btn btn-sm btn-ghost" onClick={() => setOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="btn btn-sm btn-primary" onClick={() => setOpen(false)}>
              Get In
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="flex items-center justify-center px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl w-full">
            {/* 3D Animated Chat Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ rotateY: 10, rotateX: 5 }}
            className="perspective-1000"
          >
            <div className="mockup-window border bg-base-300 shadow-2xl rounded-xl">
              <div className="bg-base-200 px-6 py-8 space-y-4">

                <div className="chat chat-start">
                  <div className="chat-bubble">
                    Welcome to ConnectO
                  </div>
                </div>

                <div className="chat chat-end">
                  <div className="chat-bubble chat-bubble-primary">
                    This effect is smooth
                  </div>
                </div>

                <div className="chat chat-start">
                  <div className="chat-bubble">
                    Built with React + Tailwind + DaisyUI
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 text-center lg:text-left"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Connect. Chat.
              <span className="text-primary block mt-2">
                Instantly.
              </span>
            </h2>

            <p className="text-base-content/70 text-base md:text-lg max-w-xl mx-auto lg:mx-0">
              A powerful real-time chat application built for speed,
              security and modern communication.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/signup" className="btn btn-primary btn-lg">
                Get In
              </Link>
            </div>

            <p className="italic text-base-content text-opacity-60">
              “Great conversations start with a single message.”
            </p>
          </motion.div>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-16 px-6 bg-base-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">

          <motion.div whileHover={{ scale: 1.05 }} className="card bg-base-200 shadow-xl">
            <div className="card-body items-center">
              <MessageCircle className="size-10 text-primary" />
              <h3 className="card-title">Real-Time</h3>
              <p>Instant message delivery with smooth UI.</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="card bg-base-200 shadow-xl">
            <div className="card-body items-center">
            <GrSecure className="size-10 text-primary" />
              <h3 className="card-title">Secure</h3>
              <p>Protected authentication system.</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="card bg-base-200 shadow-xl">
            <div className="card-body items-center">
            <HiMiniHomeModern className="size-10 text-primary"/>
              <h3 className="card-title">Modern UI</h3>
              <p>Built with DaisyUI & TailwindCSS.</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="flex justify-center p-2">
            <p className="italic text-base-content text-opacity-60">
              “Logging In to Chat World.”
            </p>
        </div>
      {/* Footer */}
      <footer className="flex justify-between items-center text-center p-6 bg-base-100 text-base-content text-opacity-60">
        © {new Date().getFullYear()} ConnectO
        <Link to="/login" className="btn btn-outline btn-lg">
                    Login
        </Link> 
      </footer>
    </div>
  );
}