import { useState, useCallback } from 'react';
import { IssueStatus, IssuePriority } from '../types/issue';

interface UseIssueFiltersReturn {
  searchTerm: string;
  statusFilter: IssueStatus | 'all';
  priorityFilter: IssuePriority | 'all';
  updateSearchTerm: (term: string) => void;
  updateStatusFilter: (status: IssueStatus | 'all') => void;
  updatePriorityFilter: (priority: IssuePriority | 'all') => void;
  clearFilters: () => void;
}

export function useIssueFilters(): UseIssueFiltersReturn {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<IssueStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<IssuePriority | 'all'>('all');

  const updateSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const updateStatusFilter = useCallback((status: IssueStatus | 'all') => {
    setStatusFilter(status);
  }, []);

  const updatePriorityFilter = useCallback((priority: IssuePriority | 'all') => {
    setPriorityFilter(priority);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchTerm('');
    setStatusFilter('all');
    setPriorityFilter('all');
  }, []);

  return {
    searchTerm,
    statusFilter,
    priorityFilter,
    updateSearchTerm,
    updateStatusFilter,
    updatePriorityFilter,
    clearFilters
  };
}
