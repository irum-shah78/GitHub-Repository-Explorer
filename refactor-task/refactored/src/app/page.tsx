"use client";
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { IssueFilters } from './components/IssueFilters';
import { Issue,  IssueStatus, IssuePriority, SortField, SortOrder } from './types/issue';
import { IssueCard } from './components/IssueCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useIssueFilters } from './hooks/useIssueFilters';
import { useIssueSorting } from './hooks/useIssueSorting';
import issuesData from '../constants/issues.json';

const issues = issuesData as Issue[];

export default function IssueTracker() {
  const [allIssues, setAllIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const {
    searchTerm,
    statusFilter,
    priorityFilter,
    updateSearchTerm,
    updateStatusFilter,
    updatePriorityFilter,
    clearFilters
  } = useIssueFilters();

  const {
    sortField,
    sortOrder,
    updateSortField,
    updateSortOrder,
    toggleSortOrder
  } = useIssueSorting();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        setIsLoading(true); 
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAllIssues(issues as Issue[]);
      } catch (error) {
        console.error('Failed to fetch issues:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIssues();
  }, []);

  const compareIssues = useCallback((a: Issue, b: Issue, field: SortField): number => {
    switch (field) {
      case 'title':
      case 'assignee':
        return a[field].toLowerCase().localeCompare(b[field].toLowerCase());
      
      case 'status':
        return a.status.localeCompare(b.status);
      
      case 'priority':
        const priorityOrder: Record<IssuePriority, number> = { high: 3, medium: 2, low: 1 };
        return (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0);
      
      case 'createdDate':
        return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
      
      default:
        return 0;
    }
  }, []);

  const processedIssues = useMemo(() => {
    let filtered = allIssues;

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(issue => 
        issue.title.toLowerCase().includes(searchLower) ||
        issue.description.toLowerCase().includes(searchLower) ||
        issue.assignee.toLowerCase().includes(searchLower)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(issue => issue.priority === priorityFilter);
    }

    return filtered.sort((a, b) => {
      const comparison = compareIssues(a, b, sortField);
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [allIssues, searchTerm, statusFilter, priorityFilter, sortField, sortOrder, compareIssues]);

  const handleSortFieldChange = useCallback((field: SortField) => {
    if (field === sortField) {
      toggleSortOrder();
    } else {
      updateSortField(field);
      updateSortOrder('asc');
    }
  }, [sortField, updateSortField, updateSortOrder, toggleSortOrder]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container">
      <header>
        <h1>Issue Tracker</h1>
        <p>Manage and track project issues efficiently</p>
      </header>
      
      <IssueFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        onSearchChange={updateSearchTerm}
        onStatusChange={updateStatusFilter}
        onPriorityChange={updatePriorityFilter}
        onClearFilters={clearFilters}
        onSortFieldChange={handleSortFieldChange}
        onSortOrderChange={updateSortOrder}
        sortField={sortField}
        sortOrder={sortOrder}
      />

      <div className="mb-6">
        <p>
          Showing <span className="font-semibold">{processedIssues.length}</span> of{' '}
          <span className="font-semibold">{allIssues.length}</span> issues
        </p>
      </div>

      <div className="space-y-4">
        {processedIssues.length > 0 ? (
          processedIssues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="empty-title">No issues found</h3>
            <p className="empty-description">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
