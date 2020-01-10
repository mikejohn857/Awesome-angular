import { ExtendedComponentSchema, BuilderInfo, ValidateOptions } from 'formiojs';
import { EventEmitter } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
export { ConditionalOptions, ValidateOptions } from 'formiojs';

export interface ComponentOptions<T = any, V = ValidateOptions> extends ExtendedComponentSchema<T> {
  validate?: V;
}

export interface FormioRefreshValue {
  property?: string;
  value?: object;
  form?: object;
  submission?: object;
}

export interface AccessSetting {
  type: string;
  roles: string[];
}

export interface FormioForm {
  title?: string;
  display?: string;
  name?: string;
  path?: string;
  type?: string;
  project?: string;
  template?: string;
  components?: ExtendedComponentSchema[];
  tags?: string[];
  access?: AccessSetting[];
  submissionAccess?: AccessSetting[];
}

export interface AlertsOptions {
  submitMessage: string;
}

export interface ErrorsOptions {
  message: string;
}

export class FormioError {
  constructor(
    public message: string,
    public component: ExtendedComponentSchema,
    public silent?: boolean,
  ) {}
}

export type FormioSubmissionCallback = (
  error: FormioError,
  submission: object
) => void;
export type FormioBeforeSubmit = (
  submission: object,
  callback: FormioSubmissionCallback
) => void;

export interface FormioHookOptions {
  beforeSubmit: FormioBeforeSubmit;
}

export interface FormioOptions {
  errors?: ErrorsOptions;
  alerts?: AlertsOptions;
  disableAlerts?: boolean;
  i18n?: object;
  fileService?: object;
  hooks?: FormioHookOptions;
  sanitizeConfig?: any;
}

// Custom Angular Components
export interface FormioCustomComponentInfo extends BuilderInfo {
  type: string;
  selector: string;
  emptyValue?: any;
  extraValidators?: (keyof ValidateOptions)[];
  fieldOptions?: string[];
  template?: string;
  changeEvent?: string // Default: valueChange
  editForm?: () => { components: ExtendedComponentSchema[] };
}

export type FormioCustomElement = NgElement & WithProperties<{ value: any } & ExtendedComponentSchema>;

export interface FormioEvent {
  eventName: string;
  data?: {
    [key: string]: any;
  };
}

export interface FormioCustomComponent<T> {
  value: T; // Should be an @Input
  valueChange: EventEmitter<T>; // Should be an @Output
  disabled: boolean;
  formioEvent?: EventEmitter<FormioEvent>; // Should be an @Output
}
