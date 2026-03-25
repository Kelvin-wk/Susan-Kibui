
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';
import { CartItem, User, PaymentMethod } from '../types';

export const generateReceipt = async (user: User, items: CartItem[], total: number, method: PaymentMethod, orderId: string, mpesaNumber?: string) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleString();
  const appUrl = window.location.origin;

  // Generate QR Code
  const qrCodeDataUrl = await QRCode.toDataURL(appUrl, {
    margin: 1,
    width: 100,
    color: {
      dark: '#4F46E5', // Indigo-600
      light: '#FFFFFF'
    }
  });

  // --- HEADER ---
  // Background accent
  doc.setFillColor(249, 250, 251); // slate-50
  doc.rect(0, 0, 210, 60, 'F');
  
  // Logo Text
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  doc.setTextColor(79, 70, 229); // Indigo-600
  doc.text("S.", 20, 35);
  
  doc.setFontSize(24);
  doc.setTextColor(15, 23, 42); // slate-900
  doc.text("SUSAN'S MARKET", 32, 35);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139); // slate-500
  doc.text("PREMIUM HARDWARE & TECH • NAIROBI, KENYA", 32, 42);

  // QR Code on the right
  doc.addImage(qrCodeDataUrl, 'PNG', 160, 10, 35, 35);
  doc.setFontSize(8);
  doc.text("Scan to shop again", 177.5, 48, { align: 'center' });

  // --- ORDER INFO ---
  doc.setDrawColor(226, 232, 240); // slate-200
  doc.line(20, 65, 190, 65);

  // Left Column: Customer Details
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text("BILL TO:", 20, 75);
  
  doc.setFontSize(12);
  doc.setTextColor(15, 23, 42);
  doc.text(user.name, 20, 82);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(user.email, 20, 88);

  // Right Column: Order Details
  doc.setFont("helvetica", "bold");
  doc.setTextColor(100, 116, 139);
  doc.text("ORDER DETAILS:", 120, 75);
  
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(`Order ID: #${orderId}`, 120, 82);
  doc.text(`Date: ${date}`, 120, 88);
  doc.text(`Payment: ${method.toUpperCase()}`, 120, 94);
  if (mpesaNumber) {
    doc.text(`M-Pesa No: ${mpesaNumber}`, 120, 100);
  }

  // --- TABLE ---
  const tableData = items.map(item => [
    item.name,
    item.category,
    `KES ${item.price.toLocaleString()}`,
    item.quantity.toString(),
    `KES ${(item.price * item.quantity).toLocaleString()}`
  ]);

  autoTable(doc, {
    startY: 105,
    head: [['PRODUCT', 'CATEGORY', 'PRICE', 'QTY', 'SUBTOTAL']],
    body: tableData,
    theme: 'grid',
    headStyles: { 
      fillColor: [15, 23, 42], 
      textColor: 255,
      fontSize: 9,
      fontStyle: 'bold',
      halign: 'center'
    },
    styles: { 
      fontSize: 10, 
      cellPadding: 6,
      lineColor: [241, 245, 249],
      lineWidth: 0.1
    },
    columnStyles: {
      0: { cellWidth: 70 },
      2: { halign: 'right' },
      3: { halign: 'center' },
      4: { halign: 'right', fontStyle: 'bold' }
    }
  });

  const finalY = (doc as any).lastAutoTable.finalY || 160;

  // --- SUMMARY ---
  doc.setDrawColor(226, 232, 240);
  doc.line(120, finalY + 5, 190, finalY + 5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 116, 139);
  doc.text("Subtotal:", 140, finalY + 15, { align: 'right' });
  doc.setTextColor(15, 23, 42);
  doc.text(`KES ${total.toLocaleString()}`, 190, finalY + 15, { align: 'right' });

  doc.setTextColor(100, 116, 139);
  doc.text("Shipping:", 140, finalY + 22, { align: 'right' });
  doc.setTextColor(34, 197, 94); // emerald-500
  doc.text("FREE", 190, finalY + 22, { align: 'right' });

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(79, 70, 229);
  doc.text("TOTAL:", 140, finalY + 35, { align: 'right' });
  doc.text(`KES ${total.toLocaleString()}`, 190, finalY + 35, { align: 'right' });

  // --- PAID STAMP ---
  doc.setDrawColor(34, 197, 94); // emerald-500
  doc.setLineWidth(1);
  doc.roundedRect(20, finalY + 10, 40, 20, 3, 3, 'S');
  doc.setFontSize(16);
  doc.setTextColor(34, 197, 94);
  doc.text("PAID", 40, finalY + 23, { align: 'center', angle: 5 });

  // --- WATERMARK / BADGE ---
  doc.setGState(new (doc as any).GState({ opacity: 0.1 }));
  doc.setFontSize(40);
  doc.setTextColor(34, 197, 94);
  doc.text("VERIFIED PURCHASE", 105, finalY + 60, { align: 'center', angle: 15 });
  doc.setGState(new (doc as any).GState({ opacity: 1 }));

  // --- FOOTER ---
  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text("Thank you for choosing Susan's Market!", 105, 275, { align: 'center' });
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text("This is a computer-generated receipt and does not require a physical signature.", 105, 282, { align: 'center' });
  doc.text("Support: kibuikevin@zetech.ac.ke | +254 114 718 252", 105, 287, { align: 'center' });

  // Save
  doc.save(`SusansMarket_Receipt_${orderId}.pdf`);
};
