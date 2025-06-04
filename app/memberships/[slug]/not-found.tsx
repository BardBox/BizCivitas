
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Membership Not Found</h2>
          <p className="text-gray-600 mb-8">
            The membership plan you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/memberships"
            className="inline-block bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            View All Memberships
          </Link>
          <div>
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-800 font-medium"
            >
              Go Back Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
