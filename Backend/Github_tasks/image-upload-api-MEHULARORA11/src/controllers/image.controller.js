import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Image } from '../models/image.model.js';
import { generateThumbnail, getImageDimensions } from '../utils/thumbnail.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url)); // important 


//#region  //*=========== concepts ===========
/**
 * 🧠 What does this line mean?
import path from 'path';

👉 You are importing a built-in Node.js module called path

👉 This module helps you work with file and folder paths safely

📌 First: What is a “path”?

A path = location of a file in your system

Examples:
C:\Users\Mehul\project\image.png   (Windows)
/home/mehul/project/image.png      (Linux/Mac)

👉 These are paths

❗ Problem (why path module exists)

Different OS use different formats:

OS	Separator
Windows	\
Linux/Mac	/

If you hardcode:

"folder/file.txt"

👉 Might break on Windows ❌

✅ Solution: path module

It handles:

separators
joining paths
resolving paths
extracting file names

👉 Automatically works across OS

🔥 Most important functions (you’ll actually use)
1️⃣ path.join()
path.join('uploads', 'images', 'file.png')

👉 Output (Windows):

uploads\images\file.png

👉 Output (Linux):

uploads/images/file.png
🧠 Why use it?

Instead of:

'uploads/images/file.png' ❌

Use:

path.join('uploads', 'images', 'file.png') ✅
2️⃣ path.resolve()
path.resolve('uploads', 'file.png')

👉 Gives absolute path

Example:

D:\project\uploads\file.png
🧠 Use case:
When working with file system
When loading files (like your ML model)
3️⃣ path.basename()
path.basename('uploads/file.png')

👉 Output:

file.png
4️⃣ path.extname()
path.extname('image.png')

👉 Output:

.png
5️⃣ path.dirname()
path.dirname('uploads/file.png')

👉 Output:

uploads
 */
//#endregion  //*======== concepts ===========

/**
 * TODO: Upload image
 *
 * 1. Check if file uploaded (if !req.file, return 400 "No file uploaded")
 * 2. Get file info from req.file (filename, originalname, mimetype, size)
 * 3. Get image dimensions using getImageDimensions(filepath)
 * 4. Generate thumbnail using generateThumbnail(filename)
 * 5. Extract optional fields from req.body (description, tags)
 *    - Parse tags: split by comma and trim each tag
 * 6. Save metadata to database (Image.create)
 * 7. Return 201 with image meta data
 */
export async function uploadImage(req, res, next) {
  try {
    if(!req.file){
      return res.status(400).json({
  error: {
    message: "No file uploaded"
  }
})
    }
    const {filename,originalname,mimetype,size,path:filepath} = req.file
 
     const { width, height } = await getImageDimensions(filepath);
  
     const thumbnail = await generateThumbnail(filename);
     const {description, tags} = req.body
     const allTag = tags ?  tags.split(',').map(tag => tag.trim()):[]
     const image = await Image.create({
      originalName:originalname,
      filename,
      mimetype,
      size,
      width,
      height,
      description,
      tags:allTag,
      thumbnailFilename:thumbnail
     })

     return res.status(201).json(image)
  } catch (error) {
    next(error);
  }
}

//#region  //*===========  ===========
/**
 * es — but not exactly the same in all cases. You’re close, but let’s correct the understanding properly.

🧠 Core idea

👉 req.file and req.files depend on how you configure multer

🔥 3 Different multer modes
1️⃣ .single() → gives req.file
upload.single('image')

👉 You get:

req.file  ✅ (object)
req.files ❌ undefined
2️⃣ .array() → gives req.files (array)
upload.array('images', 5)

👉 You get:

req.files  ✅ (array)
req.file   ❌ undefined
Example:
[
  { filename: 'a.png', size: 123 },
  { filename: 'b.png', size: 456 }
]
3️⃣ .fields() → gives req.files (object)
upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gallery', maxCount: 5 }
])

👉 You get:

req.files = {
  image: [ {...} ],
  gallery: [ {...}, {...} ]
}
⚠️ Important correction (this is where people mess up)

👉 req.files is NOT the same as req.file

Feature	req.file	req.files
Type	Object	Array / Object
Use case	Single file	Multiple files
🔥 So your question:

“can we get the same in req.files?”

👉 ❌ Not exactly
👉 ✅ You get similar data structure, but wrapped differently

💡 Example comparison
.single()
req.file.filename
.array()
req.files[0].filename
.fields()
req.files.image[0].filename
🧠 Mental model

👉 Think:

req.file → one file
req.files → collection of files
🔥 In YOUR project (important)

You are doing:

if (!req.file)

👉 So you are using:

upload.single(...)

✔️ Correct for:

profile image
single upload
ML prediction input
🧠 One-line summary (your style)

👉 req.file is for one file, req.files is for multiple files depending on multer configuration.

🚀 If you want next level

I can show:

how multer internally parses multipart data
OR why req.file sometimes becomes undefined (very common bug)

Just tell 👍
*/
//#endregion  //*========  ===========

