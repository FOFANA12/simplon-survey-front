import Swal from "sweetalert2";
import i18n from "@/i18n";

export const useSwalAlerte = () => {
  const primaryColor = "#c36d27";

  const showSimpleAlerte = ({
    position = "top-end",
    icon = "info",
    text = "",
    timer = window.swalDefaultTimer || 3000,
  } = {}) => {
    return Swal.fire({
      position,
      icon,
      text,
      showConfirmButton: false,
      timer,
    });
  };

  const showConfirm = ({
    title = i18n.global.t("common.sweetalert.showConfirm.title"),
    icon = "warning",
    message = i18n.global.t("common.sweetalert.showConfirm.message"),
    confirmButtonText = i18n.global.t(
      "common.sweetalert.showConfirm.confirmButtonText"
    ),
    cancelButtonText = i18n.global.t(
      "common.sweetalert.showConfirm.cancelButtonText"
    ),
    confirmButtonColor = primaryColor,
    cancelButtonColor = "#d33",
  } = {}) => {
    return Swal.fire({
      title,
      icon,
      text: message,
      showCancelButton: true,
      allowOutsideClick: false,
      reverseButtons: true,
      cancelButtonColor,
      confirmButtonColor,
      confirmButtonText,
      cancelButtonText,
      customClass: {
        confirmButton:
          "bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600",
        cancelButton:
          "bg-gray-300 text-gray-800 py-2 px-3 rounded-lg hover:bg-gray-400 text-white",
        popup: "w-[500px] md:w-[500px] lg:w-[500px] max-w-full",
      },
    });
  };

  const showConfirmValidation = ({
    title = i18n.global.t("common.sweetalert.showConfirmValidation.title"),
    icon = "warning",
    message = i18n.global.t("common.sweetalert.showConfirmValidation.message"),
    confirmButtonText = i18n.global.t(
      "common.sweetalert.showConfirmValidation.confirmButtonText"
    ),
    cancelButtonText = i18n.global.t(
      "common.sweetalert.showConfirmValidation.cancelButtonText"
    ),
    confirmButtonColor = primaryColor,
    cancelButtonColor = "#d33",
  } = {}) => {
    return Swal.fire({
      title,
      icon,
      text: message,
      showCancelButton: true,
      allowOutsideClick: false,
      reverseButtons: true,
      cancelButtonColor,
      confirmButtonColor,
      confirmButtonText,
      cancelButtonText,
    });
  };

  const showErrorModal = ({
    title = i18n.global.t("common.sweetalert.showErrorModal.title"),
    message = i18n.global.t("common.sweetalert.showErrorModal.message"),
    confirmButtonText = i18n.global.t(
      "common.sweetalert.showErrorModal.confirmButtonText"
    ),
    confirmButtonColor = primaryColor,
  } = {}) => {
    return Swal.fire({
      title,
      icon: "error",
      text: message,
      showConfirmButton: true,
      confirmButtonText,
      confirmButtonColor,
      allowOutsideClick: false,
      customClass: {
        confirmButton:
          "bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600",
        popup: "w-[500px] md:w-[500px] lg:w-[500px] max-w-full",
      },
    });
  };

  return {
    showSimpleAlerte,
    showConfirm,
    showConfirmValidation,
    showErrorModal,
  };
};
