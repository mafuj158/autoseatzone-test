
import countryData from "@/utils/countryAndStates.json";
import CheckoutInputWrapper from "@/components/common/CheckoutInputWrapper";
import LocationSelect from "@/components/checkout/LocationSelect";

const CountryStateCityPhone = ({
  countryField = "country",
  stateField = "state",
  cityField = "city",
  phoneField = "phone",
  register,
  errors = {},
  selectedCountry,
  selectedState,
  selectedCity,
  setSelectedState,
  setSelectedCity,
  setSelectedCountry,
}) => {
  // console.log("eeerrr",errors)
  const handleCountryChange = (countryName) => {
    const country = countryData.find((c) => c.name === countryName);
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity("");
  };

  const handleStateChange = (stateName) => {
    const state = selectedCountry?.states.find((s) => s.name === stateName);
    setSelectedState(state);
    setSelectedCity("");
  };

  const handleCityChange = (cityName) => {
    setSelectedCity(cityName);
  };

  return (
    <>
      {/* Country */}
      <LocationSelect
        label="Country"
        placeholder="Select Country"
        value={selectedCountry?.name}
        onChange={(val) => {
          handleCountryChange(val);
          register?.(countryField)?.onChange?.({ target: { value: val } });
        }}
        options={countryData}
      />

      {/* State */}
      <LocationSelect
        label="State"
        placeholder="Select State"
        value={selectedState?.name}
        onChange={(val) => {
          handleStateChange(val);
          register?.(stateField)?.onChange?.({ target: { value: val } });
        }}
        options={selectedCountry?.states || []}
        disabled={!selectedCountry}
      />

      {/* City */}
      <LocationSelect
        label="City"
        placeholder="Select City"
        value={selectedCity}
        onChange={(val) => {
          handleCityChange(val);
          register?.(cityField)?.onChange?.({ target: { value: val } });
        }}
        options={selectedState?.cities || []}
        disabled={!selectedState}
      />

      {/* Phone with Country Code */}
      <div className="flex gap-2 items-start">
        <div className="px-4 py-4 rounded-lg border border-[#AECBDF] bg-gray-100 text-base sm:text-lg min-w-[60px] text-center">
          +{selectedCountry?.phonecode || "00"}
        </div>
        <CheckoutInputWrapper
          name={phoneField}
          placeholder="Phone"
          register={register(phoneField, {
            required: "Phone is required",
          })}
          error={errors?.phone}
          disabled={!selectedCountry}
        />
      </div>
    </>
  );
};

export default CountryStateCityPhone;
