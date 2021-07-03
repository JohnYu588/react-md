import { Dispatch, SetStateAction, useState } from "react";

/**
 * This is the `useState` initializer that can be used if some checkboxes should
 * be checked by default.
 *
 * @internal
 * @remarks \@since 2.8.5
 */
type Initializer<V extends string> = readonly V[] | (() => readonly V[]);

/**
 * The change handler for indeterminate checkboxes.
 *
 * @param values - The current list of checked values.
 * @typeParam V - The values allowed for the list of checkboxes.
 * @internal
 * @remarks \@since 2.8.5
 */
type OnChange<V extends string> = (values: readonly V[]) => void;

/**
 * @remarks \@since 2.8.5
 * @typeParam V - The values allowed for the list of checkboxes.
 */
export interface IndeterminateCheckedHookOptions<V extends string> {
  /**
   * Enabling this option will update the returned props to rename `onChange` to
   * `onCheckedChange` to work with the {@link MenuItemCheckbox} component.
   *
   * @defaultValue `false`
   */
  menu?: boolean;

  /** {@inheritDoc OnChange} */
  onChange?: OnChange<V>;

  /** {@inheritDoc Initializer} */
  defaultCheckedValues?: Initializer<V>;
}

/** @remarks \@since 2.8.5 */
export interface BaseProvidedIndeterminateCheckboxProps {
  /**
   * Note: This will only be provided when the {@link indeterminate} prop is
   * `true`.
   */
  "aria-checked"?: "mixed";

  /**
   * Boolean if the root checkbox is currently checked.
   */
  checked: boolean;

  /**
   * This will be set to `true` when at least one checkbox has been checked but
   * not every checkbox to enable the {@link CheckboxProps.indeterminate} state.
   */
  indeterminate: boolean;
}

/**
 * @remarks \@since 2.8.5
 * @typeParam V - The values allowed for the list of checkboxes.
 */
export interface BaseProvidedIndeterminateControlledCheckboxProps<
  V extends string
> {
  /**
   * One of the values provided to the {@link useIndeterminateChecked} hook.
   */
  value: V;

  /**
   * Boolean if the current checkbox is checked.
   */
  checked: boolean;
}

/**
 * @remarks \@since 2.8.5
 * @typeParam V - The values allowed for the list of checkboxes.
 */
export interface BaseIndeterminateCheckedHookReturnValue<V extends string> {
  /**
   * A list of all the values that are currently checked.
   */
  checkedValues: readonly V[];

  /**
   * A function to manually override the {@link checkedValues} if the default
   * hook's implementation does not work for your use-case.
   */
  setCheckedValues: Dispatch<SetStateAction<readonly V[]>>;
}

/**
 * @remarks \@since 2.8.5
 * @typeParam V - The values allowed for the list of checkboxes.
 * @internal
 */
interface OnChangeReturnValue<V extends string>
  extends BaseIndeterminateCheckedHookReturnValue<V> {
  rootProps: BaseProvidedIndeterminateCheckboxProps & { onChange(): void };
  getProps(
    value: V
  ): BaseProvidedIndeterminateControlledCheckboxProps<V> & { onChange(): void };
}

/**
 * @remarks \@since 2.8.5
 * @typeParam V - The values allowed for the list of checkboxes.
 * @internal
 */
interface OnCheckedChangeReturnValue<V extends string>
  extends BaseIndeterminateCheckedHookReturnValue<V> {
  rootProps: BaseProvidedIndeterminateCheckboxProps & {
    onCheckedChange(): void;
  };
  getProps(value: V): BaseProvidedIndeterminateControlledCheckboxProps<V> & {
    onCheckedChange(): void;
  };
}

/**
 * @remarks \@since 2.8.5
 * @typeParam V - The values allowed for the list of checkboxes.
 * @internal
 */
interface CombinedReturnValue<V extends string>
  extends BaseIndeterminateCheckedHookReturnValue<V> {
  rootProps: BaseProvidedIndeterminateCheckboxProps & {
    onChange?(): void;
    onCheckedChange?(): void;
  };
  getProps(value: V): BaseProvidedIndeterminateControlledCheckboxProps<V> & {
    onChange?(): void;
    onCheckedChange?(): void;
  };
}

