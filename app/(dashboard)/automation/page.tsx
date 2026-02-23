"use client";
import { useState } from "react";
import {
  Zap, Plus, Play, Pause, Trash2, Edit, MoreHorizontal,
  ArrowRight, Clock, Mail, MessageSquare, Bell, Tag, Users
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const automations = [
  {
    id: "auto_1",
    name: "New Lead Welcome",
    description: "Send welcome message when a new lead is created",
    trigger: "Contact Created",
    actions: ["Send WhatsApp", "Assign to Agent", "Add Tag"],
    status: "active",
    runs: 248,
    lastRun: "2 hours ago",
    category: "onboarding",
  },
  {
    id: "auto_2",
    name: "Payment Reminder",
    description: "Remind clients 7 days before invoice due date",
    trigger: "Invoice Due in 7 Days",
    actions: ["Send Email", "Create Task", "Send WhatsApp"],
    status: "active",
    runs: 64,
    lastRun: "1 day ago",
    category: "billing",
  },
  {
    id: "auto_3",
    name: "Deal Won Notification",
    description: "Notify team when a deal moves to Closed Won",
    trigger: "Deal Stage Changed → Won",
    actions: ["Send Slack", "Create Onboarding Task", "Send Congratulations Email"],
    status: "active",
    runs: 12,
    lastRun: "3 days ago",
    category: "sales",
  },
  {
    id: "auto_4",
    name: "Inactive Lead Follow-up",
    description: "Follow up with leads inactive for 14+ days",
    trigger: "No Contact for 14 Days",
    actions: ["Send Email", "Create Follow-up Task"],
    status: "paused",
    runs: 89,
    lastRun: "2 weeks ago",
    category: "sales",
  },
  {
    id: "auto_5",
    name: "CSAT Survey",
    description: "Send satisfaction survey after ticket is resolved",
    trigger: "Ticket Resolved",
    actions: ["Wait 1 Hour", "Send CSAT Survey"],
    status: "active",
    runs: 312,
    lastRun: "30 minutes ago",
    category: "support",
  },
];

const categoryColors: Record<string, string> = {
  onboarding: "info",
  billing: "warning",
  sales: "success",
  support: "purple",
};

const actionIcons: Record<string, React.ReactNode> = {
  "Send WhatsApp": <MessageSquare size={12} />,
  "Send Email": <Mail size={12} />,
  "Create Task": <Zap size={12} />,
  "Assign to Agent": <Users size={12} />,
  "Add Tag": <Tag size={12} />,
  "Send Slack": <Bell size={12} />,
};

export default function AutomationPage() {
  const [automationList, setAutomationList] = useState(automations);

  const toggleStatus = (id: string) => {
    setAutomationList((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === "active" ? "paused" : "active" } : a
      )
    );
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-(--text-primary)">Workflow Automation</h1>
          <p className="text-sm text-(--text-muted) mt-0.5">
            {automationList.filter(a => a.status === "active").length} active automations running
          </p>
        </div>
        <Button icon={<Plus size={15} />}>New Automation</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Active Workflows", value: automationList.filter(a => a.status === "active").length, color: "text-emerald-600 bg-emerald-50" },
          { label: "Total Runs (30d)", value: automationList.reduce((s, a) => s + a.runs, 0), color: "text-blue-600 bg-blue-50" },
          { label: "Time Saved (est.)", value: "48h", color: "text-purple-600 bg-purple-50" },
        ].map((s) => (
          <Card key={s.label} padding="sm">
            <p className="text-xs text-(--text-muted)">{s.label}</p>
            <p className={cn("font-display text-2xl font-bold mt-1", s.color.split(" ")[0])}>{s.value}</p>
          </Card>
        ))}
      </div>

      {/* Templates prompt */}
      <Card padding="md" className="border-dashed border-2 border-[#1e3a8a]/20 bg-[#1e3a8a]/2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-semibold text-(--text-primary)">Start from a template</h3>
            <p className="text-sm text-(--text-muted) mt-1">20+ pre-built automation templates for common CRM workflows</p>
          </div>
          <Button variant="outline" icon={<ArrowRight size={14} />} iconRight={undefined}>Browse Templates</Button>
        </div>
      </Card>

      {/* Automation list */}
      <div className="space-y-3">
        {automationList.map((auto) => (
          <Card key={auto.id} padding="md" className="hover:shadow-sm transition-all">
            <div className="flex items-start gap-4">
              {/* Status indicator */}
              <div className={cn(
                "mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0",
                auto.status === "active" ? "bg-emerald-50 text-emerald-600" : "bg-(--bg-muted) text-(--text-muted)"
              )}>
                <Zap size={18} />
              </div>

              {/* Main content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold text-sm text-(--text-primary)">{auto.name}</h3>
                      <Badge variant={categoryColors[auto.category] as any} size="sm">{auto.category}</Badge>
                      <Badge variant={auto.status === "active" ? "success" : "warning"} size="sm" dot>
                        {auto.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-(--text-muted) mt-0.5">{auto.description}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => toggleStatus(auto.id)}
                    >
                      {auto.status === "active" ? <Pause size={13} /> : <Play size={13} />}
                    </Button>
                    <Button variant="ghost" size="xs"><Edit size={13} /></Button>
                    <Button variant="ghost" size="xs" className="text-red-400 hover:text-red-500"><Trash2 size={13} /></Button>
                  </div>
                </div>

                {/* Flow visualization */}
                <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                  <div className="flex items-center gap-1.5 bg-[#1e3a8a]/8 border border-[#1e3a8a]/20 text-[#1e3a8a] rounded-lg px-2.5 py-1 text-xs font-medium">
                    <Clock size={11} />
                    {auto.trigger}
                  </div>
                  {auto.actions.map((action, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <ArrowRight size={12} className="text-(--text-muted)" />
                      <div className="flex items-center gap-1.5 bg-(--bg-muted) border border-(--border-color) rounded-lg px-2.5 py-1 text-xs text-(--text-secondary)">
                        {actionIcons[action] || <Zap size={11} />}
                        {action}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-3 text-xs text-(--text-muted)">
                  <span><strong className="text-(--text-secondary)">{auto.runs}</strong> runs</span>
                  <span>Last run: {auto.lastRun}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
