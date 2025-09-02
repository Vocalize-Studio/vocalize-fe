import { create } from "zustand";

type Mode = "login" | "forgot";

interface LoginDialogState {
  isOpen: boolean;
  mode: Mode;
  open: (mode?: Mode) => void;
  close: () => void;
  setMode: (m: Mode) => void;
}

export const useLoginDialogStore = create<LoginDialogState>((set) => ({
  isOpen: false,
  mode: "login",
  open: (mode = "login") => set({ isOpen: true, mode }),
  close: () => set({ isOpen: false }),
  setMode: (mode) => set({ mode }),
}));
