import { redactHeaders } from './utils';

/**
 * Leveled logging. Log output is for debugging only — its format is not part of
 * the package's public contract and may change between releases.
 */

export type LogLevel = 'off' | 'error' | 'warn' | 'info' | 'debug';

export interface Logger {
  error: (...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
}

export interface LoggerClient {
  logger: Logger | undefined;
  logLevel: LogLevel;
}

const LEVEL_RANK: Record<LogLevel, number> = {
  off: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

export const isLogLevel = (value: unknown): value is LogLevel =>
  typeof value === 'string' && value in LEVEL_RANK;

export const parseLogLevel = (value: unknown, fallback: LogLevel): LogLevel =>
  isLogLevel(value) ? value : fallback;

const noop = (): void => undefined;

const noopLogger: Logger = { error: noop, warn: noop, info: noop, debug: noop };

/**
 * Build a logger that filters by the client's configured level, so messages
 * below the threshold are never forwarded to the underlying logger.
 */
export const loggerFor = (client: LoggerClient): Logger => {
  const logger = client.logger ?? (globalThis as { console?: Logger }).console;
  const threshold = LEVEL_RANK[client.logLevel] ?? LEVEL_RANK.warn;

  if (!logger || threshold === LEVEL_RANK.off) return noopLogger;

  const forLevel = (level: Exclude<LogLevel, 'off'>): ((...args: unknown[]) => void) => {
    if (LEVEL_RANK[level] > threshold) return noop;
    const method = logger[level];
    if (typeof method !== 'function') return noop;
    return (...args: unknown[]) => method.call(logger, ...args);
  };

  return {
    error: forLevel('error'),
    warn: forLevel('warn'),
    info: forLevel('info'),
    debug: forLevel('debug'),
  };
};

/** Summarise a request/response for debug logging, with headers redacted. */
export const formatRequestDetails = (details: {
  retryOfRequestLogID?: string | undefined;
  requestLogID?: string;
  retriesRemaining?: number;
  durationMs?: number;
  method?: string;
  url?: string;
  status?: number;
  headers?: Headers;
  body?: unknown;
  message?: unknown;
}): Record<string, unknown> => {
  const { headers, body, ...rest } = details;

  return {
    ...rest,
    ...(headers ? { headers: redactHeaders(headers) } : {}),
    ...(body === undefined ? {} : { body: truncateBody(body) }),
  };
};

const MAX_LOGGED_BODY_LENGTH = 10_000;

const truncateBody = (body: unknown): unknown => {
  if (typeof body !== 'string') return body;
  if (body.length <= MAX_LOGGED_BODY_LENGTH) return body;
  return `${body.slice(0, MAX_LOGGED_BODY_LENGTH)}… (truncated)`;
};
