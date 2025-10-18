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
import type { Debt } from "@shared/schema";

interface DebtInputsProps {
  value: Debt[];
  onChange: (debts: Debt[]) => void;
}

export function DebtInputs({ value, onChange }: DebtInputsProps) {
  const addDebt = () => {
    onChange([
      ...value,
      { type: "credit_card", description: "", value: 0, party: "A" },
    ]);
  };

  const removeDebt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateDebt = (index: number, field: keyof Debt, fieldValue: any) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: fieldValue };
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {value.map((debt, index) => (
        <div
          key={index}
          className="rounded-lg border p-4 space-y-4 bg-card"
          data-testid={`debt-item-${index}`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Debt #{index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => removeDebt(index)}
              data-testid={`button-remove-debt-${index}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`debt-type-${index}`}>Type</Label>
              <Select
                value={debt.type}
                onValueChange={(val) => updateDebt(index, "type", val)}
              >
                <SelectTrigger id={`debt-type-${index}`} data-testid={`select-debt-type-${index}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student_loan">Student Loan</SelectItem>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="mortgage">Mortgage</SelectItem>
                  <SelectItem value="auto_loan">Auto Loan</SelectItem>
                  <SelectItem value="personal_loan">Personal Loan</SelectItem>
                  <SelectItem value="business_debt">Business Debt</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor={`debt-party-${index}`}>Responsible Party</Label>
              <Select
                value={debt.party}
                onValueChange={(val) => updateDebt(index, "party", val)}
              >
                <SelectTrigger id={`debt-party-${index}`} data-testid={`select-debt-party-${index}`}>
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
            <Label htmlFor={`debt-description-${index}`}>Description</Label>
            <Input
              id={`debt-description-${index}`}
              placeholder="e.g., Federal student loans"
              value={debt.description}
              onChange={(e) => updateDebt(index, "description", e.target.value)}
              data-testid={`input-debt-description-${index}`}
            />
          </div>
          <div>
            <Label htmlFor={`debt-value-${index}`}>Amount Owed ($)</Label>
            <Input
              id={`debt-value-${index}`}
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={debt.value || ""}
              onChange={(e) => updateDebt(index, "value", parseFloat(e.target.value) || 0)}
              data-testid={`input-debt-value-${index}`}
            />
          </div>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={addDebt}
        className="w-full"
        data-testid="button-add-debt"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Debt
      </Button>
    </div>
  );
}
