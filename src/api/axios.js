import axios from "axios";
import React from "react";

  const api = axios.create({
    baseURL: `https://dataseven.ru/api/`
  });

export default api;
