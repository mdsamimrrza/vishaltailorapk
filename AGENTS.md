# Reference Web App (source of truth)

This project is the **Android APK port** of the New Vishal Tailors web app.

The web app lives at: `C:\Users\samim_40uxmfb\Desktop\deplyed project\Tailor-Masterpiece`

- Always read the web app first when porting or verifying features, content, data, translations, or branding.
  - Content/data: `apps/web/src/data/` (e.g. `catalogue.ts`, `testimonials.ts`)
  - Translations: `apps/web/src/lib/translations.ts` (en / ne / hi)
  - Business constants & hours: `apps/web/src/utils/businessHours.ts`
  - Sections/screens: `apps/web/src/pages/home.tsx` and `apps/web/src/components/`
  - Brand assets, fonts, icons: `apps/nvt-stage/` (brand, fonts, images, `catalogue.json`)
- Keep APK content byte-for-byte consistent with the web app (same items, IDs, copy in all 3 languages). When they disagree, the web app wins unless the user says otherwise.
- APK-side equivalents live in `src/data/`, `src/i18n/`, `src/constants/business.ts`, `src/theme/`, and `src/app/`.

# Expo HAS CHANGED

Read the exact versioned docs at https://docs.expo.dev/versions/v57.0.0/ before writing any code.
