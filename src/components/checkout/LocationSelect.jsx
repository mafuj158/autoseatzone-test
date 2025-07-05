import React from "react";
import { Select } from "antd";

const { Option } = Select;

const LocationSelect = ({
  label,
  placeholder,
  value,
  onChange,
  options = [],
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="font-medium text-base">{label}</label>}
      <Select
        placeholder={placeholder}
        onChange={onChange}
        value={value || undefined}
        disabled={disabled}
        className="!h-16 custom-country-input"
      >
        {options.map((opt) => (
          <Option key={opt.id} value={opt.name}>
            {opt.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default LocationSelect;
