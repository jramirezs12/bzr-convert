// Conjunto centralizado de íconos SVG

export function UploadIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M12 16V4m0 0l-4 4m4-4l4 4" />
      <path strokeWidth="1.5" d="M20 16v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3" />
    </svg>
  );
}
export function Spinner(props) {
  return (
    <svg viewBox="0 0 24 24" className="animate-spin" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" fill="none" />
      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" className="opacity-90" fill="none" />
    </svg>
  );
}
export function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
export function FolderIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M3 7h6l2 2h10v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
    </svg>
  );
}
export function ZipIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M8 3h8a2 2 0 0 1 2 2v14l-6 2-6-2V5a2 2 0 0 1 2-2z" />
      <path strokeWidth="1.5" d="M12 7v2m0 2v2m0 2v2" />
    </svg>
  );
}
export function TrashIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M4 7h16M10 11v6m4-6v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7l1-2h4l1 2" />
    </svg>
  );
}
export function ImageStackIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.5" d="M4 7h16v10H4z" />
      <path strokeWidth="1.5" d="M2 9h16v10H2z" />
      <circle cx="9" cy="12" r="1.5" />
      <path strokeWidth="1.5" d="M6 17l4-4 3 3 2-2 3 3" />
    </svg>
  );
}

/* InfoSection icons */
export function HandIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.6" d="M9 11V6a1.5 1.5 0 1 1 3 0v5M12 11V5a1.5 1.5 0 1 1 3 0v6M15 11V7a1.5 1.5 0 1 1 3 0v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-2a2 2 0 0 1 2-2h3" />
    </svg>
  );
}
export function RocketIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.6" d="M14 4l6 6-6 6-6-6 6-6z" />
      <path strokeWidth="1.6" d="M8 20c0-1.657 1.79-3 4-3s4 1.343 4 3" />
      <circle cx="14" cy="10" r="1.5" />
    </svg>
  );
}
export function ShieldIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="1.6" d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
      <path strokeWidth="1.6" d="M9 12l2 2 4-4" />
    </svg>
  );
}
export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M16.704 5.29a1 1 0 0 1 .006 1.414l-7.2 7.3a1 1 0 0 1-1.426-.006L3.29 9.495a1 1 0 1 1 1.42-1.407l3.09 3.114 6.49-6.53a1 1 0 0 1 1.414.006Z" />
    </svg>
  );
}