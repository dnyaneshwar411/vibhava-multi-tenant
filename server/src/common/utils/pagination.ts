import { secureRegexInput } from "./sanitize.js";

export type PaginationQueryOptions<T = {}> = {
  query: string | undefined
  page: string
  limit: string
} & T;

export type PaginationOptions<T = {}> = {
  query: string | undefined
  pageNumber: number
  limitNumber: number
  skip: number
} & T;

export const buildPaginationFilters = function <T = {}, R = {}>(
  options: PaginationQueryOptions<T>
) {
  const { page, limit, query } = options;
  const pageNumber = !isNaN(Number(page)) ? parseInt(page) : 1;
  const limitNumber = !isNaN(Number(limit)) ? parseInt(limit) : 10;
  const skip = (pageNumber - 1) * limitNumber;
  return { pageNumber, limitNumber, skip, query: query && secureRegexInput(query) } as R & PaginationOptions;
}