'use client';

import React from 'react';
import { Issue } from '../types/issue';
import { getStatusBadgeClasses, getPriorityBadgeClasses, formatIssueDate } from '../types/issue';

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'open': return 'badge badge-open';
      case 'in-progress': return 'badge badge-in-progress';
      case 'closed': return 'badge badge-closed';
      default: return 'badge';
    }
  };

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'high': return 'badge badge-high';
      case 'medium': return 'badge badge-medium';
      case 'low': return 'badge badge-low';
      default: return 'badge';
    }
  };

  return (
    <article className="issue-card">
      <header className="issue-header">
        <h3 className="issue-title">{issue.title}</h3>
        <div className="badges">
          <span className={getStatusBadgeClass(issue.status)}>
            {issue.status.replace('-', ' ')}
          </span>
          <span className={getPriorityBadgeClass(issue.priority)}>
            {issue.priority}
          </span>
        </div>
      </header>
      
      <p className="issue-description">{issue.description}</p>
      
      <footer className="issue-footer">
        <span className="issue-assignee">Assigned to: {issue.assignee}</span>
        <time dateTime={issue.createdDate}>
          Created: {formatIssueDate(issue.createdDate)}
        </time>
      </footer>
    </article>
  );
}
