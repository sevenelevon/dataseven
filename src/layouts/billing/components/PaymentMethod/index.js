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
import { useState } from "react";
import api from "api/axios";
import Cookies from "js-cookie";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftAlert from "components/SoftAlert";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import SoftInput from "components/SoftInput";
// Soft UI Dashboard React base styles
import borders from "assets/theme/base/borders";

// Images
import masterCardLogo from "assets/images/logos/mastercard.png";
import visaLogo from "assets/images/logos/visa.png";

function PaymentMethod() {
  const [userId, setUserId] = useState("");
  const [text, setText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const idCookie = Cookies.get("id");
  const intId = parseInt(idCookie);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/comments", {
        userId: intId,
        text,
      });
      setText("")
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const { borderWidth, borderColor } = borders;

  return (
    <Card id="delete-account">
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <WorkWithTheRockets />
      </SoftBox>
      <SoftBox component="form" role="form" p={2} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SoftBox
              borderRadius="lg"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SoftInput
                placeholder="Напишите коментарий..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </SoftBox>
          </Grid>

          <Grid item xs={12} md={6}>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftButton variant="gradient" color="dark" type="none">
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;Добавить пожелание
              </SoftButton>
            </SoftBox>
          </Grid>
        </Grid>
        {isSubmitted && <SoftAlert>Комментарий Ок!</SoftAlert>}
      </SoftBox>
    </Card>
  );
}

export default PaymentMethod;
