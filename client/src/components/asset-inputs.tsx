import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Asset } from "@shared/schema";

interface AssetInputsProps {
  value: Asset[];
  onChange: (assets: Asset[]) => void;
}

export function AssetInputs({ value, onChange }: AssetInputsProps) {
  const addAsset = () => {
    onChange([
      ...value,
      { type: "bank_account", description: "", value: 0, owner: "A" },
    ]);
  };

  const removeAsset = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateAsset = (index: number, field: keyof Asset, fieldValue: any) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: fieldValue };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {value.map((asset, index) => (
        <div
          key={index}
          className="rounded-lg border p-4 space-y-4 bg-card"
          data-testid={`asset-item-${index}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Asset #{index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => removeAsset(index)}
              data-testid={`button-remove-asset-${index}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`asset-type-${index}`}>Type</Label>
              <Select
                value={asset.type}
                onValueChange={(val) => updateAsset(index, "type", val)}
              >
                <SelectTrigger id={`asset-type-${index}`} data-testid={`select-asset-type-${index}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="real_property">Real Estate</SelectItem>
                  <SelectItem value="bank_account">Bank Account</SelectItem>
                  <SelectItem value="investment">Investment Account</SelectItem>
                  <SelectItem value="retirement">Retirement Account</SelectItem>
                  <SelectItem value="business">Business Interest</SelectItem>
                  <SelectItem value="vehicle">Vehicle</SelectItem>
                  <SelectItem value="personal_property">Personal Property</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor={`asset-owner-${index}`}>Owner</Label>
              <Select
                value={asset.owner}
                onValueChange={(val) => updateAsset(index, "owner", val)}
              >
                <SelectTrigger id={`asset-owner-${index}`} data-testid={`select-asset-owner-${index}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Party A</SelectItem>
                  <SelectItem value="B">Party B</SelectItem>
                  <SelectItem value="joint">Joint</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor={`asset-description-${index}`}>Description</Label>
            <Input
              id={`asset-description-${index}`}
              placeholder="e.g., Condo in San Diego"
              value={asset.description}
              onChange={(e) => updateAsset(index, "description", e.target.value)}
              data-testid={`input-asset-description-${index}`}
            />
          </div>
          <div>
            <Label htmlFor={`asset-value-${index}`}>Estimated Value ($)</Label>
            <Input
              id={`asset-value-${index}`}
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={asset.value || ""}
              onChange={(e) => updateAsset(index, "value", parseFloat(e.target.value) || 0)}
              data-testid={`input-asset-value-${index}`}
            />
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={addAsset}
        className="w-full"
        data-testid="button-add-asset"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Asset
      </Button>
    </div>
  );
}
