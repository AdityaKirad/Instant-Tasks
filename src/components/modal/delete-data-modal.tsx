import Button from "../button";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "../dialog";
import { resetState } from "src/store";

export default function DeleteDataModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleClose = () => onOpenChange(false);

  function deleteData() {
    resetState();
    handleClose();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="space-y-4">
        <DialogTitle>Are you sure?</DialogTitle>
        <p>All data will be delete permanently.</p>
        <div className="flex justify-end gap-2">
          <Button onClick={deleteData}>Delete Data</Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
