"use client";
import {
  BarChart3, Download, Filter, TrendingUp, Users, MessageSquare,
  Star, ArrowUpRight, Clock, Target
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line, Legend
} from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/ui/misc";
import { formatCurrency } from "@/lib/utils";

const agentPerformance = [
  { name: "John Santoso", resolved: 48, avgTime: "3m 12s", csat: 4.8, deals: 12 },
  { name: "Sarah", resolved: 35, avgTime: "4m 55s", csat: 4.5, deals: 8 },
  { name: "Rachel", resolved: 52, avgTime: "2m 48s", csat: 4.9, deals: 15 },
  { name: "David", resolved: 28, avgTime: "6m 22s", csat: 4.2, deals: 5 },
];

const weeklyData = [
  { day: "Mon", conversations: 42, resolved: 38, deals: 3 },
  { day: "Tue", conversations: 58, resolved: 52, deals: 5 },
  { day: "Wed", conversations: 35, resolved: 31, deals: 2 },
  { day: "Thu", conversations: 67, resolved: 60, deals: 7 },
  { day: "Fri", conversations: 54, resolved: 49, deals: 4 },
  { day: "Sat", conversations: 22, resolved: 20, deals: 1 },
  { day: "Sun", conversations: 18, resolved: 17, deals: 0 },
];

const csatData = [
  { month: "Aug", score: 4.2 },
  { month: "Sep", score: 4.4 },
  { month: "Oct", score: 4.3 },
  { month: "Nov", score: 4.6 },
  { month: "Dec", score: 4.7 },
  { month: "Jan", score: 4.8 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-(--text-primary)">Reports & Analytics</h1>
          <p className="text-sm text-(--text-muted) mt-0.5">Overview of your team and business performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={<Filter size={14} />}>Jan 2025</Button>
          <Button variant="secondary" size="sm" icon={<Download size={14} />}>Export</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total Conversations" value="296" change="+18% this month" changeType="positive" icon={<MessageSquare size={18} />} color="blue" />
        <StatsCard label="Resolution Rate" value="93.2%" change="+2.1% vs last" changeType="positive" icon={<Target size={18} />} color="green" />
        <StatsCard label="Avg. CSAT Score" value="4.8 / 5" change="+0.2 improved" changeType="positive" icon={<Star size={18} />} color="amber" />
        <StatsCard label="Avg. Response Time" value="4m 32s" change="-1m 18s faster" changeType="positive" icon={<Clock size={18} />} color="purple" />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly conversations */}
        <Card padding="md">
          <CardHeader>
            <CardTitle>Weekly Conversations</CardTitle>
            <Badge variant="info" dot>Live</Badge>
          </CardHeader>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="conversations" fill="#1e3a8a" radius={[4, 4, 0, 0]} name="Total" />
                <Bar dataKey="resolved" fill="#38bdf8" radius={[4, 4, 0, 0]} name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* CSAT trend */}
        <Card padding="md">
          <CardHeader>
            <CardTitle>CSAT Score Trend</CardTitle>
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <ArrowUpRight size={14} /> 14.3% improvement
            </span>
          </CardHeader>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={csatData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <YAxis domain={[3.5, 5]} tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2.5} dot={{ fill: "#10b981", r: 4 }} name="CSAT Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Agent performance table */}
      <Card padding="md">
        <CardHeader>
          <CardTitle>Agent Performance</CardTitle>
          <Button variant="ghost" size="xs" icon={<Download size={13} />}>Export CSV</Button>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-(--text-muted) border-b border-(--border-color)">
                <th className="text-left pb-3 font-medium">Agent</th>
                <th className="text-center pb-3 font-medium">Resolved</th>
                <th className="text-center pb-3 font-medium">Avg Time</th>
                <th className="text-center pb-3 font-medium">CSAT</th>
                <th className="text-center pb-3 font-medium">Deals</th>
                <th className="text-center pb-3 font-medium">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-color)">
              {agentPerformance.map((agent, idx) => {
                const score = ((agent.resolved / 52) * 40 + (agent.csat / 5) * 40 + (agent.deals / 15) * 20).toFixed(0);
                return (
                  <tr key={agent.name} className="hover:bg-(--bg-muted) transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-[#1e3a8a] text-white text-[10px] font-bold flex items-center justify-center">
                          #{idx + 1}
                        </div>
                        <span className="font-medium text-(--text-primary) text-xs">{agent.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <span className="font-semibold text-(--text-primary) text-xs">{agent.resolved}</span>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-xs text-(--text-secondary)">{agent.avgTime}</span>
                    </td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={11} className="text-amber-400 fill-amber-400" />
                        <span className="font-semibold text-xs text-(--text-primary)">{agent.csat}</span>
                      </div>
                    </td>
                    <td className="py-3 text-center">
                      <span className="text-xs text-(--text-secondary)">{agent.deals}</span>
                    </td>
                    <td className="py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-1.5 bg-(--bg-muted) rounded-full overflow-hidden">
                          <div className="h-full bg-[#1e3a8a] rounded-full" style={{ width: `${score}%` }} />
                        </div>
                        <Badge variant={Number(score) >= 80 ? "success" : Number(score) >= 60 ? "warning" : "danger"} size="sm">
                          {score}%
                        </Badge>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
