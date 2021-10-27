import React from 'react'
import { FormBuilderInput } from '@sanity/form-builder/lib/FormBuilderInput'
import Fieldset from 'part:@sanity/components/fieldsets/default'
// Utilities for patching
import { setIfMissing } from '@sanity/form-builder/PatchEvent'


export const GalleryInput = React.forwardRef(( props, ref) => {
  const {
    compareValue,
    filterField,
    isRoot,
    level,
    markers,
    onBlur,
    onChange,
    onFocus,
    presence,
    readOnly,
    type,
    value
  } = props;

  return (
    <FormBuilderInput
      compareValue = {compareValue}
      filterField = {filterField}
      isRoot = {isRoot}
      level = {level}
      markers = {markers}
      onBlur = {onBlur}
      onChange = {onChange}
      onFocus = {onFocus}
      presence = {presence}
      readOnly = {readOnly}
      type = {type}
      ref = {ref}
    />
  );
});