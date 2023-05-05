import { ListSummary } from "../types/list-summary";
import { Badge, Card } from "react-bootstrap";

interface ListCardProps {
  list: ListSummary;
  onClick: () => void;
}

const ListCard: React.FC<ListCardProps> = ({ list, onClick }) => {
  const ownerName = list.owner.split("@")[0];

  const cardStyle = {
    width: "18rem",
    minHeight: "10rem",
  };

  return (
    <Card
      className="cursor-pointer shadow-hover"
      style={cardStyle}
      onClick={onClick}
    >
      <Card.Header className="bg-transparent">{list.name}</Card.Header>
      <Card.Body>
        <Badge bg="light" text="dark">
          Creado por: {ownerName}
        </Badge>
        {list.users && list.users.length > 0 && (
          <Badge bg="light" text="dark">
            Usuarios compartidos: {list.users.length}
          </Badge>
        )}
      </Card.Body>
    </Card>
  );
};

export default ListCard;
