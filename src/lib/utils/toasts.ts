import Swal from 'sweetalert2';

export const swalSuccess = (param: string): void => {
  Swal.fire({
    title: 'Success',
    text: param,
    toast: true,
    icon: 'success',
    position: 'top-right',
    timer: 4000,
    showConfirmButton: false,
  });
};

export const swalError = (param: string): void => {
  Swal.fire({
    title: 'Error',
    text: param,
    toast: true,
    icon: 'warning',
    position: 'top-right',
    timer: 4000,
    showConfirmButton: false,
  });
};

export const swalInfo = (param: string): void => {
  Swal.fire({
    title: 'Info',
    text: param,
    toast: true,
    icon: 'info',
    position: 'top-right',
    timer: 4000,
    showConfirmButton: false,
  });
};
