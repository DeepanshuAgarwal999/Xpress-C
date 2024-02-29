import { create } from "zustand";

interface AadharModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAadhaarModal = create<AadharModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAadhaarModal;
