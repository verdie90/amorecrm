"use client";
import { useState } from "react";
import {
  Plus, Search, LayoutGrid, List, MoreHorizontal,
  TrendingUp, Target, DollarSign, Calendar, User
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { StatsCard } from "@/components/ui/misc";
import { mockDeals } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import type { Deal, PipelineStage } from "@/types";

const stages: { id: PipelineStage; label: string; color: string; bg: string }[] = [
  { id: "lead", label: "Lead", color: "#94a3b8", bg: "#f8fafc" },
  { id: "qualified", label: "Qualified", color: "#38bdf8", bg: "#f0f9ff" },
  { id: "proposal", label: "Proposal", color: "#3b82f6", bg: "#eff6ff" },
  { id: "negotiation", label: "Negotiation", color: "#8b5cf6", bg: "#f5f3ff" },
  { id: "closed_won", label: "Won", color: "#10b981", bg: "#f0fdf4" },
];

export default function DealsPage() {
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [search, setSearch] = useState("");
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = mockDeals.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase()) ||
    d.contactName.toLowerCase().includes(search.toLowerCase())
  );

  const totalValue = mockDeals.filter(d => d.stage !== "closed_lost").reduce((s, d) => s + d.value, 0);
  const wonValue = mockDeals.filter(d => d.stage === "closed_won").reduce((s, d) => s + d.value, 0);
  const openDeals = mockDeals.filter(d => d.stage !== "closed_won" && d.stage !== "closed_lost").length;

  const stageVariant: Record<PipelineStage, "default" | "info" | "muted" | "purple" | "success" | "danger"> = {
    lead: "muted",
    qualified: "info",
    proposal: "default",
    negotiation: "purple",
    closed_won: "success",
    closed_lost: "danger",
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-(--text-primary) tracking-tight">Deals</h1>
          <p className="text-sm text-(--text-muted) mt-0.5">{mockDeals.length} total deals</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-0.5 bg-(--bg-muted) rounded-lg p-0.5 border border-(--border-color)">
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === "kanban" ? "bg-(--bg-surface) shadow-sm text-(--text-primary) ring-1 ring-(--border-color)" : "text-(--text-muted) hover:text-(--text-secondary)"}`}
            >
              <LayoutGrid size={15} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-all duration-200 ${viewMode === "list" ? "bg-(--bg-surface) shadow-sm text-(--text-primary) ring-1 ring-(--border-color)" : "text-(--text-muted) hover:text-(--text-secondary)"}`}
            >
              <List size={15} />
            </button>
          </div>
          <Button icon={<Plus size={15} />} onClick={() => setShowAddModal(true)}>
            New Deal
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <StatsCard label="Pipeline Value" value={formatCurrency(totalValue)} change={`${openDeals} open deals`} changeType="neutral" icon={<Target size={18} />} color="blue" />
        <StatsCard label="Won This Month" value={formatCurrency(wonValue)} change="+22% vs last month" changeType="positive" icon={<TrendingUp size={18} />} color="green" />
        <StatsCard label="Avg Deal Size" value={formatCurrency(totalValue / (openDeals || 1))} change="Based on open deals" changeType="neutral" icon={<DollarSign size={18} />} color="purple" />
      </div>

      {/* Search */}
      <div className="flex items-center gap-2">
        <Input
          placeholder="Search deals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search size={14} />}
          className="max-w-xs"
        />
      </div>

      {/* Kanban Board */}
      {viewMode === "kanban" ? (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {stages.map((stage) => {
            const stageDeals = filtered.filter((d) => d.stage === stage.id);
            const stageValue = stageDeals.reduce((s, d) => s + d.value, 0);
            return (
              <div key={stage.id} className="shrink-0 w-64">
                {/* Column Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: stage.color }} />
                    <span className="text-xs font-semibold text-(--text-secondary)">{stage.label}</span>
                    <span className="text-xs text-(--text-muted) bg-(--bg-muted) px-1.5 py-0.5 rounded-full font-medium">
                      {stageDeals.length}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-(--text-primary)">{formatCurrency(stageValue)}</span>
                </div>

                {/* Cards */}
                <div className="space-y-2.5">
                  {stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      onClick={() => setSelectedDeal(deal)}
                      className="bg-(--bg-surface) border border-(--border-color) rounded-xl p-3.5 cursor-pointer hover:shadow-md hover:border-(--border-strong) hover:-translate-y-0.5 transition-all duration-200 group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-xs font-semibold text-(--text-primary) leading-snug flex-1 pr-2">{deal.title}</p>
                        <Button variant="ghost" size="xs" className="opacity-0 group-hover:opacity-100 -mt-0.5 -mr-0.5 transition-opacity" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal size={12} />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <Avatar name={deal.contactName} size="xs" />
                        <span className="text-[11px] text-(--text-muted)">{deal.contactName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-(--text-primary) font-num">{formatCurrency(deal.value)}</span>
                        <span className="text-[10px] text-(--text-muted) font-medium">{deal.probability}%</span>
                      </div>
                      <div className="mt-2 h-1 bg-(--bg-muted) rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${deal.probability}%`, background: stage.color }}
                        />
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        <Calendar size={10} className="text-(--text-muted)" />
                        <span className="text-[10px] text-(--text-muted)">{formatDate(deal.expectedClose)}</span>
                      </div>
                    </div>
                  ))}
                  <button
                    className="w-full py-2 text-xs text-(--text-muted) hover:text-(--text-primary) hover:bg-(--bg-muted) rounded-xl border border-dashed border-(--border-color) transition-colors flex items-center justify-center gap-1"
                    onClick={() => setShowAddModal(true)}
                  >
                    <Plus size={12} /> Add deal
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List view */
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-(--bg-muted)/50 text-xs text-(--text-muted) border-b border-(--border-color)">
                  <th className="text-left px-4 py-3 font-medium">Deal</th>
                  <th className="text-left px-4 py-3 font-medium">Contact</th>
                  <th className="text-left px-4 py-3 font-medium">Stage</th>
                  <th className="text-right px-4 py-3 font-medium">Value</th>
                  <th className="text-center px-4 py-3 font-medium">Win %</th>
                  <th className="text-left px-4 py-3 font-medium">Close Date</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-(--border-color)">
                {filtered.map((deal) => (
                  <tr
                    key={deal.id}
                    className="hover:bg-(--bg-muted)/60 cursor-pointer group transition-colors"
                    onClick={() => setSelectedDeal(deal)}
                  >
                    <td className="px-4 py-3">
                      <p className="font-semibold text-xs text-(--text-primary)">{deal.title}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Avatar name={deal.contactName} size="xs" />
                        <span className="text-xs text-(--text-secondary)">{deal.contactName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={stageVariant[deal.stage]} size="sm">
                        {stages.find(s => s.id === deal.stage)?.label || deal.stage}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="font-bold text-xs text-(--text-primary)">{formatCurrency(deal.value)}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs text-(--text-secondary)">{deal.probability}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-(--text-muted)">{formatDate(deal.expectedClose)}</span>
                    </td>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="xs"><MoreHorizontal size={13} /></Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Deal Detail Modal */}
      {selectedDeal && (
        <Modal
          open={!!selectedDeal}
          onClose={() => setSelectedDeal(null)}
          title={selectedDeal.title}
          size="lg"
        >
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 bg-(--bg-muted) rounded-xl p-4">
              <div>
                <p className="text-xs text-(--text-muted) mb-1">Deal Value</p>
                <p className="text-xl font-bold font-display text-(--text-primary)">{formatCurrency(selectedDeal.value)}</p>
              </div>
              <div>
                <p className="text-xs text-(--text-muted) mb-1">Win Probability</p>
                <p className="text-xl font-bold font-display text-(--text-primary)">{selectedDeal.probability}%</p>
              </div>
              <div>
                <p className="text-xs text-(--text-muted) mb-1">Contact</p>
                <div className="flex items-center gap-2">
                  <Avatar name={selectedDeal.contactName} size="xs" />
                  <span className="text-sm font-medium text-(--text-primary)">{selectedDeal.contactName}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-(--text-muted) mb-1">Expected Close</p>
                <p className="text-sm font-medium text-(--text-primary)">{formatDate(selectedDeal.expectedClose)}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-(--text-muted) uppercase mb-2">Stage</p>
              <div className="flex items-center gap-2">
                {stages.map((s, i) => (
                  <div key={s.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold text-white`}
                      style={{ background: selectedDeal.stage === s.id ? s.color : "var(--border-color)" }}>
                      {i + 1}
                    </div>
                    {i < stages.length - 1 && (
                      <div className="w-8 h-0.5 mx-1" style={{ background: "var(--border-color)" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {selectedDeal.notes && (
              <div>
                <p className="text-xs font-semibold text-(--text-muted) uppercase mb-2">Notes</p>
                <p className="text-sm text-(--text-secondary) bg-(--bg-muted) rounded-xl p-3">{selectedDeal.notes}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="secondary" size="sm">Log Activity</Button>
              <Button size="sm">Edit Deal</Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Deal Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Create New Deal"
        size="md"
        footer={
          <>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={() => setShowAddModal(false)}>Create Deal</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input label="Deal Title" placeholder="e.g. ERP Integration - PT Maju Jaya" />
          <Input label="Contact" placeholder="Search contact..." leftIcon={<User size={14} />} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Deal Value (IDR)" placeholder="150000000" type="number" />
            <div>
              <label className="block text-sm font-medium text-(--text-primary) mb-1.5">Stage</label>
              <select className="w-full h-9 text-sm bg-(--bg-surface) text-(--text-primary) border border-(--border-color) rounded-lg px-3 focus:outline-none">
                {stages.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Win Probability (%)" placeholder="50" type="number" />
            <Input label="Expected Close" type="date" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
