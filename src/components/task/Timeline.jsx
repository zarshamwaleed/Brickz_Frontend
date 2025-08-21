// components/Timeline.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  FaClock, 
  FaPlus, 
  FaCheckCircle, 
  FaPlayCircle, 
  FaCalendarAlt,
  FaEdit,
  FaTrash
} from "react-icons/fa";
import AddEventPage from "../AddEventPage";

export default function Timeline({ task }) {
  const router = useRouter();
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [timeline, setTimeline] = useState(
    task.timeline && task.timeline.length > 0 
      ? task.timeline 
      : [
          { 
            label: "Task Created", 
            date: "Nov 15, 2024 - 9:00 AM",
            status: "completed",
            description: "Task was created and added to the project"
          },
          { 
            label: "Workers Assigned", 
            date: "Nov 15, 2024 - 10:30 AM",
            status: "completed",
            description: "3 team members were assigned to this task"
          },
          { 
            label: "Work Started", 
            date: "Nov 18, 2024 - 8:00 AM",
            status: "completed",
            description: "Construction work began on site"
          },
          { 
            label: "Phase 2 In Progress", 
            date: "Nov 23, 2024 - 8:00 AM",
            status: "in-progress",
            description: "Foundation work completed, moving to framing"
          },
          { 
            label: "Quality Inspection", 
            date: "Nov 30, 2024 - 10:00 AM",
            status: "upcoming",
            description: "Scheduled quality control inspection"
          }
        ]
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <FaCheckCircle className="w-4 h-4 text-green-500" />;
      case "in-progress":
        return <FaPlayCircle className="w-4 h-4 text-blue-500 animate-pulse" />;
      case "upcoming":
        return <FaClock className="w-4 h-4 text-gray-400" />;
      default:
        return <FaClock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "upcoming":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const toggleEvent = (index) => {
    setExpandedEvent(expandedEvent === index ? null : index);
  };

  const handleAddEvent = (newEvent) => {
    setTimeline([...timeline, newEvent]);
    setShowAddEvent(false);
  };

  const handleEditEvent = (index, updatedEvent) => {
    const updatedTimeline = [...timeline];
    updatedTimeline[index] = updatedEvent;
    setTimeline(updatedTimeline);
  };

  const handleDeleteEvent = (index) => {
    if (confirm("Are you sure you want to delete this event?")) {
      const updatedTimeline = timeline.filter((_, i) => i !== index);
      setTimeline(updatedTimeline);
    }
  };

  if (showAddEvent) {
    return (
      <AddEventPage 
        task={task} 
        onAddEvent={handleAddEvent}
        onCancel={() => setShowAddEvent(false)}
      />
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Project Timeline</h3>
          <p className="text-sm text-gray-500 mt-1">Track progress and milestones</p>
        </div>
        <button 
          onClick={() => setShowAddEvent(true)}
          className="flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <FaPlus className="w-4 h-4 mr-1" />
          Add Event
        </button>
      </div>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-gray-200"></div>
        
        <ul className="space-y-6">
          {timeline.map((event, index) => (
            <li key={index} className="relative">
              {/* Connector line between events */}
              {index !== timeline.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-200"></div>
              )}
              
              <div className="flex items-start gap-4">
                {/* Icon container */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    event.status === "completed" ? "bg-green-100" :
                    event.status === "in-progress" ? "bg-blue-100" : "bg-gray-100"
                  }`}>
                    {getStatusIcon(event.status)}
                  </div>
                </div>

                {/* Event content */}
                <div 
                  className={`flex-1 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer ${
                    expandedEvent === index ? 'ring-2 ring-blue-200' : ''
                  }`}
                  onClick={() => toggleEvent(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-gray-900">{event.label}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                          {event.status?.replace("-", " ") || "upcoming"}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <FaCalendarAlt className="w-3.5 h-3.5 mr-1.5 text-gray-400" />
                        <span>{event.date}</span>
                      </div>

                      {expandedEvent === index && event.description && (
                        <div className="mt-2 p-3 bg-white rounded-md border border-gray-200">
                          <p className="text-sm text-gray-600">{event.description}</p>
                          <div className="flex gap-2 mt-3">
                            <button className="flex items-center px-2 py-1 text-xs text-blue-600 hover:bg-blue-50 rounded">
                              <FaEdit className="w-3 h-3 mr-1" />
                              Edit
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteEvent(index);
                              }}
                              className="flex items-center px-2 py-1 text-xs text-red-600 hover:bg-red-50 rounded"
                            >
                              <FaTrash className="w-3 h-3 mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {event.description && (
                      <div className="flex-shrink-0 ml-2">
                        <div className={`w-2 h-2 rounded-full ${
                          expandedEvent === index ? 'bg-blue-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Timeline summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">
              {timeline.filter(e => e.status === "completed").length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">
              {timeline.filter(e => e.status === "in-progress").length}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-600">
              {timeline.filter(e => e.status === "upcoming").length}
            </div>
            <div className="text-sm text-gray-600">Upcoming</div>
          </div>
        </div>
      </div>
    </div>
  );
}