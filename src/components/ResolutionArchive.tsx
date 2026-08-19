import React, { useState } from 'react';
import { History, ShieldCheck, CheckSquare, Search, Award, MapPin, Calendar, Compass, ShieldOff } from 'lucide-react';
import { FeederInterruption, InterruptionStatus, stripBrackets } from '../types';

interface ResolutionArchiveProps {
  interruptions: FeederInterruption[];
}

export default function ResolutionArchive({ interruptions }: ResolutionArchiveProps) {
  const [query, setQuery] = useState('');
  
  // Filter for restored entries
  const restoredItems = interruptions.filter(
    item => item.status === InterruptionStatus.RESTORED &&
    (item.feederName.toLowerCase().includes(query.toLowerCase()) || 
     item.affectedArea.toLowerCase().includes(query.toLowerCase()) ||
     item.remark.toLowerCase().includes(query.toLowerCase()))
  ).slice(0, 20);

  return (
    <div id="resolution-archive-tab" className="space-y-6">
      
      {/* Search Header card */}
      <div className="glass-card rounded-3xl p-6 flex items-center justify-between gap-4 flex-wrap shadow-none">
        <div className="space-y-1">
          <h3 className="font-display font-semibold text-base text-gray-900 dark:text-white flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-eeu-green" />
            <span>Restored Feeders</span>
          </h3>
        </div>

        <div className="relative min-w-[240px]">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
          <input
            id="archive-search"
            type="text"
            placeholder="Search restored feeders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl glass-input text-gray-900 dark:text-white focus:outline-none focus:ring-1.5 focus:ring-eeu-green"
          />
        </div>
      </div>

      {/* Grid listing */}
      {restoredItems.length === 0 ? (
        <div id="archive-empty-panel" className="glass-card rounded-3xl p-12 text-center shadow-none">
          <ShieldOff className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="font-semibold text-sm text-gray-850 dark:text-gray-300">No Restored Feeders Found</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Either all active outages require investigation or the filter keywords didn't match.
          </p>
        </div>
      ) : (
        <div id="archive-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {restoredItems.map((item) => (
            <div
              id={`archive-item-${item.id}`}
              key={item.id}
              className="p-5 glass-card rounded-2xl flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold bg-eeu-green/10 text-eeu-green px-2 py-0.5 rounded-full uppercase">
                    RESOLVED & SUCCESSFUL
                  </span>
                </div>

                <h4 className="font-display font-semibold text-sm text-gray-900 dark:text-white leading-tight">
                  {stripBrackets(item.feederName)}
                </h4>

                <div className="text-xs text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-500 dark:text-gray-400 font-mono text-[9px] block uppercase">
                    Affected Locations Disconnected
                  </span>
                  <p className="leading-relaxed line-clamp-2 mt-0.5">{item.affectedArea}</p>
                </div>
              </div>

              {/* Timestamp outputs */}
              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-850 grid grid-cols-2 gap-2 text-[10px] font-mono text-gray-400 dark:text-gray-500">
                <div>
                  <span className="block font-semibold text-gray-500 dark:text-gray-400 uppercase text-[9px]">Outage Duration Started</span>
                  <span className="text-gray-700 dark:text-gray-300 mt-0.5 block">{item.startTime}</span>
                </div>
                <div>
                  <span className="block font-semibold text-gray-500 dark:text-gray-400 uppercase text-[9px]">Energization Restored At</span>
                  <span className="text-gray-700 dark:text-gray-300 mt-0.5 block">{item.estimatedRestorationTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
