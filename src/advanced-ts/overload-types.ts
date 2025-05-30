type FormSubmitHandler = (data: FormData) => void;
type MessageHandler = (evt: MessageEvent) => void;

function handleMainEvent(
  elem: HTMLFormElement,
  handler: FormSubmitHandler,
): void;

function handleMainEvent(
  elem: HTMLIFrameElement,
  handler: MessageHandler,
): void;

function handleMainEvent(
  elem: HTMLFormElement | HTMLIFrameElement,
  handler: FormSubmitHandler | MessageHandler,
) {
  console.log(elem, handler);
}

// overload
