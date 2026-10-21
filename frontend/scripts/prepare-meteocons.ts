import type { Page } from "playwright";
import type { WeatherIconName } from "@/components/weather/weather-icon";
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const ICON_MAP = {
  clearDay: "@meteocons/slug/fill/clear-day.svg",
  clearNight: "@meteocons/slug/fill/clear-night.svg",
  partlyCloudyDay: "@meteocons/slug/fill/partly-cloudy-day.svg",
  partlyCloudyNight: "@meteocons/slug/fill/partly-cloudy-night.svg",
  overcast: "@meteocons/slug/fill/overcast.svg",
  fog: "@meteocons/slug/fill/fog.svg",
  drizzle: "@meteocons/slug/fill/drizzle.svg",
  rain: "@meteocons/slug/fill/rain.svg",
  snow: "@meteocons/slug/fill/snow.svg",
  rainShowers: "@meteocons/slug/fill/extreme-rain.svg",
  snowShowers: "@meteocons/slug/fill/extreme-snow.svg",
  thunderstorm: "@meteocons/slug/fill/thunderstorms-overcast.svg",
  thunderstormHail: "@meteocons/slug/fill/thunderstorms-hail.svg",
  severeThunderStorm:
    "@meteocons/slug/fill/extreme-thunderstorms-extreme-rain.svg",
} as const;
const CANVAS_SIZE = 128;
const FRAMES = 60;
const PADDING = 3;
const DURATION = 3;
const OUTPUT_PATH_ANIM = path.join(
  process.cwd(),
  "public",
  "weather-icons",
  "animated",
);
const OUTPUT_PATH_STATIC = path.join(
  process.cwd(),
  "public",
  "weather-icons",
  "static",
);

function getIconPath(path: string, type: string): string {
  return path.replace("slug", type);
}

function buildSvgHtml(svg: string): string {
  return `
    <style>
      html, body {
        margin: 0;
        padding: 0;
        width: 128px;
        height: 128px;
        background: transparent;
        overflow: hidden;
      }

      svg {
        display: block;
        width: 128px;
        height: 128px;
      }
    </style>

    ${svg}
  `;
}

function resolveIconPath(iconPath: string, type: string = "svg"): string {
  try {
    return require.resolve(getIconPath(iconPath, type));
  } catch (cause) {
    throw new Error(`Cannot resolve icon path ${getIconPath(iconPath, type)}`, {
      cause,
    });
  }
}

async function measureBoundingBox(opts: {
  canvasSize: number;
  frames: number;
  duration: number;
  padding: number;
}): Promise<string> {
  const svg = document.querySelector("svg");

  if (!svg) {
    throw new Error("SVG element not found");
  }

  const canvas = document.createElement("canvas");
  canvas.width = opts.canvasSize;
  canvas.height = opts.canvasSize;

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not create canvas context");
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (let frame = 0; frame <= opts.frames; frame++) {
    svg.setCurrentTime((frame / opts.frames) * opts.duration);

    await new Promise((resolve) =>
      requestAnimationFrame(() => resolve(undefined)),
    );

    const svgMarkup = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([svgMarkup], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const image = new Image();

    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Failed to render SVG"));
      image.src = url;
    });

    context.clearRect(0, 0, opts.canvasSize, opts.canvasSize);
    context.drawImage(image, 0, 0, opts.canvasSize, opts.canvasSize);

    URL.revokeObjectURL(url);

    const pixels = context.getImageData(
      0,
      0,
      opts.canvasSize,
      opts.canvasSize,
    ).data;

    for (let y = 0; y < opts.canvasSize; y++) {
      for (let x = 0; x < opts.canvasSize; x++) {
        const alpha = pixels[(y * opts.canvasSize + x) * 4 + 3];

        if (alpha === 0) {
          continue;
        }

        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (!Number.isFinite(minX)) {
    throw new Error("No visible pixels found");
  }

  const padding = opts.padding;

  minX -= padding;
  minY -= padding;
  maxX += padding + 1;
  maxY += padding + 1;

  const width = maxX - minX;
  const height = maxY - minY;
  const size = Math.max(width, height);
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  return `${centerX - size / 2} ${centerY - size / 2} ${size} ${size}`;
}

async function processIcon(
  page: Page,
  _name: WeatherIconName,
  iconPath: string,
): Promise<void | string> {
  const animatedPath = resolveIconPath(iconPath);
  const staticPath = resolveIconPath(iconPath, "svg-static");
  const animatedSvg = await fs.readFile(animatedPath, "utf8");
  const staticSvg = await fs.readFile(staticPath, "utf8");

  if (!animatedSvg) {
    console.log(`Skipping empty icon file: ${animatedPath}`);
    return "";
  }

  await page.setContent(buildSvgHtml(animatedSvg), {
    waitUntil: "domcontentloaded",
  });

  const viewBox = await page.evaluate(measureBoundingBox, {
    canvasSize: CANVAS_SIZE,
    frames: FRAMES,
    duration: DURATION,
    padding: PADDING,
  });

  const processedAnimatedSvg = animatedSvg.replace(
    /viewBox="[^*"]*"/,
    `viewBox="${viewBox}"`,
  );
  const processedStaticSvg = staticSvg.replace(
    /viewBox="[^*"]*"/,
    `viewBox="${viewBox}"`,
  );

  await fs.mkdir(OUTPUT_PATH_ANIM, { recursive: true });
  await fs.mkdir(OUTPUT_PATH_STATIC, { recursive: true });

  await fs.writeFile(
    path.join(OUTPUT_PATH_ANIM, `${_name}.svg`),
    processedAnimatedSvg,
    "utf-8",
  );
  await fs.writeFile(
    path.join(OUTPUT_PATH_STATIC, `${_name}.svg`),
    processedStaticSvg,
    "utf-8",
  );
}

async function main(): Promise<void> {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: {
      width: 128,
      height: 128,
    },
  });

  try {
    for (const [iconName, iconPath] of Object.entries(ICON_MAP)) {
      const name = iconName as WeatherIconName;
      await processIcon(page, name, iconPath);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
