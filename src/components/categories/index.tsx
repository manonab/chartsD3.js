interface CategorieProps {
  setIsColorSelected: (color: string) => void;
}
export const Categorie: React.FC<CategorieProps> = ({ setIsColorSelected }) => {

  const changeColor = (color: string) => {
    setIsColorSelected(color);
  };

  return (
    <div className="w-[500px] flex-wrap flex mx-auto gap-10 justify-between">
      <button
        onClick={() =>
          changeColor("#000000")}
        className="hover:cursor-pointer border-[#E5E7EB] border p-2"
      >
        <p>Périmetre fonctionnel</p>
      </button>
      <button onClick={() => changeColor("#146BE4")} className="hover:cursor-pointer border-[#E5E7EB] border p-2"
      >
        <p>Equipe Projet</p>
      </button>
      <button onClick={() => changeColor("#EF4444")} className="hover:cursor-pointer border-[#E5E7EB] border p-2"
      >
        <p>Technique</p>
      </button>
      <button onClick={() => changeColor("#1F2937")} className="hover:cursor-pointer border-[#E5E7EB] border p-2"
      >
        <p>Écosystème du projet</p>
      </button>
      <button onClick={() => changeColor("#77B65D")} className="hover:cursor-pointer border-[#E5E7EB] border p-2"
      >
        <p>Contrat projet</p>
      </button>
    </div >
  )
}