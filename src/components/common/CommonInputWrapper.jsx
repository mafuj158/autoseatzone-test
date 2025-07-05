import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { Select } from "antd";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";
import ErrorText from "./ErrorText";

const CommonInputWrapper = ({
  wrapperClass,
  inputClass,
  labeClass,
  selectClass,
  textareaClass,
  label = "",
  type = "text",
  placeholder = "",
  name = "",
  register,
  options = [],
  errors = {},
  validationRules = {},
  readOnly = false,
  value = "",
  control,
  selectMode = "single",
  isEdit = false,
}) => {
  const [show, setShow] = useState(false);
  const errorMessage = errors[name]?.message;
  const isMultiple = selectMode === "multiple" || selectMode === "tags";

  return (
    <div className={cn("w-full flex flex-col gap-2 justify-start items-start relative text-base text-white", wrapperClass)}>
      {/* Label */}
      {label && <label className={cn("capitalize text-sm lg:text-base font-medium", labeClass)} htmlFor={name}>{label}</label>}

      {/* Input Wrapper for Eye Icon */}
      {type === "password" ? (
        <div className="relative w-full">
          <input
            type={show ? "text" : "password"}
            id={name}
            placeholder={placeholder}
            name={name}
            defaultValue={value}
            readOnly={readOnly}
            className={cn(
              "w-full text-lg placeholder:text-base font-medium placeholder:font-normal px-2 lg:px-4 py-3 lg:py-5 rounded-[8px] border-[0.6px] border-[#979BA1] bg-[rgba(255,255,255,0.09)] backdrop-blur-[12px] placeholder-white outline-none text-white shadow-input border-dark",
              inputClass
            )}
            {...register(name, validationRules)}
          />
          <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white"
          >
            {show ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>
      ) : type === "textarea" ? (
        <textarea
          id={name}
          placeholder={placeholder}
          name={name}
          defaultValue={value}
          className={cn("w-full resize-none min-h-48 px-4 py-5 rounded-lg placeholder-[#5A5C5F] outline-none text-white border border-dark shadow-input bg-[rgba(255,255,255,0.05)]", textareaClass)}
          {...register(name, validationRules)}
        />
      ) : type === "select" ? (
        <Controller
          control={control}
          name={name}
          rules={validationRules}
          render={({ field }) => (
            <Select
              {...field}
              mode={selectMode !== "single" ? selectMode : undefined}
              placeholder={placeholder}
              options={options}
              optionFilterProp="label"
              value={field.value || (isMultiple ? [] : undefined)}
              className={cn("w-full min-h-[50px] rounded-lg common_input_select placeholder:text-dark text-white border border-dark shadow-input bg-[rgba(255,255,255,0.05)]", selectClass)}
              showSearch
              allowClear
            />
          )}
        />
      ) : (
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          name={name}
          defaultValue={value}
          readOnly={readOnly}
          className={cn(
            "w-full text-lg placeholder:text-base font-medium placeholder:font-normal px-2 lg:px-4 py-3 lg:py-5 rounded-[8px] border-[0.6px] border-[#979BA1] bg-[rgba(255,255,255,0.09)] backdrop-blur-[12px] placeholder-white outline-none text-white shadow-input border-dark",
            inputClass
          )}
          {...register(name, validationRules)}
        />
      )}

      {/* Error Message */}
      {errorMessage && <ErrorText error={errorMessage} />}
    </div>
  );
};

export default CommonInputWrapper;
