'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export type UserInfo = {
  name?: string;
  email?: string;
  avatarUrl?: string;
};

export function Navbar({ user }: { user?: UserInfo }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const firstLetter =
    user?.name?.slice(0, 1)?.toUpperCase() ||
    user?.email?.slice(0, 1)?.toUpperCase() ||
    'U';

  return (
    <header
      ref={headerRef}
      className={`topbar ${scrolled ? 'scrolled' : ''}`}
    >
      <style jsx>{`
        .topbar {
          width: 100%;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 42px;
          box-sizing: border-box;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 9999;
          transition: padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
          background: #dbeafe;
          border: none;
          box-shadow: none;
        }

        .topbar.scrolled {
          padding-left: 24px;
          background: #dbeafe;
          border-bottom: 1px solid rgba(226, 232, 240, 0.5);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
        }

        .left-group {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 180px;
          transform: translateX(80px);
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .topbar.scrolled .left-group {
          transform: translateX(6px);
        }

        .brand-icon {
          width: 52.63px;
          height: 51.46px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .brand-text {
          font-size: 16px;
          font-weight: 700;
          color: #111827;
          letter-spacing: -0.02em;
          white-space: nowrap;
        }

        .right-group {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-left: auto;
          margin-right: 0px;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }

        .topbar.scrolled .right-group {
          opacity: 0;
          transform: translateX(44px);
          pointer-events: none;
        }

        .search-wrap {
          width: 349.32px;
          height: 53px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          background: #ffffff;
          border: 1px solid rgba(226, 232, 240, 0.8);
          border-radius: 9.64px;
          padding: 19.27px 28.91px;
          box-sizing: border-box;
        }

        .search-icon {
          width: 16.06px;
          height: 16.06px;
          flex-shrink: 0;
          color: #64748b;
        }

        .search-input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-family: Roboto, sans-serif;
          font-weight: 400;
          font-size: 16.86px;
          line-height: 28.91px;
          color: #0f172a;
        }

        .search-input::placeholder {
          color: #94a3b8;
          font-family: Roboto, sans-serif;
          font-weight: 400;
          font-size: 16.86px;
          line-height: 28.91px;
        }

        .bell-btn {
          width: 26px;
          height: 29px;
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          padding: 0;
          flex-shrink: 0;
        }

        .bell-icon {
          width: 26px;
          height: 29px;
          color: #111827;
        }

        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 16px;
          overflow: hidden;
          background: linear-gradient(135deg, #cbd5e1, #94a3b8);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f172a;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          flex-shrink: 0;
        }

        @media (max-width: 768px) {
          .topbar {
            padding: 0 16px;
          }

          .topbar.scrolled {
            padding-left: 12px;
          }

          .left-group {
            transform: translateX(6px);
          }

          .topbar.scrolled .left-group {
            transform: translateX(2px);
          }

          .brand-text {
            font-size: 15px;
          }

          .search-wrap {
            width: 220px;
            height: 48px;
            padding: 0 18px;
          }

          .right-group {
            margin-right: 10px;
          }

          .avatar {
            width: 42px;
            height: 42px;
          }

          .bell-icon {
            width: 22px;
            height: 22px;
          }
        }

        @media (max-width: 560px) {
          .search-wrap {
            display: none;
          }
        }
      `}</style>

      <div className="left-group">
        <Image
          src="/images/logo.png"
          alt="360Airo"
          width={52.63}
          height={51.46}
          className="brand-icon"
        />
        <span className="brand-text">360Airo</span>
      </div>

      <div className="right-group">
        <div className="search-wrap">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L16.65 16.65"
              stroke="currentColor"
              strokeWidth="1.81"
              strokeLinecap="round"
            />
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="1.81"
            />
          </svg>
          <input
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
        </div>

        <button
          className="bell-btn"
          type="button"
          aria-label="Notifications"
          onClick={() => router.push('/notifications')}
        >
          <svg className="bell-icon" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 17H9m8-4V11a5 5 0 0 0-10 0v2l-2 3h14l-2-3z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 19a2 2 0 0 0 4 0"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <div
          className="avatar"
          onClick={() => router.push('/profile')}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              router.push('/profile');
            }
          }}
          role="button"
          tabIndex={0}
        >
          {user?.avatarUrl ? (
            <Image
              src={user.avatarUrl}
              alt={user.name || 'User'}
              width={50}
              height={50}
              style={{
                width: '50px',
                height: '50px',
                borderRadius: '16px',
                objectFit: 'cover',
              }}
            />
          ) : (
            <span>{firstLetter}</span>
          )}
        </div>
      </div>
    </header>
  );
}