import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  Download,
  RotateCcw,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Info,
  Settings2,
  RotateCw,
  Stamp,
  Crop,
  Copy,
  LayoutGrid,
  FileX,
  PenTool,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ToolDef, ProcessedFileResult, Language } from '../types';
import { ToolIcon } from './ToolIcon';
import { SignaturePad } from './SignaturePad';
import { TRANSLATIONS } from '../i18n/translations';
import {
  mergePDFs,
  splitPDF,
  compressPDF,
  convertPdfToWord,
  convertPdfToExcel,
  convertPdfToPptx,
  convertPdfToJpg,
  convertImagesToPdf,
  convertDocxToPdf,
  convertPptxToPdf,
  convertExcelToPdf,
  convertHtmlToPdf,
  editPDF,
  signPDF,
  watermarkPDF,
  rotatePDF,
  organizePDF,
  removePagesPDF,
  extractPagesPDF,
  cropPDF,
  getPdfThumbnails,
  PdfThumbnailInfo,
  formatBytes,
  RenderedPageImage,
} from '../utils/pdfHelpers';

interface ActiveToolWorkspaceProps {
  tool: ToolDef;
  currentLang: Language;
  onBack: () => void;
}

export const ActiveToolWorkspace: React.FC<ActiveToolWorkspaceProps> = ({ tool, currentLang, onBack }) => {
  const t = TRANSLATIONS[currentLang].workspace;
  // File selection state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [progressStatus, setProgressStatus] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Result state
  const [result, setResult] = useState<ProcessedFileResult | null>(null);
  const [renderedJpgs, setRenderedJpgs] = useState<RenderedPageImage[]>([]);

  // Thumbnail state for visual PDF tools
  const [thumbnails, setThumbnails] = useState<PdfThumbnailInfo[]>([]);
  const [isLoadingThumbs, setIsLoadingThumbs] = useState(false);

  // Tool 2: Split options
  const [splitMode, setSplitMode] = useState<'all' | 'range'>('all');
  const [splitRange, setSplitRange] = useState('1-3');

  // Tool 3: Compress options
  const [compressLevel, setCompressLevel] = useState<'low' | 'medium' | 'high'>('medium');

  // Tool 8: JPG to PDF options
  const [imgOrientation, setImgOrientation] = useState<'auto' | 'portrait' | 'landscape'>('auto');
  const [imgMargin, setImgMargin] = useState<'none' | 'small' | 'normal'>('small');

  // Tool 12: HTML to PDF content
  const [htmlContent, setHtmlContent] = useState<string>(`<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; color: #1e293b; padding: 24px; line-height: 1.6; }
    h1 { color: #e11d48; margin-bottom: 8px; }
    h2 { color: #0f172a; margin-top: 20px; }
    p { margin-bottom: 12px; }
    ul { padding-left: 20px; }
    li { margin-bottom: 6px; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 16px 0; }
  </style>
</head>
<body>
  <h1>Faktur Pembayaran #INV-2026-001</h1>
  <p>Diterbitkan pada: 25 September 2026 | Klien: PT Berkah Nusantara Mandiri</p>
  <div class="card">
    <h2>Ringkasan Layanan</h2>
    <ul>
      <li>Pengembangan Sistem Manajemen Dokumen - Rp 15.000.000</li>
      <li>Lisensi Integrasi Layanan Cloud - Rp 5.000.000</li>
      <li>Dukungan Teknis & Pemeliharaan Berkala - Rp 2.500.000</li>
    </ul>
    <p><strong>Total Pembayaran: Rp 22.500.000 (Lunas)</strong></p>
  </div>
  <p>Terima kasih atas kepercayaan dan kerja sama yang baik.</p>
</body>
</html>`);

  // Tool 13: Edit PDF options
  const [editText, setEditText] = useState('DISETUJUI DAN DIVERIFIKASI RESMI');
  const [editPageIndex, setEditPageIndex] = useState(0);
  const [editPosition, setEditPosition] = useState<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'>('top-right');
  const [editFontSize, setEditFontSize] = useState(14);
  const [editColor, setEditColor] = useState('#e11d48');
  const [editBox, setEditBox] = useState(true);

  // Tool 14: Sign PDF options
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [signPageIndex, setSignPageIndex] = useState(0);
  const [signPosition, setSignPosition] = useState<'bottom-right' | 'bottom-left' | 'center'>('bottom-right');
  const [signWithDate, setSignWithDate] = useState(true);

  // Tool 15: Watermark PDF options
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.25);
  const [watermarkSize, setWatermarkSize] = useState(48);
  const [watermarkColor, setWatermarkColor] = useState('#e11d48');
  const [watermarkDiagonal, setWatermarkDiagonal] = useState(true);

  // Tool 16: Rotate PDF options
  const [rotateMode, setRotateMode] = useState<'all' | 'specific'>('all');
  const [rotateAllAngle, setRotateAllAngle] = useState<90 | 180 | 270>(90);
  const [pageRotations, setPageRotations] = useState<{ [pageIdx: number]: number }>({});

  // Tool 17: Organize PDF options
  const [pageOrder, setPageOrder] = useState<number[]>([]);

  // Tool 18: Remove Pages options
  const [pagesToRemove, setPagesToRemove] = useState<number[]>([]);
  const [removeInput, setRemoveInput] = useState('');

  // Tool 19: Extract Pages options
  const [pagesToExtract, setPagesToExtract] = useState<number[]>([]);
  const [extractInput, setExtractInput] = useState('');

  // Tool 20: Crop PDF options
  const [cropTop, setCropTop] = useState(5);
  const [cropBottom, setCropBottom] = useState(5);
  const [cropLeft, setCropLeft] = useState(5);
  const [cropRight, setCropRight] = useState(5);

  // Reset states when tool changes
  useEffect(() => {
    setSelectedFiles([]);
    setResult(null);
    setRenderedJpgs([]);
    setThumbnails([]);
    setIsProcessing(false);
    setProgressPct(0);
    setProgressStatus('');
    setErrorMessage(null);
    setSignatureDataUrl(null);
    setPageRotations({});
    setPageOrder([]);
    setPagesToRemove([]);
    setPagesToExtract([]);
  }, [tool.id]);

  // Load thumbnails whenever a PDF is selected for visual tools
  const visualTools = ['rotate-pdf', 'organize-pdf', 'remove-pages', 'extract-pages', 'sign-pdf', 'edit-pdf'];
  useEffect(() => {
    if (selectedFiles.length > 0 && selectedFiles[0].name.toLowerCase().endsWith('.pdf') && visualTools.includes(tool.id)) {
      setIsLoadingThumbs(true);
      getPdfThumbnails(selectedFiles[0], 24)
        .then((thumbs) => {
          setThumbnails(thumbs);
          // Initialize page order [0, 1, 2, ...]
          setPageOrder(thumbs.map((_, i) => i));
          // For extract-pages, default select all
          if (tool.id === 'extract-pages') {
            setPagesToExtract(thumbs.map((_, i) => i));
            setExtractInput(`1-${thumbs.length}`);
          }
          // For sign-pdf default to last page
          if (tool.id === 'sign-pdf') {
            setSignPageIndex(Math.max(0, thumbs.length - 1));
          }
        })
        .catch((e) => console.warn('Gagal memuat pratinjau halaman PDF:', e))
        .finally(() => setIsLoadingThumbs(false));
    }
  }, [selectedFiles, tool.id]);

  // Handle Drag & Drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFilesSelected(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFilesSelected(Array.from(e.target.files));
    }
  };

  const handleFilesSelected = (files: File[]) => {
    setErrorMessage(null);
    if (tool.multiple) {
      setSelectedFiles((prev) => [...prev, ...files]);
    } else {
      setSelectedFiles([files[0]]);
      if (tool.id === 'html-to-pdf' && files[0].name.endsWith('.html')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (typeof e.target?.result === 'string') {
            setHtmlContent(e.target.result);
          }
        };
        reader.readAsText(files[0]);
      }
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const moveFile = (index: number, direction: 'up' | 'down') => {
    setSelectedFiles((prev) => {
      const copy = [...prev];
      const targetIdx = direction === 'up' ? index - 1 : index + 1;
      if (targetIdx < 0 || targetIdx >= copy.length) return copy;
      const temp = copy[index];
      copy[index] = copy[targetIdx];
      copy[targetIdx] = temp;
      return copy;
    });
  };

  // Reorder visual thumbnails in Organize PDF
  const moveThumbnail = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= pageOrder.length) return;
    setPageOrder((prev) => {
      const copy = [...prev];
      const temp = copy[fromIdx];
      copy[fromIdx] = copy[toIdx];
      copy[toIdx] = temp;
      return copy;
    });
  };

  // Toggle page rotation per page
  const rotateSinglePage = (pageIdx: number) => {
    setPageRotations((prev) => {
      const current = prev[pageIdx] || 0;
      return { ...prev, [pageIdx]: (current + 90) % 360 };
    });
  };

  // Toggle page removal
  const togglePageRemoval = (pageIdx: number) => {
    setPagesToRemove((prev) => {
      const exists = prev.includes(pageIdx);
      const next = exists ? prev.filter((p) => p !== pageIdx) : [...prev, pageIdx];
      setRemoveInput(next.map((p) => p + 1).sort((a, b) => a - b).join(', '));
      return next;
    });
  };

  // Toggle page extraction
  const togglePageExtraction = (pageIdx: number) => {
    setPagesToExtract((prev) => {
      const exists = prev.includes(pageIdx);
      const next = exists ? prev.filter((p) => p !== pageIdx) : [...prev, pageIdx];
      setExtractInput(next.map((p) => p + 1).sort((a, b) => a - b).join(', '));
      return next;
    });
  };

  // Main conversion pipeline
  const processDocument = async () => {
    if (selectedFiles.length === 0 && tool.id !== 'html-to-pdf') {
      setErrorMessage(t.errSelectFileFirst);
      return;
    }

    setIsProcessing(true);
    setProgressPct(5);
    setProgressStatus(currentLang === 'id' ? 'Menyiapkan dokumen...' : 'Preparing document...');
    setErrorMessage(null);

    try {
      let outputBlob: Blob;
      let outputFileName = '';
      let originalTotalSize = selectedFiles.reduce((acc, f) => acc + f.size, 0);

      switch (tool.id) {
        case 'merge-pdf': {
          if (selectedFiles.length < 2) {
            throw new Error(t.errMergeMinFiles);
          }
          outputBlob = await mergePDFs(selectedFiles, (pct, status) => {
            setProgressPct(pct);
            setProgressStatus(status);
          });
          outputFileName = `merged_${Date.now()}.pdf`;
          break;
        }

        case 'split-pdf': {
          const splitRes = await splitPDF(
            selectedFiles[0],
            { mode: splitMode, rangeInput: splitRange },
            (pct, status) => {
              setProgressPct(pct);
              setProgressStatus(status);
            }
          );
          outputBlob = splitRes.blob;
          outputFileName = splitRes.fileName;
          break;
        }

        case 'compress-pdf': {
          outputBlob = await compressPDF(selectedFiles[0], compressLevel, (pct, status) => {
            setProgressPct(pct);
            setProgressStatus(status);
          });
          outputFileName = `${selectedFiles[0].name.replace(/\.pdf$/i, '')}_compressed.pdf`;
          break;
        }

        case 'pdf-to-word': {
          outputBlob = await convertPdfToWord(selectedFiles[0], (pct, status) => {
            setProgressPct(pct);
            setProgressStatus(status);
          });
          outputFileName = `${selectedFiles[0].name.replace(/\.pdf$/i, '')}.docx`;
          break;
        }

        case 'pdf-to-excel': {
          outputBlob = await convertPdfToExcel(selectedFiles[0], (pct, status) => {
            setProgressPct(pct);
            setProgressStatus(status);
          });
          outputFileName = `${selectedFiles[0].name.replace(/\.pdf$/i, '')}.xlsx`;
          break;
        }

        case 'pdf-to-powerpoint': {
          outputBlob = await convertPdfToPptx(selectedFiles[0], (pct, status) => {
            setProgressPct(pct);
            setProgressStatus(status);
          });
          outputFileName = `${selectedFiles[0].name.replace(/\.pdf$/i, '')}.pptx`;
          break;
        }

        case 'pdf-to-jpg': {
          const res = await convertPdfToJpg(selectedFiles[0], 0.9, 1.8, (pct, status) => {
            setProgressPct(pct);
            setProgressStatus(status);
          });
          setRenderedJpgs(res.images);
          outputBlob = res.zipBlob;
          outputFileName = `${selectedFiles[0].name.replace(/\.pdf$/i, '')}_jpg_images.zip`;
          break;
        }

        case 'jpg-to-pdf': {
          outputBlob = await convertImagesToPdf(
            selectedFiles,
            { orientation: imgOrientation, margin: imgMargin, pageSize: 'a4' },
            (pct, status) => {
              setProgressPct(pct);
              setProgressStatus(status);
            }
          );
          outputFileName = `images_document_${Date.now()}.pdf`;
          break;
        }

        case 'word-to-pdf': {
          outputBlob = await convertDocxToPdf(selectedFiles[0], (pct, status) => {
            setProgressPct(pct);
            setProgressStatus(status);
          });
          outputFileName = `${selectedFiles[0].name.replace(/\.docx$/i, '')}.pdf`;
          break;
        }

        case 'powerpoint-to-pdf': {
          outputBlob = await convertPptxToPdf(selectedFiles[0], (pct, status) => {
            setProgressPct(pct);
            setProgressStatus(status);
          });
          outputFileName = `${selectedFiles[0].name.replace(/\.pptx$/i, '')}.pdf`;
          break;
        }

        case 'excel-to-pdf': {
          outputBlob = await convertExcelToPdf(selectedFiles[0], (pct, status) => {
            setProgressPct(pct);
            setProgressStatus(status);
          });
          outputFileName = `${selectedFiles[0].name.replace(/\.[^/.]+$/, '')}.pdf`;
          break;
        }

        case 'html-to-pdf': {
          outputBlob = await convertHtmlToPdf(
            htmlContent,
            selectedFiles[0]?.name?.replace(/\.html$/i, '') || 'Dokumen_HTML',
            (pct, status) => {
              setProgressPct(pct);
              setProgressStatus(status);
            }
          );
          originalTotalSize = htmlContent.length;
          outputFileName = `${selectedFiles[0]?.name?.replace(/\.html$/i, '') || 'dokumen_html'}.pdf`;
          break;
        }

        // TOOL 13: EDIT PDF
        case 'edit-pdf': {
          outputBlob = await editPDF(
            selectedFiles[0],
            {
              text: editText,
              pageIndex: editPageIndex,
              position: editPosition,
              fontSize: editFontSize,
              colorHex: editColor,
              hasBackgroundBox: editBox,
            },
            (pct, status) => {
              setProgressPct(pct);
              setProgressStatus(status);
            }
          );
          outputFileName = `${selectedFiles[0].name.replace(/\.pdf$/i, '')}_edited.pdf`;
          break;
        }

        // TOOL 14: SIGN PDF
        case 'sign-pdf': {
          if (!signatureDataUrl) {
            throw new Error(t.errSignRequired);
          }
          outputBlob = await signPDF(
            selectedFiles[0],
            {
              signatureDataUrl,
              pageIndex: signPageIndex,
              position: signPosition,
              signDateText: signWithDate
                ? (currentLang === 'id'
                    ? `Ditandatangani digital pada: ${new Date().toLocaleDateString('id-ID', { dateStyle: 'long' })}`
                    : `Digitally signed on: ${new Date().toLocaleDateString('en-US', { dateStyle: 'long' })}`)
                : undefined,
            },
            (pct, status) => {
              setProgressPct(pct);
              setProgressStatus(status);
            }
          );
          outputFileName = `${selectedFiles[0].name.replace(/\.pdf$/i, '')}_signed.pdf`;
          break;
        }

        // TOOL 15: WATERMARK PDF
        case 'watermark-pdf': {
          if (!watermarkText.trim()) {
            throw new Error(t.errWatermarkRequired);
          }
          outputBlob = await watermarkPDF(
            selectedFiles[0],
            {
              text: watermarkText,
              opacity: watermarkOpacity,
              fontSize: watermarkSize,
              colorHex: watermarkColor,
              isDiagonal: watermarkDiagonal,
            },
            (pct, status) => {
              setProgressPct(pct);
              setProgressStatus(status);
            }
          );
          outputFileName = `${selectedFiles[0].name.replace(/\.pdf$/i, '')}_watermarked.pdf`;
          break;
        }

        // TOOL 16: ROTATE PDF
        case 'rotate-pdf': {
          outputBlob = await rotatePDF(
            selectedFiles[0],
            {
              mode: rotateMode,
              allAngle: rotateAllAngle,
              pageRotations,
            },
            (pct, status) => {
              setProgressPct(pct);
              setProgressStatus(status);
            }
          );
          outputFileName = `${selectedFiles[0].name.replace(/\.pdf$/i, '')}_rotated.pdf`;
          break;
        }

        // TOOL 17: ORGANIZE PDF
        case 'organize-pdf': {
          const finalOrder = pageOrder.length > 0 ? pageOrder : thumbnails.map((_, i) => i);
          outputBlob = await organizePDF(selectedFiles[0], finalOrder, (pct, status) => {
            setProgressPct(pct);
            setProgressStatus(status);
          });
          outputFileName = `${selectedFiles[0].name.replace(/\.pdf$/i, '')}_organized.pdf`;
          break;
        }

        // TOOL 18: REMOVE PAGES
        case 'remove-pages': {
          if (pagesToRemove.length === 0) {
            throw new Error(t.errRemoveMinPage);
          }
          outputBlob = await removePagesPDF(selectedFiles[0], pagesToRemove, (pct, status) => {
            setProgressPct(pct);
            setProgressStatus(status);
          });
          outputFileName = `${selectedFiles[0].name.replace(/\.pdf$/i, '')}_removed_pages.pdf`;
          break;
        }

        // TOOL 19: EXTRACT PAGES
        case 'extract-pages': {
          if (pagesToExtract.length === 0) {
            throw new Error(t.errExtractMinPage);
          }
          outputBlob = await extractPagesPDF(selectedFiles[0], pagesToExtract, (pct, status) => {
            setProgressPct(pct);
            setProgressStatus(status);
          });
          outputFileName = `${selectedFiles[0].name.replace(/\.pdf$/i, '')}_extracted.pdf`;
          break;
        }

        // TOOL 20: CROP PDF
        case 'crop-pdf': {
          outputBlob = await cropPDF(
            selectedFiles[0],
            {
              marginTopPct: cropTop,
              marginBottomPct: cropBottom,
              marginLeftPct: cropLeft,
              marginRightPct: cropRight,
            },
            (pct, status) => {
              setProgressPct(pct);
              setProgressStatus(status);
            }
          );
          outputFileName = `${selectedFiles[0].name.replace(/\.pdf$/i, '')}_cropped.pdf`;
          break;
        }

        default:
          throw new Error('Alat belum didukung.');
      }

      const downloadUrl = URL.createObjectURL(outputBlob);
      setResult({
        fileName: outputFileName,
        blob: outputBlob,
        downloadUrl,
        originalSize: originalTotalSize,
        newSize: outputBlob.size,
        type: outputBlob.type,
      });

      // Confetti celebration
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#e11d48', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
        });
      } catch {
        // Confetti optional
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.message || 'Terjadi kesalahan saat memproses dokumen. Pastikan file tidak terkunci sandi.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.downloadUrl;
    a.download = result.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const resetAll = () => {
    setSelectedFiles([]);
    setResult(null);
    setRenderedJpgs([]);
    setThumbnails([]);
    setErrorMessage(null);
    setProgressPct(0);
    setProgressStatus('');
    setSignatureDataUrl(null);
    setPageRotations({});
    setPageOrder([]);
    setPagesToRemove([]);
    setPagesToExtract([]);
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-8">
      {/* Top Bar Navigation inside Workspace */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 py-1.5 px-3 rounded-xl transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t.backToCatalog}</span>
        </button>

        <div className="text-[11px] sm:text-xs text-slate-400 flex items-center gap-1.5 bg-slate-900/50 py-1 px-2.5 rounded-lg border border-slate-800/60">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>{t.secureMode}</span>
        </div>
      </div>

      {/* Main Tool Container */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* Tool Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
              style={{
                backgroundColor: `${tool.accentColor}20`,
                border: `1px solid ${tool.accentColor}40`,
              }}
            >
              <ToolIcon name={tool.icon} className="w-6 h-6 sm:w-7 sm:h-7" color={tool.accentColor} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{tool.title}</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5 leading-relaxed">{tool.fullDesc}</p>
            </div>
          </div>

          {selectedFiles.length > 0 && !result && (
            <button
              onClick={resetAll}
              disabled={isProcessing}
              className="self-start sm:self-auto text-xs text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800 cursor-pointer disabled:opacity-50"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t.changeFile}</span>
            </button>
          )}
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3">
            <Info className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
            <div>
              <div className="font-semibold">{t.failedProcess}</div>
              <div className="mt-0.5 text-xs text-rose-300/90">{errorMessage}</div>
            </div>
          </div>
        )}

        {/* State 1: Dropzone (No files selected yet) */}
        {selectedFiles.length === 0 && tool.id !== 'html-to-pdf' && (
          <div className="mt-8">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-7 sm:p-14 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? 'border-rose-500 bg-rose-500/10 scale-[1.01]'
                  : 'border-slate-700/80 hover:border-slate-500 bg-slate-950/40 hover:bg-slate-950/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={tool.accept}
                multiple={tool.multiple}
                onChange={handleFileInputChange}
                className="hidden"
              />
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-rose-400">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-white">
                {t.dropzoneTitle}
              </h3>
              <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
                {tool.multiple ? t.dropzoneMultiple : t.dropzoneSingle}
              </p>
              <div className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-950 transition-all">
                <span>{t.selectFileBtn}</span>
              </div>
            </div>
          </div>
        )}

        {/* Special Editor for HTML to PDF */}
        {tool.id === 'html-to-pdf' && !result && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-semibold text-slate-300">
                {t.htmlEditorTitle}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">{t.quickTemplates}</span>
                {[
                  {
                    name: t.tplInvoice,
                    code: currentLang === 'id'
                      ? `<h1>FAKTUR TAGIHAN</h1><p>No: INV-2026-889</p><p>Klien: Bpk. Hendra Wijaya</p><h3>Rincian Pembayaran</h3><p>• Jasa Desain Arsitektur: Rp 8.000.000</p><p>• Konsultasi Teknis: Rp 2.000.000</p><p><strong>Total: Rp 10.000.000</strong></p>`
                      : `<h1>OFFICIAL INVOICE</h1><p>Invoice #: INV-2026-889</p><p>Client: Acme Global Corp</p><h3>Payment Details</h3><p>• Cloud Infrastructure Consulting: $8,000</p><p>• Full-Stack Software Integration: $2,000</p><p><strong>Total Amount: $10,000 (Paid in Full)</strong></p>`,
                  },
                  {
                    name: t.tplOfficialLetter,
                    code: currentLang === 'id'
                      ? `<h1>SURAT KETERANGAN RESMI</h1><p>Nomor: 042/SK/IX/2026</p><p>Dengan ini menerangkan bahwa dokumen ini telah diverifikasi sah secara elektronik.</p><p>Dibuat di Jakarta pada tanggal 25 September 2026.</p>`
                      : `<h1>OFFICIAL CERTIFICATE</h1><p>Ref: 042/CERT/2026</p><p>This is to certify that this electronic document is verified and officially approved.</p><p>Issued on September 25, 2026.</p>`,
                  },
                  {
                    name: t.tplResume,
                    code: currentLang === 'id'
                      ? `<h1>CURRICULUM VITAE</h1><h2>Ringkasan Profesional</h2><p>Pengembang Perangkat Lunak Berpengalaman dengan keahlian Full-Stack TypeScript dan Solusi Dokumen.</p><h2>Riwayat Pengalaman</h2><p>• Senior Engineer di PT Tech Global (2022 - Sekarang)</p><p>• Full Stack Developer di Solusi Digital (2019 - 2022)</p>`
                      : `<h1>CURRICULUM VITAE</h1><h2>Professional Summary</h2><p>Experienced Senior Software Engineer specializing in modern web applications, TypeScript, and high-performance document processing.</p><h2>Experience</h2><p>• Lead Engineer at Tech Global (2022 - Present)</p><p>• Full Stack Developer at Cloud Solutions (2019 - 2022)</p>`,
                  },
                ].map((tpl) => (
                  <button
                    key={tpl.name}
                    onClick={() => setHtmlContent(tpl.code)}
                    className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md cursor-pointer transition-colors"
                  >
                    {tpl.name}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              rows={10}
              className="w-full p-4 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 font-mono text-xs focus:outline-none focus:border-rose-500 leading-relaxed"
              placeholder={t.htmlPlaceholder}
            />

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{t.orUploadHtml}</span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="hover:text-white underline cursor-pointer"
              >
                {t.chooseHtmlFile}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".html,.htm"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* State 2: Files Uploaded (Configuration & Confirmation) */}
        {selectedFiles.length > 0 && !result && (
          <div className="mt-6 space-y-6">
            {/* File List */}
            <div>
              <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-400">
                <span>{t.selectedFilesTitle(selectedFiles.length)}</span>
                {tool.multiple && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                  >
                    {t.addMoreFiles}
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={tool.accept}
                  multiple={tool.multiple}
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedFiles.map((file, idx) => (
                  <div
                    key={`${file.name}-${idx}`}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-slate-700/80 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                        <FileCheck className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-medium text-white truncate max-w-xs sm:max-w-md">
                          {file.name}
                        </div>
                        <div className="text-xs text-slate-400 font-mono tabular-nums">
                          {formatBytes(file.size)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {tool.multiple && (
                        <>
                          <button
                            onClick={() => moveFile(idx, 'up')}
                            disabled={idx === 0}
                            title={t.moveUp}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveFile(idx, 'down')}
                            disabled={idx === selectedFiles.length - 1}
                            title={t.moveDown}
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                          >
                            <ArrowDown className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => removeFile(idx)}
                        title={t.removeFile}
                        className="p-1 text-slate-400 hover:text-rose-400 cursor-pointer ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Thumbnail Gallery (For Rotate, Organize, Remove, Extract, Sign) */}
            {isLoadingThumbs && (
              <div className="p-6 text-center text-xs text-slate-400 bg-slate-950/40 rounded-2xl border border-slate-800 animate-pulse">
                {t.loadingThumbnails}
              </div>
            )}

            {/* ========================================================== */}
            {/* TOOL 13: EDIT PDF SETTINGS */}
            {/* ========================================================== */}
            {tool.id === 'edit-pdf' && (
              <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <PenTool className="w-4 h-4 text-pink-400" />
                  <span>{t.editSettingsTitle}</span>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">{t.editTextLabel}</label>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-pink-500 font-medium"
                    placeholder={currentLang === 'id' ? 'Contoh: DISETUJUI / DIVERIFIKASI RESMI' : 'e.g. APPROVED & VERIFIED'}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">{t.editPositionLabel}</label>
                    <select
                      value={editPosition}
                      onChange={(e) => setEditPosition(e.target.value as any)}
                      className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
                    >
                      <option value="top-right">{t.posTopRight}</option>
                      <option value="top-left">{t.posTopLeft}</option>
                      <option value="center">{t.posCenter}</option>
                      <option value="bottom-right">{t.posBottomRight}</option>
                      <option value="bottom-left">{t.posBottomLeft}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">{t.editFontSizeLabel}</label>
                    <select
                      value={editFontSize}
                      onChange={(e) => setEditFontSize(Number(e.target.value))}
                      className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
                    >
                      <option value={10}>{t.fontSmall}</option>
                      <option value={14}>{t.fontMedium}</option>
                      <option value={18}>{t.fontLarge}</option>
                      <option value={24}>{t.fontExtraLarge}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">{t.editColorLabel}</label>
                    <div className="flex items-center gap-2 pt-1">
                      {['#e11d48', '#2563eb', '#059669', '#0f172a', '#d97706'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setEditColor(c)}
                          className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                            editColor === c ? 'scale-110 border-white' : 'border-slate-700'
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="editBoxToggle"
                    checked={editBox}
                    onChange={(e) => setEditBox(e.target.checked)}
                    className="rounded text-pink-600 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="editBoxToggle" className="text-xs text-slate-300 cursor-pointer">
                    {t.editBoxLabel}
                  </label>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* TOOL 14: SIGN PDF SETTINGS */}
            {/* ========================================================== */}
            {tool.id === 'sign-pdf' && (
              <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <PenTool className="w-4 h-4 text-indigo-400" />
                  <span>{t.signSettingsTitle}</span>
                </div>

                <SignaturePad currentLang={currentLang} onSignatureChange={setSignatureDataUrl} />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">{t.signPositionLabel}</label>
                    <select
                      value={signPosition}
                      onChange={(e) => setSignPosition(e.target.value as any)}
                      className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
                    >
                      <option value="bottom-right">{t.signPosBottomRight}</option>
                      <option value="bottom-left">{t.signPosBottomLeft}</option>
                      <option value="center">{t.signPosCenter}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">{t.signPageLabel}</label>
                    <select
                      value={signPageIndex}
                      onChange={(e) => setSignPageIndex(Number(e.target.value))}
                      className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
                    >
                      {thumbnails.length > 0 ? (
                        thumbnails.map((thumb, idx) => (
                          <option key={idx} value={idx}>
                            {t.signPageNum(idx + 1)} {idx === thumbnails.length - 1 ? `(${t.signPageLast})` : ''}
                          </option>
                        ))
                      ) : (
                        <>
                          <option value={0}>{t.signPageFirst}</option>
                          <option value={999}>{t.signPageLast}</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="signDateToggle"
                    checked={signWithDate}
                    onChange={(e) => setSignWithDate(e.target.checked)}
                    className="rounded text-indigo-600 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="signDateToggle" className="text-xs text-slate-300 cursor-pointer">
                    {t.signDateToggle}
                  </label>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* TOOL 15: WATERMARK PDF SETTINGS */}
            {/* ========================================================== */}
            {tool.id === 'watermark-pdf' && (
              <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Stamp className="w-4 h-4 text-teal-400" />
                  <span>{t.watermarkSettingsTitle}</span>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">{t.watermarkTextLabel}</label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-teal-500 font-bold"
                    placeholder="CONFIDENTIAL"
                  />
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {(currentLang === 'id'
                      ? ['CONFIDENTIAL', 'RAHASIA', 'DRAF', 'SALINAN RESMI', 'CONTOH / SAMPLE']
                      : ['CONFIDENTIAL', 'SECRET', 'DRAFT', 'OFFICIAL COPY', 'SAMPLE']
                    ).map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setWatermarkText(preset)}
                        className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-[10px] text-slate-300 rounded border border-slate-800 cursor-pointer"
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">
                      {t.watermarkOpacityLabel(Math.round(watermarkOpacity * 100))}
                    </label>
                    <input
                      type="range"
                      min={0.1}
                      max={0.8}
                      step={0.05}
                      value={watermarkOpacity}
                      onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                      className="w-full accent-teal-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">
                      {t.watermarkSizeLabel(watermarkSize)}
                    </label>
                    <input
                      type="range"
                      min={24}
                      max={72}
                      step={4}
                      value={watermarkSize}
                      onChange={(e) => setWatermarkSize(parseInt(e.target.value, 10))}
                      className="w-full accent-teal-500 cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">{t.watermarkAngleLabel}</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setWatermarkDiagonal(true)}
                        className={`flex-1 py-1.5 px-2 text-xs rounded border cursor-pointer ${
                          watermarkDiagonal ? 'bg-teal-500/20 border-teal-500 text-teal-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {t.watermarkDiagonal}
                      </button>
                      <button
                        type="button"
                        onClick={() => setWatermarkDiagonal(false)}
                        className={`flex-1 py-1.5 px-2 text-xs rounded border cursor-pointer ${
                          !watermarkDiagonal ? 'bg-teal-500/20 border-teal-500 text-teal-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {t.watermarkHorizontal}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================== */}
            {/* TOOL 16: ROTATE PDF SETTINGS */}
            {/* ========================================================== */}
            {tool.id === 'rotate-pdf' && (
              <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <RotateCw className="w-4 h-4 text-amber-400" />
                    <span>{t.rotateSettingsTitle}</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setRotateMode('all');
                        setRotateAllAngle(((rotateAllAngle + 90) % 360 || 90) as any);
                      }}
                      className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold rounded-lg flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>{t.rotateAllBtn(rotateAllAngle)}</span>
                    </button>
                  </div>
                </div>

                {thumbnails.length > 0 && (
                  <div>
                    <div className="text-[11px] text-slate-400 mb-2">
                      {t.rotateThumbnailHint}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-72 overflow-y-auto p-2 bg-slate-950/40 rounded-xl border border-slate-800">
                      {thumbnails.map((thumb, idx) => {
                        const deg = (pageRotations[idx] || 0) + (rotateMode === 'all' ? rotateAllAngle : 0);
                        return (
                          <div
                            key={idx}
                            className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center relative group"
                          >
                            <div className="relative w-full h-32 flex items-center justify-center overflow-hidden rounded bg-black/20">
                              <img
                                src={thumb.dataUrl}
                                alt={t.rotatePageNum(idx + 1)}
                                className="max-h-full object-contain transition-transform duration-200"
                                style={{ transform: `rotate(${deg}deg)` }}
                              />
                            </div>
                            <div className="mt-2 w-full flex items-center justify-between text-[11px] text-slate-300">
                              <span>{t.rotatePageNum(idx + 1)}</span>
                              <button
                                type="button"
                                onClick={() => {
                                  setRotateMode('specific');
                                  rotateSinglePage(idx);
                                }}
                                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 cursor-pointer"
                                title={currentLang === 'id' ? 'Putar 90 derajat' : 'Rotate 90 degrees'}
                              >
                                <RotateCw className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================== */}
            {/* TOOL 17: ORGANIZE PDF SETTINGS */}
            {/* ========================================================== */}
            {tool.id === 'organize-pdf' && (
              <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <LayoutGrid className="w-4 h-4 text-purple-400" />
                    <span>{t.organizeSettingsTitle}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPageOrder(thumbnails.map((_, i) => i))}
                    className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {t.organizeReset}
                  </button>
                </div>

                {thumbnails.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-72 overflow-y-auto p-2 bg-slate-950/40 rounded-xl border border-slate-800">
                    {pageOrder.map((pageIdx, currentPosition) => {
                      const thumb = thumbnails[pageIdx];
                      if (!thumb) return null;
                      return (
                        <div
                          key={`${pageIdx}-${currentPosition}`}
                          className="p-2 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center relative"
                        >
                          <div className="w-full h-32 flex items-center justify-center overflow-hidden rounded bg-black/20">
                            <img
                              src={thumb.dataUrl}
                              alt={t.organizePageNum(pageIdx + 1)}
                              className="max-h-full object-contain"
                            />
                          </div>
                          <div className="mt-2 w-full flex items-center justify-between text-[11px] text-slate-300">
                            <span className="font-semibold text-purple-400">{t.organizePageNum(currentPosition + 1)}</span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={currentPosition === 0}
                                onClick={() => moveThumbnail(currentPosition, currentPosition - 1)}
                                className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                                title={currentLang === 'id' ? 'Geser ke kiri' : 'Move left'}
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                disabled={currentPosition === pageOrder.length - 1}
                                onClick={() => moveThumbnail(currentPosition, currentPosition + 1)}
                                className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 cursor-pointer"
                                title={currentLang === 'id' ? 'Geser ke kanan' : 'Move right'}
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          <div className="text-[9px] text-slate-500 mt-0.5">{t.organizeOriginalPage(pageIdx + 1)}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================== */}
            {/* TOOL 18: REMOVE PAGES SETTINGS */}
            {/* ========================================================== */}
            {tool.id === 'remove-pages' && (
              <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <FileX className="w-4 h-4 text-red-400" />
                    <span>{t.removeSettingsTitle}</span>
                  </div>
                  <span className="text-xs text-red-400 font-medium">
                    {t.removeMarkedCount(pagesToRemove.length)}
                  </span>
                </div>

                {thumbnails.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-72 overflow-y-auto p-2 bg-slate-950/40 rounded-xl border border-slate-800">
                    {thumbnails.map((thumb, idx) => {
                      const isMarked = pagesToRemove.includes(idx);
                      return (
                        <div
                          key={idx}
                          onClick={() => togglePageRemoval(idx)}
                          className={`p-2 rounded-xl border cursor-pointer transition-all duration-150 flex flex-col items-center relative ${
                            isMarked
                              ? 'border-red-500/80 bg-red-950/20 opacity-60'
                              : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                          }`}
                        >
                          <div className="w-full h-32 flex items-center justify-center overflow-hidden rounded bg-black/20 relative">
                            <img
                              src={thumb.dataUrl}
                              alt={t.removePageNum(idx + 1)}
                              className="max-h-full object-contain"
                            />
                            {isMarked && (
                              <div className="absolute inset-0 bg-red-950/60 flex items-center justify-center text-red-400 font-bold text-xs">
                                <Trash2 className="w-6 h-6 text-red-400" />
                              </div>
                            )}
                          </div>
                          <div className="mt-2 text-xs font-medium text-slate-300">
                            {t.removePageNum(idx + 1)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================== */}
            {/* TOOL 19: EXTRACT PAGES SETTINGS */}
            {/* ========================================================== */}
            {tool.id === 'extract-pages' && (
              <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <Copy className="w-4 h-4 text-blue-400" />
                    <span>{t.extractSettingsTitle}</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPagesToExtract(thumbnails.map((_, i) => i))}
                      className="text-blue-400 hover:text-blue-300 cursor-pointer"
                    >
                      {t.extractSelectAll}
                    </button>
                    <span className="text-slate-600">·</span>
                    <button
                      type="button"
                      onClick={() => setPagesToExtract([])}
                      className="text-slate-400 hover:text-white cursor-pointer"
                    >
                      {t.extractClear}
                    </button>
                  </div>
                </div>

                {thumbnails.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-72 overflow-y-auto p-2 bg-slate-950/40 rounded-xl border border-slate-800">
                    {thumbnails.map((thumb, idx) => {
                      const isSelected = pagesToExtract.includes(idx);
                      return (
                        <div
                          key={idx}
                          onClick={() => togglePageExtraction(idx)}
                          className={`p-2 rounded-xl border cursor-pointer transition-all duration-150 flex flex-col items-center relative ${
                            isSelected
                              ? 'border-blue-500 bg-blue-950/30 shadow-md ring-1 ring-blue-500/50'
                              : 'border-slate-800 bg-slate-900 opacity-60 hover:opacity-90'
                          }`}
                        >
                          <div className="w-full h-32 flex items-center justify-center overflow-hidden rounded bg-black/20 relative">
                            <img
                              src={thumb.dataUrl}
                              alt={t.extractPageNum(idx + 1)}
                              className="max-h-full object-contain"
                            />
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shadow">
                                <CheckSquare className="w-3.5 h-3.5" />
                              </div>
                            )}
                          </div>
                          <div className="mt-2 text-xs font-semibold text-slate-200">
                            {t.extractPageNum(idx + 1)}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ========================================================== */}
            {/* TOOL 20: CROP PDF SETTINGS */}
            {/* ========================================================== */}
            {tool.id === 'crop-pdf' && (
              <div className="p-5 rounded-2xl bg-slate-950/50 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Crop className="w-4 h-4 text-emerald-400" />
                  <span>{t.cropSettingsTitle}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">{t.cropTop(cropTop)}</label>
                    <input
                      type="range"
                      min={0}
                      max={25}
                      value={cropTop}
                      onChange={(e) => setCropTop(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">{t.cropBottom(cropBottom)}</label>
                    <input
                      type="range"
                      min={0}
                      max={25}
                      value={cropBottom}
                      onChange={(e) => setCropBottom(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">{t.cropLeft(cropLeft)}</label>
                    <input
                      type="range"
                      min={0}
                      max={25}
                      value={cropLeft}
                      onChange={(e) => setCropLeft(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">{t.cropRight(cropRight)}</label>
                    <input
                      type="range"
                      min={0}
                      max={25}
                      value={cropRight}
                      onChange={(e) => setCropRight(Number(e.target.value))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Crop Visualizer Box */}
                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center">
                  <div className="relative w-44 h-56 bg-white/10 rounded border border-slate-600 flex items-center justify-center text-[10px] text-slate-400">
                    <div
                      className="absolute border-2 border-dashed border-emerald-400 bg-emerald-500/10 flex items-center justify-center text-emerald-300 font-semibold text-[10px]"
                      style={{
                        top: `${cropTop}%`,
                        bottom: `${cropBottom}%`,
                        left: `${cropLeft}%`,
                        right: `${cropRight}%`,
                      }}
                    >
                      {t.cropVisualArea}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Standard tool options (Split, Compress, JPG to PDF) */}
            {tool.id === 'split-pdf' && (
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Settings2 className="w-4 h-4 text-rose-400" />
                  <span>{t.splitSettingsTitle}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => setSplitMode('all')}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                      splitMode === 'all'
                        ? 'border-rose-500 bg-rose-500/10 text-white font-medium'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <div className="font-semibold text-white">{t.splitAllOptionTitle}</div>
                    <div className="mt-0.5 text-slate-400">{t.splitAllOptionDesc}</div>
                  </button>
                  <button
                    onClick={() => setSplitMode('range')}
                    className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                      splitMode === 'range'
                        ? 'border-rose-500 bg-rose-500/10 text-white font-medium'
                        : 'border-slate-800 bg-slate-900 text-slate-400'
                    }`}
                  >
                    <div className="font-semibold text-white">{t.splitRangeOptionTitle}</div>
                    <div className="mt-0.5 text-slate-400">{t.splitRangeOptionDesc}</div>
                  </button>
                </div>

                {splitMode === 'range' && (
                  <div className="pt-2">
                    <label className="text-xs text-slate-400 block mb-1">
                      {t.splitRangeLabel}
                    </label>
                    <input
                      type="text"
                      value={splitRange}
                      onChange={(e) => setSplitRange(e.target.value)}
                      className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-500 font-mono"
                      placeholder="1-3, 5"
                    />
                  </div>
                )}
              </div>
            )}

            {tool.id === 'compress-pdf' && (
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Settings2 className="w-4 h-4 text-emerald-400" />
                  <span>{t.compressSettingsTitle}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    {
                      id: 'low',
                      label: t.compressLowTitle,
                      desc: t.compressLowDesc,
                    },
                    {
                      id: 'medium',
                      label: t.compressMedTitle,
                      desc: t.compressMedDesc,
                    },
                    {
                      id: 'high',
                      label: t.compressHighTitle,
                      desc: t.compressHighDesc,
                    },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => setCompressLevel(lvl.id as any)}
                      className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                        compressLevel === lvl.id
                          ? 'border-emerald-500 bg-emerald-500/10 text-white'
                          : 'border-slate-800 bg-slate-900 text-slate-400'
                      }`}
                    >
                      <div className="font-semibold text-white">{lvl.label}</div>
                      <div className="mt-0.5 text-slate-400">{lvl.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tool.id === 'jpg-to-pdf' && (
              <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                  <Settings2 className="w-4 h-4 text-rose-400" />
                  <span>{t.jpgToPdfSettingsTitle}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">{t.jpgOrientationLabel}</label>
                    <select
                      value={imgOrientation}
                      onChange={(e) => setImgOrientation(e.target.value as any)}
                      className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
                    >
                      <option value="auto">{t.orientationAuto}</option>
                      <option value="portrait">{t.orientationPortrait}</option>
                      <option value="landscape">{t.orientationLandscape}</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">{t.jpgMarginLabel}</label>
                    <select
                      value={imgMargin}
                      onChange={(e) => setImgMargin(e.target.value as any)}
                      className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none"
                    >
                      <option value="none">{t.marginNone}</option>
                      <option value="small">{t.marginSmall}</option>
                      <option value="normal">{t.marginNormal}</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Progress bar during execution */}
            {isProcessing && (
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{progressStatus}</span>
                  <span className="font-mono tabular-nums text-rose-400 font-bold">
                    {progressPct}%
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-amber-500 transition-all duration-300 rounded-full"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            )}

            {/* Action Trigger Button */}
            {!isProcessing && (
              <button
                onClick={processDocument}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-sm shadow-xl shadow-rose-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {tool.id === 'merge-pdf' && t.actionMerge}
                  {tool.id === 'split-pdf' && t.actionSplit}
                  {tool.id === 'compress-pdf' && t.actionCompress}
                  {tool.id === 'pdf-to-word' && t.actionPdfToWord}
                  {tool.id === 'pdf-to-excel' && t.actionPdfToExcel}
                  {tool.id === 'pdf-to-powerpoint' && t.actionPdfToPpt}
                  {tool.id === 'pdf-to-jpg' && t.actionPdfToJpg}
                  {tool.id === 'jpg-to-pdf' && t.actionJpgToPdf}
                  {tool.id === 'word-to-pdf' && t.actionWordToPdf}
                  {tool.id === 'powerpoint-to-pdf' && t.actionPptToPdf}
                  {tool.id === 'excel-to-pdf' && t.actionExcelToPdf}
                  {tool.id === 'html-to-pdf' && t.actionHtmlToPdf}
                  {tool.id === 'edit-pdf' && t.actionEdit}
                  {tool.id === 'sign-pdf' && t.actionSign}
                  {tool.id === 'watermark-pdf' && t.actionWatermark}
                  {tool.id === 'rotate-pdf' && t.actionRotate}
                  {tool.id === 'organize-pdf' && t.actionOrganize}
                  {tool.id === 'remove-pages' && t.actionRemove}
                  {tool.id === 'extract-pages' && t.actionExtract}
                  {tool.id === 'crop-pdf' && t.actionCrop}
                </span>
              </button>
            )}
          </div>
        )}

        {/* State 3: Finished / Success Result */}
        {result && (
          <div className="mt-6 text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-xl font-bold text-white">{t.resultSuccessTitle}</h3>
            <p className="text-xs text-slate-400 mt-1">
              {t.resultSuccessDesc}
            </p>

            {/* Metrics card */}
            <div className="mt-5 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 max-w-md mx-auto text-left flex items-center justify-between">
              <div className="min-w-0 pr-3">
                <div className="text-xs text-slate-400 font-medium">{t.resultFileName}</div>
                <div className="text-sm font-semibold text-white truncate">
                  {result.fileName}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs text-slate-400 font-medium">{t.resultFinalSize}</div>
                <div className="text-sm font-mono font-bold text-emerald-400">
                  {formatBytes(result.newSize)}
                </div>
              </div>
            </div>

            {/* Compression savings badge if compress-pdf */}
            {tool.id === 'compress-pdf' && result.originalSize > 0 && (
              <div className="mt-3 text-xs text-emerald-400 font-medium">
                {t.resultSavedPct(
                  Math.max(
                    0,
                    Math.round(((result.originalSize - result.newSize) / result.originalSize) * 100)
                  ),
                  formatBytes(result.originalSize)
                )}
              </div>
            )}

            {/* JPG thumbnails preview if tool is pdf-to-jpg */}
            {tool.id === 'pdf-to-jpg' && renderedJpgs.length > 0 && (
              <div className="mt-6 text-left">
                <div className="text-xs font-semibold text-slate-400 mb-3">
                  {t.resultJpgPreviewTitle(renderedJpgs.length)}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-h-72 overflow-y-auto p-2 bg-slate-950/40 rounded-xl border border-slate-800">
                  {renderedJpgs.map((img) => (
                    <div
                      key={img.pageNumber}
                      className="group relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900"
                    >
                      <img
                        src={img.dataUrl}
                        alt={t.rotatePageNum(img.pageNumber)}
                        className="w-full h-32 object-contain bg-white/5"
                      />
                      <div className="p-1.5 flex items-center justify-between text-[10px] text-slate-400 bg-slate-950">
                        <span>{t.rotatePageNum(img.pageNumber)}</span>
                        <a
                          href={img.dataUrl}
                          download={`page_${img.pageNumber}.jpg`}
                          className="text-rose-400 hover:underline"
                        >
                          {t.resultDownloadSingle}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Primary Download Button */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{t.resultDownloadBtn}</span>
              </button>

              <button
                onClick={resetAll}
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.resultProcessAnotherBtn}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
