'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from "next/image";
import {
  Mail,
  TrendingUp,
  Users,
  Eye,
  MousePointer,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  MoreHorizontal,
  Bell,
  Search,
  Filter,
  Download,
  Play,
  Clock,
  CheckCircle,
  Edit3,
  User,
  LogOut,
  HelpCircle,
  CreditCard,
  Shield,
  ChevronDown,
  Sparkles,
  Rocket,
  BarChart4,
  Users2,
  FileText,
  Briefcase,
  PieChart,
  Activity,
  Zap,
  Calendar,
  DollarSign,
  Share2,
  RefreshCw,
  TrendingDown,
  UserPlus,
  UserMinus,
  Link2,
  X,
  Linkedin,
  MessageCircle,
  Phone,
  Inbox,
  AlertCircle,
  ThumbsDown,
  Award,
  Hash,
  Loader2,
  MoveRight,
} from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { CompactSidebar } from '@/components/sidebar';

// ================================================================
// 1. SMOOTH SPLINE CHART COMPONENT (with axis labels)
// ================================================================

function catmullRomToBezier(points: { x: number; y: number }[]) {
  if (points.length < 2) return '';
  if (points.length === 2) {
    return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;
  }

  const result: string[] = [];
  const n = points.length;

  result.push(`M ${points[0].x} ${points[0].y}`);

  for (let i = 0; i < n - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(n - 1, i + 2)];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    result.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`);
  }

  return result.join(' ');
}

const CampaignChart = ({ data }: { data: any[] }) => {
  const [activePoint, setActivePoint] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <p>No chart data available</p>
      </div>
    );
  }

  const chartData = data.slice(0, 8);
  while (chartData.length < 8) {
    chartData.push({ label: '0', value: 140 });
  }

  const yTicks = [140, 180, 220, 260];
  const minY = 130;
  const maxY = 270;
  const xLabels = ['5', '2', '2', '3', '5', '0', '5', '0'];

  const padding = { top: 8, bottom: 18, left: 24, right: 8 };
  const plotWidth = 100 - padding.left - padding.right;
  const plotHeight = 90 - padding.top - padding.bottom;

  const points = chartData.map((d, i) => {
    const x = padding.left + (i / (chartData.length - 1)) * plotWidth;
    const y = padding.top + plotHeight - ((d.value - minY) / (maxY - minY)) * plotHeight;
    return { x, y, label: d.label, value: d.value };
  });

  const pathData = catmullRomToBezier(points);
  const areaPoints = points.map(p => `${p.x},${p.y}`).join(' ');
  const fillPolygon = `M ${points[0].x} ${padding.top + plotHeight} L ${areaPoints} L ${points[points.length - 1].x} ${padding.top + plotHeight} Z`;

  return (
    <div className="relative w-full h-full">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {yTicks.map((tick, idx) => {
          const yPos = padding.top + plotHeight - ((tick - minY) / (maxY - minY)) * plotHeight;
          return (
            <g key={`grid-${idx}`}>
              <line
                x1={padding.left}
                y1={yPos}
                x2={100 - padding.right}
                y2={yPos}
                stroke="#4a4a4c"
                strokeWidth="0.3"
                strokeDasharray="2,2"
              />
              <text
                x={padding.left - 2}
                y={yPos - 1}
                fill="#8E8E93"
                fontSize="4.5"
                fontWeight="600"
                textAnchor="end"
                dominantBaseline="auto"
              >
                {tick}M
              </text>
            </g>
          );
        })}

        <polygon points={fillPolygon} fill="url(#chartGradientDark)" opacity="0.35" />

        <path
          d={pathData}
          stroke="#60a5fa"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={activePoint === i ? 3 : 1.8}
            fill={activePoint === i ? '#3b82f6' : '#60a5fa'}
            stroke="#2C2C2E"
            strokeWidth="0.8"
            onMouseEnter={() => setActivePoint(i)}
            onMouseLeave={() => setActivePoint(null)}
            style={{ cursor: 'pointer' }}
          />
        ))}

        <defs>
          <linearGradient id="chartGradientDark" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[8px] text-gray-400 px-2">
        {xLabels.map((label, i) => (
          <span key={i} style={{ width: `${100 / xLabels.length}%`, textAlign: 'center' }}>
            {label}
          </span>
        ))}
      </div>

      {activePoint !== null && points[activePoint] && (
        <div
          className="absolute bg-gray-800 text-white text-[9px] px-2 py-1 rounded shadow-lg pointer-events-none"
          style={{
            left: `${points[activePoint].x}%`,
            top: `${points[activePoint].y - 4}%`,
            transform: 'translate(-50%, -100%)',
          }}
        >
          {points[activePoint].label}: {points[activePoint].value}
        </div>
      )}
    </div>
  );
};

// ================================================================
// 2. BAR CHART COMPONENT FOR EMAIL ACTIVITY
// ================================================================

const EmailActivityBarChart = ({ data }: { data: { label: string; value: number }[] }) => {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-400">No data</div>;
  }

  const maxValue = Math.max(...data.map(d => d.value), 30);
  const yTicks = [30, 20, 10, 0];

  const padding = { top: 6, bottom: 16, left: 12, right: 4 };
  const plotWidth = 100 - padding.left - padding.right;
  const plotHeight = 90 - padding.top - padding.bottom;

  const barWidth = plotWidth / data.length * 0.5;
  const categoryWidth = plotWidth / data.length;

  return (
    <div className="relative w-full h-full">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {yTicks.map((tick, idx) => {
          const yPos = padding.top + plotHeight - ((tick - 0) / (maxValue - 0)) * plotHeight;
          return (
            <g key={`grid-${idx}`}>
              <line
                x1={padding.left}
                y1={yPos}
                x2={100 - padding.right}
                y2={yPos}
                stroke="#e5e7eb"
                strokeWidth="0.3"
                strokeDasharray="2,2"
              />
              <text
                x={padding.left - 2}
                y={yPos - 1}
                fill="#6b7280"
                fontSize="4.5"
                fontWeight="600"
                textAnchor="end"
                dominantBaseline="auto"
              >
                {tick}M
              </text>
            </g>
          );
        })}

        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * plotHeight;
          const x = padding.left + index * categoryWidth + (categoryWidth - barWidth) / 2;
          const y = padding.top + plotHeight - barHeight;
          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="#3b82f6"
              rx="1.5"
            />
          );
        })}

        {data.map((item, index) => {
          const x = padding.left + index * categoryWidth + categoryWidth / 2;
          return (
            <text
              key={`label-${index}`}
              x={x}
              y={100 - padding.bottom + 8}
              fill="#6b7280"
              fontSize="3.5"
              fontWeight="500"
              textAnchor="middle"
              dominantBaseline="hanging"
            >
              {item.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

// ================================================================
// 3. ANIMATED STAT CARD
// ================================================================

const AnimatedStatCard = ({
  value,
  suffix,
  title,
  delay,
  bgImage,
}: {
  value: string | number;
  suffix?: string;
  title: string;
  delay: number;
  bgImage: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="relative overflow-hidden rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 group cursor-default"
      style={{
        width: '190px',
        height: '94px',
        borderRadius: '24px',
        minHeight: '94px',
      }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
        }}
        animate={{
          x: [0, -8, 0],
          scale: [1, 1.03, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <div className="relative z-10 p-4 h-full flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-end justify-center gap-1">
            <span className="text-[32px] font-bold text-white drop-shadow-lg leading-tight">
              {value}
            </span>
            {suffix && (
              <span className="text-[15px] font-semibold text-white/90 drop-shadow">
                {suffix}
              </span>
            )}
          </div>
          <span className="text-[15px] font-medium text-white drop-shadow mt-0.5">
            {title}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ================================================================
// 4. MAIN DASHBOARD COMPONENT (no Supabase) - FIXED
// ================================================================

export default function Dashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');
  const mainRef = useRef<HTMLDivElement>(null);

  // Static user data (replaces Supabase auth)
  const user = {
    id: 'mock-user-id',
    email: 'user@example.com',
    name: 'John Doe',
  };

  // Optional scroll state – not passed to Navbar
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;
    const handleScroll = () => {
      setIsScrolled(mainElement.scrollTop > 24);
    };
    mainElement.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => mainElement.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <CompactSidebar activeTab={activeTab} onTabChangeAction={setActiveTab}>
        <div className="flex flex-col h-full">
          <Navbar user={user} />
          <div ref={mainRef} className="flex-1 overflow-auto p-0 pt-5">
            <ComprehensiveDashboard userName={user.name} />
          </div>
        </div>
      </CompactSidebar>
    </div>
  );
}

// ================================================================
// 5. COMPREHENSIVE DASHBOARD (with static mock data)
// ================================================================

const ComprehensiveDashboard = ({ userName }: { userName: string }) => {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('30d');
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isLoadingCampaigns, setIsLoadingCampaigns] = useState(true);
  const [showTemplatesModal, setShowTemplatesModal] = useState(false);
  const [templateType, setTemplateType] = useState<'email' | 'linkedin'>('email');
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // --- Static mock stats ---
  const [stats, setStats] = useState({
    totalCampaigns: 24,
    totalRecipients: 15420,
    avgOpenRate: 42.8,
    avgClickRate: 12.3,
    totalDelivered: 14300,
    avgBounceRate: 2.1,
    totalSent: 15200,
    totalBounced: 320,
    totalOpens: 6500,
    totalClicks: 1870,
    emailCampaigns: 15,
    linkedinCampaigns: 5,
    smsCampaigns: 4,
    activeCampaigns: 8,
  });

  const [filteredChartData, setFilteredChartData] = useState<{ label: string; value: number }[]>([]);
  const [repliesReceived, setRepliesReceived] = useState(312);
  const [meetingsBooked, setMeetingsBooked] = useState(78);

  // --- Mock campaigns data ---
  const mockCampaigns = [
    {
      id: '1',
      name: 'Q1 Product Launch',
      description: 'Email sequence for new product launch',
      campaign_type: 'email',
      status: 'completed',
      total_recipients: 1250,
      emails_sent: 1200,
      opens_count: 480,
      emails_clicked: 150,
      created_at: '2025-01-15T10:00:00Z',
      settings: {},
    },
    {
      id: '2',
      name: 'LinkedIn Outreach May',
      description: 'Automated LinkedIn messages',
      campaign_type: 'linkedin',
      status: 'running',
      total_recipients: 450,
      emails_sent: 380,
      opens_count: 210,
      emails_clicked: 45,
      created_at: '2025-02-01T08:30:00Z',
      settings: {},
    },
    {
      id: '3',
      name: 'Newsletter - April',
      description: 'Monthly newsletter',
      campaign_type: 'email',
      status: 'scheduled',
      total_recipients: 3200,
      emails_sent: 0,
      opens_count: 0,
      emails_clicked: 0,
      created_at: '2025-03-20T14:00:00Z',
      settings: {},
    },
    {
      id: '4',
      name: 'SMS Promo Flash',
      description: 'SMS campaign for flash sale',
      campaign_type: 'sms',
      status: 'completed',
      total_recipients: 850,
      emails_sent: 820,
      opens_count: 600,
      emails_clicked: 230,
      created_at: '2025-02-28T09:15:00Z',
      settings: {},
    },
    {
      id: '5',
      name: 'Airo Intelligence Workflow',
      description: 'AI automated follow-ups',
      campaign_type: 'ai-personalized',
      status: 'running',
      total_recipients: 210,
      emails_sent: 180,
      opens_count: 95,
      emails_clicked: 22,
      created_at: '2025-03-01T11:00:00Z',
      settings: { is_workflow_campaign: true },
    },
  ];

  // --- Generate chart data based on timeRange ---
  const generateFixedChartData = (range: string) => {
    const labels = ['5', '2', '2', '3', '5', '0', '5', '0'];
    const baseValues = [220, 195, 210, 240, 205, 185, 230, 200];
    const multiplier = range === '7d' ? 0.9 : range === '30d' ? 1.0 : 1.1;
    return labels.map((label, i) => ({
      label,
      value: Math.round(baseValues[i] * multiplier),
    }));
  };

  // --- Simulate loading data ---
  useEffect(() => {
    setIsLoadingCampaigns(true);
    const timer = setTimeout(() => {
      setCampaigns(mockCampaigns);
      setStats({
        totalCampaigns: 24,
        totalRecipients: 15420,
        avgOpenRate: 42.8,
        avgClickRate: 12.3,
        totalDelivered: 14300,
        avgBounceRate: 2.1,
        totalSent: 15200,
        totalBounced: 320,
        totalOpens: 6500,
        totalClicks: 1870,
        emailCampaigns: 15,
        linkedinCampaigns: 5,
        smsCampaigns: 4,
        activeCampaigns: 8,
      });
      setRepliesReceived(312);
      setMeetingsBooked(78);
      setIsLoadingCampaigns(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const newData = generateFixedChartData(timeRange);
    setFilteredChartData(newData);
  }, [timeRange]);

  // --- Helpers ---
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getCategoryIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case 'ai-personalized': return Sparkles;
      case 'manual': return Mail;
      case 'email': return Mail;
      case 'linkedin': return Linkedin;
      case 'sms': return MessageCircle;
      default: return Mail;
    }
  };

  const calculateMetrics = (campaign: any) => {
    const uniqueOpens = Number.isFinite(campaign.opens_count) ? campaign.opens_count : 0;
    const uniqueClicks = Number.isFinite(campaign.emails_clicked) ? campaign.emails_clicked : 0;
    const openRate = campaign.emails_sent > 0
      ? ((uniqueOpens / campaign.emails_sent) * 100).toFixed(1)
      : '0.0';
    const clickRate = campaign.emails_sent > 0
      ? ((uniqueClicks / campaign.emails_sent) * 100).toFixed(1)
      : '0.0';
    return { openRate, clickRate };
  };

  const isWorkflowCampaign = (campaign: any) => {
    const settings = campaign?.settings;
    return Boolean(
      settings &&
      typeof settings === 'object' &&
      (
        settings.is_workflow_campaign === true ||
        settings.workflow_campaign === true ||
        settings.source === 'automation_workflow' ||
        settings.workflow_id
      )
    );
  };

  // --- Main stats for cards ---
  const mainStats = [
    { title: 'Total Campaigns', value: stats.totalCampaigns, suffix: '', bgImage: '/images/1.png' },
    { title: 'Open rate', value: stats.avgOpenRate.toFixed(0), suffix: '%', bgImage: '/images/2.png' },
    { title: 'Click rate', value: stats.avgClickRate.toFixed(0), suffix: '%', bgImage: '/images/3.png' },
    { title: 'Replies received', value: repliesReceived, suffix: '', bgImage: '/images/4.png' },
    { title: 'Meetings Booked', value: meetingsBooked, suffix: '', bgImage: '/images/5.png' },
    { title: 'Active Accounts', value: stats.activeCampaigns || stats.totalCampaigns, suffix: '', bgImage: '/images/6.png' },
  ];

  const healthMetrics = [
    { label: 'Inbox Rate', value: stats.totalDelivered.toLocaleString(), suffix: 'landed', color: '#22d3ee' },
    { label: 'Bounce Rate', value: stats.totalBounced.toLocaleString(), suffix: 'bounced', color: '#2f6f75' },
    { label: 'Spam', value: Math.round(stats.totalBounced * 0.4).toLocaleString(), suffix: 'wasted', color: '#245a60' },
  ];

  const quickActions = [
    { title: 'Create Campaign', icon: Sparkles, color: 'bg-blue-600', description: 'Design stunning email campaigns', badge: 'Popular', route: '/campaign/create' },
    { title: 'Import Contacts', icon: UserPlus, color: 'bg-purple-600', description: 'Add new subscribers easily', badge: null, route: '/email-list/upload' },
    { title: 'View Analytics', icon: BarChart4, color: 'bg-emerald-600', description: 'Track performance metrics', badge: null, route: '/analytics' },
    { title: 'Browse Templates', icon: FileText, color: 'bg-amber-600', description: 'Professional email templates', badge: 'New', route: '/templates' },
    { title: 'Segment Lists', icon: Filter, color: 'bg-indigo-600', description: 'Target specific audiences', badge: null, route: '/email-list' },
    { title: 'Email Accounts', icon: Activity, color: 'bg-pink-600', description: 'Manage sender accounts', badge: 'Pro', route: '/email-accounts' },
  ];

  // ================================================================
  // 5.1 RENDER – FULL JSX (unchanged from your original)
  // ================================================================
  return (
    <div className="space-y-7 pb-6 pt-5">
      <>
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
          .dashboard-hero-title {
            width: 836px;
            height: 119px;
            opacity: 1;
            font-family: 'Outfit', sans-serif;
            font-weight: 665;
            font-size: 40px;
            line-height: 100%;
            letter-spacing: 0;
            color: #1e2b4d;
          }
        `}</style>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <h1 className="dashboard-hero-title">
            {userName}!! Seems like your campaigns are doing well with{' '}
            <span className="dashboard-hero-title">
              {stats.avgOpenRate.toFixed(0)}% open rate
            </span>
          </h1>
        </motion.div>
      </>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
      >
        {mainStats.map((stat, idx) => (
          <AnimatedStatCard
            key={stat.title}
            value={stat.value}
            suffix={stat.suffix}
            title={stat.title}
            bgImage={stat.bgImage}
            delay={0.1 + idx * 0.05}
          />
        ))}
      </motion.div>

      {/* FULL WIDTH HEALTH BLOCK WITH PROVISIONS MONTH SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="lg:col-span-3 bg-[#2C2C2E] rounded-[28px] border border-[#3D3D40] shadow-[0_0_0_1px_rgba(59,130,246,0.18)] p-5 text-white overflow-hidden"
        >
          <div className="grid grid-cols-1 xl:grid-cols-[1.05fr_1fr] gap-6">
            {/* Left side */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 items-center">
                <div className="bg-[#262628] rounded-3xl border border-[#3A3A3D] p-5 flex items-center justify-center min-h-[260px]">
                  <div className="relative w-[240px] h-[240px]">
                    <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                      <circle cx="100" cy="100" r="74" fill="none" stroke="#2f2f33" strokeWidth="18" />
                      <circle
                        cx="100"
                        cy="100"
                        r="74"
                        fill="none"
                        stroke="#14c7d6"
                        strokeWidth="18"
                        strokeLinecap="round"
                        strokeDasharray="250 465"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="74"
                        fill="none"
                        stroke="#206f75"
                        strokeWidth="18"
                        strokeLinecap="round"
                        strokeDasharray="80 465"
                        strokeDashoffset="-275"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="text-4xl font-extrabold tracking-tight">
                        {stats.totalRecipients.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400 mt-1">Total Recipients</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-5">
                  {healthMetrics.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className="w-8 h-1.5 rounded-full mt-2"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <div className="text-sm text-gray-400">{item.label}</div>
                        <div className="text-white font-semibold mt-1">
                          {item.value}{" "}
                          <span className="text-gray-400 font-medium">{item.suffix}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#262628] rounded-3xl border border-[#3A3A3D] p-5">
                <div>
                  <div className="text-4xl font-extrabold text-white">
                    {stats.totalSent.toLocaleString()}
                  </div>
                  <div className="text-gray-400 mt-1">Total Sent</div>
                </div>

                <div className="space-y-3 mt-5">
                  <div className="h-4 rounded-full bg-[#275960] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#20c6d1]"
                      style={{
                        width: `${Math.max(
                          12,
                          Math.min(
                            100,
                            stats.totalSent > 0
                              ? (stats.totalDelivered / Math.max(stats.totalSent, 1)) * 100
                              : 12
                          )
                        )}%`,
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="w-8 h-1.5 rounded-full bg-[#20c6d1]" />
                        <span>Sent</span>
                      </div>
                      <div className="text-white font-semibold mt-2">
                        {stats.totalSent.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="w-8 h-1.5 rounded-full bg-[#275960]" />
                        <span>Remaining</span>
                      </div>
                      <div className="text-white font-semibold mt-2">
                        {Math.max(stats.totalRecipients - stats.totalSent, 0).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Provisions Month with SMOOTH CHART */}
            <div className="space-y-5">
              <div className="bg-[#262628] rounded-2xl border border-[#3A3A3D] p-4 text-white overflow-hidden">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-cyan-400">Provisions Month</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Last {timeRange === '7d' ? '7 days' : timeRange === '30d' ? '30 days' : '90 days'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="px-3 py-1.5 bg-[#303034] border border-[#404044] rounded-lg text-xs font-medium text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    >
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                    </select>
                    <div className="w-8 h-8 rounded-lg border border-[#404044] bg-[#303034] flex items-center justify-center">
                      <MoreHorizontal className="w-4 h-4 text-cyan-400" />
                    </div>
                  </div>
                </div>

                <div className="relative h-[210px] w-full rounded-2xl bg-[#2A2A2D] border border-[#3A3A3D] overflow-hidden p-4">
                  <svg
                    viewBox="0 0 700 210"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <line x1="90" y1="20" x2="670" y2="20" stroke="#3b3b40" strokeDasharray="8 8" />
                    <line x1="90" y1="65" x2="670" y2="65" stroke="#3b3b40" strokeDasharray="8 8" />
                    <line x1="90" y1="110" x2="670" y2="110" stroke="#3b3b40" strokeDasharray="8 8" />
                    <line x1="90" y1="155" x2="670" y2="155" stroke="#3b3b40" strokeDasharray="8 8" />

                    <text x="10" y="25" fill="#9ca3af" fontSize="16" fontWeight="600">260M</text>
                    <text x="10" y="70" fill="#9ca3af" fontSize="16" fontWeight="600">220M</text>
                    <text x="10" y="115" fill="#9ca3af" fontSize="16" fontWeight="600">180M</text>
                    <text x="10" y="160" fill="#9ca3af" fontSize="16" fontWeight="600">140M</text>

                    <path
                      d="M100 65 C130 70,160 90,190 95 S250 85,280 75 S340 25,370 40 S430 95,460 100 S520 120,550 110 S610 40,640 55 S680 90,690 90"
                      fill="none"
                      stroke="#60A5FA"
                      strokeWidth="6"
                      strokeLinecap="round"
                    />

                    <circle cx="100" cy="65" r="6" fill="#60A5FA" />
                    <circle cx="190" cy="95" r="6" fill="#60A5FA" />
                    <circle cx="280" cy="75" r="6" fill="#60A5FA" />
                    <circle cx="370" cy="40" r="6" fill="#60A5FA" />
                    <circle cx="460" cy="85" r="6" fill="#60A5FA" />
                    <circle cx="550" cy="110" r="6" fill="#60A5FA" />
                    <circle cx="640" cy="55" r="6" fill="#60A5FA" />
                    <circle cx="690" cy="90" r="6" fill="#60A5FA" />

                    <text x="90" y="200" fill="#9ca3af" fontSize="11">5</text>
                    <text x="180" y="200" fill="#9ca3af" fontSize="11">2</text>
                    <text x="270" y="200" fill="#9ca3af" fontSize="11">2</text>
                    <text x="360" y="200" fill="#9ca3af" fontSize="11">3</text>
                    <text x="450" y="200" fill="#9ca3af" fontSize="11">5</text>
                    <text x="540" y="200" fill="#9ca3af" fontSize="11">0</text>
                    <text x="630" y="200" fill="#9ca3af" fontSize="11">5</text>
                    <text x="685" y="200" fill="#9ca3af" fontSize="11">0</text>
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
                {[
                  { title: `${stats.emailCampaigns} Email Campaigns`, subtitle: "Active", width: "25%" },
                  { title: `${stats.linkedinCampaigns} Linkedin Campaigns`, subtitle: "Active", width: "53%" },
                  { title: `${stats.smsCampaigns} SMS Campaigns`, subtitle: "Active", width: "12%" },
                ].map((item, index) => (
                  <div key={index} className="pt-1">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className="w-2 h-2 rounded-full bg-[#20c6d1]" />
                      <span>{item.title}</span>
                    </div>
                    <div className="text-gray-500 text-sm mt-1">{item.subtitle}</div>
                    <div className="mt-4 h-2 rounded-full bg-[#275960] overflow-hidden">
                      <div className="h-full rounded-full bg-[#20c6d1]" style={{ width: item.width }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ================================================================ */}
      {/* 5. EMAIL ACTIVITY & REPORTS */}
      {/* ================================================================ */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Left top card - Email Activity with NEW BAR CHART */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="xl:col-span-1 bg-white rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-slate-200 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[18px] font-semibold text-slate-700">Email Activity</h3>
          </div>

          <div className="h-[250px]">
            <EmailActivityBarChart
              data={[
                { label: 'Linux', value: 18 },
                { label: 'Mac', value: 22 },
                { label: 'iOS', value: 19 },
                { label: 'Windows', value: 24 },
                { label: 'Android', value: 7 },
                { label: 'Other', value: 22 },
              ]}
            />
          </div>
        </motion.div>

        {/* Right top card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="xl:col-span-2 bg-white rounded-2xl shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-slate-200 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[18px] font-semibold text-slate-700">Reports</h3>

            <div className="flex items-center gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-8 h-0.5 bg-slate-300 rounded-full" />
                <span>Reply Trend</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-8 h-0.5 bg-fuchsia-400 rounded-full" />
                <span>Open rate</span>
              </div>

              <select className="px-3 py-1 border border-slate-200 rounded-lg bg-white text-slate-600 outline-none">
                <option>Email</option>
                <option>Linkedin</option>
                <option>SMS</option>
              </select>

              <button className="text-slate-500">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="h-[220px]">
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <div className="absolute left-0 top-0 h-[180px] flex flex-col justify-between text-[11px] text-slate-500 z-10">
                <span>100</span>
                <span>80</span>
                <span>60</span>
                <span>40</span>
                <span>20</span>
                <span>0</span>
              </div>

              <svg
                viewBox="0 0 600 220"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="replyLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#d4d4d8" />
                    <stop offset="100%" stopColor="#9ca3af" />
                  </linearGradient>
                  <linearGradient id="openLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="50%" stopColor="#a78bfa" />
                    <stop offset="100%" stopColor="#f472b6" />
                  </linearGradient>
                </defs>

                <line x1="0" y1="175" x2="600" y2="175" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="0" y1="135" x2="600" y2="135" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="0" y1="95" x2="600" y2="95" stroke="#e5e7eb" strokeWidth="1" />
                <line x1="0" y1="55" x2="600" y2="55" stroke="#e5e7eb" strokeWidth="1" />

                <path
                  d="M 0 105 C 30 55, 70 40, 100 65 S 160 150, 200 120 S 260 70, 300 115 S 360 165, 410 135 S 470 110, 520 98 S 570 110, 600 120"
                  fill="none"
                  stroke="url(#replyLine)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <path
                  d="M 0 130 C 30 110, 60 135, 100 150 S 160 95, 200 115 S 260 170, 300 95 S 360 180, 410 135 S 470 105, 520 70 S 570 100, 600 60"
                  fill="none"
                  stroke="url(#openLine)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                <circle cx="300" cy="95" r="5" fill="#111827" />
                <circle cx="300" cy="95" r="3.2" fill="#c4b5fd" />
                <line x1="300" y1="95" x2="300" y2="170" stroke="#9ca3af" strokeWidth="1" strokeDasharray="4 4" />
                <rect x="255" y="35" width="92" height="36" rx="10" fill="#111827" />
                <text x="301" y="57" textAnchor="middle" fill="white" fontSize="14" fontWeight="700">2,678</text>
              </svg>

              <div className="absolute bottom-1 left-12 right-6 flex justify-between text-[11px] text-slate-500">
                <span>June 1</span>
                <span>June 2</span>
                <span>June 3</span>
                <span>June 4</span>
                <span>June 5</span>
                <span>June 6</span>
                <span>June 7</span>
                <span>June 8</span>
                <span>June 9</span>
                <span>June 10</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Big dark bar card and active user card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="xl:col-span-2 bg-white rounded-3xl shadow-[0_12px_30px_rgba(0,0,0,0.12)] p-5"
        >
          {/* Dark Chart Section */}
          <div className="bg-[#17172B] rounded-3xl p-5">
            <div className="h-[230px]">
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <svg
                  viewBox="0 0 600 230"
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="none"
                >
                  <line x1="40" y1="190" x2="560" y2="190" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <line x1="40" y1="150" x2="560" y2="150" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <line x1="40" y1="110" x2="560" y2="110" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                  <line x1="40" y1="70" x2="560" y2="70" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

                  {[
                    [90, 135],
                    [145, 165],
                    [210, 185],
                    [275, 145],
                    [340, 55],
                    [405, 85],
                    [470, 65],
                    [535, 140],
                    [590, 175],
                  ].map(([x, y], i) => (
                    <line
                      key={i}
                      x1={x}
                      y1={200}
                      x2={x}
                      y2={y}
                      stroke="white"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                  ))}

                  <text x="25" y="195" fill="white" fontSize="11">0</text>
                  <text x="18" y="155" fill="white" fontSize="11">100</text>
                  <text x="18" y="115" fill="white" fontSize="11">200</text>
                  <text x="18" y="75" fill="white" fontSize="11">300</text>
                  <text x="18" y="35" fill="white" fontSize="11">400</text>
                  <text x="18" y="15" fill="white" fontSize="11">500</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Active Users Section */}
          <div className="mt-8 px-3">
            <div className="mb-8">
              <h2 className="text-[18px] font-bold text-slate-800">Active Users</h2>
              <div className="mt-1 flex items-center gap-1">
                <span className="text-[14px] font-semibold text-emerald-400">(+23)</span>
                <span className="text-[14px] text-slate-400">than last week</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-10">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400 flex items-center justify-center">
                    <Image src="/images/wallet.png" alt="Users" width={18} height={18} className="brightness-0 invert" />
                  </div>
                  <span className="text-[12px] font-medium text-slate-400">Users</span>
                </div>
                <p className="text-[18px] font-bold text-slate-800">32,984</p>
                <div className="mt-3 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 rounded-full bg-cyan-400"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400 flex items-center justify-center">
                    <Image src="/images/rocket.png" alt="Clicks" width={18} height={18} className="brightness-0 invert" />
                  </div>
                  <span className="text-[12px] font-medium text-slate-400">Clicks</span>
                </div>
                <p className="text-[18px] font-bold text-slate-800">2.42m</p>
                <div className="mt-3 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 rounded-full bg-cyan-400"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400 flex items-center justify-center">
                    <Image src="/images/grocery-store.png" alt="Sales" width={18} height={18} className="brightness-0 invert" />
                  </div>
                  <span className="text-[12px] font-medium text-slate-400">Sales</span>
                </div>
                <p className="text-[18px] font-bold text-slate-800">$2,400</p>
                <div className="mt-3 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-2/5 rounded-full bg-cyan-400"></div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400 flex items-center justify-center">
                    <Image src="/images/wallet.png" alt="Items" width={18} height={18} className="brightness-0 invert" />
                  </div>
                  <span className="text-[12px] font-medium text-slate-400">Items</span>
                </div>
                <p className="text-[18px] font-bold text-slate-800">320</p>
                <div className="mt-3 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full w-3/5 rounded-full bg-cyan-400"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right middle card */}
        <div className="space-y-6">
          {/* Campaign Performance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="bg-white rounded-3xl shadow-[0_8px_20px_rgba(0,0,0,0.08)] p-6"
          >
            <h3 className="text-xl font-semibold text-slate-700 mb-5">Campaign performance</h3>

            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-6 items-center">
              <div className="flex justify-center">
                <div className="relative w-[180px] h-[180px]">
                  <svg viewBox="0 0 220 220" className="w-full h-full -rotate-90">
                    <circle cx="110" cy="110" r="72" fill="none" stroke="#f1f5f9" strokeWidth="22" />
                    <circle cx="110" cy="110" r="72" fill="none" stroke="#111111" strokeWidth="22" strokeLinecap="round" strokeDasharray="160 452" />
                    <circle cx="110" cy="110" r="72" fill="none" stroke="#b7f0cf" strokeWidth="22" strokeLinecap="round" strokeDasharray="95 452" strokeDashoffset="-168" />
                    <circle cx="110" cy="110" r="72" fill="none" stroke="#9fb0ff" strokeWidth="22" strokeLinecap="round" strokeDasharray="110 452" strokeDashoffset="-272" />
                    <circle cx="110" cy="110" r="72" fill="none" stroke="#9bdcf0" strokeWidth="22" strokeLinecap="round" strokeDasharray="32 452" strokeDashoffset="-390" />
                  </svg>
                </div>
              </div>

              <div className="space-y-4 text-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#111111]" />
                    <span>United States</span>
                  </div>
                  <span>38.6%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#b7f0cf]" />
                    <span>Canada</span>
                  </div>
                  <span>22.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#9fb0ff]" />
                    <span>Mexico</span>
                  </div>
                  <span>30.8%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-[#9bdcf0]" />
                    <span>Other</span>
                  </div>
                  <span>8.1%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Revenue Card */}
          <div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-6">
              <span className="font-semibold text-slate-800">Revenue</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-900" />
                Current Week
                <strong className="text-slate-900">$58,211</strong>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-300" />
                Previous Week
                <strong className="text-slate-900">$68,768</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="bg-[#101225] rounded-3xl p-6 text-white text-center shadow-[0_10px_25px_rgba(0,0,0,0.14)]">
                <div className="text-5xl font-bold">4</div>
                <div className="mt-3 text-sm font-medium">Total Recipients</div>
              </div>
              <div className="bg-[#101225] rounded-3xl p-6 text-white text-center shadow-[0_10px_25px_rgba(0,0,0,0.14)]">
                <div className="text-5xl font-bold">2</div>
                <div className="mt-3 text-sm font-medium">Recipients reached out</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* 7. RECENT CAMPAIGNS TABLE */}
      {/* ================================================================ */}

      <>
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&family=Outfit:wght@500&display=swap');
          .email-campaigns-card {
            width: 100%;
            min-height: 602px;
            border-radius: 24px;
            background: #f7f7f8;
            border: 1px solid #e5e7eb;
            box-shadow: 0 10px 30px rgba(15, 23, 42, 0.1);
            overflow: hidden;
          }
          .email-campaigns-title {
            font-family: 'Nunito', sans-serif;
            font-weight: 700;
            font-size: 18px;
            line-height: 100%;
            letter-spacing: 0;
          }
          .email-campaigns-head {
            font-family: Helvetica, Arial, sans-serif;
            font-weight: 700;
            font-size: 10px;
            line-height: 150%;
            letter-spacing: 0;
          }
          .email-campaigns-body {
            font-family: 'Outfit', sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 140%;
            letter-spacing: 0;
          }
          .email-campaigns-avatar-wrap {
            width: 53.15px;
            height: 45.7px;
            min-width: 53.15px;
            border-radius: 999px;
            overflow: hidden;
            background: #e5e7eb;
            flex-shrink: 0;
          }
          .email-campaigns-avatar-fit {
            width: 53.15px;
            height: 45.7px;
            object-fit: cover;
            display: block;
          }
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 999px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #bfc5cf;
          }
        `}</style>

        <motion.div
          className="email-campaigns-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <div className="px-6 pt-5 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="email-campaigns-title text-[#4b5563]">Email Campaigns</h2>
                <ChevronDown className="w-5 h-5 text-[#9ca3af]" />
              </div>

              <motion.button
                onClick={() => router.push('/campaign/create')}
                className="email-campaigns-head px-4 py-2 bg-[#4b87F7] hover:bg-[#3d78e6] text-white rounded-xl transition-all duration-300 shadow-sm flex items-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Plus className="w-4 h-4 mr-1.5" />
                New Campaign
              </motion.button>
            </div>
          </div>

          <div className="px-6 pb-6">
            {isLoadingCampaigns ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-[#4b87F7] animate-spin mb-4" />
                <p className="email-campaigns-body text-[#9ca3af]">Loading campaigns...</p>
              </div>
            ) : campaigns.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-[#eef4ff] rounded-2xl flex items-center justify-center">
                  <Mail className="w-7 h-7 text-[#4b87F7]" />
                </div>
                <p className="email-campaigns-body text-[#374151]">No campaigns yet</p>
                <p className="email-campaigns-body text-[#9ca3af] mt-1 mb-6">
                  Create your first campaign to start engaging with your audience
                </p>
                <motion.button
                  onClick={() => router.push('/campaign/create')}
                  className="email-campaigns-head px-6 py-2.5 bg-[#4b87F7] text-white rounded-xl shadow-sm inline-flex items-center"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Campaign
                </motion.button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-[minmax(260px,2.8fr)_minmax(160px,1.7fr)_minmax(140px,1.35fr)_minmax(120px,1.15fr)_80px] gap-4 px-4 py-3 text-[#b6bdc8] border-b border-[#e5e7eb]">
                  <div className="email-campaigns-head">Title</div>
                  <div className="email-campaigns-head">Type</div>
                  <div className="email-campaigns-head">Status</div>
                  <div className="email-campaigns-head">Date</div>
                  <div className="email-campaigns-head">-----</div>
                </div>

                <div className="max-h-[470px] overflow-y-auto pr-2 custom-scrollbar">
                  {campaigns.map((campaign, index) => {
                    const fallbackFaces = [
                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=faces',
                      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces',
                      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=faces',
                      'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=300&h=300&fit=crop&crop=faces',
                      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=faces',
                    ];
                    const imageSrc = fallbackFaces[index % fallbackFaces.length];

                    const typeLabel = isWorkflowCampaign(campaign)
                      ? 'Airo Intelligence'
                      : campaign.campaign_type?.toLowerCase() === 'manual'
                      ? 'Manual'
                      : campaign.campaign_type?.toLowerCase() === 'email'
                      ? 'Manual'
                      : campaign.campaign_type?.toLowerCase() === 'ai-personalized'
                      ? 'Airo Intelligence'
                      : campaign.campaign_type?.replace('-', ' ') || 'Manual';

                    const normalizedStatus =
                      campaign.status === 'completed'
                        ? 'completed'
                        : campaign.status === 'running'
                        ? 'running'
                        : campaign.status === 'scheduled'
                        ? 'scheduled'
                        : campaign.status === 'draft'
                        ? 'scheduled'
                        : campaign.status === 'paused'
                        ? 'paused'
                        : campaign.status === 'failed'
                        ? 'failed'
                        : 'running';

                    const statusClasses =
                      normalizedStatus === 'completed'
                        ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30'
                        : normalizedStatus === 'running'
                        ? 'bg-blue-500/20 text-blue-500 border border-blue-500/30'
                        : normalizedStatus === 'scheduled'
                        ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                        : normalizedStatus === 'paused'
                        ? 'bg-slate-400/20 text-slate-500 border border-slate-400/30'
                        : 'bg-red-500/20 text-red-500 border border-red-500/30';

                    const statusLabel =
                      normalizedStatus === 'completed'
                        ? 'Completed'
                        : normalizedStatus === 'running'
                        ? 'Running'
                        : normalizedStatus === 'scheduled'
                        ? 'Scheduled'
                        : normalizedStatus === 'paused'
                        ? 'Paused'
                        : 'Failed';

                    return (
                      <motion.div
                        key={campaign.id}
                        className="grid grid-cols-[minmax(260px,2.8fr)_minmax(160px,1.7fr)_minmax(140px,1.35fr)_minmax(120px,1.15fr)_80px] gap-4 items-center px-4 py-5 border-b border-[#edf0f3] last:border-b-0 hover:bg-white/80 transition-all duration-200 cursor-pointer"
                        onClick={() => router.push(`/campaign/${campaign.id}/analytics`)}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.04 }}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="email-campaigns-avatar-wrap">
                            <img src={imageSrc} alt={campaign.name || 'Campaign'} className="email-campaigns-avatar-fit" />
                          </div>
                          <div className="min-w-0">
                            <p className="email-campaigns-body text-[#5b6472] truncate">
                              {campaign.name || `Email Campaign #${index + 1}`}
                            </p>
                          </div>
                        </div>

                        <div className="email-campaigns-body text-[#6b7280] capitalize truncate">
                          {typeLabel}
                        </div>

                        <div>
                          <span className={`email-campaigns-body inline-flex items-center px-3 py-1 rounded-full whitespace-nowrap ${statusClasses}`}>
                            {normalizedStatus === 'completed' && <CheckCircle className="w-3.5 h-3.5 mr-1.5" />}
                            {normalizedStatus === 'running' && <Play className="w-3.5 h-3.5 mr-1.5" />}
                            {normalizedStatus === 'scheduled' && <Clock className="w-3.5 h-3.5 mr-1.5" />}
                            {normalizedStatus === 'paused' && <Edit3 className="w-3.5 h-3.5 mr-1.5" />}
                            {statusLabel}
                          </span>
                        </div>

                        <div className="email-campaigns-body text-[#6b7280]">
                          {campaign.created_at
                            ? new Date(campaign.created_at).toISOString().split('T')[0]
                            : 'N/A'}
                        </div>

                        <div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/campaign/${campaign.id}/analytics`);
                            }}
                            className="email-campaigns-body text-[#7c8aa0] hover:text-[#4b87F7] transition-colors"
                          >
                            Edit
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </>

      <div className="mt-8 border-t border-[#e5e7eb] pt-6">
        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@700&display=swap');
          .stats-label { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 12px; line-height: 150%; letter-spacing: 0; }
          .stats-value { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 18px; line-height: 140%; letter-spacing: 0; }
          .stats-change { font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 14px; line-height: 140%; letter-spacing: 0; }
        `}</style>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl px-5 py-4 shadow-[0_6px_20px_rgba(0,0,0,0.08)] border border-[#eef0f3]">
            <div className="flex items-center justify-between">
              <div>
                <p className="stats-label text-[#9ca3af]">Total Recipients</p>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="stats-value text-[#374151]">{stats.totalRecipients?.toLocaleString() || 0}</h3>
                  <span className="stats-change text-[#22c55e]">+12%</span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#56d3ca] flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl px-5 py-4 shadow-[0_6px_20px_rgba(0,0,0,0.08)] border border-[#eef0f3]">
            <div className="flex items-center justify-between">
              <div>
                <p className="stats-label text-[#9ca3af]">Emails Sent</p>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="stats-value text-[#374151]">{stats.totalSent?.toLocaleString() || 0}</h3>
                  <span className="stats-change text-[#22c55e]">+8%</span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#56d3ca] flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl px-5 py-4 shadow-[0_6px_20px_rgba(0,0,0,0.08)] border border-[#eef0f3]">
            <div className="flex items-center justify-between">
              <div>
                <p className="stats-label text-[#9ca3af]">Open Rate</p>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="stats-value text-[#374151]">{stats.avgOpenRate?.toFixed(1) || 0}%</h3>
                  <span className="stats-change text-[#ef4444]">-5%</span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#56d3ca] flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl px-5 py-4 shadow-[0_6px_20px_rgba(0,0,0,0.08)] border border-[#eef0f3]">
            <div className="flex items-center justify-between">
              <div>
                <p className="stats-label text-[#9ca3af]">Click Rate</p>
                <div className="flex items-center gap-2 mt-1">
                  <h3 className="stats-value text-[#374151]">{stats.avgClickRate?.toFixed(1) || 0}%</h3>
                  <span className="stats-change text-[#22c55e]">+4%</span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-[#56d3ca] flex items-center justify-center">
                <MousePointer className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* 8. MODALS */}
      {/* ================================================================ */}

      <AnimatePresence>
        {showTemplatesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTemplatesModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#3A3A3C] rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-[#2C2C2E] border-b border-gray-700 p-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Email & Message Templates</h2>
                  <p className="text-gray-400 text-sm mt-0.5">Choose a template and customize with placeholders</p>
                </div>
                <motion.button
                  onClick={() => setShowTemplatesModal(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              <div className="sticky top-[73px] bg-[#3A3A3C] border-b border-gray-700 p-3 flex gap-2">
                <motion.button
                  onClick={() => setTemplateType('email')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 text-sm ${
                    templateType === 'email'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-[#2C2C2E] text-gray-300 hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Mail className="w-4 h-4" />
                  Email Templates
                </motion.button>
                <motion.button
                  onClick={() => setTemplateType('linkedin')}
                  className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 text-sm ${
                    templateType === 'linkedin'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-[#2C2C2E] text-gray-300 hover:bg-gray-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn Templates
                </motion.button>
              </div>

              <div className="p-5 space-y-5">
                {templateType === 'email' ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-2 border-gray-700 rounded-2xl p-5 hover:border-blue-500 hover:shadow-lg transition-all"
                    >
                      <div className="mb-3">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-blue-400" />
                          Complete Email Automation
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">End-to-end automated email response flow. Perfect for handling customer inquiries with AI-powered personalized responses.</p>
                      </div>
                      <pre className="bg-[#2C2C2E] rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto">{`Subject: Follow-up on Your {{company_name}} Inquiry

Hi {{name}},

Thank you for reaching out! I noticed you're interested in {{company_name}}.

I'd love to help. Your email: {{email}}

Best regards,
Your Team`}</pre>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="border-2 border-gray-700 rounded-2xl p-5 hover:border-blue-500 hover:shadow-lg transition-all"
                    >
                      <div className="mb-3">
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <Zap className="w-4 h-4 text-amber-400" />
                          Quick Email Reply
                        </h3>
                        <p className="text-gray-400 text-sm mt-1">Fast automated response template. Ideal for quick acknowledgments and immediate engagement with prospects.</p>
                      </div>
                      <pre className="bg-[#2C2C2E] rounded-xl p-4 font-mono text-xs text-gray-300 overflow-x-auto">{`Subject: Re: Your Message

Hey {{name}},

Thanks for reaching out! Replying from {{company_name}}.

Contact: {{email}}... Let's connect!`}</pre>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-2 border-gray-700 rounded-2xl p-5 hover:border-blue-500 hover:shadow-lg transition-all"
                  >
                    <div className="mb-3">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Linkedin className="w-4 h-4 text-blue-400" />
                        LinkedIn Outreach
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">Complete LinkedIn automation workflow. Sends connection requests, personalized messages, and SMS follow-ups. Invite first, then nurture with automated follow-ups.</p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-gray-300 text-sm mb-1.5">Step 1: Connection Request</p>
                        <pre className="bg-[#2C2C2E] rounded-xl p-3 font-mono text-xs text-gray-300 overflow-x-auto">{`Hi {{name}}, I'd like to connect and explore opportunities at {{company_name}}.`}</pre>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-300 text-sm mb-1.5">Step 2: Follow-up Message (After 1 day)</p>
                        <pre className="bg-[#2C2C2E] rounded-xl p-3 font-mono text-xs text-gray-300 overflow-x-auto">{`Hi {{name}},

Great connecting! I found your profile interesting and thought we should discuss {{company_name}}.... Email: {{email}}`}</pre>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-300 text-sm mb-1.5">Step 3: SMS Reminder (After 2 days)</p>
                        <pre className="bg-[#2C2C2E] rounded-xl p-3 font-mono text-xs text-gray-300 overflow-x-auto">{`Hi {{name}}, Following up on LinkedIn. {{email}} to reply.`}</pre>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="sticky bottom-0 bg-[#2C2C2E] border-t border-gray-700 p-3 text-xs text-gray-500">
                <p><strong className="text-gray-300">Available Placeholders:</strong> name (Recipient's name) • company_name (Company name) • email (Email address). These will be automatically filled from your contact lists.</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {showAnalyticsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAnalyticsModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#3A3A3C] rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-[#2C2C2E] border-b border-gray-700 p-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Campaign Analytics</h2>
                  <p className="text-gray-400 text-sm mt-0.5">Select a campaign to view detailed analytics</p>
                </div>
                <motion.button
                  onClick={() => setShowAnalyticsModal(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              <div className="p-5">
                {isLoadingCampaigns ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <Loader2 className="w-10 h-10 text-blue-400 animate-spin mb-4" />
                    <p className="text-gray-400 font-medium">Loading campaigns...</p>
                  </div>
                ) : campaigns.length === 0 ? (
                  <div className="text-center py-10">
                    <BarChart4 className="w-14 h-14 text-gray-600 mx-auto mb-4" />
                    <p className="text-white font-bold text-base">No campaigns yet</p>
                    <p className="text-gray-400 text-sm mt-1">Create a campaign to view analytics</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {campaigns.map((campaign, index) => (
                      <motion.button
                        key={campaign.id}
                        onClick={() => {
                          setShowAnalyticsModal(false);
                          router.push(`/campaign/${campaign.id}/analytics`);
                        }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        className="w-full p-4 rounded-2xl border-2 border-gray-700 hover:border-blue-500 hover:bg-[#2C2C2E] transition-all text-left group"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-base font-semibold text-white group-hover:text-blue-400 transition-colors">
                              {campaign.name}
                            </h3>
                            <p className="text-gray-400 text-sm mt-0.5 line-clamp-2">{campaign.description || 'No description'}</p>
                          </div>
                          <div className="ml-4 flex flex-col items-end text-sm">
                            <p className="font-semibold text-white">{campaign.total_recipients || 0}</p>
                            <p className="text-gray-500 text-xs">recipients</p>
                          </div>
                        </div>
                        <div className="mt-2.5 flex items-center gap-3 text-xs text-gray-500">
                          {campaign.status && (
                            <span className={`px-2 py-0.5 rounded-full ${
                              campaign.status === 'sent' || campaign.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' :
                              campaign.status === 'draft' ? 'bg-gray-500/20 text-gray-300' :
                              campaign.status === 'scheduled' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-gray-500/20 text-gray-300'
                            }`}>
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </span>
                          )}
                          {campaign.created_at && (
                            <span>Created {new Date(campaign.created_at).toLocaleDateString()}</span>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};