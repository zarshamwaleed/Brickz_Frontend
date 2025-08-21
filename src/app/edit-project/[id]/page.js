"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "lucide-react";
import { projects, statusStyles } from "@/data/projects";
import Swal from "sweetalert2";
export default function EditProjectPage() {
  const router = useRouter();
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));
  const datePickerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    status: "Planning",
    description: "",
    budget: "",
    deadline: new Date(),
    team: "",
    progress: 0,
    client: "",
    location: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        status: project.status,
        description: project.description,
        budget: project.budget,
        deadline: new Date(project.deadline),
        team: project.team,
        progress: project.progress,
        client: project.client || "",
        location: project.location || "",
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Project name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.budget.trim()) newErrors.budget = "Budget is required";
    if (!formData.team.trim()) newErrors.team = "Team information is required";
    if (!formData.client.trim()) newErrors.client = "Client name is required";
    if (formData.budget && !/^\$?[0-9,]+(\.\d{1,2})?[KMB]?$/.test(formData.budget)) {
      newErrors.budget = "Please enter a valid budget format (e.g., $1.5M or 1500000)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const updatedProject = {
      ...formData,
      id: parseInt(id),
      deadline: formData.deadline.toDateString(),
    };

    console.log("Updated Project:", updatedProject);

    // SweetAlert success message
    await Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Project updated successfully!',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK'
    });

    router.push("/projects");
  } catch (error) {
    console.error("Error updating project:", error);

    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'There was an error updating the project. Please try again.',
      confirmButtonColor: '#d33',
      confirmButtonText: 'OK'
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const statusOptions = [
    { value: "Planning", label: "Planning", color: "bg-blue-500" },
    { value: "Active", label: "Active", color: "bg-green-500" },
    { value: "At Risk", label: "At Risk", color: "bg-yellow-500" },
    { value: "On Hold", label: "On Hold", color: "bg-gray-500" },
  ];

  if (!project) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Project Not Found</h1>
          <p className="text-gray-600 mb-6">The project you are looking for does not exist.</p>
          <button
            onClick={() => router.push("/projects")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-200"
          >
            Back to Projects
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Projects
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Edit Project</h1>
          <p className="text-gray-600 mt-2">Update the details for {project.name}</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g., Downtown Office Complex"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 focus:outline-none transition ${
                    errors.name ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  }`}
                  required
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition ${statusStyles[formData.status]?.badge || "border-gray-300"}`}
                  >
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="progress" className="block text-sm font-medium text-gray-700 mb-1">
                    Progress ({formData.progress}%)
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      id="progress"
                      name="progress"
                      type="range"
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={handleChange}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-sm font-medium text-gray-700 w-10">{formData.progress}%</span>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe the project scope, objectives, and key details..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 focus:outline-none transition ${
                    errors.description ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                  }`}
                  required
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                    Budget *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      id="budget"
                      name="budget"
                      type="text"
                      placeholder="2.5M"
                      value={formData.budget}
                      onChange={handleChange}
                      className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 focus:outline-none transition ${
                        errors.budget ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                      }`}
                      required
                    />
                  </div>
                  {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
                  <p className="mt-1 text-xs text-gray-500">Examples: $2.5M, 1500000, 750K</p>
                </div>
                <div>
                  <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1">
                    Team Size *
                  </label>
                  <input
                    id="team"
                    name="team"
                    type="text"
                    placeholder="e.g., 12 workers"
                    value={formData.team}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 focus:outline-none transition ${
                      errors.team ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                    required
                  />
                  {errors.team && <p className="mt-1 text-sm text-red-600">{errors.team}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
                    Client Name *
                  </label>
                  <input
                    id="client"
                    name="client"
                    type="text"
                    placeholder="e.g., ABC Corporation"
                    value={formData.client}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-blue-500 focus:outline-none transition ${
                      errors.client ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"
                    }`}
                    required
                  />
                  {errors.client && <p className="mt-1 text-sm text-red-600">{errors.client}</p>}
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    placeholder="e.g., New York, NY"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                  Deadline *
                </label>
                <div className="relative">
                  <input
                    id="deadline"
                    type="text"
                    value={formData.deadline.toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    onClick={() => setIsCalendarOpen(true)}
                    readOnly
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCalendarOpen(true)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    aria-label="Open calendar"
                  >
                    <Calendar size={20} />
                  </button>
                  <DatePicker
                    selected={formData.deadline}
                    onChange={(date) => {
                      setFormData({ ...formData, deadline: date });
                      setIsCalendarOpen(false);
                    }}
                    onClickOutside={() => setIsCalendarOpen(false)}
                    open={isCalendarOpen}
                    ref={datePickerRef}
                    minDate={new Date()}
                    dateFormat="MMMM d, yyyy"
                    popperPlacement="bottom-start"
                    className="hidden"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Selected: {formData.deadline.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => router.push("/projects")}
                  className="mt-3 sm:mt-0 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center disabled:opacity-75 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Updating...
                    </>
                  ) : (
                    "Update Project"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}