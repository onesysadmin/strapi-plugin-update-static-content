import { Button, Tr, Td, Typography } from '@strapi/design-system';
import { differenceInMilliseconds, formatRelative } from 'date-fns';
import { ExternalLink } from '@strapi/icons';
import Label from '../Label';

interface Props {
  id: number;
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
  conclusion,
  name,
  run_number,
  run_started_at,
  html_url,
  updated_at,
  created_at,
}: Props) {
  const isThereAConclusion = Boolean(conclusion);
  const msDiffResult = differenceInMilliseconds(new Date(updated_at), new Date(run_started_at));
  const mins = Math.floor(msDiffResult / 1000 / 60);
  const secs = (msDiffResult / 1000) % 60;
  const creationDate = formatRelative(new Date(created_at), new Date());

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
        <Button
          variant="ghost"
          tag="a"
          href={html_url}
          target="_blank"
          rel="noreferrer"
          startIcon={<ExternalLink />}
        />
      </Td>
    </Tr>
  );
}
