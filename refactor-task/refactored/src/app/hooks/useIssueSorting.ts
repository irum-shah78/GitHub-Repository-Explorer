import { useState, useCallback } from 'react';
import { SortField, SortOrder } from '../types/issue';

interface UseIssueSortingReturn {
  sortField: SortField;
  sortOrder: SortOrder;
  updateSortField: (field: SortField) => void;
  updateSortOrder: (order: SortOrder) => void;
  toggleSortOrder: () => void;
}

export function useIssueSorting(): UseIssueSortingReturn {
  const [sortField, setSortField] = useState<SortField>('createdDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const updateSortField = useCallback((field: SortField) => {
    setSortField(field);
  }, []);

  const updateSortOrder = useCallback((order: SortOrder) => {
    setSortOrder(order);
  }, []);

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  }, []);

  return {
    sortField,
    sortOrder,
    updateSortField,
    updateSortOrder,
    toggleSortOrder
  };
}
