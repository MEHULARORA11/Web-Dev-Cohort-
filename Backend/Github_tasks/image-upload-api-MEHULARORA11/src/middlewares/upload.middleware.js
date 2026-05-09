import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
 
/**
 * TODO: Configure multer for image uploads
 *
 * 1. Define __dirname and UPLOAD_DIR (path to uploads folder in project root)
 * 2. Create diskStorage with:
 *    - destination: UPLOAD_DIR
 *    - filename: Generate unique name using Date.now() and crypto.randomBytes(4).toString('hex')
 *      Format: {timestamp}-{random}{extension}
 * 3. Add fileFilter to validate:
 *    - Only allow image/jpeg, image/png, image/gif
 *    - Reject others with: cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'), false)
 * 4. Set limits:
 *    - fileSize: 5MB (5 * 1024 * 1024)
 * 5. Export upload middleware
 *
 * Example structure:
 * const __dirname = path.dirname(fileURLToPath(import.meta.url));
 * const UPLOAD_DIR = path.join(__dirname, '../../uploads');
 *
 * const storage = multer.diskStorage({
 *   destination: (req, file, cb) => { ... },
 *   filename: (req, file, cb) => { ... }
 * });
 *
 * const fileFilter = (req, file, cb) => { ... };
 *
 * export const upload = multer({ storage, fileFilter, limits: { ... } });
 */


//#region  //*=========== concept ===========
/**
 * Real Mental Model
Step 1
import.meta.url

↓

file:///D:/project/src/config/upload.js
Step 2
fileURLToPath(...)

↓

D:/project/src/config/upload.js
Step 3
path.dirname(...)

↓

D:/project/src/config

Now THIS becomes true __dirname.
 */
/**
 * Good question.
You are very close — the confusion is mainly about where your current file is located and how paths move between folders.

First Understand Your Project Structure
Suppose project is:
project/│├── uploads/│├── src/│   └── config/│       └── upload.js│└── package.json
Your current file is:
src/config/upload.js
BUT uploads folder is:
project/uploads

VERY IMPORTANT
__dirname means:
folder containing current file
So:
const __dirname = path.dirname(   fileURLToPath(import.meta.url));
becomes:
D:/project/src/config
NOT project root.

Now Your Current Code
path.resolve(__dirname,'uploads')
means:
Take current folderand go INSIDE uploads folder
So result becomes:
D:/project/src/config/uploads
BUT uploads folder is NOT there.

Actual uploads Folder Is Here
D:/project/uploads
So you must MOVE UP folders first.

Why ../../uploads
From:
D:/project/src/config
we need to reach:
D:/project/uploads

Step-by-Step Folder Movement
Current:
D:/project/src/config

First ..
../
means:
go one folder up
Result:
D:/project/src

Second ..
../../
means:
go another folder up
Result:
D:/project

Then /uploads
Now:
D:/project/uploads
Correct destination reached.

Visual Representation
src/config    ↑    .. (go up)src    ↑    .. (go up)project    ↓ uploads
That is EXACTLY what:
"../../uploads"
means.

Now Why path.join()?
This:
path.join(__dirname, "../../uploads")
means:
Join current folder with relative path
and Node automatically normalizes it.

Final Result
D:/project/uploads

Could We Use resolve()?
YES — absolutely.
This also works:
path.resolve(__dirname, "../../uploads")
Perfectly valid.

Then Why Did I Say join()?
Because conceptually:


join() = concatenate path pieces


resolve() = calculate absolute path


For relative folder building, many tutorials prefer join() because mentally simpler.
BUT BOTH WORK HERE.

Difference Between join() and resolve()

join()
Simply joins path segments.
Example:
path.join(   "a",   "b",   "c")
↓
a/b/c

resolve()
Builds FULL ABSOLUTE path.
Processes:


current working directory


absolute segments


relative movement (..)



Example
path.resolve("a", "../b")
↓
/current-working-dir/b

In Your Case
Both produce same result:
path.join(__dirname, "../../uploads")
↓
D:/project/uploads

path.resolve(__dirname, "../../uploads")
↓
D:/project/uploads

Then Why Your Original Code Was Wrong
Because you wrote:
path.resolve(__dirname,'uploads')
which means:
current-folder/uploads
NOT:
project-root/uploads
You forgot to move UP directories.

Most Important Mental Model
..
Means:
go one folder upward

../../
Means:
go two folders upward

Path Building Is Basically Folder Navigation
Exactly like navigating folders manually in file explorer.
 */
//#endregion  //*======== concept ===========


const __dirname = path.dirname(fileURLToPath(import.meta.url))
const UPLOAD_DIR = path.join(__dirname,'../../uploads')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,UPLOAD_DIR)
    },
    filename:function(req,file,cb){
        const ext = path.extname(file.originalname)
        const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`
        cb(null,uniqueSuffix + ext)
    }
})

export const upload = multer({
    storage,
    limits:{
        fileSize:5 * 1024 * 1024
    },
    fileFilter:function(req,file,cb){
        if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)){
            cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'),false)
        }else{
            cb(null,true)
        }
    }
})