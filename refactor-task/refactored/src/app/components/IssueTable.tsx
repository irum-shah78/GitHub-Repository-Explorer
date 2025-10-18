import React from 'react';
import { Issue, SortField, SortOrder } from '../types/issue';
import { getStatusBadgeClasses, getPriorityBadgeClasses, formatIssueDate } from '../types/issue';

interface IssueTableProps {
  issues: Issue[];
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

const TABLE_COLUMNS: Array<{ key: SortField; label: string; sortable: boolean }> = [
  { key: 'title', label: 'Title', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'priority', label: 'Priority', sortable: true },
  { key: 'assignee', label: 'Assignee', sortable: true },
  { key: 'createdDate', label: 'Created Date', sortable: true }
];

export function IssueTable({ issues, sortField, sortOrder, onSort }: IssueTableProps) {
  const handleColumnClick = (field: SortField) => {
    onSort(field);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return (
      <span className="ml-1 text-blue-600">
        {sortOrder === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  if (issues.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-2">
          <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No issues found</h3>
        <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            {TABLE_COLUMNS.map(({ key, label, sortable }) => (
              <th
                key={key}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                  sortable ? 'cursor-pointer hover:bg-gray-100' : ''
                }`}
                onClick={() => sortable && handleColumnClick(key)}
              >
                <div className="flex items-center">
                  <span>{label}</span>
                  {getSortIcon(key)}
                </div>
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {issues.map((issue) => (
            <tr key={issue.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                #{issue.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                {issue.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClasses(issue.status)}`}>
                  {issue.status.replace('-', ' ')}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityBadgeClasses(issue.priority)}`}>
                  {issue.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {issue.assignee}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <time dateTime={issue.createdDate}>
                  {formatIssueDate(issue.createdDate)}
                </time>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                <p className="truncate" title={issue.description}>
                  {issue.description}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
