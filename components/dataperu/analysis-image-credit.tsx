import type { AnalysisPhotoCredit } from "@/lib/analysis-presentation";

export function AnalysisImageCredit({ credit }: { credit: AnalysisPhotoCredit }) {
  return <small className="text-[11px] leading-5 text-muted">
    Foto: <a href={credit.source} className="underline underline-offset-2">{credit.author}</a>
    {" · "}<a href={credit.licenseUrl} className="underline underline-offset-2">{credit.license}</a>
    {" · Recorte y WebP"}
  </small>;
}