/**
 * TODO: List images with pagination and filtering
 *
 * 1. Extract query parameters:
 *    - page (default 1)
 *    - limit (default 10, max 50)
 *    - search (search in originalName and description)
 *    - mimetype (filter by mimetype)
 *    - sortBy (field to sort by, default 'uploadDate')
 *    - sortOrder (asc or desc, default 'desc')
 *
 * 2. Build MongoDB query:
 *    - Add text search if search parameter provided
 *    - Add mimetype filter if provided
 *
 * 3. Calculate pagination:
 *    - skip = (page - 1) * limit
 *    - total = await Image.countDocuments(query)
 *    - pages = Math.ceil(total / limit)
 *
 * 4. Fetch images with sorting and pagination:
 *    - Image.find(query).sort({[sortBy]: sortOrder === 'asc' ? 1 : -1}).skip(skip).limit(limit)
 *
 * 5. Calculate totalSize (sum of all image sizes)
 *
 * 6. Return 200 with:
 *    - data: images array
 *    - meta: { total, page, limit, pages, totalSize }
 */


export async function listImages(req, res, next) {
 try {
   let {
    page = 1,
    limit = 10,
    search = "",
    mimetype,
    sortBy = "uploadDate",
    sortOrder = "desc"
  } = req.query

  limit = parseInt(limit)
  page = parseInt(page)

  if(limit>50){
    limit = 50
  }

  const query = {}

  if(search){
    query.$or = [{ // as $or  must be an array
      originalName:{
        $regex:search,
        $options:"i"
      }
    },
      {
        description:{
        $regex:search,
        $options:"i"
      }
    }
  ]
  }

  if(mimetype){
    query.mimetype = mimetype
  }

  const skip = (page - 1)*limit
  const total = await Image.countDocuments(query)
  const pages = Math.ceil(total/limit)
  
  const images = await Image.find(query)
  .sort({[sortBy]:sortOrder === 'asc'?1:-1})
  .limit(limit)
  .skip(skip)

  const totalSize = images.reduce((acc,image) => {
   return acc + image.size
  },0)

  res.status(200).json({
    data:images,
    meta:{
    total,
    page,
    limit,
    pages,
    totalSize
    }
  })
 } catch (error) {
  next(error)
 }

}


// export async function listImages(req, res, next) {
//   try {

//     /**
//      * 1. Extract query params
//      */
//     let {
//       page = 1,
//       limit = 10,
//       search = "",
//       mimetype,
//       sortBy = "uploadDate",
//       sortOrder = "desc"
//     } = req.query;

//     /**
//      * Convert to numbers
//      */
//     page = Number(page);
//     limit = Number(limit);

//     /**
//      * Max limit = 50
//      */
//     if (limit > 50) {
//       limit = 50;
//     }

//     /**
//      * 2. Build MongoDB query
//      */
//     const query = {};

//     /**
//      * Search in originalName and description
//      */
//     if (search) {
//       query.$or = [
//         {
//           originalName: {
//             $regex: search,
//             $options: "i"
//           }
//         },
//         {
//           description: {
//             $regex: search,
//             $options: "i"
//           }
//         }
//       ];
//     }

//     /**
//      * Filter by mimetype
//      */
//     if (mimetype) {
//       query.mimetype = mimetype;
//     }

//     /**
//      * 3. Pagination calculations
//      */
//     const skip = (page - 1) * limit;

//     const total = await Image.countDocuments(query);

//     const pages = Math.ceil(total / limit);

//     /**
//      * 4. Fetch images
//      */
//     const images = await Image.find(query)
//       .sort({
//         [sortBy]: sortOrder === "asc" ? 1 : -1
//       })
//       .skip(skip)
//       .limit(limit);

//       /**
//        * Why 1 and -1?

// In MongoDB:

// Value	Meaning
// 1	Ascending
// -1	Descending
//        */

//     /**
//      * 5. Calculate total size
//      */
//     const totalSize = images.reduce((acc, image) => {
//       return acc + image.size;
//     }, 0);

//     /**
//      * 6. Response
//      */
//     res.status(200).json({
//       data: images,
//       meta: {
//         total,
//         page,
//         limit,
//         pages,
//         totalSize
//       }
//     });

//   } catch (error) {
//     next(error);
//   }
// }

/**
 * TODO: Get image metadata by ID
 *
 * 1. Find image by req.params.id
 * 2. If not found: return 404 "Image not found"
 * 3. Return 200 with image metadata
 */
