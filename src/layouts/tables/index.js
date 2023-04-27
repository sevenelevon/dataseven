/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useState } from "react";
import io from 'socket.io-client';
import api from "api/axios";
import { socketURL } from "api/socket";
// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftPagination from "components/SoftPagination";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftSelect from "components/SoftSelect";
import { Grid } from "@mui/material";
// Data
import Icon from "@mui/material/Icon";
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import Cookies from "js-cookie";

const PAGE_SIZE = 10;



function Tables() {
  const [socket, setSocket] = useState(null);
  const [scoketError, setSocketError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [buttonText, setButtonText] = useState("Начать парсинг");
  const [buttonState, setButtonState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState("");
  const [selectedCityValue, setSelectedCityValue] = useState("");
  const [parse, setParse] = useState("");
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [abortController, setAbortController] = useState(null);
  const limit = 10;

  
  const cookie = parseInt(Cookies.get("id"), 10);

  useEffect(() => {
    const newSocket = io(socketURL);
    setSocket(newSocket)
  }, []);

  useEffect(() => {
    if (socket) {
      socket.emit("get-status", { userId: cookie }); 
  
      socket.on("status", ({ status }) => {
        setButtonLoading(status.status);
      });
      
      let interval = null;
      if (buttonLoading === "loading") {
        interval = setInterval(() => {
          socket.emit("get-status", { userId: cookie });
        }, 3000);
      }
  
      return () => {
        socket.off("status");
        clearInterval(interval);
      };
    }
  }, [socket, userId, buttonLoading])

  useEffect(() => {
    api
      .get(`/scrape?userId=${cookie}&page=${currentPage}&pageSize=${limit}`)
      .then((response) => {
        setCompanies(response.data.company.userCompanies.companies);
        setTotalPages(response.data.company.compaiesDataTotal.pagination.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage, limit]);
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDeleteCompany = () => {
    api.delete(`/scrape/delete?userId=${cookie}`);
    window.location.reload();
  };

  const handleCityValueChange = (event) => {
    setSelectedCityValue(event.target.value);
  };

  const handleInstallCsv = () => {
    api
      .get(`/download-xlsx?userId=${cookie}`, { responseType: "blob" })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "data-company.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Error downloading XLSX:", error);
      });
  };

  const handleStop = () => {
    socket.emit("close-parse", ({ userId: cookie }))
    if (abortController) {
      abortController.abort();
    }
    setButtonLoading(false);
    setButtonText("Начать парсинг");
  };
  
  const handleSubmitParse = async (event) => {
    event.preventDefault();
    if (!selectedCityValue) {
      alert("Выберите город для парсинга.");
      return;
    }
    if (!parse) {
      alert("Напишите хотябы одно ключевое слово.");
      return;
    }
    try {
      const newAbortController = new AbortController();
      setAbortController(newAbortController);  
      setButtonLoading("loading");
      socket.emit("scrape", {url: `${selectedCityValue}search/vacancy?text=${encodeURIComponent(parse)}`, userId: cookie, signal: newAbortController.signal})
    } catch (error) {
      console.error(error);
      setButtonLoading(false);
      setButtonText("Ошибка");
    }
  };

  useEffect(() => {
    if (buttonLoading === "loading") {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
  }, [buttonLoading]);

  const { columns } = authorsTableData;
  let index = 1;
  const rows = companies.map((company) => ({
    id: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {index++}
      </SoftTypography>
    ),
    name: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {company.nameCompany}
      </SoftTypography>
    ),
    site: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {company.site}
      </SoftTypography>
    ),
    city: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {company.city}
      </SoftTypography>
    ),
    activity: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {company.activeCompany}
      </SoftTypography>
    ),
    email: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {company.email}
      </SoftTypography>
    ),
    phone: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {company.phone}
      </SoftTypography>
    ),
    ooo: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {company.nameOOO}
      </SoftTypography>
    ),
    OGRN: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {company.OGRN}
      </SoftTypography>
    ),
    INNKPP: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {company.INNKPP}
      </SoftTypography>
    ),
    capital: (
      <SoftTypography variant="caption" color>
        {company.capital}
      </SoftTypography>
    ),
    manager: (
      <SoftTypography variant="caption" color>
        {company.GeneralManager}
      </SoftTypography>
    ),
    cash: (
      <SoftTypography variant="caption" color>
        {company.revenue}
      </SoftTypography>
    ),
  }));

  const { columns: prCols, rows: prRows } = projectsTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
        <SoftBox component="form" role="form">
          <SoftBox mb={2}>
            <SoftSelect onChange={handleCityValueChange} selectedCityValue={selectedCityValue} />
          </SoftBox>
          <SoftBox mb={2}>
            <SoftInput
              type="text"
              placeholder="Напишите через запятую ключевые слова (Например: разработка)"
              multiline
              rows={5}
              onChange={(e) => setParse(e.target.value)}
            />
          </SoftBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <SoftBox mb={2}>
                <SoftButton
                  onClick={buttonLoading == "loading" ? handleStop : handleSubmitParse}
                  variant="gradient"
                  color={buttonLoading == "loading" ? "error" : "info"}
                >
                  {buttonLoading == "loading" ? "Остановить" : buttonText}
                </SoftButton>
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <SoftBox mb={2}>
                  <SoftButton onClick={handleDeleteCompany} variant="gradient" color="error">
                    Удалить данные
                  </SoftButton>
                </SoftBox>
              </Grid>
              <Grid item xs={12} md={6} xl={3}>
                <SoftBox mb={2}>
                  <SoftButton onClick={handleInstallCsv} variant="gradient" color="success">
                    Скачать CSV
                  </SoftButton>
                </SoftBox>
              </Grid>
            </Grid>
          </SoftBox>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Данные о компаниях</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftPagination size="small">
            <SoftPagination onClick={handlePrevClick} item>
              <Icon>keyboard_arrow_left</Icon>
            </SoftPagination>
            {Array.from({ length: Math.min(totalPages, 4) }, (_, i) => {
              if (currentPage <= 2) {
                return i + 1;
              } else if (currentPage >= totalPages - 1) {
                return totalPages - (3 - i);
              } else {
                return currentPage - 2 + i;
              }
            }).map((page) => (
              <SoftPagination
                key={page}
                item
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </SoftPagination>
            ))}
            <SoftPagination onClick={handleNextClick} item>
              <Icon>keyboard_arrow_right</Icon>
            </SoftPagination>
          </SoftPagination>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
