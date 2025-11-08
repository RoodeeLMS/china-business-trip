#!/usr/bin/env python3
import glob
from PyPDF2 import PdfMerger

def merge_pdfs():
    """Merge all PDF files into a single combined PDF"""
    
    # Find all PDF files in subdirectories
    pdf_files = []
    
    # Packing Lists
    pdf_files.extend(glob.glob("Packing Lists/*.pdf"))
    
    # Data
    pdf_files.extend(glob.glob("Data/*.pdf"))
    
    # Briefings
    pdf_files.extend(glob.glob("Briefings/*.pdf"))
    
    # Mind Maps
    pdf_files.extend(glob.glob("Mind Maps/*.pdf"))
    
    # Itineraries
    pdf_files.extend(glob.glob("Itineraries/*.pdf"))
    
    # Sort files to ensure consistent order
    pdf_files.sort()
    
    print(f"Found {len(pdf_files)} PDF files:")
    for pdf in pdf_files:
        print(f"  - {pdf}")
    
    # Create merger and add all PDFs
    merger = PdfMerger()
    
    for pdf_file in pdf_files:
        try:
            merger.append(pdf_file)
            print(f"Added: {pdf_file}")
        except Exception as e:
            print(f"Error adding {pdf_file}: {e}")
    
    # Write the merged PDF
    output_file = "Combined_PDF_Packet_FAT_PSD.pdf"
    try:
        merger.write(output_file)
        merger.close()
        print(f"\n✓ Successfully created: {output_file}")
        print(f"  Total pages: Merged from {len(pdf_files)} PDF files")
    except Exception as e:
        print(f"Error creating merged PDF: {e}")

if __name__ == "__main__":
    merge_pdfs()

