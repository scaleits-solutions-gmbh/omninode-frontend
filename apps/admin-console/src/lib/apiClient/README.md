# API Client

This directory contains the improved API client implementation with centralized configuration, standardized error handling, and type-safe query key management.

## Architecture

### Base Client (`baseClient.ts`)
- **Centralized Configuration**: Single place to configure base URL, timeout, and default headers
- **Standardized Error Handling**: Custom error classes for different HTTP status codes
- **Request/Response Interceptors**: Built-in timeout handling and response validation
- **Type Safety**: Full TypeScript support with generics

### Query Keys (`queryKeys.ts`)
- **Consistent Structure**: Hierarchical query key organization
- **Type Safety**: Readonly query keys to prevent mutations
- **Scalable**: Easy to add new entity query keys
- **React Query Integration**: Designed specifically for React Query patterns

### Entity APIs (`company.ts`)
- **Input Validation**: Client-side validation before API calls
- **Proper Error Handling**: Uses custom error types from base client
- **Complete CRUD**: All operations including DELETE
- **Documentation**: Clear JSDoc comments for all functions

## Usage Examples

### Basic API Calls
```typescript
import { fetchCompanies, getCompanyById, createCompany, updateCompany, deleteCompany } from '@/lib/apiClient';

// Fetch paginated companies with validation
const companies = await fetchCompanies({ page: 1, pageSize: 10 });

// Get company by ID with proper error handling
try {
  const company = await getCompanyById('company-id');
} catch (error) {
  if (error instanceof NotFoundError) {
    // Handle not found specifically
  } else if (error instanceof ValidationError) {
    // Handle validation errors
  }
}
```

### React Query Integration
```typescript
import { useQuery, useMutation } from '@tanstack/react-query';
import { getCompanyById, getCompanyByIdQueryKey, updateCompany } from '@/lib/apiClient';

// Query with standardized keys
const { data, error } = useQuery({
  queryKey: getCompanyByIdQueryKey(id),
  queryFn: () => getCompanyById(id),
  retry: (failureCount, error) => {
    // Smart retry logic based on error type
    if (error instanceof ValidationError || error instanceof NotFoundError) {
      return false; // Don't retry validation or not found errors
    }
    return failureCount < 3;
  },
});

// Mutation with proper error handling
const mutation = useMutation({
  mutationFn: updateCompany,
  onError: (error) => {
    if (error instanceof ValidationError) {
      // Show validation error to user
    } else if (error instanceof ApiError) {
      // Show API error with status code
    }
  },
});
```

### Error Handling
```typescript
import { ApiError, ValidationError, NotFoundError, ServerError } from '@/lib/apiClient';

try {
  const result = await fetchCompanies({ page: 1, pageSize: 10 });
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle client-side validation errors (400)
    console.error('Validation error:', error.message);
  } else if (error instanceof NotFoundError) {
    // Handle not found errors (404)
    console.error('Resource not found:', error.message);
  } else if (error instanceof ServerError) {
    // Handle server errors (5xx)
    console.error('Server error:', error.message);
  } else if (error instanceof ApiError) {
    // Handle other HTTP errors
    console.error(`API error ${error.status}:`, error.message);
  }
}
```

## Key Improvements

1. **Removed Debugging Code**: No more `console.log` statements in production code
2. **Standardized Query Keys**: Type-safe, consistent query key management
3. **Proper Error Handling**: Custom error classes with meaningful messages
4. **Base Client**: Centralized configuration and common functionality
5. **Input Validation**: Client-side validation before API calls
6. **Complete CRUD**: Added missing DELETE operation
7. **Type Safety**: Full TypeScript support throughout
8. **Documentation**: Clear comments and examples

## Migration Guide

### Old Import
```typescript
import { fetchCompanies, getCompanyById } from '@/lib/apiClient/company';
```

### New Import
```typescript
import { fetchCompanies, getCompanyById } from '@/lib/apiClient';
```

The API remains largely the same, but now includes:
- Better error handling with specific error types
- Input validation
- Standardized query keys
- More reliable requests with timeout handling 