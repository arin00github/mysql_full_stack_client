export type PROGRESS_STEP =
  | "init"
  | "input"
  | "progress"
  | "result"
  | "complete";

export interface IModalProps {
  size?: "sm" | "md" | "lg" | "xl";
  showItem: PROGRESS_STEP;
  nextItem?: PROGRESS_STEP;
  title?: string;
  progress?: number;
  message?: string;
  handleClose: (
    step: PROGRESS_STEP,
    message?: string,
    result?: { [id: string]: any }
  ) => void;
}

export interface IProgressContext {
  progressStep: PROGRESS_STEP;
  progress: number;
  message?: string;
  result?: { [id: string]: any };
}

export interface IParentModalProps
  extends React.PropsWithChildren<{}>,
    IModalProps {}
