"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const react = require("react");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const admin = require("@strapi/strapi/admin");
const useFetch = require("./useFetch-RsUmYj8f.js");
const index = require("./index-CgEJC2c0.js");
const symbols = require("@strapi/icons/symbols");
function WorkflowsTable() {
  const [data, isDataLoading, refetchData] = useFetch.useFetch(`/${index.pluginId}/config`);
  const { del } = admin.useFetchClient();
  const [deleteDocumentId, setDeleteDocumentId] = react.useState(null);
  const CONFIRM_DELETE_MESSAGE = useFetch.useFormattedLabel("settings.table.confirmDelete.message");
  const CONFIRM_DELETE_TITLE = useFetch.useFormattedLabel("settings.table.confirmDelete.title");
  const CONFIRM_DELETE_BUTTON = useFetch.useFormattedLabel("settings.table.confirmDelete.confirm");
  const EMPTY_STATE_CONTENT = useFetch.useFormattedLabel("settings.table.empty.content");
  async function handleDelete(documentId) {
    try {
      await del(`/${index.pluginId}/config/${documentId}`);
      refetchData();
    } catch (err) {
      console.error(err);
    }
  }
  const openDeleteDialog = (documentId) => {
    setDeleteDocumentId(documentId);
  };
  const closeDeleteDialog = () => {
    setDeleteDocumentId(null);
  };
  const confirmDelete = async () => {
    if (deleteDocumentId !== null) {
      const idToDelete = deleteDocumentId;
      closeDeleteDialog();
      await handleDelete(idToDelete);
    }
  };
  if (isDataLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(useFetch.PageLoading, {});
  }
  const isEmpty = !data || data.length === 0;
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { background: "neutral0", shadow: "tableShadow", hasRadius: true, width: "100%", children: [
    isEmpty ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.EmptyStateLayout, { icon: /* @__PURE__ */ jsxRuntime.jsx(symbols.EmptyDocuments, { width: "160px" }), content: EMPTY_STATE_CONTENT }) : /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Table, { colCount: 6, rowCount: data.length, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "ID" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "GitHub Account" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Repository" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Branch" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Workflow" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Th, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: data.map((workflow) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: workflow.id }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: workflow.githubAccount }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: workflow.repo }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: workflow.branch }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: workflow.workflow }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
          {
            onClick: () => {
              if (workflow.documentId) openDeleteDialog(workflow.documentId);
            },
            variant: "ghost",
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Trash, {})
          }
        ) }) })
      ] }, workflow.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      useFetch.ConfirmDialog,
      {
        bodyText: {
          id: "settings.table.confirmDelete.message",
          defaultMessage: CONFIRM_DELETE_MESSAGE
        },
        title: {
          id: "settings.table.confirmDelete.title",
          defaultMessage: CONFIRM_DELETE_TITLE
        },
        rightButtonText: {
          id: "settings.table.confirmDelete.confirm",
          defaultMessage: CONFIRM_DELETE_BUTTON
        },
        isOpen: deleteDocumentId !== null,
        onToggleDialog: closeDeleteDialog,
        onConfirm: confirmDelete
      }
    )
  ] });
}
function AddWorkflow({ onCancel, onSuccess }) {
  const [workflow, setWorkflow] = react.useState("");
  const [branch, setBranch] = react.useState("");
  const [githubAccount, setGithubAccount] = react.useState("");
  const [repo, setRepo] = react.useState("");
  const [githubToken, setGithubToken] = react.useState("");
  const [isSubmitting, setIsSubmitting] = react.useState(false);
  const { post } = admin.useFetchClient();
  const HEADER_TITLE = "Add New Workflow";
  const HEADER_SUBTITLE = "Add a new workflow to update the static content";
  const GITHUB_TOKEN = useFetch.useFormattedLabel("settings.fields.githubtoken");
  const REPO = useFetch.useFormattedLabel("settings.fields.repo");
  const WORKFLOWID = useFetch.useFormattedLabel("settings.fields.workflowid");
  const OWNER = useFetch.useFormattedLabel("settings.fields.owner");
  const BRANCH = useFetch.useFormattedLabel("settings.fields.branch");
  const HINT_GITHUB_TOKEN = useFetch.useFormattedLabel("settings.fields.hint.githubtoken");
  const HINT_OWNER = useFetch.useFormattedLabel("settings.fields.hint.owner");
  const HINT_REPO = useFetch.useFormattedLabel("settings.fields.hint.repo");
  const HINT_WORKFLOWID = useFetch.useFormattedLabel("settings.fields.hint.workflowid");
  const HINT_BRANCH = useFetch.useFormattedLabel("settings.fields.hint.branch");
  const PLACEHOLDER_GITHUB_TOKEN = useFetch.useFormattedLabel("settings.fields.placeholder.githubtoken");
  const PLACEHOLDER_OWNER = useFetch.useFormattedLabel("settings.fields.placeholder.owner");
  const PLACEHOLDER_REPO = useFetch.useFormattedLabel("settings.fields.placeholder.repo");
  const PLACEHOLDER_WORKFLOWID = useFetch.useFormattedLabel("settings.fields.placeholder.workflowid");
  const PLACEHOLDER_BRANCH = useFetch.useFormattedLabel("settings.fields.placeholder.branch");
  const BUTTON_DETAILS = useFetch.useFormattedLabel("button.details");
  const BACK_BUTTON = useFetch.useFormattedLabel("button.back");
  const SAVE_BUTTON = useFetch.useFormattedLabel("button.save");
  const isFormValid = githubToken && githubAccount && repo && workflow && branch;
  const handleSubmit = async () => {
    if (!isFormValid) {
      console.error("Please fill all the fields");
      return;
    }
    setIsSubmitting(true);
    try {
      await post(`/${index.pluginId}/config`, {
        githubToken,
        githubAccount,
        repo,
        workflow,
        branch
      });
      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Root, { children: /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { "aria-busy": isSubmitting, children: [
    /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: HEADER_TITLE }),
    /* @__PURE__ */ jsxRuntime.jsx(
      admin.Layouts.Header,
      {
        title: HEADER_TITLE,
        subtitle: HEADER_SUBTITLE,
        navigationAction: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Link, { tag: "button", startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowLeft, {}), onClick: onCancel, children: BACK_BUTTON }),
        primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
          {
            onClick: handleSubmit,
            loading: isSubmitting,
            disabled: !isFormValid,
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
            size: "S",
            children: SAVE_BUTTON
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Box,
      {
        background: "neutral0",
        hasRadius: true,
        shadow: "filterShadow",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 7,
        paddingRight: 7,
        children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "githubToken", required: true, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: GITHUB_TOKEN }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.TextInput,
              {
                type: "text",
                value: githubToken,
                onChange: (e) => {
                  setGithubToken(e.target.value);
                },
                placeholder: PLACEHOLDER_GITHUB_TOKEN,
                autoComplete: "off"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Hint, { children: [
              HINT_GITHUB_TOKEN,
              " ",
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Link,
                {
                  href: "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token",
                  isExternal: true,
                  children: BUTTON_DETAILS
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "githubAccount", required: true, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: OWNER }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.TextInput,
              {
                type: "text",
                value: githubAccount,
                onChange: (e) => {
                  setGithubAccount(e.target.value);
                },
                placeholder: PLACEHOLDER_OWNER
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, { children: HINT_OWNER })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "repo", required: true, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: REPO }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.TextInput,
              {
                type: "text",
                value: repo,
                onChange: (e) => {
                  setRepo(e.target.value);
                },
                placeholder: PLACEHOLDER_REPO
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, { children: HINT_REPO })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "branch", required: true, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: BRANCH }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.TextInput,
              {
                type: "text",
                value: branch,
                onChange: (e) => {
                  setBranch(e.target.value);
                },
                placeholder: PLACEHOLDER_BRANCH
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, { children: HINT_BRANCH })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: "workflow_id", required: true, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: WORKFLOWID }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.TextInput,
              {
                type: "text",
                value: workflow,
                onChange: (e) => {
                  setWorkflow(e.target.value);
                },
                placeholder: PLACEHOLDER_WORKFLOWID
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, { children: HINT_WORKFLOWID })
          ] })
        ] })
      }
    ) })
  ] }) });
}
const Settings = () => {
  const [showAddForm, setShowAddForm] = react.useState(false);
  const PAGE_TITLE = useFetch.useFormattedLabel("settings.pagetitle");
  const HEADER_TITLE = useFetch.useFormattedLabel("settings.headers.title");
  const HEADER_SUBTITLE = useFetch.useFormattedLabel("settings.headers.subtitle");
  const ADD_WORKFLOW_BUTTON = useFetch.useFormattedLabel("settings.buttons.addWorkflow");
  const handleAddClick = () => {
    setShowAddForm(true);
  };
  const handleBackToList = () => {
    setShowAddForm(false);
  };
  if (showAddForm) {
    return /* @__PURE__ */ jsxRuntime.jsx(AddWorkflow, { onCancel: handleBackToList, onSuccess: handleBackToList });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Root, { children: /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: PAGE_TITLE }),
    /* @__PURE__ */ jsxRuntime.jsx(
      admin.Layouts.Header,
      {
        title: HEADER_TITLE,
        subtitle: HEADER_SUBTITLE,
        primaryAction: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}), onClick: handleAddClick, children: ADD_WORKFLOW_BUTTON })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(WorkflowsTable, {}) })
  ] }) });
};
exports.default = Settings;
