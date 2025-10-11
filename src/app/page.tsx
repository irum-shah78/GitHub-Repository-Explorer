'use client';

import { useState, useEffect } from 'react';
import { RepositoryCard } from '@/components/RepositoryCard';
import { SearchBar } from '@/components/SearchBar';
import { Pagination } from '@/components/Pagination';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  stargazers_count: number;
  description: string;
  html_url: string;
  language: string;
}

interface GitHubResponse {
  items: Repository[];
  total_count: number;
}

export default function Home() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  const fetchRepositories = async (page: number = 1, query: string = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const searchTerm = query || 'stars:>5000';
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(searchTerm)}&sort=stars&per_page=30&page=${page}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const data: GitHubResponse = await response.json();
      setRepositories(data.items);
      setTotalCount(data.total_count);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepositories(currentPage, searchQuery);
  }, [currentPage]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    fetchRepositories(1, query);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalCount / 30);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            GitHub Repository Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover popular repositories with 5000+ stars
          </p>
        </header>

        <SearchBar onSearch={handleSearch} />

        {loading && <LoadingSpinner />}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery 
                  ? `Found ${totalCount.toLocaleString()} repositories matching "${searchQuery}"`
                  : `Showing ${totalCount.toLocaleString()} popular repositories`
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {repositories.map((repo) => (
                <RepositoryCard key={repo.id} repository={repo} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
