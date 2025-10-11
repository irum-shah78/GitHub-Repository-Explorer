import React from 'react';
import { Issue } from '../types/issue';
import { getStatusBadgeClasses, getPriorityBadgeClasses, formatIssueDate } from '../types/issue';

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  return (
    <article className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <header className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 pr-4">{issue.title}</h3>
        <div className="flex space-x-2 flex-shrink-0">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(issue.status)}`}>
            {issue.status.replace('-', ' ')}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadgeClasses(issue.priority)}`}>
            {issue.priority}
          </span>
        </div>
      </header>
      
      <p className="text-gray-600 mb-4 line-clamp-3">{issue.description}</p>
      
      <footer className="flex justify-between items-center text-sm text-gray-500">
        <span className="font-medium">Assigned to: {issue.assignee}</span>
        <time dateTime={issue.createdDate}>
          Created: {formatIssueDate(issue.createdDate)}
        </time>
      </footer>
    </article>
  );
}
