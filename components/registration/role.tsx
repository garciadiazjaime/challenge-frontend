import { useContext } from "react";
import { RegistrationContext } from "./context";

export const Role = () => {
  const { step, setStep, setRole, role } = useContext(RegistrationContext);
  const roles = [
    {
      id: "hacker",
      title: "Hacker",
    },
    {
      id: "partner",
      title: "Partner",
    },
    {
      id: "mentor",
      title: "Mentor",
    },
  ];

  if (step !== "role") {
    return null;
  }

  const clickRoleHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  const clickNextHandler = () => {
    setStep("project");
  };

  const backHandler = () => {
    setRole("")
    setStep("profile");
  };

  return (
    <form action="#" method="POST">
      <legend className="contents text-base font-medium text-gray-900">
        Role
      </legend>
      <p className="text-sm text-gray-500">
        How would you like to participate?
      </p>
      <div className="mt-4 space-y-4">
        {roles.map(({ id, title }) => (
          <div
            key={id}
            className="flex items-center"
          >
            <input
              value={id}
              onChange={clickRoleHandler}
              id={id}
              name="push-notifications"
              type="radio"
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label
              htmlFor={id}
              className="ml-3 block text-sm font-medium text-gray-700"
            >
              {title}
            </label>
          </div>
        ))}

        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            onClick={backHandler}
            className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Back
          </button>{" "}
          <button
            type="submit"
            onClick={clickNextHandler}
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};
