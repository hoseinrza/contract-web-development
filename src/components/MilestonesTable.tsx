import React from 'react';
import { PaymentMilestone } from '../types';
import { formatCurrencyToman, numberToPersianWords, toPersianDigits, parseNumber } from '../utils/persianNumbers';
import { Plus, Trash2, Coins, CalendarClock, CheckCircle2 } from 'lucide-react';

interface MilestonesTableProps {
  totalAmount: number;
  paymentTermsText: string;
  milestones: PaymentMilestone[];
  isEditing: boolean;
  onTotalAmountChange: (newAmount: number) => void;
  onPaymentTermsTextChange: (text: string) => void;
  onMilestonesChange: (milestones: PaymentMilestone[]) => void;
}

export const MilestonesTable: React.FC<MilestonesTableProps> = ({
  totalAmount,
  paymentTermsText,
  milestones,
  isEditing,
  onTotalAmountChange,
  onPaymentTermsTextChange,
  onMilestonesChange,
}) => {
  const words = numberToPersianWords(totalAmount);

  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const num = parseNumber(rawVal);
    onTotalAmountChange(num);

    // recalculate milestones amounts based on percentages
    const updated = milestones.map((m) => ({
      ...m,
      amount: Math.round((num * m.percentage) / 100),
    }));
    onMilestonesChange(updated);
  };

  const handleMilestoneFieldChange = (
    index: number,
    field: keyof PaymentMilestone,
    value: string | number
  ) => {
    const updated = [...milestones];
    if (field === 'percentage') {
      const pct = Number(value) || 0;
      updated[index] = {
        ...updated[index],
        percentage: pct,
        amount: Math.round((totalAmount * pct) / 100),
      };
    } else if (field === 'amount') {
      const amt = Number(value) || 0;
      const pct = totalAmount > 0 ? Math.round((amt / totalAmount) * 100) : 0;
      updated[index] = {
        ...updated[index],
        amount: amt,
        percentage: pct,
      };
    } else {
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
    }
    onMilestonesChange(updated);
  };

  const addMilestone = () => {
    const newIdx = milestones.length + 1;
    const newMilestone: PaymentMilestone = {
      id: `m-${Date.now()}`,
      title: `مرحله ${newIdx}: تحویل و تست فاز جدید`,
      percentage: 10,
      amount: Math.round((totalAmount * 10) / 100),
      condition: 'تأیید صحت عملکرد خروجی توسط کارفرما',
      dueDate: `فاز ${newIdx}`,
    };
    onMilestonesChange([...milestones, newMilestone]);
  };

  const removeMilestone = (index: number) => {
    if (milestones.length <= 1) return;
    const updated = milestones.filter((_, i) => i !== index);
    onMilestonesChange(updated);
  };

  const totalPercentage = milestones.reduce((sum, m) => sum + (m.percentage || 0), 0);
  const totalMilestonesAmount = milestones.reduce((sum, m) => sum + (m.amount || 0), 0);

  return (
    <div className="space-y-4 mb-8 avoid-break">
      <div className="border-b border-slate-200/80 pb-2">
        <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
          <Coins className="w-5 h-5 text-indigo-600 print:hidden" />
          <span>ماده ۲: مبلغ قرارداد و نحوه پرداخت</span>
        </h3>
      </div>

      {/* مبلغ کل قرارداد مطابق قالب اصلی */}
      <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/70 print:bg-transparent print:border-none print:p-0">
        <div className="flex flex-wrap items-center gap-y-2 text-base text-slate-800 leading-relaxed font-normal">
          <span>مبلغ کل قرارداد برابر است با</span>
          <div className="inline-flex items-center mx-2">
            {isEditing ? (
              <input
                type="text"
                value={formatCurrencyToman(totalAmount)}
                onChange={handleAmountInputChange}
                className="w-48 border-b-2 border-indigo-400 text-center font-bold text-lg text-indigo-700 focus:outline-none focus:border-indigo-600 bg-white/70 rounded px-2 py-0.5 print:bg-transparent print:border-b"
                placeholder="مبلغ به عدد"
              />
            ) : (
              <span className="font-bold text-lg text-indigo-800 px-2 py-0.5">
                {formatCurrencyToman(totalAmount)}
              </span>
            )}
          </div>
          <span className="font-medium">تومان وجه رایج کشور</span>
          <span className="text-slate-500 mx-1">
            (معادل <strong className="text-slate-800 font-semibold">{words}</strong> تومان)
          </span>
          {isEditing ? (
            <input
              type="text"
              value={paymentTermsText}
              onChange={(e) => onPaymentTermsTextChange(e.target.value)}
              className="flex-1 min-w-[200px] border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-500 px-2 py-0.5"
            />
          ) : (
            <span className="font-medium text-slate-700">{paymentTermsText}</span>
          )}
        </div>

        {/* جدول مراحل و فازبندی پرداخت */}
        <div className="mt-5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-xs md:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <CalendarClock className="w-4 h-4 text-indigo-600 print:hidden" />
              جدول زمان‌بندی و مراحل پرداخت اقساط (Milestones):
            </span>
            {isEditing && (
              <button
                type="button"
                onClick={addMilestone}
                className="no-print text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 bg-indigo-50 hover:bg-indigo-100 font-medium px-2.5 py-1 rounded transition"
              >
                <Plus className="w-3.5 h-3.5" />
                افزودن مرحله پرداخت
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs md:text-sm border-collapse border border-slate-200 print:text-xs">
              <thead>
                <tr className="bg-slate-100/90 text-slate-800 font-semibold border-b border-slate-300 print:bg-slate-50">
                  <th className="p-2.5 border-l border-slate-200 w-12 text-center">ردیف</th>
                  <th className="p-2.5 border-l border-slate-200">مرحله و عنوان تحویل</th>
                  <th className="p-2.5 border-l border-slate-200 w-20 text-center">درصد</th>
                  <th className="p-2.5 border-l border-slate-200 w-36 text-center">مبلغ (تومان)</th>
                  <th className="p-2.5 border-l border-slate-200">شرط پرداخت / خروجی مرحله</th>
                  {isEditing && <th className="p-2.5 w-12 text-center no-print">حذف</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white print:bg-transparent">
                {milestones.map((milestone, idx) => (
                  <tr key={milestone.id} className="hover:bg-slate-50/60 print:hover:bg-transparent">
                    <td className="p-2.5 border-l border-slate-200 text-center font-medium text-slate-600">
                      {toPersianDigits(idx + 1)}
                    </td>
                    <td className="p-2.5 border-l border-slate-200 font-medium text-slate-900">
                      {isEditing ? (
                        <input
                          type="text"
                          value={milestone.title}
                          onChange={(e) =>
                            handleMilestoneFieldChange(idx, 'title', e.target.value)
                          }
                          className="w-full border-b border-transparent hover:border-slate-300 focus:border-indigo-500 bg-transparent focus:outline-none py-0.5"
                        />
                      ) : (
                        <span>{milestone.title}</span>
                      )}
                    </td>
                    <td className="p-2.5 border-l border-slate-200 text-center font-semibold text-indigo-700">
                      {isEditing ? (
                        <div className="flex items-center justify-center gap-1">
                          <input
                            type="number"
                            min="1"
                            max="100"
                            value={milestone.percentage}
                            onChange={(e) =>
                              handleMilestoneFieldChange(idx, 'percentage', e.target.value)
                            }
                            className="w-12 text-center border-b border-slate-300 focus:outline-none focus:border-indigo-500 py-0.5"
                          />
                          <span>٪</span>
                        </div>
                      ) : (
                        <span>{toPersianDigits(milestone.percentage)}٪</span>
                      )}
                    </td>
                    <td className="p-2.5 border-l border-slate-200 text-center font-bold text-slate-800">
                      {isEditing ? (
                        <input
                          type="text"
                          value={formatCurrencyToman(milestone.amount)}
                          onChange={(e) => {
                            const num = parseNumber(e.target.value);
                            handleMilestoneFieldChange(idx, 'amount', num);
                          }}
                          className="w-28 text-center border-b border-slate-300 focus:outline-none focus:border-indigo-500 py-0.5 text-xs font-semibold"
                        />
                      ) : (
                        <span>{formatCurrencyToman(milestone.amount)}</span>
                      )}
                    </td>
                    <td className="p-2.5 border-l border-slate-200 text-slate-600 text-xs leading-relaxed">
                      {isEditing ? (
                        <input
                          type="text"
                          value={milestone.condition}
                          onChange={(e) =>
                            handleMilestoneFieldChange(idx, 'condition', e.target.value)
                          }
                          className="w-full border-b border-transparent hover:border-slate-300 focus:border-indigo-500 bg-transparent focus:outline-none py-0.5 text-xs"
                        />
                      ) : (
                        <span>{milestone.condition}</span>
                      )}
                    </td>
                    {isEditing && (
                      <td className="p-2.5 text-center no-print">
                        <button
                          type="button"
                          onClick={() => removeMilestone(idx)}
                          disabled={milestones.length <= 1}
                          className="text-slate-400 hover:text-red-600 disabled:opacity-30 transition p-1"
                          title="حذف مرحله"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-slate-100/70 font-bold text-slate-800 border-t-2 border-slate-300 print:bg-transparent">
                  <td colSpan={2} className="p-2.5 text-left border-l border-slate-200">
                    مجموع اقساط:
                  </td>
                  <td
                    className={`p-2.5 text-center border-l border-slate-200 ${
                      totalPercentage === 100 ? 'text-emerald-700' : 'text-amber-600'
                    }`}
                  >
                    {toPersianDigits(totalPercentage)}٪
                  </td>
                  <td className="p-2.5 text-center border-l border-slate-200 text-indigo-900 font-extrabold">
                    {formatCurrencyToman(totalMilestonesAmount)}
                  </td>
                  <td colSpan={isEditing ? 2 : 1} className="p-2.5 text-xs text-slate-500">
                    {totalPercentage === 100 ? (
                      <span className="text-emerald-700 flex items-center gap-1 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 print:hidden" />
                        تطابق کامل ۱۰۰٪ با سقف کل قرارداد
                      </span>
                    ) : (
                      <span className="text-amber-700 font-medium">
                        توجه: مجموع درصدهای مراحل باید دقیقاً ۱۰۰٪ باشد.
                      </span>
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
