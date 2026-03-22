'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 导航栏 */}
      <nav className="navbar">
        <div className="nav-left">
          <Link href="/" className="nav-logo">
            Justtalk
          </Link>
          <div className="nav-links">
            <Link href="/chat" className="nav-link">
              chat
            </Link>
            <Link href="/record" className="nav-link">
              record
            </Link>
          </div>
        </div>
        <div className="nav-moons">
          <div className="moon-icon moon-1"></div>
          <div className="moon-icon moon-2"></div>
          <div className="moon-icon moon-3"></div>
          <div className="moon-icon moon-4"></div>
          <div className="moon-icon moon-5"></div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <div className="hero-text animate-fade-in">
            <h1>
              Just talk
              <br />
              with us APP
            </h1>
            <p className="subtitle">
              Be true to yourself.
              <br />
              Don&apos;t push so hard on yourself
            </p>
            <Link href="/chat" className="cta-button">
              Play it right now
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="hero-visual animate-fade-in">
            <div className="planet"></div>
          </div>
        </div>
      </section>

      {/* Mailer Section */}
      <section className="mailer-section">
        {/* 手绘爱心装饰 */}
        <svg className="hand-drawn-heart heart-left" viewBox="0 0 40 40" fill="none">
          <path
            d="M20 35C20 35 5 25 5 15C5 10 10 5 15 5C17.5 5 20 7.5 20 10C20 7.5 22.5 5 25 5C30 5 35 10 35 15C35 25 20 35 20 35Z"
            stroke="#FFD700"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <svg className="hand-drawn-heart heart-right" viewBox="0 0 40 40" fill="none">
          <path
            d="M20 35C20 35 5 25 5 15C5 10 10 5 15 5C17.5 5 20 7.5 20 10C20 7.5 22.5 5 25 5C30 5 35 10 35 15C35 25 20 35 20 35Z"
            stroke="#FFD700"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <h2 className="mailer-title">
          MAiLER
          {/* 紫色爱心 */}
          <svg
            style={{
              position: 'absolute',
              right: '-30px',
              top: '-10px',
              width: '24px',
              height: '24px',
            }}
            viewBox="0 0 24 24"
            fill="#9B59B6"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </h2>
        <p className="mailer-description">
          Keep up to date with all people, We are with you.
        </p>
        <button className="outline-button">
          Sign up
          <ArrowRight size={20} />
        </button>

        {/* 手绘花朵装饰 */}
        <svg className="flower-decoration" viewBox="0 0 80 80" fill="none">
          {/* 花瓣 */}
          <ellipse cx="40" cy="20" rx="8" ry="15" fill="#FF6B6B" />
          <ellipse cx="60" cy="30" rx="8" ry="15" fill="#4ECDC4" transform="rotate(45 60 30)" />
          <ellipse cx="60" cy="50" rx="8" ry="15" fill="#45B7D1" transform="rotate(90 60 50)" />
          <ellipse cx="40" cy="60" rx="8" ry="15" fill="#96CEB4" transform="rotate(135 40 60)" />
          <ellipse cx="20" cy="50" rx="8" ry="15" fill="#FFEAA7" transform="rotate(180 20 50)" />
          <ellipse cx="20" cy="30" rx="8" ry="15" fill="#DDA0DD" transform="rotate(225 20 30)" />
          <ellipse cx="30" cy="15" rx="8" ry="15" fill="#98D8C8" transform="rotate(270 30 15)" />
          <ellipse cx="50" cy="15" rx="8" ry="15" fill="#F7DC6F" transform="rotate(315 50 15)" />
          {/* 花心 */}
          <circle cx="40" cy="40" r="10" fill="#FFD93D" />
          {/* 叶子 */}
          <path
            d="M40 70 Q30 85 20 90"
            stroke="#2ECC71"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M40 70 Q50 85 60 90"
            stroke="#2ECC71"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-links">
          <Link href="/privacy" className="footer-link">
            PRIVACY POLICY
          </Link>
          <Link href="/terms" className="footer-link">
            TERMS & CONDITIONS
          </Link>
          <Link href="/cookies" className="footer-link">
            COOKIES POLICY
          </Link>
          <Link href="/cookies-settings" className="footer-link">
            COOKIES SETTINGS
          </Link>
        </div>
        <div className="copyright">
          © just talk BY elijah xr
        </div>
      </footer>
    </main>
  );
}
