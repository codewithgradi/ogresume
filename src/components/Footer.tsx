import Link from "next/link";
import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-12">
      <div className="max-w-4xl mx-auto text-center space-y-2">
        <p className="text-sm text-gray-600">Developed by a developer for the community</p>
        <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} All Rights Reserved</p>
        <div className="flex justify-center gap-4 mt-2">
          <Link
            href="https://www.linkedin.com/in/gradi-puata/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors text-xl"
          >
            <FaLinkedin />
          </Link>
          <Link
            href="https://github.com/codewithgradi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900 transition-colors text-xl"
          >
            <FaGithub />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
