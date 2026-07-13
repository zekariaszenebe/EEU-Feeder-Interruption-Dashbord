import React from 'react';
import { ShieldAlert, Zap, Layers, RefreshCw, AlertTriangle, CalendarRange } from 'lucide-react';
import { FeederInterruption, InterruptionType, InterruptionStatus } from '../types';
import { EarthFaultIcon } from './AgentView';

interface StatsGridProps {
  interruptions: FeederInterruption[];
}

export default function StatsGrid({ interruptions }: StatsGridProps) {
  // Compute metrics dynamically
  const activeCount = interruptions.filter(i => i.status !== InterruptionStatus.RESTORED).length;
  
  const earthFaults = interruptions.filter(
    i => i.status !== InterruptionStatus.RESTORED && i.type === InterruptionType.EARTH_FAULT
  ).length;

  const shortCircuits = interruptions.filter(
    i => i.status !== InterruptionStatus.RESTORED && i.type === InterruptionType.SHORT_CIRCUIT
  ).length;

  const planned = interruptions.filter(
    i => i.status !== InterruptionStatus.RESTORED && (i.type === InterruptionType.PLANNED_INTERRUPTION || i.type === InterruptionType.OPERATIONAL_INTERRUPTION)
  ).length;

  const restoredToday = interruptions.filter(
    i => i.status === InterruptionStatus.RESTORED
  ).length;

  const statCards = [
    {
      id: "stat-total-active",
      title: "Active Outages",
      value: activeCount,
      bgColor: "bg-red-500/10 dark:bg-red-500/5",
      borderColor: "border-red-200 dark:border-red-950/40",
      textColor: "text-red-600 dark:text-red-400 font-bold",
      subtext: "Immediate dispatch team alerted",
      icon: AlertTriangle,
      iconColor: "text-red-500",
      indicator: "right now"
    },
    {
      id: "stat-earth-fault",
      title: "Earth Faults (EF)",
      value: earthFaults,
      bgColor: "bg-amber-500/10 dark:bg-amber-500/5",
      borderColor: "border-amber-200 dark:border-amber-950/40",
      textColor: "text-amber-600 dark:text-amber-400",
      subtext: "Ground patrols dispatched",
      icon: EarthFaultIcon,
      iconColor: "text-amber-500",
      indicator: "right now"
    },
    {
      id: "stat-short-circuit",
      title: "Short Circuit (SC)",
      value: shortCircuits,
      bgColor: "bg-orange-500/10 dark:bg-orange-500/5",
      borderColor: "border-orange-200 dark:border-orange-950/40",
      textColor: "text-orange-600 dark:text-orange-400",
      subtext: "Phase-to-phase contact",
      icon: Zap,
      iconColor: "text-orange-500",
      indicator: "right now"
    },
    {
      id: "stat-planned",
      title: "Planned & OPERATIONAL",
      value: planned,
      bgColor: "bg-blue-500/10 dark:bg-blue-500/5",
      borderColor: "border-blue-200 dark:border-blue-950/40",
      textColor: "text-blue-600 dark:text-blue-400",
      subtext: "Pre-notified clients",
      icon: CalendarRange,
      iconColor: "text-blue-500",
      indicator: "right now"
    }
  ];

  return (
    <div id="statistics-grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            id={card.id}
            key={card.id}
            className={`p-5 rounded-2xl glass-card flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`p-2 rounded-xl bg-gray-50 dark:bg-gray-950`}>
                  <Icon className={`w-4 h-4 ${card.iconColor}`} />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className={`text-3xl font-display font-semibold tracking-tight ${card.textColor}`}>
                  {card.value}
                </span>
                <span className="text-xs font-sans font-bold uppercase py-0.5 px-1.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300">
                  {card.indicator}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
