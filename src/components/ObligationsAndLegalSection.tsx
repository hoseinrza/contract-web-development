import React, { useState } from 'react';
import { ContractData } from '../types';
import {
  Clock,
  ShieldAlert,
  FileCheck2,
  Lock,
  Wrench,
  Scale,
  Plus,
  Trash2,
  FileEdit,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ObligationsAndLegalSectionProps {
  data: ContractData;
  isEditing: boolean;
  onUpdate: <K extends keyof ContractData>(field: K, value: ContractData[K]) => void;
}

export const ObligationsAndLegalSection: React.FC<ObligationsAndLegalSectionProps> = ({
  data,
  isEditing,
  onUpdate,
}) => {
  const [showAllArticles, setShowAllArticles] = useState(true);

  // Client Obligations
  const updateClientObligation = (index: number, val: string) => {
    const list = [...data.clientObligations];
    list[index] = val;
    onUpdate('clientObligations', list);
  };

  const addClientObligation = () => {
    onUpdate('clientObligations', [
      ...data.clientObligations,
      'تعهد جدید کارفرما در خصوص پروژه',
    ]);
  };

  const removeClientObligation = (index: number) => {
    onUpdate(
      'clientObligations',
      data.clientObligations.filter((_, i) => i !== index)
    );
  };

  // Contractor Obligations
  const updateContractorObligation = (index: number, val: string) => {
    const list = [...data.contractorObligations];
    list[index] = val;
    onUpdate('contractorObligations', list);
  };

  const addContractorObligation = () => {
    onUpdate('contractorObligations', [
      ...data.contractorObligations,
      'تعهد جدید مجری در خصوص استاندارد کد یا پشتیبانی',
    ]);
  };

  const removeContractorObligation = (index: number) => {
    onUpdate(
      'contractorObligations',
      data.contractorObligations.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6 mb-8 text-slate-700 leading-relaxed text-sm md:text-base">
      {/* ماده ۳: مدت و زمان‌بندی قرارداد */}
      <div className="avoid-break">
        <div className="border-b border-slate-200/80 pb-2 mb-3">
          <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600 print:hidden" />
            <span>ماده ۳: مدت زمان و برنامه زمان‌بندی قرارداد</span>
          </h3>
        </div>

        <div className="bg-slate-50 border border-slate-200/70 p-4 rounded-xl print:bg-transparent print:border-none print:p-0">
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm leading-loose">
            <span>مدت زمان اجرای موضوع قرارداد از تاریخ</span>
            {isEditing ? (
              <input
                type="text"
                value={data.startDate}
                onChange={(e) => onUpdate('startDate', e.target.value)}
                className="w-28 text-center border-b border-slate-300 focus:outline-none focus:border-indigo-500 font-semibold"
                placeholder="۱۴۰۳/۰۷/۰۱"
              />
            ) : (
              <span className="font-bold text-slate-900 px-1">{data.startDate}</span>
            )}

            <span>لغایت</span>
            {isEditing ? (
              <input
                type="text"
                value={data.endDate}
                onChange={(e) => onUpdate('endDate', e.target.value)}
                className="w-28 text-center border-b border-slate-300 focus:outline-none focus:border-indigo-500 font-semibold"
                placeholder="۱۴۰۳/۰۹/۰۱"
              />
            ) : (
              <span className="font-bold text-slate-900 px-1">{data.endDate}</span>
            )}

            <span>(به مدت معادل</span>
            {isEditing ? (
              <input
                type="number"
                min="1"
                max="24"
                value={data.durationMonths}
                onChange={(e) => onUpdate('durationMonths', Number(e.target.value) || 1)}
                className="w-14 text-center border-b border-slate-300 focus:outline-none focus:border-indigo-500 font-semibold"
              />
            ) : (
              <span className="font-bold text-slate-900 px-1">{data.durationMonths}</span>
            )}
            <span>ماه شمسی) تعیین می‌گردد.</span>
          </div>

          <div className="mt-2 text-xs text-slate-500 flex items-center gap-2">
            <span>تبصره:</span>
            {isEditing ? (
              <input
                type="text"
                value={data.timelineNotes}
                onChange={(e) => onUpdate('timelineNotes', e.target.value)}
                className="flex-1 border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-500 py-0.5 text-xs text-slate-600"
              />
            ) : (
              <span>{data.timelineNotes}</span>
            )}
          </div>
        </div>
      </div>

      {/* کنترل دکمه نمایش/مخفی‌سازی بندهای حقوقی تفصیلی */}
      <div className="no-print flex justify-end">
        <button
          type="button"
          onClick={() => setShowAllArticles(!showAllArticles)}
          className="text-xs text-slate-600 hover:text-indigo-600 flex items-center gap-1 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition"
        >
          {showAllArticles ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              فشرده‌سازی بندهای تفصیلی (تعهدات، محرمانگی و گارانتی)
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              نمایش تمام بندهای حقوقی تفصیلی (تعهدات، محرمانگی و گارانتی)
            </>
          )}
        </button>
      </div>

      {showAllArticles && (
        <>
          {/* ماده ۴: تعهدات طرفین قرارداد */}
          <div className="avoid-break space-y-3">
            <div className="border-b border-slate-200/80 pb-2">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-indigo-600 print:hidden" />
                <span>ماده ۴: تعهدات طرفین</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* تعهدات کارفرما */}
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60 print:bg-transparent print:border-none print:p-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs md:text-sm text-slate-800">
                    الف) تعهدات کارفرما:
                  </span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={addClientObligation}
                      className="no-print text-indigo-600 hover:text-indigo-800 text-xs flex items-center gap-1 font-medium"
                    >
                      <Plus className="w-3 h-3" />
                      افزودن
                    </button>
                  )}
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {data.clientObligations.map((ob, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold mt-0.5">•</span>
                      {isEditing ? (
                        <div className="flex-1 flex items-center gap-1">
                          <input
                            type="text"
                            value={ob}
                            onChange={(e) => updateClientObligation(idx, e.target.value)}
                            className="flex-1 border-b border-slate-200 focus:outline-none focus:border-indigo-500 py-0.5 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => removeClientObligation(idx)}
                            className="no-print text-slate-400 hover:text-red-600 p-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="flex-1 leading-relaxed">{ob}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* تعهدات مجری */}
              <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60 print:bg-transparent print:border-none print:p-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs md:text-sm text-slate-800">
                    ب) تعهدات مجری / معمار UI:
                  </span>
                  {isEditing && (
                    <button
                      type="button"
                      onClick={addContractorObligation}
                      className="no-print text-indigo-600 hover:text-indigo-800 text-xs flex items-center gap-1 font-medium"
                    >
                      <Plus className="w-3 h-3" />
                      افزودن
                    </button>
                  )}
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {data.contractorObligations.map((ob, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-indigo-600 font-bold mt-0.5">•</span>
                      {isEditing ? (
                        <div className="flex-1 flex items-center gap-1">
                          <input
                            type="text"
                            value={ob}
                            onChange={(e) => updateContractorObligation(idx, e.target.value)}
                            className="flex-1 border-b border-slate-200 focus:outline-none focus:border-indigo-500 py-0.5 text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => removeContractorObligation(idx)}
                            className="no-print text-slate-400 hover:text-red-600 p-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <span className="flex-1 leading-relaxed">{ob}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ماده ۵: مالکیت فکری و محرمانگی (IP & NDA) */}
          <div className="avoid-break">
            <div className="border-b border-slate-200/80 pb-2 mb-2">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-indigo-600 print:hidden" />
                <span>ماده ۵: مالکیت معنوی، سورس‌کد و محرمانگی اطلاعات (NDA)</span>
              </h3>
            </div>
            {isEditing ? (
              <textarea
                value={data.ipAndNdaTerms}
                onChange={(e) => onUpdate('ipAndNdaTerms', e.target.value)}
                rows={2}
                className="w-full p-2.5 rounded border border-slate-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs md:text-sm leading-relaxed"
              />
            ) : (
              <p className="text-justify text-xs md:text-sm leading-relaxed">
                {data.ipAndNdaTerms}
              </p>
            )}
          </div>

          {/* ماده ۶: گارانتی و دوره پشتیبانی */}
          <div className="avoid-break">
            <div className="border-b border-slate-200/80 pb-2 mb-2">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-indigo-600 print:hidden" />
                <span>ماده ۶: گارانتی، رفع نقص و پشتیبانی فنی</span>
              </h3>
            </div>
            {isEditing ? (
              <textarea
                value={data.warrantyTerms}
                onChange={(e) => onUpdate('warrantyTerms', e.target.value)}
                rows={2}
                className="w-full p-2.5 rounded border border-slate-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs md:text-sm leading-relaxed"
              />
            ) : (
              <p className="text-justify text-xs md:text-sm leading-relaxed">
                {data.warrantyTerms}
              </p>
            )}
          </div>

          {/* ماده ۷: حل اختلاف و فورس‌ماژور */}
          <div className="avoid-break">
            <div className="border-b border-slate-200/80 pb-2 mb-2">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-indigo-600 print:hidden" />
                <span>ماده ۷: حل اختلاف و قوانین حاکم</span>
              </h3>
            </div>
            {isEditing ? (
              <textarea
                value={data.disputeResolution}
                onChange={(e) => onUpdate('disputeResolution', e.target.value)}
                rows={2}
                className="w-full p-2.5 rounded border border-slate-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs md:text-sm leading-relaxed"
              />
            ) : (
              <p className="text-justify text-xs md:text-sm leading-relaxed">
                {data.disputeResolution}
              </p>
            )}
          </div>
        </>
      )}

      {/* بخش توضیحات تکمیلی / الحاقیه دقیقا مطابق درخواست کاربر */}
      <div className="avoid-break mt-6">
        <div className="border-b border-slate-200/80 pb-2 mb-2">
          <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
            <FileEdit className="w-5 h-5 text-indigo-600 print:hidden" />
            <span>توضیحات تکمیلی / الحاقیه</span>
          </h3>
        </div>
        <textarea
          value={data.additionalNotes}
          onChange={(e) => onUpdate('additionalNotes', e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3.5 mt-2 h-28 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 print:bg-transparent text-sm leading-relaxed placeholder:text-slate-400"
          placeholder="هرگونه شرط اضافی یا جزئیات فنی را اینجا تایپ کنید..."
        ></textarea>
      </div>

      {/* تبصره نسخ قرارداد */}
      <div className="text-xs text-slate-500 text-center border-t border-slate-200 pt-3 avoid-break">
        این قرارداد در ۷ ماده و ۲ نسخه با اعتبار حقوقی واحد تنظیم، امضا و مبادله گردید.
      </div>
    </div>
  );
};
