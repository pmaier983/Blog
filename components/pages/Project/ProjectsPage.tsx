import React from "react"

import { CardGridWrapper } from "../../CardGridWrapper"
import { ConfirmationPopup } from "../../ConfirmationPopup"
import { ScrollNavPage } from "../ScrollNavPage"
import { ProjectOutline } from "./project-typings"
import { ProjectCard } from "./ProjectCard"

/*
  A wrapper of the BlogPage that puts the confirmation Popup in place
*/
export const ProjectsPage: React.FC<{ projects: ProjectOutline[] }> = ({
  projects,
}) => (
  <ScrollNavPage>
    <ConfirmationPopup />
    <CardGridWrapper CardComponent={ProjectCard} cards={projects} />
  </ScrollNavPage>
)
