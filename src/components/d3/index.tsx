import { BubbleDatas, DataItem } from "../../models";
import { DonutChart } from "./donut"
import { GlobalChart } from "./global"
import BubbleChart from "./bubble";
import { useState } from "react";
import { Categorie } from "../categories";


const data: DataItem[] = [
  { label: 'Ne sais pas', percentage: 20 },
  { label: 'Réponses', percentage: 40 },
  { label: 'Sans réponses', percentage: 40 },
];
const value = 1.0;

const bubbleData: BubbleDatas[] = [
  { id: 1, risk_type: 'source', riskLevel: 80, label: 'Source' },
  { id: 2, risk_type: 'aggravating', riskLevel: 60, label: 'Métrique de projet' },
  { id: 3, risk_type: 'aggravating', riskLevel: 40, label: 'Contrat projet' },
  { id: 4, risk_type: 'aggravating', riskLevel: 29, label: 'Technique' }
];
export const D3Test: React.FC = () => {
  const [isColorSelected, setIsColorSelected] = useState<string>("#000");
  return (
    <div className="w-full mx-auto my-20">
      <Categorie setIsColorSelected={setIsColorSelected} />
      <DonutChart data={data} />
      <GlobalChart value={value} />
      <BubbleChart data={bubbleData} color={isColorSelected} />
    </div>
  )
}