export async function getImage(req, res, next) {
  try {
   const imageId = req.params.id
    const image = await Image.findById(imageId)
    if(!image){
    return res.status(404).json({
    error: {
      message: "Image not found"
    }
  })
   }
    res.status(200).json(image)
  } catch (error) {
    next(error);
  }
}
// http is built on top of tcp protocol , tcp comes on transport layer where as http is built on application layer
// api is just a method to talk  
/**
 * TODO: Download original image
 *
 * 1. Find image by req.params.id
 * 2. If not found: return 404 "Image not found"
 * 3. Construct file path
 * 4. Check if file exists using fs.existsSync()
 * 5. If file missing: return 404 "File not found"
 * 6. Set headers:
 *    - Content-Type: image.mimetype
 *    - Content-Disposition: attachment; filename="originalName"
 * 7. Send file using res.sendFile(filepath)
 */
export async function downloadImage(req, res, next) {
  try {
    const imageId = req.params.id
    const image = await Image.findById(imageId)
    if(!image){
      return res.status(404).json({
  error: {
    message: "Image not found"
  }
})
    }

    const filePath = path.join(
  __dirname,
  '../../uploads',
  image.filename
)

    if(!fs.existsSync(filePath)){
       return res.status(404).json({
  error: {
    message: "File not found"
  }
})
    }

    res.set({
      'Content-Type':image.mimetype,
      'Content-Disposition':`attachment; filename=${image.originalName}`
    })
    res.sendFile(filePath)

  } catch (error) {
    next(error);
  }
}

/**
 * In Express.js there is:
res.setHeader()
from Node.js
and also Express shorthand:
res.set()
There is NO standard:
res.setHeaders()
method in Express.

1. res.setHeader() (Node.js Native)
Sets ONE header at a time.
Example:
res.setHeader(   "Content-Type",   "application/json");

Multiple Headers Using setHeader
res.setHeader(   "Content-Type",   "image/jpeg");res.setHeader(   "Cache-Control",   "no-cache");

2. res.set() (Express Method)
More commonly used in Express.
Can set:


single header


multiple headers



Single Header
res.set(   "Content-Type",   "image/jpeg");

Multiple Headers
res.set({   "Content-Type": "image/jpeg",   "Cache-Control": "no-cache",   "X-Custom": "hello"});
This is probably what you mean by “setHeaders”.

Example Download
res.set({   "Content-Type": file.mimetype,   "Content-Disposition":      `attachment; filename="${file.originalname}"`});

Difference
MethodComes FromMultiple Headers?res.setHeader()Node.jsNores.set()ExpressYes

Most Common Express Style
Usually developers use:
res.set({...})
for multiple headers because cleaner.

Important Concept
Headers must be set BEFORE:


res.send()


res.json()


res.sendFile()


res.download()


because once response starts sending, headers are locked.

Example
res.set({   "Content-Type": "application/pdf"});res.sendFile(filepath);
Works.

Wrong Order
res.send("hello");res.set("X-Test", "123");
Fails because response already sent.
 */

/**
 * fs.existsSync() checks whether a file or folder exists on disk synchronously.

In Node.js:

fs.existsSync(path)

returns:

true  → file/folder exists
false → does not exist
 */

/**
 * TODO: Download thumbnail
 *
 * 1. Find image by req.params.id
 * 2. If not found: return 404 "Image not found"
 * 3. Construct thumbnail path
 * 4. Check if thumbnail exists
 * 5. If missing: return 404 "File not found"
 * 6. Set headers:
 *    - Content-Type: image/jpeg (thumbnails are always JPEG)
 * 7. Send file using res.sendFile(thumbnailPath)
 */

export async function downloadThumbnail(req, res, next) {
  try {

    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({
  error: {
    message: "Image not found"
  }
});
    }

   const thumbnailPath = path.join(
  __dirname,
  '../../uploads/thumbnails',
  image.thumbnailFilename
)

    if (!fs.existsSync(thumbnailPath)) {
      return res.status(404).json({
  error: {
    message: "File not found"
  }
});
    }


    res.set({
      "Content-Type": "image/jpeg"
    });

    res.sendFile(thumbnailPath);

  } catch (error) {
    next(error);
  }
}

/**
 * TODO: Delete image
 *
 * 1. Find image by req.params.id
 * 2. If not found: return 404 "Image not found"
 * 3. Delete original file (use try-catch, ignore ENOENT errors)
 * 4. Delete thumbnail (use try-catch, ignore ENOENT errors)
 * 5. Delete metadata from database
 * 6. Return 204 (no content)
 */
export async function deleteImage(req, res, next) {
  try {
    const imageId = req.params.id
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({
  error: {
    message: "Image not found"
  }
});
    }

   const originalPath = path.join(
  __dirname,
  '../../uploads',
  image.filename
)

const thumbnailPath = path.join(
  __dirname,
  '../../uploads/thumbnails',
  image.thumbnailFilename
)

   try {
  fs.unlinkSync(originalPath)
} catch (err) {
  if (err.code !== 'ENOENT') {
    throw err
  }
}

try {
  fs.unlinkSync(thumbnailPath)
} catch (err) {
  if (err.code !== 'ENOENT') {
    throw err
  }
}
  
      await Image.findByIdAndDelete(req.params.id);
      res.status(204).send()

  } catch (error) {
    next(error);
  }
}
