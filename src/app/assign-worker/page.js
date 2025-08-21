"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import workersData from "@/data/workers.json";
import Image from "next/image";


export default function AssignWorkerPage() {
  const [selectedWorkers, setSelectedWorkers] = useState([]);
  const [hours, setHours] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const router = useRouter();

  const handleCheckboxChange = (id) => {
    setSelectedWorkers((prev) =>
      prev.includes(id)
        ? prev.filter((w) => w !== id)
        : [...prev, id]
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDetails = workersData.filter((w) =>
      selectedWorkers.includes(w.id.toString())
    );
    console.log({
      selectedWorkers: selectedDetails,
      hours,
      image,
    });
    router.push("/taskDetails/0");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Assign Workers</h2>
            <button 
              onClick={() => router.back()}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Worker Selection */}
            <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Select Workers</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {workersData.map((worker) => (
                  <label
                    key={worker.id}
                    className={`flex items-start p-3 rounded-lg cursor-pointer transition-all ${selectedWorkers.includes(worker.id.toString()) 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'bg-white border border-gray-200 hover:bg-gray-50'}`}
                  >
                    <input
                      type="checkbox"
                      value={worker.id}
                      checked={selectedWorkers.includes(worker.id.toString())}
                      onChange={() => handleCheckboxChange(worker.id.toString())}
                      className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">{worker.name}</p>
                      <p className="text-sm text-gray-500">{worker.role}</p>
                      {worker.skills && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {worker.skills.map((skill, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Hours Input */}
            <div>
              <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
                Hours Logged
              </label>
              <input
                type="number"
                id="hours"
                placeholder="Enter hours worked"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                required
                min="0"
                step="0.5"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Proof of Work
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  {preview ? (
                    <div className="flex flex-col items-center">
                     <Image
  src={preview}
  alt="Preview"
  width={128}
  height={128}
  className="w-32 h-32 object-cover rounded-md mb-4"
/>

                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          setImage(null);
                        }}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Remove Image
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 bg-blue-600 border border-transparent rounded-lg shadow-sm text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                disabled={selectedWorkers.length === 0}
              >
                Assign Workers
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}