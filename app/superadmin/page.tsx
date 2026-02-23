"use client";
import {
  Shield, Building2, Users, CreditCard, Activity, TrendingUp,
  AlertCircle, CheckCircle2, Clock, MoreHorizontal, Search,
  DollarSign, Globe, Zap, Ban, Edit, Eye
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { StatsCard } from "@/components/ui/misc";
import { mockTenants } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useState } from "react";

const mrr = [
  { month: "Aug", value: 8500000 },
  { month: "Sep", value: 9200000 },
  { month: "Oct", value: 10400000 },
  { month: "Nov", value: 11100000 },
  { month: "Dec", value: 12800000 },
  { month: "Jan", value: 14600000 },
];

const tenantGrowth = [
  { month: "Aug", tenants: 14 },
  { month: "Sep", tenants: 18 },
  { month: "Oct", tenants: 22 },
  { month: "Nov", tenants: 27 },
  { month: "Dec", tenants: 31 },
  { month: "Jan", tenants: 38 },
];

const planVariant: Record<string, "default" | "info" | "purple"> = {
  basic: "default",
  pro: "info",
  enterprise: "purple",
};

const statusVariant: Record<string, "success" | "muted" | "danger"> = {
  active: "success",
  trial: "muted",
  suspended: "danger",
};

export default function SuperadminPage() {
  const [search, setSearch] = useState("");
  const total = mockTenants.length;
  const active = mockTenants.filter(t => t.status === "active").length;
  const totalMrr = 14600000;
  const totalAgents = mockTenants.reduce((s, t) => s + t.agentCount, 0);

  const filtered = mockTenants.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.domain.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center">
              <Shield size={14} className="text-red-500" />
            </div>
            <Badge variant="danger" size="sm">Superadmin</Badge>
          </div>
          <h1 className="font-display text-2xl font-bold text-(--text-primary)">Superadmin Dashboard</h1>
          <p className="text-sm text-(--text-muted) mt-0.5">Global monitoring for the entire Amore CRM ecosystem</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" icon={<Activity size={14} />}>System Health</Button>
          <Button size="sm" icon={<Building2 size={14} />}>Add Tenant</Button>
        </div>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard label="Total Tenants" value={total} change={`${active} active`} changeType="positive" icon={<Building2 size={18} />} color="blue" />
        <StatsCard label="Monthly Revenue" value={formatCurrency(totalMrr)} change="+14% MoM" changeType="positive" icon={<DollarSign size={18} />} color="green" />
        <StatsCard label="Total Agents" value={totalAgents} change="Across all tenants" changeType="neutral" icon={<Users size={18} />} color="purple" />
        <StatsCard label="Uptime" value="99.98%" change="Last 30 days" changeType="positive" icon={<Globe size={18} />} color="cyan" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card padding="md">
          <CardHeader>
            <CardTitle>Monthly Recurring Revenue</CardTitle>
            <Badge variant="success" dot>+14%</Badge>
          </CardHeader>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mrr} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000000).toFixed(0)}M`} />
                <Tooltip formatter={(v) => formatCurrency(v as number)} />
                <Area type="monotone" dataKey="value" stroke="#1e3a8a" strokeWidth={2.5} fill="url(#mrrGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padding="md">
          <CardHeader>
            <CardTitle>Tenant Growth</CardTitle>
          </CardHeader>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tenantGrowth} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="tenants" fill="#38bdf8" radius={[4, 4, 0, 0]} name="Tenants" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Plan distribution */}
      <div className="grid grid-cols-3 gap-4">
        {["basic", "pro", "enterprise"].map((plan) => {
          const count = mockTenants.filter(t => t.plan === plan).length;
          const revenue = {
            basic: 299000,
            pro: 799000,
            enterprise: 1999000,
          }[plan]! * count;
          return (
            <Card key={plan} padding="sm">
              <div className="flex items-center justify-between mb-2">
                <Badge variant={planVariant[plan]} size="sm">
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </Badge>
                <span className="font-display font-bold text-lg text-(--text-primary)">{count}</span>
              </div>
              <p className="text-xs text-(--text-muted)">MRR: {formatCurrency(revenue)}</p>
            </Card>
          );
        })}
      </div>

      {/* Tenant list */}
      <Card padding="md">
        <CardHeader>
          <CardTitle>All Tenants</CardTitle>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search tenants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search size={14} />}
              className="w-48"
            />
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-(--text-muted) border-b border-(--border-color)">
                <th className="text-left pb-3 font-medium">Tenant</th>
                <th className="text-left pb-3 font-medium">Plan</th>
                <th className="text-left pb-3 font-medium">Status</th>
                <th className="text-center pb-3 font-medium">Agents</th>
                <th className="text-center pb-3 font-medium">Contacts</th>
                <th className="text-left pb-3 font-medium">Expires</th>
                <th className="pb-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-(--border-color)">
              {filtered.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-(--bg-muted) transition-colors">
                  <td className="py-3 pr-3">
                    <div>
                      <p className="font-semibold text-xs text-(--text-primary)">{tenant.name}</p>
                      <p className="text-[11px] text-(--text-muted)">{tenant.domain}</p>
                    </div>
                  </td>
                  <td className="py-3 pr-3">
                    <Badge variant={planVariant[tenant.plan]} size="sm">
                      {tenant.plan.charAt(0).toUpperCase() + tenant.plan.slice(1)}
                    </Badge>
                  </td>
                  <td className="py-3 pr-3">
                    <Badge variant={statusVariant[tenant.status]} size="sm" dot>
                      {tenant.status}
                    </Badge>
                  </td>
                  <td className="py-3 text-center">
                    <span className="text-xs text-(--text-secondary) flex items-center justify-center gap-1">
                      <Users size={11} /> {tenant.agentCount}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <span className="text-xs text-(--text-secondary)">{tenant.contactCount.toLocaleString()}</span>
                  </td>
                  <td className="py-3 pr-3">
                    <span className={`text-xs ${new Date(tenant.expiresAt) < new Date(Date.now() + 30 * 86400000) ? "text-amber-600 font-medium" : "text-(--text-muted)"}`}>
                      {formatDate(tenant.expiresAt)}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="xs"><Eye size={12} /></Button>
                      <Button variant="ghost" size="xs"><Edit size={12} /></Button>
                      {tenant.status !== "suspended" ? (
                        <Button variant="ghost" size="xs" className="text-red-400"><Ban size={12} /></Button>
                      ) : (
                        <Button variant="ghost" size="xs" className="text-emerald-500"><CheckCircle2 size={12} /></Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
