import { useState, useMemo } from "react";
import { FaCalendarAlt, FaDownload, FaPlus, FaBell } from "react-icons/fa";

// Import components (these would be separate files in a real project)
import AttendanceHeader from "./AttendanceHeader";
import AttendanceStats from "./AttendanceStats";
import AttendanceFilters from "./AttendanceFilters";
import AttendanceTable from "./AttendanceTable";
import WorkerDetailsModal from "./WorkerDetailsModal";

export default function AttendanceDashboard() {
  // Workers data
  const workers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Site Supervisor",
      status: "Active",
      employeeId: "#EMP001",
      phone: "+1 (555) 123-4567",
      email: "sarah.j@company.com",
      experience: "8 years",
      projects: "3 active"
    },
    {
      id: 2,
      name: "John Doe",
      role: "Foundation Specialist",
      status: "Active",
      employeeId: "#EMP002",
      phone: "+1 (555) 234-5678",
      email: "john.doe@company.com",
      experience: "5 years",
      tasks: "2 active"
    },
    {
      id: 3,
      name: "Mike Smith",
      role: "Equipment Operator",
      status: "Inactive",
      employeeId: "#EMP003",
      phone: "+1 (555) 345-6789",
      email: "mike.smith@company.com",
      experience: "12 years",
      equipment: "Excavator #3"
    }
  ];

  // Generate attendance data
  const generateAttendanceData = () => {
    const today = new Date();
    const weekDays = [];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - today.getDay() + i);
      weekDays.push(date);
    }

    return workers.map(worker => ({
      ...worker,
      attendance: weekDays.map((date) => {
        const isToday = date.toDateString() === today.toDateString();
        const isPast = date < today;
        
        let status, checkIn, checkOut, hours, location;
        
        if (isPast) {
          const statuses = ['present', 'present', 'present', 'late', 'absent'];
          status = statuses[Math.floor(Math.random() * statuses.length)];
          
          if (status === 'present') {
            checkIn = `${8 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} AM`;
            checkOut = `${5 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} PM`;
            hours = (8 + Math.random() * 1).toFixed(1);
            location = worker.role.includes('Site') ? 'Main Site' : 'Project Site A';
          } else if (status === 'late') {
            checkIn = `${9 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} AM`;
            checkOut = `${5 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} PM`;
            hours = (7 + Math.random() * 1).toFixed(1);
            location = worker.role.includes('Site') ? 'Main Site' : 'Project Site A';
          } else {
            checkIn = null;
            checkOut = null;
            hours = '0.0';
            location = null;
          }
        } else if (isToday) {
          status = worker.status === 'Active' ? 'present' : 'absent';
          checkIn = worker.status === 'Active' ? `${8 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} AM` : null;
          checkOut = null;
          hours = worker.status === 'Active' ? (Math.random() * 4 + 2).toFixed(1) : '0.0';
          location = worker.status === 'Active' ? (worker.role.includes('Site') ? 'Main Site' : 'Project Site A') : null;
        } else {
          status = 'scheduled';
          checkIn = null;
          checkOut = null;
          hours = '0.0';
          location = null;
        }

        return {
          date: date.toISOString().split('T')[0],
          dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
          fullDate: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          status,
          checkIn,
          checkOut,
          hours: parseFloat(hours),
          location,
          notes: status === 'absent' ? 'Sick leave' : status === 'late' ? 'Traffic delay' : null
        };
      })
    }));
  };

  const [attendanceData] = useState(generateAttendanceData());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [viewMode, setViewMode] = useState("daily");

  // Filter data
  const filteredData = useMemo(() => {
    return attendanceData.filter(worker => {
      const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           worker.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           worker.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (statusFilter === "all") return matchesSearch;
      
      const todayAttendance = worker.attendance.find(a => a.date === selectedDate);
      return matchesSearch && todayAttendance?.status === statusFilter;
    });
  }, [attendanceData, searchTerm, statusFilter, selectedDate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <AttendanceHeader 
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />

        {/* Statistics */}
        <AttendanceStats 
          attendanceData={attendanceData}
          selectedDate={selectedDate}
        />

        {/* Filters */}
        <AttendanceFilters 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <AttendanceTable 
            data={filteredData}
            viewMode={viewMode}
            selectedDate={selectedDate}
            onWorkerSelect={setSelectedWorker}
          />
        </div>

        {/* Worker Details Modal */}
        {selectedWorker && (
          <WorkerDetailsModal 
            worker={selectedWorker}
            onClose={() => setSelectedWorker(null)}
          />
        )}
      </div>
    </div>
  );
}

// Header Component
function AttendanceHeader({ selectedDate, onDateChange }) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600 mt-1">Track and manage employee attendance efficiently</p>
          <p className="text-sm text-gray-500 mt-1">{today}</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <FaPlus className="w-4 h-4 mr-2" />
            Mark Attendance
          </button>
          
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FaDownload className="w-4 h-4 mr-2" />
            Export Report
          </button>
          
          <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors relative">
            <FaBell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Statistics Component
