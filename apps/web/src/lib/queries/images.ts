import { createMutation } from 'react-query-kit';
import { uploadImage } from '../utils';

export const useImageUploadMutation = createMutation({
  mutationKey: ['image-upload'],
  mutationFn: uploadImage,
});
