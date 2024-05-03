import { create } from "zustand";

type DirectoryModalProps = { open: boolean; action: "add" | "edit" | "delete"; directory: string };

type TaskModalProps = {
  open: boolean;
  action: "add" | "edit";
  taskId: string;
};

type ModalState = {
  directoryModal: DirectoryModalProps;
  taskModal: TaskModalProps;
  actions: {
    taskModalSet: (action: TaskModalProps) => void;
    directoryModalSet: (action: DirectoryModalProps) => void;
  };
};

const useStore = create<ModalState>()((set) => ({
  taskModal: { open: false, action: "add", taskId: "" },

  directoryModal: { open: false, action: "add", directory: "" },

  actions: {
    taskModalSet(action) {
      set({ taskModal: action });
    },

    directoryModalSet(action) {
      set({ directoryModal: action });
    },
  },
}));

const useTaskModal = () => useStore((state) => state.taskModal);
const useDirectoryModal = () => useStore((state) => state.directoryModal);
const useModalActions = () => useStore((state) => state.actions);

export { useTaskModal, useDirectoryModal, useModalActions };
