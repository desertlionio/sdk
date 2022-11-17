const getShouldMaskText = (event: { target: HTMLInputElement }) => {
  const rules = [
    event.target?.type === 'password',
    event.target?.id?.toLowerCase().includes('password'),
    event.target?.id?.toLowerCase().includes('credit-card'),
    event.target?.id?.toLowerCase().includes('cc'),
    event.target?.className?.toLowerCase().includes('cc'),
    event.target?.className?.toLowerCase().includes('credit-card'),
    event.target?.className?.toLowerCase().includes('credit-card'),
    event.target?.getAttribute('data-private'),
  ];

  return rules.some(t => t);
};

export const getKeyCode = (event: KeyboardEvent): string => {
  if (event instanceof KeyboardEvent && event.code && event.key !== 'Dead') {
    const shouldMaskText = getShouldMaskText({
      target: event.target as HTMLInputElement,
    });

    if (shouldMaskText) {
      return '*';
    }

    return shouldMaskText ? '*' : event.key;
  }

  return '';
};

export const getText = (event: Event): string => {
  const element = event.target as HTMLElement;
  return element.innerText || '';
};
