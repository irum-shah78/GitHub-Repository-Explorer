export type IssueStatus = 'open' | 'in-progress' | 'closed';
export type IssuePriority = 'high' | 'medium' | 'low';
export type SortField = 'title' | 'status' | 'priority' | 'assignee' | 'createdDate';
export type SortOrder = 'asc' | 'desc';

export interface Issue {
  id: number;
  title: string;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string;
  createdDate: string;
  description: string;
}

export const ISSUE_STATUSES: IssueStatus[] = ['open', 'in-progress', 'closed'];
export const ISSUE_PRIORITIES: IssuePriority[] = ['high', 'medium', 'low'];
export const SORT_FIELDS: SortField[] = ['title', 'status', 'priority', 'assignee', 'createdDate'];

export const getStatusBadgeClasses = (status: IssueStatus): string => {
  const statusClasses: Record<IssueStatus, string> = {
    'open': 'bg-green-100 text-green-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    'closed': 'bg-red-100 text-red-800'
  };
  return statusClasses[status];
};

export const getPriorityBadgeClasses = (priority: IssuePriority): string => {
  const priorityClasses: Record<IssuePriority, string> = {
    'high': 'bg-red-100 text-red-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'low': 'bg-green-100 text-green-800'
  };
  return priorityClasses[priority];
};

export const formatIssueDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};
