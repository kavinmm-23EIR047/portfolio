import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import confetti from "canvas-confetti"; // ✅ added

import {
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";

const Hero = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [status, setStatus] = useState("Computer starts...");
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const checkWinner = (b) => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6],
    ];
    for (let [a,x,y] of lines) {
      if (b[a] && b[a] === b[x] && b[a] === b[y]) return b[a];
    }
    return null;
  };

  const computerMove = (currentBoard) => {
    const empty = currentBoard
      .map((v,i)=> v===null?i:null)
      .filter(v=>v!==null);

    if (!empty.length) {
      setStatus("Match Draw 🤝");
      return;
    }

    const randomIndex = empty[Math.floor(Math.random()*empty.length)];
    const updated = [...currentBoard];
    updated[randomIndex] = "O";
    setBoard(updated);

    const winner = checkWinner(updated);

    if (winner) {
      setStatus("Computer wins 🤖");
      setIsPlayerTurn(false);
    } else {
      setStatus("Your turn ✨");
      setIsPlayerTurn(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      computerMove(Array(9).fill(null));
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = (i) => {
    if (!isPlayerTurn || board[i] || checkWinner(board)) return;

    const updated = [...board];
    updated[i] = "X";
    setBoard(updated);

    const winner = checkWinner(updated);

    if (winner) {
      setStatus("You win 🎉");

      // 🎉 CONFETTI
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 },
      });

      setIsPlayerTurn(false);
      return;
    }

    setStatus("Computer thinking...");
    setIsPlayerTurn(false);
    setTimeout(() => computerMove(updated), 600);
  };

  const resetGame = () => {
    const fresh = Array(9).fill(null);
    setBoard(fresh);
    setStatus("Computer starts...");
    setIsPlayerTurn(false);
    setTimeout(() => computerMove(fresh), 700);
  };

  const socialLinks = [
    { icon: <FaLinkedin className="text-blue-500 hover:text-blue-600" />, link: "https://www.linkedin.com/in/kavin-m-m-710520272/" },
    { icon: <FaInstagram className="text-pink-500 hover:text-pink-600" />, link: "https://www.instagram.com/ak_webflair_technologies/" },
    { icon: <FaGithub className="text-gray-800 dark:text-white hover:text-gray-500" />, link: "https://github.com/kavinmm-23EIR047/" },
    { icon: <FaWhatsapp className="text-green-500 hover:text-green-600" />, link: "https://wa.me/919600732162" },
  ];

  return (
    <section className="relative w-full flex items-center justify-center py-40 lg:py-44 bg-transparent">

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">

        {/* ✅ FIXED HEIGHT ALIGN */}
        <div className="grid lg:grid-cols-2 gap-10 items-center lg:min-h-[500px]">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full border border-sky-400/30 bg-sky-400/10 text-sky-500 text-xs w-fit">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Building AI SaaS Products
            </div>

            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              We Build{" "}
              <span className="bg-gradient-to-r from-sky-500 to-indigo-500 text-transparent bg-clip-text">
                Scalable Products
              </span>
            </h1>

            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-lg">
              We craft SaaS platforms, AI tools, and automation systems.
            </p>

           {/* Terminal */}
<div className="
  mt-5 rounded-2xl overflow-hidden border shadow-lg

  bg-gray-900 text-white border-gray-800   /* 🌞 Light mode → dark terminal */
  dark:bg-white dark:text-black dark:border-gray-200  /* 🌙 Dark mode → light terminal */

">

  {/* Top bar */}
  <div className="flex gap-2 px-4 py-2 bg-gray-800 dark:bg-gray-200">
    <span className="w-3 h-3 bg-red-400 rounded-full" />
    <span className="w-3 h-3 bg-yellow-400 rounded-full" />
    <span className="w-3 h-3 bg-green-400 rounded-full" />
  </div>

  {/* Content */}
  <div className="p-4 font-mono text-sm">
    <p className="text-green-400 dark:text-green-600">
      $ launching product...
    </p>

    <Typewriter
      words={[
        "Building SaaS platform...",
        "Designing UI...",
        "Integrating AI...",
      ]}
      loop
      cursor
    />
  </div>

</div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4 flex-wrap">
              <button className="px-6 py-3 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white">
                View Product
              </button>

              <button
                onClick={scrollToContact}
                className="px-6 py-3 rounded-full border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white hover:bg-white/10"
              >
                Get Started
              </button>
            </div>

            {/* Social */}
            <div className="mt-8 flex justify-center gap-6">
              {socialLinks.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-14 h-14 text-2xl rounded-2xl border border-sky-400/30 bg-white/80 dark:bg-white/10 backdrop-blur-md shadow-md hover:shadow-sky-500/20 transition duration-300 transform hover:scale-110"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT GAME */}
         <motion.div
  initial={{ opacity: 0, x: 40 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="flex justify-center lg:justify-end items-center h-full"
>
  <div className="w-full max-w-[360px] lg:max-w-[420px]">

    {/* 💻 LAPTOP FRAME */}
    <div className="relative p-[6px] rounded-[28px] bg-gradient-to-br from-sky-500/40 to-indigo-500/40 shadow-2xl">

      <div className="
        rounded-[24px]
        bg-gray-900 dark:bg-white
        p-2
      ">

        {/* 🔝 TOP BAR (LIKE MAC) */}
        <div className="flex items-center gap-2 px-3 py-2">
          <span className="w-3 h-3 bg-red-400 rounded-full" />
          <span className="w-3 h-3 bg-yellow-400 rounded-full" />
          <span className="w-3 h-3 bg-green-400 rounded-full" />
        </div>

        {/* 🎮 YOUR ORIGINAL GAME BOX */}
        <div className="rounded-2xl border p-5 shadow-xl bg-gray-900 text-white border-gray-800 dark:bg-white dark:text-black dark:border-gray-200">

          <div className="text-center mb-4 font-mono">
            <h3 className="text-lg font-bold">
              <span className="bg-gradient-to-r from-sky-400 to-indigo-400 text-transparent bg-clip-text">
                {"< Play_With_AI />"}
              </span>
            </h3>

            <p className="text-xs text-green-400 dark:text-green-600">
              $ {status}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {board.map((cell, i) => (
              <button
                key={i}
                onClick={() => handleClick(i)}
                className="h-20 sm:h-24 rounded-xl text-xl font-bold bg-white/10 text-white dark:bg-black/10 dark:text-black border border-white/10 dark:border-black/10 hover:scale-105 transition"
              >
                {cell}
              </button>
            ))}
          </div>

          <button
            onClick={resetGame}
            className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:opacity-90 transition"
          >
            Restart Game
          </button>
        </div>

      </div>
    </div>

  </div>
</motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;