import { FaTrash } from "react-icons/fa6";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type AdditionalProps = {
  type: "skills" | "certs";
  values: string[];
  onChange: (index: number, value: string) => void;
  onRemove: (type: "skills" | "certs", index: number) => void;
};

export default function Additional({ type, values, onChange, onRemove }: AdditionalProps) {
  return (
    <div className="space-y-2">
      {values.map((val, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={val}
            onChange={(e) => onChange(index, e.target.value)}
            placeholder={type === "skills" ? "Skill or Tool" : "Certification"}
          />
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2 text-red-600"
            onClick={() => onRemove(type, index)}
          >
            <FaTrash /> Undo
          </Button>
        </div>
      ))}
    </div>
  );
}
