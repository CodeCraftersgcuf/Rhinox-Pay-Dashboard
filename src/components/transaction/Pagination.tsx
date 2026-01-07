import React from "react";
import { ActionType } from "./types";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  selectedAction: ActionType;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  totalItems,
  selectedAction,
  onPageChange
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);
      
      if (currentPage <= 3) {
        // Near the start: 1 2 3 4 ... last
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end: 1 ... (last-3) (last-2) (last-1) last
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle: 1 ... (current-1) current (current+1) ... last
        pages.push('ellipsis');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalItems === 0) return null;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 24px',
      backgroundColor: '#0F1825',
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px'
    }}>
      <div style={{
        fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '12px',
        color: '#9CA3AF'
      }}>
        Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of {totalItems} {selectedAction === 'All' ? 'Users' : 'Transactions'}
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          style={{
            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '12px',
            color: currentPage === 1 ? '#4B5563' : '#9CA3AF',
            backgroundColor: '#1C2530',
            border: 'none',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            padding: '8px',
            borderRadius: '8px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 9L4.5 6L7.5 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                style={{
                  fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                  fontSize: '12px',
                  color: '#9CA3AF',
                  padding: '0 4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '24px'
                }}
              >
                ...
              </span>
            );
          }
          
          const pageNum = page as number;
          const isActive = currentPage === pageNum;
          
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              style={{
                fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: '12px',
                color: isActive ? '#FFFFFF' : '#9CA3AF',
                backgroundColor: isActive ? '#1C2530' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '6px 12px',
                borderRadius: '8px',
                minWidth: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              {pageNum}
            </button>
          );
        })}
        
        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          style={{
            fontFamily: 'SF Pro, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '12px',
            color: currentPage === totalPages ? '#4B5563' : '#9CA3AF',
            backgroundColor: '#1C2530',
            border: 'none',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            padding: '8px',
            borderRadius: '8px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;

