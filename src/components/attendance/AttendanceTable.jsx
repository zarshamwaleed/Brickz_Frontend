// components/attendance/AttendanceTable.js
export default function AttendanceTable({ workers, selectedDate }) {
  const getRecordForDate = (worker, date) => {
    return worker.attendance.find(a => a.date === date) || { status: 'not-recorded' };
  };

  const statusColors = {
    present: 'bg-green-100 text-green-800',
    absent: 'bg-red-100 text-red-800',
    late: 'bg-yellow-100 text-yellow-800',
    'not-recorded': 'bg-gray-100 text-gray-800'
  };

  const handleStatusChange = (workerId, newStatus) => {
    // In a real app, this would update the database via an API call
    console.log(`Updating worker ${workerId} status to ${newStatus} for date ${selectedDate}`);
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Attendance for {selectedDate}</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Check In/Out
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {workers.map(worker => {
              const record = getRecordForDate(worker, selectedDate);
              
              return (
                <tr key={worker.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {worker.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{worker.name}</div>
                        <div className="text-sm text-gray-500">{worker.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{worker.role}</div>
                    <div className="text-sm text-gray-500">{worker.experience}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${statusColors[record.status]}`}>
                      {record.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.checkIn ? (
                      <div>
                        <span className="text-gray-900">In: {record.checkIn}</span>
                        {record.checkOut && <span className="ml-2 text-gray-900">Out: {record.checkOut}</span>}
                      </div>
                    ) : (
                      <span className="text-gray-400">No record</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleStatusChange(worker.id, 'present')}
                        className="text-green-600 hover:text-green-900"
                      >
                        Present
                      </button>
                      <button
                        onClick={() => handleStatusChange(worker.id, 'absent')}
                        className="text-red-600 hover:text-red-900"
                      >
                        Absent
                      </button>
                      <button
                        onClick={() => handleStatusChange(worker.id, 'late')}
                        className="text-yellow-600 hover:text-yellow-900"
                      >
                        Late
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}