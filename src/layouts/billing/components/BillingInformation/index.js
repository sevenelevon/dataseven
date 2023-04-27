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
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import api from "api/axios";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftPagination from "components/SoftPagination";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import Icon from "@mui/material/Icon";

function BillingInformation() {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    api
      .get(`/comments/one/?page=${currentPage}&pageSize=${limit}`)
      .then((response) => {
        setComments(response.data.comments);
        setTotalPages(response.data.commentsDataTotal.pagination.totalPages);
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

  return (
    <Card id="delete-account">
      <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Разговоры о дальнейшем росте
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1} pb={2} px={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {comments.map((comment) => (
            <Bill
              key={comment.id}
              name={comment.user.username}
              company={new Date(comment.createdAt).toLocaleString()}
              email={comment.text}
            />
          ))}
        </SoftBox>
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
    </Card>
  );
}

export default BillingInformation;
