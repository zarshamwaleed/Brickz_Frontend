// components/AddEventPage.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaClock, 
  FaTag, 
  FaAlignLeft,
  FaCheckCircle,
  FaPlayCircle,
  FaClock as FaUpcoming
} from "react-icons/fa";

export default function AddEventPage({ task, onAddEvent, onCancel }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    label: "",
    date: "",
    time: "",
    status: "upcoming",
    description: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
if (!formData.label || !formData.date) {
  Swal.fire({
    icon: 'warning',
    title: 'Oops!',
    text: 'Please fill in all required fields',
    confirmButtonColor: '#3085d6',
    confirmButtonText: 'OK'
  });
  return;
}
    const newEvent = {
      label: formData.label,
      date: `${formData.date}${formData.time ? ` - ${formData.time}` : ''}`,
      status: formData.status,
      description: formData.description
    };

    // Call the callback function to add the event
    if (onAddEvent) {
      onAddEvent(newEvent);
    }
    
    // Redirect back or close the modal
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={onCancel || (() => router.back())}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FaArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Add New Event</h1>
              <p className="text-sm text-gray-600">Add a milestone to the project timeline</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Title */}
          <div>
            <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-2">
              Event Title *
            </label>
            <input
              type="text"
              id="label"
              name="label"
              value={formData.label}
              onChange={handleChange}
              placeholder="e.g., Foundation Completed, Inspection Scheduled"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                Time (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaClock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="time"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: "completed", label: "Completed", icon: FaCheckCircle, color: "green" },
                { value: "in-progress", label: "In Progress", icon: FaPlayCircle, color: "blue" },
                { value: "upcoming", label: "Upcoming", icon: FaUpcoming, color: "gray" }
              ].map((status) => {
                const Icon = status.icon;
                return (
                  <label
                    key={status.value}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.status === status.value
                        ? `bg-${status.color}-100 border-${status.color}-300 ring-2 ring-${status.color}-200`
                        : "bg-white border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={status.value}
                      checked={formData.status === status.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <Icon className={`w-4 h-4 mr-2 text-${status.color}-500`} />
                    <span className="text-sm font-medium">{status.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3 pointer-events-none">
                <FaAlignLeft className="h-4 w-4 text-gray-400" />
              </div>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the event details, milestones, or important notes..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel || (() => router.back())}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 border border-transparent rounded-lg shadow-sm text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}