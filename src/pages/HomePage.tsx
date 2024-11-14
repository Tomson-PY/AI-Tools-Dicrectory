import React from 'react';
import { CategoryFilter } from '../components/CategoryFilter';
import { AdminPanel } from '../components/AdminPanel';
import { ToolGrid } from '../components/ToolGrid';
import { useStore } from '../store';

export const HomePage = () => {
  const isAdmin = useStore((state) => state.isAdmin);

  return (
    <>
      <CategoryFilter />
      {isAdmin && <AdminPanel />}
      <ToolGrid />
    </>
  );
};