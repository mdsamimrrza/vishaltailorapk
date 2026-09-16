import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

const nvtRoot = 'assets/images/nvt';

// Convert all JPG/PNG in nvt root and services to WebP
async function convert() {
  // Root level images
  await imagemin([`${nvtRoot}/*.{jpg,png,jpeg}`], {
    destination: nvtRoot,
    plugins: [
      imageminWebp({ quality: 80 }),
      imageminMozjpeg({ quality: 85 }),
      imageminPngquant({ quality: [0.7, 0.8] })
    ]
  });
  
  // Services folder
  await imagemin([`${nvtRoot}/services/*.{jpg,png,jpeg}`], {
    destination: `${nvtRoot}/services`,
    plugins: [
      imageminWebp({ quality: 80 }),
      imageminMozjpeg({ quality: 85 }),
      imageminPngquant({ quality: [0.7, 0.8] })
    ]
  });
  
  // Thumbs - already small, just optimize
  const thumbDirs = ['catalogue', 'suit', 'shirt', 'safari', 'khandress', 'kurtapajama', 'gallery'];
  for (const dir of thumbDirs) {
    await imagemin([`${nvtRoot}/${dir}/thumbs/*.{jpg,png,jpeg}`], {
      destination: `${nvtRoot}/${dir}/thumbs`,
      plugins: [
        imageminWebp({ quality: 75 }),
        imageminMozjpeg({ quality: 80 }),
        imageminPngquant({ quality: [0.6, 0.7] })
      ]
    });
  }
  
  console.log('Conversion done');
}

convert().catch(console.error);
