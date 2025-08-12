import React from "react";
import KanbanBoardComponent from "../components/KanbanBoard";
import { PageTransition } from "@/components/PageTransition";

const KanbanBoard = () => {
  return (
    <PageTransition>
      <div className="p-4">
        <h1 className="text-4xl font-bold mb-4 text-[#841618]">
          Project Tracker🚀
        </h1>
        <KanbanBoardComponent />
      </div>
    </PageTransition>
  );
};

export default KanbanBoard;
