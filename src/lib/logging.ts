type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const getConfiguredLevel = (): LogLevel => {
  if (process.env.NODE_ENV === "production") {
    return "warn";
  }

  if (typeof window !== "undefined") {
    const stored = window.localStorage?.getItem("log-level");
    if (stored && stored in LEVEL_PRIORITY) {
      return stored as LogLevel;
    }
  }

  const envLevel = process.env.REACT_APP_LOG_LEVEL?.toLowerCase();
  if (envLevel && envLevel in LEVEL_PRIORITY) {
    return envLevel as LogLevel;
  }

  return "debug";
};

const configuredLevel = getConfiguredLevel();

const shouldLog = (level: LogLevel) =>
  LEVEL_PRIORITY[level] >= LEVEL_PRIORITY[configuredLevel];

const normalizePayload = (payload: unknown) => {
  if (payload instanceof Error) {
    const { name, message, stack, cause } = payload;
    const serialized: Record<string, unknown> = { name, message };
    if (stack) {
      serialized.stack = stack;
    }
    if (cause) {
      serialized.cause =
        cause instanceof Error
          ? { name: cause.name, message: cause.message, stack: cause.stack }
          : cause;
    }
    return serialized;
  }

  if (payload && typeof payload === "object") {
    try {
      return JSON.parse(JSON.stringify(payload));
    } catch (_error) {
      return payload;
    }
  }

  return payload;
};

const logWithLevel = (level: LogLevel, label: string, payload?: unknown) => {
  if (!shouldLog(level)) return;

  const timestamp = new Date().toISOString();
  const message = `[${timestamp}] [${label}]`;
  if (payload === undefined) {
    // eslint-disable-next-line no-console
    console[level](message);
    return;
  }

  const formatted = normalizePayload(payload);

  // eslint-disable-next-line no-console
  console[level](message, formatted);
};

export const logDebug = (label: string, payload?: unknown) =>
  logWithLevel("debug", label, payload);

export const logInfo = (label: string, payload?: unknown) =>
  logWithLevel("info", label, payload);

export const logWarn = (label: string, payload?: unknown) =>
  logWithLevel("warn", label, payload);

export const logError = (label: string, payload?: unknown) =>
  logWithLevel("error", label, payload);

type BasePayload = Record<string, unknown>;

const mergePayloads = (
  basePayload: BasePayload | undefined,
  payload: unknown
) => {
  if (!basePayload || payload === undefined) {
    return payload ?? basePayload;
  }

  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    return { ...basePayload, ...payload };
  }

  return { ...basePayload, value: payload };
};

type Logger = {
  debug: (label: string, payload?: unknown) => void;
  info: (label: string, payload?: unknown) => void;
  warn: (label: string, payload?: unknown) => void;
  error: (label: string, payload?: unknown) => void;
  child: (suffix: string, payload?: BasePayload) => Logger;
};

const createLabel = (namespace: string, label: string) =>
  label ? `${namespace}-${label}` : namespace;

export const createLogger = (
  namespace: string,
  basePayload?: BasePayload
): Logger => {
  const withPayload =
    (levelFn: (label: string, payload?: unknown) => void) =>
    (label: string, payload?: unknown) =>
      levelFn(createLabel(namespace, label), mergePayloads(basePayload, payload));

  return {
    debug: withPayload(logDebug),
    info: withPayload(logInfo),
    warn: withPayload(logWarn),
    error: withPayload(logError),
    child: (suffix: string, payload?: BasePayload) =>
      createLogger(`${namespace}-${suffix}`, {
        ...basePayload,
        ...payload,
      }),
  };
};
