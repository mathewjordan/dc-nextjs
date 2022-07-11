import { GetStaticPropsContext, NextPage } from "next";
import { getWork, getWorkIds } from "@/lib/work-helpers";
import Container from "@/components/Shared/Container";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/Shared/ErrorFallback";
import Layout from "components/layout";
import { Manifest } from "@iiif/presentation-3";
import React from "react";
import RelatedItems from "@/components/Shared/RelatedItems";
import { WorkShape } from "@/types/components/works";
import WorkTopInfo from "@/components/Work/TopInfo";
import WorkViewerWrapper from "@/components/Work/ViewerWrapper";
import { buildPres3Manifest } from "@/lib/iiif/manifest-helpers";

interface WorkPageProps {
  manifest?: Manifest;
  related?: string[];
  work: WorkShape;
}

const WorkPage: NextPage<WorkPageProps> = ({ manifest, related, work }) => {
  return (
    <Layout>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {work && (
          <>
            <WorkViewerWrapper manifestId={work.iiif_manifest} />
            <Container>
              <WorkTopInfo manifest={manifest} work={work} />
              <RelatedItems collections={related} title="Explore Further" />
            </Container>
          </>
        )}
        {!work && (
          <p style={{ padding: "2rem", textAlign: "center" }}>
            Likely JSON error in the Work API response
          </p>
        )}
      </ErrorBoundary>
    </Layout>
  );
};

export async function getStaticPaths() {
  const workIds = await getWorkIds();
  const paths = workIds.map((id) => ({ params: { id } }));

  return {
    fallback: "blocking",
    paths,
  };
}

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const work = params?.id ? await getWork(params.id as string) : null;
  const manifest = work ? await buildPres3Manifest(work) : null;

  /**
   * @todo: replace these hardcoded URIs with a method to get related collection URIs
   */
  const related = [
    "http://localhost:3000/fixtures/iiif/collection/masks.json",
    "http://localhost:3000/fixtures/iiif/collection/football.json",
  ];

  return {
    props: { manifest, related, work },
    revalidate: 10, // In seconds
  };
}

export default WorkPage;
