
import { Link } from "react-router";
import { useCallback, useState } from "react";
import { analyzePhoto, SEASONS } from "@/lib/colorimetry";
import type { AnalysisResult, Color } from "@/types/colorimetry";
import { ArrowRight, Contrast, Dot, RotateCcw, Sun, Thermometer } from "lucide-react";
import Logo from "@/components/logo";
import { UploadZone } from "@/components/upload-zone";
import { AnalysisLoader } from "@/components/analysis-loader";
import { Button } from "@/components/ui/button";

type Stage = "upload" | "analyzing" | "results";

function SmallTitle({ text }: { text: string }) {
  return (
    <p className="text-xs uppercase tracking-widest text-foreground">{text}</p>
  );
}

function ColorsGrid({ colors }: { colors: Color[] }) {
  return (
    <div className="grid grid-cols-4">
      {colors.map(color => (
        <div key={color.hex} className="flex flex-col items-center gap-1.5 p-2">
          <div className="h-10 w-10 rounded-full" style={{ background: color.hex }} />
          <p className="text-[10px] text-muted-foreground text-center">{color.name}</p>
        </div>
      ))}
    </div>
  );
}

export default function ColorimetryPage() {

  // states

  const [stage, setStage] = useState<Stage>("upload");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  // callback to process the file

  const handleFile = useCallback(async (file: File) => {
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
    setStage("analyzing");
    await new Promise(res => setTimeout(res, 400));
    try {
      const analysis = await analyzePhoto(file);
      await new Promise(res => setTimeout(res, 2200));
      console.log(analysis);
      setResult(analysis);
      setStage("results");
    } catch {
      setStage("upload");
    }
  }, []);

  // callback to reset the analysis

  const handleReset = () => {
    setStage("upload");
    setResult(null);
    if (photoUrl) URL.revokeObjectURL(photoUrl);
    setPhotoUrl(null);
  };

  // render

  return (
    <div className="flex flex-col justify-between h-screen p-5">

      {/* TOP  */}

      <div className="flex flex-col gap-10 justify-start flex-1 overflow-auto">

        <div className="flex justify-between">
          <Logo />
        </div>

        {stage === "upload" && (
          <>
            <p className="text-2xl font-light">Discover your perfect palette</p>
            <p className="text-muted-foreground">Upload a photo and our colorimetry engine will determine your seasonal color type.</p>
            <UploadZone onFile={handleFile} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {Object.values(SEASONS).map(s => (
                <div key={s.season} className="rounded-xl p-5 border">
                  <s.icon className=" stroke-muted-foreground mb-2" />
                  <p className="font-semibold">{s.season}</p>
                  <p className="text-sm text-muted-foreground">{s.description_short}</p>
                  <div className="mt-3 flex gap-1.5">
                    {s.bestColors.slice(0, 4).map(color => (
                      <div key={color.hex} className="h-3 flex-1 rounded-md" style={{ background: color.hex }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {stage === "analyzing" && (
          <div className="flex min-h-[60vh] items-center justify-center">
            <AnalysisLoader />
          </div>
        )}


        {stage === "results" && result && photoUrl && (
          <>

            {/* -- photo */}
            <img
              src={photoUrl}
              alt="Your uploaded photo"
              className="rounded-md object-cover object-top h-[40vh]"
            />

            {/* -- season info + characteristics*/}
            <div>
              <SmallTitle text="Your Season" />
              <div className="flex items-center gap-2">
                <span className="mt-1 text-4xl font-bold">{result.palette.subSeason}</span>
                <result.palette.icon className="stroke-muted-foreground animate-spin animation-duration-[2000ms]" />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{result.palette.description}</p>
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { icon: Thermometer, label: "Undertone", value: result.undertone },
                  { icon: Sun, label: "Depth", value: result.lightness },
                  { icon: Contrast, label: "Contrast", value: result.contrast },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="rounded-xl border p-3 text-center">
                    <Icon className="mx-auto mb-2 stroke-primary" />
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="mt-0.5 text-sm font-medium text-foreground">{value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 mt-5">
                {result.palette.characteristics.map(c => <p key={c} className="flex items-center text-sm text-muted-foreground"><Dot className="stroke-primary" />{c}</p>)}
              </div>
            </div>

            {/* -- Best colors */}
            <div className="space-y-5">
              <SmallTitle text="Your Best Colors" />
              <ColorsGrid colors={result.palette.bestColors} />
            </div>

            {/* -- Neutrals */}
            <div className="space-y-5">
              <SmallTitle text="Your Neutrals" />
              <ColorsGrid colors={result.palette.neutrals} />

            </div>

            {/* -- Avoid */}
            <div className="space-y-5">
              <SmallTitle text="Colors to Avoid" />
              <ColorsGrid colors={result.palette.avoidColors} />
            </div>

          </>
        )}

      </div>

      {/* BOTTOM  */}

      <div className="w-full flex flex-col gap-3 pt-5">
        {stage === "upload" && (
          <Link to="/">
            <Button className="uppercase w-full" variant={"outline"} size={"lg"}>
              Cancel
            </Button>
          </Link>
        )}
        {stage === "results" && (
          <>
            <Button className="" variant={"outline"} size={"lg"} onClick={handleReset}>
              Do it again
              <RotateCcw className="stroke-muted-foreground" />
            </Button>
            <Link to="/">
              <Button className="uppercase w-full" variant={"default"} size={"lg"}>
                CONTINUE
                <ArrowRight />
              </Button>
            </Link>
          </>
        )}
      </div>

    </div>
  )
}