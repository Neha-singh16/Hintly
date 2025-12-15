import { build as viteBuild, type InlineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { copyFileSync, mkdirSync, existsSync, writeFileSync } from "fs";
import { deflateSync } from "zlib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");

async function buildExtension() {
  console.log("Building Code Mentor AI Chrome Extension...\n");

  const distDir = resolve(rootDir, "dist-extension");
  const iconsDir = resolve(distDir, "icons");

  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }
  if (!existsSync(iconsDir)) {
    mkdirSync(iconsDir, { recursive: true });
  }

  console.log("1. Building popup...");
  const popupConfig: InlineConfig = {
    plugins: [react()],
    root: resolve(rootDir, "src/popup"),
    base: "./",
    build: {
      outDir: distDir,
      emptyOutDir: false,
      rollupOptions: {
        input: resolve(rootDir, "src/popup/popup.html"),
        output: {
          entryFileNames: "popup.js",
          chunkFileNames: "chunks/[name]-[hash].js",
          assetFileNames: "[name][extname]",
        },
      },
      target: "esnext",
      minify: true,
    },
    resolve: {
      alias: {
        "@": resolve(rootDir, "src"),
      },
    },
  };

  await viteBuild(popupConfig);

  console.log("2. Building content script...");
  const contentConfig: InlineConfig = {
    build: {
      outDir: distDir,
      emptyOutDir: false,
      lib: {
        entry: resolve(rootDir, "src/content/index.ts"),
        name: "content",
        formats: ["iife"],
        fileName: () => "content.js",
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      },
      target: "esnext",
      minify: true,
    },
    resolve: {
      alias: {
        "@": resolve(rootDir, "src"),
      },
    },
  };

  await viteBuild(contentConfig);

  console.log("3. Building background service worker...");
  const backgroundConfig: InlineConfig = {
    build: {
      outDir: distDir,
      emptyOutDir: false,
      lib: {
        entry: resolve(rootDir, "src/background/index.ts"),
        name: "background",
        formats: ["iife"],
        fileName: () => "background.js",
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
          format: "iife",
        },
      },
      target: "esnext",
      minify: true,
    },
    resolve: {
      alias: {
        "@": resolve(rootDir, "src"),
      },
    },
  };

  await viteBuild(backgroundConfig);

  console.log("4. Copying manifest.json...");
  const manifestSrc = resolve(rootDir, "manifest.json");
  const manifestDest = resolve(distDir, "manifest.json");
  copyFileSync(manifestSrc, manifestDest);

  console.log("5. Generating icons...");
  const sizes = [16, 48, 128];
  for (const size of sizes) {
    const pngData = generatePlaceholderPNG(size);
    writeFileSync(resolve(iconsDir, `icon${size}.png`), pngData);
    console.log(`   Generated icon${size}.png`);
  }

  console.log("\n" + "=".repeat(50));
  console.log("Build complete!");
  console.log("=".repeat(50));
  console.log(`\nExtension files are in: ${distDir}`);
  console.log("\nTo install the extension:");
  console.log("1. Open Chrome and go to chrome://extensions/");
  console.log('2. Enable "Developer mode" in the top right');
  console.log('3. Click "Load unpacked" and select the dist-extension folder');
  console.log("4. Navigate to LeetCode or GeeksforGeeks to test!");
}

function generatePlaceholderPNG(size: number): Buffer {
  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  
  const ihdr = Buffer.alloc(25);
  ihdr.writeUInt32BE(13, 0);
  ihdr.write("IHDR", 4);
  ihdr.writeUInt32BE(size, 8);
  ihdr.writeUInt32BE(size, 12);
  ihdr.writeUInt8(8, 16);
  ihdr.writeUInt8(2, 17);
  ihdr.writeUInt8(0, 18);
  ihdr.writeUInt8(0, 19);
  ihdr.writeUInt8(0, 20);
  const ihdrCrc = crc32(ihdr.subarray(4, 21));
  ihdr.writeUInt32BE(ihdrCrc, 21);

  const rawData: number[] = [];
  for (let y = 0; y < size; y++) {
    rawData.push(0);
    for (let x = 0; x < size; x++) {
      const t = x / size + y / size;
      const r = Math.floor(59 + (139 - 59) * t);
      const g = Math.floor(130 + (92 - 130) * t);
      const b = Math.floor(246 + (246 - 246) * t);
      rawData.push(r, g, b);
    }
  }

  const rawBuffer = Buffer.from(rawData);
  const compressed = deflateSync(rawBuffer);

  const idat = Buffer.alloc(compressed.length + 12);
  idat.writeUInt32BE(compressed.length, 0);
  idat.write("IDAT", 4);
  compressed.copy(idat, 8);
  const idatCrc = crc32(Buffer.concat([Buffer.from("IDAT"), compressed]));
  idat.writeUInt32BE(idatCrc, idat.length - 4);

  const iend = Buffer.from([0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]);

  return Buffer.concat([pngSignature, ihdr, idat, iend]);
}

function crc32(data: Buffer): number {
  let crc = 0xffffffff;
  const table: number[] = [];
  
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  
  for (let i = 0; i < data.length; i++) {
    crc = table[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  }
  
  return (crc ^ 0xffffffff) >>> 0;
}

buildExtension().catch((error) => {
  console.error("Build failed:", error);
  process.exit(1);
});
