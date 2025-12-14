import React from 'react';
import { Flex } from '@strapi/design-system';
import { Page } from '@strapi/strapi/admin';
import PageLoading from '../PageLoading';

const PADDING_X = 10;
const PADDING_Y = 2;

type Props = {
  children: React.ReactNode;
  baseHeaderLayout: JSX.Element;
  pageTitle: string;
  isLoading?: boolean;
};

export default function PageWrapper({ children, baseHeaderLayout, pageTitle, isLoading }: Props) {
  return (
    <>
      <Page.Title>{pageTitle}</Page.Title>
      {baseHeaderLayout}
      <Flex
        direction="column"
        paddingRight={PADDING_X}
        paddingLeft={PADDING_X}
        paddingTop={PADDING_Y}
        paddingBottom={PADDING_Y}
        width="100%"
        overflow="auto"
      >
        {isLoading ? <PageLoading /> : children}
      </Flex>
    </>
  );
}
