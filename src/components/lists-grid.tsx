import React from "react";
import ListCard from "./list-card";
import { ListSummary } from "../types/list-summary";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

type Props = {
  lists: ListSummary[];
  title: string;
  onClick: (list: ListSummary) => void;
};

const ListsGrid: React.FC<Props> = ({ lists, title, onClick }) => {
  return (
    <div className="my-3">
      <h1 className="fs-4 mb-3 mt-2">{title}</h1>
      <Row>
        {lists.map((list) => (
          <Col key={list._id} className="mb-4 col-3">
            <ListCard list={list} onClick={() => onClick(list)} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ListsGrid;
