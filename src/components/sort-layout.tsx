import { Select, SelectTrigger, SelectContent, SelectItem } from "./select";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { LayoutList, LayoutGrid } from "lucide-react";
import { sortFunctions } from "src/lib/utils";
import { useLayout, useSort, useSortAndLayoutActions } from "src/store";

export default function SortAndLayout() {
  return (
    <div className="mt-4 flex items-center justify-between">
      <TodosLayout />
      <TodosSort />
    </div>
  );
}

function TodosLayout() {
  const layout = useLayout();
  const { setLayout } = useSortAndLayoutActions();
  return (
    <RadioGroup.Root defaultValue="grid" aria-label="grid layout" value={layout} onValueChange={setLayout}>
      <RadioGroup.Item
        className="group rounded p-2 focus-visible:data-[state=checked]:outline focus-visible:data-[state=checked]:outline-2 focus-visible:data-[state=checked]:outline-blue-500"
        value="list">
        <LayoutList className="group-data-[state=checked]:text-white" />
      </RadioGroup.Item>
      <RadioGroup.Item
        className="group rounded p-2 focus-visible:data-[state=checked]:outline focus-visible:data-[state=checked]:outline-2 focus-visible:data-[state=checked]:outline-blue-500"
        value="grid">
        <LayoutGrid className="group-data-[state=checked]:text-white" />
      </RadioGroup.Item>
    </RadioGroup.Root>
  );
}

function TodosSort() {
  const sortFunction = useSort();
  const { setSortFunction } = useSortAndLayoutActions();

  return (
    <Select value={sortFunction} onValueChange={setSortFunction}>
      <SelectTrigger title="Sort by" placeholder="Sort by" />
      <SelectContent>
        <SelectItem value={sortFunctions.earlier}>{sortFunctions.earlier}</SelectItem>
        <SelectItem value={sortFunctions.later}>{sortFunctions.later}</SelectItem>
        <SelectItem value={sortFunctions.incomplete}>{sortFunctions.incomplete}</SelectItem>
        <SelectItem value={sortFunctions.important}>{sortFunctions.important}</SelectItem>
      </SelectContent>
    </Select>
  );
}
