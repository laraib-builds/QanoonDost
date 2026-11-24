'use client';

import React, { useState } from 'react';
import { COMPLAINT_TEMPLATES } from '@/lib/complaintTemplates';
import { X, Copy, Printer, Check, FileText, Info } from 'lucide-react';

interface FIRDrafterModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUrdu?: boolean;
  initialTemplateId?: string;
}

export default function FIRDrafterModal({
  isOpen,
  onClose,
  isUrdu = false,
  initialTemplateId = 'fir-application-sho'
}: FIRDrafterModalProps) {
  const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplateId);
  const [copied, setCopied] = useState(false);

  // Form Fields
  const [complainantName, setComplainantName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [cnic, setCnic] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [stationName, setStationName] = useState('');
  const [district, setDistrict] = useState('');
  const [incidentDate, setIncidentDate] = useState('');
  const [incidentDetails, setIncidentDetails] = useState('');
  const [suspectDetails, setSuspectDetails] = useState('');

  if (!isOpen) return null;

  const currentTemplate = COMPLAINT_TEMPLATES.find(t => t.templateId === selectedTemplateId) || COMPLAINT_TEMPLATES[0];

  const generateFinalContent = () => {
    let text = currentTemplate.contentUrdu;
    text = text.replace(/\[اپنا نام\]/g, complainantName || '______________');
    text = text.replace(/\[نام\]/g, complainantName || '______________');
    text = text.replace(/\[آپ کا نام\]/g, complainantName || '______________');
    text = text.replace(/\[سائل کا نام\]/g, complainantName || '______________');
    text = text.replace(/\[والد یا شوہر کا نام\]/g, fatherName || '______________');
    text = text.replace(/\[والد کا نام\]/g, fatherName || '______________');
    text = text.replace(/\[شناختی کارڈ نمبر\]/g, cnic || '______________');
    text = text.replace(/\[نمبر\]/g, cnic || '______________');
    text = text.replace(/\[موبائل نمبر\]/g, phone || '______________');
    text = text.replace(/\[فون نمبر\]/g, phone || '______________');
    text = text.replace(/\[مکمل پتہ\]/g, address || '______________');
    text = text.replace(/\[پتہ\]/g, address || '______________');
    text = text.replace(/\[تھانے کا نام\]/g, stationName || '______________');
    text = text.replace(/\[شہر کا نام\]/g, district || '______________');
    text = text.replace(/\[ضلع کا نام\]/g, district || '______________');
    text = text.replace(/\[واقعہ کی تاریخ\]/g, incidentDate || '______________');
    text = text.replace(/\[آج کی تاریخ\]/g, new Date().toLocaleDateString('ur-PK') || '______________');

    if (incidentDetails) {
      text = text.replace(/\[یہاں مختصر اور سچے الفاظ میں واقعہ لکھیں.*?\]/g, incidentDetails);
    }
    if (suspectDetails) {
      text = text.replace(/\[ملزم کا نام یا نامعلوم افراد\]/g, suspectDetails);
    }

    return text;
  };

  const finalDraft = generateFinalContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(finalDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html dir="rtl" lang="ur">
        <head>
          <title>${currentTemplate.titleUrdu}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 2.2; font-size: 16px; white-space: pre-wrap; color: #000; }
            h2 { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; margin-bottom: 25px; }
            .instructions { font-size: 12px; border: 1px dashed #666; padding: 10px; margin-top: 40px; }
          </style>
        </head>
        <body>
          <h2>${currentTemplate.titleUrdu}</h2>
          <div>${finalDraft}</div>
          <div class="instructions">
            <strong>Hadayat:</strong><br/>
            ${currentTemplate.instructionsUrdu.map((i: string) => `• ${i}`).join('<br/>')}
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-royal-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col border border-royal-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-royal-950 via-royal-900 to-royal-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-gold-400" />
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                Kanooni Dar-khwast / FIR Drafter
              </h3>
              <p className="text-xs text-slate-300">
                Apni details likhein aur tayyar qanooni application print karein
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Template Selector Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto p-1.5 gap-1.5">
          {COMPLAINT_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.templateId}
              onClick={() => setSelectedTemplateId(tmpl.templateId)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                selectedTemplateId === tmpl.templateId
                  ? 'bg-royal-900 text-gold-400 shadow-xs'
                  : 'text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tmpl.titleEnglish}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Inputs Column */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-xs font-bold text-royal-950 uppercase tracking-wider border-b pb-1">
              Apni Tafseelat Bharein:
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Aap ka Naam (Full Name):
              </label>
              <input
                type="text"
                value={complainantName}
                onChange={(e) => setComplainantName(e.target.value)}
                placeholder="Muhammad Ali"
                className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-700"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Walid / Shoher ka Naam:
                </label>
                <input
                  type="text"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  placeholder="Walid ka naam"
                  className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-700"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  CNIC Number:
                </label>
                <input
                  type="text"
                  value={cnic}
                  onChange={(e) => setCnic(e.target.value)}
                  placeholder="35201-XXXXXXX-X"
                  className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-700 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number:
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0300-XXXXXXX"
                  className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-700 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Shehr / Zila (City):
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="Lahore / Karachi"
                  className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Thana (Police Station):
              </label>
              <input
                type="text"
                value={stationName}
                onChange={(e) => setStationName(e.target.value)}
                placeholder="Thana Factory Area"
                className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Waqia Kya Hua? (Short details):
              </label>
              <textarea
                rows={3}
                value={incidentDetails}
                onChange={(e) => setIncidentDetails(e.target.value)}
                placeholder="Tareekh, waqt aur waqia ki sachi tafseel..."
                className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-royal-700"
              />
            </div>
          </div>

          {/* Printable Preview Column */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-royal-950 uppercase tracking-wider">
                Print ke liye Tayyar Draft:
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copy ho gaya' : 'Copy'}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1 px-3 py-1 bg-royal-800 hover:bg-royal-900 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                >
                  <Printer className="w-3 h-3 text-gold-400" />
                  <span>Print Karein</span>
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-50 border border-slate-300 rounded-xl p-3 sm:p-4 overflow-y-auto max-h-[380px] text-xs sm:text-sm leading-relaxed whitespace-pre-wrap text-slate-900 shadow-inner select-all">
              {finalDraft}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
