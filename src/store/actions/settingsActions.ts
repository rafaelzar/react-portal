import errorHandler from '../../lib/utils/errorHandler';
import { uploadEmployeePhoto, deleteEmployeePhoto } from '../apiCalls';
import { AppDispatch } from '../store';

export function uploadEmployeePhotoAction(id: string, photo: Blob) {
  return async (dispatch: AppDispatch): Promise<boolean | undefined> => {
    try {
      const res = await uploadEmployeePhoto(id, photo);
      const updatedUser = res?.data || {};
      if (updatedUser?._id) {
        dispatch({ type: 'UPDATE_USER', user: updatedUser });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      errorHandler(error);
      return false;
    }
  };
}

export function deleteEmployeePhotoAction(id: string) {
  return async (dispatch: AppDispatch): Promise<boolean | undefined> => {
    try {
      const res = await deleteEmployeePhoto(id);
      const updatedUser = res?.data || {};
      if (updatedUser?._id) {
        dispatch({ type: 'UPDATE_USER', user: updatedUser });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      errorHandler(error);
      return false;
    }
  };
}
