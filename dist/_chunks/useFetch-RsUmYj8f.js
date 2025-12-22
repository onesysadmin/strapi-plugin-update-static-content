"use strict";
const jsxRuntime = require("react/jsx-runtime");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const reactIntl = require("react-intl");
const index = require("./index-CgEJC2c0.js");
const admin = require("@strapi/strapi/admin");
const react = require("react");
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
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Root, { open: isOpen, onOpenChange: onToggleDialog, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Dialog.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Header, { children: title.defaultMessage }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "center", direction: "column", gap: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsx(icons.WarningCircle, { width: "24px", height: "24px", fill: "danger600" }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { id: "confirm-description", textAlign: "center", children: bodyText.defaultMessage })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Dialog.Footer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Cancel, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: onToggleDialog, children: "Cancel" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Action, { children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
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
const getTrad = (id) => `${index.pluginId}.${id}`;
function useFormattedLabel(labelId) {
  const { formatMessage } = reactIntl.useIntl();
  return formatMessage({ id: getTrad(labelId) });
}
function PageLoading() {
  const LOADING_MESSAGE = useFormattedLabel("loadingMsg");
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: LOADING_MESSAGE }) });
}
function useFetch(url) {
  const [data, setData] = react.useState({});
  const [isLoading, setIsLoading] = react.useState(true);
  const [refetch, setRefetch] = react.useState({});
  const { get } = admin.useFetchClient();
  function handleRefetch() {
    setRefetch({});
  }
  react.useEffect(() => {
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
exports.ConfirmDialog = ConfirmDialog;
exports.PageLoading = PageLoading;
exports.useFetch = useFetch;
exports.useFormattedLabel = useFormattedLabel;
