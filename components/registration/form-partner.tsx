import { useEffect, useContext, useState } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";

import { RegistrationContext } from "./context";

const GET_PARTNER = gql`
  query Partner($email: String!) {
    partner(email: $email) {
      email
      name
      lastName

      website
      linkedin
      organization
      telegram
      twitter
      supportedBefore
      whySupport
      acceptRules
    }
  }
`;

const SAVE_PARTNER = gql`
  mutation SavePartner(
    $email: String!
    $name: String
    $lastName: String
    $website: String
    $linkedin: String
    $organization: String
    $telegram: String
    $twitter: String
    $supportedBefore: String
    $whySupport: String
    $acceptRules: Boolean
  ) {
    savePartner(
      email: $email
      name: $name
      lastName: $lastName

      website: $website
      linkedin: $linkedin
      organization: $organization
      telegram: $telegram
      twitter: $twitter
      supportedBefore: $supportedBefore
      whySupport: $whySupport
      acceptRules: $acceptRules
    ) {
      email
      name
      lastName

      website
      linkedin
      organization
      telegram
      twitter
      supportedBefore
      whySupport
      acceptRules
    }
  }
`;

export const FormPartner = () => {
  const { email, role, setStep, setRole } = useContext(RegistrationContext);

  const [getUser, { loading, error, data }] = useLazyQuery(GET_PARTNER, {
    variables: {
      email,
    },
  });

  const [savePartner, { loading: updateLoading, error: updateError }] =
    useMutation(SAVE_PARTNER, {
      update: (cache, { data: { savePartner: saveUserData } }) => {
        cache.modify({
          fields: {
            partner: () => saveUserData,
          },
        });
      },
    });

  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const [website, setWebsite] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [linkedin, setLinkedin] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");
  const [telegram, setTelegram] = useState<string>("");
  const [twitter, setTwitter] = useState<string>("");
  const [supportedBefore, setSupportedBefore] = useState<string>("");
  const [whySupport, setWhySupport] = useState<string>("");
  const [acceptRules, setAcceptRules] = useState<boolean>(false);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await savePartner({
      variables: {
        email,
        name,
        lastName,

        website,
        github,
        linkedin,
        organization,
        telegram,
        twitter,
        supportedBefore,
        whySupport,
        acceptRules,
      },
    });

    if (!updateError) {
      setStep("application");
    }
  };

  const init = async () => {
    const response = await getUser();
    const { partner } = response.data || {};

    if (partner) {
      setName(partner.name);
      setLastName(partner.lastName);
      setWebsite(partner.website);
      setGithub(partner.github);
      setLinkedin(partner.linkedin);
      setOrganization(partner.organization);
      setTelegram(partner.telegram);
      setTwitter(partner.twitter);
      setSupportedBefore(partner.supportedBefore);
      setWhySupport(partner.whySupport);
      setAcceptRules(partner.acceptRules);
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
                htmlFor="organization"
                className="block text-sm font-medium text-gray-700"
              >
                Organization:
              </label>
              <input
                type="text"
                onChange={(e) => setOrganization(e.target.value)}
                value={organization}
                name="organization"
                id="organization"
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
                htmlFor="supportedBefore"
                className="block text-sm font-medium text-gray-700"
              >
                Have you supported other Ethereum events before? If yes, which
                ones?
              </label>
              <textarea
                onChange={(e) => setSupportedBefore(e.target.value)}
                value={supportedBefore}
                name="supportedBefore"
                id="supportedBefore"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="whySupport"
                className="block text-sm font-medium text-gray-700"
              >
                Why do you want to support this hackathon?
              </label>
              <textarea
                onChange={(e) => setWhySupport(e.target.value)}
                value={whySupport}
                name="whySupport"
                id="whySupport"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
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
