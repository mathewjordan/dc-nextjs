import {
  ActionButtons,
  TopInfoCollection,
  TopInfoContent,
  TopInfoWrapper,
} from "@/components//Work/TopInfo.styled";
import {
  Label,
  Metadata,
  RequiredStatement,
  Summary,
} from "@samvera/nectar-iiif";
import React, { MouseEvent } from "react";
import { Button } from "@nulib/design-system";
import Card from "@/components/Shared/Card";
import { DefinitionListWrapper } from "@/components/Shared/DefinitionList.styled";
import Expand from "@/components/Shared/Expand/Expand";
import { Manifest } from "@iiif/presentation-3";
import WorkActionsDialog from "@/components/Work/ActionsDialog/ActionsDialog";
import { WorkShape } from "@/types/components/works";

interface TopInfoProps {
  manifest?: Manifest;
  work: WorkShape;
}

export interface ActionsDialog {
  activeDialog: "CITE" | "DOWNLOAD" | "FIND" | undefined;
}

const WorkTopInfo: React.FC<TopInfoProps> = ({ manifest, work }) => {
  const [actionsDialog, setActionsDialog] = React.useState<ActionsDialog>({
    activeDialog: undefined,
  });

  if (!work) return null;
  if (!manifest) return <p>Error grabbing manifest</p>;

  const handleActionsButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.target as HTMLButtonElement;

    switch (button.name) {
      case "cite":
        setActionsDialog({ activeDialog: "CITE" });
        break;
      case "find":
        setActionsDialog({ activeDialog: "FIND" });
        break;
      case "download":
        setActionsDialog({ activeDialog: "DOWNLOAD" });
        break;
      default:
        break;
    }
  };

  return (
    <TopInfoWrapper>
      <header>
        <Label label={manifest.label} as="h1" data-testid="title" />
        {manifest?.summary && (
          <Summary summary={manifest.summary} as="p" data-testid="summary" />
        )}
        <ActionButtons>
          <Button
            name="find"
            onClick={handleActionsButtonClick}
            isLowercase
            isPrimary
          >
            Find this item
          </Button>
          <Button
            name="cite"
            onClick={handleActionsButtonClick}
            isLowercase
            isPrimary
          >
            Cite this item
          </Button>
          <Button
            name="download"
            onClick={handleActionsButtonClick}
            isLowercase
            isPrimary
          >
            Download and share
          </Button>
        </ActionButtons>

        <WorkActionsDialog
          actionsDialog={actionsDialog}
          close={() => setActionsDialog({ activeDialog: undefined })}
        />
      </header>
      <Expand initialHeight={600} buttonText="Show More">
        <TopInfoContent>
          <div data-testid="work-top-info-wrapper">
            <DefinitionListWrapper>
              {manifest?.metadata && (
                <Metadata metadata={manifest.metadata} data-testid="metadata" />
              )}
              {manifest?.requiredStatement && (
                <RequiredStatement
                  requiredStatement={manifest.requiredStatement}
                />
              )}
            </DefinitionListWrapper>
          </div>
          <TopInfoCollection>
            <h2>Collection</h2>
            <Card
              title={work.collection?.title}
              description="Cras mollis lorem sed nisi consequat aliquet. Mauris fringilla pretium nibh, ut laoreet mi luctus nec. Integer luctus urna sed nisi rhoncus mollis."
              href={`/collections/${work.collection?.id}`}
              imageUrl={work.thumbnail}
              supplementalInfo="678 Works"
            />
          </TopInfoCollection>
        </TopInfoContent>
      </Expand>
    </TopInfoWrapper>
  );
};

export default WorkTopInfo;
