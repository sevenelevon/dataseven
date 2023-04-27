import { useState } from "react";

import {FormControl, InputLabel, MenuItem, FormHelperText, TextField} from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftInput from "components/SoftInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import PropTypes from "prop-types";

function SoftSelect({ onChange, selectedCityValue }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  const cities = [
    { value: "https://hh.ru/", label: "Москва", countryCode: "test" },
    { value: "https://spb.hh.ru/", label: "Санкт-Петербург", countryCode: "test" },
    { value: "https://vladivostok.hh.ru/", label: "Владивосток", countryCode: "s" },
    { value: "https://volgograd.hh.ru/", label: "Волгоград", countryCode: "s" },
    { value: "https://voronezh.hh.ru/", label: "Воронеж", countryCode: "" },
    { value: "https://ekaterinburg.hh.ru/", label: "Екатеринбург", countryCode: "" },
    { value: "https://kazan.hh.ru/", label: "Казань", countryCode: "" },
    { value: "https://krasnodar.hh.ru/", label: "Краснодар", countryCode: "" },
    { value: "https://krasnoyarsk.hh.ru/", label: "Красноярск", countryCode: "" },
    { value: "https://nn.hh.ru/", label: "Нижний Новгород", countryCode: "" },
  ];


  const filteredCities = cities.filter((city) =>
    city.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select value={selectedCityValue} onChange={onChange} displayEmpty>
        <SoftBox mb={2}>
          <SoftInput
            type="text"
            placeholder="Найти город"
            multiline
            onChange={handleSearchChange}
          />
        </SoftBox>
        <MenuItem value="" >
          <em>
            Город &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; .
          </em>
        </MenuItem>
        {filteredCities.map((city) => (
        <MenuItem key={city.value} value={city.value} data-country-code={city.countryCode}>{city.label} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </MenuItem>
        ))}
        </Select>
      <FormHelperText>Выберите город для парсинга</FormHelperText>
    </FormControl>
  );
}

SoftSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  selectedCityValue: PropTypes.string.isRequired,
};

export default SoftSelect;