function AttendanceStats({ attendanceData, selectedDate }) {
  const stats = useMemo(() => {
    const todayData = attendanceData.map(worker => 
      worker.attendance.find(a => a.date === selectedDate)
    ).filter(Boolean);

    const present = todayData.filter(a => a.status === 'present').length;
    const late = todayData.filter(a => a.status === 'late').length;
    const absent = todayData.filter(a => a.status === 'absent').length;
    const total = attendanceData.length;
    const attendanceRate = total > 0 ? ((present + late) / total * 100).toFixed(1) : 0;

    return { present, late, absent, total, attendanceRate };
  }, [attendanceData, selectedDate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Employees</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-xl">👥</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Present</p>
            <p className="text-2xl font-bold text-green-600">{stats.present}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-green-600 text-xl">✓</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Late</p>
            <p className="text-2xl font-bold text-orange-600">{stats.late}</p>
          </div>
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <span className="text-orange-600 text-xl">⏰</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Absent</p>
            <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <span className="text-red-600 text-xl">✗</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
            <p className="text-2xl font-bold text-blue-600">{stats.attendanceRate}%</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <span className="text-blue-600 text-xl">📊</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Filters Component
function AttendanceFilters({ 
  searchTerm, 
  onSearchChange, 
  statusFilter, 
  onStatusFilterChange, 
  viewMode, 
  onViewModeChange 
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => onStatusFilterChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="present">Present</option>
            <option value="late">Late</option>
            <option value="absent">Absent</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">View:</span>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['daily', 'weekly'].map((mode) => (
              <button
                key={mode}
                onClick={() => onViewModeChange(mode)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  viewMode === mode
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Table Component
function AttendanceTable({ data, viewMode, selectedDate, onWorkerSelect }) {
  const getStatusBadge = (status) => {
    const badges = {
      present: 'bg-green-100 text-green-800',
      late: 'bg-orange-100 text-orange-800',
      absent: 'bg-red-100 text-red-800',
      scheduled: 'bg-gray-100 text-gray-800'
    };
    
    return badges[status] || badges.scheduled;
  };

  if (viewMode === 'daily') {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((worker) => {
              const todayAttendance = worker.attendance.find(a => a.date === selectedDate);
              return (
                <tr key={worker.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-medium text-sm">
                          {worker.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{worker.name}</div>
                        <div className="text-sm text-gray-500">{worker.role}</div>
                        <div className="text-xs text-gray-400">{worker.employeeId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(todayAttendance?.status)}`}>
                      {todayAttendance?.status?.charAt(0).toUpperCase() + todayAttendance?.status?.slice(1) || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {todayAttendance?.checkIn || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {todayAttendance?.checkOut || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {todayAttendance?.hours || '0.0'}h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {todayAttendance?.location || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => onWorkerSelect(worker)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  // Weekly view
  const weekDays = data[0]?.attendance?.slice(0, 7) || [];
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-gray-50 z-10">Employee</th>
            {weekDays.map((day, index) => (
              <th key={index} className="px-3 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">
                <div>{day.dayName}</div>
                <div className="font-normal text-gray-400">{day.fullDate}</div>
              </th>
            ))}
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((worker) => (
            <tr key={worker.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white z-10">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-xs">
                      {worker.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-gray-900">{worker.name}</div>
                    <div className="text-xs text-gray-500">{worker.role}</div>
                  </div>
                </div>
              </td>
              {worker.attendance.slice(0, 7).map((attendance, index) => (
                <td key={index} className="px-3 py-4 text-center">
                  <div className="space-y-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(attendance.status)}`}>
                      {attendance.status?.charAt(0).toUpperCase() + attendance.status?.slice(1) || 'N/A'}
                    </span>
                    {attendance.checkIn && (
                      <div className="text-xs text-gray-500">{attendance.checkIn}</div>
                    )}
                    {attendance.hours > 0 && (
                      <div className="text-xs font-medium text-gray-900">{attendance.hours}h</div>
                    )}
                  </div>
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onWorkerSelect(worker)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Worker Details Modal
function WorkerDetailsModal({ worker, onClose }) {
  const weekStats = useMemo(() => {
    const weekData = worker.attendance.slice(0, 7);
    const totalHours = weekData.reduce((sum, day) => sum + day.hours, 0);
    const presentDays = weekData.filter(day => day.status === 'present' || day.status === 'late').length;
    const lateCount = weekData.filter(day => day.status === 'late').length;
    
    return { totalHours: totalHours.toFixed(1), presentDays, lateCount };
  }, [worker]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-xl">
                  {worker.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{worker.name}</h2>
                <p className="text-gray-600">{worker.role}</p>
                <p className="text-sm text-gray-500">{worker.employeeId}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">📧</span>
                  <span className="text-sm text-gray-600">{worker.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">📞</span>
                  <span className="text-sm text-gray-600">{worker.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">💼</span>
                  <span className="text-sm text-gray-600">{worker.experience}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Week Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{weekStats.totalHours}</div>
                  <div className="text-xs text-gray-500">Total Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{weekStats.presentDays}</div>
                  <div className="text-xs text-gray-500">Days Present</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{weekStats.lateCount}</div>
                  <div className="text-xs text-gray-500">Late Count</div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Attendance */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Weekly Attendance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              {worker.attendance.slice(0, 7).map((day, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900">{day.dayName}</div>
                    <div className="text-xs text-gray-500 mb-2">{day.fullDate}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      day.status === 'present' ? 'bg-green-100 text-green-800' :
                      day.status === 'late' ? 'bg-orange-100 text-orange-800' :
                      day.status === 'absent' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {day.status?.charAt(0).toUpperCase() + day.status?.slice(1)}
                    </span>
                    {day.checkIn && (
                      <div className="mt-2 space-y-1">
                        <div className="text-xs text-gray-600">
                          <span className="font-medium">In:</span> {day.checkIn}
                        </div>
                        {day.checkOut && (
                          <div className="text-xs text-gray-600">
                            <span className="font-medium">Out:</span> {day.checkOut}
                          </div>
                        )}
                        <div className="text-xs font-medium text-blue-600">
                          {day.hours}h
                        </div>
                      </div>
                    )}
                    {day.notes && (
                      <div className="mt-2 text-xs text-gray-500 italic">
                        {day.notes}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white rounded-b-2xl border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
              Edit Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}