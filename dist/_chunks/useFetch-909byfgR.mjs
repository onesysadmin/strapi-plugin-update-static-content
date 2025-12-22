import { jsx, jsxs } from "react/jsx-runtime";
import { Dialog, Flex, Typography, Button, Loader } from "@strapi/design-system";
import { WarningCircle } from "@strapi/icons";
import { useIntl } from "react-intl";
import { p as pluginId } from "./index-BI8MKahP.mjs";
import { useFetchClient } from "@strapi/strapi/admin";
import { useState, useEffect } from "react";
function ConfirmDialog({
  onToggleDialog,
  onConfirm,
  isOpen,
  bodyText,
  title,
  rightButtonText,
  variantRightButton = "danger-light",
  iconRightButton
}) {
  const handleConfirm = () => {
    onConfirm();
  };
  return /* @__PURE__ */ jsx(Dialog.Root, { open: isOpen, onOpenChange: onToggleDialog, children: /* @__PURE__ */ jsxs(Dialog.Content, { children: [
    /* @__PURE__ */ jsx(Dialog.Header, { children: title.defaultMessage }),
    /* @__PURE__ */ jsx(Dialog.Body, { children: /* @__PURE__ */ jsxs(Flex, { justifyContent: "center", direction: "column", gap: 2, children: [
      /* @__PURE__ */ jsx(WarningCircle, { width: "24px", height: "24px", fill: "danger600" }),
      /* @__PURE__ */ jsx(Typography, { id: "confirm-description", textAlign: "center", children: bodyText.defaultMessage })
    ] }) }),
    /* @__PURE__ */ jsxs(Dialog.Footer, { children: [
      /* @__PURE__ */ jsx(Dialog.Cancel, { children: /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: onToggleDialog, children: "Cancel" }) }),
      /* @__PURE__ */ jsx(Dialog.Action, { children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: variantRightButton,
          onClick: handleConfirm,
          startIcon: iconRightButton,
          children: rightButtonText?.defaultMessage || "Confirm"
        }
      ) })
    ] })
  ] }) });
}
const getTrad = (id) => `${pluginId}.${id}`;
function useFormattedLabel(labelId) {
  const { formatMessage } = useIntl();
  return formatMessage({ id: getTrad(labelId) });
}
function PageLoading() {
  const LOADING_MESSAGE = useFormattedLabel("loadingMsg");
  return /* @__PURE__ */ jsx(Flex, { justifyContent: "center", children: /* @__PURE__ */ jsx(Loader, { children: LOADING_MESSAGE }) });
}
function useFetch(url) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [refetch, setRefetch] = useState({});
  const { get } = useFetchClient();
  function handleRefetch() {
    setRefetch({});
  }
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;
    (async function fetch() {
      setIsLoading(true);
      try {
        const response = await get(url, { signal });
        setData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [refetch, url]);
  return [data, isLoading, handleRefetch];
}
export {
  ConfirmDialog as C,
  PageLoading as P,
  useFormattedLabel as a,
  useFetch as u
};
