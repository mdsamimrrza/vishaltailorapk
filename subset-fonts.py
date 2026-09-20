#!/usr/bin/env python3
"""
Font subsetting script for New Vishal Tailors app.
Subsets fonts to only include characters actually used in the app.
"""
import os
import re
import json
import sys
from fontTools.subset import Subsetter, Options

# Path to fonts
FONT_DIR = "assets/fonts"
OUTPUT_DIR = "assets/fonts-subset"

# Fonts to subset
FONTS = {
    "tiro-400.ttf": "tiro-400-subset.ttf",
    # Add others as needed
}

# Extract all characters used in the app
def extract_chars():
    chars = set()
    
    # 1. From translations (extras.ts) - regex extraction
    with open("src/i18n/extras.ts", "r", encoding="utf-8") as f:
        content = f.read()
    
    # Find all string values in the extras object
    string_matches = re.findall(r':\s*"([^"]*)"', content)
    for s in string_matches:
        chars.update(s)
    
    # 2. From catalogue data (names, descriptions)
    with open("src/data/catalogue.json", "r", encoding="utf-8") as f:
        catalogue = json.load(f)
    for item in catalogue:
        for field in ["nameEn", "nameNe", "nameHi", "descEn", "descNe", "descHi", 
                      "fitEn", "fitNe", "fitHi", "fabricEn", "fabricNe", "fabricHi",
                      "colorEn", "colorNe", "colorHi"]:
            if field in item:
                chars.update(str(item[field]))
        for tag_list in ["tagsEn", "tagsNe", "tagsHi"]:
            if tag_list in item:
                for tag in item[tag_list]:
                    chars.update(tag)
    
    # 3. From other data files
    for data_file in ["src/data/services.ts", "src/data/fabrics.ts", 
                      "src/data/testimonials.ts", "src/data/whyChooseUs.ts",
                      "src/data/faq.ts", "src/data/process.ts"]:
        if os.path.exists(data_file):
            with open(data_file, "r", encoding="utf-8") as f:
                content = f.read()
            string_matches = re.findall(r':\s*"([^"]*)"', content)
            for s in string_matches:
                chars.update(s)
    
    # 4. Add ASCII printable (always needed)
    chars.update(chr(i) for i in range(32, 127))
    
    # 5. Add Devanagari range for Nepali/Hindi (common chars)
    devanagari_common = (
        "अआइईउऊऋएऐओऔकखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह"
        "ािीुूृेैोौंःॅॉॆॊ"
        "०१२३४५६७८९"
        "।॥"
    )
    chars.update(devanagari_common)
    
    # 6. Currency symbols, punctuation
    chars.update("₹$€£¥%°•–—'\"«»()[]{}")
    
    return chars

def subset_font(input_path, output_path, chars):
    """Subset a font file to only include specified characters."""
    if not os.path.exists(input_path):
        print(f"Font not found: {input_path}")
        return False
    
    options = Options()
    options.desubroutinize = True
    # Don't drop tables - let fontTools handle them
    options.hinting = False
    options.layout_features = ["*"]
    options.name_legacy = True
    options.name_IDs = ["*"]
    options.no_subset_tables = []
    options.optimize_cff = True
    options.recalc_bounds = True
    options.recalc_timestamp = True
    
    # Convert char set to unicode codepoints
    codepoints = [ord(c) for c in chars]
    options.unicodes = codepoints
    
    try:
        from fontTools.ttLib import TTFont
        font = TTFont(input_path)
        
        # Create subsetter and subset the font
        subsetter = Subsetter(options)
        subsetter.populate(unicodes=codepoints)
        subsetter.subset(font)
        
        # Save the subset font
        font.save(output_path)
        font.close()
        
        # Get sizes
        original_size = os.path.getsize(input_path)
        new_size = os.path.getsize(output_path)
        print(f"  {os.path.basename(input_path)}: {original_size/1024:.1f} KB → {new_size/1024:.1f} KB ({new_size/original_size*100:.1f}%)")
        return True
    except Exception as e:
        print(f"Error subsetting {input_path}: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    print("Extracting characters used in app...")
    chars = extract_chars()
    print(f"Total unique characters: {len(chars)}")
    
    print("\nSubsetting fonts...")
    for src, dst in FONTS.items():
        input_path = os.path.join(FONT_DIR, src)
        output_path = os.path.join(OUTPUT_DIR, dst)
        subset_font(input_path, output_path, chars)
    
    # Copy other fonts that don't need subsetting
    import shutil
    for font_file in os.listdir(FONT_DIR):
        if font_file not in FONTS:
            shutil.copy2(os.path.join(FONT_DIR, font_file), os.path.join(OUTPUT_DIR, font_file))
            print(f"  {font_file}: copied as-is")
    
    print(f"\nDone! Subset fonts in {OUTPUT_DIR}/")

if __name__ == "__main__":
    main()
