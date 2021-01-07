import React from "react";
import { Button } from "react-bootstrap";

const Pagination = ({ paginationObj, setPage, page }) => {
  return (
    <>
      <>
        <Button
          size="sm"
          variant="light"
          disabled={!paginationObj.prev}
          onClick={() => setPage(page - 1)}
        >
          <i class="fas fa-arrow-left"></i>
        </Button>{" "}
        <Button
          variant="light"
          size="sm"
          disabled={!paginationObj.next}
          onClick={() => setPage(page + 1)}
        >
          <i class="fas fa-arrow-right"></i>
        </Button>
      </>
    </>
  );
};

export default Pagination;
