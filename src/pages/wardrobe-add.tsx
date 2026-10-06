
import { CheckCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { ItemCategory, ItemMaterial, ItemType } from "@/types/items";
import { createItem } from "@/services/items";
import { UploadZone } from "@/components/upload-zone";
import { AnalysisLoader } from "@/components/analysis-loader";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

type Stage = "upload" | "analyzing" | "results";

type ItemAnalysis = Partial<{
  category: ItemCategory;
  type: ItemType;
  color: string;
  material: ItemMaterial;
}>;

export default function WardrobeAddPage() {

  // --> States to manage

  const [stage, setStage] = useState<Stage>("upload");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [result, setResult] = useState<null | ItemAnalysis>(null);

  let navigate = useNavigate();

  // --> How to detect the item caracteristics

  const handleFile = useCallback(async (file: File) => {
    const url = URL.createObjectURL(file);
    setPhotoUrl(url);
    setStage("analyzing");
    await new Promise(res => setTimeout(res, 3000));
    setResult({
      category: "Top",
      type: "T-shirt",
      color: "red",
      material: "Cotton"
    });
    setStage("results");
  }, []);

  // --> how to reset

  const handleReset = useCallback(() => {
    setPhotoUrl(null);
    setResult(null);
    setStage("upload");
  }, []);

  // --> how to add the item to the wardrobe

  const handleSaveItem = useCallback(async () => {
    await createItem({
      name: 'Truc',
      image: 'shirt-1.webp',
      description: 'Un truc',
      userId: 'cmutxu74v00008othj7vrtd1f',
      brandId: 'cmutxukxo00018othbltzmnbk'
    })
    navigate("/wardrobe");
  }, [result, handleReset]);

  // --> component with stages

  return (
    <div className="flex flex-col justify-between h-screen p-5">

      {/* TOP  */}

      <div className="flex flex-col gap-10 justify-start flex-1 overflow-auto">

        {stage !== "analyzing" && (
          <p className="text-2xl font-light mt-5">Add items to your wardrobe</p>
        )}

        {stage === "upload" && (
          <UploadZone onFile={handleFile} />
        )}

        {stage === "analyzing" && (
          <div className="flex min-h-[60vh] items-center justify-center">
            <AnalysisLoader />
          </div>
        )}

        {stage === "results" && (

          <>

            {photoUrl && (
              <img
                src={photoUrl}
                alt="Your uploaded photo"
                className="rounded-md object-cover h-[40vh] shadow-xl/20 shadow-pink-500/50"
              />
            )}

            <Table>
              <TableBody>
                {Object.entries(result || {}).map(([key, value]) => (
                  <TableRow>
                    <TableCell key={key} className="text-muted-foreground">{key}</TableCell>
                    <TableCell className="">{value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </>


        )}
      </div>


      {/* BOTTOM  */}

      <div className="flex flex-col gap-3 pt-5">
        {stage !== "analyzing" && (
          <Link to="/wardrobe">
            <Button className="uppercase w-full" variant={"outline"} size={"lg"}>
              Cancel
            </Button>
          </Link>
        )}
        {stage === "results" && (
          <Button size={"lg"} onClick={handleSaveItem} variant={"default"} className="uppercase">
            Save Item
            <CheckCircle />
          </Button>
        )}
      </div>

    </div>
  )
}