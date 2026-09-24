import React from 'react';
import { ContractData, PartyInfo } from '../types';
import { PartiesSection } from './PartiesSection';
import { TechnicalDeliverablesSection } from './TechnicalDeliverablesSection';
import { MilestonesTable } from './MilestonesTable';
import { ObligationsAndLegalSection } from './ObligationsAndLegalSection';
import { SignatureSection } from './SignatureSection';
import { Printer, Calendar, Hash, MapPin, Layers } from 'lucide-react';

interface ContractDocumentProps {
  data: ContractData;
  isEditing: boolean;
  onUpdate: <K extends keyof ContractData>(field: K, value: ContractData[K]) => void;
  onPrint: () => void;
}

export const ContractDocument: React.FC<ContractDocumentProps> = ({
  data,
  isEditing,
  onUpdate,
  onPrint,
}) => {
  const siteAddress = window.location.href;

  const handleClientChange = (field: keyof PartyInfo, value: string) => {
    onUpdate('client', { ...data.client, [field]: value });
  };

  const handleContractorChange = (field: keyof PartyInfo, value: string) => {
    onUpdate('contractor', { ...data.contractor, [field]: value });
  };

  return (
    <div
      id="contract-print-area"
      className="max-w-4xl mx-auto bg-white p-6 md:p-12 shadow-xl rounded-2xl print:shadow-none print:p-0 print-page text-slate-800 transition-all border border-slate-100 print:border-none"
    >
      {/* هدر سند و سربرگ رسمی */}
      <div className="border-b-2 border-slate-200 pb-6 mb-8 avoid-break">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-700 font-semibold text-xs tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>جمهوری اسلامی ایران - قرارداد خدمات تخصصی فناوری اطلاعات</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              قرارداد جامع معماری و توسعه نرم‌افزار
            </h1>
          </div>

          {/* دکمه چاپ درون هدر سند مطابق کد ارسالی کاربر */}
          <button
            type="button"
            onClick={onPrint}
            className="no-print bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition font-medium shadow-md flex items-center gap-2 cursor-pointer active:scale-95 text-sm"
          >
            <Printer className="w-4 h-4" />
            <span>چاپ / خروجی PDF</span>
          </button>
        </div>

        {/* متادیتا: شماره قرارداد، تاریخ و شهر */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 mt-5 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">شماره قرارداد:</span>
            {isEditing ? (
              <input
                type="text"
                value={data.contractNumber}
                onChange={(e) => onUpdate('contractNumber', e.target.value)}
                className="w-24 border-b border-slate-300 focus:outline-none focus:border-indigo-500 font-mono text-center"
              />
            ) : (
              <span className="font-mono font-medium text-slate-900">{data.contractNumber}</span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">تاریخ تنظیم:</span>
            {isEditing ? (
              <input
                type="text"
                value={data.contractDate}
                onChange={(e) => onUpdate('contractDate', e.target.value)}
                className="w-24 border-b border-slate-300 focus:outline-none focus:border-indigo-500 font-mono text-center"
              />
            ) : (
              <span className="font-mono font-medium text-slate-900">{data.contractDate}</span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">محل انعقاد:</span>
            {isEditing ? (
              <input
                type="text"
                value={data.contractCity}
                onChange={(e) => onUpdate('contractCity', e.target.value)}
                className="w-20 border-b border-slate-300 focus:outline-none focus:border-indigo-500 text-center"
              />
            ) : (
              <span className="font-medium text-slate-900">{data.contractCity}</span>
            )}
          </div>

          <div className="text-slate-400 mr-auto text-[11px]">
            پیوست فنی: ۱ برگ الزامات ساختار داده
          </div>
        </div>

        {/* متن مقدمه قرارداد */}
        <div className="mt-4 text-xs md:text-sm text-slate-600 leading-relaxed text-justify bg-slate-50/50 p-3 rounded-lg border border-slate-100 print:bg-transparent print:border-none print:p-0">
          این قرارداد در تاریخ <strong>{data.contractDate}</strong> فیمابین طرفین مشروحه ذیل، طبق ماده ۱۰ قانون مدنی جمهوری اسلامی ایران و با رعایت اصول حسن نیت، مفاد حرفه‌ای مهندسی نرم‌افزار و شرایط عمومی پیمان‌های فناوری اطلاعات منعقد گردید و طرفین ملزم به رعایت کلیه مفاد آن می‌باشند.
        </div>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* ۱ و ۲: مشخصات طرفین (کارفرما و مجری) */}
        <PartiesSection
          client={data.client}
          contractor={data.contractor}
          isEditing={isEditing}
          onClientChange={handleClientChange}
          onContractorChange={handleContractorChange}
        />

        {/* ماده ۱: موضوع قرارداد و پیوست فنی */}
        <TechnicalDeliverablesSection
          subjectTitle={data.subjectTitle}
          subjectDescription={data.subjectDescription}
          technicalStack={data.technicalStack}
          deliverables={data.technicalDeliverables}
          isEditing={isEditing}
          onSubjectTitleChange={(val) => onUpdate('subjectTitle', val)}
          onSubjectDescriptionChange={(val) => onUpdate('subjectDescription', val)}
          onTechnicalStackChange={(val) => onUpdate('technicalStack', val)}
          onDeliverablesChange={(val) => onUpdate('technicalDeliverables', val)}
        />

        {/* ماده ۲: مبلغ قرارداد و جدول فازهای پرداخت اقساط */}
        <MilestonesTable
          totalAmount={data.totalAmount}
          paymentTermsText={data.paymentTermsText}
          milestones={data.milestones}
          isEditing={isEditing}
          onTotalAmountChange={(val) => onUpdate('totalAmount', val)}
          onPaymentTermsTextChange={(val) => onUpdate('paymentTermsText', val)}
          onMilestonesChange={(val) => onUpdate('milestones', val)}
        />

        {/* مواد ۳ تا ۷ و توضیحات تکمیلی / الحاقیه */}
        <ObligationsAndLegalSection
          data={data}
          isEditing={isEditing}
          onUpdate={onUpdate}
        />

        {/* بخش امضاها */}
        <SignatureSection
          clientName={data.client.name}
          contractorName={data.contractor.name}
          clientSignDate={data.clientSignDate}
          contractorSignDate={data.contractorSignDate}
          isEditing={isEditing}
          onClientDateChange={(val) => onUpdate('clientSignDate', val)}
          onContractorDateChange={(val) => onUpdate('contractorSignDate', val)}
        />
      </form>

      <footer className="contract-print-footer" dir="rtl">
        <span>&#1606;&#1588;&#1575;&#1606;&#1740; &#1587;&#1575;&#1605;&#1575;&#1606;&#1607;:</span>
        <bdi dir="ltr">{siteAddress}</bdi>
      </footer>
    </div>
  );
};
