import { FaCheckCircle, FaClock, FaCircle, FaChartBar } from "react-icons/fa";

export default function ProgressOverview({ task }) {
  const completed = task.subtasks.filter(s => s.done).length;
  const inProgress = task.subtasks.filter(s => s.inProgress).length;
  const notStarted = task.subtasks.length - completed - inProgress;
  const percentage = Math.round((completed / task.subtasks.length) * 100);

  // Calculate progress colors based on percentage
  const getProgressColor = (percent) => {
    if (percent >= 90) return "bg-green-500";
    if (percent >= 70) return "bg-teal-500";
    if (percent >= 50) return "bg-blue-500";
    if (percent >= 30) return "bg-yellow-500";
    if (percent >= 10) return "bg-orange-500";
    return "bg-red-500";
  };

  const progressColor = getProgressColor(percentage);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-50 rounded-lg">
          <FaChartBar className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Progress Overview</h3>
          <p className="text-sm text-gray-500">Task completion tracking</p>
        </div>
      </div>

      {/* Main Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm font-bold text-gray-900">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${progressColor}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500">
          {completed} of {task.subtasks.length} subtasks completed
        </p>
      </div>

      {/* Progress Statistics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-2">
            <FaCheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-700">{completed}</div>
          <div className="text-xs text-green-600">Completed</div>
        </div>

        <div className="text-center p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2">
            <FaClock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-700">{inProgress}</div>
          <div className="text-xs text-blue-600">In Progress</div>
        </div>

        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mx-auto mb-2">
            <FaCircle className="w-4 h-4 text-gray-500" />
          </div>
          <div className="text-2xl font-bold text-gray-700">{notStarted}</div>
          <div className="text-xs text-gray-600">Not Started</div>
        </div>
      </div>

      {/* Detailed Progress Breakdown */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Subtask Breakdown</h4>
        <div className="space-y-3">
          {task.subtasks.map((subtask, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  subtask.done ? 'bg-green-500' :
                  subtask.inProgress ? 'bg-blue-500' : 'bg-gray-300'
                }`} />
                <span className={`text-sm ${
                  subtask.done ? 'text-green-700 line-through' :
                  subtask.inProgress ? 'text-blue-700' : 'text-gray-600'
                }`}>
                  {subtask.name}
                </span>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                subtask.done ? 'bg-green-100 text-green-700' :
                subtask.inProgress ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
              }`}>
                {subtask.done ? 'Done' : subtask.inProgress ? 'In Progress' : 'Not Started'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Message */}
      {task.subtasks.length > 0 && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            {percentage === 100 ? '🎉 Task completed!' :
             percentage >= 70 ? 'Great progress! Almost there!' :
             percentage >= 40 ? 'Good work! Keep it up!' :
             percentage >= 10 ? 'Getting started! You can do it!' :
             "Let's get this task moving!"}
          </p>
        </div>
      )}
    </div>
  );
}