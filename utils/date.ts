const defaultOptions: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

export function formatDate(
  date: Date | string,
  customOptions?: Partial<Intl.DateTimeFormatOptions>,
  locale: string = "en-US"
): string {
  const dateObject = typeof date === "string" ? new Date(date) : date;
  const options = { ...defaultOptions, ...customOptions };

  return new Intl.DateTimeFormat(locale, options).format(dateObject);
}

export function createDateFormatter(
  customOptions?: Partial<Intl.DateTimeFormatOptions>,
  locale: string = "en-US"
) {
  const options = { ...defaultOptions, ...customOptions };

  return (date: Date | string): string => {
    const dateObject = typeof date === "string" ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, options).format(dateObject);
  };
}
