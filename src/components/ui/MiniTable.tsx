import clsx from "clsx";
import { Check, Pencil, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

type MiniTableValue = string | React.ReactNode;

type MiniTableEditableRenderer = (helpers: {
  error?: string;
  clearError: () => void;
  isSubmitting: boolean;
}) => React.ReactNode;

type MiniTableEditableFieldObject = {
  render: React.ReactNode | MiniTableEditableRenderer;
  config?: MiniTableEditFieldOptions;
};

type MiniTableEditableField =
  | React.ReactNode
  | MiniTableEditableRenderer
  | MiniTableEditableFieldObject;

type MiniTableSubmitResult = void | {
  errors?: Record<string, string>;
  formError?: string;
};

export interface MiniTableEditFieldOptions {
  fullRow?: boolean;
  hideLabel?: boolean;
  label?: React.ReactNode;
  valueClassName?: string;
  containerClassName?: string;
}

export interface MiniTableEditConfig {
  data: Record<string, MiniTableEditableField>;
  config?: Record<string, MiniTableEditFieldOptions>;
  onSubmit?: () => Promise<MiniTableSubmitResult> | MiniTableSubmitResult;
  onCancel?: () => void;
  submitting?: boolean;
}

interface MiniTableProps {
  title?: string;
  data: Record<string, MiniTableValue>;
  edit?: MiniTableEditConfig;
}

const MiniTable: React.FC<MiniTableProps> = ({ title, data, edit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [internalSubmitting, setInternalSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});

  const entries = useMemo(() => Object.entries(data), [data]);
  const hasEditableFields = Boolean(
    edit && Object.keys(edit.data || {}).length
  );
  const isSubmitting = edit?.submitting ?? internalSubmitting;

  useEffect(() => {
    if (!hasEditableFields && isEditing) {
      setIsEditing(false);
      setFieldErrors({});
      setFormError(null);
      setInternalSubmitting(false);
    }
  }, [hasEditableFields, isEditing]);

  const toggleRow = (key: string) => {
    setExpandedKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleStartEdit = () => {
    if (!hasEditableFields) return;
    setFieldErrors({});
    setFormError(null);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFieldErrors({});
    setFormError(null);
    setIsEditing(false);
    edit?.onCancel?.();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!edit?.onSubmit) {
      setIsEditing(false);
      return;
    }

    try {
      setInternalSubmitting(true);
      const result = await edit.onSubmit();

      const nextErrors =
        result && "errors" in result ? result.errors : undefined;
      const nextFormError =
        result && "formError" in result ? result.formError : undefined;

      setFieldErrors(nextErrors || {});
      setFormError(nextFormError || null);

      if (nextErrors && Object.keys(nextErrors).length > 0) {
        return;
      }

      if (nextFormError) {
        return;
      }

      setIsEditing(false);
    } catch (error) {
      console.error("MiniTable edit submit failed", error);
      setFormError("A apărut o eroare neașteptată.");
    } finally {
      setInternalSubmitting(false);
    }
  };

  const resolveEditable = (key: string) => {
    if (!edit?.data) return { renderer: undefined, options: undefined };

    const entry = edit.data[key];
    if (entry === undefined) {
      return { renderer: undefined, options: undefined };
    }

    if (
      typeof entry === "object" &&
      entry !== null &&
      !React.isValidElement(entry) &&
      Object.prototype.hasOwnProperty.call(entry, "render")
    ) {
      const { render, config } = entry as MiniTableEditableFieldObject;
      return {
        renderer: render,
        options: config,
      };
    }

    return {
      renderer: entry as React.ReactNode | MiniTableEditableRenderer,
      options: undefined,
    };
  };

  const renderValue = (
    key: string,
    value: MiniTableValue,
    renderer?: React.ReactNode | MiniTableEditableRenderer,
    _options?: MiniTableEditFieldOptions,
    isFullRow?: boolean
  ) => {
    if (isEditing && renderer !== undefined) {
      const error = fieldErrors[key];
      const helpers = {
        error,
        clearError: () =>
          setFieldErrors((prev) => {
            if (!prev[key]) return prev;
            const { [key]: _removed, ...rest } = prev;
            return rest;
          }),
        isSubmitting,
      };

      const node =
        typeof renderer === "function" ? renderer(helpers) : renderer || null;

      return (
        <div
          className={clsx(
            "flex w-full flex-col gap-1",
            isFullRow ? "items-start text-left" : "items-end text-right"
          )}
        >
          {node}
          {error ? (
            <span className="text-xs text-amber-400">{error}</span>
          ) : null}
        </div>
      );
    }

    const isPrimitive =
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean";
    const isExpanded = expandedKeys[key];

    const label = isPrimitive ? String(value ?? "") : value;
    const displayValue = isPrimitive
      ? label === ""
        ? "-"
        : label
      : label || "-";

    const valueAlignment = isFullRow ? "text-left" : "text-right";

    return (
      <span
        onClick={() => (!isEditing && isPrimitive ? toggleRow(key) : undefined)}
        className={clsx(
          isPrimitive && !isExpanded ? "block w-full max-w-full truncate" : "block w-full max-w-full",
          isPrimitive && !isEditing ? "cursor-pointer" : "cursor-default",
          valueAlignment,
          "text-white/80"
        )}
      >
        {displayValue}
      </span>
    );
  };

  const titleBar = title ? (
    <div className="mb-2 flex items-center justify-between">
      <h2 className="font-medium text-white/80">{title}</h2>
      {isEditing ? (
        <div className="flex items-center gap-2">
          <button
            type="submit"
            className={clsx(
              "rounded-md text-emerald-400 transition hover:text-emerald-200",
              isSubmitting && "opacity-50"
            )}
            disabled={isSubmitting}
          >
            <Check strokeWidth={1.5} size={20} />
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md text-neutral-300 transition hover:text-white"
            disabled={isSubmitting}
          >
            <X strokeWidth={1.5} size={18} />
          </button>
        </div>
      ) : hasEditableFields ? (
        <button
          type="button"
          onClick={handleStartEdit}
          className="rounded-md text-neutral-300 transition hover:text-blue-400"
        >
          <Pencil strokeWidth={1.5} size={16} />
        </button>
      ) : null}
    </div>
  ) : null;

  const body = (
    <div className="divide-y divide-white/10">
      {entries.map(([key, value]) => {
        const { renderer, options: inlineOptions } = resolveEditable(key);
        const combinedOptions: MiniTableEditFieldOptions = {
          ...(edit?.config?.[key] || {}),
          ...(inlineOptions || {}),
        };

        const isFullRow = Boolean(isEditing && combinedOptions.fullRow);
        const showLabel = !(isEditing && combinedOptions.hideLabel);
        const labelContent = combinedOptions.label
          ? combinedOptions.label
          : key.charAt(0).toUpperCase() + key.slice(1);

        return (
          <div
            key={key}
            className={clsx(
              isFullRow
                ? "flex flex-col gap-2"
                : "flex items-start justify-between gap-4 py-2",
              combinedOptions.containerClassName
            )}
          >
            {showLabel ? (
              <span
                className={clsx(
                  "whitespace-nowrap text-white/60",
                  isFullRow ? "pr-0" : "pr-6"
                )}
              >
                {labelContent}
              </span>
            ) : null}
            <div
              className={clsx(
                isFullRow ? "w-full text-left" : "flex-1 text-right",
                "min-w-0",
                combinedOptions.valueClassName
              )}
            >
              {renderValue(key, value, renderer, combinedOptions, isFullRow)}
            </div>
          </div>
        );
      })}
    </div>
  );

  const content = (
    <>
      {titleBar}
      {formError ? (
        <div className="mb-3 rounded-md border border-amber-500/60 bg-amber-500/10 px-3 py-2 text-sm text-amber-300">
          {formError}
        </div>
      ) : null}
      {body}
    </>
  );

  if (isEditing) {
    return <form onSubmit={handleSubmit}>{content}</form>;
  }

  return <div>{content}</div>;
};

export default MiniTable;
