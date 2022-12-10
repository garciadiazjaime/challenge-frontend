import { useEffect, useContext, useState, useRef, MouseEvent } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";

import { RegistrationContext } from "./context";

const GET_MENTOR = gql`
  query Mentor($email: String!) {
    mentor(email: $email) {
      email
      name
      lastName

      website
      github
      linkedin
      telegram
      twitter
      softwareExperience
      ethereumExperience
      ethereumMentored
      whyMentor
      acceptRules
    }
  }
`;

const SAVE_MENTOR = gql`
  mutation SaveMentor(
    $email: String!
    $name: String
    $lastName: String
    $website: String
    $github: String
    $linkedin: String
    $telegram: String
    $twitter: String
    $softwareExperience: String
    $ethereumExperience: String
    $ethereumMentored: String
    $whyMentor: String
    $acceptRules: Boolean
  ) {
    saveMentor(
      email: $email
      name: $name
      lastName: $lastName

      website: $website
      github: $github
      linkedin: $linkedin
      telegram: $telegram
      twitter: $twitter
      softwareExperience: $softwareExperience
      ethereumExperience: $ethereumExperience
      ethereumMentored: $ethereumMentored
      whyMentor: $whyMentor
      acceptRules: $acceptRules
    ) {
      email
      name
      lastName

      website
      github
      linkedin
      telegram
      twitter
      softwareExperience
      ethereumExperience
      ethereumMentored
      whyMentor
      acceptRules
    }
  }
`;

export const FormMentor = () => {
  const { email, role, setStep, setRole } = useContext(RegistrationContext);

  const [getUser, { loading, error, data }] = useLazyQuery(GET_MENTOR, {
    variables: {
      email,
      role,
    },
  });

  const [saveUser, { loading: updateLoading, error: updateError }] =
    useMutation(SAVE_MENTOR, {
      update: (cache, { data: { saveUser: saveUserData } }) => {
        cache.modify({
          fields: {
            mentor: () => saveUserData,
          },
        });
      },
    });

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [telegram, setTelegram] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [softwareExperience, setSoftwareExperience] = useState<string>("");
  const [ethereumExperience, setEthereumExperience] = useState<string>("");
  const [ethereumMentored, setEthereumMentored] = useState<string>("");
  const [whyMentor, setWhyMentor] = useState<string>("");
  const [acceptRules, setAcceptRules] = useState<boolean>(false);

  const [errorField, setErrorField] = useState<string>("");

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorField("");

    if (ethereumMentored.length < 250) {
      setErrorField("ethereumMentored");
      return;
    }
    if (whyMentor.length < 250) {
      setErrorField("whyMentor");
      return;
    }

    await saveUser({
      variables: {
        email,
        name,
        lastName,

        website,
        github,
        linkedin,
        telegram,
        twitter,
        softwareExperience,
        ethereumExperience,
        ethereumMentored,
        whyMentor,
        acceptRules,
      },
    });

    if (!updateError) {
      setStep("application");
    }
  };

  const init = async () => {
    const response = await getUser();

    const { mentor } = response.data || {};
    if (mentor) {
      setName(mentor.name);
      setLastName(mentor.lastName);
      setWebsite(mentor.website);
      setGithub(mentor.github);
      setLinkedin(mentor.linkedin);
      setTelegram(mentor.telegram);
      setTwitter(mentor.twitter);
      setSoftwareExperience(mentor.softwareExperience);
      setEthereumExperience(mentor.ethereumExperience || "");
      setEthereumMentored(mentor.ethereumMentored);
      setWhyMentor(mentor.whyMentor);
      setAcceptRules(mentor.acceptRules);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const backHandler = () => {
    setStep("role");
    setRole("");
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
                htmlFor="telegram"
                className="block text-sm font-medium text-gray-700"
              >
                Telegram
              </label>
              <input
                type="text"
                onChange={(e) => setTelegram(e.target.value)}
                value={telegram}
                name="telegram"
                id="telegram"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="twitter"
                className="block text-sm font-medium text-gray-700"
              >
                Twitter
              </label>
              <input
                type="text"
                onChange={(e) => setTwitter(e.target.value)}
                value={twitter}
                name="twitter"
                id="twitter"
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
                htmlFor="ethereumMentored"
                className={`block text-sm font-medium text-gray-700 ${
                  errorField === "ethereumMentored" ? "text-red-700" : ""
                }`}
              >
                Have you mentored at other Ethereum events before? If yes, which
                ones?
              </label>
              <textarea
                onChange={(e) => {
                  if (e.target.value.length < 250) {
                    setErrorField("ethereumMentored");
                  } else {
                    setErrorField("");
                  }

                  if (e.target.value.length <= 500) {
                    setEthereumMentored(e.target.value);
                  }
                }}
                value={ethereumMentored}
                name="ethereumMentored"
                id="ethereumMentored"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <div>
                <small>min: 250, max: 500. [{ethereumMentored.length}]</small>
              </div>
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="whyMentor"
                className={`block text-sm font-medium text-gray-700 ${
                  errorField === "whyMentor" ? "text-red-700" : ""
                }`}
              >
                Why do you want to mentor at this hackathon?
              </label>
              <textarea
                onChange={(e) => {
                  if (e.target.value.length < 250) {
                    setErrorField("whyMentor");
                  } else {
                    setErrorField("");
                  }

                  if (e.target.value.length <= 500) {
                    setWhyMentor(e.target.value);
                  }
                }}
                value={whyMentor}
                name="whyMentor"
                id="whyMentor"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <div>
                <small>min: 250, max: 500. [{whyMentor.length}]</small>
              </div>
            </div>

            <div className="col-span-6 sm:col-span-4">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    onChange={(e) => setAcceptRules(e.target.checked)}
                    checked={acceptRules}
                    id="acceptRules"
                    name="acceptRules"
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
