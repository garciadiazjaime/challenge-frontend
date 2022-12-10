import { useState } from "react";

import { RegistrationContext } from "./context";
import { Profile } from "./profile";
import { Role } from "./role";
import { Project } from "./project";
import { Application } from './application'

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://127.0.0.1:4000/",
  cache: new InMemoryCache(),
});

const StepView = (props: { step: string }) => {
  const { step } = props;

  if (step === "role") {
    return <Role />;
  }

  if (step === "project") {
    return <Project />;
  }

  if (step === 'application') {
    return <Application />
  }

  return <Profile />;
};

export const Registration = () => {
  const [step, setStep] = useState<string>("profile");
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const value = {
    step,
    email,
    role,
    setStep,
    setEmail,
    setRole,
  };

  return (
    <ApolloProvider client={client}>
      <RegistrationContext.Provider value={value}>
        <div className="mt-10 sm:mt-0">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Profile
                </h3>
                <p className="mt-1 text-sm text-gray-600">{email}</p>
                <p className="mt-1 text-sm text-gray-600">{role}</p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <StepView step={step} />
            </div>
          </div>
        </div>
      </RegistrationContext.Provider>
    </ApolloProvider>
  );
};
