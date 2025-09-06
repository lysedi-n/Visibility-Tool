'use client';

import React, { useState } from 'react';

interface CompetitorEntry {
  name: string;
  url: string;
}

interface AddCompetitorModalProps {
  isOpen: boolean;
  onAdd: (competitors: CompetitorEntry[]) => void;
  onClose: () => void;
}

export function AddCompetitorModal({
  isOpen,
  onAdd,
  onClose
}: AddCompetitorModalProps) {
  const [competitors, setCompetitors] = useState<CompetitorEntry[]>(
    Array.from({ length: 5 }, () => ({ name: '', url: '' }))
  );

  if (!isOpen) return null;

  const handleChange = (
    index: number,
    field: 'name' | 'url',
    value: string
  ) => {
    setCompetitors((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAdd = () => {
    const validCompetitors = competitors
      .filter((c) => c.name.trim())
      .map((c) => ({ name: c.name.trim(), url: c.url.trim() }));
    if (validCompetitors.length > 0) {
      onAdd(validCompetitors);
    }
  };

  const canAdd = competitors.some((c) => c.name.trim());

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 animate-fade-in">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Add Competitors</h3>
          <div className="space-y-4">
            {competitors.map((comp, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Competitor Name {idx + 1}
                  </label>
                  <input
                    type="text"
                    value={comp.name}
                    onChange={(e) => handleChange(idx, 'name', e.target.value)}
                    placeholder="e.g., Anthropic"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website URL (optional)
                  </label>
                  <input
                    type="text"
                    value={comp.url}
                    onChange={(e) => handleChange(idx, 'url', e.target.value)}
                    placeholder="e.g., anthropic.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAdd}
              disabled={!canAdd}
              className="flex-1 h-10 px-4 rounded-[10px] text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 bg-orange-500 text-white hover:bg-orange-300 dark:bg-orange-500 dark:hover:bg-orange-300 dark:text-white [box-shadow:inset_0px_-2.108433723449707px_0px_0px_#c2410c,_0px_1.2048193216323853px_6.325301647186279px_0px_rgba(234,_88,_12,_58%)] hover:translate-y-[1px] hover:scale-[0.98] hover:[box-shadow:inset_0px_-1px_0px_0px_#c2410c,_0px_1px_3px_0px_rgba(234,_88,_12,_40%)] active:translate-y-[2px] active:scale-[0.97] active:[box-shadow:inset_0px_1px_1px_0px_#c2410c,_0px_1px_2px_0px_rgba(234,_88,_12,_30%)] disabled:shadow-none disabled:hover:translate-y-0 disabled:hover:scale-100"
            >
              Add Competitors
            </button>
            <button
              onClick={onClose}
              className="px-4 h-10 rounded-[10px] text-sm font-medium transition-all duration-200 bg-[#36322F] text-[#fff] hover:bg-[#4a4542] [box-shadow:inset_0px_-2.108433723449707px_0px_0px_#171310,_0px_1.2048193216323853px_6.325301647186279px_0px_rgba(58,_33,_8,_58%)] hover:translate-y-[1px] hover:scale-[0.98] hover:[box-shadow:inset_0px_-1px_0px_0px_#171310,_0px_1px_3px_0px_rgba(58,_33,_8,_40%)] active:translate-y-[2px] active:scale-[0.97] active:[box-shadow:inset_0px_1px_1px_0px_#171310,_0px_1px_2px_0px_rgba(58,_33,_8,_30%)]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

