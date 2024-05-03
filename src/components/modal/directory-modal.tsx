import Button from "../button";
import { Dialog, DialogTitle, DialogContent, DialogClose } from "../dialog";
import Input from "../input";
import * as Label from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useDirectoriesActions, useDirectoryInput, useDirectoryModal, useModalActions } from "src/store";

export default function DirectoryModal() {
  const { action, directory, open } = useDirectoryModal();
  const { directoryModalSet } = useModalActions();

  const title: { [key: string]: string } = {
    add: "Add new Directory",
    edit: "Edit Directory",
    delete: "Delete Directory",
  };

  const handleClose = () => directoryModalSet({ action, directory, open: false });
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle>{title[action]}</DialogTitle>
        {
          action === "delete" 
            ? <DeleteDirectory onClose={handleClose} /> 
            : <AddOrEditDirectory onClose={handleClose} />
        }
      </DialogContent>
    </Dialog>
  );
}

function AddOrEditDirectory({ onClose }: { onClose: () => void }) {
  const { addDirectory, editDirectory } = useDirectoriesActions();
  const { action, directory } = useDirectoryModal();
  const [error, errorSet] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (action === "add") addDirectory();
      else editDirectory(directory);
      onClose();
    } catch (error) {
      if (error instanceof Error) errorSet(error.message);
    }
  };
  return (
    <form className="mt-2" onSubmit={handleSubmit}>
      <div>
        <Label.Root htmlFor="directory">Title</Label.Root>
        <DirectoryInput error={error} setError={errorSet} />
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button type="submit">{action === "add" ? "Create" : "Edit"}</Button>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </div>
    </form>
  );
}

function DirectoryInput({
  error,
  setError,
}: {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}) {
  const directoryInput = useDirectoryInput();
  const { directoryInputSet } = useDirectoriesActions();
  const { directory } = useDirectoryModal();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    directoryInputSet(e.target.value);
    setError("");
  }

  useEffect(() => {
    directoryInputSet(directory);
  }, [directory, directoryInputSet]);
  return (
    <>
      <Input
        id="directory"
        className="mt-2"
        type="text"
        placeholder="Enter Directory name"
        autoComplete="off"
        value={directoryInput}
        onChange={handleChange}
        required
      />
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}

function DeleteDirectory({ onClose }: { onClose: () => void }) {
  const { deleteDirectory } = useDirectoriesActions();
  const { directory } = useDirectoryModal();
  return (
    <>
      <p className="mt-4">This Directory and all of it&apos;s content will be delete.</p>
      <div className="mt-4 flex justify-end gap-2">
        <Button
          onClick={() => {
            deleteDirectory(directory);
            onClose();
          }}>
          Delete
        </Button>
        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </div>
    </>
  );
}
