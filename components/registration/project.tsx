import { useContext } from "react";

import { FormHacker } from "./form-hacker";
import { FormPartner } from "./form-partner";
import { FormMentor } from "./form-mentor";

import { RegistrationContext } from "./context";

export const Project = () => {
  const { role } = useContext(RegistrationContext);

  if (role === "hacker") {
    return <FormHacker />;
  }

  if (role === "partner") {
    return <FormPartner />;
  }

  if (role === "mentor") {
    return <FormMentor />;
  }

  return null;
};
