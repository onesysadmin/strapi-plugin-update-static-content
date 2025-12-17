import { useIntl } from 'react-intl';
import getTrad from '../utils/getTrad';

export default function useFormattedLabel(labelId: string) {
  const { formatMessage } = useIntl();
  return formatMessage({ id: getTrad(labelId) });
}
