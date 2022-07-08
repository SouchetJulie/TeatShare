/**
 * The types of all the properties of the given type
 */
type PropertyOf<T> = T[keyof T];

/**
 * Utility type to replace the types of all properties that are of a given type.
 *
 * Ex:
 * `type Person = {age: number, name: string}`
 *
 * `Replace<Person, number, boolean> // {age: *boolean*, name: string}`
 */
export type Replace<
  ContainerType extends Record<string, any>, // this is the "container" type: an object with values
  TypeToReplace extends PropertyOf<ContainerType>, // this is the type to replace: it must be a type used by one of the properties of the object
  NewTypeToUse // this is the type we will use to replace the properties that are of the previous type
> = {
  // we iterate over the properties of the container
  [k in keyof ContainerType]: ContainerType[k] extends TypeToReplace // if this property is of the type we're looking for...
    ? NewTypeToUse // ... then we use the new type
    : ContainerType[k]; // otherwise we leave it as is
};
