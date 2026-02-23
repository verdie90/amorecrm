"use client";
import {
  Users, Briefcase, MessageSquare, TrendingUp, Clock,
  CheckCircle2, Phone, Mail,
  Calendar, Star, Zap, BarChart3, Target, Activity
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/badge";
import { StatsCard } from "@/components/ui/misc";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  mockActivities, mockContacts, mockDeals,
  revenueChartData, channelBreakdown, mockDashboardStats, mockConversations
} from "@/lib/mock-data";

const pipelineStages = [
  { label: "Lead", count: 8, value: 312000000, color: "#94a3b8" },
  { label: "Qualified", count: 5, value: 245000000, color: "#38bdf8" },
  { label: "Proposal", count: 6, value: 380000000, color: "#3b82f6" },
  { label: "Negotiation", count: 4, value: 195000000, color: "#8b5cf6" },
  { label: "Won", count: 5, value: 145000000, color: "#10b981" },
];

const activityTypeConfig: Record<string, { label: string; color: string; icon: React.ComponentType<{ size?: number }> }> = {
  call: { label: "Call", color: "text-blue-500", icon: Phone },
  email: { label: "Email", color: "text-violet-500", icon: Mail },
  meeting: { label: "Meeting", color: "text-emerald-500", icon: Calendar },
  note: { label: "Note", color: "text-amber-500", icon: Star },
  deal: { label: "Deal", color: "text-green-600", icon: Briefcase },
  contact: { label: "Contact", color: "text-pink-500", icon: Users },
  task: { label: "Task", color: "text-orange-500", icon: CheckCircle2 },
};

const stageMap: Record<string, { label: string; variant: "default" | "info" | "warning" | "success" | "danger" | "muted" | "purple" }> = {
  lead: { label: "Lead", variant: "muted" },
  qualified: { label: "Qualified", variant: "info" },
  proposal: { label: "Proposal", variant: "default" },
  negotiation: { label: "Negotiation", variant: "purple" },
  closed_won: { label: "Won", variant: "success" },
  closed_lost: { label: "Lost", variant: "danger" },
};

