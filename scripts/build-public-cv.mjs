import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "content/profile/noam-cv-public.md");
const outDir = path.join(root, "public/docs/generated");
const publicPdfPath = path.join(root, "public/docs/noam-cv-public.pdf");
const texPath = path.join(outDir, "noam-cv-public.tex");
const pdfPath = path.join(outDir, "noam-cv-public.pdf");

const forbiddenPublicPatterns = [
  /\bDNI\b/i,
  /\bpasaporte\b/i,
  /fecha de nacimiento/i,
  /c[oó]digo PUCP/i,
  /c[oó]digo UNI/i,
  /direcci[oó]n personal/i,
  /domicilio/i,
  /calle domingo el[ií]as/i
];

function assertPublicSafe(source) {
  for (const pattern of forbiddenPublicPatterns) {
    if (pattern.test(source)) throw new Error(`El CV público contiene un dato prohibido: ${pattern}`);
  }
}

function escapeLatex(value) {
  return value
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/\$/g, "\\$")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/{/g, "\\{")
    .replace(/}/g, "\\}")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
}

function inlineMarkdown(line) {
  return escapeLatex(line)
    .replace(/\*\*(.+?)\*\*/g, "\\textbf{$1}")
    .replace(/\*(.+?)\*/g, "\\textit{$1}");
}

function closeList(output, state) {
  if (state.inList) {
    output.push("\\end{itemize}");
    state.inList = false;
  }
}

function markdownToLatex(markdown) {
  const output = [];
  const state = { inList: false };

  for (const line of markdown.split(/\r?\n/)) {
    if (line.startsWith("# ")) {
      closeList(output, state);
      output.push(`\\vspace*{-0.55cm}{\\fontsize{28}{31}\\selectfont\\bfseries ${inlineMarkdown(line.slice(2))}}\\par`);
      output.push("\\vspace{0.16cm}{\\color{noamrust}\\rule{2.2cm}{1.2pt}}\\par\\vspace{0.35cm}");
      continue;
    }

    if (line.startsWith("## ")) {
      closeList(output, state);
      output.push(`\\vspace{0.26cm}{\\small\\bfseries\\color{noamrust}\\MakeUppercase{${inlineMarkdown(line.slice(3))}}}\\par`);
      output.push("\\vspace{0.09cm}{\\color{noamline}\\hrule}\\vspace{0.18cm}\\color{noamink}");
      continue;
    }

    if (line.startsWith("- ")) {
      if (!state.inList) {
        output.push("\\begin{itemize}");
        state.inList = true;
      }
      output.push(`\\item ${inlineMarkdown(line.slice(2))}`);
      continue;
    }

    closeList(output, state);
    if (line.trim()) output.push(`${inlineMarkdown(line)}\\par\\vspace{0.08cm}`);
  }

  closeList(output, state);
  return output.join("\n");
}

const source = fs.readFileSync(sourcePath, "utf8");
assertPublicSafe(source);
const body = markdownToLatex(source);

const tex = String.raw`\documentclass[10pt]{article}
\usepackage[a4paper,top=1.55cm,bottom=1.65cm,left=1.8cm,right=1.8cm]{geometry}
\usepackage{fontspec}
\usepackage{enumitem}
\usepackage{xcolor}
\usepackage{fancyhdr}
\usepackage[colorlinks=true,urlcolor=noamrust]{hyperref}
\setmainfont{Helvetica Neue}
\definecolor{noamink}{HTML}{101418}
\definecolor{noammut}{HTML}{606761}
\definecolor{noamrust}{HTML}{A94F35}
\definecolor{noamline}{HTML}{D9DDD8}
\setlength{\parindent}{0pt}
\setlength{\parskip}{0pt}
\setlist[itemize]{leftmargin=1.25em,itemsep=0.12em,topsep=0.08em,parsep=0pt}
\linespread{1.04}
\pagestyle{fancy}
\fancyhf{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0.25pt}
\fancyfoot[L]{\scriptsize\color{noammut} NOAM.PE · PERFIL PÚBLICO}
\fancyfoot[R]{\scriptsize\color{noammut} \thepage}
\begin{document}
\color{noamink}
` + "\n" + body + String.raw`
\end{document}
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(texPath, tex);

execFileSync("xelatex", ["-interaction=nonstopmode", "-halt-on-error", "-output-directory", outDir, texPath], {
  stdio: "inherit"
});

fs.copyFileSync(pdfPath, publicPdfPath);
console.log(`Generated ${publicPdfPath}`);
