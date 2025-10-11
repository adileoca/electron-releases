const { log } = require("../logger.js");

const normalizePayload = (payload) => {
  if (!payload) return payload;

  if (payload instanceof Error) {
    const { name, message, stack, cause, ...rest } = payload;
    const serialized = { name, message, stack };
    if (cause) {
      serialized.cause =
        cause instanceof Error
          ? {
              name: cause.name,
              message: cause.message,
              stack: cause.stack,
            }
          : cause;
    }
    return { ...serialized, ...rest };
  }

  if (typeof payload === "object") {
    try {
      return JSON.parse(JSON.stringify(payload));
    } catch (_error) {
      return payload;
    }
  }

  return payload;
};

const mergePayloads = (basePayload, payload) => {
  if (!basePayload && payload === undefined) {
    return undefined;
  }

  if (!basePayload) {
    return normalizePayload(payload);
  }

  if (payload === undefined) {
    return normalizePayload(basePayload);
  }

  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    return { ...normalizePayload(basePayload), ...normalizePayload(payload) };
  }

  return {
    ...normalizePayload(basePayload),
    value: normalizePayload(payload),
  };
};

const buildLabel = (namespace, label) =>
  label ? `${namespace}-${label}` : namespace;

const createLogger = (namespace, basePayload) => {
  const withLevel = (level) => (label, payload) => {
    const finalLabel = buildLabel(namespace, label);
    const finalPayload = mergePayloads(basePayload, payload);
    if (finalPayload !== undefined) {
      log[level](finalLabel, finalPayload);
    } else {
      log[level](finalLabel);
    }
  };

  return {
    debug: withLevel("debug"),
    info: withLevel("info"),
    warn: withLevel("warn"),
    error: withLevel("error"),
    child: (suffix, payload) =>
      createLogger(`${namespace}-${suffix}`, {
        ...basePayload,
        ...payload,
      }),
  };
};

module.exports = { createLogger };

