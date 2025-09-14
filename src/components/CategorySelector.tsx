import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import { Category } from "@/types";

interface CategorySelectorProps {
  value?: string;
  onChange: (value: string) => void;
  categories: Category[];
  placeholder?: string;
}

export function CategorySelector({ 
  value, 
  onChange, 
  categories, 
  placeholder = "Selecionar categoria" 
}: CategorySelectorProps) {
  const [customCategory, setCustomCategory] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleAddCustomCategory = () => {
    if (customCategory.trim()) {
      onChange(customCategory.trim());
      setCustomCategory("");
      setShowCustomInput(false);
    }
  };

  const handleCancelCustom = () => {
    setShowCustomInput(false);
    setCustomCategory("");
  };

  return (
    <div className="space-y-2">
      {!showCustomInput ? (
        <div className="flex gap-2">
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowCustomInput(true)}
            className="px-3"
            title="Adicionar nova categoria"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Input
            placeholder="Digite uma nova categoria"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddCustomCategory();
              } else if (e.key === "Escape") {
                handleCancelCustom();
              }
            }}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAddCustomCategory}
            className="px-3"
            title="Adicionar categoria"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCancelCustom}
            className="px-3"
            title="Cancelar"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {showCustomInput && (
        <p className="text-xs text-muted-foreground">
          Digite uma nova categoria e clique no botão + para adicionar (Enter para confirmar, Esc para cancelar)
        </p>
      )}
    </div>
  );
}
