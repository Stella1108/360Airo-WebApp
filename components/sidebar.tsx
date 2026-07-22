'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const NAVY_BLUE = '#2C2C2E';
const ACTIVE_COLOR = '#4b87F7';

const SECTIONS = [
  {
    id: 'overview',
    label: 'Dashboard',
    path: '/dashboard',
    iconSrc: '/images/home-icon.png',
  },
  {
    id: 'campaigns',
    label: 'Campaigns',
    path: '/campaign',
    iconSrc: '/images/Campagin-icon.png',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    path: '/linkedin-outreach',
    iconSrc: '/images/linkedin-icon.png',
  },
  {
    id: 'inbox',
    label: 'Inbox',
    path: '/unified-mailbox',
    iconSrc: '/images/inbox-icon.png',
  },
  {
    id: 'data',
    label: 'Data',
    path: '/email-list',
    iconSrc: '/images/data-icon.png',
  },
  {
    id: 'calendar',
    label: 'Calendar',
    path: '/calendar',
    iconSrc: '/images/calender-icon.png',
  },
  {
    id: 'account',
    label: 'Accounts',
    path: '/email-accounts',
    iconSrc: '/images/accounts-icon.png',
  },
  {
    id: 'automation',
    label: 'Airo Intelligence',
    path: '/ai-automation',
    iconSrc: '/images/intellegence-icon.png',
  },
];

