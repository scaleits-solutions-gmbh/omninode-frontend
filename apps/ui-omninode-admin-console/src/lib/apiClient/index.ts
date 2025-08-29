/**
 * API Client exports
 * Centralized exports for all API client functionality
 * Now powered by @scaleits-solutions-gmbh/api-client package
 */

// Base client and error types (from package)
export {
  ApiError,
  ValidationError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
  ForbiddenError,
} from '@scaleits-solutions-gmbh/api-client';

// Query keys and query client utilities (application-specific)
export {
  queryKeys,
  getInvalidationKeys,
  getCompaniesQueryKey,
  getCompanyByIdQueryKey,
  getCompanyServiceInstancesQueryKey,
} from './queryKeys';

// Company API (application-specific)
export {
  fetchCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  invalidateCompaniesQueries,
  type FetchCompaniesParams,
} from './company/company';

// Company Service Instance API (application-specific)
export {
  fetchCompanyServiceInstances,
  type FetchCompanyServiceInstancesParams,
} from './company/companyServiceInstance';
