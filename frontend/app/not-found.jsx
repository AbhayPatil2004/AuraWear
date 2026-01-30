export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-gray-900">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-lg text-gray-600">
          Page not found
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
