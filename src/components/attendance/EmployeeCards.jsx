// components/attendance/EmployeeCards.js
import { useState } from 'react';
import EmployeeDetailsModal from './EmployeeDetailsModal';

export default function EmployeeCards({ workers, selectedDate }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusForDate = (worker, date) => {
    const record = worker.attendance.find(a => a.date === date);
    return record ? record.status : 'not-recorded';
  };

  const statusConfig = {
    present: {
      color: 'bg-green-50 border-green-200',
      text: 'text-green-700',
      icon: (
        <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Present'
    },
    absent: {
      color: 'bg-red-50 border-red-200',
      text: 'text-red-700',
      icon: (
        <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      ),
      label: 'Absent'
    },
    late: {
      color: 'bg-amber-50 border-amber-200',
      text: 'text-amber-700',
      icon: (
        <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Late'
    },
    'not-recorded': {
      color: 'bg-gray-50 border-gray-200',
      text: 'text-gray-700',
      icon: (
        <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: 'Not Recorded'
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRandomColor = (id) => {
    const colors = [
      'bg-blue-500', 'bg-indigo-500', 'bg-purple-500', 
      'bg-pink-500', 'bg-rose-500', 'bg-amber-500', 
      'bg-cyan-500', 'bg-emerald-500'
    ];
    return colors[id % colors.length];
  };

  const handleViewDetails = (worker) => {
    setSelectedEmployee(worker);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  // Function to export the report as CSV
  const exportReport = () => {
    // Create CSV content
    const headers = ['Name', 'Employee ID', 'Role', 'Status', 'Phone', 'Email', 'Experience'];
    const csvContent = [
      headers.join(','),
      ...workers.map(worker => {
        const status = getStatusForDate(worker, selectedDate);
        const statusLabel = statusConfig[status].label;
        
        return [
          `"${worker.name}"`,
          worker.employeeId,
          `"${worker.role}"`,
          statusLabel,
          worker.phone,
          worker.email,
          worker.experience
        ].join(',');
      })
    ].join('\n');

    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `attendance-report-${selectedDate}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Team Overview</h2>
          <span className="text-sm text-gray-500 bg-gray-100 rounded-full px-3 py-1">
            {selectedDate}
          </span>
        </div>
        
        <div className="space-y-5">
          {workers.map(worker => {
            const status = getStatusForDate(worker, selectedDate);
            const statusInfo = statusConfig[status];
            
            return (
              <div key={worker.id} className="border border-gray-100 rounded-xl p-5 transition-all duration-200 hover:shadow-md hover:border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`h-14 w-14 ${getRandomColor(worker.id)} rounded-full flex items-center justify-center text-white font-semibold text-lg`}>
                      {getInitials(worker.name)}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">{worker.name}</h3>
                      <p className="text-sm text-gray-600">{worker.role}</p>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 rounded-md px-2 py-0.5 mt-1 inline-block">
                        {worker.employeeId}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-full border ${statusInfo.color} ${statusInfo.text}`}>
                    {statusInfo.icon}
                    <span className="ml-1.5 text-sm font-medium capitalize">{statusInfo.label}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm border-t border-gray-100 pt-4">
                  <div className="flex items-center text-gray-600">
                    <div className="bg-blue-100 p-2 rounded-lg mr-2">
                      <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="font-medium">{worker.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <div className="bg-purple-100 p-2 rounded-lg mr-2">
                      <svg className="h-4 w-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <span className="truncate font-medium">{worker.email}</span>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center">
                    <svg className="h-3.5 w-3.5 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{worker.experience} experience</span>
                  </div>
                  {worker.projects && (
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                      {worker.projects}
                    </span>
                  )}
                  {worker.tasks && (
                    <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded-md">
                      {worker.tasks}
                    </span>
                  )}
                  {worker.equipment && (
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md">
                      {worker.equipment}
                    </span>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button 
                    onClick={() => handleViewDetails(worker)}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    View full details
                    <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 pt-5 border-t border-gray-100 flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {workers.length} of {workers.length} employees
          </p>
          <button 
            onClick={exportReport}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
          >
            Export report
            <svg className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>

      <EmployeeDetailsModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        employee={selectedEmployee}
        selectedDate={selectedDate}
      />
    </>
  );
}