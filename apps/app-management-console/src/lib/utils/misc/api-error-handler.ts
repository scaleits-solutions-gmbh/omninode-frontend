import { ResultType } from "@scaleits-solutions-gmbh/services";
import { NextResponse } from "next/server";

/**
 * Centralized error handling function for API routes
 * @param resultType - The result type from service calls
 * @param context - Optional context to provide more specific error messages
 * @returns NextResponse with appropriate error message and status code
 */
export function handleServiceError(
  resultType: ResultType,
  context: string = "",
): NextResponse {
  const prefix = context ? `${context}: ` : "";

  switch (resultType) {
    case ResultType.NETWORK_ERROR:
      return NextResponse.json(
        { error: `${prefix}Network error occurred` },
        { status: 500 },
      );
    case ResultType.RESPONSE_PARSE_ERROR:
      return NextResponse.json(
        { error: `${prefix}Failed to parse response` },
        { status: 500 },
      );
    case ResultType.INTERNAL_SERVER_ERROR:
      return NextResponse.json(
        { error: `${prefix}Internal server error` },
        { status: 500 },
      );
    case ResultType.UNAUTHORIZED:
      return NextResponse.json(
        { error: `${prefix}Unauthorized access` },
        { status: 401 },
      );
    case ResultType.FORBIDDEN:
      return NextResponse.json(
        { error: `${prefix}Access forbidden` },
        { status: 403 },
      );
    case ResultType.NOT_FOUND:
      return NextResponse.json(
        { error: `${prefix}Resource not found` },
        { status: 404 },
      );
    case ResultType.BAD_REQUEST:
      return NextResponse.json(
        { error: `${prefix}Invalid request` },
        { status: 400 },
      );
    case ResultType.VALIDATION_ERROR:
      return NextResponse.json(
        { error: `${prefix}Validation failed` },
        { status: 422 },
      );
    case ResultType.UNHANDLED_ERROR:
      return NextResponse.json(
        { error: `${prefix}An unexpected error occurred` },
        { status: 500 },
      );
    default:
      return NextResponse.json(
        { error: `${prefix}Unknown error occurred` },
        { status: 500 },
      );
  }
}

/**
 * Helper function to handle JSON parsing errors
 * @param error - The caught error
 * @returns NextResponse with appropriate error message for JSON parsing issues
 */
export function handleJsonParsingError(error: unknown): NextResponse {
  if (error instanceof SyntaxError) {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 },
    );
  }
  return NextResponse.json(
    { error: "Failed to parse request body" },
    { status: 400 },
  );
}

/**
 * Helper function to log and return unexpected errors
 * @param error - The caught error
 * @param context - Context about where the error occurred
 * @returns NextResponse with generic error message
 */
export function handleUnexpectedError(
  error: unknown,
  context: string,
): NextResponse {
  console.error(`Unexpected error in ${context}:`, error);
  return NextResponse.json(
    { error: `An unexpected error occurred while ${context}` },
    { status: 500 },
  );
}