/**
 * This hook allows you to toggle the state of multiple checkboxes in a single
 * place along with an indeterminate checkbox that can check/uncheck all
 * checkboxes at once.
 *
 * @example
 * Simple value list with labels lookup:
 * ```tsx
 * const values = ["a", "b", "c", "d"] as const;
 * const LABELS = {
 *   a: "Label 1",
 *   b: "Label 2",
 *   c: "Label 3",
 *   d: "Label 4",
 * } as const;
 * const { getProps, rootProps } = useIndeterminateChecked(values);
 *
 * return (
 *   <>
 *     <Checkbox id="root-checkbox" {...rootProps} label="Root Checkbox" />
 *     {values.map((value, i) => (
 *       <Checkbox
 *         id={`child-checkbox-${i + 1}`}
 *         label={LABELS[value]}
 *         {...getProps(value)}
 *       />
 *     ))}
 *   </>
 * );
 * ```
 *
 * @example
 * Fetch Data From Server and check first result
 * ```tsx
 * interface ServerFetchedData {
 *   id: Guid;
 *   name: string;
 * }
 *
 *
 * const [data, setData] = useState<ServerFetchedData[]>([]);
 * const { getProps, rootProps, setCheckedValues } = useIndeterminateChecked(
 *   data.map(({ id }) => id),
 * );
 *
 * useEffect(() => {
 *   let cancelled = false;
 *   (async function load() {
 *     const response = await fetch("/my-api");
 *     const json = await response.json();
 *     if (!cancelled) {
 *       // pretend validation and sanity checks
 *       setData(json as ServerFetchedData[]);
 *       setCheckedValues(json[0].id);
 *     }
 *   })();

 *   return () => {
 *     cancelled = true;
 *   };
 * }, []);
 *
 * return (
 *   <>
 *     <Checkbox id="root-checkbox" {...rootProps} label="Root Checkbox" />
 *     {data.map(({ id, name }, i) => (
 *       <Checkbox
 *         id={`child-checkbox-${i + 1}`}
 *         label={name}
 *         {...getProps(id)}
 *       />
 *     ))}
 *   </>
 * );
 * ```
 *
 * @example
 * With MenuItemCheckbox
 * ```tsx
 * const values = ["a", "b", "c", "d"] as const;
 * const LABELS = {
 *   a: "Label 1",
 *   b: "Label 2",
 *   c: "Label 3",
 *   d: "Label 4",
 * } as const;
 * const { getProps, rootProps } = useIndeterminateChecked(values, {
 *   menu: true,
 * });
 *
 * return (
 *   <DropdownMenu
 *     id="dropdown-menu-id"
 *     items={[
 *       <MenuItemCheckbox
 *         id="dropdown-menu-id-toggle-all"
 *         {...rootProps}
 *       >
 *         Toggle All
 *       </MenuItemCheckbox>,
 *       ...values.map((value, i) => (
 *         <MenuItemCheckbox
 *           id={`dropdown-menu-id-${i + 1}`}
 *           {...getProps(value)}
 *         >
 *           {LABELS[value]}
 *         </MenuItemCheckbox>
 *       ))
 *     ]}
 *   >
 *     Button
 *   </DropdownMenu>
 * );
 * ```
 */
export function useIndeterminateChecked<V extends string>(
  values: readonly V[],
  defaultCheckedValues: Initializer<V>,
  onChange?: OnChange<V>
): OnChangeReturnValue<V>;
export function useIndeterminateChecked<V extends string>(
  values: readonly V[],
  options?: IndeterminateCheckedHookOptions<V> & { menu?: false }
): OnChangeReturnValue<V>;
export function useIndeterminateChecked<V extends string>(
  values: readonly V[],
  options: IndeterminateCheckedHookOptions<V> & { menu: true }
): OnCheckedChangeReturnValue<V>;
export function useIndeterminateChecked<V extends string>(
  values: readonly V[],
  defaultOrOptions?: IndeterminateCheckedHookOptions<V> | Initializer<V>,
  optionalOnChange?: OnChange<V>
): CombinedReturnValue<V> {
  let menu = false;
  let propOnChange: OnChange<V> | undefined = optionalOnChange;
  let defaultCheckedValues: Initializer<V>;
  if (
    typeof defaultOrOptions === "undefined" ||
    !("length" in defaultOrOptions)
  ) {
    ({
      menu = false,
      onChange: propOnChange,
      defaultCheckedValues = [],
    } = defaultOrOptions ?? {});
  } else {
    defaultCheckedValues = defaultOrOptions;
  }

  const [checkedValues, setCheckedValues] =
    useState<readonly V[]>(defaultCheckedValues);
  const checked = checkedValues.length > 0;
  const indeterminate = checked && checkedValues.length < values.length;
  const updateCheckedValues = (values: readonly V[]): void => {
    propOnChange?.(values);
    setCheckedValues(values);
  };

  const onChange = (): void => {
    updateCheckedValues(
      checkedValues.length === 0 || indeterminate ? values : []
    );
  };

  return {
    rootProps: {
      "aria-checked": indeterminate ? "mixed" : undefined,
      checked,
      indeterminate,
      onChange: menu ? undefined : onChange,
      onCheckedChange: menu ? onChange : undefined,
    },
    getProps: (value) => {
      const onChange = (): void => {
        const i = checkedValues.indexOf(value);
        const nextChecked = checkedValues.slice();
        if (i === -1) {
          nextChecked.push(value);
        } else {
          nextChecked.splice(i, 1);
        }

        updateCheckedValues(nextChecked);
      };

      return {
        value,
        checked: checkedValues.includes(value),
        onChange: menu ? undefined : onChange,
        onCheckedChange: menu ? onChange : undefined,
      };
    },
    checkedValues,
    setCheckedValues,
  };
}
