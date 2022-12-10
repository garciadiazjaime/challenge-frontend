import Link from "next/link";
import { useEffect, useContext, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";

import { RegistrationContext } from "./context";

const GET_USER = gql`
  query User($email: String!) {
    user(email: $email) {
      Hacker {
        status
      }
      Partner {
        status
      }
      Mentor {
        status
      }
    }
  }
`;

interface IUser {
  Hacker: {
    status: string;
  };
  Partner: {
    status: string;
  };
  Mentor: {
    status: string;
  };
}

export const Application = () => {
  const { email, setStep, setRole, setEmail } = useContext(RegistrationContext);
  const [user, setUser] = useState({} as IUser);
  const [getUser, { loading, error, data }] = useLazyQuery(GET_USER, {
    variables: {
      email,
    },
  });

  const init = async () => {
    const response = await getUser();

    if (response.data && response.data.user) {
      setUser(response.data.user);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const backHandler = () => {
    setStep("profile");
    setRole("");
    setEmail("")
  };

  return (
    <div className="overflow-hidden shadow sm:rounded-md">
      <div className="bg-white px-4 py-5 sm:p-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <h1>Application</h1>
          </div>

          <br />

          <div className="col-span-6 sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              {user.Hacker && user.Hacker.status ? (
                <div>Hacker status: {user.Hacker.status} </div>
              ) : null}
            </label>
          </div>

          <br />

          <div className="col-span-6 sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              {user.Partner && user.Partner.status ? (
                <div>Partner status: {user.Partner.status} </div>
              ) : null}
            </label>
          </div>

          <br />

          <div className="col-span-6 sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              {user.Mentor && user.Mentor.status ? (
                <div>Mentor status: {user.Mentor.status} </div>
              ) : null}
            </label>
          </div>
        </div>

        <br />

        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
          <button
            type="submit"
            onClick={backHandler}
            className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
