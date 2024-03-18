import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error("this is page not found error -> ",error);

  return (
    <div id="error-page" className=" flex flex-col items-center justify-center h-[100vh] bg-indigo-200">
      <h1 className=" font-bold text-5xl mb-4">Oops!</h1>
      <p className=" font-bold text-3xl mb-4">Sorry, an unexpected error has occurred.</p>
      <p className=" font-bold text-3xl">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}