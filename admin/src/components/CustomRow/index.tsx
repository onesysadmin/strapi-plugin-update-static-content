import { useState } from 'react';
import { Button, Flex, Tr, Td, Typography } from '@strapi/design-system';
import { differenceInMilliseconds, formatRelative } from 'date-fns';
import { Eye, ExternalLink } from '@strapi/icons';
import Label from '../Label';
import { pluginId } from '../../pluginId';
import { useFetchClient } from '@strapi/strapi/admin';

interface Props {
  id: number;
  workflowId: string;
  conclusion: 'success' | 'failure';
  name: string;
  run_number: number;
  run_started_at: string;
  html_url: string;
  updated_at: string;
  created_at: string;
}

export default function CustomRow({
  id,
  workflowId,
  conclusion,
  name,
  run_number,
  run_started_at,
  html_url,
  updated_at,
  created_at,
}: Props) {
  const { get } = useFetchClient();
  const isThereAConclusion = Boolean(conclusion);
  const [disabledLogsButton, setDisabledLogsButton] = useState(isThereAConclusion ? false : true);
  const msDiffResult = differenceInMilliseconds(new Date(updated_at), new Date(run_started_at));
  const mins = Math.floor(msDiffResult / 1000 / 60);
  const secs = (msDiffResult / 1000) % 60;
  const creationDate = formatRelative(new Date(created_at), new Date());

  async function logsHandler(jobId: number) {
    setDisabledLogsButton(true);
    try {
      const response = await get(`/${pluginId}/github-actions-jobs-log/${workflowId}`, {
        params: {
          jobId,
        },
      });
      const logsUrl = response.data?.url;
      if (typeof logsUrl === 'string' && logsUrl.startsWith('http')) {
        window.open(logsUrl, '_blank');
      } else {
        console.error('Invalid logs URL received:', response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDisabledLogsButton(false);
    }
  }

  return (
    <Tr key={id}>
      <Td>
        <Typography textColor="neutral800">{run_number}</Typography>
      </Td>
      <Td>
        <Typography textColor="neutral800">{name}</Typography>
      </Td>
      <Td>{conclusion ? Label(conclusion) : <Typography textColor="neutral800">-</Typography>}</Td>
      <Td>
        <Typography textColor="neutral800">{creationDate}</Typography>
      </Td>
      <Td>
        <Typography textColor="neutral800">
          {!isThereAConclusion ? 'in progress' : `${mins ? mins + 'm' : ''} ${secs}s`}
        </Typography>
      </Td>
      <Td>
        <Flex gap={1}>
          <Button
            variant="ghost"
            disabled={disabledLogsButton}
            onClick={() => logsHandler(id)}
            startIcon={<Eye />}
          />
          <Button
            variant="ghost"
            tag="a"
            href={html_url}
            target="_blank"
            rel="noreferrer"
            startIcon={<ExternalLink />}
          />
        </Flex>
      </Td>
    </Tr>
  );
}
