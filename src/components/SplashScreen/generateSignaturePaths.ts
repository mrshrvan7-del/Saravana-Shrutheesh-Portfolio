// Dynamic font outline path generator using opentype.js and SVG path sampling

export interface SignaturePathData {
  d: string;
  length: number;
  type: 'curve' | 'straight' | 'connector';
  naturalDuration: number;
}

// Declaring types for CDN opentype.js
interface OpentypeFont {
  getPath(text: string, x: number, y: number, fontSize: number, options?: any): {
    toPathData(): string;
  };
}

interface OpentypeStatic {
  load(url: string, callback: (err: any, font?: OpentypeFont) => void): void;
}

declare global {
  interface Window {
    opentype?: OpentypeStatic;
  }
}

// Load opentype.js from CDN
function loadOpentypeScript(): Promise<OpentypeStatic> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Browser environment required'));
      return;
    }
    if (window.opentype) {
      resolve(window.opentype);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/opentype.js@1.3.4/dist/opentype.min.js';
    script.async = true;
    script.onload = () => {
      if (window.opentype) {
        resolve(window.opentype);
      } else {
        reject(new Error('opentype.js failed to initialize in window'));
      }
    };
    script.onerror = () => reject(new Error('Failed to load opentype.js script'));
    document.head.appendChild(script);
  });
}

// Load Google Fonts Great Vibes in head
function loadGreatVibesFont(): void {
  if (typeof window === 'undefined') return;
  const linkId = 'great-vibes-font-link';
  if (document.getElementById(linkId)) return;

  const link = document.createElement('link');
  link.id = linkId;
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap';
  document.head.appendChild(link);
}

