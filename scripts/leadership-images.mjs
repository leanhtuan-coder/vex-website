import { lstat, readFile, realpath } from "node:fs/promises";
import { isAbsolute, relative, resolve } from "node:path";
import { Buffer } from "node:buffer";

const portraitPattern =
  /^\/images\/leadership\/([a-z0-9]+(?:-[a-z0-9]+)*)\.webp$/;
const maximumPortraitBytes = 8 * 1024 * 1024;

function inside(parent, child) {
  const path = relative(parent, child);
  return path !== "" && !path.startsWith("..") && !isAbsolute(path);
}

async function existingStat(path) {
  try {
    return await lstat(path);
  } catch (error) {
    if (error.code === "ENOENT") return undefined;
    throw error;
  }
}

/** Inspect the static WebP container and frame dimensions, without a new dependency. */
export function webpDimensions(data) {
  if (
    !Buffer.isBuffer(data) ||
    data.length < 20 ||
    data.toString("ascii", 0, 4) !== "RIFF" ||
    data.toString("ascii", 8, 12) !== "WEBP" ||
    data.readUInt32LE(4) + 8 !== data.length
  )
    throw new Error("Leadership portraits must be complete WebP files");
  let frame;
  let canvas;
  let offset = 12;
  while (offset < data.length) {
    if (offset + 8 > data.length)
      throw new Error("Leadership WebP contains a truncated chunk");
    const type = data.toString("ascii", offset, offset + 4);
    const size = data.readUInt32LE(offset + 4);
    const start = offset + 8;
    const end = start + size;
    const next = end + (size % 2);
    if (end > data.length || next > data.length)
      throw new Error("Leadership WebP contains a truncated payload");
    if (type === "ANIM" || type === "ANMF")
      throw new Error("Leadership portraits must be static, not animated WebP");
    if (type === "VP8X") {
      if (
        canvas ||
        size !== 10 ||
        (data[start] & 0xc1) !== 0 ||
        data[start + 1] ||
        data[start + 2] ||
        data[start + 3]
      )
        throw new Error("Leadership WebP has an invalid extended header");
      if (data[start] & 0x02)
        throw new Error(
          "Leadership portraits must be static, not animated WebP",
        );
      canvas = {
        width: data.readUIntLE(start + 4, 3) + 1,
        height: data.readUIntLE(start + 7, 3) + 1,
      };
    }
    if (type === "VP8 " || type === "VP8L") {
      if (frame)
        throw new Error("Leadership WebP must contain one still frame");
      if (type === "VP8 ") {
        if (
          size < 10 ||
          (data[start] & 1) !== 0 ||
          data.toString("hex", start + 3, start + 6) !== "9d012a"
        )
          throw new Error("Leadership WebP has an invalid VP8 frame");
        frame = {
          width: data.readUInt16LE(start + 6) & 0x3fff,
          height: data.readUInt16LE(start + 8) & 0x3fff,
        };
      } else {
        if (size < 5 || data[start] !== 0x2f)
          throw new Error("Leadership WebP has an invalid lossless frame");
        const bits = data.readUInt32LE(start + 1);
        if (bits >>> 29 !== 0)
          throw new Error(
            "Leadership WebP uses an unsupported lossless version",
          );
        frame = {
          width: (bits & 0x3fff) + 1,
          height: ((bits >>> 14) & 0x3fff) + 1,
        };
      }
    }
    offset = next;
  }
  if (
    !frame ||
    frame.width < 1 ||
    frame.height < 1 ||
    frame.width > 20000 ||
    frame.height > 20000 ||
    (canvas && (frame.width !== canvas.width || frame.height !== canvas.height))
  )
    throw new Error(
      "Leadership WebP must have valid, consistent image dimensions",
    );
  return frame;
}

/** Resolve only approved slug-bound portraits; missing uploads remain absent. */
export async function readLeadershipPortrait(workspace, imagePath) {
  if (!portraitPattern.test(imagePath))
    throw new Error("Invalid leadership portrait path");
  const sourceDirectory = resolve(workspace, "public/images/leadership");
  for (const directory of [
    resolve(workspace, "public"),
    resolve(workspace, "public/images"),
    sourceDirectory,
  ]) {
    const stats = await existingStat(directory);
    if (!stats) return undefined;
    if (
      !stats.isDirectory() ||
      stats.isSymbolicLink() ||
      (await realpath(directory)) !== directory ||
      !inside(workspace, directory)
    )
      throw new Error(
        "Leadership uploads require regular workspace directories",
      );
  }
  const expectedPath = resolve(workspace, "public", imagePath.slice(1));
  const stats = await existingStat(expectedPath);
  if (!stats) return undefined;
  const resolvedPath = await realpath(expectedPath);
  if (
    !inside(sourceDirectory, resolvedPath) ||
    resolvedPath !== expectedPath ||
    !stats.isFile() ||
    stats.isSymbolicLink() ||
    stats.size === 0 ||
    stats.size > maximumPortraitBytes
  )
    throw new Error(
      "Leadership uploads must be nonempty regular WebP files of at most 8 MiB",
    );
  const data = await readFile(resolvedPath);
  return { source: resolvedPath, bytes: stats.size, ...webpDimensions(data) };
}
