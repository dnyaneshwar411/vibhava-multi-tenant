'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Building2,
  DollarSign,
  KanbanSquare,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpRight,
  Wrench,
  Calendar,
} from 'lucide-react';
import { fadeUp, staggerContainer, viewportConfig } from '@/lib/animations';

type TabId = 'properties' | 'financials' | 'maintenance';

const tabs: { id: TabId; label: string; icon: typeof Building2 }[] = [
  { id: 'properties', label: 'Properties', icon: Building2 },
  { id: 'financials', label: 'Financials', icon: DollarSign },
  { id: 'maintenance', label: 'Kanban Maintenance', icon: KanbanSquare },
];

export default function DashboardShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>('properties');

  return (
    <section
      id="showcase"
      className="relative py-24 lg:py-32 border-t border-white/10"
    >
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-25" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] ambient-teal pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-white/10 rounded-sm bg-white/[0.02]"
          >
            <span className="text-[11px] text-white/45 tracking-wide font-medium uppercase">
              Product Proof
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="mt-6 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] text-white"
          >
            One platform.
            <br />
            <span className="text-gold">Total operational control.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-5 text-base text-white/40 leading-relaxed tracking-tight font-light"
          >
            Switch between the three pillars of estate management and see how
            Vibhava unifies them into a single source of truth.
          </motion.p>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-12 flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-1 border border-white/10 rounded-sm p-1 bg-white/[0.02]">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wide uppercase rounded-sm transition-colors duration-300 ${
                  activeTab === tab.id
                    ? 'text-ink'
                    : 'text-white/45 hover:text-white/80'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="showcase-tab-bg"
                    className="absolute inset-0 bg-gold rounded-sm"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <tab.icon className="relative w-3.5 h-3.5" />
                <span className="relative">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 relative border border-white/10 rounded-sm bg-gradient-to-b from-white/[0.025] to-transparent overflow-hidden"
        >
          {/* Window chrome */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/30">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35 font-medium tracking-wide uppercase">
                Vibhava · {activeTab}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-gold/60 font-medium tracking-wide">
                ● SYNCED
              </span>
              <span className="text-[10px] text-white/25 tracking-wide">
                Real-time
              </span>
            </div>
          </div>

          {/* Canvas body */}
          <div className="relative min-h-[440px] p-6 lg:p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'properties' && <PropertiesView key="properties" />}
              {activeTab === 'financials' && <FinancialsView key="financials" />}
              {activeTab === 'maintenance' && (
                <MaintenanceView key="maintenance" />
              )}
            </AnimatePresence>
          </div>

          {/* Scan line */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent animate-scan-line" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --- Properties View --- */
function PropertiesView() {
  const properties = [
    { name: 'The Ashford', units: 24, occ: 96, rent: '$3,200', status: 'Stable' },
    { name: 'Marlowe House', units: 18, occ: 100, rent: '$2,850', status: 'Full' },
    { name: 'Greystone Mews', units: 32, occ: 91, rent: '$3,450', status: 'Stable' },
    { name: 'Belvedere Court', units: 12, occ: 83, rent: '$4,100', status: 'Attention' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] text-white/35 font-medium tracking-wide uppercase">
          Portfolio · 4 Properties · 86 Units
        </span>
        <span className="text-[10px] text-gold/60 font-medium tracking-wide">
          92.5% AVG OCCUPANCY
        </span>
      </div>

      <div className="border border-white/10 rounded-sm overflow-hidden">
        <div className="grid grid-cols-5 px-4 py-2.5 bg-white/[0.02] border-b border-white/10">
          {['Property', 'Units', 'Occupancy', 'Avg Rent', 'Status'].map((h) => (
            <span
              key={h}
              className="text-[10px] text-white/30 font-medium tracking-wide uppercase"
            >
              {h}
            </span>
          ))}
        </div>
        {properties.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="grid grid-cols-5 px-4 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors items-center"
          >
            <span className="text-sm text-white/80 font-medium tracking-tight">
              {p.name}
            </span>
            <span className="text-xs text-white/40 font-light">{p.units}</span>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden max-w-[50px]">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${p.occ}%` }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.7 }}
                  className={`h-full rounded-full ${
                    p.occ >= 95 ? 'bg-gold/60' : 'bg-white/30'
                  }`}
                />
              </div>
              <span className="text-xs text-white/50 font-light">{p.occ}%</span>
            </div>
            <span className="text-xs text-white/50 font-light font-serif">
              {p.rent}
            </span>
            <span
              className={`text-[10px] font-medium tracking-wide uppercase ${
                p.status === 'Full'
                  ? 'text-gold/70'
                  : p.status === 'Attention'
                  ? 'text-red-400/70'
                  : 'text-white/40'
              }`}
            >
              {p.status}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Summary cards */}
      <div className="mt-5 grid grid-cols-3 gap-3">
        <SummaryCard
          icon={Building2}
          label="Total Properties"
          value="4"
        />
        <SummaryCard icon={Users} label="Total Units" value="86" />
        <SummaryCard
          icon={TrendingUp}
          label="Portfolio NOI"
          value="$1.40M"
          accent
        />
      </div>
    </motion.div>
  );
}

/* --- Financials View --- */
function FinancialsView() {
  const ledger = [
    { desc: 'Rent receipts — Sept', type: 'income', amount: '+$248,400' },
    { desc: 'Maintenance — vendor invoices', type: 'expense', amount: '−$18,200' },
    { desc: 'Owner distribution — Q3', type: 'distribution', amount: '−$186,000' },
    { desc: 'Late fees collected', type: 'income', amount: '+$3,240' },
    { desc: 'Insurance — annual premium', type: 'expense', amount: '−$12,800' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="grid lg:grid-cols-5 gap-5"
    >
      {/* Left: ledger */}
      <div className="lg:col-span-3">
        <div className="text-[10px] text-white/35 font-medium tracking-wide uppercase mb-4">
          Ledger · September 2026
        </div>
        <div className="border border-white/10 rounded-sm overflow-hidden">
          {ledger.map((entry, i) => (
            <motion.div
              key={entry.desc}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex items-center justify-between px-4 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    entry.type === 'income'
                      ? 'bg-gold/60'
                      : entry.type === 'distribution'
                      ? 'bg-teal-400/60'
                      : 'bg-white/30'
                  }`}
                />
                <span className="text-xs text-white/60 tracking-tight">
                  {entry.desc}
                </span>
              </div>
              <span
                className={`text-xs font-medium font-serif ${
                  entry.amount.startsWith('+')
                    ? 'text-gold/80'
                    : entry.type === 'distribution'
                    ? 'text-teal-400/70'
                    : 'text-white/50'
                }`}
              >
                {entry.amount}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right: P&L summary */}
      <div className="lg:col-span-2 space-y-4">
        <div className="border border-white/10 rounded-sm p-5 bg-black/30">
          <div className="text-[10px] text-white/35 font-medium tracking-wide uppercase mb-4">
            P&amp;L Summary · YTD
          </div>
          <div className="space-y-3">
            <PnlRow label="Gross Rental Income" value="$2,240,000" />
            <PnlRow label="Operating Expenses" value="−$612,000" muted />
            <div className="h-px bg-white/10 my-1" />
            <PnlRow label="Net Operating Income" value="$1,628,000" accent />
            <PnlRow label="Owner Distributions" value="−$1,200,000" muted />
            <div className="h-px bg-white/10 my-1" />
            <PnlRow
              label="Retained Reserves"
              value="$428,000"
              accent
            />
          </div>
        </div>

        <div className="border border-gold/20 rounded-sm p-4 bg-gold/[0.03] gold-glow">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-gold/70" />
            <span className="text-xs text-white/60 tracking-tight">
              All ledgers reconciled. Statements audit-ready.
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* --- Maintenance View --- */
function MaintenanceView() {
  const columns = [
    {
      title: 'Requested',
      items: [
        { id: '#1042', desc: 'Leaking faucet — Unit 3B', priority: 'high' },
        { id: '#1043', desc: 'HVAC service — Unit 1A', priority: 'medium' },
      ],
    },
    {
      title: 'In Progress',
      items: [
        { id: '#1039', desc: 'Roof inspection — Greystone', priority: 'medium' },
        { id: '#1041', desc: 'Electrical — Unit 2C', priority: 'high' },
      ],
    },
    {
      title: 'Resolved',
      items: [
        { id: '#1037', desc: 'Lock replacement — Unit 4D', priority: 'low' },
        { id: '#1036', desc: 'Pest control — Unit 1B', priority: 'low' },
        { id: '#1035', desc: 'Window seal — Unit 2A', priority: 'low' },
      ],
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] text-white/35 font-medium tracking-wide uppercase">
          Maintenance Board · 7 Active Tickets
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-gold/60 font-medium tracking-wide">
            AVG RESOLUTION: 4.2H
          </span>
          <span className="text-[10px] text-white/25 tracking-wide">
            ↓ 25% FASTER
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {columns.map((col, ci) => (
          <div key={col.title} className="space-y-2.5">
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] text-white/40 font-medium tracking-wide uppercase">
                {col.title}
              </span>
              <span className="text-[10px] text-white/25 font-light">
                {col.items.length}
              </span>
            </div>
            {col.items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 + i * 0.08, duration: 0.4 }}
                className={`border rounded-sm p-3.5 bg-black/30 hover:bg-white/[0.02] transition-colors cursor-pointer ${
                  col.title === 'Resolved'
                    ? 'border-white/5'
                    : 'border-white/10 hover:border-gold/25'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-white/30 font-mono tracking-tight">
                    {item.id}
                  </span>
                  <span
                    className={`text-[9px] font-medium tracking-wide uppercase ${
                      item.priority === 'high'
                        ? 'text-red-400/70'
                        : item.priority === 'medium'
                        ? 'text-gold/60'
                        : 'text-white/30'
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>
                <p className="text-xs text-white/65 tracking-tight leading-relaxed">
                  {item.desc}
                </p>
                {col.title !== 'Resolved' && (
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/5">
                    {col.title === 'In Progress' ? (
                      <>
                        <Clock className="w-3 h-3 text-gold/50" />
                        <span className="text-[10px] text-white/35 tracking-tight">
                          Vendor dispatched
                        </span>
                      </>
                    ) : (
                      <>
                        <Wrench className="w-3 h-3 text-white/30" />
                        <span className="text-[10px] text-white/35 tracking-tight">
                          Awaiting triage
                        </span>
                      </>
                    )}
                  </div>
                )}
                {col.title === 'Resolved' && (
                  <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/5">
                    <CheckCircle2 className="w-3 h-3 text-gold/50" />
                    <span className="text-[10px] text-white/35 tracking-tight">
                      Closed in 3.8h
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* --- Shared sub-components --- */
function SummaryCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="border border-white/10 rounded-sm p-4 bg-black/30">
      <div className="flex items-center gap-1.5 mb-2">
        <Icon className="w-3 h-3 text-white/30" />
        <span className="text-[9px] text-white/35 font-medium tracking-wide uppercase">
          {label}
        </span>
      </div>
      <div
        className={`font-serif text-xl font-semibold ${
          accent ? 'text-gold' : 'text-white'
        }`}
      >
        {value}
      </div>
    </div>
  );
}

function PnlRow({
  label,
  value,
  muted,
  accent,
}: {
  label: string;
  value: string;
  muted?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/45 tracking-tight font-light">
        {label}
      </span>
      <span
        className={`text-sm font-medium font-serif ${
          accent ? 'text-gold' : muted ? 'text-white/50' : 'text-white/80'
        }`}
      >
        {value}
      </span>
    </div>
  );
}
