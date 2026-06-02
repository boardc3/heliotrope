import { mkdir, readdir, copyFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import sharp from "sharp";

const root = path.resolve("..");
const assets = path.join(root, "Assets");
const pub = path.resolve("public");

const imageJobs = [
  { src: path.join(assets, "Drone", "ext.png"), bucket: "exterior", slug: "ext-01", alt: "Existing street-facing elevation at 437 Heliotrope" },
  { src: path.join(assets, "Drone", "ext-after.png"), bucket: "exterior", slug: "ext-02", alt: "Reimagined exterior concept for 437 Heliotrope" },
  { src: path.join(assets, "Additional", "hf_20260504_162305_4dde9854-d5fc-4f3b-8efd-67f1ef5f3f0a.png"), bucket: "exterior", slug: "ext-03", alt: "Reimagined deck and exterior terrace concept at 437 Heliotrope" },
  { src: path.join(assets, "Additional", "hf_20260504_161936_365a77a6-cad3-461b-a505-390257239508.png"), bucket: "bedrooms", slug: "bed-01", alt: "Primary bedroom concept with warm millwork and terrace access" },
  { src: path.join(assets, "Additional", "hf_20260504_162254_56d383bb-5bfd-4716-bacc-dbc9822642f5.png"), bucket: "bedrooms", slug: "bed-02", alt: "Bedroom suite concept with built-in storage and balcony access" },
  { src: path.join(assets, "Unit B", "hf_20260503_192929_96e7ab5a-592c-46b4-9550-58057c9c9292.png"), bucket: "adu", slug: "adu-01", alt: "Unit B rear condo living space with warm neutral finishes" },
];

const unitA = path.join(assets, "Unit A");
const unitAFiles = existsSync(unitA)
  ? (await readdir(unitA)).filter((file) => /\.(jpe?g|png)$/i.test(file)).sort()
  : [];
unitAFiles.forEach((file, index) => {
  imageJobs.push({
    src: path.join(unitA, file),
    bucket: index < 2 ? "great-room" : index < 4 ? "kitchen" : "dining",
    slug: `${index < 2 ? "gr" : index < 4 ? "kt" : "dn"}-${String(index + 1).padStart(2, "0")}`,
    alt: "Open living, dining, and kitchen render for Unit A at 437 Heliotrope",
  });
});

const videoJobs = [
  { src: path.join(assets, "Helio-5-27.mp4"), out: "helio-5-27.mp4", poster: "hero.jpg", crf: 28, height: 1080, audio: false, posterAt: 2 },
  { src: path.join(assets, "House_must_remain_same_202605272203.mp4"), out: "aerial-1080.mp4", poster: "aerial.jpg", crf: 30, height: 1080, audio: false, posterAt: 1 },
  { src: path.join(assets, "Drone", "clips", "hf_20260503_235109_11fe37a2-ee8d-4b74-a8ca-5867046262a9.mp4"), out: "aerial2-1080.mp4", poster: "aerial2.jpg", crf: 31, height: 1080, audio: false, posterAt: 2 },
];

const clipSources = [
  path.join(assets, "Unit A", "Clips", "Single_shot_tour_room_202605031632 (1).mp4"),
  path.join(assets, "Unit A", "Clips", "Single_shot_tour_room_202605031632.mp4"),
  path.join(assets, "Unit A", "Clips", "Tour_of_room_interior_202605031634 (1).mp4"),
  path.join(assets, "Unit A", "Clips", "Tour_of_room_interior_202605031634.mp4"),
  path.join(assets, "Unit B", "clips", "hf_20260503_223846_6c01e146-7ea6-4651-957e-323b2a67a038.mp4"),
  path.join(assets, "Drone", "clips", "DJI_20260502170438_0222_D.MP4"),
  path.join(assets, "Drone", "clips", "hf_20260504_000532_cbe06e48-6c06-4509-b18e-0204c8ae4086.mp4"),
  path.join(assets, "Additional", "master.mp4"),
];

clipSources.forEach((src, index) => {
  videoJobs.push({
    src,
    out: `clips/fl${index + 1}.mp4`,
    poster: `clips/fl${index + 1}.jpg`,
    crf: 30,
    height: 720,
    audio: false,
    posterAt: 1,
  });
});

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} exited with ${code}`));
    });
  });
}

async function ensureDirs() {
  const dirs = [
    "public/img/exterior",
    "public/img/great-room",
    "public/img/kitchen",
    "public/img/dining",
    "public/img/bedrooms",
    "public/img/adu",
    "public/img/posters",
    "public/img/stills",
    "public/video/clips",
  ];
  await Promise.all(dirs.map((dir) => mkdir(path.resolve(dir), { recursive: true })));
}

async function encodeImage(job) {
  if (!existsSync(job.src)) return;
  const widths = [640, 1280, 1920, 2560];
  if (existsSync(path.join(pub, "img", job.bucket, `${job.slug}-1920.jpg`))) return;
  for (const width of widths) {
    const base = path.join(pub, "img", job.bucket, `${job.slug}-${width}`);
    const img = sharp(job.src).rotate().resize({ width, withoutEnlargement: true });
    await Promise.all([
      img.clone().avif({ quality: 55, effort: 5 }).toFile(`${base}.avif`),
      img.clone().webp({ quality: 80, effort: 5 }).toFile(`${base}.webp`),
      img.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(`${base}.jpg`),
    ]);
  }
}

async function isStale(source, output) {
  if (!existsSync(output)) return true;
  const [sourceStat, outputStat] = await Promise.all([stat(source), stat(output)]);
  return sourceStat.mtimeMs > outputStat.mtimeMs;
}

async function encodeVideo(job) {
  if (!existsSync(job.src)) return;
  const out = path.join(pub, "video", job.out);
  const poster = path.join(pub, "img", "posters", job.poster);
  const args = [
    "-y",
    "-hide_banner",
    "-loglevel",
    "error",
    "-i",
    job.src,
    "-vf",
    `scale=-2:${job.height}:flags=lanczos`,
    "-c:v",
    "libx264",
    "-crf",
    String(job.crf),
    "-preset",
    "slower",
    "-profile:v",
    "main",
    "-level",
    "4.0",
    "-pix_fmt",
    "yuv420p",
    ...(job.audio ? ["-c:a", "aac", "-b:a", "96k"] : ["-an"]),
    "-movflags",
    "+faststart",
    out,
  ];
  await mkdir(path.dirname(out), { recursive: true });
  if (await isStale(job.src, out)) {
    await run("ffmpeg", args);
  }
  await mkdir(path.dirname(poster), { recursive: true });
  if (await isStale(out, poster)) {
    await run("ffmpeg", [
      "-y",
      "-hide_banner",
      "-loglevel",
      "error",
      "-ss",
      String(job.posterAt),
      "-i",
      out,
      "-frames:v",
      "1",
      "-q:v",
      "3",
      "-vf",
      "scale=-2:1440:flags=lanczos",
      "-pix_fmt",
      "yuvj420p",
      poster,
    ]);
  }
}

async function extractStills() {
  const stillJobs = [
    { file: "helio-5-27.mp4", slug: "hero", times: [2, 5, 9, 13] },
    { file: "aerial-1080.mp4", slug: "aerial", times: [1, 3, 6] },
    { file: "aerial2-1080.mp4", slug: "village", times: [2, 5, 9] },
    { file: "clips/fl1.mp4", slug: "clip-01", times: [1] },
    { file: "clips/fl2.mp4", slug: "clip-02", times: [1] },
    { file: "clips/fl3.mp4", slug: "clip-03", times: [1] },
    { file: "clips/fl4.mp4", slug: "clip-04", times: [1] },
    { file: "clips/fl5.mp4", slug: "clip-05", times: [1] },
    { file: "clips/fl6.mp4", slug: "clip-06", times: [1] },
    { file: "clips/fl7.mp4", slug: "clip-07", times: [1] },
    { file: "clips/fl8.mp4", slug: "clip-08", times: [1] },
  ];
  for (const job of stillJobs) {
    const input = path.join(pub, "video", job.file);
    if (!existsSync(input)) continue;
    for (let i = 0; i < job.times.length; i += 1) {
      const tmp = path.join(pub, "img", "stills", `${job.slug}-${String(i + 1).padStart(2, "0")}.jpg`);
      await run("ffmpeg", [
        "-y",
        "-hide_banner",
        "-loglevel",
        "error",
        "-ss",
        String(job.times[i]),
        "-i",
        input,
        "-frames:v",
        "1",
        "-q:v",
        "3",
        "-pix_fmt",
        "yuvj420p",
        tmp,
      ]);
      if (!existsSync(tmp)) continue;
      for (const width of [1280, 1920]) {
        const base = path.join(pub, "img", "stills", `${job.slug}-${String(i + 1).padStart(2, "0")}-${width}`);
        const img = sharp(tmp).resize({ width, withoutEnlargement: true });
        await Promise.all([
          img.clone().avif({ quality: 55, effort: 5 }).toFile(`${base}.avif`),
          img.clone().webp({ quality: 80, effort: 5 }).toFile(`${base}.webp`),
          img.clone().jpeg({ quality: 84, mozjpeg: true }).toFile(`${base}.jpg`),
        ]);
      }
    }
  }
}

await ensureDirs();
await Promise.all(imageJobs.map(encodeImage));
for (const job of videoJobs) {
  await encodeVideo(job);
}
await extractStills();
await copyFile(path.join(pub, "img", "exterior", "ext-02-1920.jpg"), path.join(pub, "img", "posters", "og.jpg"));
console.log("Assets prepared.");
