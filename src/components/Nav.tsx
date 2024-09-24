import { useRouter } from "next/router";
import { fetcher } from "~/lib/fetcher";

export function Nav() {
  const router = useRouter();

  const logOut = async () => {
    await fetcher("auth/logout", {}); // Included something (e.g. empty object) to make the logout request method "POST". A "GET" request to a cached resource may return a `304 not modified` response in production. https://stackoverflow.com/questions/66747845/not-being-able-to-remove-cookies-on-nextjs-in-production, https://stackoverflow.com/questions/44789233/sometimes-get-returns-304-instead-of-200
    router.push("/");
  };

  return (
    <nav className="h-16 border-b shadow-md border bg-white px-2">
      <div className="max-w-5xl m-auto h-full flex justify-between items-center">
        <div className="text-2xl font-bold">Himmeversity Dashboard</div>
        <button
          className="bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700 active:bg-red-800 rounded"
          onClick={logOut}
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}
