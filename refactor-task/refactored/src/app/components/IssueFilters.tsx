'use client';

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
    <div className="bg-white border rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Search Input */}
        <div className="flex-1 min-w-64">
          <label htmlFor="search">
            Search Issues
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search by title, description, or assignee..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="min-w-32">
          <label htmlFor="status">
            Status
          </label>
          <select
            id="status"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value as IssueStatus | 'all')}
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
          <label htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value as IssuePriority | 'all')}
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
          <label htmlFor="sortField">
            Sort By
          </label>
          <select
            id="sortField"
            value={sortField}
            onChange={(e) => onSortFieldChange(e.target.value as SortField)}
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
          <label htmlFor="sortOrder">
            Order
          </label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
