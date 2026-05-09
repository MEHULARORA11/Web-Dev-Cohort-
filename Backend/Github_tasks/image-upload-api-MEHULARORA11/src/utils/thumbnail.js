import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const THUMBNAILS_DIR = path.join(__dirname, '../../uploads/thumbnails');

/**
 * TODO: Generate thumbnail for uploaded image
 *
 * Requirements:
 * 1. Construct input path: uploads/{filename}
 * 2. Create thumbnail name: "thumb-{filename}.jpg" (always .jpg extension)
 *    Example: "1704067200000-abc123.png" → "thumb-1704067200000-abc123.jpg"
 * 3. Construct output path: uploads/thumbnails/{thumbnailName}
 * 4. Use sharp to resize image:
 *    - Max dimensions: 200x200
 *    - fit: 'inside' (maintain aspect ratio)
 *    - withoutEnlargement: true (don't make small images larger)
 * 5. Convert to JPEG with quality 80
 * 6. Save to output path
 * 7. Return thumbnail filename
 *
 * @param {string} filename - Original filename (e.g., "1704067200000-abc123.jpg")
 * @returns {Promise<string>} - Thumbnail filename (e.g., "thumb-1704067200000-abc123.jpg")
 *
 * Hints:
 * - Use path.join() to construct file paths
 * - Use sharp(inputPath).resize(...).jpeg(...).toFile(outputPath)
 * - Replace file extension: filename.replace(/\.\w+$/, '.jpg')
 *
 * Example:
 * const thumb = await generateThumbnail('1704067200000-abc123.png');
 * // Returns: 'thumb-1704067200000-abc123.jpg'
 * // Creates: uploads/thumbnails/thumb-1704067200000-abc123.jpg
 */


/**
 * Generate thumbnail for uploaded image
 */
export async function generateThumbnail(filename) {

  const inputPath = path.join(// why not directly uploads/filename as => in linux we use \ this forward slash so problem hogi => so path.join automatically handles it base on the machine and environment 
    "uploads",
    filename
  );

  const thumbnailName = `thumb-${filename.replace(
    /\.\w+$/,
    ".jpg"
  )}`;

  const outputPath = path.join(
    "uploads",
    "thumbnails",
    thumbnailName
  );

  await sharp(inputPath)
    .resize(200, 200, {
      fit: "inside",
    })
    .jpeg({
      quality: 80
    })
    .toFile(outputPath);

  return thumbnailName;
}

/**
 * This code uses Sharp, a very popular high-performance image processing library for Node.js.
It processes an image using method chaining.

Full Code
await sharp(inputPath)  .resize(200, 200, {    fit: "inside",    withoutEnlargement: true  })  .jpeg({    quality: 80  })  .toFile(outputPath);

What This Entire Pipeline Means
1. Open image2. Resize image3. Convert image to JPEG4. Save image to disk
All in one chain.

Step-by-Step Explanation

1. sharp(inputPath)
sharp(inputPath)
opens image for processing.
Example:
sharp("uploads/cat.png")
Sharp internally:


reads image bytes


decodes image


prepares processing pipeline



Important Concept
Sharp does NOT immediately process image.
It builds a pipeline lazily.
Actual processing happens later when:


.toFile()


.toBuffer()


is called.

2. .resize()
.resize(200, 200, {   fit: "inside",   withoutEnlargement: true})
resizes image.

First Two Arguments
.resize(width, height)
So:
.resize(200, 200)
means:
fit image within 200x200

3. fit: "inside"
VERY important.
Means:
Keep aspect ratio.Fit image INSIDE dimensions.Do NOT crop.

Example
Original:
1000 x 500
Thumbnail:
200 x 100
because aspect ratio preserved.

Other Common fit Values

inside
Fit inside box.No cropping.
Most common for thumbnails.

cover
Fill entire box.May crop image.
Like Instagram profile pictures.

contain
Fit entire image with padding/background.

fill
Stretch image.Ignore aspect ratio.
Usually ugly.

Example
.resize(300, 300, {   fit: "cover"})
creates exact 300x300 image by cropping.

4. withoutEnlargement: true
Very important optimization.
Means:
Do NOT upscale small images.

Example
Original:
100 x 100
Without this option:
Sharp enlarges to 200x200
Image becomes blurry.

With withoutEnlargement
Image stays:
100 x 100
Better quality.

5. .jpeg()
.jpeg({   quality: 80})
converts output image to JPEG format.

quality: 80
JPEG compression quality.
Range:


1 → terrible quality, tiny size


100 → huge size, best quality



Common Production Values
QualityUsage60Aggressive compression80Very common sweet spot90High quality100Usually unnecessary

Example
.jpeg({ quality: 50 })
smaller file but blurrier image.

6. .toFile(outputPath)
.toFile(outputPath)
actually processes pipeline and saves file.
Example:
.toFile("uploads/thumb-cat.jpg")
Creates file physically on disk.

Important Concept
Everything before .toFile() was only configuration.
Actual processing starts HERE.

Why await?
Because image processing is asynchronous.
await sharp(...).toFile(...)
waits until:


resize complete


conversion complete


file saved



Very Important Mental Model
Sharp uses a pipeline:
Image  ↓Resize  ↓Convert  ↓Save
Each method adds transformation step.

Commonly Used Sharp Methods

1. .resize()
Most used.
.resize(300, 300)

2. .jpeg()
Convert to JPEG.
.jpeg({ quality: 80 })

3. .png()
Convert to PNG.
.png()

4. .webp()
Very popular modern format.
.webp({ quality: 80 })
Smaller files than JPEG.

5. .metadata()
Get image info.
const meta = await sharp(path)   .metadata();
Returns:
{   width: 1920,   height: 1080,   format: "jpeg"}
VERY commonly used.

6. .toBuffer()
Instead of saving file:
const buffer = await sharp(path)   .toBuffer();
Useful for:


cloud uploads


memory processing



7. .rotate()
Auto-fix image orientation.
VERY common.
.rotate()
Especially important for mobile uploads.

8. .crop()
.extract({   left: 0,   top: 0,   width: 200,   height: 200})
Cuts image section.

9. .grayscale()
.grayscale()
Black and white image.

10. .blur()
.blur(5)
Adds blur effect.

Example Real Production Thumbnail Pipeline
await sharp(input)   .rotate()   .resize(300, 300, {      fit: "inside"   })   .jpeg({      quality: 80   })   .toFile(output);

Why Sharp Is Popular
Because it is:


extremely fast


memory efficient


production-grade


async


optimized in C++


Used heavily in:


social media


ecommerce


image CDNs


upload services


SaaS products
 */

/**
 * TODO: Get image dimensions
 *
 * Requirements:
 * 1. Use sharp to read image metadata
 * 2. Extract width and height from metadata
 * 3. Return as object: { width: number, height: number }
 *
 * @param {string} filepath - Full path to image file
 * @returns {Promise<{width: number, height: number}>}
 *
 * Hints:
 * - Use sharp(filepath).metadata() to get metadata
 * - Metadata object contains width and height properties
 * 
 * Example:
 * const dims = await getImageDimensions('/path/to/image.jpg');
 * // Returns: { width: 1920, height: 1080 }
 */
export async function getImageDimensions(filepath) {
  const {width,height} = await sharp(filepath).metadata()
  return {width,height}
}
