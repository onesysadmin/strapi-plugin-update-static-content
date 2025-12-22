"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const designSystem = require("@strapi/design-system");
const symbols = require("@strapi/icons/symbols");
const admin = require("@strapi/strapi/admin");
const icons = require("@strapi/icons");
const react = require("react");
const reactRouterDom = require("react-router-dom");
const useFetch = require("./useFetch-RsUmYj8f.js");
const dateFns = require("date-fns");
const index = require("./index-CgEJC2c0.js");
function Label(status) {
  const isSuccess = status === "success";
  const isFailure = status === "failure";
  const BadgeStyles = {
    textColor: "neutral100",
    backgroundColor: isSuccess ? "success500" : isFailure ? "danger500" : "neutral800"
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { ...BadgeStyles, children: status });
}
function CustomRow({
  id,
  workflowId,
  conclusion,
  name,
  run_number,
  run_started_at,
  html_url,
  updated_at,
  created_at
}) {
  const { get } = admin.useFetchClient();
  const isThereAConclusion = Boolean(conclusion);
  const [disabledLogsButton, setDisabledLogsButton] = react.useState(isThereAConclusion ? false : true);
  const msDiffResult = dateFns.differenceInMilliseconds(new Date(updated_at), new Date(run_started_at));
  const mins = Math.floor(msDiffResult / 1e3 / 60);
  const secs = msDiffResult / 1e3 % 60;
  const creationDate = dateFns.formatRelative(new Date(created_at), /* @__PURE__ */ new Date());
  async function logsHandler(jobId) {
    setDisabledLogsButton(true);
    try {
      const response = await get(`/${index.pluginId}/github-actions-jobs-log/${workflowId}`, {
        params: {
          jobId
        }
      });
      const logsUrl = response.data?.url;
      if (typeof logsUrl === "string" && logsUrl.startsWith("http")) {
        window.open(logsUrl, "_blank");
      } else {
        console.error("Invalid logs URL received:", response.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDisabledLogsButton(false);
    }
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: run_number }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: name }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: conclusion ? Label(conclusion) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: "-" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: creationDate }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: !isThereAConclusion ? "in progress" : `${mins ? mins + "m" : ""} ${secs}s` }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 1, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          variant: "ghost",
          disabled: disabledLogsButton,
          onClick: () => logsHandler(id),
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Eye, {})
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          variant: "ghost",
          tag: "a",
          href: html_url,
          target: "_blank",
          rel: "noreferrer",
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ExternalLink, {})
        }
      )
    ] }) })
  ] }, id);
}
const stickyStyle = {
  position: "fixed",
  top: 24,
  left: "calc(50%)",
  transform: "translateX(-50%)",
  zIndex: 10
};
function ToastMessage({
  variant,
  title,
  message,
  action,
  closeToastHandler
}) {
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Alert,
    {
      variant,
      title,
      action,
      style: stickyStyle,
      onClose: closeToastHandler,
      closeLabel: "close alert",
      children: message
    }
  );
}
function Pagination({ page, numberOfItems, setPage, maxPerPage }) {
  const totalPages = Math.ceil(numberOfItems / maxPerPage) || 1;
  const handlePrevPage = () => {
    if (page === 1) return;
    setPage(page - 1);
  };
  const handleNextPage = () => {
    if (page === totalPages) return;
    setPage(page + 1);
  };
  const pagesArray = Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Button,
      {
        size: "L",
        onClick: () => {
          setPage(item);
        },
        variant: item === page ? "tertiary" : "ghost",
        children: item
      },
      item
    );
  });
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, alignItems: "center", justifyContent: "center", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Button,
      {
        size: "L",
        onClick: handlePrevPage,
        disabled: page === 1,
        variant: "ghost",
        children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { alignItems: "center", justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(icons.ChevronLeft, {}) })
      }
    ),
    pagesArray.length > 5 ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      pagesArray.slice(0, 2),
      /* @__PURE__ */ jsxRuntime.jsx(icons.More, {}),
      pagesArray.slice(-1)
    ] }) : pagesArray,
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Button,
      {
        size: "L",
        onClick: handleNextPage,
        disabled: page === totalPages,
        variant: "ghost",
        children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { alignItems: "center", justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(icons.ChevronRight, {}) })
      }
    )
  ] });
}
const THEAD_ITEMS = [
  "Run Number",
  "Workflow Name",
  "Status",
  "Creation Date",
  "Duration",
  /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, {}, "actions")
];
function App() {
  const navigate = reactRouterDom.useNavigate();
  const [loadingTriggerButton, setLoadingTriggerButton] = react.useState(false);
  const [toastMsg, setToastMsg] = react.useState({});
  const [toastToggle, setToastToggle] = react.useState(false);
  const { post } = admin.useFetchClient();
  const [workflows, isWorkflowsFetching] = useFetch.useFetch(
    `/${index.pluginId}/config`
  );
  const [page, setPage] = react.useState(1);
  const [selectedWorkflow, setSelectedWorkflow] = react.useState();
  const hasWorkflows = Array.isArray(workflows) && workflows.length > 0;
  const [data, isLoading, handleRefetch] = useFetch.useFetch(
    `/${index.pluginId}/github-actions-history/${selectedWorkflow || "0"}?page=${page}`
  );
  const maxPerPage = 20;
  const numberOfItems = data.total_count || 0;
  function handleSetPage(page2) {
    setPage(page2);
    handleRefetch();
  }
  const TITLE = useFetch.useFormattedLabel("plugin.title");
  const HEADER_TITLE = useFetch.useFormattedLabel("plugin.headers.title");
  const HEADER_SUBTITLE = useFetch.useFormattedLabel("plugin.headers.subtitle");
  const TOAST_SUCCESS_TITLE = useFetch.useFormattedLabel("plugin.toast.success.title");
  const TOAST_SUCCESS_DESCRIPTION = useFetch.useFormattedLabel("plugin.toast.success.description");
  const TOAST_FAILURE_UNKNOWN_TITLE = useFetch.useFormattedLabel("plugin.toast.failure.unknown.title");
  const TOAST_FAILURE_UNKNOWN_DESCRIPTION = useFetch.useFormattedLabel(
    "plugin.toast.failure.unknown.description"
  );
  const TOAST_FAILURE_UNPROCESSABLE_TITLE = useFetch.useFormattedLabel(
    "plugin.toast.failure.unprocessableEntity.title"
  );
  const TOAST_FAILURE_UNPROCESSABLE_DESCRIPTION = useFetch.useFormattedLabel(
    "plugin.toast.failure.unprocessableEntity.description"
  );
  const TOAST_PERMISSION_DENIED_MSG = useFetch.useFormattedLabel("permission.toast.message");
  const TOAST_PERMISSION_DENIED_TITLE = useFetch.useFormattedLabel("permission.toast.title");
  const SEE_MORE_BUTTON = useFetch.useFormattedLabel("button.seeMore");
  const REFRESH_BUTTON = useFetch.useFormattedLabel("button.refresh");
  const EMPTY_STATE_CONTENT = useFetch.useFormattedLabel("plugin.empty.content");
  const EMPTY_STATE_ACTION = useFetch.useFormattedLabel("plugin.empty.action");
  const [isConfirmOneDialogOpen, setIsConfirmOneDialogOpen] = react.useState(false);
  const [isConfirmAllDialogOpen, setIsConfirmAllDialogOpen] = react.useState(false);
  const handleSelectWorkflow = (documentId) => {
    setPage(1);
    setSelectedWorkflow(documentId);
    handleRefetch();
  };
  function toggleConfirmOneDialog() {
    setIsConfirmOneDialogOpen((prev) => !prev);
  }
  function toggleConfirmAllDialog() {
    setIsConfirmAllDialogOpen((prev) => !prev);
  }
  async function triggerAllGithubActions() {
    try {
      await post(`/${index.pluginId}/github-actions-trigger/all`);
      handleRefetch();
    } catch (error) {
      console.error(error);
      setToastMsg({
        variant: "danger",
        title: TOAST_FAILURE_UNKNOWN_TITLE,
        message: TOAST_FAILURE_UNKNOWN_DESCRIPTION
      });
      setToastToggle(true);
      return;
    }
  }
  async function triggerGithubActions() {
    try {
      setLoadingTriggerButton(true);
      await post(`/${index.pluginId}/github-actions-trigger/${selectedWorkflow || "0"}`);
      setToastMsg({
        variant: "success",
        title: TOAST_SUCCESS_TITLE,
        message: TOAST_SUCCESS_DESCRIPTION,
        action: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.TextButton,
          {
            endIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowClockwise, {}),
            onClick: () => {
              handleRefetch();
              setToastToggle(false);
            },
            children: REFRESH_BUTTON
          }
        )
      });
      setToastToggle(true);
    } catch (error) {
      console.error(error);
      const err = error;
      const status = err.response?.data?.error?.status;
      const name = err.response?.data?.error?.name;
      if (status === 422 && name === "UnprocessableEntityError") {
        setToastMsg({
          variant: "danger",
          title: TOAST_FAILURE_UNPROCESSABLE_TITLE,
          message: TOAST_FAILURE_UNPROCESSABLE_DESCRIPTION,
          action: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Link, { href: "https://docs.github.com/en/actions/managing-workflow-runs/disabling-and-enabling-a-workflow", children: SEE_MORE_BUTTON })
        });
        return;
      }
      if (status === 403 && name === "PolicyError") {
        setToastMsg({
          variant: "danger",
          title: TOAST_PERMISSION_DENIED_TITLE,
          message: TOAST_PERMISSION_DENIED_MSG
        });
        return;
      }
      setToastMsg({
        variant: "danger",
        title: TOAST_FAILURE_UNKNOWN_TITLE,
        message: TOAST_FAILURE_UNKNOWN_DESCRIPTION
      });
    } finally {
      setToastToggle(true);
      setLoadingTriggerButton(false);
    }
  }
  function Actions() {
    const PRIMARY_ACTION_BUTTON = useFetch.useFormattedLabel("plugin.buttons.primary");
    const TRIGGER_ALL_WORKFLOWS_BUTTON = useFetch.useFormattedLabel("plugin.buttons.triggerAllWorkflows");
    const CONFIRM_MSG = useFetch.useFormattedLabel("confirm.message");
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 3, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Button,
        {
          onClick: () => {
            handleRefetch();
            setToastToggle(false);
          },
          variant: "secondary",
          loading: isLoading,
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowClockwise, {}),
          children: REFRESH_BUTTON
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        useFetch.ConfirmDialog,
        {
          bodyText: {
            id: "confirm.message",
            defaultMessage: CONFIRM_MSG
          },
          title: {
            id: "confirm.title",
            defaultMessage: "Are you sure?"
          },
          isOpen: isConfirmOneDialogOpen,
          onToggleDialog: toggleConfirmOneDialog,
          onConfirm: triggerGithubActions,
          variantRightButton: "success-light",
          iconRightButton: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {})
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { background: "buttonPrimary600", hasRadius: true, children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
          {
            onClick: toggleConfirmOneDialog,
            variant: "default",
            loading: loadingTriggerButton,
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}),
            children: PRIMARY_ACTION_BUTTON
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { height: "15px", width: "1px", background: "primary500" }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Root, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Trigger, { style: { background: "inherit", borderRadius: "inherit" }, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "default", style: { minWidth: "unset", padding: "8px 12px" }, children: /* @__PURE__ */ jsxRuntime.jsx(icons.More, {}) }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Item, { onSelect: toggleConfirmAllDialog, children: TRIGGER_ALL_WORKFLOWS_BUTTON }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        useFetch.ConfirmDialog,
        {
          bodyText: {
            id: "confirm.message",
            defaultMessage: CONFIRM_MSG
          },
          title: {
            id: "confirm.title",
            defaultMessage: "Are you sure?"
          },
          isOpen: isConfirmAllDialogOpen,
          onToggleDialog: toggleConfirmAllDialog,
          onConfirm: triggerAllGithubActions,
          variantRightButton: "success-light",
          iconRightButton: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {})
        }
      )
    ] });
  }
  if (isWorkflowsFetching) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Root, { children: /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: TITLE }),
      /* @__PURE__ */ jsxRuntime.jsx(useFetch.PageLoading, {})
    ] }) });
  }
  if (!hasWorkflows) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Root, { children: /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: TITLE }),
      /* @__PURE__ */ jsxRuntime.jsx(
        admin.Layouts.Header,
        {
          title: HEADER_TITLE,
          subtitle: HEADER_SUBTITLE
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(admin.Layouts.Content, { children: [
        toastToggle && /* @__PURE__ */ jsxRuntime.jsx(ToastMessage, { ...toastMsg, closeToastHandler: () => {
          setToastToggle(false);
        } }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral0", shadow: "tableShadow", hasRadius: true, width: "100%", children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.EmptyStateLayout,
          {
            icon: /* @__PURE__ */ jsxRuntime.jsx(symbols.EmptyDocuments, { width: "160px" }),
            content: EMPTY_STATE_CONTENT,
            action: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Button,
              {
                variant: "secondary",
                startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}),
                onClick: () => {
                  navigate(`/settings/${index.pluginId}`);
                },
                children: EMPTY_STATE_ACTION
              }
            )
          }
        ) })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Root, { children: /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: TITLE }),
    /* @__PURE__ */ jsxRuntime.jsx(
      admin.Layouts.Header,
      {
        title: HEADER_TITLE,
        subtitle: HEADER_SUBTITLE,
        primaryAction: /* @__PURE__ */ jsxRuntime.jsx(Actions, {})
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(admin.Layouts.Content, { children: [
      toastToggle && /* @__PURE__ */ jsxRuntime.jsx(ToastMessage, { ...toastMsg, closeToastHandler: () => {
        setToastToggle(false);
      } }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 3, alignItems: "start", width: "100%", overflowX: "auto", direction: "column", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.Flex,
          {
            gap: 3,
            background: "neutral0",
            shadow: "tableShadow",
            hasRadius: true,
            padding: 4,
            alignItems: "start",
            overflowX: "auto",
            children: [
              workflows.map((workflow, index2) => {
                if (!selectedWorkflow && workflows[0].documentId) {
                  setSelectedWorkflow(workflows[0].documentId);
                }
                return /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Button,
                  {
                    onClick: () => {
                      if (workflow.documentId) handleSelectWorkflow(workflow.documentId);
                    },
                    variant: selectedWorkflow === workflow.documentId ? "primary" : "ghost",
                    size: "L",
                    loading: isWorkflowsFetching,
                    width: "100%",
                    children: /* @__PURE__ */ jsxRuntime.jsx(
                      "p",
                      {
                        style: {
                          width: "100%",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap"
                        },
                        children: workflow.workflow
                      }
                    )
                  },
                  workflow.documentId ?? index2
                );
              }),
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  variant: "ghost",
                  size: "L",
                  onClick: () => {
                    navigate(`/settings/${index.pluginId}`);
                  },
                  children: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {})
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral0", shadow: "tableShadow", hasRadius: true, width: "100%", children: isLoading || !data.workflow_runs ? /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Flex,
          {
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "5em",
            paddingBottom: "5em",
            children: /* @__PURE__ */ jsxRuntime.jsx(useFetch.PageLoading, {})
          }
        ) : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: 6, rowCount: data.workflow_runs.length, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tr, { children: THEAD_ITEMS.map((title, i) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: title }) }, i)) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: data.workflow_runs.map(
              ({
                id,
                conclusion,
                name,
                run_number,
                run_started_at,
                html_url,
                updated_at,
                created_at
              }) => {
                return /* @__PURE__ */ jsxRuntime.jsx(
                  CustomRow,
                  {
                    id,
                    workflowId: selectedWorkflow || "0",
                    conclusion,
                    name,
                    run_number,
                    run_started_at,
                    html_url,
                    updated_at,
                    created_at
                  },
                  id
                );
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { marginTop: 3, paddingBottom: 4, direction: "column", alignItems: "center", width: "100%", children: /* @__PURE__ */ jsxRuntime.jsx(
            Pagination,
            {
              page,
              setPage: handleSetPage,
              numberOfItems,
              maxPerPage
            }
          ) })
        ] }) })
      ] })
    ] })
  ] }) });
}
exports.default = App;