export async function generateSignaturePaths(text: string): Promise<SignaturePathData[]> {
  if (typeof window === 'undefined') return [];

  // 1. Ensure the Great Vibes CSS link is added to document head
  loadGreatVibesFont();

  // 2. Create offscreen SVG and <text> element as specified
  const offscreenSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  offscreenSvg.style.position = 'absolute';
  offscreenSvg.style.width = '0';
  offscreenSvg.style.height = '0';
  offscreenSvg.style.overflow = 'hidden';
  offscreenSvg.style.visibility = 'hidden';

  const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textEl.setAttribute('font-family', 'Great Vibes');
  textEl.setAttribute('font-size', '96');
  textEl.setAttribute('x', '0');
  textEl.setAttribute('y', '100');
  textEl.setAttribute('fill', 'none');
  textEl.setAttribute('stroke', 'black');
  textEl.textContent = text;

  offscreenSvg.appendChild(textEl);
  document.body.appendChild(offscreenSvg);

  // Wait brief moment to allow font layout, then measure text width
  const textLength = textEl.getComputedTextLength();
  console.log(`Measured text length for signature: ${textLength}px`);

  // Remove the text element
  document.body.removeChild(offscreenSvg);

  // 3. Load opentype.js and fetch font outlines
  const opentypeLib = await loadOpentypeScript();

  // Try local first, fallback to fonts.gstatic CDN if local fails
  const fontUrls = [
    '/fonts/GreatVibes-Regular.ttf',
    'https://fonts.gstatic.com/s/greatvibes/v21/RWmMoKWR9v4ksMfaWd_JN-XC.ttf'
  ];

  let font: OpentypeFont | null = null;
  for (const url of fontUrls) {
    try {
      font = await new Promise<OpentypeFont>((resolve, reject) => {
        opentypeLib.load(url, (err, loadedFont) => {
          if (err || !loadedFont) {
            reject(err || new Error('Failed to load font from ' + url));
          } else {
            resolve(loadedFont);
          }
        });
      });
      if (font) break;
    } catch (e) {
      console.warn(`Failed loading font from ${url}:`, e);
    }
  }

  if (!font) {
    throw new Error('Could not load Great Vibes font outlines via opentype.js');
  }

  // Generate complete outline path at same layout coords
  const textOutlinePath = font.getPath(text, 0, 100, 96);
  const fullPathData = textOutlinePath.toPathData();

  // Split path data by 'M' commands (starts of subpaths)
  const rawSubpaths = fullPathData.split('M');
  const subpathDataStrings: string[] = [];

  for (let i = 0; i < rawSubpaths.length; i++) {
    const trimmed = rawSubpaths[i].trim();
    if (trimmed) {
      subpathDataStrings.push('M ' + trimmed);
    }
  }

  // 4. Sample paths every 2px and rebuild normalized segments
  const samplingSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  samplingSvg.style.position = 'absolute';
  samplingSvg.style.width = '0';
  samplingSvg.style.height = '0';
  samplingSvg.style.visibility = 'hidden';
  document.body.appendChild(samplingSvg);

  const parsedPaths: Omit<SignaturePathData, 'naturalDuration'>[] = [];
  let totalWeight = 0;

  for (const originalPathString of subpathDataStrings) {
    const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    tempPath.setAttribute('d', originalPathString);
    samplingSvg.appendChild(tempPath);

    const length = tempPath.getTotalLength();
    
    // Sample every 2px and rebuild path data as discrete lines
    const points: { x: number; y: number }[] = [];
    const steps = Math.max(1, Math.floor(length / 2));
    
    for (let i = 0; i <= steps; i++) {
      const distance = (i / steps) * length;
      const point = tempPath.getPointAtLength(distance);
      points.push({ x: point.x, y: point.y });
    }

    const normalizedD = points
      .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
      .join(' ');

    // Classify path based on curve presence
    const hasCurve = /[CcQqSsTt]/.test(originalPathString);
    let type: 'curve' | 'straight' | 'connector' = hasCurve ? 'curve' : 'straight';
    
    if (type === 'straight' && length < 15) {
      type = 'connector';
    }

    // curves get 15% more time weight than straights of equal length
    const weight = length * (type === 'curve' ? 1.15 : 1.0);
    totalWeight += weight;

    parsedPaths.push({
      d: normalizedD,
      length,
      type
    });

    samplingSvg.removeChild(tempPath);
  }

  document.body.removeChild(samplingSvg);

  // 5. Distribute total write time budget (2600ms) proportionally
  const totalBudget = 2600; // ms
  const minDuration = 80; // ms
  const maxDuration = 400; // ms

  // Initial proportional distribution
  let durations = parsedPaths.map((p) => {
    const weight = p.length * (p.type === 'curve' ? 1.15 : 1.0);
    return totalWeight > 0 ? totalBudget * (weight / totalWeight) : totalBudget / parsedPaths.length;
  });

  // Clamping and redistribution loop
  let iterations = 0;
  const weights = parsedPaths.map(p => p.length * (p.type === 'curve' ? 1.15 : 1.0));
  
  while (iterations < 10) {
    let totalClampDifference = 0;
    let unconstrainedWeightSum = 0;

    for (let i = 0; i < durations.length; i++) {
      if (durations[i] < minDuration) {
        totalClampDifference += (minDuration - durations[i]);
        durations[i] = minDuration;
      } else if (durations[i] > maxDuration) {
        totalClampDifference -= (durations[i] - maxDuration);
        durations[i] = maxDuration;
      } else {
        unconstrainedWeightSum += weights[i];
      }
    }

    if (Math.abs(totalClampDifference) < 0.1 || unconstrainedWeightSum === 0) {
      break;
    }

    // Distribute the clamped difference among the non-clamped paths
    for (let i = 0; i < durations.length; i++) {
      if (durations[i] > minDuration && durations[i] < maxDuration) {
        durations[i] += totalClampDifference * (weights[i] / unconstrainedWeightSum);
      }
    }
    iterations++;
  }

  // Ensure total sum is exactly 2600ms
  const currentTotal = durations.reduce((a, b) => a + b, 0);
  const diff = totalBudget - currentTotal;
  if (Math.abs(diff) > 0.01 && durations.length > 0) {
    let adjustIdx = 0;
    let maxVal = -1;
    for (let i = 0; i < durations.length; i++) {
      if (durations[i] > maxVal && durations[i] < maxDuration) {
        maxVal = durations[i];
        adjustIdx = i;
      }
    }
    durations[adjustIdx] += diff;
  }

  // 6. Return SignaturePathData[]
  return parsedPaths.map((p, idx) => ({
    ...p,
    naturalDuration: parseFloat(durations[idx].toFixed(2))
  }));
}
