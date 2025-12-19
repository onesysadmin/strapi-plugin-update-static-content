export default function protectedValue(sensitiveValue: string | false) {
  if (sensitiveValue === false) return;

  return sensitiveValue && sensitiveValue.substring(0, 10) + '...';
}
