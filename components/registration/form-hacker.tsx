import { useEffect, useContext, useState } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";

import { RegistrationContext } from "./context";

const GET_HACKER = gql`
  query Hacker($email: String!) {
    hacker(email: $email) {
      email
      name
      lastName

      website
      github
      linkedin
      softwareExperience
      ethereumExperience
      motivation
      builtBefore
      buildHackathon
      conduct
    }
  }
`;

const SAVE_HACKER = gql`
  mutation SaveHacker(
    $email: String!
    $name: String
    $lastName: String
    $website: String
    $github: String
    $linkedin: String
    $softwareExperience: String
    $ethereumExperience: String
    $motivation: String
    $builtBefore: String
    $buildHackathon: String
    $conduct: Boolean
  ) {
    saveHacker(
      email: $email
      name: $name
      lastName: $lastName

      website: $website
      github: $github
      linkedin: $linkedin
      softwareExperience: $softwareExperience
      ethereumExperience: $ethereumExperience
      motivation: $motivation
      builtBefore: $builtBefore
      buildHackathon: $buildHackathon
      conduct: $conduct
    ) {
      email
      name
      lastName

      website
      github
      linkedin
      softwareExperience
      ethereumExperience
      motivation
      builtBefore
      buildHackathon
      conduct
    }
  }
`;

const getMotivation = (motivation: string[], value: string) => {
  if (!motivation.find((item) => item === value)) {
    return [...motivation, value];
  }

  return motivation.filter((item) => item !== value);
};

export const FormHacker = () => {
  const { email, role, setStep, setRole } = useContext(RegistrationContext);

  const [getUser, { loading, error, data }] = useLazyQuery(GET_HACKER, {
    variables: {
      email,
    },
  });

  const [saveUser, { loading: updateLoading, error: updateError }] =
    useMutation(SAVE_HACKER, {
      update: (cache, { data: { saveUser: saveUserData } }) => {
        cache.modify({
          fields: {
            hacker: () => saveUserData,
          },
        });
      },
    });

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [softwareExperience, setSoftwareExperience] = useState<string>("");
  const [ethereumExperience, setEthereumExperience] = useState<string>("");
  const [motivation, setMotivation] = useState<string[]>([]);
  const [builtBefore, setBuiltBefore] = useState<string>("");
  const [buildHackathon, setBuildHackathon] = useState<string>("");
  const [conduct, setConduct] = useState<boolean>(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await saveUser({
      variables: {
        name,
        lastName,
        website,
        github,
        linkedin,
        softwareExperience,
        ethereumExperience,
        motivation: JSON.stringify(motivation),
        builtBefore,
        buildHackathon,
        conduct,
        email,
        role,
      },
    });

    if (!updateError) {
      setStep("application");
    }
  };

  const init = async () => {
    const response = await getUser();

    const { hacker } = response.data || {};
    if (hacker) {
      setName(hacker.name);
      setLastName(hacker.lastName);
      setWebsite(hacker.website);
      setGithub(hacker.github);
      setLinkedin(hacker.linkedin);
      setSoftwareExperience(hacker.softwareExperience);
      setEthereumExperience(hacker.ethereumExperience || "");
      setMotivation(hacker.motivation ? JSON.parse(hacker.motivation) : []);
      setBuiltBefore(hacker.builtBefore);
      setBuildHackathon(hacker.buildHackathon);
      setConduct(hacker.conduct);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const backHandler = () => {
    setStep("role");
    setRole("");
  };

  const motivationHandler = (value: string) => {
    const newValue = getMotivation(motivation, value);

    setMotivation(newValue);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="overflow-hidden shadow sm:rounded-md">
        <div className="bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                First name:
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700"
              >
                Website:
              </label>
              <input
                type="text"
                onChange={(e) => setWebsite(e.target.value)}
                value={website}
                name="website"
                id="website"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="github"
                className="block text-sm font-medium text-gray-700"
              >
                Github:
              </label>
              <input
                type="text"
                onChange={(e) => setGithub(e.target.value)}
                value={github}
                name="github"
                id="github"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="linkedin"
                className="block text-sm font-medium text-gray-700"
              >
                Linkedin:
              </label>
              <input
                type="text"
                onChange={(e) => setLinkedin(e.target.value)}
                value={linkedin}
                name="linkedin"
                id="linkedin"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="softwareExperience"
                className="block text-sm font-medium text-gray-700"
              >
                How many years of experience do you have with software
                development?
              </label>
              <input
                type="number"
                onChange={(e) => setSoftwareExperience(e.target.value)}
                value={softwareExperience}
                name="softwareExperience"
                id="softwareExperience"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="ethereumExperience"
                className="block text-sm font-medium text-gray-700"
              >
                What&apos;s your experience level with Ethereum?
              </label>
              <select
                onChange={(e) => setEthereumExperience(e.target.value)}
                value={ethereumExperience}
                id="ethereumExperience"
                name="ethereumExperience"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option>select</option>
                <option value="beginner">beginner</option>
                <option value="intermediate">intermediate</option>
                <option value="expert">expert</option>
              </select>
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="motivation"
                className="block text-sm font-medium text-gray-700"
              >
                What is your motivation to join this event?
              </label>
              <select
                onChange={(e) => motivationHandler(e.target.value)}
                value={motivation}
                id="motivation"
                name="motivation"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                size={8}
                multiple
              >
                <option value="1">Attend workshops & tech talks</option>
                <option value="2">
                  Build something to put on my resume / portfolio
                </option>
                <option value="3">Get better as a developer / designer</option>
                <option value="4">
                  Meet companies for a potential job opportunity
                </option>
                <option value="5">
                  Meet like-minded people and make friends
                </option>
                <option value="6">Launch a product</option>
                <option value="7">Win a prize</option>
                <option value="8">Other</option>
              </select>
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="builtBefore"
                className="block text-sm font-medium text-gray-700"
              >
                Tell us about what you&apos;ve built before?
              </label>
              <textarea
                onChange={(e) => setBuiltBefore(e.target.value)}
                value={builtBefore}
                name="builtBefore"
                id="builtBefore"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="buildHackathon"
                className="block text-sm font-medium text-gray-700"
              >
                Tell us about what are you looking to build at this hackathon?
              </label>
              <textarea
                onChange={(e) => setBuildHackathon(e.target.value)}
                value={buildHackathon}
                name="buildHackathon"
                id="buildHackathon"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    onChange={(e) => setConduct(e.target.checked)}
                    checked={conduct}
                    id="conduct"
                    name="conduct"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <p className="text-gray-500">
                    Do you accept the rules and code of conduct for the event?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Save
        </button>
      </div>
      <div>
        {loading ? "..." : ""}
        {JSON.stringify(error)}
      </div>
    </form>
  );
};
