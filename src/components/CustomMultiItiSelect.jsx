import React from 'react'
import CustomText from './CustomText'
import { light } from '@/_assets/themes/themes'
import { FormControl, Select, MenuItem } from '@mui/material'
import { styled } from '@mui/system'

export default function CustomMultiItiSelect({
  top_title,
  option_data,
  content_destruct,
  selectedValue = [], // This should be an array of IDs
  onChange,
  onOpen,
  multiple = false,
  border_color = '#3B3B3B',
  padding = '0.30rem',
  truncationLimit = 20, // Truncation limit, default to 20 characters
  maxWidth = '300px' // Set a default max width for the select box
}) {
  const CustomFormControl = styled(FormControl)(() => ({
    '& .MuiInputBase-root': {
      borderRadius: '0.27rem',
      padding: padding,
      maxWidth: maxWidth, // Apply max-width to prevent it from growing too much
      overflow: 'hidden',
      textOverflow: 'ellipsis', // Ensure truncation with ellipsis for long text
      whiteSpace: 'nowrap'
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: border_color
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: border_color
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: light.signinbtnbackground
    },
    '& .MuiSelect-select': {
      padding: '0.25rem 0.45rem'
    }
  }))

  const handleChange = (event) => {
    const {
      target: { value }
    } = event

    // We get IDs from the selected value array
    const selectedIds = Array.isArray(value) ? value : [value]

    // Pass the selected IDs array to onChange
    onChange(selectedIds)
  }

  const truncateText = (text) => {
    if (text.length > truncationLimit) {
      return text.substring(0, truncationLimit) + '...'
    }
    return text
  }

  return (
    <div className="flex flex-col items-start">
      {top_title && (
        <CustomText
          secondaryfontsize
          secondaryfontweight
          content={top_title}
          className="mb-3"
        />
      )}
      <CustomFormControl variant="outlined" className="w-full">
        <Select
          multiple={multiple}
          value={selectedValue} // Make sure selectedValue is an array of IDs
          displayEmpty
          onOpen={onOpen}
          onChange={handleChange} // Ensure the handler passes only IDs
          renderValue={(selected) => {
            if (selected.length === 0) {
              return 'Choose a category' // Default placeholder text
            }

            // Map through selected IDs and display the corresponding names
            const displayText = selected
              .map((id) => {
                const item = option_data.find((option) => option.id === id)
                return item ? truncateText(`${item.name}`) : null
              })
              .filter(Boolean)
              .join(', ')

            // Truncate the whole display text if it exceeds the width
            return displayText.length > truncationLimit
              ? truncateText(displayText)
              : displayText
          }}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: '300px'
              }
            }
          }}
        >
          <MenuItem disabled value="">
            <em>Choose a category</em> {/* Default option */}
          </MenuItem>
          {option_data.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {content_destruct ? (
                content_destruct(item)
              ) : (
                <CustomText content={item.name} />
              )}
            </MenuItem>
          ))}
        </Select>
      </CustomFormControl>
    </div>
  )
}
