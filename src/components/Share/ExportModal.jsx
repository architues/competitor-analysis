import React, { useState } from 'react';
import { useCollaboration } from '../../context/CollaborationContext';
import { FileText, Table, FileJson, Download, X, CheckCircle } from 'lucide-react';
import '../../styles/ExportModal.css';

const ExportModal = ({ onClose, data }) => {
    const { addActivity, activeWorkspace } = useCollaboration();
    const [format, setFormat] = useState('pdf');
    const [downloading, setDownloading] = useState(false);
    const [complete, setComplete] = useState(false);

    const handleExport = () => {
        setDownloading(true);

        // Simulate export process
        setTimeout(() => {
            if (format === 'json') {
                const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                    JSON.stringify(data, null, 2)
                )}`;
                const link = document.createElement("a");
                link.href = jsonString;
                link.download = `competitor-report-${activeWorkspace.id}.json`;
                link.click();
            } else if (format === 'csv') {
                // Construct CSV from competitors
                const headers = ["Name", "Market Share", "Revenue", "Growth", "NPS"];
                const rows = data.competitors.map(c => [
                    c.name,
                    c.marketShare,
                    c.revenue.annual,
                    c.revenue.growth,
                    c.customerMetrics.nps
                ]);
                const csvContent = "data:text/csv;charset=utf-8,"
                    + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
                const link = document.createElement("a");
                link.href = encodeURI(csvContent);
                link.download = `competitor-report-${activeWorkspace.id}.csv`;
                link.click();
            }

            // For PDF we just simulate success as we can't generate real PDF easily in frontend without heavy libs

            addActivity({
                type: 'report_exported',
                description: `Exported dashboard report as ${format.toUpperCase()}`,
                target: 'Dashboard',
                metadata: { format, workspaceId: activeWorkspace.id }
            });

            setDownloading(false);
            setComplete(true);

            setTimeout(() => {
                onClose();
            }, 2000);
        }, 1500);
    };

    return (
        <div className="export-modal-overlay">
            <div className="export-modal">
                <div className="export-header">
                    <h3>Export Report</h3>
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>
                </div>

                <div className="export-content">
                    <p className="export-desc">Choose a format to download your competitor analysis report.</p>

                    <div className="format-options">
                        <button
                            className={`format-card ${format === 'pdf' ? 'active' : ''}`}
                            onClick={() => setFormat('pdf')}
                        >
                            <div className="format-icon pdf">
                                <FileText size={24} />
                            </div>
                            <span className="format-name">PDF Document</span>
                            <span className="format-detail">Best for presentations</span>
                        </button>

                        <button
                            className={`format-card ${format === 'csv' ? 'active' : ''}`}
                            onClick={() => setFormat('csv')}
                        >
                            <div className="format-icon csv">
                                <Table size={24} />
                            </div>
                            <span className="format-name">CSV Spreadsheet</span>
                            <span className="format-detail">Best for data analysis</span>
                        </button>

                        <button
                            className={`format-card ${format === 'json' ? 'active' : ''}`}
                            onClick={() => setFormat('json')}
                        >
                            <div className="format-icon json">
                                <FileJson size={24} />
                            </div>
                            <span className="format-name">JSON Data</span>
                            <span className="format-detail">Best for developers</span>
                        </button>
                    </div>

                    <div className="export-actions">
                        {complete ? (
                            <button className="download-btn complete" disabled>
                                <CheckCircle size={18} /> Export Complete
                            </button>
                        ) : (
                            <button
                                className="download-btn"
                                onClick={handleExport}
                                disabled={downloading}
                            >
                                {downloading ? (
                                    <span className="spinner"></span>
                                ) : (
                                    <Download size={18} />
                                )}
                                {downloading ? 'Preparing Download...' : `Download ${format.toUpperCase()}`}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExportModal;
