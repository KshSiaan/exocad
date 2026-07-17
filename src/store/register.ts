import { create } from "zustand";

export interface CompleteData {
  clinic_name: string;
  address: string;
  role: string;
  full_name: string;
  email: string;
  password: string;
  password_confirmation: string;
  contact_email_address: string;
  about_for_designer: string;
  proffesional_title: string;
  bio: string;
}

interface CompleteDataState {
  completeData: CompleteData;

  setCompleteData: (data: Partial<CompleteData>) => void;

  updateField: <K extends keyof CompleteData>(
    key: K,
    value: CompleteData[K]
  ) => void;

  resetCompleteData: () => void;
}

const initialState: CompleteData = {
  clinic_name: "",
  address: "",
  role: "",
  full_name: "",
  email: "",
  password: "",
  password_confirmation: "",
  contact_email_address: "",
  about_for_designer: "",
  proffesional_title: "",
  bio: "",
};

export const useCompleteDataStore = create<CompleteDataState>((set) => ({
  completeData: initialState,

  setCompleteData: (data) =>
    set((state) => ({
      completeData: {
        ...state.completeData,
        ...data,
      },
    })),

  updateField: (key, value) =>
    set((state) => ({
      completeData: {
        ...state.completeData,
        [key]: value,
      },
    })),

  resetCompleteData: () =>
    set({
      completeData: initialState,
    }),
}));