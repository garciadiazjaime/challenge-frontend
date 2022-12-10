import React from "react";

const registration = {
  step: "",
  email: "",
  role: "",
  setStep: (step: string) => {},
  setEmail: (step: string) => {},
  setRole: (role:string) => {}
};

export const RegistrationContext = React.createContext(registration);
