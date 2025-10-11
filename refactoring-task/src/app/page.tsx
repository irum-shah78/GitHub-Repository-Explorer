import React, { useState, useEffect } from 'react';
import issuesData from './constants/issues.json';

const issues = issuesData as Issue[];

interface Issue {
  id: number;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  createdDate: string;
  description: string;
}

export default function Home() {
  const [allIssues, setAllIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAllIssues(issues);
      setFilteredIssues(issues);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = allIssues;

    if (searchTerm) {
      filtered = filtered.filter(issue => 
        issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        issue.assignee.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(issue => issue.priority === priorityFilter);
    }

    filtered.sort((a, b) => {
      let aValue, bValue;
      
      if (sortBy === 'title') {
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
      } else if (sortBy === 'status') {
        aValue = a.status.toLowerCase();
        bValue = b.status.toLowerCase();
      } else if (sortBy === 'priority') {
        const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        aValue = priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
        bValue = priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
      } else if (sortBy === 'assignee') {
        aValue = a.assignee.toLowerCase();
        bValue = b.assignee.toLowerCase();
      } else if (sortBy === 'createdDate') {
        aValue = new Date(a.createdDate).getTime();
        bValue = new Date(b.createdDate).getTime();
      } else {
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredIssues(filtered);
  }, [allIssues, searchTerm, statusFilter, priorityFilter, sortBy, sortOrder]);

  const getStatusColor = (status: string) => {
    if (status === 'open') return 'bg-green-100 text-green-800';
    if (status === 'in-progress') return 'bg-yellow-100 text-yellow-800';
    if (status === 'closed') return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'bg-red-100 text-red-800';
    if (priority === 'medium') return 'bg-yellow-100 text-yellow-800';
    if (priority === 'low') return 'bg-green-100 text-green-800';
    return 'bg-gray-100 text-gray-800';
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatusFilter(e.target.value);
  };

  const handlePriorityFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriorityFilter(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Issue Tracker</h1>
      
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search issues..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          
          <select
            value={priorityFilter}
            onChange={handlePriorityFilterChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          
          <select
            value={sortBy}
            onChange={handleSortChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="title">Sort by Title</option>
            <option value="status">Sort by Status</option>
            <option value="priority">Sort by Priority</option>
            <option value="assignee">Sort by Assignee</option>
            <option value="createdDate">Sort by Date</option>
          </select>
          
          <select
            value={sortOrder}
            onChange={handleSortOrderChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredIssues.length} of {allIssues.length} issues
        </p>
      </div>

      <div className="space-y-4">
        {filteredIssues.map(issue => (
          <div key={issue.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
              <div className="flex space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                  {issue.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
                  {issue.priority}
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-3">{issue.description}</p>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Assigned to: {issue.assignee}</span>
              <span>Created: {new Date(issue.createdDate).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredIssues.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No issues found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
