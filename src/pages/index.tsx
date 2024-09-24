import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import { fetcher } from "~/lib/fetcher";
import { SEO } from "~/components/SEO";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const user = await fetcher("auth/login", { password });
    if (user.status === 200) {
      router.push("/dashboard");
    } else {
      setIsLoading(false);
      window.alert("Incorrect password");
    }
  };

  return (
    <>
      <SEO />
      <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col justify-center">
        <div className="mt-6 mx-auto w-full max-w-md py-8 px-6 bg-white border rounded-lg shadow-md space-y-4">
          <div className="flex items-center">
            
            <Image
              src="/img/himme-logo.png"
              alt="logo"
              width="250px"
              height="250px"
            />
            <Image
              src="/img/logopkpm.png"
              alt="logo"
              width="250px"
              height="250px"
            />
          </div>

          <div className="mx-auto w-full max-w-md">
            <div className="text-2xl font-bold text-center">Himmeversity Dashboard</div>
          </div>

          <form
            onSubmit={(e) => {
              if (password !== "") setIsLoading((state) => !state);
              handleSubmit(e);
            }}
            className="flex flex-col"
            method="POST"
          >
            <label className="text-base font-medium">
              Enter Master Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 mb-4 border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              required
            />

            <button
              type="submit"
              className={`flex justify-center items-center bg-blue-600 text-white px-4 py-2 rounded font-semibold enabled:hover:bg-blue-700 enabled:active:bg-blue-800 disabled:bg-opacity-60 disabled:cursor-not-allowed`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
