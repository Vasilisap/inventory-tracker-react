import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900">
      <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-slate-50">
        404
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-4">
        Oops, that page doesn&apos;t exist.
      </p>
      <Link
        to="/dashboard"
        className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 dark:text-slate-100 text-sm"
      >
        Go to dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