export function CompactSidebar({
  children,
  activeTab,
  onTabChangeAction,
}: {
  children: React.ReactNode;
  activeTab?: string;
  onTabChangeAction?: (tab: string) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const activeSectionId = useMemo(() => {
    if (pathname.startsWith('/dashboard')) return 'overview';
    if (pathname.startsWith('/campaign') || pathname.startsWith('/calls'))
      return 'campaigns';
    if (pathname.startsWith('/linkedin')) return 'linkedin';
    if (pathname.startsWith('/unified-mailbox') || pathname.startsWith('/inbox'))
      return 'inbox';
    if (
      pathname.startsWith('/email-list') ||
      pathname.startsWith('/template-library') ||
      pathname.startsWith('/warmup')
    )
      return 'data';
    if (pathname.startsWith('/calendar')) return 'calendar';
    if (pathname.startsWith('/email-accounts')) return 'account';
    if (
      pathname.startsWith('/ai-automation') ||
      pathname.startsWith('/pipeline')
    )
      return 'automation';
    return 'overview';
  }, [pathname]);

  const sidebarWidth = isHovered ? 180 : 64;
  const gap = 10;
  const spacing = 2;
  const sidebarLeft = isHovered ? gap : 0;

  const contentLeft = isHovered ? 138 : 66;
  const borderRadius = isHovered ? '30px' : '8px 28px 28px 8px';

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-blue-100 to-white">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html, body {
              margin: 0;
              padding: 0;
              overflow-x: hidden;
            }

            .sidebar-shell {
              position: fixed;
              left: ${sidebarLeft}px;
              top: 50%;
              transform: translateY(-50%);
              z-index: 40;
              height: 50vh;
              width: ${sidebarWidth}px;
              border: 1px solid rgba(226, 232, 240, 0.7);
              background: rgba(255,255,255,0.95);
              box-shadow: 0 20px 50px rgba(15,23,42,0.12);
              backdrop-filter: blur(18px);
              overflow: hidden;
              display: flex;
              flex-direction: column;
              transition: width 0.25s ease, left 0.25s ease, border-radius 0.25s ease;
              box-sizing: border-box;
            }

            .content-shell {
              margin-left: ${contentLeft}px;
              width: calc(100% - ${contentLeft}px);
              transition: margin-left 0.25s ease, width 0.25s ease;
              min-height: 100vh;
              box-sizing: border-box;
            }

            .nav {
              display: flex;
              flex-direction: column;
              height: 100%;
              overflow: hidden;
            }

            .nav-section {
              display: flex;
              flex-direction: column;
              padding-top: 2px;
            }

            .nav-item {
              width: 100%;
              display: flex;
              align-items: center;
              gap: 12px;
              padding: 7px 10px 7px 12px;
              border: none;
              background: transparent;
              cursor: pointer;
              transition: background-color 0.2s ease;
              justify-content: flex-start;
              min-height: 34px;
            }

            .nav-item:hover {
              background-color: rgba(148, 163, 184, 0.10);
            }

            .nav-item-icon {
              width: 28px;
              min-width: 28px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-shrink: 0;
              color: ${NAVY_BLUE};
            }

            .nav-item-label {
              font-size: 0.875rem;
              transition: all 0.2s ease;
              white-space: nowrap;
              overflow: hidden;
            }

            .text-hidden {
              opacity: 0;
              transform: translateX(-10px);
              width: 0;
            }

            .text-visible {
              opacity: 1;
              transform: translateX(0);
              width: auto;
            }

            .divider {
              margin: 2px 12px;
              height: 1px;
              background-color: rgba(148, 163, 184, 0.5);
            }

            .footer-row {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 4px 10px 4px 12px;
              min-height: 30px;
            }

            .credits-text {
              font-size: 0.875rem;
              color: ${NAVY_BLUE};
              white-space: nowrap;
              overflow: hidden;
            }

            .help-row {
              display: flex;
              align-items: center;
              gap: 10px;
              padding: 4px 10px 6px 12px;
              cursor: pointer;
              transition: background-color 0.2s ease;
              border: none;
              background: transparent;
              width: 100%;
              text-align: left;
              min-height: 30px;
            }

            .help-row:hover {
              background-color: rgba(148, 163, 184, 0.10);
            }

            .help-icon {
              width: 20px;
              height: 20px;
              border-radius: 999px;
              border: 1px solid rgba(148, 163, 184, 0.7);
              display: flex;
              align-items: center;
              justify-content: center;
              color: ${NAVY_BLUE};
              font-size: 0.75rem;
              flex-shrink: 0;
            }

            .help-label {
              font-size: 0.875rem;
              color: ${NAVY_BLUE};
              white-space: nowrap;
              overflow: hidden;
            }

            .bottom-block {
              margin-top: auto;
              padding-bottom: 4px;
              display: flex;
              flex-direction: column;
              gap: 0;
            }
          `,
        }}
      />

      <aside
        className="sidebar-shell"
        style={{ borderRadius }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <nav className="nav">
          <div className="nav-section">
            {SECTIONS.map((sec) => {
              const isActive = activeTab
                ? activeTab === sec.id
                : activeSectionId === sec.id;

              const iconSize =
                sec.id === 'overview' || sec.id === 'automation' ? 21 : 18;

              return (
                <button
                  key={sec.id}
                  className="nav-item"
                  onClick={() => {
                    router.push(sec.path);
                    onTabChangeAction?.(sec.id);
                  }}
                  title={sec.label}
                  type="button"
                >
                  <span className="nav-item-icon">
                    <Image
                      src={sec.iconSrc}
                      alt={sec.label}
                      width={iconSize}
                      height={iconSize}
                      style={{
                        filter: isActive
                          ? 'brightness(0) saturate(100%) invert(46%) sepia(86%) saturate(604%) hue-rotate(201deg) brightness(98%) contrast(93%)'
                          : 'brightness(0) saturate(100%)',
                      }}
                    />
                  </span>

                  <span
                    className={`nav-item-label ${
                      isHovered ? 'text-visible' : 'text-hidden'
                    }`}
                    style={{
                      color: isActive ? ACTIVE_COLOR : NAVY_BLUE,
                    }}
                  >
                    {sec.label}
                  </span>
                </button>
              );
            })}

            <div className="divider" />
          </div>

          <div className="bottom-block">
            <div className="footer-row">
              <span className="nav-item-icon">
                <Image
                  src="/images/data-icon.png"
                  alt="Data"
                  width={18}
                  height={18}
                  style={{ filter: 'brightness(0) saturate(100%)' }}
                />
              </span>
              <span
                className={`credits-text ${
                  isHovered ? 'text-visible' : 'text-hidden'
                }`}
              >
                243 credits
              </span>
            </div>

            <button
              className="help-row"
              type="button"
              onClick={() => router.push('/help')}
            >
              <div className="help-icon">?</div>
              <span
                className={`help-label ${
                  isHovered ? 'text-visible' : 'text-hidden'
                }`}
              >
                Help
              </span>
            </button>
          </div>
        </nav>
      </aside>

      <main className="content-shell">{children}</main>
    </div>
  );
}