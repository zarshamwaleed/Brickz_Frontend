// components/attendance/DateSelector.js
export default function DateSelector({ selectedDate, setSelectedDate, view, setView }) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <h2 className="text-lg font-semibold text-gray-900">Select Date</h2>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setView('daily')}
            className={`px-4 py-2 rounded-md ${
              view === 'daily' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Daily View
          </button>
          <button
            onClick={() => setView('weekly')}
            className={`px-4 py-2 rounded-md ${
              view === 'weekly' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Weekly View
          </button>
        </div>
      </div>
    </div>
  );
}