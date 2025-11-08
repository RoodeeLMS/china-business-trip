#!/bin/bash

# Setup Script - Copy essential files to iCloud for iPhone access
# Created: November 2, 2025
# Purpose: Quick setup for iPhone access

echo "🚀 Setting up files for iPhone access via iCloud..."
echo ""

# Define source and destination
SOURCE_DIR="/Users/sek.j/#Alpha_Project/#Plan_FAT_PSD"
ICLOUD_DIR="$HOME/Library/Mobile Documents/com~apple~CloudDocs/China_Trip_2025"

# Create iCloud directory
echo "📁 Creating iCloud folder..."
mkdir -p "$ICLOUD_DIR"
mkdir -p "$ICLOUD_DIR/Documentation"
mkdir -p "$ICLOUD_DIR/Official_PDFs"

# Copy main dashboard
echo "📄 Copying MASTER_TRIP_DASHBOARD.html..."
cp "$SOURCE_DIR/MASTER_TRIP_DASHBOARD.html" "$ICLOUD_DIR/"

# Copy README
echo "📖 Copying README.md..."
cp "$SOURCE_DIR/README.md" "$ICLOUD_DIR/"

# Copy important documentation
echo "📚 Copying documentation..."
cp "$SOURCE_DIR/00_Documentation/OFFLINE_MAPS_GUIDE.md" "$ICLOUD_DIR/Documentation/"
cp "$SOURCE_DIR/00_Documentation/GITHUB_PUSH_GUIDE.md" "$ICLOUD_DIR/Documentation/"
cp "$SOURCE_DIR/00_Documentation/MOBILE_GUIDE_IPHONE.md" "$ICLOUD_DIR/Documentation/"

# Check if PAYMENT_SYSTEM_GUIDE exists
if [ -f "$SOURCE_DIR/00_Documentation/PAYMENT_SYSTEM_GUIDE.md" ]; then
    cp "$SOURCE_DIR/00_Documentation/PAYMENT_SYSTEM_GUIDE.md" "$ICLOUD_DIR/Documentation/"
fi

# Copy itinerary PDF
echo "📅 Copying Itinerary PDF..."
cp "$SOURCE_DIR/01_Official_Documents/Itineraries/Itinerary - ORL PSD FAT Doorway Test - 10-14 Nov 2025 - R1.pdf" "$ICLOUD_DIR/Official_PDFs/" 2>/dev/null || echo "⚠️  Itinerary PDF not found"

# Copy briefing PDF
echo "📊 Copying Briefing PDF..."
cp "$SOURCE_DIR/01_Official_Documents/Briefings/NBLLM Briefing - FAT PSD.pdf" "$ICLOUD_DIR/Official_PDFs/" 2>/dev/null || echo "⚠️  Briefing PDF not found"

# Copy receipt image
echo "🖼️  Copying UNIQLO receipt..."
cp "$SOURCE_DIR/02_Receipts_Images/1761999700151@2x.jpg" "$ICLOUD_DIR/" 2>/dev/null || echo "⚠️  Receipt image not found"

echo ""
echo "✅ Setup complete!"
echo ""
echo "📱 Next steps on your iPhone:"
echo "1. Open Files app"
echo "2. Go to iCloud Drive"
echo "3. Open folder: China_Trip_2025"
echo "4. Tap MASTER_TRIP_DASHBOARD.html"
echo "5. Open in Safari"
echo "6. Share → Add to Home Screen"
echo ""
echo "🎉 Done! You'll have a dashboard icon on your iPhone!"
echo ""
echo "📂 Files copied to:"
echo "   $ICLOUD_DIR"
echo ""
echo "⏱️  Wait ~1-2 minutes for iCloud to sync to your iPhone"
echo ""

# Open iCloud folder in Finder
echo "📂 Opening iCloud folder..."
open "$ICLOUD_DIR"

echo "✨ All set! Check your iPhone Files app in 1-2 minutes!"

