const sharp = require('sharp');
const fs = require('fs');
const inputPath = 'public/Gemini_Generated_Image_f8dv0hf8dv0hf8dv.jpg';
const outputPath = 'public/og-image-compressed.jpg';

sharp(inputPath)
  .jpeg({ quality: 60 }) // Reduce quality to decrease MB size without cropping or resizing
  .toFile(outputPath)
  .then(info => {
    console.log('Success:', info);
  })
  .catch(err => {
    console.error('Error:', err);
  });