interface TooltipPayloadItem {
  name: string;
  value: number;
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-(--bg-surface) border border-(--border-color) rounded-xl shadow-xl p-3 backdrop-blur-lg">
      <p className="text-[11px] text-(--text-muted) mb-1.5 font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.name} className="text-sm font-bold text-(--text-primary) font-num">
          {formatCurrency(p.value)}
        </p>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const stats = mockDashboardStats;

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#3b82f6] px-6 py-6 flex items-center justify-between shadow-lg animate-gradient" style={{ backgroundSize: "200% 200%" }}>
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-8 top-3 w-36 h-36 bg-[#38bdf8] rounded-full blur-3xl opacity-15" />
          <div className="absolute right-24 bottom-2 w-24 h-24 bg-white rounded-full blur-2xl opacity-10" />
          <div className="absolute left-1/3 top-0 w-48 h-24 bg-white rounded-full blur-3xl opacity-5" />
        </div>
        <div className="relative z-10">
          <p className="text-[#38bdf8] text-xs font-semibold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse-dot" />
            Welcome back
          </p>
          <h1 className="font-display text-2xl font-bold text-white tracking-tight">
            Good morning, John
          </h1>
          <p className="text-white/60 text-sm mt-1.5 max-w-md">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 relative z-10">
          <Button variant="secondary" size="sm" icon={<BarChart3 size={14} />}>
            Export Report
          </Button>
          <Button
            size="sm"
            icon={<Zap size={14} />}
            className="bg-white text-[#1e3a8a] hover:bg-white/90 border-transparent shadow-md"
          >
            Quick Action
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Total Contacts"
          value={stats.totalContacts.toLocaleString()}
          change="+12% from last month"
          changeType="positive"
          icon={<Users size={18} />}
          color="blue"
        />
        <StatsCard
          label="Active Deals"
          value={stats.totalDeals}
          change="+5 new this week"
          changeType="positive"
          icon={<Briefcase size={18} />}
          color="purple"
        />
        <StatsCard
          label="Total Revenue"
          value={formatCurrency(stats.totalRevenue)}
          change="+8.3% vs last month"
          changeType="positive"
          icon={<TrendingUp size={18} />}
          color="green"
        />
        <StatsCard
          label="Avg Response"
          value={stats.avgResponseTime}
          change="-32s improved"
          changeType="positive"
          icon={<Clock size={18} />}
          color="cyan"
        />
      </div>

      {/* Second stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          label="Open Tickets"
          value={stats.openTickets}
          change="2 urgent"
          changeType="negative"
          icon={<MessageSquare size={18} />}
          color="amber"
        />
        <StatsCard
          label="Resolved Today"
          value={stats.resolvedToday}
          change="On track"
          changeType="neutral"
          icon={<CheckCircle2 size={18} />}
          color="green"
        />
        <StatsCard
          label="Conversion Rate"
          value={`${stats.conversionRate}%`}
          change="+2.1% this month"
          changeType="positive"
          icon={<Target size={18} />}
          color="blue"
        />
        <StatsCard
          label="Active Agents"
          value={`${stats.activeAgents}/12`}
          change="9 online now"
          changeType="neutral"
          icon={<Activity size={18} />}
          color="purple"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue chart */}
        <Card className="lg:col-span-2" padding="md" glow>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="success" dot>+8.3%</Badge>
              <span className="text-xs text-(--text-muted)">vs last period</span>
            </div>
          </CardHeader>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"  stopColor="#38bdf8" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(0)}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="revenue" stroke="#1e3a8a" strokeWidth={2.5} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 4, fill: "#38bdf8", strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Channel breakdown */}
        <Card padding="md">
          <CardHeader>
            <CardTitle>Channel Mix</CardTitle>
          </CardHeader>
          <div className="flex flex-col items-center">
            <div className="h-36">
              <ResponsiveContainer width={160} height={140}>
                <PieChart>
                  <Pie data={channelBreakdown} cx="50%" cy="50%" innerRadius={42} outerRadius={62} paddingAngle={3} dataKey="value">
                    {channelBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-2 mt-1">
              {channelBreakdown.map((ch) => (
                <div key={ch.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: ch.color }} />
                    <span className="text-(--text-secondary)">{ch.name}</span>
                  </div>
                  <span className="font-semibold text-(--text-primary)">{ch.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Pipeline + Activity + Inbox row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pipeline */}
        <Card padding="md">
          <CardHeader>
            <CardTitle>Sales Pipeline</CardTitle>
            <Button variant="ghost" size="xs">View All</Button>
          </CardHeader>
          <div className="space-y-2.5">
            {pipelineStages.map((stage) => {
              const maxVal = Math.max(...pipelineStages.map((s) => s.value));
              const pct = (stage.value / maxVal) * 100;
              return (
                <div key={stage.label}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ background: stage.color }} />
                      <span className="text-(--text-secondary)">{stage.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-(--text-muted)">{stage.count} deals</span>
                      <span className="font-semibold text-(--text-primary)">{formatCurrency(stage.value)}</span>
                    </div>
                  </div>
                  <div className="h-1.5 bg-(--bg-muted) rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: stage.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card padding="md">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" size="xs">See All</Button>
          </CardHeader>
          <div className="space-y-3">
            {mockActivities.map((act) => {
              const cfg = activityTypeConfig[act.type] || activityTypeConfig.note;
              const Icon = cfg.icon;
              return (
                <div key={act.id} className="flex gap-3">
                  <div className={`w-7 h-7 rounded-lg bg-(--bg-muted) flex items-center justify-center shrink-0 ${cfg.color}`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-(--text-primary) truncate">{act.title}</p>
                    <p className="text-[11px] text-(--text-muted)">{act.userName} · {formatDate(act.createdAt, "relative")}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Conversations */}
        <Card padding="md">
          <CardHeader>
            <CardTitle>Open Conversations</CardTitle>
            <Button variant="ghost" size="xs">Inbox</Button>
          </CardHeader>
          <div className="space-y-3">
            {mockConversations.filter(c => c.status === "open").slice(0, 4).map((conv) => {
              const channelColors: Record<string, string> = {
                whatsapp: "text-emerald-500",
                email: "text-blue-500",
                livechat: "text-cyan-500",
                instagram: "text-pink-500",
              };
              return (
                <div key={conv.id} className="flex items-start gap-3">
                  <Avatar name={conv.contactName} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-(--text-primary) truncate">{conv.contactName}</p>
                      {conv.unreadCount > 0 && (
                        <span className="bg-[#1e3a8a] text-white text-[10px] font-bold px-1.5 rounded-full ml-1 shrink-0">
                          {conv.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-(--text-muted) truncate">{conv.lastMessage}</p>
                    <p className={`text-[10px] capitalize font-medium mt-0.5 ${channelColors[conv.channel] || ""}`}>
                      {conv.channel}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recent Deals & Contacts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Deals */}
        <Card padding="md" glow>
          <CardHeader>
            <CardTitle>Recent Deals</CardTitle>
            <Button variant="ghost" size="xs">View All</Button>
          </CardHeader>
          <div className="overflow-x-auto">
            <table className="w-full text-sm table-row-hover">
              <thead>
                <tr className="text-xs text-(--text-muted) border-b border-(--border-color)">
                  <th className="text-left pb-2.5 font-medium">Deal</th>
                  <th className="text-left pb-2.5 font-medium">Stage</th>
                  <th className="text-right pb-2.5 font-medium">Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border-color)">
                {mockDeals.slice(0, 5).map((deal) => {
                  const stage = stageMap[deal.stage];
                  return (
                    <tr key={deal.id} className="hover:bg-(--bg-muted) transition-colors cursor-pointer">
                      <td className="py-2.5 pr-2">
                        <div>
                          <p className="font-medium text-(--text-primary) text-xs truncate max-w-40">{deal.title}</p>
                          <p className="text-[11px] text-(--text-muted)">{deal.contactName}</p>
                        </div>
                      </td>
                      <td className="py-2.5 pr-2">
                        <Badge variant={stage.variant} size="sm">{stage.label}</Badge>
                      </td>
                      <td className="py-2.5 text-right">
                        <span className="font-semibold text-xs text-(--text-primary) font-num">
                          {formatCurrency(deal.value)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Contacts */}
        <Card padding="md">
          <CardHeader>
            <CardTitle>Recent Contacts</CardTitle>
            <Button variant="ghost" size="xs">View All</Button>
          </CardHeader>
          <div className="space-y-3">
            {mockContacts.slice(0, 5).map((contact) => {
              const typeVariant: Record<string, "default" | "success" | "warning" | "info"> = {
                client: "success",
                lead: "warning",
                prospect: "info",
              };
              return (
                <div key={contact.id} className="flex items-center gap-3 hover:bg-(--bg-muted) -mx-1 px-1 py-1 rounded-lg transition-colors cursor-pointer">
                  <Avatar name={contact.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-(--text-primary)">{contact.name}</p>
                    <p className="text-[11px] text-(--text-muted) truncate">{contact.company}</p>
                  </div>
                  <Badge variant={typeVariant[contact.type] || "muted"} size="sm">
                    {contact.type}
                  </Badge>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
