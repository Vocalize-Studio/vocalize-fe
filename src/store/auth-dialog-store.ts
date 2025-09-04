import { create } from "zustand";

type ModeLogin = "login" | "forgot";

type ModeRegister = "register";

type ModeForgot = "forgot";

interface LoginDialogState {
  isOpen: boolean;
  mode: ModeLogin;
  open: (mode?: ModeLogin) => void;
  close: () => void;
  setMode: (m: ModeLogin) => void;
}

interface RegisterDialogState {
  isOpen: boolean;
  mode: ModeRegister;
  open: (mode?: ModeRegister) => void;
  close: () => void;
  setMode: (m: ModeRegister) => void;
}

interface ForgotPasswordDialogState {
  isOpen: boolean;
  mode: ModeForgot;
  open: (mode?: ModeForgot) => void;
  close: () => void;
  setMode: (m: ModeForgot) => void;
}

export const useLoginDialogStore = create<LoginDialogState>((set) => ({
  isOpen: false,
  mode: "login",
  open: (mode = "login") => set({ isOpen: true, mode }),
  close: () => set({ isOpen: false }),
  setMode: (mode) => set({ mode }),
}));

export const useRegisterDialogStore = create<RegisterDialogState>((set) => ({
  isOpen: false,
  mode: "register",
  open: (mode = "register") => set({ isOpen: true, mode }),
  close: () => set({ isOpen: false }),
  setMode: (mode) => set({ mode }),
}));

export const useForgotPasswordDialogStore = create<ForgotPasswordDialogState>(
  (set) => ({
    isOpen: false,
    mode: "forgot",
    open: (mode = "forgot") => set({ isOpen: true, mode }),
    close: () => set({ isOpen: false }),
    setMode: (mode) => set({ mode }),
  })
);
