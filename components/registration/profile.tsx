import { useContext, useState } from "react";

import { RegistrationContext } from "./context";

export const Profile = () => {
  const { step, setStep, setEmail } = useContext(RegistrationContext);
  const [email, setEmailInput] = useState<string>("");

  if (step !== "profile") {
    return null;
  }

  const signUpHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      return
    }
    setEmail(email);
    setStep("role");
  };

  return (
    <form action="#" method="POST">
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="email-address"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmailInput(e.target.value)}
                name="email-address"
                id="email-address"
                autoComplete="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            onClick={signUpHandler}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};
