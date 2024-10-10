
import { configuratorOptions as options } from '@/constants'
import { formatSize } from '@/utils/format';
import { CartItemsType } from '@/lib/supabase/database';

export const parseConfigurationDetails = (
  configuration: CartItemsType[0]['configuration'][0]
) => [
  {
    label: 'Orientation',
    value: options.orientation.find(
      option => option.id === Number(configuration?.orientation)
    )?.label,
  },
  {
    label: 'Size',
    value: formatSize(configuration?.size),
  },
  {
    label: 'Remove background',
    value: options.removeBackground.find(
      option => option.id === Number(configuration?.remove_bg)
    )?.label,
  },

  {
    label: 'Edit details',
    value: configuration?.edit_details,
  },
  {
    label: 'Preview',
    value: options.wantsPreview.find(
      option => option.id === Number(configuration?.wants_preview)
    )?.label,
  },
];
