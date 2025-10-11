import React from 'react';
import { IssueStatus, IssuePriority, SortField, SortOrder, ISSUE_STATUSES, ISSUE_PRIORITIES, SORT_FIELDS } from '../types/issue';

interface IssueFiltersProps {
  searchTerm: string;
  statusFilter: IssueStatus | 'all';
  priorityFilter: IssuePriority | 'all';
  onSearchChange: (term: string) => void;
  onStatusChange: (status: IssueStatus | 'all') => void;
  onPriorityChange: (priority: IssuePriority | 'all') => void;
  onClearFilters: () => void;
  onSortFieldChange: (field: SortField) => void;
  onSortOrderChange: (order: SortOrder) => void;
  sortField: SortField;
  sortOrder: SortOrder;
}

export function IssueFilters({
  searchTerm,
  statusFilter,
  priorityFilter,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onClearFilters,
  onSortFieldChange,
  onSortOrderChange,
  sortField,
  sortOrder
}: IssueFiltersProps) {
  const hasActiveFilters = searchTerm || statusFilter !== 'all' || priorityFilter !== 'all';

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Search Input */}
        <div className="flex-1 min-w-64">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Issues
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by title, description, or assignee..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Status Filter */}
        <div className="min-w-32">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value as IssueStatus | 'all')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            {ISSUE_STATUSES.map(status => (
              <option key={status} value={status}>
                {status.replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div className="min-w-32">
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            id="priority"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value as IssuePriority | 'all')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            {ISSUE_PRIORITIES.map(priority => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Field */}
        <div className="min-w-32">
          <label htmlFor="sortField" className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            id="sortField"
            value={sortField}
            onChange={(e) => onSortFieldChange(e.target.value as SortField)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {SORT_FIELDS.map(field => (
              <option key={field} value={field}>
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div className="min-w-32">
          <label htmlFor="sortOrder" className="block text-sm font-medium text-gray-700 mb-1">
            Order
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
