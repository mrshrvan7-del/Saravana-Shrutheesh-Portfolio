import fs from 'fs';
import path from 'path';
import opentype from 'opentype.js';
import { JSDOM } from 'jsdom';
import { svgPathProperties } from 'svg-path-properties';

// 1. Mock SVGPathElement in JSDOM to support getTotalLength using svg-path-properties
const dom = new JSDOM();
const { window } = dom;
const { document } = window;

const tempPathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
const SVGPathElementProto = Object.getPrototypeOf(tempPathEl);

Object.defineProperty(SVGPathElementProto, 'getTotalLength', {
  value: function () {
    const d = this.getAttribute('d') || '';
    const properties = new svgPathProperties(d);
    return properties.getTotalLength();
  },
  writable: true,
  configurable: true
});

console.log('JSDOM SVGPathElement.getTotalLength successfully mocked.');

// 2. Load GreatVibes font and generate paths
const fontPath = './public/fonts/GreatVibes-Regular.ttf';

if (!fs.existsSync(fontPath)) {
  console.error(`Error: Font file not found at ${fontPath}. Please verify download.`);
  process.exit(1);
}

const buffer = fs.readFileSync(fontPath);
const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
const font = opentype.parse(arrayBuffer);

console.log('Font loaded and parsed successfully. Extracting paths...');

// Y=120 and Size=96 to properly center the signature on 800x160 canvas
const text = 'Saravana Shrutheesh.M';
const fontSize = 96;
const yOffset = 120;

const textPath = new opentype.Path();
let cursorX = 0;

for (let i = 0; i < text.length; i++) {
  const glyph = font.charToGlyph(text[i]);
  const glyphPath = glyph.getPath(cursorX, yOffset, fontSize);
  textPath.extend(glyphPath);
  cursorX += glyph.advanceWidth * (fontSize / font.unitsPerEm);
}
// Clean the commands by rounding coordinates to 4 decimal places to prevent opentype.js scientific notation NaN bugs
for (const cmd of textPath.commands) {
  for (const key of ['x', 'y', 'x1', 'y1', 'x2', 'y2']) {
    if (cmd[key] !== undefined) {
      cmd[key] = parseFloat(cmd[key].toFixed(4));
    }
  }
}

// Get raw SVG path string with 2 decimal places precision
const fullPathData = textPath.toPathData({ decimalPlaces: 2, flipY: false });

// Split on 'M' command (ignoring the first empty split if present)
// A capital 'M' marks a new lifted-pen stroke.
const rawSubpaths = fullPathData.split('M');
const subpathDataStrings = [];

for (let i = 0; i < rawSubpaths.length; i++) {
  const trimmed = rawSubpaths[i].trim();
  if (trimmed) {
    subpathDataStrings.push('M ' + trimmed);
  }
}

console.log(`Extracted ${subpathDataStrings.length} discrete strokes. Measuring and classifying...`);

// Create SVG element to hold temporary path elements
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
document.body.appendChild(svg);

const signaturePaths = [];
let totalWeight = 0;

for (const subpathD of subpathDataStrings) {
  const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  tempPath.setAttribute('d', subpathD);
  svg.appendChild(tempPath);

  const length = tempPath.getTotalLength();

  // Classify: if the subpath d string contains more than 60% C or Q commands it is a curve, otherwise straight
  const totalCommands = (subpathD.match(/[A-Za-z]/g) || []).length;
  const curveCommands = (subpathD.match(/[CcQqSsTt]/g) || []).length;
  const curveRatio = totalCommands > 0 ? curveCommands / totalCommands : 0;
  const type = curveRatio > 0.6 ? 'curve' : 'straight';

  // curves get 15% more time
  const weight = length * (type === 'curve' ? 1.15 : 1.0);
  totalWeight += weight;

  signaturePaths.push({
    d: subpathD,
    length: parseFloat(length.toFixed(2)),
    type
  });

  svg.removeChild(tempPath);
}

document.body.removeChild(svg);

// Distribute 2600ms total budget
const totalBudget = 2600;
const minDuration = 80;
const maxDuration = 400;

const weights = signaturePaths.map(p => p.length * (p.type === 'curve' ? 1.15 : 1.0));
let durations = signaturePaths.map(() => 0);
let activePaths = [...signaturePaths.keys()];
let remainingBudget = totalBudget;

for (let iter = 0; iter < 10; iter++) {
  const activeWeightsSum = activePaths.reduce((sum, idx) => sum + weights[idx], 0);
  if (activeWeightsSum === 0) break;

  // Distribute remaining budget to active paths
  for (const idx of activePaths) {
    durations[idx] = remainingBudget * (weights[idx] / activeWeightsSum);
  }

  // Check for clamping
  let nextActivePaths = [];
  let clampedSum = 0;
  let newlyClamped = false;

  for (let i = 0; i < durations.length; i++) {
    // If it's already clamped or we are checking it now
    if (!activePaths.includes(i)) {
      clampedSum += durations[i];
      continue;
    }

    if (durations[i] < minDuration) {
      durations[i] = minDuration;
      clampedSum += minDuration;
      newlyClamped = true;
    } else if (durations[i] > maxDuration) {
      durations[i] = maxDuration;
      clampedSum += maxDuration;
      newlyClamped = true;
    } else {
      nextActivePaths.push(i);
    }
  }

  if (!newlyClamped || nextActivePaths.length === 0) {
    break;
  }

  remainingBudget = totalBudget - clampedSum;
  activePaths = nextActivePaths;
}


const finalPaths = signaturePaths.map((p, idx) => ({
  ...p,
  duration: parseFloat(durations[idx].toFixed(2))
}));

// Write output TS file
const outDir = './src/components/SplashScreen';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const outFilePath = path.join(outDir, 'signaturePaths.ts');
const fileContent = `// Auto-generated signature paths from Great Vibes font outline
export interface SignaturePath {
  d: string;
  length: number;
  type: 'curve' | 'straight';
  duration: number;
}

export const SIGNATURE_PATHS: SignaturePath[] = ${JSON.stringify(finalPaths, null, 2)};
`;

fs.writeFileSync(outFilePath, fileContent);
console.log(`Successfully generated ${outFilePath}`);
console.log(`Total duration check: ${finalPaths.reduce((acc, p) => acc + p.duration, 0).toFixed(2)}ms`);
