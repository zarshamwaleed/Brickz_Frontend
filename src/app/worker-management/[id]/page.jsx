// app/worker-management/[id]/page.jsx
import { notFound } from "next/navigation";
import Link from "next/link";
import workersData from "@/data/workers.json";
import placeholderImg from "@/assets/profilebgRemove.png";

export default function WorkerDetails({ params }) {
  const worker = workersData.find((w) => w.id.toString() === params.id);

  if (!worker) return notFound();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/worker-management"
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Workers
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Worker Details</h1>
        </div>

        <div className="bg-white shadow rounded-xl overflow-hidden">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center">
              <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-6">
                <div className="relative">
                  <img
                    src={worker.image || placeholderImg.src}
                    alt={worker.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <span className={`absolute bottom-2 right-2 block h-5 w-5 rounded-full ring-2 ring-white ${
                    worker.status === "Active" ? "bg-green-400" : "bg-red-400"
                  }`} />
                </div>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{worker.name}</h2>
                    <p className="text-lg text-gray-600">{worker.role}</p>
                  </div>
                  <span className={`mt-2 md:mt-0 px-3 py-1 text-sm font-medium rounded-full ${
                    worker.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {worker.status}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Employee Information</h3>
                      <dl className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <dt className="text-sm font-medium text-gray-500 w-32">Employee ID</dt>
                          <dd className="text-sm text-gray-900">{worker.employeeId}</dd>
                        </div>
                        <div className="flex items-center">
                          <dt className="text-sm font-medium text-gray-500 w-32">Experience</dt>
                          <dd className="text-sm text-gray-900">{worker.experience} years</dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Contact Information</h3>
                      <dl className="mt-2 space-y-2">
                        <div className="flex items-center">
                          <dt className="text-sm font-medium text-gray-500 w-32">Email</dt>
                          <dd className="text-sm text-gray-900">{worker.email}</dd>
                        </div>
                        <div className="flex items-center">
                          <dt className="text-sm font-medium text-gray-500 w-32">Phone</dt>
                          <dd className="text-sm text-gray-900">{worker.phone}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>

                {worker.skills && worker.skills.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">Skills & Licenses</h3>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(worker.skills) ? (
                        worker.skills.map((skill, index) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {worker.skills}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <Link
                    href={`/worker-management/${worker.id}/edit`}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Worker
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}