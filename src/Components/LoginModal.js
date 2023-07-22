import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, provider } from "../Firebase/firebase-config";

export default function Example({ open, setOpen }) {
  const cancelButtonRef = useRef(null);

  const [mode, setMode] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (mode === "login") {
        SignIn();
      } else {
        Signup();
      }
    }
  };

  // Password strength validation function
  const isStrongPassword = (password) => {
    const passwordRequirements = [
      { label: "At least 8 characters", regex: /.{8,}/ },
      { label: "At least 1 uppercase letter", regex: /.*[A-Z].*/ },
      { label: "At least 1 lowercase letter", regex: /.*[a-z].*/ },
      { label: "At least 1 number", regex: /.*\d.*/ },
      { label: "At least 1 special character", regex: /.*[@$!%*?&].*/ },
    ];

    const missingRequirements = passwordRequirements.filter(
      (requirement) => !requirement.regex.test(password)
    );

    if (missingRequirements.length === 0) {
      return true;
    } else {
      return missingRequirements.map((requirement) => requirement.label);
    }
  };

  // * Signup function with email and password
  const Signup = async () => {
    try {
      setError(null); // Clear any previous error
      if (password !== confirmPassword) {
        setError("Password does not match");
        return;
      }

      const missingRequirements = isStrongPassword(password);
      if (missingRequirements !== true) {
        setError(
          <div>
            <p className="text-red-500">Password must contain:</p>
            <ul className="list-disc list-inside">
              {missingRequirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        );
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password).then(() => {
        SignIn();
      });

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setOpen(false);
    } catch (error) {
      setError("Error signing up. Please try again.");
      console.log("error: ", error);
    }
  };

  const SignIn = async () => {
    try {
      setError(null); // Clear any previous error

      await signInWithEmailAndPassword(auth, email, password);

      setEmail("");
      setPassword("");
      setOpen(false);
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      console.log("error: ", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      setOpen(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto w-screen h-screen">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col justify-center items-center w-full">
                  <div className="sm:flex sm:items-start w-full">
                    {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationTriangleIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div> */}
                    <div className="mt-3 flex flex-col justify-center items-center text-center  sm:mt-0 sm:text-left w-full">
                      <Dialog.Title
                        as="h1"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        {mode === "login" ? "Login" : "Sign up"}
                      </Dialog.Title>
                      <div className="mt-2 flex flex-col justify-center items-center w-full">
                        <p className="text-sm text-gray-500">
                          Please {mode === "login" ? "login" : "sign up"} to
                          continue
                        </p>

                        {/* Login FORM */}
                        <form
                          className="space-y-6 w-full"
                          action="#"
                          method="POST"
                          onKeyPress={(e) => handleKeyPress(e)}
                        >
                          <div className="rounded-md shadow-sm -space-y-px pt-5 flex flex-col">
                            <div>
                              <label
                                htmlFor="email-address"
                                className="sr-only"
                              >
                                Email address
                              </label>
                              <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="bg-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                              />
                            </div>
                            <div>
                              <label htmlFor="password" className="sr-only">
                                Password
                              </label>
                              <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="bg-white appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm rounded-b-lg"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                              />
                            </div>
                            {mode === "signup" && (
                              <div>
                                <label htmlFor="cpassword" className="sr-only">
                                  Confirm Password
                                </label>
                                <input
                                  id="cpassword"
                                  name="cpassword"
                                  type="cpassword"
                                  autoComplete="current-cpassword"
                                  required
                                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
                                  placeholder="Confirm Password"
                                  value={confirmPassword}
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                />
                              </div>
                            )}
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-4 flex justify-center items-center w-full">
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md">
                      {error}
                    </div>
                  )}
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex flex justify-center items-center w-full flex-col">
                  {mode === "login" ? (
                    <button
                      type="button"
                      className="inline-flex w-1/2 justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 transition-all duration-300"
                      onClick={() => SignIn()}
                    >
                      Login
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inline-flex w-1/2 justify-center rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 transition-all duration-300"
                      onClick={() => Signup()}
                    >
                      Sign up
                    </button>
                  )}

                  <h1 className="my-2 text-black">Or</h1>
                  <div className="flex flex-col justify-center items-center w-full">
                    <div className="px-6 sm:px-0 max-w-sm">
                      <button
                        onClick={() => signInWithGoogle()}
                        type="button"
                        className="text-white w-full  bg-[#4285F4] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2 transition-all duration-300"
                      >
                        <svg
                          className="mr-2 -ml-1 w-4 h-4"
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fab"
                          data-icon="google"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 488 512"
                        >
                          <path
                            fill="currentColor"
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                          ></path>
                        </svg>
                        Continue with Google<div></div>
                      </button>

                      {/* Dont have an account */}

                      <div className="flex flex-row justify-center items-center w-full my-3">
                        <p className="text-sm text-gray-500">
                          {mode === "login"
                            ? "Don't have an account?"
                            : "Already have an account?"}
                        </p>
                        {mode === "login" ? (
                          <div
                            onClick={() => setMode("signup")}
                            className=" cursor-pointer text-sm text-yellow-500 ml-1 underline"
                          >
                            Sign up
                          </div>
                        ) : (
                          <div
                            onClick={() => setMode("login")}
                            className=" cursor-pointer text-sm text-yellow-500 ml-1 underline"
                          >
                            Login
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button> */}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
