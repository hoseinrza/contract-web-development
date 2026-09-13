import React from 'react';
import { TechnicalDeliverable } from '../types';
import { Code2, Layers, CheckSquare, Square, Plus, Trash2 } from 'lucide-react';

interface TechnicalDeliverablesSectionProps {
  subjectTitle: string;
  subjectDescription: string;
  technicalStack: string;
  deliverables: TechnicalDeliverable[];
  isEditing: boolean;
  onSubjectTitleChange: (val: string) => void;
  onSubjectDescriptionChange: (val: string) => void;
  onTechnicalStackChange: (val: string) => void;
  onDeliverablesChange: (deliverables: TechnicalDeliverable[]) => void;
}

export const TechnicalDeliverablesSection: React.FC<TechnicalDeliverablesSectionProps> = ({
  subjectTitle,
  subjectDescription,
  technicalStack,
  deliverables,
  isEditing,
  onSubjectTitleChange,
  onSubjectDescriptionChange,
  onTechnicalStackChange,
  onDeliverablesChange,
}) => {
  const toggleDeliverable = (id: string) => {
    const updated = deliverables.map((d) =>
      d.id === id ? { ...d, isIncluded: !d.isIncluded } : d
    );
    onDeliverablesChange(updated);
  };

  const updateDeliverable = (
    id: string,
    field: keyof TechnicalDeliverable,
    value: string | boolean
  ) => {
    const updated = deliverables.map((d) =>
      d.id === id ? { ...d, [field]: value } : d
    );
    onDeliverablesChange(updated);
  };

  const addDeliverable = () => {
    const newD: TechnicalDeliverable = {
      id: `d-${Date.now()}`,
      title: 'خروجی معماری یا ویژگی جدید',
      description: 'شرح جزئیات فنی و خروجی قابل استقرار',
      isIncluded: true,
    };
    onDeliverablesChange([...deliverables, newD]);
  };

  const removeDeliverable = (id: string) => {
    onDeliverablesChange(deliverables.filter((d) => d.id !== id));
  };

  return (
    <div className="space-y-4 mb-8 avoid-break">
      <div className="border-b border-slate-200/80 pb-2">
        {isEditing ? (
          <input
            type="text"
            value={subjectTitle}
            onChange={(e) => onSubjectTitleChange(e.target.value)}
            className="font-bold text-lg text-slate-900 border-b border-indigo-300 focus:border-indigo-600 bg-transparent focus:outline-none w-full"
          />
        ) : (
          <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-600 print:hidden" />
            <span>{subjectTitle}</span>
          </h3>
        )}
      </div>

      <div className="text-slate-700 leading-loose text-justify text-sm md:text-base">
        {isEditing ? (
          <textarea
            value={subjectDescription}
            onChange={(e) => onSubjectDescriptionChange(e.target.value)}
            rows={3}
            className="w-full p-2.5 rounded border border-slate-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm leading-relaxed"
          />
        ) : (
          <p className="font-normal">{subjectDescription}</p>
        )}
      </div>

      {/* پیوست مشخصات معماری و استک فنی */}
      <div className="bg-slate-50 border border-slate-200/70 p-4 rounded-xl print:bg-transparent print:border-slate-200 print:p-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2 mb-3">
          <span className="text-xs md:text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-indigo-600 print:hidden" />
            پشته فناوری و استانداردهای معماری (Tech Stack & Architecture):
          </span>
          {isEditing && (
            <button
              type="button"
              onClick={addDeliverable}
              className="no-print text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 font-medium px-2 py-0.5 rounded transition"
            >
              <Plus className="w-3.5 h-3.5" />
              افزودن خروجی فنی
            </button>
          )}
        </div>

        <div className="text-xs md:text-sm mb-3.5 flex items-center gap-2">
          <span className="text-slate-600 font-medium shrink-0">تکنولوژی‌های پایه:</span>
          {isEditing ? (
            <input
              type="text"
              value={technicalStack}
              onChange={(e) => onTechnicalStackChange(e.target.value)}
              className="flex-1 border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-600 py-0.5 text-slate-800 font-mono text-xs dir-ltr text-right"
              placeholder="React / Next.js, TypeScript, Tailwind CSS, Swagger..."
            />
          ) : (
            <span className="font-mono text-xs font-semibold text-slate-900 bg-white/80 px-2 py-1 rounded border border-slate-200 print:border-none print:p-0">
              {technicalStack}
            </span>
          )}
        </div>

        {/* لیست خروجی‌های فنی و تعهدات معماری */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
          {deliverables.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-2 p-2 rounded-lg border transition ${
                item.isIncluded
                  ? 'bg-white border-slate-200 print:border-slate-100'
                  : 'bg-slate-100/50 border-dashed border-slate-300 opacity-60 print:hidden'
              }`}
            >
              {isEditing ? (
                <button
                  type="button"
                  onClick={() => toggleDeliverable(item.id)}
                  className="mt-0.5 text-indigo-600 shrink-0 hover:text-indigo-800 no-print"
                >
                  {item.isIncluded ? (
                    <CheckSquare className="w-4 h-4" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400" />
                  )}
                </button>
              ) : (
                <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 shrink-0 print:bg-slate-700"></span>
              )}

              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateDeliverable(item.id, 'title', e.target.value)}
                      className="w-full font-bold text-slate-800 border-b border-transparent hover:border-slate-300 focus:border-indigo-500 bg-transparent focus:outline-none py-0.5 text-xs"
                    />
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        updateDeliverable(item.id, 'description', e.target.value)
                      }
                      className="w-full text-slate-500 border-b border-transparent hover:border-slate-300 focus:border-indigo-500 bg-transparent focus:outline-none py-0.5 text-[11px]"
                    />
                  </>
                ) : (
                  <>
                    <div className="font-semibold text-slate-800">{item.title}</div>
                    <div className="text-slate-500 text-[11px] leading-relaxed">
                      {item.description}
                    </div>
                  </>
                )}
              </div>

              {isEditing && (
                <button
                  type="button"
                  onClick={() => removeDeliverable(item.id)}
                  className="no-print text-slate-400 hover:text-red-600 p-0.5 transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
