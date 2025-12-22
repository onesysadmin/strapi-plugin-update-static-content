interface Props {
    id: number;
    workflowId: string;
    conclusion: 'success' | 'failure';
    name: string;
    run_number: number;
    run_started_at: string;
    html_url: string;
    updated_at: string;
    created_at: string;
}
export default function CustomRow({ id, workflowId, conclusion, name, run_number, run_started_at, html_url, updated_at, created_at, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
