import * as React from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { CardApp } from "../atoms/CardApp";
import { TextApp } from "../atoms/TextApp";
import { ButtonApp } from "../atoms/ButtonApp";
import { TextAreaApp } from "../atoms/TextAreaApp";

export interface AIPromptHeroToolbarAction {
  id: string;
  label?: string;
  icon: React.ReactNode;
  trailingIcon?: React.ReactNode;
  onClick?: () => void;
}

export interface AIPromptHeroAppProps {
  id: string;
  title: string;
  subtitle?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  toolbarActions?: AIPromptHeroToolbarAction[];
  className?: string;
}

// Landing-page style hero prompt composer (big H1 + subtitle + a large borderless
// textarea inside a bordered card, with a pill-button toolbar bottom-left and a
// circular send button bottom-right) — built entirely from CardApp/TextApp/
// ButtonApp/TextAreaApp so it inherits the same tokens (radius, focus ring,
// spacing) as the rest of the design system instead of one-off markup.
export function AIPromptHeroApp({
  id,
  title,
  subtitle,
  placeholder = "Create something beautiful...",
  value,
  defaultValue = "",
  onValueChange,
  onSubmit,
  toolbarActions = [],
  className,
}: AIPromptHeroAppProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const currentValue = value ?? internalValue;

  const setValue = (next: string) => {
    if (value === undefined) setInternalValue(next);
    onValueChange?.(next);
  };

  const handleSubmit = () => {
    if (!currentValue.trim()) return;
    onSubmit?.(currentValue);
  };

  return (
    <div id={id} data-ui-id={id} className={cn("mx-auto flex w-full max-w-3xl flex-col items-center text-center", className)}>
      <TextApp id={`${id}-title`} variant="h1" weight="bold" className="tracking-tight">
        {title}
      </TextApp>
      {subtitle && (
        <TextApp id={`${id}-subtitle`} variant="lead" className="mx-auto mt-4 max-w-2xl">
          {subtitle}
        </TextApp>
      )}

      <div className="mt-8 w-full max-w-2xl">
        <CardApp id={`${id}-composer`} variant="neutral" size="none" rounded="lg" className="relative shadow-2xs">
          <TextAreaApp
            id={`${id}-textarea`}
            variant="minimal"
            resize="none"
            value={currentValue}
            onChange={(event) => setValue(event.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="min-h-[140px] p-4 pb-20 pr-16 text-base sm:p-6 sm:pb-24 sm:pr-20 sm:text-lg"
          />

          {toolbarActions.length > 0 && (
            <div className="absolute bottom-4 left-4 flex flex-wrap items-center gap-2 sm:bottom-6 sm:left-6">
              {toolbarActions.map((action) => (
                <ButtonApp
                  key={action.id}
                  id={`${id}-action-${action.id}`}
                  variant="secondary"
                  size="sm"
                  rounded="full"
                  leftIcon={action.icon}
                  rightIcon={action.trailingIcon}
                  onClick={action.onClick}
                >
                  {action.label}
                </ButtonApp>
              ))}
            </div>
          )}

          <ButtonApp
            id={`${id}-send`}
            variant="secondary"
            size="iconMd"
            rounded="full"
            className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6"
            onClick={handleSubmit}
            aria-label="Kirim"
          >
            <ArrowUp className="h-4 w-4" />
          </ButtonApp>
        </CardApp>
      </div>
    </div>
  );
}
