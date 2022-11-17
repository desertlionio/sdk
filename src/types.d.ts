interface ErrorDetails {
  errorMessage: any;
  url: any;
  line: any;
  column: any;
  error: any;
}

interface Exception {
  errorClass: string;
  message: string;
  stackTrace: Array<StackFrame>;
  location: {
    fileName: string;
    line: number | string;
    column: number | string;
    url: string;
  } | null;
}

interface UnhandledRejectionInfo {
  reason: any | null;
  promise: Promise<any> | null = null;
  detail: any;
}

type CustomRRWebEvent = {
  type: number;
  timestamp: number;
  id: string;
  data: {
    plugin: string;
    payload: {
      level: string;
      payload: string;
      event: {
        method: string;
        url: string;
        width: number;
        height: number;
        keyCode: string;
        requestBody: string;
        response: string;
        status: number;
        headers: string;
        type: string;
        action: string;
        selector: string;
        href: string;
      };
    };
  };
};

interface Issue {
  exception: Exception;
  timestamp: number;
}

declare interface Window {
  $$DESERTLION__isReplay: boolean;
}

declare module 'rrweb/lib/plugins/console-record';
declare module 'rrweb/lib/record/rrweb-record';
