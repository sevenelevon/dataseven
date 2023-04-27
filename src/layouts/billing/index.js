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

// @mui material components
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import api from "api/axios";
import sendMessage from "api/telegramApi";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftAlert from "components/SoftAlert";
// Soft UI Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import SoftInput from "components/SoftInput";
import Icon from "@mui/material/Icon";
import SoftButton from "components/SoftButton";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";

function Billing() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    sendMessage(email, phone, message);
    setIsSubmitted(true);
    setEmail("")
    setPhone("")
    setMessage("")
    setTimeout(() => {
      
      setIsSubmitted(false);
    }, 3000);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mt={4}>
        <SoftBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <SoftBox component="form" role="form" onSubmit={handleSubmit}>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="email"
                        placeholder="Email"
                        size="small"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="text"
                        placeholder="Телефон"
                        size="small"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                        required
                      />
                    </SoftBox>
                    <SoftBox mb={2}>
                      <SoftInput
                        type="text"
                        placeholder="Какую разработку вы хотите?"
                        multiline
                        rows={5}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        required
                      />
                    </SoftBox>
                    <SoftBox
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      p={3}
                    >
                      <SoftButton variant="gradient" color="dark" type="none">
                        <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                        &nbsp;Заказать разработку
                      </SoftButton>
                    </SoftBox>
                    {isSubmitted && <SoftAlert>Сообщение успешно отправлено!</SoftAlert>}
                  </SoftBox>
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="Сбор данных"
                    description="Вы можете заказать автоматизацию, парсинг и CRM"
                    value="Договримся!"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="paypal"
                    title="Продуктовая разработка"
                    description="Мы реализуем всё (продукты, сложную логику и т.п.)"
                    value="Отправьте проект"
                  />
                </Grid>
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Invoices />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox my={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
