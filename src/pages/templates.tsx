import React from "react";
import ListsGrid from "../components/lists-grid";
import { ListSummary } from "../types/list-summary";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader";
import { useGetTemplates } from "../hooks/api/template";

const Templates = () => {
  const navigate = useNavigate();
  const { responseData: templates, loading, error } = useGetTemplates();

  const handleOpenTemplate = (template: ListSummary) => {
    navigate(`/templates/${template._id}`);
  };

  if (loading || error) {
    return (
      <Loader
        loading={loading}
        error={error}
        isEmpty={!templates}
        emptyState={
          <>EmptyState - Es raro pero no hay plantillas para mostrar</>
        }
      />
    );
  }

  return (
    <>
      <h1 className="text-2xl font-light text-gray-900 my-5">Plantillas</h1>
      <ListsGrid lists={templates ?? []} onOpenList={handleOpenTemplate} />
    </>
  );
};

export default Templates;
