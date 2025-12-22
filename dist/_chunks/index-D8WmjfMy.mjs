import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Box, EmptyStateLayout, Table, Thead, Tr, Th, Typography, Tbody, Td, Flex, Button, Link, Field, TextInput } from "@strapi/design-system";
import { Trash, Check, ArrowLeft, Plus } from "@strapi/icons";
import { useFetchClient, Layouts, Page } from "@strapi/strapi/admin";
import { u as useFetch, a as useFormattedLabel, P as PageLoading, C as ConfirmDialog } from "./useFetch-909byfgR.mjs";
import { p as pluginId } from "./index-BI8MKahP.mjs";
import { EmptyDocuments } from "@strapi/icons/symbols";
function WorkflowsTable() {
  const [data, isDataLoading, refetchData] = useFetch(`/${pluginId}/config`);
  const { del } = useFetchClient();
  const [deleteDocumentId, setDeleteDocumentId] = useState(null);
  const CONFIRM_DELETE_MESSAGE = useFormattedLabel("settings.table.confirmDelete.message");
  const CONFIRM_DELETE_TITLE = useFormattedLabel("settings.table.confirmDelete.title");
  const CONFIRM_DELETE_BUTTON = useFormattedLabel("settings.table.confirmDelete.confirm");
  const EMPTY_STATE_CONTENT = useFormattedLabel("settings.table.empty.content");
  async function handleDelete(documentId) {
    try {
      await del(`/${pluginId}/config/${documentId}`);
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
    return /* @__PURE__ */ jsx(PageLoading, {});
  }
  const isEmpty = !data || data.length === 0;
  return /* @__PURE__ */ jsxs(Box, { background: "neutral0", shadow: "tableShadow", hasRadius: true, width: "100%", children: [
    isEmpty ? /* @__PURE__ */ jsx(EmptyStateLayout, { icon: /* @__PURE__ */ jsx(EmptyDocuments, { width: "160px" }), content: EMPTY_STATE_CONTENT }) : /* @__PURE__ */ jsxs(Table, { colCount: 6, rowCount: data.length, children: [
      /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
        /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "ID" }) }),
        /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "GitHub Account" }) }),
        /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Repository" }) }),
        /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Branch" }) }),
        /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Workflow" }) }),
        /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", children: "Actions" }) })
      ] }) }),
      /* @__PURE__ */ jsx(Tbody, { children: data.map((workflow) => /* @__PURE__ */ jsxs(Tr, { children: [
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: workflow.id }) }),
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: workflow.githubAccount }) }),
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: workflow.repo }) }),
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: workflow.branch }) }),
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: workflow.workflow }) }),
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Flex, { children: /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => {
              if (workflow.documentId) openDeleteDialog(workflow.documentId);
            },
            variant: "ghost",
            startIcon: /* @__PURE__ */ jsx(Trash, {})
          }
        ) }) })
      ] }, workflow.id)) })
    ] }),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
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
  const [workflow, setWorkflow] = useState("");
  const [branch, setBranch] = useState("");
  const [githubAccount, setGithubAccount] = useState("");
  const [repo, setRepo] = useState("");
  const [githubToken, setGithubToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { post } = useFetchClient();
  const HEADER_TITLE = "Add New Workflow";
  const HEADER_SUBTITLE = "Add a new workflow to update the static content";
  const GITHUB_TOKEN = useFormattedLabel("settings.fields.githubtoken");
  const REPO = useFormattedLabel("settings.fields.repo");
  const WORKFLOWID = useFormattedLabel("settings.fields.workflowid");
  const OWNER = useFormattedLabel("settings.fields.owner");
  const BRANCH = useFormattedLabel("settings.fields.branch");
  const HINT_GITHUB_TOKEN = useFormattedLabel("settings.fields.hint.githubtoken");
  const HINT_OWNER = useFormattedLabel("settings.fields.hint.owner");
  const HINT_REPO = useFormattedLabel("settings.fields.hint.repo");
  const HINT_WORKFLOWID = useFormattedLabel("settings.fields.hint.workflowid");
  const HINT_BRANCH = useFormattedLabel("settings.fields.hint.branch");
  const PLACEHOLDER_GITHUB_TOKEN = useFormattedLabel("settings.fields.placeholder.githubtoken");
  const PLACEHOLDER_OWNER = useFormattedLabel("settings.fields.placeholder.owner");
  const PLACEHOLDER_REPO = useFormattedLabel("settings.fields.placeholder.repo");
  const PLACEHOLDER_WORKFLOWID = useFormattedLabel("settings.fields.placeholder.workflowid");
  const PLACEHOLDER_BRANCH = useFormattedLabel("settings.fields.placeholder.branch");
  const BUTTON_DETAILS = useFormattedLabel("button.details");
  const BACK_BUTTON = useFormattedLabel("button.back");
  const SAVE_BUTTON = useFormattedLabel("button.save");
  const isFormValid = githubToken && githubAccount && repo && workflow && branch;
  const handleSubmit = async () => {
    if (!isFormValid) {
      console.error("Please fill all the fields");
      return;
    }
    setIsSubmitting(true);
    try {
      await post(`/${pluginId}/config`, {
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
  return /* @__PURE__ */ jsx(Layouts.Root, { children: /* @__PURE__ */ jsxs(Page.Main, { "aria-busy": isSubmitting, children: [
    /* @__PURE__ */ jsx(Page.Title, { children: HEADER_TITLE }),
    /* @__PURE__ */ jsx(
      Layouts.Header,
      {
        title: HEADER_TITLE,
        subtitle: HEADER_SUBTITLE,
        navigationAction: /* @__PURE__ */ jsx(Link, { tag: "button", startIcon: /* @__PURE__ */ jsx(ArrowLeft, {}), onClick: onCancel, children: BACK_BUTTON }),
        primaryAction: /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleSubmit,
            loading: isSubmitting,
            disabled: !isFormValid,
            startIcon: /* @__PURE__ */ jsx(Check, {}),
            size: "S",
            children: SAVE_BUTTON
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsx(
      Box,
      {
        background: "neutral0",
        hasRadius: true,
        shadow: "filterShadow",
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 7,
        paddingRight: 7,
        children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
          /* @__PURE__ */ jsxs(Field.Root, { name: "githubToken", required: true, children: [
            /* @__PURE__ */ jsx(Field.Label, { children: GITHUB_TOKEN }),
            /* @__PURE__ */ jsx(
              TextInput,
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
            /* @__PURE__ */ jsxs(Field.Hint, { children: [
              HINT_GITHUB_TOKEN,
              " ",
              /* @__PURE__ */ jsx(
                Link,
                {
                  href: "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token",
                  isExternal: true,
                  children: BUTTON_DETAILS
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Field.Root, { name: "githubAccount", required: true, children: [
            /* @__PURE__ */ jsx(Field.Label, { children: OWNER }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                type: "text",
                value: githubAccount,
                onChange: (e) => {
                  setGithubAccount(e.target.value);
                },
                placeholder: PLACEHOLDER_OWNER
              }
            ),
            /* @__PURE__ */ jsx(Field.Hint, { children: HINT_OWNER })
          ] }),
          /* @__PURE__ */ jsxs(Field.Root, { name: "repo", required: true, children: [
            /* @__PURE__ */ jsx(Field.Label, { children: REPO }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                type: "text",
                value: repo,
                onChange: (e) => {
                  setRepo(e.target.value);
                },
                placeholder: PLACEHOLDER_REPO
              }
            ),
            /* @__PURE__ */ jsx(Field.Hint, { children: HINT_REPO })
          ] }),
          /* @__PURE__ */ jsxs(Field.Root, { name: "branch", required: true, children: [
            /* @__PURE__ */ jsx(Field.Label, { children: BRANCH }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                type: "text",
                value: branch,
                onChange: (e) => {
                  setBranch(e.target.value);
                },
                placeholder: PLACEHOLDER_BRANCH
              }
            ),
            /* @__PURE__ */ jsx(Field.Hint, { children: HINT_BRANCH })
          ] }),
          /* @__PURE__ */ jsxs(Field.Root, { name: "workflow_id", required: true, children: [
            /* @__PURE__ */ jsx(Field.Label, { children: WORKFLOWID }),
            /* @__PURE__ */ jsx(
              TextInput,
              {
                type: "text",
                value: workflow,
                onChange: (e) => {
                  setWorkflow(e.target.value);
                },
                placeholder: PLACEHOLDER_WORKFLOWID
              }
            ),
            /* @__PURE__ */ jsx(Field.Hint, { children: HINT_WORKFLOWID })
          ] })
        ] })
      }
    ) })
  ] }) });
}
const Settings = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const PAGE_TITLE = useFormattedLabel("settings.pagetitle");
  const HEADER_TITLE = useFormattedLabel("settings.headers.title");
  const HEADER_SUBTITLE = useFormattedLabel("settings.headers.subtitle");
  const ADD_WORKFLOW_BUTTON = useFormattedLabel("settings.buttons.addWorkflow");
  const handleAddClick = () => {
    setShowAddForm(true);
  };
  const handleBackToList = () => {
    setShowAddForm(false);
  };
  if (showAddForm) {
    return /* @__PURE__ */ jsx(AddWorkflow, { onCancel: handleBackToList, onSuccess: handleBackToList });
  }
  return /* @__PURE__ */ jsx(Layouts.Root, { children: /* @__PURE__ */ jsxs(Page.Main, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: PAGE_TITLE }),
    /* @__PURE__ */ jsx(
      Layouts.Header,
      {
        title: HEADER_TITLE,
        subtitle: HEADER_SUBTITLE,
        primaryAction: /* @__PURE__ */ jsx(Button, { startIcon: /* @__PURE__ */ jsx(Plus, {}), onClick: handleAddClick, children: ADD_WORKFLOW_BUTTON })
      }
    ),
    /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsx(WorkflowsTable, {}) })
  ] }) });
};
export {
  Settings as default
};
