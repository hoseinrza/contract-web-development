import React, { useState } from 'react';
import { PartyInfo } from '../types';
import { ChevronDown, ChevronUp, User, Building2, Phone, CreditCard, Mail, MapPin } from 'lucide-react';

interface PartiesSectionProps {
  client: PartyInfo;
  contractor: PartyInfo;
  isEditing: boolean;
  onClientChange: (field: keyof PartyInfo, value: string) => void;
  onContractorChange: (field: keyof PartyInfo, value: string) => void;
}

export const PartiesSection: React.FC<PartiesSectionProps> = ({
  client,
  contractor,
  isEditing,
  onClientChange,
  onContractorChange,
}) => {
  const [showExtendedFields, setShowExtendedFields] = useState(false);

  return (
    <div className="mb-8 avoid-break">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="w-2.5 h-6 bg-indigo-600 rounded-sm inline-block print:hidden"></span>
          مشخصات طرفین قرارداد
        </h2>
        <button
          type="button"
          onClick={() => setShowExtendedFields(!showExtendedFields)}
          className="no-print text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1 font-medium px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 transition"
        >
          {showExtendedFields ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" />
              مخفی‌سازی فیلدهای تکمیلی (آدرس و ایمیل)
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" />
              افزودن نشانی، ایمیل و نماینده قانونی
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* ۱. کارفرما */}
        <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-xl print:bg-transparent print:border-none print:p-0 transition-all">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600 print:hidden" />
              <span>۱. کارفرما</span>
            </h3>
            <span className="text-xs text-slate-500 font-normal print:hidden">
              (طرف اول قرارداد)
            </span>
          </div>

          <div className="space-y-3.5 text-sm">
            <div className="flex items-center">
              <label className="w-28 text-slate-600 font-medium shrink-0 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                نام / شرکت:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={client.name}
                  onChange={(e) => onClientChange('name', e.target.value)}
                  placeholder="نام شخص حقیقی یا حقوقی کارفرما"
                  className="flex-1 border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-600 py-1 text-slate-800 placeholder:text-slate-400 font-medium"
                />
              ) : (
                <span className="flex-1 font-semibold text-slate-900 border-b border-transparent py-1">
                  {client.name || '---'}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <label className="w-28 text-slate-600 font-medium shrink-0 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                کد/شناسه ملی:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={client.nationalId}
                  onChange={(e) => onClientChange('nationalId', e.target.value)}
                  placeholder="کد ملی یا شناسه ثبت شرکت"
                  className="flex-1 border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-600 py-1 text-slate-800 placeholder:text-slate-400"
                />
              ) : (
                <span className="flex-1 font-medium text-slate-900 border-b border-transparent py-1">
                  {client.nationalId || '---'}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <label className="w-28 text-slate-600 font-medium shrink-0 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                شماره تماس:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={client.phone}
                  onChange={(e) => onClientChange('phone', e.target.value)}
                  placeholder="تلفن ثابت یا همراه کارفرما"
                  className="flex-1 border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-600 py-1 text-slate-800 placeholder:text-slate-400"
                />
              ) : (
                <span className="flex-1 font-medium text-slate-900 border-b border-transparent py-1 dir-ltr text-right">
                  {client.phone || '---'}
                </span>
              )}
            </div>

            {(showExtendedFields || client.representative || client.email || client.address) && (
              <>
                <div className="flex items-center">
                  <label className="w-28 text-slate-600 font-medium shrink-0 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                    نماینده قانونی:
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={client.representative || ''}
                      onChange={(e) => onClientChange('representative', e.target.value)}
                      placeholder="نام نماینده / مدیرعامل"
                      className="flex-1 border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-600 py-1 text-slate-800 placeholder:text-slate-400"
                    />
                  ) : (
                    <span className="flex-1 text-slate-800 border-b border-transparent py-1">
                      {client.representative || '---'}
                    </span>
                  )}
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-slate-600 font-medium shrink-0 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                    ایمیل:
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={client.email || ''}
                      onChange={(e) => onClientChange('email', e.target.value)}
                      placeholder="client@domain.com"
                      className="flex-1 border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-600 py-1 text-slate-800 placeholder:text-slate-400 text-left dir-ltr"
                    />
                  ) : (
                    <span className="flex-1 text-slate-800 border-b border-transparent py-1 text-left dir-ltr">
                      {client.email || '---'}
                    </span>
                  )}
                </div>

                <div className="flex items-start">
                  <label className="w-28 text-slate-600 font-medium shrink-0 pt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                    نشانی اقامتگاه:
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={client.address || ''}
                      onChange={(e) => onClientChange('address', e.target.value)}
                      placeholder="استان، شهر، خیابان، پلاک"
                      className="flex-1 border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-600 py-1 text-slate-800 placeholder:text-slate-400"
                    />
                  ) : (
                    <span className="flex-1 text-slate-800 border-b border-transparent py-1">
                      {client.address || '---'}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* ۲. مجری / معمار UI */}
        <div className="bg-slate-50 border border-slate-200/80 p-5 rounded-xl print:bg-transparent print:border-none print:p-0 transition-all">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5 mb-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-600 print:hidden" />
              <span>۲. مجری / معمار UI</span>
            </h3>
            <span className="text-xs text-slate-500 font-normal print:hidden">
              (طرف دوم قرارداد)
            </span>
          </div>

          <div className="space-y-3.5 text-sm">
            <div className="flex items-center">
              <label className="w-28 text-slate-600 font-medium shrink-0 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                نام / شرکت:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={contractor.name}
                  onChange={(e) => onContractorChange('name', e.target.value)}
                  placeholder="نام شخص حقیقی یا تیم توسعه"
                  className="flex-1 border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-600 py-1 text-slate-800 placeholder:text-slate-400 font-medium"
                />
              ) : (
                <span className="flex-1 font-semibold text-slate-900 border-b border-transparent py-1">
                  {contractor.name || 'پاشا'}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <label className="w-28 text-slate-600 font-medium shrink-0 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                کد/شناسه ملی:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={contractor.nationalId}
                  onChange={(e) => onContractorChange('nationalId', e.target.value)}
                  placeholder="کد ملی مجری"
                  className="flex-1 border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-600 py-1 text-slate-800 placeholder:text-slate-400"
                />
              ) : (
                <span className="flex-1 font-medium text-slate-900 border-b border-transparent py-1">
                  {contractor.nationalId || '---'}
                </span>
              )}
            </div>

            <div className="flex items-center">
              <label className="w-28 text-slate-600 font-medium shrink-0 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                شماره تماس:
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={contractor.phone}
                  onChange={(e) => onContractorChange('phone', e.target.value)}
                  placeholder="تلفن تماس مجری"
                  className="flex-1 border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-600 py-1 text-slate-800 placeholder:text-slate-400"
                />
              ) : (
                <span className="flex-1 font-medium text-slate-900 border-b border-transparent py-1 dir-ltr text-right">
                  {contractor.phone || '---'}
                </span>
              )}
            </div>

            {(showExtendedFields || contractor.representative || contractor.email || contractor.address) && (
              <>
                <div className="flex items-center">
                  <label className="w-28 text-slate-600 font-medium shrink-0 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                    سمت / تخصص:
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={contractor.representative || ''}
                      onChange={(e) => onContractorChange('representative', e.target.value)}
                      placeholder="معمار نرم‌افزار / توسعه‌دهنده ارشد UI"
                      className="flex-1 border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-600 py-1 text-slate-800 placeholder:text-slate-400"
                    />
                  ) : (
                    <span className="flex-1 text-slate-800 border-b border-transparent py-1">
                      {contractor.representative || '---'}
                    </span>
                  )}
                </div>

                <div className="flex items-center">
                  <label className="w-28 text-slate-600 font-medium shrink-0 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                    ایمیل:
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={contractor.email || ''}
                      onChange={(e) => onContractorChange('email', e.target.value)}
                      placeholder="contractor@domain.com"
                      className="flex-1 border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-600 py-1 text-slate-800 placeholder:text-slate-400 text-left dir-ltr"
                    />
                  ) : (
                    <span className="flex-1 text-slate-800 border-b border-transparent py-1 text-left dir-ltr">
                      {contractor.email || '---'}
                    </span>
                  )}
                </div>

                <div className="flex items-start">
                  <label className="w-28 text-slate-600 font-medium shrink-0 pt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 print:hidden" />
                    نشانی اقامتگاه:
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={contractor.address || ''}
                      onChange={(e) => onContractorChange('address', e.target.value)}
                      placeholder="استان، شهر، خیابان، پلاک"
                      className="flex-1 border-b border-slate-300 bg-transparent focus:outline-none focus:border-indigo-600 py-1 text-slate-800 placeholder:text-slate-400"
                    />
                  ) : (
                    <span className="flex-1 text-slate-800 border-b border-transparent py-1">
                      {contractor.address || '---'}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
